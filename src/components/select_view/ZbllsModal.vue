<script setup>
import {computed, onMounted, ref} from "vue";
import {Modal} from 'bootstrap'
import {useSelectedStore} from "@/stores/SelectedStore";
import ZbllCard from "@/components/select_view/ZbllCard.vue";

const props = defineProps(['oll', 'coll', 'closeCallback']);
const {oll, coll, closeCallback} = props;
const selected = useSelectedStore();
const zbllKeys = selected.allZbllKeysArray.filter(k => k.startsWith(`${oll} ${coll}`))
const modalTitle = computed(() => {
  return oll + " • " + coll
      + " (" + selected.numZbllsInCollSelected(oll, coll)
      + "/" + zbllKeys.length + ")";
});

const zbllNames = zbllKeys.map(key => key.split(' ')[2])

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
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row gx-0">
            <div v-for="zbll in zbllNames" :key="zbll" class="col-3">
              <ZbllCard :zbllKey="`${oll} ${coll} ${zbll}`"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="selected.addColl(oll, coll);">
            {{ $t("zbll_select_card.all") }}
          </button>
          <button type="button" class="btn btn-secondary" @click="selected.removeColl(oll, coll);">
            {{ $t("zbll_select_card.none") }}
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            {{ $t("zbll_select_card.done") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>