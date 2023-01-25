import { createApp } from 'vue'
import App from './App.vue'

// router
import router from './router'

// Pinia
import { createPinia } from 'pinia'

// bootstrap & icons
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import "@/assets/bootstrap_themes/darkly.min.css"

// i18n
import { createI18n } from 'vue-i18n'
import locale_from_file from '@/assets/locale.json'
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: locale_from_file
})

createApp(App)
  .use(router)
  .use(createPinia())
  .use(i18n)
  .mount('#app')