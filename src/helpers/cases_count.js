import zbll_map from "@/assets/zbll_map.json"

// returns how many zbll cases are there under this oll
export const countZbllsInOll =
  oll => Object.values(zbll_map[oll]).reduce((sum, zblls) => sum + Object.keys(zblls).length, 0);

// returns how many zbll cases are there under this oll
export const countZbllsInColl = (oll, coll) => Object.keys(zbll_map[oll][coll]).length

export const isZbllSelected = (select_map, oll, coll, zbll) =>
  select_map[oll]
  && select_map[oll][coll]
  && select_map[oll][coll].includes(zbll);

export const numZbllsInCollSelected = (select_map, oll, coll) =>
  (select_map[oll] && select_map[oll][coll]) ? select_map[oll][coll].length : 0;

export const numZbllsInOllSelected =
  (select_map, oll) => select_map[oll]
    ? Object.values(select_map[oll]).reduce((sum, zbllsArray) => sum + zbllsArray.length, 0)
    : 0

