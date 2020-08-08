export function range(n: number, start: number = 0): number[] {
  return Array.from(new Array(n).keys()).map((x) => x + start);
}
