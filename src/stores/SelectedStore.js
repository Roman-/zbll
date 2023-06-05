import {computed, reactive, watch} from 'vue'
import { defineStore } from 'pinia'
import zbll_map_next from "@/assets/zbll_map_next.json"

const localStoreKey = "currentZbllArray";
const loadedArray = JSON.parse(localStorage.getItem(localStoreKey) || "[]")

export const useSelectedStore = defineStore('selected', () => {
  const allZbllKeysArray = Object.keys(zbll_map_next)

  const store = reactive({
    keySet: new Set(loadedArray)
  })

  const keySet = computed(() => store.keySet)

  const applyFromPreset = presetKeySet => store.keySet = presetKeySet

  const removeAllCases = () => store.keySet.clear()

  const removeOll = oll => {
    store.keySet = new Set([...store.keySet].filter(key => !key.startsWith(`${oll} `)))
  }

  const addOll = oll => {
    allZbllKeysArray.filter(key => key.startsWith(`${oll} `)).forEach(key => store.keySet.add(key))
  }

  const addColl = (oll, coll) => {
    allZbllKeysArray.filter(key => key.startsWith(`${oll} ${coll} `)).forEach(key => store.keySet.add(key))
  }

  const addZbll = (oll, coll, zbll) => store.keySet.add(`${oll} ${coll} ${zbll}`)

  // remove all coll cases
  const removeColl = (oll, coll) => {
    store.keySet = new Set([...store.keySet].filter(key => !key.startsWith(`${oll} ${coll} `)))
  }

  const removeZbll = (oll, coll, zbll) => store.keySet.delete(`${oll} ${coll} ${zbll}`)

  const isZbllSelected = (oll, coll, zbll) => store.keySet.has(`${oll} ${coll} ${zbll}`)

  const numZbllsInCollSelected = (oll, coll) => {
    return [...store.keySet].filter(key => key.startsWith(`${oll} ${coll} `)).length
  }

  const numZbllsInOllSelected = (oll) => {
    return [...store.keySet].filter(key => key.startsWith(`${oll} `)).length
  }

  const totalZbllsSelected = () => store.keySet.size

  const toggleSelected = result => {
    if (!result) return
    if (isZbllSelected(result.oll, result.coll, result.zbll)) {
      removeZbll(result.oll, result.coll, result.zbll);
    } else {
      addZbll(result.oll, result.coll, result.zbll);
    }
  }

  watch(store.keySet, () => localStorage.setItem(localStoreKey, JSON.stringify([...store.keySet])))

  return {keySet, allZbllKeysArray, addOll, addColl, addZbll,
    removeOll, removeColl, removeZbll, toggleSelected,
    isZbllSelected, numZbllsInCollSelected, numZbllsInOllSelected, totalZbllsSelected, applyFromPreset}
});