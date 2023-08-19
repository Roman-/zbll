<script setup>

import {useSessionStore} from "@/stores/SessionStore";
import {computed} from "vue";
import {useSettingsStore} from "@/stores/SettingsStore";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const session = useSessionStore()
const settings = useSettingsStore()
const scramble = computed(() => session.currentScramble ?? t("timer.no_scramble"))
const appendix = computed(() => settings.store.scrambleAppendix === "None" ? "" : " " + settings.store.scrambleAppendix)

</script>

<template>
  <h3 class="border-bottom border-secondary m-1">
    <span class="opacity-50 d-none d-sm-inline-block">{{$t("timer.scramble") + '&nbsp;'}} </span>
    <span :style="{ fontSize: settings.store.scrambleFontSize + 'px' }">
      {{ scramble }}
      <span class="opacity-75">{{appendix}}</span>
    </span>
  </h3>
</template>

<style scoped>
</style>