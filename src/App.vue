<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/nav/NavBar.vue";
import "@/assets/global.css"
import {useThemeStore} from "@/stores/ThemeStore";
import {TimerState, useSessionStore} from "@/stores/SessionStore";
// import 'bootstrap-select/dist/css/bootstrap-select.min.css';


useThemeStore().applyCurrentTheme();
const sessionStore = useSessionStore()

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
    } else if (sessionStore.timerState === TimerState.NOT_RUNNING) {
      sessionStore.timerState = TimerState.READY
    }
  } else if (event.key === "Delete") {
    event.preventDefault()
    if (sessionStore.stats().length > sessionStore.observingResult && confirm("Delete selected result?")) {
      sessionStore.deleteResult(sessionStore.observingResult)
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
      console.log("timer start");
      sessionStore.startTimer()
    }
  }
}

window.addEventListener('keydown', onGlobalKeyDown);
window.addEventListener('keyup', onGlobalKeyUp);

</script>

<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row">
      <NavBar/>
    </div>
    <div class="row flex-grow-1 p-0">
      <RouterView/>
    </div>
  </div>
</template>

