<script setup>
import OllCard from "@/components/select_view/OllCard.vue";
import {useSelectedStore} from "@/stores/SelectedStore";

const select = useSelectedStore()

const olls = select.allZbllKeysArray
    .map(key => key.split(' ')[0])
    .filter((oll, i, arr) => arr.indexOf(oll) === i);

</script>

<template>
  <div class="row gx-0">
    <div v-for="oll in olls" :key="oll" class="col">
      <OllCard :oll="oll"/>
    </div>
  </div>
</template>

<style scoped>
</style>