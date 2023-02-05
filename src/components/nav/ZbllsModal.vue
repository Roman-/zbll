<script setup>
import {useZbllModalStore} from "@/stores/ZbllModalStore";
import {computed} from "vue";
import {countZbllsInColl, numZbllsInCollSelected} from "@/helpers/cases_count";
import {useSelectedStore} from "@/stores/SelectedStore";

const zbllModalStore = useZbllModalStore();
const selectStore = useSelectedStore();
const modalTitle = computed(() => {
  return zbllModalStore.oll + " • " + zbllModalStore.coll
      + " (" + numZbllsInCollSelected(selectStore.map, zbllModalStore.oll, zbllModalStore.coll)
      + "/" + countZbllsInColl(zbllModalStore.oll, zbllModalStore.coll) + ")";
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
          {{zbllModalStore.oll}}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">All</button>
          <button type="button" class="btn btn-secondary">None</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>