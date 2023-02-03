const cube_view = "top"; // TODO configurable through user prefs store

export const getOllImg = (oll) => {
  return new URL(`../assets/svg/${oll}.svg`, import.meta.url).href
}

export const getCollImg = (oll, coll) => {
  return new URL(`../assets/svg/${cube_view}/${oll}-${coll}.svg`, import.meta.url).href
}

export const getZbllImg = (oll, coll, zbll) => {
  return new URL(`../assets/svg/${cube_view}/${oll}-${coll}-${zbll}.svg`, import.meta.url).href
}
