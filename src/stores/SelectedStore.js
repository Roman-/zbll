import {computed, reactive, ref} from 'vue'
import { defineStore } from 'pinia'
import zbll_map from "@/assets/zbll_map.json"

export const useSelectedStore = defineStore('selected', () => {
  const map = reactive({})

  // null means ALL cases in group
  function removeOll(oll) {
    delete map[oll];
  }
  // add ALL cases from this oll
  function addOll(oll) {
    map[oll] = {};
    for (let coll in zbll_map[oll]) {
      addColl(oll, coll);
    }
  }

  function addColl(oll, coll) {
    if (!map.hasOwnProperty(oll)) {
      map[oll] = {};
    }
    map[oll][coll] = new Set();
    for (let zbll in zbll_map[oll][coll]) {
      map[oll][coll].add(zbll);
    }
  }

  // remove all coll cases
  function removeColl(oll, coll) {
    if (map.hasOwnProperty(oll)) {
      delete map[oll][coll];
    }
    // check of map[oll] is empty; if so, delete oll
    if (Object.keys(map[oll]).length === 0) {
      delete map[oll];
    }
  }

  function addZbll(oll, coll, zbll) {
    if (!map.hasOwnProperty(oll)) {
      map[oll] = {};
    }
    if (!map[oll].hasOwnProperty(coll)) {
      map[oll][coll] = new Set();
    }
    map[oll][coll].add(zbll);
  }

  function removeZbll(oll, coll, zbll) {
    if (!map.hasOwnProperty(oll) || !map[oll].hasOwnProperty(coll)) {
      return;
    }
    map[oll][coll].delete(zbll); // delete from set
    if (map[oll][coll].size === 0) {
      delete map[oll][coll];
    }
    if (Object.keys(map[oll]).length === 0) {
      delete map[oll];
    }
  }

  return { map, removeOll, addOll, addColl, removeColl, addZbll, removeZbll}
});
