<script setup>
import {TimerState, useSessionStore} from "@/stores/SessionStore";
import {computed} from "vue";
import {msToHumanReadable} from "@/helpers/time_formatter";
import {useSelectedStore} from "@/stores/SelectedStore";

const sessionStore = useSessionStore()
const selectStore = useSelectedStore()
const numResults = computed(() => sessionStore.stats().length)
const onClearBtnClick = () => {
  if (confirm("You sure you wanna clear the session? This will delete all times")) {
    sessionStore.reset(selectStore.getAllSelectedCases)
  }
}

const statClicked = i => sessionStore.observingResult = i

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5>
        Stats: {{numResults}} solves
        <button
            class="btn btn-sm btn-outline-danger mx-1"
            @click="onClearBtnClick"
            v-if="sessionStore.stats().length > 0">
          clear
        </button>
      </h5>
      <hr>
      <span v-for="stat in sessionStore.stats()">
        <span @click="statClicked(stat['i'])" class="clickable stat">{{msToHumanReadable(stat["ms"])}}</span>{{stat["i"] === sessionStore.stats().length-1 ? "" : ", "}}
      </span>
      <div v-if="sessionStore.stats().length === 0 && sessionStore.timerState === TimerState.NOT_RUNNING">
        Hold spacebar to start the timer
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
</style>