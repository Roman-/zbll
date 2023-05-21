<script setup>
import OllCard from "@/components/select_view/OllCard.vue";
import zbll_map from "@/assets/zbll_map.json"
</script>

<template>
  <div class="row gx-0">
    <div v-for="(oll_map, oll) in zbll_map" :key="oll" class="col">
      <OllCard :oll="oll" :oll_map="oll_map"/>
    </div>
  </div>
</template>

<style scoped>
</style>