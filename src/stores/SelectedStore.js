import {reactive, watch} from 'vue'
import { defineStore } from 'pinia'
import zbll_map from "@/assets/zbll_map.json"

const localStoreKey = "currentZbllMap";

export const useSelectedStore = defineStore('selected', () => {
  const map = reactive(JSON.parse(localStorage.getItem(localStoreKey) || "{}"))

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
    map[oll] = map[oll] || {};
    map[oll][coll] = [];
    for (let zbll in zbll_map[oll][coll]) {
      map[oll][coll].push(zbll);
    }
  }

  // remove all coll cases
  function removeColl(oll, coll) {
    if (!map[oll])
      return;
    delete map[oll][coll];
    if (!Object.keys(map[oll]).length) // if map[oll] becomes empty, delete it
      delete map[oll];
  }

  function addZbll(oll, coll, zbll) {
    map[oll] = map[oll] || {};
    map[oll][coll] = map[oll][coll] || [];
    map[oll][coll].push(zbll);
  }

  const removeZbll = (oll, coll, zbll) => {
    if (!map[oll] || !map[oll][coll])
      return;
    map[oll][coll] = map[oll][coll].filter((item) => item !== zbll); // delete zbll from array
    if (!map[oll][coll].length)
      delete map[oll][coll];
    if (!Object.keys(map[oll]).length)
      delete map[oll];
  }

  const isZbllSelected = (oll, coll, zbll) =>
    map[oll]
    && map[oll][coll]
    && map[oll][coll].includes(zbll);

  const numZbllsInCollSelected = (oll, coll) =>
    (map[oll] && map[oll][coll]) ? map[oll][coll].length : 0;

  const numZbllsInOllSelected =
    (oll) => map[oll]
      ? Object.values(map[oll]).reduce((sum, zbllsArray) => sum + zbllsArray.length, 0)
      : 0


  watch(map, () => localStorage.setItem(localStoreKey, JSON.stringify(map)))

  return { map,
    addOll, addColl, addZbll,
    removeOll, removeColl, removeZbll,
    isZbllSelected, numZbllsInCollSelected, numZbllsInOllSelected }
});