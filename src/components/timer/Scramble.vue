<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {useSessionStore} from "@/stores/SessionStore";
import {computed} from "vue";

const selectedStore = useSelectedStore()
const sessionStore = useSessionStore()
const scramble = computed(() => sessionStore.currentScramble ?? "(no scramble available)")

</script>

<template>
  <h3 class="border-bottom border-secondary m-1">
    <span class="text-secondary">Scramble: </span>
    <span>{{scramble}}</span>
  </h3>
</template>

<style scoped>
</style>