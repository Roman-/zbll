<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {useSessionStore} from "@/stores/SessionStore";

const selectedStore = useSelectedStore()
const sessionStore = useSessionStore()
sessionStore.reset(selectedStore.getAllSelectedCases)

</script>

<template>
  <h3 class="border-bottom border-secondary m-1">
    <span class="text-secondary">Scramble: </span>
    <span>{{sessionStore.currentScramble}}</span>
  </h3>
</template>

<style scoped>
</style>