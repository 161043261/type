#include <algorithm>
#include <climits>
#include <cmath>
#include <iostream>
#include <vector>

using namespace std;

int main() {
  long long DIST_MAX = pow(10, 9);
  // n 个点
  // m 条边
  // 求 s 到 t 的最短路径
  int n, m, s, t;
  cin >> n >> m >> s >> t;

  // graph[i][j] 表示节点 i 到节点 j 的边权
  vector<vector<long long>> graph(
      n + 1, vector<long long>(n + 1, DIST_MAX /** climits */));

  // dist[i] 表示起点 s 到节点 i 的最短路径
  // 求 dist[t]
  vector<long long> dist(n + 1, DIST_MAX /** climits */);
  dist[s] = 0;

  int si, ti, wi;
  for (int i = 0; i < m; i++) {
    cin >> si >> ti >> wi;
    graph[si][ti] = wi;
  }

  // done[i] 是否已确定起点 s 到节点 i 的最短路径长度
  vector<bool> done(n + 1, false);
  // done[s] = true;

  // 1. 取除起点 s 外的 dist[i] 的最小值 (假设 i = 3), 确定起点 s 到节点 3
  // 的最短路径长度
  // 2. 使用节点 3 到邻居 y 的边权 graph[3][y] 更新 dist[y]
  //    即 if (dist[3] + graph[3][y] < dist[y]) { dist[y] = dist[3] +
  //    graph[3][y] }
  // 3. 取除起点 s, 节点 3 外的 dist[i] 的最小值, 重复 2, 3
  // 4. 确定起点 s 到所有节点的最短路径长度时, 算法结束
  while (true) {
    // for_each(dist.cbegin(), dist.cend(),
    //          [](long long item) -> void { cout << item << " "; });
    cout << endl;
    int x = 0;
    for (int i = 1; i <= n; i++) {
      if (!done[i] && (x == 0 || dist[i] < dist[x])) {
        x = i;
      }
    }
    if (x == t) {
      cout << dist[t];
      return 0;
    }
    done[x] = true;
    for (int y = 1; y <= n; y++) {
      dist[y] = min(dist[y], dist[x] + graph[x][y]);
    }
  }
}
