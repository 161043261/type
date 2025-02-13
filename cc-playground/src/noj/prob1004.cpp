#include <iostream>
#include <map>
#include <vector>

using namespace std;

int main() {
  auto num2ch = std::map<int, char>{{10, 'A'}, {11, 'B'}, {12, 'C'},
                                    {13, 'D'}, {14, 'E'}, {15, 'F'}};
  int n;
  cin >> n;
  int val, base /** 进制 */;
  vector<string> ans{};
  for (int i = 0; i < n; i++) {
    cin >> val >> base;
    string item;
    string prefix;
    if (val < 0) {
      val = -val;
      prefix = '-';
    }
    while (val > 0) {
      const int rest = val % base;
      val /= base;
      if (rest >= 10) {
        item = num2ch[rest] + item;
      } else {
        item = to_string(rest) + item;
      }
    }
    item = prefix + item;
    ans.push_back(item == "" ? "0" : item);
  }
  for (const string &item : ans) {
    cout << item << endl;
  }
}
