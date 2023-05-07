<script setup>
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useSelectedStore} from "@/stores/SelectedStore";
const router = useRouter();

const selectedStore = useSelectedStore();
const btnDisabled = computed(() => selectedStore.totalZbllsSelected() === 0)

const startRecap = () => {
  // …
  router.push('timer')
}

</script>

<template>
  <div class="card mt-1">
    <div class="card-body">
      <h5 class="mb-0">
        <button
            tabindex="-1"
            :disabled="btnDisabled"
            @click="router.push('timer')"
            @keydown.space.prevent=""
            class="form-control my-1 btn btn-primary">
          practice
        </button>
        <button
            tabindex="-1"
            :disabled="btnDisabled"
            @click="startRecap"
            @keydown.space.prevent=""
            class="form-control my-1 btn btn-outline-primary">
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