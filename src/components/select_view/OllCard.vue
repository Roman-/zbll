<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {countZbllsInOll, numZbllsInOllSelected} from "@/helpers/cases_count";
import {computed} from "vue";
import {getOllImg} from "@/helpers/cube_images";
import CollCard from "@/components/select_view/CollCard.vue";

const props = defineProps(['oll', 'oll_map'])
const {oll, oll_map} = props;
const selectStore = useSelectedStore();

const num_cases_selected = computed(() => numZbllsInOllSelected(selectStore.map, oll));

const total_zblls_in_oll = countZbllsInOll(oll); // is const
const onCardClicked = () => {
  if (num_cases_selected.value === 0) {
    selectStore.addOll(oll);
  } else {
    selectStore.removeOll(oll);
  }
}

const card_bg_class = computed(() => {
  return (num_cases_selected.value === 0) ? "no_cases_selected" :
      (total_zblls_in_oll === num_cases_selected.value)
          ? "all_cases_selected"
          : "some_cases_selected";
})

</script>

<template>
  <div class="border border-dark" :class="card_bg_class">
    <div
        class="header p-1 clickable border-bottom border-secondary"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapsed-colls-${oll}`">
      <strong class="text-center">
        {{props.oll}}
      </strong>
      <span>
        ({{num_cases_selected}}/{{total_zblls_in_oll}})
      </span>
    </div>
    <div class="clickable m-1 text-center" @click="onCardClicked">
      <img class="cube_card_img" :src="getOllImg(oll)" :alt="oll">
    </div>
  </div>
  <div
      class="text-center collapse multi-collapse"
      :id="`collapsed-colls-${oll}`">
    <CollCard v-for="(zbll_map, coll) in oll_map"
              :oll="oll"
              :coll="coll"
    />
  </div>
</template>

<style scoped>
</style>