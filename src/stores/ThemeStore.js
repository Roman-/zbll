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

// local storage keys
const isDarkKey = "zbll_theme.is_dark";
const darkNameKey = "zbll_theme.dark_name";
const lightNameKey = "zbll_theme.light_name";

// defaults
const defaultIsDark = false;
export const defaultLightName = "flatly";
export const defaultDarkName = "darkly";

export const lightThemesSet = ["bootstrap", "cerulean", "cosmo", "flatly", "journal", "litera", "lumen", "lux", "materia", "minty",
  "morph", "quartz", "sandstone", "simplex", "sketchy", "yeti", "zephyr"];
export const darkThemesSet = ["cyborg", "darkly", "slate", "solar", "superhero", "vapor"];
const isAvailable = (themeName, isDark) => {
  return (isDark ? darkThemesSet : lightThemesSet).includes(themeName);
}

const getInitialIsDark = ()=>{
  if (!localStorage || !localStorage.getItem(isDarkKey)) {
    return defaultIsDark;
  }
  return localStorage.getItem(isDarkKey) === "true";
}

const getInitialThemeName = (isDark) => {
  const key = isDark ? darkNameKey : lightNameKey;
  const defaultName = isDark ? defaultDarkName : defaultLightName;
  if (!localStorage || !localStorage.getItem(key)) {
    return defaultName;
  }
  const loadedName = localStorage.getItem(key);
  return isAvailable(loadedName, isDark) ? loadedName : defaultName;
}

const biIconByTheme = (isDark) => {
  return isDark ? "bi-moon" : "bi-sun";
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(getInitialIsDark())
  const lightThemeName = ref(getInitialThemeName(false));
  const darkThemeName = ref(getInitialThemeName(true));
  const name = computed(()=> isDark.value ? darkThemeName.value : lightThemeName.value);
  const icon = computed(()=>biIconByTheme(isDark.value));
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
    isDark.value = !isDark.value;
    applyCurrentTheme();
    if (localStorage) {
      localStorage.setItem(isDarkKey, ""+isDark.value);
    }
  }
  function setThemeName(name, isDark) {
    if (!isAvailable(name, isDark)) {
      return console.error("setThemeName("+isDark+"): " + name + " not available in themes set");
    }
    (isDark ? darkThemeName : lightThemeName).value = name;
    applyCurrentTheme();
    localStorage.setItem(isDark ? darkNameKey : lightNameKey, name);
  }

  function setDarkTheme(name){ setThemeName(name, true) }
  function setLightTheme(name){ setThemeName(name, false); }

  const getThemeCssUrl = (name) => {
    return new URL(`../assets/bootstrap_themes/${name}.min.css`, import.meta.url).href
  }

  return { isDark, lightThemeName, darkThemeName, icon, toggleDayNight, applyCurrentTheme, setDarkTheme, setLightTheme}
});
