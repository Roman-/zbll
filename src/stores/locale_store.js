import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref('en')
  function toggle() {
    locale.value = (locale.value === 'en') ? 'ru' : 'en';
  }

  return { locale, toggle }
})
