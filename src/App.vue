<script setup>
import { RouterView } from 'vue-router'
import NavBar from "@/components/nav/NavBar.vue";
import "@/assets/global.css"

import {useThemeStore} from "@/stores/ThemeStore";
useThemeStore().applyCurrentTheme();

</script>

<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row">
      <NavBar/>
    </div>
    <div class="row flex-grow-1 bg-gradient p-0">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
</style>
