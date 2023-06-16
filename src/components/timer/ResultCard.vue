<script setup>
import {computed, ref, watch} from "vue";
import {TimerState, useSessionStore} from "@/stores/SessionStore";
import {msToHumanReadable} from "@/helpers/time_formatter";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useSettingsStore} from "@/stores/SettingsStore";
import {formatZbllKey} from "@/helpers/helpers";
import {usePresetsStore, starredName} from "@/stores/PresetStore";
import { useI18n } from 'vue-i18n'
import CubePicture from "@/components/timer/CubePicture.vue";
import SetupAndAlgs from "@/components/timer/SetupAndAlgs.vue";
const { t } = useI18n()

const sessionStore = useSessionStore()
const selectedStore = useSelectedStore()
const settings = useSettingsStore()
const presets = usePresetsStore()
const isValid = computed(() => sessionStore.stats().length > sessionStore.observingResult)
const result = computed(() => {
      return isValid.value
          ? sessionStore.stats()[sessionStore.observingResult]
          : {"i": 0, key: "", "scramble": "", "ms": 0}
    }
)

const onDeleteBtnClicked = () => {
  if (isValid.value && confirm(t("result_card.are_you_sure_to_delete"))) {
    sessionStore.deleteResult(sessionStore.observingResult)
  }
}

const isSelected = computed(() => selectedStore.isZbllSelected(result.value["key"]))
const isSelectedCheckboxValue = ref(isSelected.value);
watch(isSelectedCheckboxValue, (doSelect) => {
  if (isValid.value && doSelect !== isSelected.value) {
    const action = doSelect ? selectedStore.addZbll : selectedStore.removeZbll;
    action(result.value["key"]);
  }
})
watch(isSelected, () => isSelectedCheckboxValue.value = isSelected.value)

const isBookmarked = computed(() => presets.hasCase(starredName, result.value.key))
const bookmarkIconClass = computed(() => isBookmarked.value ? "bi-star-fill text-info" : "bi-star text-primary")
const starClicked = () => {
  if (isValid.value && sessionStore.timerState === TimerState.NOT_RUNNING) {
    const action = isBookmarked.value ? presets.removeFromPreset : presets.addToPreset
    action(starredName, result.value.key)
  }
}

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="mb-0">
        <div class="row align-items-center">
          <div class="col">
            <span class="d-sm-inline-block d-none">{{$t("result_card.result_no", result["i"] + 1)}} &nbsp;</span>
            <span class="badge bg-primary">{{ msToHumanReadable(result["ms"], settings.timerPrecision) }}</span>
          </div>
          <div class="col-auto">
            <button
                tabindex="-1" @keydown.space.prevent=""
                class="btn btn-sm btn-outline-danger mx-1"
                :title="$t('result_card.delete_btn')"
                :disabled="sessionStore.timerState !== TimerState.NOT_RUNNING"
                @click="onDeleteBtnClicked">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </h5>
      <hr class="my-2 my-sm-3">
      <p class="card-text my-0 my-sm-1">
        <span class="d-sm-inline-block d-none">{{$t("result_card.case")}}</span>
        {{ formatZbllKey(result["key"]) }}
        <i
            class="bi clickable px-1"
            :title="$t('result_card.add_to_starred') + ' (Alt+A)'"
            :class="bookmarkIconClass"
            @click="starClicked"/>
      </p>
      <div class="form-check mt-1">
        <label
            class="form-check-label"
            :title="$t('result_card.selected_title') + ' (Alt+S)'"
            for="flexCheckDefault">
          <input
              tabindex="-1" @keydown.space.prevent=""
              class="form-check-input styled"
              type="checkbox"
              id="flexCheckDefault"
              :disabled="sessionStore.timerState !== TimerState.NOT_RUNNING"
              v-model="isSelectedCheckboxValue">
          {{$t("result_card.selected")}}
        </label>
      </div>
      <CubePicture :scramble="result['scramble']"/>
      <p class="card-text my-0 my-sm-1">
        <SetupAndAlgs :zbllKey="result['key']" :maxAmount="3"/>
      </p>
      <p class="d-sm-block d-none card-text my-0 my-sm-1">
        <span class="">{{$t("result_card.scramble")}}&nbsp;</span>
        {{ result["scramble"] }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>