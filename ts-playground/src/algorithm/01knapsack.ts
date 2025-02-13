function maxTotalValue(
  numGoods: number,
  bagCapacity: number,
  weight: number[],
  value: number[],
): number {
  // 初始化 dp 数组
  // let rowCount = numGoods + 1;
  // let columnCount = bagCapacity + 1;
  const dp: number[][] = new Array(numGoods + 1)
    .fill([])
    .map(() => new Array(bagCapacity + 1).fill(0));

  // console.log(dp)
  for (let i = 1; i <= numGoods; i++) {
    for (let j = 1; j <= bagCapacity; j++) {
      if (j < weight[i - 1]) {
        dp[i][j] = dp[i - 1][j];
        continue;
      }
      dp[i][j] = // 前 i 个物品, 放入容量为 j 的背包的最大收益
        Math.max(
          // 不放物品 i
          // 则 dp[i][j] = 前 i-1 个物品, 放入容量为 j 的背包的最大收益
          dp[i - 1][j],
          // 放物品 i
          // 则 dp[i][j] = 前 i-1 个物品, 放入容量为 j-w[i-1] 的背包的最大收益,
          // 再加上 物品 i-1 的收益 v[i-1]
          dp[i - 1][j - weight[i - 1]] + value[i - 1],
        );
    } // inner for-loop
  } // outer for-loop
  return dp[numGoods][bagCapacity];
}
const numGoods = 4;
const bagCapacity = 32;
const weight = [10, 15, 6, 9];
const value = [2, 5, 8, 1];
console.log(maxTotalValue(numGoods, bagCapacity, weight, value));
