<script setup>
import {usePresetsStore, starredName} from "@/stores/PresetStore";
import {computed, ref} from "vue";
import {useSelectedStore} from "@/stores/SelectedStore";
import {areSetsEqual} from "@/helpers/helpers";

const presets = usePresetsStore()
const selected = useSelectedStore()
const currentPresetName = ref("")

const saveCurrentPreset = () => presets.setPreset(currentPresetName.value, selected.asKeySet)
const applyPreset = (name) => {
  selected.applyFromPreset(presets.getCases(name))
  currentPresetName.value = name
}
const isEditing = computed(() => presets.map.hasOwnProperty(currentPresetName.value))
</script>

<template>
  <div class="input-group input-group mb-2">
    <span v-if="isEditing" class="input-group-text">
      <span class="d-lg-inline-block d-none">{{ $t("presets.edit_preset") }}</span>
      <i class="bi bi-pencil d-lg-none d-inline-block"></i>
    </span>
    <span v-else class="input-group-text">
      <span class="d-lg-inline-block d-none">{{ $t("presets.new_preset") }}</span>
      <i class="bi bi-plus-circle-fill d-lg-none d-inline-block"></i>
    </span>
    <input
        type="text"
        @keydown.self.enter="saveCurrentPreset"
        v-model.trim="currentPresetName"
        :placeholder="$t('presets.name_example')"
        class="form-control styled"
        maxlength="20"/>
    <button
        class="btn btn-primary"
        type="button"
        @click="saveCurrentPreset"
        :disabled="currentPresetName.length === 0 || areSetsEqual(presets.getCases(currentPresetName), selected.asKeySet)">
      {{ $t("presets.save_btn") }}
    </button>
  </div>
  <div
      v-if="Object.keys(presets.map).length > 1 || presets.getCases(starredName).size > 0"
      v-for="name in Object.keys(presets.map)"
      :key="name"
      class="d-flex align-items-center mb-2"
  >
      <span
          class="me-2 rounded-1 presetName px-1"
          :class="areSetsEqual(presets.getCases(name), selected.asKeySet) ? 'is_current' : ''"
      >
        {{ name }} ({{ presets.getCases(name).size }})</span>
    <button
        type="button"
        class="btn btn-sm btn-outline-success me-1"
        :disabled="areSetsEqual(presets.getCases(name), selected.asKeySet)"
        :title="$t('presets.apply_btn')"
        @click="applyPreset(name)">
      <i class="bi bi-download"></i>
    </button>
    <button class="btn btn-sm btn-outline-danger"
            type="button"
            v-if="name !== starredName"
            :title="$t('presets.delete_btn')"
            @click="presets.deletePreset(name)">
      <i class="bi bi-trash"></i>
    </button>
  </div>

</template>

<style scoped>
.is_current {
  background-color: var(--bs-primary);
  color: white;
}
</style>