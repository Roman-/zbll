import zbll_map from "@/assets/zbll_map.json"

// returns how many zbll cases are there under this oll
export const countZbllsInOll = (oll)=>{
  let result = 0;
  for (let coll in zbll_map[oll]) {
    result += countZbllsInColl(oll, coll);
  }
  return result;
}

// returns how many zbll cases are there under this oll
export const countZbllsInColl = (oll, coll)=>{
  return Object.keys(zbll_map[oll][coll]).length;
}

export const isZbllSelected = (select_map, oll, coll, zbll) => {
  return select_map[oll]
    && select_map[oll][coll]
    && select_map[oll][coll].includes(zbll);
}

export const numZbllsInCollSelected = (select_map, oll, coll) => {
  return (select_map[oll] && select_map[oll][coll]) ? select_map[oll][coll].length : 0;
}

export const numZbllsInOllSelected = (select_map, oll) => {
  if (!select_map[oll]) {
    return 0;
  }
  let result = 0;

  for (let coll in select_map[oll]) {
    result += numZbllsInCollSelected(select_map, oll, coll);
  }

  return result;
}

