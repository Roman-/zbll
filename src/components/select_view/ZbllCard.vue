<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {computed} from "vue";
import {getZbllImg} from "@/helpers/cube_images";
import {useSettingsStore} from "@/stores/SettingsStore";

const props = defineProps(['oll', 'coll', 'zbll']);
const {oll, coll, zbll} = props
const selected = useSelectedStore();
const settings = useSettingsStore()

const is_selected = computed(() => selected.isZbllSelected(oll, coll, zbll));

const onCardClicked = () => {
  const action = is_selected.value ? "removeZbll" : "addZbll";
  selected[action](oll, coll, zbll);
}

const card_bg_class = computed(() => {
  return is_selected.value ? "all_cases_selected" : "no_cases_selected";
})

</script>

<template>
  <div class="border border-dark clickable" @click="onCardClicked" :class="card_bg_class">
    <div class="header p-1 border-bottom border-secondary text-center" @click="onCardClicked">
      <strong>
        {{ zbll.replace('s', '/') }}
      </strong>
    </div>
    <div class="m-1 text-center">
      <img class="cube_card_img" :src="getZbllImg(oll, coll, zbll, settings.pictureView)" :alt="zbll">
    </div>
  </div>
</template>

<style scoped>
</style>