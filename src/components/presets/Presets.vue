<script setup>
import {usePresetsStore} from "@/stores/PresetStore";
import {computed, onMounted, ref} from "vue";
import {useSelectedStore} from "@/stores/SelectedStore";

const presets = usePresetsStore()
const selected = useSelectedStore()

const currentPresetName = ref("")

const saveCurrentPreset = () => {
  presets.set(currentPresetName.value, selected.allSelectedCases)
}
const applyPreset = (name) => {
  selected.loadMap(presets.get(name))
  currentPresetName.value = name
}

const prefixText = computed(() => presets.map.hasOwnProperty(currentPresetName.value) ? "Edit preset" : "New preset")
</script>

<template>
  <div class="container">
    <h5>Presets</h5>

    <div v-for="name in Object.keys(presets.map)" :key="name" class="d-flex align-items-center mb-2">
      <span class="me-2">{{ name }}</span>
      <button class="btn btn-sm btn-outline-success me-1" type="button" @click="applyPreset(name)">
        <i class="bi bi-check-circle"></i>
      </button>
      <button class="btn btn-sm btn-outline-danger"
              type="button"
              :disabled="name === 'starred'"
              @click="presets.remove(name)">
        <i class="bi bi-trash"></i>
      </button>
    </div>

    <div class="input-group input-group-sm">
      <span class="input-group-text">{{ prefixText }}</span>
      <input
          type="text"
          @keydown.self.enter="saveCurrentPreset"
          v-model.trim="currentPresetName" placeholder="" class="form-control" maxlength="20"/>
      <button
          class="btn btn-primary"
          type="button"
          id="saveButton"
          @click="saveCurrentPreset"
          :disabled="currentPresetName.length === 0">
        Save
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>