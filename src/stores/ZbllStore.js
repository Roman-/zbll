import zbll_map from "@/assets/zbll_map.json"
import { defineStore } from 'pinia'

export const useZbllStore = defineStore('zbll', () => {
  // returns how many zbll cases are there under this oll
  const countZbllsInOll =
    oll => Object.values(zbll_map[oll]).reduce((sum, zblls) => sum + Object.keys(zblls).length, 0);

  // returns how many zbll cases are there under this oll
  const countZbllsInColl = (oll, coll) => Object.keys(zbll_map[oll][coll]).length

  const getRandomScramble = (oll, coll, zbll) => {
    const array = zbll_map[oll][coll][zbll];
    return array[Math.floor(Math.random() * array.length)];
  }

  return { countZbllsInOll, countZbllsInColl, getRandomScramble }
});