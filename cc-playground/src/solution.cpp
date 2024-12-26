#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int solution(vector<vector<int>> &grid) {
  const auto n = grid.size();
  if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) {
    return -1;
  }
  const auto next = vector<vector<int>>{
      {-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1},
  };
  auto vis = vector<vector<int>>(n, vector<int>(n, 0));
  auto queue = vector<pair<pair<int, int>, int>>{};
  // TODO make_pair
  queue.emplace_back(make_pair(0, 0), 1);
  while (queue.size() > 0) {
    auto [pos, dist] = queue[0];
    queue.erase(queue.begin());  // 头删
    if (pos.first == n - 1 && pos.second == n - 1) {
      return dist;
    }
    for (const auto &item : next) {
      const auto newX = pos.first + item[0];   // x + dx
      const auto newY = pos.second + item[1];  // y + dy
      if (newX >= 0 && newX < n && newY >= 0 && newY < n &&
          grid[newX][newY] == 0 && vis[newX][newY] == 0) {
        vis[newX][newY] = 1;
        queue.emplace_back(make_pair(newX, newY), dist + 1);
      }
    }
  }
  return -1;
}

int main() {
  vector<vector<int>> grid1 = {{0, 1}, {1, 0}};
  vector<vector<int>> grid2 = {{0, 0, 0}, {1, 1, 0}, {1, 1, 0}};
  vector<vector<int>> grid3 = {{1, 0, 0}, {1, 1, 0}, {1, 1, 0}};

  cout << (solution(grid1) == 2) << endl;
  cout << (solution(grid2) == 4) << endl;
  cout << (solution(grid3) == -1) << endl;
  return 0;
}