<script setup>
import {useThemeStore} from "@/stores/ThemeStore";
import LangDropdown from "@/components/nav/LangDropdown.vue";
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
          {{$t("nav.cases selected", 0)}} {{$t("nav.selected")}}
        </span>
      </div>
      <div class="col-auto">
        <LangDropdown/>
        <button class="btn btn-link text-info" @click="themeStore.toggleDayNight()">
          <i class="bi-moon font_bigger" :class="themeStore.icon"/>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/deep/ .font_bigger {
  font-size: 1.5rem;
}
</style>