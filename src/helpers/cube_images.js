export const getOllImg = (oll) => {
  return new URL(`../assets/svg/${oll}.svg`, import.meta.url).href
}

export const getCollImg = (oll, coll, view) => {
  return new URL(`../assets/svg/${view}/${oll}-${coll}.svg`, import.meta.url).href
}

export const getZbllImg = (oll, coll, zbll, view) => {
  return new URL(`../assets/svg/${view}/${oll}-${coll}-${zbll}.svg`, import.meta.url).href
}

/// @returns VisualCube picture URL for scramble
export const scrambleToVcUrl = (scramble, view) => {
  const viewOption = (view === "top") ? 'view=plan' : 'r=y35x-30';
  return `https://bestsiteever.ru/visualcube/visualcube.php?fmt=svg&bg=t&stage=ll&${viewOption}&alg=${encodeURIComponent(scramble).replace(/'/g, '%27')}`;
};

/// Add image for this scramble to browser cache
/// @param view: "top" or "3D"
export const preloadImage = (scramble, view) => {
  if (scramble && typeof scramble === 'string') {
    const img = new Image();
    img.src = scrambleToVcUrl(scramble, view);
  }
};
