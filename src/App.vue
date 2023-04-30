<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/nav/NavBar.vue";
import "@/assets/global.css"
import {useThemeStore} from "@/stores/ThemeStore";
import {TimerState, useSessionStore} from "@/stores/SessionStore";
// import 'bootstrap-select/dist/css/bootstrap-select.min.css';


useThemeStore().applyCurrentTheme();
const sessionStore = useSessionStore()

</script>

<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row">
      <NavBar/>
    </div>
    <div class="row flex-grow-1 p-0">
      <RouterView/>
    </div>
  </div>
</template>

