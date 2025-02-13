// #include <algorithm>
#include <cstdio>
#include <iostream>
#include <utility>
#include <vector>

using namespace std;

pair<int, int> getTwo(vector<int> &arr) {
  int maxVal = arr[0];
  int minVal = arr[0];
  for (const int &item : arr) {
    maxVal = item > minVal ? item : maxVal;
    minVal = item < maxVal ? item : minVal;
  }
  return {maxVal, minVal};
}

int main() {
  int sz;  // size
  vector<pair<int, int>> ans{};
  while (/** scanf("%d", &sz) == 1 */ cin >> sz) {
    vector<int> arr(sz);
    for (int i = 0; i < sz; i++) {
      cin >> arr[i];
    }
    ans.push_back(getTwo(arr));
    // ans.push_back({ranges::max(arr), ranges::min(arr)});
  }
  for (auto const &two : ans) {
    cout << two.first << ' ' << two.second << endl;
  }
}
