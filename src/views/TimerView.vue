<script setup>
import Scramble from "@/components/timer/Scramble.vue";
import Timer from "@/components/timer/Timer.vue";
</script>

<template>
  <div>
      <Scramble/>
    <div class="row bg-dark">
      <div class="col-8">
        <Timer/>
      </div>
      <div class="col-4">
        col4
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>