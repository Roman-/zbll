<script setup>
import {useZbllModalStore} from "@/stores/ZbllModalStore";
import {computed} from "vue";
import {countZbllsInColl, numZbllsInCollSelected} from "@/helpers/cases_count";
import {useSelectedStore} from "@/stores/SelectedStore";
import ZbllCard from "@/components/ZbllCard.vue";
import zbll_map from "@/assets/zbll_map.json"

const zStore = useZbllModalStore();
const selectStore = useSelectedStore();
const modalTitle = computed(() => {
  return zStore.oll + " • " + zStore.coll
      + " (" + numZbllsInCollSelected(selectStore.map, zStore.oll, zStore.coll)
      + "/" + countZbllsInColl(zStore.oll, zStore.coll) + ")";
});
</script>

<template>
  <div class="modal" id="zbllsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{modalTitle}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row gx-0">
            <div v-for="(algs, zbll) in zbll_map[zStore.oll][zStore.coll]" class="col-3">
              <ZbllCard
                  :zbll="zbll"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="selectStore.addColl(zStore.oll, zStore.coll);">All</button>
          <button type="button" class="btn btn-secondary" @click="selectStore.removeColl(zStore.oll, zStore.coll);">None</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>