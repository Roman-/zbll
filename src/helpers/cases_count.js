import zbll_map from "@/assets/zbll_map.json"

// returns how many zbll cases are there under this oll
export const countZbllsInOll =
  oll => Object.values(zbll_map[oll]).reduce((sum, zblls) => sum + Object.keys(zblls).length, 0);

// returns how many zbll cases are there under this oll
export const countZbllsInColl = (oll, coll) => Object.keys(zbll_map[oll][coll]).length