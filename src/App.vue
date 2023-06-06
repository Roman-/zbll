<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/nav/NavBar.vue";
import "@/assets/global.css"
import {useThemeStore} from "@/stores/ThemeStore";
import {useSessionStore} from "@/stores/SessionStore";
import {useSelectedStore} from "@/stores/SelectedStore";
import {watch} from "vue";

useThemeStore().applyCurrentTheme();
const selected = useSelectedStore()
const session = useSessionStore()

// bind selectStore and sessionStore
watch(() => selected.store.keys, () => {
  console.log("App.vue: selected.store.keys, changed to size = " + selected.store.keys.length);
  session.setSelectedKeys(selected.store.keys)
})
session.setSelectedKeys(selected.store.keys)

</script>

<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row">
      <NavBar/>
    </div>
    <RouterView/>
  </div>
</template>

