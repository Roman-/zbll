<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/nav/NavBar.vue";
import "@/assets/global.css"
import {useThemeStore} from "@/stores/ThemeStore";
import {useSessionStore} from "@/stores/SessionStore";
import {useSelectedStore} from "@/stores/SelectedStore";
import {watch} from "vue";

useThemeStore().applyCurrentTheme();
const selectStore = useSelectedStore()
const sessionStore = useSessionStore()

// bind selectStore and sessionStore
watch(() => selectStore.keySet, () => sessionStore.setSelectedKeySet(selectStore.keySet))
sessionStore.setSelectedKeySet(selectStore.keySet)

</script>

<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row">
      <NavBar/>
    </div>
    <RouterView/>
  </div>
</template>

