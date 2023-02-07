<script setup>
import {computed, onMounted, ref} from "vue";
import { Modal } from 'bootstrap'
import {useSelectedStore} from "@/stores/SelectedStore";
import ZbllCard from "@/components/select_view/ZbllCard.vue";
import zbll_map from "@/assets/zbll_map.json"
import {useZbllStore} from "@/stores/ZbllStore";

const props = defineProps(['oll', 'coll', 'closeCallback']);
const {oll, coll, closeCallback} = props;
const selectStore = useSelectedStore();
const zbllStore = useZbllStore()
const modalTitle = computed(() => {
  return oll + " • " + coll
      + " (" + selectStore.numZbllsInCollSelected(oll, coll)
      + "/" + zbllStore.countZbllsInColl(oll, coll) + ")";
});

const zbllsModal = ref(null)

// when the component is mounted (via v-if), show this modal right away and destroy (via callback) on close
onMounted(() => {
  const m = new Modal(zbllsModal.value);
  m.show();
  zbllsModal.value.addEventListener('hidden.bs.modal', closeCallback)
})

</script>

<template>
  <div class="modal" ref="zbllsModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{modalTitle}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row gx-0">
            <div v-for="(algs, zbll) in zbll_map[oll][coll]" class="col-3">
              <ZbllCard
                  :oll="oll"
                  :coll="coll"
                  :zbll="zbll"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="selectStore.addColl(oll, coll);">All</button>
          <button type="button" class="btn btn-secondary" @click="selectStore.removeColl(oll, coll);">None</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>