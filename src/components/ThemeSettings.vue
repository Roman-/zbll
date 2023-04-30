<script setup>
import ThemesSelect from "@/components/ThemesSelect.vue";
</script>

<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">Dark theme</span>
    <ThemesSelect is-dark="true"/>
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">Light theme</span>
    <ThemesSelect is-dark="false"/>
  </div>

</template>

<style scoped>
</style>
