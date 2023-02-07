<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {useZbllStore} from "@/stores/ZbllStore";
import {computed, ref} from "vue";
import {getCollImg} from "@/helpers/cube_images";
import ZbllsModal from "@/components/select_view/ZbllsModal.vue";

const props = defineProps(['oll', 'coll'])
const {oll, coll}  = props; // H, L, Pi etc
const selectStore = useSelectedStore();
const zbllStore = useZbllStore();

const num_cases_selected = computed(() => selectStore.numZbllsInCollSelected(oll, coll));
const total_zblls_in_coll = zbllStore.countZbllsInColl(oll, coll);

const onCardClicked = () => {
  if (num_cases_selected.value === 0) {
    selectStore.addColl(oll, coll);
  } else {
    selectStore.removeColl(oll, coll);
  }
}

const modalCloseCallback = () => { modalShown.value=false }

const card_bg_class = computed(() => {
  return (num_cases_selected.value === 0) ? "no_cases_selected" :
      (total_zblls_in_coll === num_cases_selected.value)
          ? "all_cases_selected"
          : "some_cases_selected";
})

const modalShown = ref(false);
</script>

<template>
  <div class="border border-dark" :class="card_bg_class">
    <div
        class="header p-1 clickable border-bottom border-secondary"
        @click="modalShown=true"
    >
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
  <ZbllsModal v-if="modalShown" :oll="oll" :coll="coll" :closeCallback="modalCloseCallback"/>
</template>

<style scoped>
</style>