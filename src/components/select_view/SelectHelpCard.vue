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
            :disabled="btnDisabled"
            @click="startPractice"
            @keydown.space.prevent=""
        >
          practice
        </button>
        <button
            class="form-control my-1 btn btn-outline-primary"
            tabindex="-1"
            :disabled="btnDisabled"
            @click="startRecap"
            @keydown.space.prevent=""
        >
          recap
        </button>
      </h5>
      <hr>
      <div class="stats-container" ref="statsContainer">
          Hi there. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Adipisci aliquid beatae dolorem laborum magni minus.
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>