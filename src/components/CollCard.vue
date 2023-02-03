<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {countZbllsInColl, numZbllsInCollSelected} from "@/helpers/cases_count";
import {computed, ref, watch} from "vue";
import {getCollImg} from "@/helpers/cube_images";

const props = defineProps(['oll', 'coll', 'zbll_map'])
const oll = props.oll; // H, L, Pi etc
const coll = props.coll;
const zbll_map = props.zbll_map;
const selectStore = useSelectedStore();

const num_cases_selected = ref(numZbllsInCollSelected(selectStore.map, oll, coll)); // TODO try replacing with computed()
watch(selectStore.map, () => {
  num_cases_selected.value = numZbllsInCollSelected(selectStore.map, oll, coll);
})
const total_zblls_in_coll = countZbllsInColl(oll, coll); // is const

const onCardClicked = () => {
  if (num_cases_selected.value === 0) {
    selectStore.addColl(oll, coll);
  } else {
    selectStore.removeColl(oll, coll);
  }
}

const card_bg_class = computed(() => {
  return (num_cases_selected.value === 0) ? "no_cases_selected" :
      (total_zblls_in_coll === num_cases_selected.value)
          ? "all_cases_selected"
          : "some_cases_selected";
})

const showZbllsModal = () => {
  console.log("showZbllsModal!");
}

</script>

<template>
  <div class="border border-dark" :class="card_bg_class">
    <div
        class="header p-1 clickable border-bottom border-secondary" @click="showZbllsModal">
      <strong class="text-center">
        {{props.coll}}
      </strong>
      <span>
        ({{num_cases_selected}}/{{total_zblls_in_coll}})
      </span>
    </div>
    <div class="clickable m-1" @click="onCardClicked">
      <img class="cube_card_img" :src="getCollImg(oll, coll)" :alt="coll">
    </div>
  </div>
</template>

<style scoped>
</style>