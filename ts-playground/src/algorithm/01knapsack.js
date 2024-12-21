"use strict";
function maxTotalValue(numGoods, bagCapacity, weight, value) {
    // 初始化 dp 数组
    // let rowCount = numGoods;
    // let columnCount = bagCapacity;
    const dp = new Array(numGoods)
        .fill([])
        .map(() => new Array(bagCapacity + 1).fill(0));
    for (let j = 0; j <= dp[0].length; // bagCapacity
     j++) {
        dp[0][j] = j >= weight[0] ? value[0] : 0;
    }
    // console.log(dp)
    for (let i = 1; i < numGoods; i++) {
        for (let j = 0; j <= bagCapacity; j++) {
            if (j < weight[i]) {
                dp[i][j] = dp[i - 1][j];
                continue;
            }
            dp[i][j] = // 下标 [0, i] 的物品, 放入容量为 j 的背包的最大收益
                Math.max(
                // 不放物品 i
                // 则 dp[i][j] = 下标 [0, i-1] 的物品, 放入容量为 j 的背包的最大收益
                dp[i - 1][j], 
                // 放物品 i
                // 则 dp[i][j] = 下标 [0, i-1] 的物品, 放入容量为 j-w[i] 的背包的最大收益,
                // 再加上 物品 i 的收益
                dp[i - 1][j - weight[i]] + value[i]);
        } // inner for-loop
    } // outer for-loop
    return dp[numGoods - 1][bagCapacity];
}
const numGoods = 7;
const bagCapacity = 15;
const weight = [2, 3, 5, 7, 1, 4, 1];
const value = [10, 5, 15, 7, 6, 18, 3];
console.log(maxTotalValue(numGoods, bagCapacity, weight, value));
