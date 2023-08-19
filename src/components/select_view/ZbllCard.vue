<script setup>

import {useSelectedStore} from "@/stores/SelectedStore";
import {computed} from "vue";
import {getZbllImg} from "@/helpers/cube_images";
import {useSettingsStore} from "@/stores/SettingsStore";

const props = defineProps(['zbllKey']);
const key = props.zbllKey
const selected = useSelectedStore();
const settings = useSettingsStore()

const is_selected = computed(() => selected.isZbllSelected(key));

const onCardClicked = () => {
  const action = is_selected.value ? selected.removeZbll : selected.addZbll
  action(key);
}

const cardBgClass = computed(() => {
  return is_selected.value ? "all_cases_selected" : "no_cases_selected";
})

</script>

<template>
  <div class="border border-secondary" :class="cardBgClass">
    <div class="header p-1 border-bottom border-secondary border-opacity-75 text-center">
        {{ key.split(' ')[2].replace('s', '/') }}
    </div>
    <div class="m-1 text-center clickable" @click="onCardClicked">
      <img class="cube_card_img" :src="getZbllImg(key, settings.store.pictureView)" :alt="key">
    </div>
  </div>
</template>

<style scoped>
.header {
  cursor: default;
}
</style>