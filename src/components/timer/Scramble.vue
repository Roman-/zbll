<script setup>

import {useSessionStore} from "@/stores/SessionStore";
import {computed} from "vue";
import {useSettingsStore} from "@/stores/SettingsStore";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const sessionStore = useSessionStore()
const settingsStore = useSettingsStore()
const scramble = computed(() => sessionStore.currentScramble ?? t("timer.no_scramble"))

</script>

<template>
  <h3 class="border-bottom border-secondary m-1">
    <span class="text-secondary">Scramble: </span>
    <span
        :style="{ fontSize: settingsStore.scrambleFontSize + 'px' }"
    >
      {{ scramble }}</span>
  </h3>
</template>

<style scoped>
</style>