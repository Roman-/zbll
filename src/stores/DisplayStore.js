import {ref} from 'vue'
import { defineStore } from 'pinia'


export const useDisplayStore = defineStore('display', () => {
  const showSettings = ref(false)
  const showStatistics = ref(false)
  return {showSettings, showStatistics}
});
