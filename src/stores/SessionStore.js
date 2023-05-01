import zbll_map from "@/assets/zbll_map.json"
import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {random_element} from "@/helpers/helpers";
import {mask_scramble} from "@/helpers/scramble_utils"

const statsKey = 'zbll_stats_array';
const initialStats = JSON.parse(localStorage.getItem(statsKey)) || []
console.log("initialStats", initialStats);

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

    const observingResult = ref(0)

    const store = ref({
    // contains result from SelectedStore.allSelectedCases().
    "allCases": [],

    // contains object: {oll, coll, zbll, scrambles: [array of strings], maskedScramble: "…", recapped: false}
    "current": null,

    // array of objects: {i=index, oll, coll, zbll, scramble, ms}
    "stats": initialStats
})

    const stats = () => store.value.stats

    const deleteResult = i => {
        store.value.stats.splice(i, 1)
        for (let j = Math.max(i-1, 0); j < store.value.stats.length; j++) {
            store.value.stats[j].i = j
        }
        observingResult.value = Math.max(0, stats().length - 1)
    }

    // Date object when timer was started
    const timerStarted = ref(0)

    const getRandomCase = () => {
        if (store.value.allCases.length === 0) {
            return null;
        }
        let c = random_element(store.value.allCases)
        c["maskedScramble"] = mask_scramble(random_element(c.scrambles));
        return c;
    }

    const setSelectedCases = (allCasesSelected) => {
        store.value.allCases = allCasesSelected;
        store.value.current = getRandomCase();
        timerState.value = TimerState.NOT_RUNNING; // prevent from changing cases while timer is running
    }
    const reset = () => {
        store.value.stats = [];
        store.value.current = getRandomCase();
        observingResult.value = 0
    }

    const startTimer = () => {
        timerStarted.value = Date.now();
        timerState.value = TimerState.RUNNING;
    }

    const stopTimer = () => {
        const index = store.value.stats.length
        if (store.value.current !== null) {
            store.value.stats.push({
                "i": index,
                "oll": store.value.current["oll"],
                "coll": store.value.current["coll"],
                "zbll": store.value.current["zbll"],
                "scramble": store.value.current["maskedScramble"],
                "ms": Date.now() - timerStarted.value
            })
        }
        store.value.current = getRandomCase();
        timerState.value = TimerState.STOPPING;
        observingResult.value = index
        localStorage.setItem(statsKey, JSON.stringify(store.value.stats))
    }

    // may be undefined
    const currentScramble = computed(() => store.value.current ? store.value.current["maskedScramble"] : null);

    return {reset, setSelectedCases, stats, deleteResult, observingResult, timerStarted, timerState, startTimer, stopTimer,
        recapMode, currentScramble}
});