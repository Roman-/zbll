<script setup>

import {useSessionStore} from "@/stores/SessionStore";
import {computed} from "vue";
import {useSettingsStore} from "@/stores/SettingsStore";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const sessionStore = useSessionStore()
const settingsStore = useSettingsStore()
const scramble = computed(() => sessionStore.currentScramble ?? t("timer.no_scramble"))
const appendix = computed(() => settingsStore.scrambleAppendix === "None" ? "" : " " + settingsStore.scrambleAppendix)

</script>

<template>
  <h3 class="border-bottom border-secondary m-1">
    <span class="opacity-50 d-none d-sm-inline-block">{{$t("timer.scramble") + '&nbsp;'}} </span>
    <span :style="{ fontSize: settingsStore.scrambleFontSize + 'px' }">
      {{ scramble }}
      <span class="opacity-75">{{appendix}}</span>
    </span>
  </h3>
</template>

<style scoped>
</style>