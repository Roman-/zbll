<script setup>
import MainZbllGrid from "@/components/select_view/MainZbllGrid.vue";
import SelectSideCard from "@/components/select_view/SelectSideCard.vue";
import Settings from "@/components/Settings.vue";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useDisplayStore} from "@/stores/DisplayStore";

const router = useRouter();
const displayStore = useDisplayStore()
onMounted(() => {
  window.addEventListener('keydown', event => {
    if (event.key === "t" && event.altKey) {
      event.preventDefault()
      router.push('timer')
    }
  })
})

</script>

<template>
  <div v-if="displayStore.showSettings" class="m-2">
    <Settings/>
  </div>
  <div class="row gy-0 justify-content-start align-items-start">
    <div class="col">
      <SelectSideCard/>
    </div>
    <div class="col-lg-auto col-sm-12 m-0">
      <MainZbllGrid/>
    </div>
  </div>
</template>

<style scoped>
</style>