import {computed, reactive, ref} from 'vue'
import { defineStore } from 'pinia'
import zbll from "@/assets/zbll_map.json"

export const useSelectedStore = defineStore('selected', () => {
  const map = reactive({})

  // null means ALL cases in group
  function removeOll(oll) {
    delete map[oll];
  }
  // add ALL cases from this oll
  function addOll(oll) {
    map[oll] = {};
    for (let coll in zbll) {
      console.log("coll = ", coll);
      addColl(oll, coll);
    }
  }

  function addColl(oll, coll) {
    if (!map.hasOwnProperty(oll)) {
      map[oll] = {};
    }
    map[oll][coll] = [];
    for (zbll in zbll[oll][coll]) {
      map[oll][coll].push(zbll);
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

  function isZbllSelected(oll, coll, zbll) {
    return map.hasOwnProperty(oll) && map[oll].hasOwnProperty(coll) && map[oll][coll].has(zbll);
  }

  function numZbllsInCollSelected(oll, coll) {
    if (!map.hasOwnProperty(oll) || !map[oll].hasOwnProperty(coll)) {
      return 0;
    }
    return map[oll][coll].size;
  }

  function numZbllsInOllSelected(oll) {
    if (!map.hasOwnProperty(oll)) {
      return 0;
    }
    let result = 0;
    for (let coll in map[oll]) {
      result += numZbllsInCollSelected(map[oll][coll]);
    }
    return result;
  }

  return { map, removeOll, addOll, addColl, removeColl, addZbll, removeZbll,
    isZbllSelected, numZbllsInCollSelected, numZbllsInOllSelected }
});
