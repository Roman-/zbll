<script setup>

import {useThemeStore} from "@/stores/ThemeStore";
const themeStore = useThemeStore();

</script>

<template>
  <button
      tabindex="-1"
      @keydown.space.prevent=""
      class="btn btn-link text-info"
      @click="themeStore.toggleDayNight()"
      :title="$t('nav.toggle_night_mode')">
    <i class="bi-moon font_bigger" :class="themeStore.icon"/>
  </button>
</template>

<style scoped>
</style>