<script setup>
import Scramble from "@/components/timer/Scramble.vue";
import Timer from "@/components/timer/Timer.vue";
</script>

<template>
  <div class="d-flex flex-column">
    <div class="row no-gutters">
      <div class="col-12 bg-gradient">
        <Scramble/>
      </div>
    </div>

    <div class="row flex-grow-1 bg-gradient">
      <div class="col-8">
        <Timer/>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Stats</h5>
                <p class="card-text">Some stats here</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">History</h5>
                <p class="card-text">Some history here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
</style>