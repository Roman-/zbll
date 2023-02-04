<script setup>
import {useZbllModalStore} from "@/stores/ZbllModalStore";
import {computed, ref, watch} from "vue";
import {countZbllsInColl, numZbllsInCollSelected} from "@/helpers/cases_count";
import {useSelectedStore} from "@/stores/SelectedStore";

const zbllModalStore = useZbllModalStore();
const selectStore = useSelectedStore();
// TODO map changes does not affect computed!
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>