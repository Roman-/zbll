<script setup>
import OllCard from "@/components/OllCard.vue";
import zbll_map from "@/assets/zbll_map.json"
</script>

<template>
    <div class="row gx-0">
      <div v-for="(coll_map, name) in zbll_map" class="col">
        <OllCard :name="name" :coll_map="coll_map"/>
      </div>
    </div>
</template>

<style scoped>
</style>