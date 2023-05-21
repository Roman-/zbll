<script setup>

import {useZbllStore} from "@/stores/ZbllStore";
import {useSelectedStore} from "@/stores/SelectedStore";
import {computed, onMounted, ref} from "vue";
import {getOllImg} from "@/helpers/cube_images";
import CollCard from "@/components/select_view/CollCard.vue";

const props = defineProps(['oll', 'oll_map'])
const {oll, oll_map} = props;
const selected = useSelectedStore();
const zbllStore = useZbllStore();
const num_cases_selected = computed(() => selected.numZbllsInOllSelected(oll));

const total_zblls_in_oll = zbllStore.countZbllsInOll(oll);
const onCardClicked = () => {
  const action = num_cases_selected.value === 0 ? selected.addOll : selected.removeOll
  action(oll)
}

const card_bg_class = computed(() => {
  return (num_cases_selected.value === 0) ? "no_cases_selected" :
      (total_zblls_in_oll === num_cases_selected.value)
          ? "all_cases_selected"
          : "some_cases_selected";
})

const ollCardRef = ref(null)
const isCollapsed = ref(true)
onMounted(() => {
  ollCardRef.value.addEventListener('show.bs.collapse', () => isCollapsed.value = false);
  ollCardRef.value.addEventListener('hide.bs.collapse', () => isCollapsed.value = true);
})

</script>

<template>
  <div class="border border-dark rounded-1" :class="card_bg_class">
    <div
        class="header p-1 clickable border-bottom border-secondary d-flex justify-content-between align-items-center"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapsed-colls-${oll}`">
      <div>
        <strong class="text-center">
          {{ props.oll }}
        </strong>&nbsp;<span>({{ num_cases_selected }}/{{ total_zblls_in_oll }})</span>
      </div>
      <i class="bi bi-caret-down opacity-75 caret" :class="isCollapsed ? '' : 'upside_down'"></i>
    </div>
    <div class="clickable m-1 text-center" @click="onCardClicked">
      <img class="cube_card_img" :src="getOllImg(oll)" :alt="oll">
    </div>
  </div>
  <div
      class="text-center collapse multi-collapse"
      ref="ollCardRef"
      :id="`collapsed-colls-${oll}`">
    <CollCard v-for="(zbll_map, coll) in oll_map"
              :key="oll"
              :oll="oll"
              :coll="coll"
    />
  </div>
</template>

<style scoped>
.caret {
  transition: transform 0.2s
}

.upside_down {
  transform: rotate(180deg);
}
</style>
