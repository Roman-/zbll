import {reactive, watch} from 'vue'
import {defineStore} from 'pinia'

export const fontsList = ["Roboto Mono", "Courier New", "Ubuntu Mono", "Arial", "Helvetica",
    "sans-serif", "Times", "serif",]

const defaultSettings = {
    pictureView: "top",
    timerUpdate: "seconds",
    timerPrecision: 2,
    timerFont: fontsList[0],
    scrambleFontSize: 28,
    timerFontSize: 64,
    showHowTo: true,
    timerStartDelayMs: 100,
    scrambleAppendix: "None",
}

const settingsLocalStorageKey = "zbllTrainerSettings"

export const useSettingsStore = defineStore('settings', () => {
    const store = reactive(
        JSON.parse(localStorage.getItem(settingsLocalStorageKey)) || defaultSettings
    )

    const resetDefaults = () => {
        for (let key in defaultSettings) {
            store[key] = defaultSettings[key]
        }
    }

    watch(() => store, () => {
        localStorage.setItem(settingsLocalStorageKey, JSON.stringify(store))
    }, {deep: true})

    return { resetDefaults, store }
});