import {reactive, ref, watch} from 'vue'
import { defineStore } from 'pinia'

const localStorageKey = "zbllTrainerNotes"

export const useNotesStore = defineStore('notes', () => {
  const store = reactive(
      JSON.parse(localStorage.getItem(localStorageKey)) || {}
  )

  watch(() => store, () => {
    localStorage.setItem(localStorageKey, JSON.stringify(store))
  }, {deep: true})

  return {store}
});
