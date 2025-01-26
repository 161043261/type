#include <algorithm>
#include <functional>
#include <iostream>
#include <vector>

using namespace std;

const int n = 8;                        // 例: 8 个皇后, 序号 0..7
vector<int> cols = vector<int>(n, -1);  // 8 个皇后的列下标

bool place(int r, /* 已放置 0..r-1 号皇后 */
           int c  /* 第 r 号皇后放置在第 r 行, 第 c 列 */
) {
  for (int i = 0; i < r; i++) {
    if (cols[i] == c ||                    // 列冲突
        abs(cols[i] - c) == abs(i - r)) {  // 斜线冲突
      return false;
    }
  }
  return true;
}

void nQueues(int r /* 放置第 r 号皇后 */) {
  for (int c = 0; c < n; c++) {
    if (place(r, c)) {
      cols[r] = c;       // 将第 r 号皇后放置在第 r 行, 第 c 列
      if (r == n - 1) {  // 已放置全部的皇后
        cout << "columns: ";
        for_each(cols.begin(), cols.end(),
                 [](auto item) -> void { cout << item << " "; });
        cout << endl;
        exit(0);  // 找到一个可行解, 直接退出
      } else {
        nQueues(r + 1);  // 深度优先遍历, 放置第 r+1 号皇后
      }
    }
  }
}

int main() { nQueues(0 /* start */); }

vector<vector<string>> solveNQueens(int n) {
  auto ans = vector<vector<string>>{};
  auto cols = vector<int>(n /* , 0 */);
  auto occ = vector<bool>(n /* , false */);
  auto diag1 = vector<bool>(n /* , false */);
  auto diag2 = vector<bool>(n /*, false */);

  using t = function<void(const int)>;
  t dfs;
  dfs = [&](const int r) -> void {
    if (r == n) {
      vector<string> item;
      //! Appends a new element to the end of the container

      // preallocate
      item.reserve(cols.size());

      for (const auto &c : cols) {
        item.emplace_back(string(c, '.') + 'Q' + string(n - 1 - c, '.'));
      }
      ans.emplace_back(item);
      return;
    }
    for (auto c = 0; c < n; c++) {
      if (!occ[c] && !diag1[r + c] && !diag2[r - c + n - 1]) {
        cols[r] = c;
        occ[c] = diag1[r + c] = diag2[r - c + n - 1] = true;
        dfs(r + 1);
        occ[c] = diag1[r + c] = diag2[r - c + n - 1] = false;
      }
    }
  };

  dfs(0);
  return ans;
}
