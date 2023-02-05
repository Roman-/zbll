<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {countZbllsInColl, isZbllSelected, numZbllsInCollSelected} from "@/helpers/cases_count";
import {computed} from "vue";
import {getCollImg, getZbllImg} from "@/helpers/cube_images";
import {useZbllModalStore} from "@/stores/ZbllModalStore";
import {storeToRefs} from "pinia";

const props = defineProps(['oll', 'coll', 'zbll'])
const zbllModalStore  = useZbllModalStore();
// const {oll, coll}  = storeToRefs(useZbllModalStore());
const {zbll}  = props;
const selectStore = useSelectedStore();

const is_selected = computed(() => isZbllSelected(selectStore.map, zbllModalStore.oll, zbllModalStore.coll, zbll));

const onCardClicked = () => {
  // console.log("onCardClicked. is_selected.value = ", is_selected.value);
  if (is_selected.value) {
    selectStore.removeZbll(zbllModalStore.oll, zbllModalStore.coll, zbll);
  } else {
    console.log("adding: ", zbllModalStore.oll, zbllModalStore.coll, zbll);
    selectStore.addZbll(zbllModalStore.oll, zbllModalStore.coll, zbll);
  }
}

const card_bg_class = computed(() => {
  return is_selected.value ? "all_cases_selected" : "no_cases_selected";
})

</script>

<template>
  <div class="border border-dark" :class="card_bg_class">
    <div class="header p-1 border-bottom border-secondary text-center" @click="onCardClicked">
      <strong>
        {{zbll}}
      </strong>
    </div>
    <div class="clickable m-1" @click="onCardClicked">
      <img class="cube_card_img" :src="getZbllImg(zbllModalStore.oll, zbllModalStore.coll, zbll)" :alt="zbll">
    </div>
  </div>
</template>

<style scoped>
</style>