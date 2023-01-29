import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const name = ref('flatly')
  const icon = ref("bi-sun");
  function applyCurrentTheme() {
    const link_id = "bootstrap_stylesheet";
    // find link with id="bootstrap_stylesheet"; if not found, create one
    const link = document.getElementById(link_id);
    if (!link) {
      const link = document.createElement('link');
      link.id = link_id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      console.log("create");
    }
    document.getElementById("bootstrap_stylesheet").href = getThemeCssUrl(name.value);
  }
  function toggleDayNight() {
    name.value = (name.value === 'flatly') ? 'darkly' : 'flatly';
    icon.value = (name.value === 'flatly') ? "bi-sun" : "bi-moon";
    applyCurrentTheme();
  }

  const getThemeCssUrl = (name) => {
    return new URL(`../assets/bootstrap_themes/${name}.min.css`, import.meta.url).href
  }

  return { name, icon, toggleDayNight, applyCurrentTheme }
});