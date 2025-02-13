// A B|C|B|B
// B C|A|A|C
// C A|B|B|B
// A B|B|B|B|C
// B A|C|A|C|A
// A C|A|B|B|C
#include <cmath>
#include <iostream>

using namespace std;

int main() {
  const long long MOD = pow(10, 9) + 7;
  long long n;
  cin >> n;
  long long abc = 6;  // 当前的最后一列是 abc 类型
  long long aba = 6;  // 当前的最后一列是 aba 类型
  for (int i = 1; i < n; i++) {
    abc = (abc * 2 + aba * 2) % MOD;
    aba = (abc * 2 + aba * 3) % MOD;
  }
  cout << (abc + aba) % MOD;
}
