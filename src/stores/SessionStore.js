import {defineStore} from 'pinia'
import {computed, reactive, ref, watch} from "vue";
import {random_element} from "@/helpers/helpers";
import {makeScramble} from "@/helpers/scramble_utils"

const statsKey = 'zbll_stats_array';
const initialStats = JSON.parse(localStorage.getItem(statsKey)) || []
const storeKey = 'zbll_store';

const initialStore = JSON.parse(localStorage.getItem(storeKey)) || {
    // array of keys selected
    "keys": [],

    "recapMode": false,

    // Shortest common scramble length
    "scrambleLength": 0,

    // map key => count
    "keysCount": {},

    // currently (to be solved) object from allCases: {key: string, scramble: string, count: num}
    "currentKey": null,

    "currentScramble": null,

    // array of objects: {i=index, key, scramble, ms}
    "stats": initialStats,
}

export const TimerState = Object.freeze({
    NOT_RUNNING: 0,
    AWAITING_READY: 1, // user just started to hold space but there is the gap still
    READY: 2, // space button held down to start
    RUNNING: 3,
    STOPPING: 4, // space button held down after timer stopped
});

// store for current case/scramble and stats
export const useSessionStore = defineStore('session', () => {
    const store = reactive(initialStore)

    const timerState = ref(TimerState.NOT_RUNNING)

    const observingResult = ref(0)

    const stats = () => store.stats

    const resetKeysCount = () => {
        store.keysCount = {}
        store.keys.forEach(k => store.keysCount[k] = 0)
    }

    const deleteResult = i => {
        // "undo" the result, recovering its recap in case of misscramble
        const key = store.stats[i].key
        if (store.keysCount[key] > 0) {
            store.keysCount[key]--
        }
        store.stats.splice(i, 1)
        // rebuild indexes
        for (let j = Math.max(i - 1, 0); j < store.stats.length; j++) {
            store.stats[j].i = j
        }
        observingResult.value = Math.max(0, stats().length - 1)
    }

    // Date object when timer was started
    const timerStarted = ref(0)

    const casesWithZeroCount = computed(() => {
        return Object.keys(store.keysCount).filter(key => store.keysCount[key] === 0)
    });

    // returns key
    const setRandomCase = () => {
        if (store.keys.length === 0) {
            return null;
        }
        if (store.recapMode) {
            if (casesWithZeroCount.value.length === 0) {
                store.recapMode = false
                return setRandomCase() // recursively return random case with no recap mode
            }
            store.currentKey = random_element(casesWithZeroCount.value)
        } else {
            if (Math.random() < 0.2) {
                // set current key to the least counted one (random if multiple)
                const minCount = Math.min(...Object.values(store.keysCount))
                const leastCountedKeys = Object.keys(store.keysCount).filter(key => store.keysCount[key] === minCount)
                store.currentKey = random_element(leastCountedKeys)
            } else {
                store.currentKey = random_element(store.keys)
            }
        }
        store.currentScramble = makeScramble(store.currentKey, store.scrambleLength)
    }

    const setSelectedKeys = (keys, scrambleLength) => {
        timerState.value = TimerState.NOT_RUNNING
        store.recapMode = false
        store.keys = keys
        store.scrambleLength = scrambleLength
        resetKeysCount() // TODO maybe don't reset every time
        setRandomCase()
    }

    const clearSession = () => {
        store.stats = [];
        observingResult.value = 0
    }

    // when the competitor places his hands on the timer (aka holds spacebar)
    const getTimerReady = (timerStartDelayMs) => {
        if (timerState.value !== TimerState.NOT_RUNNING) {
            return // do nothing if timer is already running / waiting
        }
        if (timerStartDelayMs > 0) {
            console.log(">0 = ", timerStartDelayMs);
            timerState.value = TimerState.AWAITING_READY
            setTimeout(() => {
                if (timerState.value === TimerState.AWAITING_READY) {
                    timerState.value = TimerState.READY
                }
            }, timerStartDelayMs)
        } else {
            console.log("not >0 = ", timerStartDelayMs);
            timerState.value = TimerState.READY
        }
    }

    const startTimer = () => {
        timerStarted.value = Date.now();
        timerState.value = TimerState.RUNNING;
    }

    const stopTimer = () => {
        const index = store.stats.length
        if (store.currentKey !== null) {
            const key = store.currentKey
            store.stats.push({
                "i": index,
                "key": key,
                "scramble": currentScramble.value,
                "ms": Date.now() - timerStarted.value
            })
            store.keysCount[key]++;
        }
        setRandomCase()
        timerState.value = TimerState.STOPPING;
        observingResult.value = index
    }

    watch(store, () => { localStorage.setItem(storeKey, JSON.stringify(store)) })

    const startRecap = () => {
        resetKeysCount()
        store.recapMode = true
        setRandomCase()
    }

    // may be undefined
    const currentScramble = computed(() => store.currentScramble)

    return { store, clearSession, setSelectedKeys, stats, deleteResult,
        observingResult, timerStarted, timerState, getTimerReady, startTimer, stopTimer,
        startRecap, currentScramble, casesWithZeroCount
    }
});