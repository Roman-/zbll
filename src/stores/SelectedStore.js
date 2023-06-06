import {computed, reactive, watch} from 'vue'
import { defineStore } from 'pinia'
import zbll_map_next from "@/assets/zbll_map_next.json"

const localStoreKey = "currentZbllArray";
const loadedArray = JSON.parse(localStorage.getItem(localStoreKey) || "[]")

export const useSelectedStore = defineStore('selected', () => {
  const allZbllKeysArray = Object.keys(zbll_map_next)

  const store = reactive({
    keys: loadedArray,
  });

  const commonScrambleLength = computed(() => {
    let result = 0
    store.keys.forEach(key => {
      const minLength = parseInt(Object.keys(zbll_map_next[key].scrambles)[0]) // shortest always comes first in map
      result = Math.max(result, minLength)
    })
    return result
  })

  const applyFromPreset = presetKeys => store.keys = presetKeys

  const removeOll = oll => {
    store.keys = store.keys.filter(key => !key.startsWith(`${oll} `))
  }

  // this may lead to duplicate store.keys, use with caution
  const addOll = oll => {
    store.keys = [...store.keys, ...allZbllKeysArray.filter(key => key.startsWith(`${oll} `))]
  }

  // this may lead to duplicate store.keys, use with caution
  const addColl = (oll, coll) => {
    store.keys = [...store.keys, ...allZbllKeysArray.filter(key => key.startsWith(`${oll} ${coll} `))]
  }

  const addZbll = key => {
    store.keys = [...store.keys, key] // if you just .push(), then freakin' VueJS won't track it
  }

  // remove all coll cases
  const removeColl = (oll, coll) => {
    store.keys = store.keys.filter(key => !key.startsWith(`${oll} ${coll} `))
  }

  const removeZbll = key => store.keys = store.keys.filter(k => k !== key)

  const isZbllSelected = key => store.keys.includes(key)

  const numZbllsInCollSelected = (oll, coll) => store.keys.filter(key => key.startsWith(`${oll} ${coll} `)).length

  const numZbllsInOllSelected = (oll) => store.keys.filter(key => key.startsWith(`${oll} `)).length

  const totalZbllsSelected = () => store.keys.length

  const toggleSelected = result => {
    if (!result) return
    const action = isZbllSelected(result.oll, result.coll, result.zbll) ? removeZbll : addZbll
    action(result.oll, result.coll, result.zbll)
  }

  watch(() => store.keys, () => {
    localStorage.setItem(localStoreKey, JSON.stringify(store.keys))
  })

  return {store, commonScrambleLength, allZbllKeysArray, addOll, addColl, addZbll,
    removeOll, removeColl, removeZbll, toggleSelected,
    isZbllSelected, numZbllsInCollSelected, numZbllsInOllSelected, totalZbllsSelected, applyFromPreset}
});