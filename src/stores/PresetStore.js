import {computed, reactive, watch} from 'vue'
import { defineStore } from 'pinia'

const localStoreKey = "zbll_presets_next";

export const usePresetsStore = defineStore('presets', () => {
  // {name: [array of cases], name: [other array], …}
  const map = reactive(JSON.parse(localStorage.getItem(localStoreKey) ?? "{\"starred\": []}"))

  // set (save) preset. Use selectedStore.allSelectedCases() as second argument
  const set = (name, selectedCases) => {
    map[name] = selectedCases
  }

  // get preset by name
  const get = name => {
    return map[name] ?? []
  }

  // delete preset by name
  const remove = name => {
    delete map[name]
  }

  watch(map, () => localStorage.setItem(localStoreKey, JSON.stringify(map)))

  return { map, set, get, remove}
});