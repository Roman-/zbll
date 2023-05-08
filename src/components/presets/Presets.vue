<script setup>
import {usePresetsStore} from "@/stores/PresetStore";
import {onMounted, ref} from "vue";
import {useSelectedStore} from "@/stores/SelectedStore";

const presets = usePresetsStore()
const selected = useSelectedStore()

onMounted(() => {
      presets.set("starred", [])
      presets.set("abc", [])
  console.log("map = ", JSON.stringify(presets.map));
    })

const currentPresetName = ref("")

const saveCurrentPreset = () => {
  presets.set(currentPresetName.value, selected.allSelectedCases)
}

</script>

<template>
  <div class="container">
    <div class="input-group mb-3">
      <input type="text" v-model="currentPresetName" placeholder="new preset" class="form-control styled" />
      <button class="btn btn-primary" type="button" id="saveButton">Save</button>
    </div>

    <div v-for="name in Object.keys(presets.map)" :key="name" class="d-flex align-items-center mb-2">
      <span class="me-2">{{name}}</span>
      <button class="btn btn-sm btn-outline-success me-1" type="button">
        <i class="bi bi-upload"></i>
      </button>
      <button class="btn btn-sm btn-outline-danger" type="button">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>