<script setup>
import Scramble from "@/components/timer/Scramble.vue";
import Timer from "@/components/timer/Timer.vue";
import ResultCard from "@/components/timer/ResultCard.vue";
import StatsCard from "@/components/timer/StatsCard.vue";

import {TimerState, useSessionStore} from "@/stores/SessionStore";
import {useRouter} from "vue-router";
import Settings from "@/components/Settings.vue";
import {useSettingsStore} from "@/stores/SettingsStore";
import {computed, onMounted, onUnmounted} from "vue";
import {useSelectedStore} from "@/stores/SelectedStore";

const router = useRouter();
const sessionStore = useSessionStore()
const settingsStore = useSettingsStore()
const timerWrapClass = computed(() => settingsStore.showSettings ? "align-self-start" : "align-self-center")
const selectStore = useSelectedStore()

// global key events listener
const onGlobalKeyDown = (event) => {
  if (sessionStore.timerState === TimerState.RUNNING) {
    sessionStore.stopTimer()
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault()
    sessionStore.observingResult = Math.max(0, sessionStore.observingResult - 1)
  } else if (event.key === "ArrowRight") {
    event.preventDefault()
    sessionStore.observingResult = Math.min(sessionStore.stats().length - 1, sessionStore.observingResult + 1)
  } else if (event.key === "Home") {
    event.preventDefault()
    sessionStore.observingResult = 0
  } else if (event.key === "End") {
    event.preventDefault()
    sessionStore.observingResult = sessionStore.stats().length - 1
  } else if (event.key === " ") {
    event.preventDefault()
    if (sessionStore.timerState === TimerState.STOPPING) {
      return;
    } else if (sessionStore.timerState === TimerState.NOT_RUNNING && sessionStore.currentScramble) {
      sessionStore.timerState = TimerState.READY
    }
  } else if (event.key === "Delete") {
    event.preventDefault()
    if (event.shiftKey) {
      if (confirm("Clear session?")) {
        sessionStore.reset()
      }
    } else { // no shift key -  delete single result
      if (sessionStore.stats().length > sessionStore.observingResult && confirm("Delete selected result?")) {
        sessionStore.deleteResult(sessionStore.observingResult)
      }
    }
  }
}
const onGlobalKeyUp = (event) => {
  if (sessionStore.timerState === TimerState.STOPPING) {
    sessionStore.timerState = TimerState.NOT_RUNNING
    return;
  }
  if (event.key === " ") {
    event.preventDefault()
    if (sessionStore.timerState === TimerState.READY) {
      sessionStore.startTimer()
    }
  }
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
        <div class="col-8" :class="timerWrapClass">
          <Timer/>
          <Settings v-if="settingsStore.showSettings"/>
        </div>

        <div class="col-4 side_panel align-items-start">

          <div class="row my-2">
            <div class="col-12">
              <StatsCard/>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-12">
              <ResultCard v-if="sessionStore.stats().length > sessionStore.observingResult"/>
            </div>
          </div>
        </div>
      </div>

      <div class="row no-gutters">
        <div class="col-12">
          and this is footer
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
</style>