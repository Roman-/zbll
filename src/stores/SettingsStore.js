import {computed, ref, watch} from 'vue'
import { defineStore } from 'pinia'

const pictureViewKey = 'zbll_picture_view';
const timerUpdateKey = 'zbll_timerUpdate';
const timerPrecisionKey = 'zbll_timerPrecision';
const timerFontKey = 'zbll_timerFont';
const scrambleFontKey = 'zbll_scrambleFont';
const showLangIconKey = 'zbll_showLangIcon';
const showHowToKey = 'zbll_showHowTo';

const initialPictureView = () => localStorage.getItem(pictureViewKey) ?? "top"
const initialTimerUpdate = () => localStorage.getItem(timerUpdateKey) ?? "on"
const initialTimerPrecision = () => localStorage.getItem(timerPrecisionKey) ?? "2"
const initialTimerFont = () => localStorage.getItem(timerFontKey) ?? "Roboto Mono"
const initialScrambleFont = () => localStorage.getItem(scrambleFontKey) ?? "Roboto Mono"
const initialShowLangIcon = () => localStorage.getItem(showLangIconKey) !== 'false' ?? true
const initialShowHowTo = () => localStorage.getItem(showHowToKey) !== 'false' ?? true

export const useSettingsStore = defineStore('settings', () => {
  const showSettings = ref(false)
  const resetDefaults = () => {
    pictureView.value = "top"
    timerUpdate.value = "on"
    timerPrecision.value = "2"
    timerFont.value = "Roboto Mono"
    scrambleFont.value = "Roboto Mono"
    showLangIcon.value = true
    showHowTo.value = true
  }

  const pictureView = ref(initialPictureView())
  const timerUpdate = ref(initialTimerUpdate())
  const timerPrecision = ref(initialTimerPrecision())
  const timerFont = ref(initialTimerFont())
  const scrambleFont = ref(initialScrambleFont())
  const showLangIcon = ref(initialShowLangIcon())
  const showHowTo = ref(initialShowHowTo())

  watch(pictureView, () => localStorage.setItem(pictureViewKey, pictureView.value))
  watch(timerUpdate, () => localStorage.setItem(timerUpdateKey, timerUpdate.value))
  watch(timerPrecision, () => localStorage.setItem(timerPrecisionKey, timerPrecision.value))
  watch(timerFont, () => localStorage.setItem(timerFontKey, timerFont.value))
  watch(scrambleFont, () => localStorage.setItem(scrambleFontKey, scrambleFont.value))
  watch(showLangIcon, () => localStorage.setItem(showLangIconKey, showLangIcon.value))
  watch(showHowTo, () => localStorage.setItem(showHowToKey, showHowTo.value))

  return {showSettings, resetDefaults, pictureView, timerUpdate, timerPrecision, timerFont, scrambleFont,
    showLangIcon, showHowTo}
});
