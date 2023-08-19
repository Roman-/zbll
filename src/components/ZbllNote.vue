<script setup>
import {useNotesStore} from "@/stores/NotesStore";
import {computed, ref} from "vue";

const notes = useNotesStore()

const props = defineProps(['zbllKey']);
const key = computed(() => props.zbllKey ? props.zbllKey : "")

const isEditing = ref(false)
const noteInput = ref(null)

const beginEditing = () => {
  isEditing.value = true
  setTimeout(() => {
    if (noteInput.value) {
      noteInput.value.focus()
      noteInput.value.select()
    }
  }, 0)
}

const finishEditing = () => {
  isEditing.value = false
}

const inputKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === 'Escape') {
    finishEditing()
  }
  e.stopPropagation()
}
const placeholder = `e.g. "odd regrip", "two sunes", "Feleks' fav alg" etc`
</script>

<template>
  <div v-if="isEditing">
    <input
        v-model.trim="notes.store[key]"
        ref="noteInput"
        class="themed w-100"
        maxlength="200" type="text"
        :placeholder="placeholder"
        @focusout="finishEditing"
        @keydown="inputKeyDown"
    >
  </div>
  <div v-else class="d-flex">
    <div
        v-if="!notes.store[key] || notes.store[key].length === 0"
        class="text-secondary d-flex flex-column justify-content-center"
    >
      <div>
        Add your note
      </div>
    </div>
    <div v-else title="Your note">
      {{notes.store[key]}}
    </div>
    <button class="btn btn-sm btn-link" @click="beginEditing()" title="edit note">
      <i class="bi bi-pencil"></i>
    </button>
  </div>
</template>

<style scoped>

</style>