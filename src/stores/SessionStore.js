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
        // array of keys selected
        "keys": [],

        // Shortest common scramble length
        "scrambleLength": 0,

        // map key => count
        "keysCount": {},

        // currently (to be solved) object from allCases: {key: string, scramble: string, count: num}
        "currentKey": null,

        "currentScramble": null,

        // array of objects: {i=index, key, scramble, ms}
        "stats": initialStats,
    })

    const stats = () => store.value.stats

    const resetKeysCount = () => {
        store.value.keysCount = {}
        store.value.keys.forEach(k => store.value.keysCount[k] = 0)
    }

    const deleteResult = i => {
        store.value.stats.splice(i, 1)
        // rebuild indexes
        for (let j = Math.max(i - 1, 0); j < store.value.stats.length; j++) {
            store.value.stats[j].i = j
        }
        observingResult.value = Math.max(0, stats().length - 1)
    }

    // Date object when timer was started
    const timerStarted = ref(0)

    const casesWithZeroCount = computed(() => {
        return Object.keys(store.value.keysCount).filter(key => store.value.keysCount[key] === 0)
    });

    // returns key
    const setRandomCase = () => {
        if (store.value.keys.length === 0) {
            return null;
        }
        if (recapMode.value) {
            if (casesWithZeroCount.value.length === 0) {
                recapMode.value = false
                return setRandomCase() // recursively return random case with no recap mode
            }
            store.value.currentKey = random_element(casesWithZeroCount.value)
        } else {
            if (Math.random() < 0.2) {
                // set current key to the least counted one (random if multiple)
                const minCount = Math.min(...Object.values(store.value.keysCount))
                const leastCountedKeys = Object.keys(store.value.keysCount).filter(key => store.value.keysCount[key] === minCount)
                store.value.currentKey = random_element(leastCountedKeys)
            } else {
                store.value.currentKey = random_element(store.value.keys)
            }
        }
        store.value.currentScramble = makeScramble(store.value.currentKey, store.value.scrambleLength)
    }

    const setSelectedKeys = (keys, scrambleLength) => {
        timerState.value = TimerState.NOT_RUNNING
        recapMode.value = false
        store.value.keys = keys
        store.value.scrambleLength = scrambleLength
        resetKeysCount() // TODO maybe don't reset every time
        setRandomCase()
    }

    const clearSession = () => {
        store.value.stats = [];
        observingResult.value = 0
    }

    const startTimer = () => {
        timerStarted.value = Date.now();
        timerState.value = TimerState.RUNNING;
    }

    const stopTimer = () => {
        const index = store.value.stats.length
        if (store.value.currentKey !== null) {
            const key = store.value.currentKey
            store.value.stats.push({
                "i": index,
                "key": key,
                "scramble": currentScramble.value,
                "ms": Date.now() - timerStarted.value
            })
            store.value.keysCount[key]++;
        }
        setRandomCase()
        timerState.value = TimerState.STOPPING;
        observingResult.value = index
        localStorage.setItem(statsKey, JSON.stringify(store.value.stats))
    }

    const startRecap = () => {
        resetKeysCount()
        recapMode.value = true
        setRandomCase()
    }

    // may be undefined
    const currentScramble = computed(() => store.value.currentScramble)

    return { clearSession, setSelectedKeys, stats, deleteResult,
        observingResult, timerStarted, timerState, startTimer, stopTimer,
        recapMode, startRecap, currentScramble, casesWithZeroCount
    }
});