<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/nav/NavBar.vue";
import "@/assets/global.css"
import {useThemeStore} from "@/stores/ThemeStore";
import {TimerState, useSessionStore} from "@/stores/SessionStore";

useThemeStore().applyCurrentTheme();
const sessionStore = useSessionStore()

// global key events listener
const onGlobalKeyDown = (event) => {
  if (event.key === " ") {
    event.preventDefault()
    if (sessionStore.timerState === TimerState.STOPPING) {
      return;
    } else if (sessionStore.timerState === TimerState.RUNNING) {
      sessionStore.stopTimer()
      console.log("timer stop");
    } else if (sessionStore.timerState === TimerState.NOT_RUNNING) {
      sessionStore.timerState = TimerState.READY
      console.log("timer ready");
    }
  } else if (event.key === "Delete") {
    event.preventDefault()
    if (sessionStore.stats().length > 0 && confirm("Delete last result?")) {
      sessionStore.deleteResult(sessionStore.stats().length - 1)
    }
  }
}
const onGlobalKeyUp = (event) => {
  event.preventDefault()
  if (event.key === " ") {
    if (sessionStore.timerState === TimerState.STOPPING) {
      sessionStore.timerState = TimerState.NOT_RUNNING
    } else if (sessionStore.timerState === TimerState.READY) {
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
    <div class="row flex-grow-1 bg-gradient p-0">
      <RouterView/>
    </div>
  </div>
</template>

