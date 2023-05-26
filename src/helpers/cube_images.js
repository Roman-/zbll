export const getOllImg = (oll) => {
  return new URL(`../assets/svg/${oll}.svg`, import.meta.url).href
}

export const getCollImg = (oll, coll, view) => {
  return new URL(`../assets/svg/${view}/${oll}-${coll}.svg`, import.meta.url).href
}

export const getZbllImg = (oll, coll, zbll, view) => {
  return new URL(`../assets/svg/${view}/${oll}-${coll}-${zbll}.svg`, import.meta.url).href
}
