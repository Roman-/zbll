<script setup>
import {useLocaleStore} from "@/stores/locale_store";
import {useThemeStore} from "@/stores/ThemeStore";
const toggleLocale = ()=>{
  useLocaleStore().toggle();
}
const themeStore = useThemeStore();

</script>

<template>
  <nav class="navbar sticky-top bg-secondary bg-opacity-25">
    <div class="row w-100 align-items-center">
      <div class="col-auto me-auto">
        <button class="mx-2 btn btn-primary">
          {{$t("nav.select")}}
        </button>
        <span class="mx-2">
          {{$t("nav.cases_selected", 0)}} {{$t("nav.selected")}}
        </span>
      </div>
      <div class="col-auto">
        <button class="btn btn-link" @click="toggleLocale">
          <i class="bi-translate text-info font_bigger"/>
        </button>
        <button class="btn btn-link text-info" @click="themeStore.toggleDayNight()">
          <i class="bi-moon font_bigger" :class="themeStore.icon"/>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.font_bigger {
  font-size: 1.5rem;
}
</style>