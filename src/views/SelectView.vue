<script setup>
import MainZbllGrid from "@/components/select_view/MainZbllGrid.vue";
import Settings from "@/components/Settings.vue";
import {useSettingsStore} from "@/stores/SettingsStore";

const settingsStore = useSettingsStore()
</script>

<template>
  <div v-if="settingsStore.showSettings" class="m-2">
    <Settings/>
  </div>
  <MainZbllGrid/>
</template>

<style scoped>
</style>