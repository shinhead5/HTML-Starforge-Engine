const svg = (color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" fill="${color}"/></svg>`
  )}`;

const wavData =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQgAAAAA/////wAAAP///wAA";

export const inlineAssets = {
  tiles: svg("#2a2f3a"),
  player: svg("#5be37d"),
  enemy: svg("#e35b5b"),
  projectile: svg("#f4d35e"),
  ui: svg("#3b82f6"),
  shoot: wavData,
  hit: wavData,
  music: wavData
};
