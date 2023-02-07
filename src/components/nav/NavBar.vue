<script setup>
import LangDropdown from "@/components/nav/LangDropdown.vue";
import ThemeSwitcher from "@/components/nav/ThemeSwitcher.vue";
import {useSelectedStore} from "@/stores/SelectedStore";
const selectedStore = useSelectedStore();

</script>

<template>
  <nav class="navbar bg-secondary bg-opacity-25">
    <div class="row w-100 align-items-center">
      <div class="col-auto me-auto">
        <button class="mx-2 btn btn-primary">
          {{$t("nav.select")}}
        </button>
        <span class="mx-2">
          {{$t("nav.cases selected", selectedStore.totalZbllsSelected())}} {{$t("nav.selected")}}
        </span>
      </div>
      <div class="col-auto">
        <LangDropdown/>
        <ThemeSwitcher/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>