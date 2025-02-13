#include <cmath>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

bool isSym(int item) {
  string itemStr = to_string(item);
  if (itemStr.size() > 5) {
    return false;
  }
  for (int i = 0, j = itemStr.size() - 1; i < j; i++, j--) {
    if (itemStr[i] != itemStr[j]) {
      return false;
    }
  }
  return true;
}

bool isPrime(int item) {
  if (item == 1) {
    return false;
  }
  for (int i = 2; i <= sqrt(item); i++) {
    if (item % i == 0) {
      return false;
    }
  }
  return true;
}

int main() {
  int sz;
  cin >> sz;
  vector<int> nums(sz);
  for (int i = 0; i < sz; i++) {
    cin >> nums[i];
    cout << (isSym(nums[i]) && isPrime(nums[i]) ? "Yes\n" : "No\n");
  }
}
