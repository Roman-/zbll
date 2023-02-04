/*
 * Used to set Oll/Coll
*/
import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useZbllModalStore = defineStore('zbll_modal', () => {
  const oll = ref("aS")
  const coll = ref("FBBF")

  return { oll, coll }
});