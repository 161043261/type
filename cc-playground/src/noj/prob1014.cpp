#include <iostream>
using namespace std;

int main() {
  int k;
  cin >> k;
  int n = 0;
  for (double s = 0.; s <= k;) {
    n++;
    s += 1. / n;
  }
  cout << n;
}
