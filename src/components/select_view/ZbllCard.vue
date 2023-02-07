<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {computed} from "vue";
import {getZbllImg} from "@/helpers/cube_images";

const props = defineProps(['oll', 'coll', 'zbll']);
const {oll, coll, zbll} = props
const selectStore = useSelectedStore();

const is_selected = computed(() => selectStore.isZbllSelected(oll, coll, zbll));

const onCardClicked = () => {
  if (is_selected.value) {
    selectStore.removeZbll(oll, coll, zbll);
  } else {
    selectStore.addZbll(oll, coll, zbll);
  }
}

const card_bg_class = computed(() => {
  return is_selected.value ? "all_cases_selected" : "no_cases_selected";
})

</script>

<template>
  <div class="border border-dark clickable" @click="onCardClicked" :class="card_bg_class">
    <div class="header p-1 border-bottom border-secondary text-center" @click="onCardClicked">
      <strong>
        {{zbll}}
      </strong>
    </div>
    <div class="m-1 text-center">
      <img class="cube_card_img" :src="getZbllImg(oll, coll, zbll)" :alt="zbll">
    </div>
  </div>
</template>

<style scoped>
</style>