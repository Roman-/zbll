<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {isZbllSelected} from "@/helpers/cases_count";
import {computed} from "vue";
import {getZbllImg} from "@/helpers/cube_images";
import {useZbllModalStore} from "@/stores/ZbllModalStore";

const store = useZbllModalStore();
const props = defineProps(['zbll']);
const {zbll} = props
const selectStore = useSelectedStore();

const is_selected = computed(() => isZbllSelected(selectStore.map, store.oll, store.coll, zbll));

const onCardClicked = () => {
  if (is_selected.value) {
    selectStore.removeZbll(store.oll, store.coll, zbll);
  } else {
    selectStore.addZbll(store.oll, store.coll, zbll);
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
      <img class="cube_card_img" :src="getZbllImg(store.oll, store.coll, zbll)" :alt="zbll">
    </div>
  </div>
</template>

<style scoped>
</style>