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
