<script setup>
import {TimerState, useSessionStore} from "@/stores/SessionStore";
import {computed, ref, watchEffect} from "vue";
import {msToHumanReadable} from "@/helpers/time_formatter";

const sessionStore = useSessionStore()
const currentTime = ref(Date.now())

watchEffect(() => {
  if (sessionStore.timerState === TimerState.RUNNING) {
    const interval = setInterval(() => {
      currentTime.value = Date.now()
    }, 10)

    return () => {
      clearInterval(interval)
    }
  }
})

const timerLabel = computed(() => {
  if (sessionStore.timerState === TimerState.READY) {
    return msToHumanReadable(0)
  }
  if (sessionStore.timerState === TimerState.NOT_RUNNING
      || sessionStore.timerState === TimerState.STOPPING) {
    const n = sessionStore.stats().length;
    return n === 0 ? "ready" : msToHumanReadable(sessionStore.stats()[n-1]["ms"])
  }
  return msToHumanReadable(currentTime.value - sessionStore.timerStarted)
})

const classByState = computed(() => {
  switch (sessionStore.timerState) {
    case TimerState.NOT_RUNNING:
      return "not_running"
    case TimerState.READY:
      return "ready"
    case TimerState.RUNNING:
      return "running"
    case TimerState.STOPPING:
      return "stopping"
  }
})

</script>

<template>
  <h3 class="timer text-center d-block p-4" :class="classByState">
    {{timerLabel}}
  </h3>
</template>

<style scoped>

.timer {
  font-weight: 700;
  font-size: 3rem;
  font-family: 'Roboto Mono', monospace;
  transition: color 0.1s;
}

.not_running {
  color: var(--bs-body-color)
}
.running {
  color: var(--bs-body-color)
}
.ready {
  color: var(--bs-success)
}
.stopping {
  color: var(--bs-danger)
}
</style>