<script setup>
import LangDropdown from "@/components/nav/LangDropdown.vue";
import ThemeSwitcher from "@/components/nav/ThemeSwitcher.vue";

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
        <ThemeSwitcher/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>