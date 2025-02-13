#include <cmath>
#include <iostream>

using namespace std;

using Long = long long;

bool isPrime(Long val) {
  for (Long i = 2; i <= sqrt(val); i++) {
    if (val % i == 0) {
      return false;
    }
  }
  return true;
}

int main() {
  Long n;
  cin >> n;
  Long prime, compo;
  if (isPrime(n + 1)) {  // n + 1 是质数
    prime = n + 1;
    compo = n + 2;
    // 找 > n 的最小合数
    while (isPrime(compo)) {
      compo++;
    }
  } else {  // n + 1 是合数
    compo = n + 1;
    prime = n + 2;
    // 找 > n 的最小质数
    while (!isPrime(prime)) {
      prime++;
    }
  }
  cout << prime + compo;
}
