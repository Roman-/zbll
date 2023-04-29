import zbll_map from "@/assets/zbll_map.json"
import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {random_element} from "@/helpers/helpers";
import {mask_scramble} from "@/helpers/scramble_utils";

export const TimerState = Object.freeze({
    NOT_RUNNING: 0,
    READY: 1, // space button held down to start
    RUNNING: 2,
    STOPPING: 3, // space button held down after timer stopped
});

// store for current case/scramble and stats
export const useSessionStore = defineStore('session', () => {
    const recapMode = ref(false)

    const timerState = ref(TimerState.NOT_RUNNING)

    const store = ref({
        // contains result from SelectedStore.getAllSelectedCases().
        "allCases": [],

        // contains object: {oll, coll, zbll, scrambles: [array of strings], maskedScramble: "…", recapped: false}
        "current": {},

        // array of objects: {oll, coll, zbll, scramble, ms}
        "stats": []
    })

    const stats = () => store.value.stats

    // Date object when timer was started
    const timerStarted = ref(0)

    const getRandomCase = () => {
        if (store.value.allCases.length === 0) {
            return {};
        }
        let c = random_element(store.value.allCases)
        c["maskedScramble"] = mask_scramble(random_element(c.scrambles));
        return c;
    }

    const reset = (allCasesSelected) => {
        store.value.allCases = allCasesSelected;
        store.value.stats = [];
        store.value.current = getRandomCase();
    }

    const startTimer = () => {
        timerStarted.value = Date.now();
        timerState.value = TimerState.RUNNING;
    }

    const stopTimer = () => {
        store.value.stats.push({
            "oll" : store.value.current["oll"],
            "coll" : store.value.current["coll"],
            "zbll" : store.value.current["zbll"],
            "scramble" : store.value.current["maskedScramble"],
            "ms" : Date.now() - timerStarted.value
        })
        store.value.current = getRandomCase();
        timerState.value = TimerState.STOPPING;
    }

    const currentScramble = computed(() => store.value.current["maskedScramble"] ?? "(no scramble available)");

    return {reset, stats, timerStarted, timerState, startTimer, stopTimer,
        recapMode, currentScramble}
});