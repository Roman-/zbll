<script setup>
import {usePresetsStore} from "@/stores/PresetStore";
import {computed, ref} from "vue";
import {useSelectedStore} from "@/stores/SelectedStore";

const presets = usePresetsStore()
const selected = useSelectedStore()

const currentPresetName = ref("")

const saveCurrentPreset = () => {
  const index = Object.keys(presets.map).indexOf(currentPresetName.value);
  presets.setPreset(currentPresetName.value, selected.allSelectedCases)

  if (index >= 0) {
    const spanElement = document.querySelectorAll(".presetName")[index];
    spanElement.classList.add("bg-success");
    setTimeout(() => spanElement.classList.remove("bg-success"), 500)
  }
}
const applyPreset = (name) => {
  selected.applyFromPreset(presets.getCases(name))
  currentPresetName.value = name
}

const saveButton = ref(null)

const prefixText = computed(() => presets.map.hasOwnProperty(currentPresetName.value) ? "Edit preset" : "New preset")
</script>

<template>
  <div class="container">
    <h5>Presets</h5>

    <div v-for="name in Object.keys(presets.map)" :key="name" class="d-flex align-items-center mb-2">
      <span class="me-2 presetName rounded-1">{{ name }}</span>
      <button class="btn btn-sm btn-outline-success me-1" type="button" @click="applyPreset(name)">
        <i class="bi bi-check-circle"></i>
      </button>
      <button class="btn btn-sm btn-outline-danger"
              type="button"
              :disabled="name === 'starred'"
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
          ref="saveButton"
          @click="saveCurrentPreset"
          :disabled="currentPresetName.length === 0">
        Save
      </button>
    </div>
  </div>
</template>

<style scoped>
.presetName {
  transition: background-color 0.1s ease;
}
</style>