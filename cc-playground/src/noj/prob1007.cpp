#include <iostream>
#include <vector>
using namespace std;

// 1 1 2 3
int main() {
  int n;
  cin >> n;
  vector<int> fib(n + 1);
  fib[1] = 1;
  fib[2] = 1;
  for (int i = 3; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  cout << fib[n];
}
