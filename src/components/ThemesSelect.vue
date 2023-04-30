<script setup>
import {useThemeStore, lightThemesSet, darkThemesSet} from "@/stores/ThemeStore";
import {ref, watch} from "vue";
const themeStore = useThemeStore();

// this is work-in-progress
const props = defineProps(["isDark"]);
const isDark = props.isDark === "true";
const themes = isDark ? darkThemesSet : lightThemesSet;
const selectedTheme = ref(isDark ? themeStore.darkThemeName : themeStore.lightThemeName);
console.log("selectedTheme", selectedTheme.value);
watch(selectedTheme, ()=>{
  const name = selectedTheme.value;
  console.log("selectedTheme changed: ", name);
  isDark ? themeStore.setDarkTheme(name) : themeStore.setLightTheme(name);
})

</script>

<template>
  <!--  v-model = name of dark theme -->
  <select class="selectpicker" v-model="selectedTheme" :disabled="isDark !== themeStore.isDark">
    <option :value="t" v-for="t in themes">
      {{t}}
    </option>
  </select>
</template>

<style scoped>
</style>
