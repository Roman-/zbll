import {computed, reactive, watch} from 'vue'
import { defineStore } from 'pinia'
import {useSelectedStore} from "@/stores/SelectedStore";

const selectedStore = useSelectedStore()

export const useRandomCasePickerStore = defineStore('random_case_picker', () => {

  const allCases = computed(() => {
    // let cases
  })
  const getRandomCase = () => {
    return "";
  }

  return { getRandomCase }
});