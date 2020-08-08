export function range(n, start = 0) {
  return [...Array(n).keys()].map((x) => x + start);
}
