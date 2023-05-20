import {ref, watch} from 'vue'
import { defineStore } from 'pinia'

export const fontsList = ["Roboto Mono", "Courier New", "Lucida Console", "Monaco", "Consolas", "Andale Mono",
  "Ubuntu Mono", "Menlo", "Source Code Pro", "Arial", "Helvetica", "sans-serif", "Times New Roman", "Times", "serif",]

const pictureViewKey = 'zbll_picture_view';
const timerUpdateKey = 'zbll_timerUpdate';
const timerPrecisionKey = 'zbll_timerPrecision';
const timerFontKey = 'zbll_timerFont';
const scrambleFonSizeKey = 'zbll_scrambleFontSize';
const timerFontSizeKey = 'zbll_timerFontSize';
const showHowToKey = 'zbll_showHowTo';

const initialPictureView = () => localStorage.getItem(pictureViewKey) ?? "top"
const initialTimerUpdate = () => localStorage.getItem(timerUpdateKey) ?? "on"
const initialTimerPrecision = () => parseInt(localStorage.getItem(timerPrecisionKey) ?? "2")
const initialTimerFont = () => localStorage.getItem(timerFontKey) ?? "Roboto Mono"
const initialScrambleFontSize = () => parseInt(localStorage.getItem(scrambleFonSizeKey) ?? "28")
const initialTimerFontSize = () => parseInt(localStorage.getItem(timerFontSizeKey) ?? "64")
const initialShowHowTo = () => localStorage.getItem(showHowToKey) !== 'false' ?? true

export const useSettingsStore = defineStore('settings', () => {
  const resetDefaults = () => {
    pictureView.value = "top"
    timerUpdate.value = "on"
    timerPrecision.value = 2
    timerFont.value = "Roboto Mono"
    scrambleFontSize.value = 28
    timerFontSize.value = 64
    showHowTo.value = true
  }

  const pictureView = ref(initialPictureView())
  const timerUpdate = ref(initialTimerUpdate())
  const timerPrecision = ref(initialTimerPrecision())
  const timerFont = ref(initialTimerFont())
  const scrambleFontSize = ref(initialScrambleFontSize())
  const timerFontSize = ref(initialTimerFontSize())
  const showHowTo = ref(initialShowHowTo())

  watch(pictureView, () => localStorage.setItem(pictureViewKey, pictureView.value))
  watch(timerUpdate, () => localStorage.setItem(timerUpdateKey, timerUpdate.value))
  watch(timerPrecision, () => localStorage.setItem(timerPrecisionKey, `${timerPrecision.value}`))
  watch(timerFont, () => localStorage.setItem(timerFontKey, timerFont.value))
  watch(scrambleFontSize, () => localStorage.setItem(scrambleFonSizeKey, `${scrambleFontSize.value}`))
  watch(timerFontSize, () => localStorage.setItem(timerFontSizeKey, `${timerFontSize.value}`))
  watch(showHowTo, () => localStorage.setItem(showHowToKey, showHowTo.value))

  return {resetDefaults, pictureView, timerUpdate, timerPrecision,
    timerFont, scrambleFontSize, timerFontSize, showHowTo}
});
