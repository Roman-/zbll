/*
* Dynamically change themes downloaded from https://bootswatch.com/.
* Usage: in main.js, do:
*  import "bootstrap"
*
* And then in App.vue, do:
*  import {useThemeStore} from "@/stores/ThemeStore";
*  useThemeStore().applyCurrentTheme();
*
* Then, whenever you want to change theme, do this:
* useThemeStore().toggleDayNight();
*/
import {computed, ref} from 'vue'
import { defineStore } from 'pinia'

const localStorageThemeKey = "template-theme";

// light themes: cerulean, cosmo, flatly, litera, lux, materia, minty, morph, quartz, sandstone, sketchy, zephyr
const lightThemeName = "flatly";
// dark themes: cyborg, darkly, slate, solar, superhero
const darkThemeName = "darkly";
const getInitialTheme = ()=>{
  if (!localStorage || !localStorage.getItem(localStorageThemeKey)) {
    return lightThemeName;
  }
  return localStorage.getItem(localStorageThemeKey);
}

const biIconByTheme = (name) => {
  switch (name) {
    case darkThemeName:
      return "bi-moon";
    case lightThemeName:
    default:
      return "bi-sun";
  }
}

export const useThemeStore = defineStore('theme', () => {
  const name = ref(getInitialTheme())
  const icon = computed(()=>biIconByTheme(name.value));
  function applyCurrentTheme() {
    const link_id = "bootstrap_stylesheet";
    // find link with id="bootstrap_stylesheet"; if not found, create one
    const link = document.getElementById(link_id);
    if (!link) {
      const link = document.createElement('link');
      link.id = link_id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    document.getElementById("bootstrap_stylesheet").href = getThemeCssUrl(name.value);
  }
  function toggleDayNight() {
    name.value = (name.value === lightThemeName) ? darkThemeName : lightThemeName;
    applyCurrentTheme();
    if (localStorage) {
      localStorage.setItem(localStorageThemeKey, name.value);
    }
  }

  const getThemeCssUrl = (name) => {
    return new URL(`../assets/bootstrap_themes/${name}.min.css`, import.meta.url).href
  }

  return { name, icon, toggleDayNight, applyCurrentTheme }
});