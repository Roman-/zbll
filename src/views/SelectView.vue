<script setup>
import MainZbllGrid from "@/components/select_view/MainZbllGrid.vue";
import SelectHelpCard from "@/components/select_view/SelectHelpCard.vue";
import Settings from "@/components/Settings.vue";
import {useSettingsStore} from "@/stores/SettingsStore";

const settingsStore = useSettingsStore()
</script>

<template>
  <div v-if="settingsStore.showSettings" class="m-2">
    <Settings/>
  </div>
  <div class="row gy-0 justify-content-start align-items-start">
    <div class="col-lg-auto col-sm-12 m-0">
      <MainZbllGrid/>
    </div>
    <div class="col">
      <SelectHelpCard/>
    </div>
  </div>
</template>

<style scoped>
</style>