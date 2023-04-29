<script setup>
import Scramble from "@/components/timer/Scramble.vue";
import Timer from "@/components/timer/Timer.vue";
import ResultCard from "@/components/timer/ResultCard.vue";
import StatsCard from "@/components/timer/StatsCard.vue";

import {useSessionStore} from "@/stores/SessionStore";
import {useRouter} from "vue-router";

const router = useRouter();
const sessionStore = useSessionStore()

</script>

<template>
  <div class="d-flex flex-column">
    <div class="row no-gutters">
      <div class="col-12 bg-gradient">
        <Scramble/>
      </div>
    </div>

    <div class="row flex-grow-1 bg-gradient">
      <div class="col-9">
        <Timer/>
      </div>

      <div class="col-3 side_panel">

        <div class="row my-2">
          <div class="col-12">
            <StatsCard/>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-12">
            <ResultCard v-if="sessionStore.stats().length > sessionStore.observingResult"/>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
</style>