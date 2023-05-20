<script setup>
import {computed, ref, watch} from "vue";
import {useSessionStore} from "@/stores/SessionStore";
import {msToHumanReadable} from "@/helpers/time_formatter";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useSettingsStore} from "@/stores/SettingsStore";
import {scrambleToVcUrl, preloadImage} from "@/helpers/cube_images";
import {formatZbllKey} from "@/helpers/helpers";
import {usePresetsStore, starredName} from "@/stores/PresetStore";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const sessionStore = useSessionStore()
const selectedStore = useSelectedStore()
const settings = useSettingsStore()
const presets = usePresetsStore()
const isValid = computed(() => sessionStore.stats().length > sessionStore.observingResult)
const result = computed(() => {
      return isValid.value
          ? sessionStore.stats()[sessionStore.observingResult]
          : {"i": 0, "oll": "oll", "coll": "coll", "zbll": "zbll", key: "", "scramble": "scramble", "ms": 0}
    }
)

const onDeleteBtnClicked = () => {
  if (isValid.value && confirm(t("result_card.are_you_sure_to_delete"))) {
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

const currentImgSrc = computed(() => scrambleToVcUrl(result.value["scramble"], settings.pictureView))
watch(() => sessionStore.currentScramble, () => preloadImage(sessionStore.currentScramble, settings.pictureView))

const isBookmarked = computed(() => presets.hasCase(starredName, result.value.key))
const bookmarkIconClass = computed(() => isBookmarked.value ? "bi-star-fill text-info" : "bi-star text-primary")
const starClicked = () => {
  if (isValid.value) {
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
                @click="onDeleteBtnClicked">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </h5>
      <hr>
      <p class="card-text">
        <span class="d-sm-inline-block d-none">{{$t("result_card.case")}}</span>
        {{ formatZbllKey(result["key"]) }}
        <i
            class="bi clickable px-1"
            :title="$t('result_card.add_to_starred') + ' (Alt+A)'"
            :class="bookmarkIconClass"
            @click="starClicked"/>
      </p>
      <p class="card-text">
        <span class="d-sm-inline-block d-none">{{$t("result_card.scramble")}}&nbsp;</span>

        {{ result["scramble"] }}</p>
      <div>
        <img
            class="py-0 my-0"
            :src="currentImgSrc"
            :alt="result['key']"/>
      </div>
      <div class="form-check">
        <label
            class="form-check-label"
            :title="$t('result_card.selected_title') + ' (Alt+S)'"
            for="flexCheckDefault">
          <input
              tabindex="-1" @keydown.space.prevent=""
              class="form-check-input styled"
              type="checkbox"
              id="flexCheckDefault"
              v-model="isSelectedCheckboxValue">
          {{$t("result_card.selected")}}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>