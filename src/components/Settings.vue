<script setup>
import {useSettingsStore, fontsList} from "@/stores/SettingsStore";
import ThemesSelect from "@/components/ThemesSelect.vue";
import {defaultDarkName, defaultLightName, useThemeStore} from "@/stores/ThemeStore";
import {useI18n} from 'vue-i18n'
import {useDisplayStore} from "@/stores/DisplayStore";

const {t} = useI18n()
const themes = useThemeStore();
const settings = useSettingsStore()
const displayStore = useDisplayStore()

const onResetBtnClicked = () => {
  if (confirm(t("settings.are_you_sure_to_reset"))) {
    settings.resetDefaults()
    displayStore.showSettings = false
    themes.setLightTheme(defaultLightName)
    themes.setDarkTheme(defaultDarkName)
  }
}
</script>

<template>
  <div class="container border border-2 border-primary rounded-3 p-3 mx-2">
    <div class="d-lg-flex d-block align-items-center mb-3">
      <span class="h2 flex-grow-1">{{ $t("settings.settings_title") }}</span>
      <div class="d-lg-none d-block"><br></div>
      <button class="mx-2 btn btn-warning" @click="onResetBtnClicked">{{ $t("settings.reset_btn") }}</button>
      <button class="mx-2 btn btn-success" @click="displayStore.showSettings = false">{{ $t("settings.done_btn") }}
      </button>
    </div>
    <hr>
    <form>

      <div class="mb-2">
        <label for="scrambleFontSize" class="form-label">{{ $t("settings.scramble_size") }}</label>
        <input
            type="number"
            min="1" max="999" maxlength="3" size="5"
            class="mx-2" tabindex="-1" @keydown.space.prevent=""
            v-model.number="settings.scrambleFontSize" id="scrambleFontSize"/>
      </div>

      <div class="mb-2">
        <label for="timerFontSize" class="form-label">{{ $t("settings.timer_size") }}</label>
        <input
            type="number"
            min="1" max="999" maxlength="3" size="5"
            class="mx-2" tabindex="-1" @keydown.space.prevent=""
            v-model.number="settings.timerFontSize" id="timerFontSize"/>
      </div>

      <div class="mb-2">
        <label for="timerFont" class="form-label">{{ $t("settings.timer_font") }}</label>
        <select
            v-model="settings.timerFont"
            class="mx-2"
            tabindex="-1" @keydown.space.prevent=""
            id="timerFont">
          <option
              v-for="font in fontsList" :value="font" :key="font"
              :style="{ fontFamily: font, fontWeight : 700 }">
            {{ font }}
          </option>
        </select>
      </div>

      <div class="mb-2">
        <label for="pictureView" class="form-label">{{ $t("settings.zbll_pictures_view") }}</label>
        <select
            v-model="settings.pictureView"
            class="mx-2"
            tabindex="-1" @keydown.space.prevent=""
            id="pictureView">

          <option value="3D">{{ $t("settings.zbll_pictures_side") }}</option>
          <option value="top">{{ $t("settings.zbll_pictures_top") }}</option>
        </select>
      </div>

      <div class="mb-2">
        <label for="timerUpdate" class="form-label">{{ $t("settings.timer_update") }}</label>
        <select
            v-model="settings.timerUpdate"
            class="mx-2" tabindex="-1" @keydown.space.prevent=""
            id="timerUpdate">
          <option value="on">{{ $t("settings.timer_update_on") }}</option>
          <option value="seconds">{{ $t("settings.timer_update_seconds") }}</option>
          <option value="off">{{ $t("settings.timer_update_off") }}</option>
        </select>
      </div>

      <div class="mb-2">
        <label for="timerPrecision" class="form-label">{{ $t("settings.timer_precision") }}</label>
        <select
            class="mx-2" tabindex="-1" @keydown.space.prevent=""
            v-model.number="settings.timerPrecision" id="timerPrecision">
          <option value="1">1/10</option>
          <option value="2">1/100</option>
          <option value="3">1/1000</option>
        </select>
      </div>

      <div class="mb-2">
        <label for="timerStartDelayMs" class="form-label">Timer start delay (ms)</label>
        <select
            class="mx-2" tabindex="-1" @keydown.space.prevent=""
            v-model.number="settings.timerStartDelayMs" id="timerStartDelayMs">
          <option value="0">0</option>
          <option value="100">100</option>
          <option value="300">300</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>

      <div class="mb-2">
        <label for="scrambleEnding" class="form-label">Scramble appendix</label>
        <select
            class="mx-2" tabindex="-1" @keydown.space.prevent=""
            v-model.number="settings.scrambleAppendix" id="scrambleAppendix">
          <option value="None">None</option>
          <option value="R U' R'">R U' R'</option>
          <option value="R U R'">R U R'</option>
          <option value="L U L'">L U L'</option>
          <option value="L U' L'">L U' L'</option>
<!--          TODO add "R' U R", "R' U' R'", "Random R" and "Random/ALL"-->
        </select>
      </div>

      <div class="mb-2">
        <label for="DarkTheme" class="form-label">{{ $t("settings.dark_theme") }}</label>
        <ThemesSelect selectId="DarkTheme" is-dark="true"/>
      </div>

      <div class="mb-2">
        <label for="LightTheme" class="form-label">{{ $t("settings.light_theme") }}</label>
        <ThemesSelect selectId="LightTheme" is-dark="false"/>
      </div>

    </form>
  </div>
</template>

<style scoped>
</style>