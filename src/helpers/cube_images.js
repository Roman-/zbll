export const getOllImg = (oll) => {
  return new URL(`../assets/svg/${oll}.svg`, import.meta.url).href
}

export const getCollImg = (oll, coll, view) => {
  return new URL(`../assets/svg/${view}/${oll}-${coll}.svg`, import.meta.url).href
}

export const getZbllImg = (key, view) => {
  const keyWithDashes = key.replaceAll(' ', '-')
  return new URL(`../assets/svg/${view}/${keyWithDashes}.svg`, import.meta.url).href
}
