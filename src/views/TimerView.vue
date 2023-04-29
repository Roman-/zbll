<script setup>
import Scramble from "@/components/timer/Scramble.vue";
import Timer from "@/components/timer/Timer.vue";
import CubePictureCard from "@/components/timer/CubePictureCard.vue";
import StatsCard from "@/components/timer/StatsCard.vue";

// if no cases selected, redirect to "select" view
import {useSelectedStore} from "@/stores/SelectedStore";
import {useSessionStore} from "@/stores/SessionStore";
import {useRouter} from "vue-router";
import {msToHumanReadable} from "@/helpers/time_formatter";

const router = useRouter();
const selectedStore = useSelectedStore()
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

        <div class="row">
          <div class="col-12">
            <StatsCard/>
          </div>
        </div>
        <div class="row my-3">
          <div class="col-12">
            <CubePictureCard/>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
</style>