<script setup>
import {getZbllImg} from "@/helpers/cube_images";
import SetupAndAlgs from "@/components/timer/SetupAndAlgs.vue";
import {useSettingsStore} from "@/stores/SettingsStore";
const settings = useSettingsStore()

const props = defineProps(['zbllKey']);
const alternativePictureView = settings.store.pictureView === "top" ? "3D" : "top"

</script>

<template>
  <hr class="mt-0">
  <div class="row mx-1">
    <div class="col col-auto leftCol">
      <h5>{{props.zbllKey.replace('s', '/')}}</h5>
      <img class="cube_card_img" :src="getZbllImg(props.zbllKey, alternativePictureView)">
    </div>
    <div class="col text-start">
      <SetupAndAlgs :zbllKey="props.zbllKey" :maxAmount="8"/>
    </div>
  </div>
</template>

<style scoped>
.leftCol {
  border-right: 1px solid var(--bs-secondary);
}
</style>