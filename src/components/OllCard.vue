<script setup>

const props = defineProps(['name', 'coll_map'])
// const expanded = ref(0);
const selected_colls = 0; // TODO from pinia
const total_zblls_in_oll = 100;
const getOllImg = (name) => {
  return new URL(`../assets/svg/${name}.svg`, import.meta.url).href
}
const name = props.name; // H, L, Pi etc
</script>

<template>
  <div class="bg-light border border-dark">
    <div
        class="header bg-primary bg-opacity-25 p-1 clickable"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapsed-colls-${name}`">
      <strong class="text-center">
        {{props.name}}
      </strong>
      <span>
        ({{selected_colls}}/{{total_zblls_in_oll}})
      </span>
    </div>
    <div class="m-1">
      <img class="oll" :src="getOllImg(name)" :alt="name">
    </div>
  </div>
  <div
      class="bg-dark text-center collapse multi-collapse"
      :id="`collapsed-colls-${name}`">
    subcard<br/>
    {{name}}<br/>
    {{name}}<br/>
    subcard<br/>
  </div>
</template>

<style scoped>
img.oll {
  width: 100%;
  max-width: 300px;
}
</style>