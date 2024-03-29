<script setup>
import Scramble from "@/components/timer/Scramble.vue";
import Timer from "@/components/timer/Timer.vue";
import ResultCard from "@/components/timer/ResultCard.vue";
import StatsCard from "@/components/timer/StatsCard.vue";
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

import {TimerState, useSessionStore} from "@/stores/SessionStore";
import {useRouter} from "vue-router";
import Settings from "@/components/Settings.vue";
import {computed, onMounted, onUnmounted} from "vue";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useSettingsStore} from "@/stores/SettingsStore"
import {usePresetsStore, starredName} from "@/stores/PresetStore";
import {useDisplayStore} from "@/stores/DisplayStore";

const router = useRouter();
const sessionStore = useSessionStore()
const settings = useSettingsStore()
const timerNotRunning = computed(() => sessionStore.timerState === TimerState.NOT_RUNNING)
const timerWrapClass = computed(() => timerNotRunning.value
        ? ("col-lg-8 col-5 " + ((displayStore.showSettings || displayStore.showStatistics) ? "align-self-start" : "h-100"))
        : "col-12")
const rightColumnClass = computed(() => timerNotRunning.value ? "col-lg-4 col-7 align-items-start" : "d-none")
const selectStore = useSelectedStore()
const presets = usePresetsStore()
const displayStore = useDisplayStore()

// global key events listener
const onGlobalKeyDown = event => {
  const confirmClearSession = () => {
    if (confirm(t("stats_card.are_you_sure_to_clean"))) {
      sessionStore.clearSession()
    }
  }
  const deleteSingleResult = () => {
    if (sessionStore.stats().length > sessionStore.observingResult
        && confirm(t("result_card.are_you_sure_to_delete"))) {
      sessionStore.deleteResult(sessionStore.observingResult)
    }
  }

  if (sessionStore.timerState === TimerState.RUNNING) {
    event.preventDefault()
    sessionStore.stopTimer()
    return
  } else if (sessionStore.timerState !== TimerState.NOT_RUNNING) {
    return // don't allow actions like "delete time", "list times" etc. when timer's running
  }
  // preventDefault() is done at the end
  if (event.key === "ArrowLeft") {
    sessionStore.observingResult = Math.max(0, sessionStore.observingResult - 1)
  } else if (event.key === "ArrowRight") {
    sessionStore.observingResult = Math.min(sessionStore.stats().length - 1, sessionStore.observingResult + 1)
  } else if (event.key === "Home") {
    sessionStore.observingResult = 0
  } else if (event.key === "End") {
    sessionStore.observingResult = sessionStore.stats().length - 1
  } else if (event.key === " ") {
    if (sessionStore.timerState === TimerState.NOT_RUNNING && sessionStore.currentScramble) {
      sessionStore.getTimerReady(settings.store.timerStartDelayMs)
    }
  } else if (event.key === "Delete") {
    if (event.shiftKey) {
      confirmClearSession();
    } else { // no shift key -  delete single result
      deleteSingleResult()
    }
  } else if (event.key === "t" && event.altKey) {
    router.push('select')
  } else if (event.key === "r" && event.altKey) {
    sessionStore.startRecap()
  } else if (event.key === "d" && event.altKey) {
    confirmClearSession();
  } else if (event.key === "z" && (event.altKey || event.ctrlKey)) {
    deleteSingleResult()
  } else if (event.key === "s" && event.altKey && sessionStore.observingResult < sessionStore.stats().length) {
    selectStore.toggleSelected(sessionStore.stats()[sessionStore.observingResult])
  } else if (event.key === "a" && event.altKey && sessionStore.observingResult < sessionStore.stats().length) {
    presets.toggleAddRemove(starredName, sessionStore.stats()[sessionStore.observingResult].key)
  } else {
    return // do NOT prevent default
  }
  event.preventDefault()
}
const onGlobalKeyUp = (event) => {
  if (sessionStore.timerState === TimerState.STOPPING) {
    sessionStore.timerState = TimerState.NOT_RUNNING
  } else if (event.key === " ") {
    if (sessionStore.timerState === TimerState.READY) {
      sessionStore.startTimer()
    } else if (sessionStore.timerState === TimerState.AWAITING_READY) {
      sessionStore.timerState = TimerState.NOT_RUNNING // reset
    }
  } else {
    return
  }
  event.preventDefault()
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeyDown);
  window.addEventListener('keyup', onGlobalKeyUp);
  sessionStore.timerState = TimerState.NOT_RUNNING
  sessionStore.observingResult = Math.max(sessionStore.stats().length - 1, 0)
});

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeyDown);
  window.removeEventListener('keyup', onGlobalKeyUp);
  sessionStore.timerState = TimerState.NOT_RUNNING
});

const onTimerTouchStart = event => {
  if (sessionStore.timerState === TimerState.RUNNING) {
    sessionStore.stopTimer()
  } else if (sessionStore.timerState === TimerState.NOT_RUNNING && sessionStore.currentScramble) {
    sessionStore.getTimerReady(settings.store.timerStartDelayMs)
  }
  event.preventDefault()
}

const onTimerTouchEnd = event => {
  if (sessionStore.timerState === TimerState.STOPPING) {
    sessionStore.timerState = TimerState.NOT_RUNNING
  } else if (sessionStore.timerState === TimerState.READY) {
    sessionStore.startTimer()
  } else if (sessionStore.timerState === TimerState.AWAITING_READY) {
    sessionStore.timerState = TimerState.NOT_RUNNING // reset
  }
  event.preventDefault()
}

</script>

<template>
  <div class="row flex-grow-1 p-0">
    <div class="d-flex flex-column">
      <div class="row no-gutters">
        <div class="col-12">
          <Scramble/>
        </div>
      </div>

      <div class="row flex-grow-1">

        <div
            class="d-flex flex-column p-0 timer_wrap"
            :class="timerWrapClass">
          <div
              class="flex-grow-1 d-flex align-items-center justify-content-center"
              @touchstart="onTimerTouchStart"
              @touchend="onTimerTouchEnd"
          >
            <Timer/>
          </div>
          <div v-if="displayStore.showSettings">
            <Settings/>
          </div>
          <div v-if="displayStore.showStatistics" class="d-sm-none d-block">
            <StatsCard/>
          </div>
        </div>

        <div
            :class="rightColumnClass">
          <div class="row my-2">
            <div class="col-12">
              <ResultCard v-if="sessionStore.stats().length > sessionStore.observingResult"/>
            </div>
          </div>
          <div class="row my-2 d-sm-block d-none">
            <div class="col-12">
              <StatsCard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer_wrap {
  transition: width 0.1s ease-in-out;
}
</style>