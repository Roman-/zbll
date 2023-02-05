<script setup>
import OllCard from "@/components/OllCard.vue";
import zbll_map from "@/assets/zbll_map.json"
import ZbllsModal from "@/components/ZbllsModal.vue";
</script>

<template>
    <div class="row gx-0">
      <div v-for="(oll_map, oll) in zbll_map" class="col">
        <OllCard :oll="oll" :oll_map="oll_map"/>
      </div>
    </div>
  <ZbllsModal/>
</template>

<style scoped>
</style>