export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
