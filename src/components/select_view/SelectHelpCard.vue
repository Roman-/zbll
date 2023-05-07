<script setup>
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useSelectedStore} from "@/stores/SelectedStore";
import {useSessionStore} from "@/stores/SessionStore";

const router = useRouter();

const selectedStore = useSelectedStore();
const sessionStore = useSessionStore()
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
      <div class="stats-container" ref="statsContainer">
        <ul class="no_bullet">
          <li>🖱️ Click on the picture to select / deselect all cases in the group</li>
          <li>🔽 Click on the item header to expand / collapse the group</li>
          <li>🟢 Green color means all cases in the group are selected; 🟡 yellow - some cases are selected; ⚪ white - no
            cases selected
          </li>
          <li>✅ When you're ready, click "Practice"</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul.no_bullet {
  list-style-type: none;
  padding: 0;
}
</style>