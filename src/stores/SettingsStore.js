import {ref, watch} from 'vue'
import {defineStore} from 'pinia'

export const fontsList = ["Roboto Mono", "Courier New", "Ubuntu Mono", "Arial", "Helvetica",
    "sans-serif", "Times", "serif",]

const pictureViewKey = 'zbll_picture_view'
const timerUpdateKey = 'zbll_timerUpdate'
const timerPrecisionKey = 'zbll_timerPrecision'
const timerFontKey = 'zbll_timerFont'
const scrambleFonSizeKey = 'zbll_scrambleFontSize'
const timerFontSizeKey = 'zbll_timerFontSize'
const showHowToKey = 'zbll_showHowTo'
const timerStartDelayMsKey = 'zbll_timerStartDelayMs'
const scrambleAppendixKey = 'zbll_scrambleAppendix'

const initialPictureView = () => localStorage.getItem(pictureViewKey) ?? "top"
const initialTimerUpdate = () => localStorage.getItem(timerUpdateKey) ?? "seconds"
const initialTimerPrecision = () => parseInt(localStorage.getItem(timerPrecisionKey) ?? "2")
const initialTimerFont = () => localStorage.getItem(timerFontKey) ?? "Roboto Mono"
const initialScrambleFontSize = () => parseInt(localStorage.getItem(scrambleFonSizeKey) ?? "28")
const initialTimerFontSize = () => parseInt(localStorage.getItem(timerFontSizeKey) ?? "64")
const initialShowHowTo = () => localStorage.getItem(showHowToKey) !== 'false' ?? true
const initialTimerStartDelayMs = () => parseInt(localStorage.getItem(timerStartDelayMsKey) ?? "100")
const initialScrambleAppendix = () => localStorage.getItem(scrambleAppendixKey) ?? "None"

export const useSettingsStore = defineStore('settings', () => {
    const pictureView = ref(initialPictureView())
    const timerUpdate = ref(initialTimerUpdate())
    const timerPrecision = ref(initialTimerPrecision())
    const timerFont = ref(initialTimerFont())
    const scrambleFontSize = ref(initialScrambleFontSize())
    const timerFontSize = ref(initialTimerFontSize())
    const showHowTo = ref(initialShowHowTo())
    const timerStartDelayMs = ref(initialTimerStartDelayMs())
    const scrambleAppendix = ref(initialScrambleAppendix())

    const resetDefaults = () => {
        pictureView.value = "top" // "top" / "3D"
        timerUpdate.value = "seconds"
        timerPrecision.value = 2
        timerFont.value = "Roboto Mono"
        scrambleFontSize.value = 28
        timerFontSize.value = 64
        showHowTo.value = true
        timerStartDelayMs.value = 100
        scrambleAppendix.value = "None"
    }

    // TODO instead of these watchers, add one deep watcher to the store
    watch(pictureView, () => localStorage.setItem(pictureViewKey, pictureView.value))
    watch(timerUpdate, () => localStorage.setItem(timerUpdateKey, timerUpdate.value))
    watch(timerPrecision, () => localStorage.setItem(timerPrecisionKey, `${timerPrecision.value}`))
    watch(timerFont, () => localStorage.setItem(timerFontKey, timerFont.value))
    watch(scrambleFontSize, () => localStorage.setItem(scrambleFonSizeKey, `${scrambleFontSize.value}`))
    watch(timerFontSize, () => localStorage.setItem(timerFontSizeKey, `${timerFontSize.value}`))
    watch(showHowTo, () => localStorage.setItem(showHowToKey, showHowTo.value))
    watch(timerStartDelayMs, () => localStorage.setItem(timerStartDelayMsKey, `${timerStartDelayMs.value}`))
    watch(scrambleAppendix, () => localStorage.setItem(scrambleAppendixKey, scrambleAppendix.value))

    return {
        resetDefaults, pictureView, timerUpdate, timerPrecision,
        timerFont, scrambleFontSize, timerFontSize, showHowTo, timerStartDelayMs, scrambleAppendix
    }
});
