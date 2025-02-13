#include <iostream>
#include <vector>

using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> apples(n);
  for (int i = 0; i < n; i++) {
    cin >> apples[i];
  }
  int h;
  cin >> h;
  h += 30;
  int cnt = 0;
  for (int i = 0; i < n; i++) {
    if (h >= apples[i]) {
      cnt++;
    }
  }
  cout << cnt << '\n' << (cnt == n ? "Yes" : "No");
}
