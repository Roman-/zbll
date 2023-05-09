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

const prefixText = computed(() => presets.map.hasOwnProperty(currentPresetName.value) ? "Edit preset" : "New preset")
</script>

<template>
  <div class="container">
    <h5>Presets</h5>

    <div
        v-for="name in Object.keys(presets.map)"
        :key="name"
        class="d-flex align-items-center mb-2"
    >
      <span
          class="me-2 rounded-1 presetName px-1"
          :class="areSetsEqual(presets.getCases(name), selected.asKeySet) ? 'is_current' : ''"
          >
        {{ name }} ({{presets.getCases(name).size}})</span>
      <button
          type="button"
          class="btn btn-sm btn-outline-success me-1"
          :disabled="areSetsEqual(presets.getCases(name), selected.asKeySet)"
          @click="applyPreset(name)">
        <i class="bi bi-download"></i>
      </button>
      <button class="btn btn-sm btn-outline-danger"
              type="button"
              v-if="name !== starredName"
              @click="presets.deletePreset(name)">
        <i class="bi bi-trash"></i>
      </button>
    </div>

    <div class="input-group input-group-sm">
      <span class="input-group-text">{{ prefixText }}</span>
      <input
          type="text"
          @keydown.self.enter="saveCurrentPreset"
          v-model.trim="currentPresetName"
          placeholder="to learn"
          class="form-control styled"
          maxlength="20"/>
      <button
          class="btn btn-primary"
          type="button"
          @click="saveCurrentPreset"
          :disabled="currentPresetName.length === 0 || areSetsEqual(presets.getCases(currentPresetName), selected.asKeySet)">
        Save
      </button>
    </div>
  </div>
</template>

<style scoped>
.is_current {
  background-color: var(--bs-primary);
  color: white;
}
</style>