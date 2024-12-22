"use strict";
// Dijkstra
// leetcode 3208
// deno compile -A -o main ./solution.ts
function networkDelayTime(times, n, k) {
  // g[i][j] 表示节点 i 到节点 j 的边权
  // dis[i] 表示起点 k 到节点 i 的最短路径长度
  // 1. 使用 g 数组初始化起点 k 到邻居 y 的最短路径, 即 dis[y] = g[k][y]
  // 2. 取除起点 k 外的 dis[i] 的最小值 (假设 i = 3), 确定起点 k 到节点 3 的最短路径长度
  // 3. 使用节点 3 到邻居 y 的边权 g[3][y] 更新 dis[y]
  //    即 if (dis[3] + g[3][y] < dis[y]) { dis[y] = dis[3] + g[3][y] }
  // 4. 取除起点 k, 节点 3 外的 dis[i] 的最小值, 重复 2, 3
  // 5. 确定起点 k 到所有节点的最短路径长度时, 算法结束
  const g = Array.from(
    {
      length: n,
    },
    () => new Array(n).fill(Infinity),
  );
  for (const [x, y, d] of times) {
    g[x - 1][y - 1] = d;
  }
  const dis = new Array(n).fill(Infinity);
  dis[k - 1] = 0;
  const done = new Array(n).fill(false);
  while (true) {
    let x = -1;
    for (let i = 0; i < n; i++) {
      if (!done[i] && (x < 0 || dis[i] < dis[x])) {
        x = i;
      }
    }
    if (x == -1) {
      return Math.max(...dis);
    }
    if (dis[x] === Infinity) {
      return -1;
    }
    done[x] = true;
    for (let y = 0; y < n; y++) {
      dis[y] = Math.min(dis[y], dis[x] + g[x][y]);
    }
  }
}
console.log(
  networkDelayTime(
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    4,
    2,
  ),
);
