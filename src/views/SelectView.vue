<script setup>
import MainZbllGrid from "@/components/select_view/MainZbllGrid.vue";
import Settings from "@/components/Settings.vue";
import {useSettingsStore} from "@/stores/SettingsStore";

const settingsStore = useSettingsStore()
</script>

<template>
  <Settings v-if="settingsStore.showSettings"/>
  <MainZbllGrid/>
</template>

<style scoped>
</style>