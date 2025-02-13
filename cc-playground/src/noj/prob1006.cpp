#include <iostream>

using namespace std;

int main() {
  int a, b;
  cin >> a >> b;
  if (b > a) {
    int tmp = a;
    a = b;
    b = tmp;
  }
  //! a >= b
  int x = b;  // 最大公约数
  int y = a;  // 最小公倍数
  while (!(b % x == 0 && a % x == 0)) {
    x--;
  }
  while (!(y % a == 0 && y % b == 0)) {
    y++;
  }
  cout << x << ' ' << y;
}
