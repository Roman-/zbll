<script setup>
import {useThemeStore, lightThemesSet, darkThemesSet} from "@/stores/ThemeStore";
import {ref, watch} from "vue";
const themeStore = useThemeStore();

// this is work-in-progress
const props = defineProps(["isDark", "selectId"]);
const isDark = props.isDark === "true";
const selectId = props.selectId
const themes = isDark ? darkThemesSet : lightThemesSet;
const selectedTheme = ref(isDark ? themeStore.darkThemeName : themeStore.lightThemeName);
watch(selectedTheme, ()=>{
  const name = selectedTheme.value;
  console.log("selectedTheme changed: ", name);
  isDark ? themeStore.setDarkTheme(name) : themeStore.setLightTheme(name);
})
</script>

<template>
  <select
      v-model="selectedTheme"
      :id="selectId"
      class="mx-2" tabindex="-1" @keydown.space.prevent=""
      :disabled="isDark !== themeStore.isDark">
    <option :value="t" v-for="t in themes">
      {{t}}
    </option>
  </select>
</template>

<style scoped>
</style>
