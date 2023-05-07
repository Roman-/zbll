<script setup>
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useSessionStore} from "@/stores/SessionStore";
import Presets from "@/components/presets/Presets.vue";
import BasicInfo from "@/components/select_view/BasicInfo.vue";
import {useSettingsStore} from "@/stores/SettingsStore";

const router = useRouter();

const selectedStore = useSelectedStore();
const sessionStore = useSessionStore()
const settings = useSettingsStore()
const btnDisabled = computed(() => selectedStore.totalZbllsSelected() === 0)

const startPractice = () => {
  sessionStore.recapMode = false
  router.push('timer')
}

const startRecap = () => {
  sessionStore.recapMode = true
  router.push('timer')
}

</script>

<template>
  <div class="card mt-1">
    <div class="card-body">
      <h5 class="mb-0">
        <button
            class="form-control my-1 btn btn-primary"
            tabindex="-1"
            title="practice selected cases randomly"
            :disabled="btnDisabled"
            @click="startPractice"
            @keydown.space.prevent=""
        >
          practice
        </button>
        <button
            class="form-control my-1 btn btn-outline-primary"
            tabindex="-1"
            title="go through each of the selected cases once"
            :disabled="btnDisabled"
            @click="startRecap"
            @keydown.space.prevent=""
        >
          recap
        </button>
      </h5>
      <hr>
      <BasicInfo v-if="settings.showHowTo"/>
      <Presets/>
    </div>
  </div>
</template>

<style scoped>
</style>