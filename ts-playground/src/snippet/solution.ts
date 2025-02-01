function maxCount(m: number, n: number, ops: number[][]): number {
  let [w, h] = [m, n];
  for (const op of ops) {
    [w, h] = [Math.min(op[0], w), Math.min(op[1], h)];
  }
  return w * h;
}
