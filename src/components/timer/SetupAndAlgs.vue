<script setup>
import zbll_map_next from "@/assets/zbll_map_next.json"
import {computed} from "vue";
import {inverseScramble} from "@/helpers/scramble_utils";
const props = defineProps(['zbllKey', 'maxAmount']);

const suggestedAlgs = computed(() => zbll_map_next[props.zbllKey].algs.slice(0, props.maxAmount))
const setup = computed(() => inverseScramble(zbll_map_next[props.zbllKey].algs[0]))

</script>

<template>
  <div>Setup: <strong>{{setup}}</strong></div>
  <div class="mt-2">Algs:</div>
  <div>
    <ul>
      <li
          v-for="(alg, i) in suggestedAlgs"
          :key="alg"
          :class="i === 0 ? 'fw-bold' : ''"
      >
        {{alg}}
      </li>
    </ul>
  </div>

</template>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
ul li::before {
  content: "·";
  margin-right: 4px;
}
</style>