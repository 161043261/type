/**
 *
 * @param w weights 每个物品的重量
 * @param v values 每个物品的价值
 * @param n number 物品的数量, n === w.length
 * @param cap capacity 背包可以装入的最大物品重量
 * @returns 背包可以装入的最大价值
 */
function knapsack(w: number[], v: number[], n: number, cap: number): number {
  const dp = Array.from(
    {
      length: n + 1,
    },
    () => new Array(cap + 1).fill(0),
  );

  for (let i = 1; i <= n; i++) {
    // 第 i 个物品
    for (let j = 1; j <= cap; j++) {
      // 背包容量 j
      if (j < w[i - 1]) {
        // 不能装入
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j], // 不装入
          dp[i - 1][j - w[i - 1]] + v[i - 1], // 装入
        );
      }
    }
  }
  return dp[n][cap];
}

const start1 = performance.now();
console.log(
  knapsack(
    [1, 11, 21, 23, 33, 43, 45, 55], // w 每个物品的重量
    [11, 21, 31, 33, 43, 53, 55, 65], // v 每个物品的价值
    8, // n 物品的数量, n === w.length
    110, // cap 背包可以装入的最大物品重量
  ),
);
console.log(performance.now() - start1);

/**
 *
 * @param w eights 每个物品的重量
 * @param v values 每个物品的价值
 * @param n number 物品的数量, n === w.length
 * @param cap capacity 背包可以装入的最大物品重量
 * @returns 背包可以装入的最大价值
 */
function knapsackWithBacktrack(
  w: number[],
  v: number[],
  n: number,
  cap: number,
): number {
  // greedy
  const wv: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    wv[i] = [w[i], v[i]];
  }
  wv.sort((a, b) => -a[1] / a[0] + b[1] / b[0]);
  w = wv.map((item) => item[0]);
  v = wv.map((item) => item[1]);
  let ans = 0;

  // 剪枝
  const pruning = function (i: number, ctw: number, ctv: number): boolean {
    for (let j = i; j < n; j++) {
      if (cap - ctw >= w[j]) {
        ctw += w[j];
        ctv += v[j];
      } else {
        ctv += (v[j] * (cap - ctw)) / w[j];
        return ctv <= ans;
      }
    }
    return ctv <= ans;
  };

  /**
   *
   * @param start 起始下标
   * @param ctw Current Total Weight 背包当前装入的物品重量
   * @param ctv Current Total Value 背包当前装入的物品价值
   */
  const backtrack = function (start: number, ctw: number, ctv: number) {
    for (let i = start; i < n; i++) {
      if (ctw + w[i] > cap) {
        ans = Math.max(ans, ctv);
        continue;
      }
      // ctw + w[i] <= cap
      if (pruning(i, ctw, ctv)) {
        break;
      }
      // 装入物品 i
      // ctw += w[i];
      // ctv += v[i];
      backtrack(i + 1, ctw + w[i], ctv + v[i]);
      // 取出物品 i
      // ctw -= w[i];
      // ctv -= v[i];
    }
  };
  backtrack(0, 0, 0);
  return ans;
}

const start2 = performance.now();
console.log(
  knapsackWithBacktrack(
    [1, 11, 21, 23, 33, 43, 45, 55], // w 每个物品的重量
    [11, 21, 31, 33, 43, 53, 55, 65], // v 每个物品的价值
    8, // n 物品的数量, n === w.length
    110, // cap 背包可以装入的最大物品重量
  ),
);
console.log(performance.now() - start2);
