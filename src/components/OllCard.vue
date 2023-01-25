<script setup>

const props = defineProps(['name', 'coll_map'])
// const expanded = ref(0);
const selected_colls = 0; // TODO from pinia
const total_zblls_in_oll = 100;
const getOllImg = (name) => {
  return new URL(`../assets/svg/${name}.svg`, import.meta.url).href
}
</script>

<template>
  <div class="ollcard bg-secondary">
    <div class="header">
      <strong>
        {{props.name}}
      </strong>
      <span>
        ({{selected_colls}}/{{total_zblls_in_oll}})
      </span>
    </div>
    <div class="content">
      <img class="oll" :src="getOllImg(props.name)" :alt="props.name">
    </div>
  </div>
</template>

<style scoped>
img.oll {
  width: 100%;
  max-width: 300px;
}
</style>