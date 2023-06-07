<script setup>
import zbll_map_next from "@/assets/zbll_map_next.json"
import {computed} from "vue";
const props = defineProps(['zbllKey']);

const suggestedAlgs = computed(() => zbll_map_next[props.zbllKey].algs.slice(0, 3))

</script>

<template>
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