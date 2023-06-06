import {reactive, watch} from 'vue'
import {defineStore} from 'pinia'

const localStoreKey = "zbll2_presets_arrays";
export const starredName = "⭐" // do not make it locale-based!

const loadFromLocalStorage = () => {
    // load as map {name -> array}, return as map {name -> Set}
    const loadedMap = JSON.parse(localStorage.getItem(localStoreKey) ?? `{"${starredName}": []}`)
    const result = {}
    for (const name in loadedMap) {
        result[name] = new Set(loadedMap[name])
    }
    return result
}

const saveToLocalStorage = (map) => {
    const mapToSave = {}
    for (const name in map) {
        mapToSave[name] = [...map[name]]
    }
    localStorage.setItem(localStoreKey, JSON.stringify(mapToSave))
}

export const usePresetsStore = defineStore('presets', () => {
    // {name: [array of cases], name: [other array], …}
    const map = reactive(loadFromLocalStorage())

    // set (save) preset
    const setPreset = (name, keys) => {
        map[name] = new Set(keys)
    }

    // returns set of keys by preset name
    const getCases = presetName => {
        return map[presetName] ?? new Set()
    }

    // delete preset by name
    const deletePreset = name => {
        delete map[name]
    }

    const hasCase = (name, key) => {
        return getCases(name).has(key)
    }

    const addToPreset = (presetName, caseKey) => {
        getCases(presetName).add(caseKey)
    }

    const removeFromPreset = (presetName, caseKey) => {
        map[presetName].delete(caseKey)
    }

    const toggleAddRemove = (presetName, caseKey) => {
        if (!caseKey || typeof caseKey !== "string") {
            return console.error("toggleAddRemove: caseKey is not a string", caseKey)
        }
        console.log("toggleAddRemove to ", presetName, caseKey)
        const action = hasCase(presetName, caseKey) ? removeFromPreset : addToPreset
        action(presetName, caseKey)
    }

    watch(map, () => saveToLocalStorage(map))

    return {
        map,
        setPreset,
        getCases,
        deletePreset,
        hasCase,
        addToPreset,
        removeFromPreset,
        toggleAddRemove,
        starredName
    }
});