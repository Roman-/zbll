import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {random_element} from "@/helpers/helpers";
import {makeScramble} from "@/helpers/scramble_utils"

const statsKey = 'zbll_stats_array';
const initialStats = JSON.parse(localStorage.getItem(statsKey)) || []

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

    // contains object from allCases: {oll, coll, zbll, algs: [array of strings], scramble: "…", recapped: false, count: num}
    "current": null,

    // array of objects: {i=index, oll, coll, zbll, scramble, ms}
    "stats": initialStats,
})

    const stats = () => store.value.stats

    const deleteResult = i => {
        store.value.stats.splice(i, 1)
        // rebuild indexes
        for (let j = Math.max(i-1, 0); j < store.value.stats.length; j++) {
            store.value.stats[j].i = j
        }
        observingResult.value = Math.max(0, stats().length - 1)
    }

    // Date object when timer was started
    const timerStarted = ref(0)

    const casesWithZeroCount = computed(() => {
        return store.value.allCases.filter(c => c["count"] === 0);
    });

    const getRandomCase = () => {
        if (store.value.allCases.length === 0) {
            return null;
        }
        let c = {};
        if (recapMode.value) {
            if (casesWithZeroCount.value.length === 0) {
                recapMode.value = false
                return getRandomCase() // recursively return random case with no recap mode
            }
            c = random_element(casesWithZeroCount.value)
        } else {
            c = random_element(store.value.allCases) // TODO 0.2 probability, return least counted case
        }
        c["scramble"] = makeScramble(random_element(c.algs));
        return c;
    }

    const setSelectedCases = allCasesSelected => {
        recapMode.value = false // unfortunately, resetting store.value.allCases will reset cases count
        store.value.allCases = allCasesSelected;
        store.value.current = getRandomCase();
        timerState.value = TimerState.NOT_RUNNING; // prevent from changing cases while timer is running
    }
    const reset = allCasesSelected => {
        store.value.stats = [];
        setSelectedCases(allCasesSelected)
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
            const key = store.value.current["key"]
            store.value.stats.push({
                "i": index,
                "oll": store.value.current["oll"],
                "coll": store.value.current["coll"],
                "zbll": store.value.current["zbll"],
                "key": key,
                "scramble": store.value.current["scramble"],
                "ms": Date.now() - timerStarted.value
            })
            store.value.current["count"]++;
        }
        store.value.current = getRandomCase();
        timerState.value = TimerState.STOPPING;
        observingResult.value = index
        localStorage.setItem(statsKey, JSON.stringify(store.value.stats))
    }

    // may be undefined
    const currentScramble = computed(() => store.value.current ? store.value.current["scramble"] : null);

    return {reset, setSelectedCases, stats, deleteResult, observingResult, timerStarted, timerState, startTimer, stopTimer,
        recapMode, currentScramble, casesWithZeroCount}
});