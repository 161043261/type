#include <iostream>

using namespace std;

int main() {
  int n, k;
  cin >> n >> k;
  int ans = n;
  while (n >= k) {
    int delta = n / k;
    ans += delta;
    n = n % k + delta;
  }
  cout << ans;
}
