<script setup>
import {TimerState, useSessionStore} from "@/stores/SessionStore";
import {computed, onMounted, ref, watch} from "vue";
import {msToHumanReadable} from "@/helpers/time_formatter";
import {useSettingsStore} from "@/stores/SettingsStore";
import {useSelectedStore} from "@/stores/SelectedStore";

const sessionStore = useSessionStore()
const settings = useSettingsStore()
const selectStore = useSelectedStore()
const numResults = computed(() => sessionStore.stats().length)
const onClearBtnClick = () => {
  if (confirm("You sure you wanna clear the session? This will delete all times")) {
    sessionStore.reset(selectStore.allSelectedCases)

  }
}

const statsContainer = ref(null);
const scrollStats = () => statsContainer.value.scrollTop = statsContainer.value.scrollHeight
const scrollStatsLater = () => setTimeout(() => scrollStats(), 10)
onMounted(() => {
  watch(numResults, scrollStatsLater);
  scrollStatsLater()
})

const statClicked = i => sessionStore.observingResult = i

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="mb-0">
        <div class="row align-items-center">
          <div class="col">
            Stats: {{ numResults }} solves
          </div>
          <div class="col-auto">
            <button
                class="btn btn-sm btn-outline-danger mx-1"
                tabindex="-1" @keydown.space.prevent=""
                @click="onClearBtnClick"
                title="Clear session (Shift+Delete)"
                v-if="sessionStore.stats().length > 0">
              clear
            </button>
          </div>
        </div>
      </h5>
      <hr>
      <div class="stats-container" ref="statsContainer">
        <span v-for="(stat, index) in sessionStore.stats()" :key="index">
          <span
              @click="statClicked(stat['i'])" class="clickable stat"
              :class="sessionStore.observingResult === stat['i'] ? 'text-info' : ''">
            {{ msToHumanReadable(stat["ms"], settings.timerPrecision) }}
          </span>{{ stat["i"] === sessionStore.stats().length - 1 ? "" : ", " }}
        </span>
        <div v-if="sessionStore.stats().length === 0 && sessionStore.timerState !== TimerState.RUNNING">
          Hold spacebar to start the timer
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat {
  transition: color 0.1s;
}

.stat:hover {
  color: var(--bs-info)
}
.stats-container {
  max-height: 200px;
  overflow-y: auto;
}
</style>