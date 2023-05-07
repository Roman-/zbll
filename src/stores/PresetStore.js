import {computed, reactive, watch} from 'vue'
import { defineStore } from 'pinia'

const localStoreKey = "ZbllNextPresets";

export const usePresetsStore = defineStore('presets', () => {
  // {name: [array of cases], name: [other array], …}
  const map = reactive(JSON.parse(localStorage.getItem(localStoreKey) || "{}"))

  const set = (name, cases) => {
    map[name] = cases
  }

  const get = name => {
    return map[name] ?? []
  }

  watch(map, () => localStorage.setItem(localStoreKey, JSON.stringify(map)))

  return { map }
});