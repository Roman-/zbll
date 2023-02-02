<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {countZbllsInOll, numZbllsInOllSelected} from "@/helpers/cases_count";
import {computed, ref, watch} from "vue";

const props = defineProps(['name', 'coll_map'])
const getOllImg = (name) => {
  return new URL(`../assets/svg/${name}.svg`, import.meta.url).href
}
const oll = props.name; // H, L, Pi etc
const selectStore = useSelectedStore();
const num_cases_selected = ref(numZbllsInOllSelected(selectStore.map, oll)); // TODO try replacing with computed()
watch(selectStore.map, (newSelectMap) => {
  num_cases_selected.value = numZbllsInOllSelected(newSelectMap, oll);
})

const total_zblls_in_oll = countZbllsInOll(oll); // is const
const onCardClicked = () => {
  if (num_cases_selected.value === 0) {
    selectStore.addOll(oll);
  } else {
    selectStore.removeOll(oll);
  }
}

</script>

<template>
  <div class="bg-light border border-dark">
    <div
        class="header bg-primary bg-opacity-25 p-1 clickable"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapsed-colls-${oll}`">
      <strong class="text-center">
        {{props.name}}
      </strong>
      <span>
        ({{num_cases_selected}}/{{total_zblls_in_oll}})
      </span>
    </div>
    <div class="m-1" @click="onCardClicked">
      <img class="oll" :src="getOllImg(oll)" :alt="oll">
    </div>
  </div>
  <div
      class="bg-dark text-center collapse multi-collapse"
      :id="`collapsed-colls-${oll}`">
    subcard<br/>
    {{ oll }}<br/>
    {{ oll }}<br/>
    subcard<br/>
  </div>
</template>

<style scoped>
img.oll {
  width: 100%;
  max-width: 300px;
}
</style>