<script setup>
import { RouterView } from 'vue-router'
import NavBar from "@/components/nav/NavBar.vue";
import "@/assets/global.css"

import {useThemeStore} from "@/stores/ThemeStore";
useThemeStore().applyCurrentTheme();

</script>

<template>
  <NavBar/>
  <RouterView/>
</template>

<style scoped>
</style>
