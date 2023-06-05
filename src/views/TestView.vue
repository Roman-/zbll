<script setup>

// generate zbll_map_next.json
import zbll_map_old from "@/assets/zbll_map_old.json"
import {zbll_good_algs_str} from "@/assets/algs_classification"
import {scrambles} from "@/assets/zbll_scrambles"
import {ref} from "vue";

const text = ref("")

const finalZbllMap = {} // "key" => {key:string, algs: array, scrambles: ...}
// load keys

for (let oll in zbll_map_old) {
  for (let coll in zbll_map_old[oll]) {
    for (let zbll in zbll_map_old[oll][coll]) {
      const key = `${oll} ${coll} ${zbll}`
      if (finalZbllMap[key]) {
        console.error("duplicate key: ", key, finalZbllMap[key]);
      }
        finalZbllMap[key] = {
          "key": key,
          "algs": [],
          "scrambles": {},
        };
    }
  }
}

// push algs
zbll_good_algs_str.split('\n').forEach(line => {
  const [key, alg] = line.split('\t')
  if (!finalZbllMap[key]) {
    console.error("key not found: ", key);
  }
  finalZbllMap[key].algs.push(alg)
})

// push scrambles
for (let len in scrambles) {
  scrambles[len].split('\n').forEach(line => {
    const [key, scramble] = line.split('\t')
    if (!finalZbllMap[key]) {
      console.error("key not found: ", key);
    }
    if (finalZbllMap[key].scrambles[len]) {
      finalZbllMap[key].scrambles[len].push(scramble)
    } else {
      finalZbllMap[key].scrambles[len] = [scramble]
    }
  })
}

text.value = JSON.stringify(finalZbllMap)

</script>

<template>
  <textarea v-model="text" rows="20"></textarea>
</template>

<style scoped>
</style>