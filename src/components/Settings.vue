<script setup>
import {useSettingsStore} from "@/stores/SettingsStore";
import ThemesSelect from "@/components/ThemesSelect.vue";

const settingsStore = useSettingsStore()

const onResetBtnClicked = () => {
  if (confirm("Are you sure you want to reset all settings to default?"))
    settingsStore.resetDefaults()
}

</script>

<template>
  <div class="container border border-2 border-primary rounded-3 p-3">
    <span class="h2">Settings</span>
    <button class="mx-2 btn btn-success" @click="settingsStore.showSettings = false">Done</button>
    <button class="mx-2 btn btn-warning" @click="onResetBtnClicked">Reset</button>
    <hr>
    <form>
      <div class="mb-2">
        <label for="pictureView" class="form-label">ZBLL Pictures View</label>
        <select
            v-model="settingsStore.pictureView"
            class="mx-2"
            tabindex="-1"
            @keydown.space.prevent=""
            id="pictureView">

          <option value="3D">3D</option>
          <option value="top">Top</option>
        </select>
      </div>

      <div class="mb-2">
        <label for="timerUpdate" class="form-label">Timer Update</label>
        <select
            v-model="settingsStore.timerUpdate"
            class="mx-2" tabindex="-1" @keydown.space.prevent=""
            id="timerUpdate">
          <option value="on">On</option>
          <option value="seconds">Seconds only</option>
          <option value="off">Off</option>
        </select>
      </div>

      <div class="mb-2">
        <label for="timerPrecision" class="form-label">Timer Precision</label>
        <select
            class="mx-2" tabindex="-1" @keydown.space.prevent=""
            v-model.number="settingsStore.timerPrecision" id="timerPrecision">
          <option value="1">1/10</option>
          <option value="2">1/100</option>
          <option value="3">1/1000</option>
        </select>
      </div>

      <div class="mb-2">
        <label for="DarkTheme" class="form-label">Timer Precision</label>
        <ThemesSelect selectId="DarkTheme" is-dark="true"/>
      </div>

      <div class="mb-2">
        <label for="LightTheme" class="form-label">Timer Precision</label>
        <ThemesSelect selectId="LightTheme" is-dark="false"/>
      </div>

      <!-- Add your ScrambleFontSettings and TimerFontSettings components here -->

      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="showLangIcon" v-model="settingsStore.showLangIcon">
        <label class="form-check-label" for="showLangIcon">Show language button</label>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>