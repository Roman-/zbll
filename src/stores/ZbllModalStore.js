/*
 * Using store to create ZBLL modal once, and set its values (oll/coll) from the store.
*/
import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useZbllModalStore = defineStore('zbll_modal', () => {
  const oll = ref("aS")
  const coll = ref("FBBF")

  return { oll, coll }
});