<script setup>
import {computed, ref, watch} from "vue";
import {useSessionStore} from "@/stores/SessionStore";
import {msToHumanReadable} from "@/helpers/time_formatter";
import {useSelectedStore} from "@/stores/SelectedStore";

const sessionStore = useSessionStore()
const selectedStore = useSelectedStore()
const isValid = computed(() => sessionStore.stats().length > sessionStore.observingResult)
const result = computed(() => {
      return isValid.value
          ? sessionStore.stats()[sessionStore.observingResult]
          : {"i": 0, "oll": "oll", "coll": "coll", "zbll": "zbll", "scramble": "scramble", "ms": 0}
    }
)

const onDeleteBtnClicked = () => {
  if (confirm("You sure you wanna delete this result?")) {
    sessionStore.deleteResult(sessionStore.observingResult)
  }
}

const isSelected = computed(() => selectedStore.isZbllSelected(result.value["oll"], result.value["coll"], result.value["zbll"]))
const isSelectedCheckboxValue = ref(isSelected.value);
watch(isSelectedCheckboxValue, (doSelect) => {
  if (isValid.value && doSelect !== isSelected.value) {
    const action = doSelect ? selectedStore.addZbll : selectedStore.removeZbll;
    action(result.value["oll"], result.value["coll"], result.value["zbll"]);
  }
})
watch(isSelected, () => isSelectedCheckboxValue.value = isSelected.value)

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="mb-0">
        <div class="row align-items-center">
          <div class="col">
            Result #{{ result["i"] + 1 }}
            <span class="badge bg-primary">{{ msToHumanReadable(result["ms"]) }}</span>
          </div>
          <div class="col-auto">
            <button
                tabindex="-1" @keydown.space.prevent=""
                class="btn btn-sm btn-outline-danger mx-1"
                title="delete"
                @click="onDeleteBtnClicked">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </h5>
      <hr>
      <p class="card-text">Case: {{ result["oll"] }}-{{ result["coll"] }} {{ result["zbll"] }}</p>
      <p class="card-text">Scramble: {{ result["scramble"] }}</p>
      <div>
        <img
            src="https://bestsiteever.ru/visualcube/visualcube.php?fmt=svg&bg=t&stage=ll&view=plan&alg=F%20U2%20F2%20L%20F%20L2%20B%27%20R%27%20U2%20R%20B%20L"
            alt="Cube image"/>
      </div>
      <div class="form-check">
        <input
            tabindex="-1" @keydown.space.prevent=""
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            v-model="isSelectedCheckboxValue"
        >
        <label
            class="form-check-label"
            for="flexCheckDefault"
        >
          Selected
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>