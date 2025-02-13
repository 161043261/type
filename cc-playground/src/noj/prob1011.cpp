#include <iostream>

using namespace std;

int main() {
  int k;
  cin >> k;
  long long total = 0;
  int count = 0;
  for (int money = 1;; money++) {
    for (int days = 1; days <= money; days++) {
      total += money;
      if (++count == k) {
        cout << total;
        return 0;
      }
    }
  }
}
