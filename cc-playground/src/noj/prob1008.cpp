#include <algorithm>
#include <iostream>

using namespace std;

int main() {
  string str;
  cin >> str;
  transform(str.begin(), str.end(), str.begin(),
            [](auto c) { return tolower(c); });  // -> auto
  for (int i = 0, j = str.size() - 1; i < j; i++, j--) {
    if (str[i] != str[j]) {
      cout << "No";
      return 0;
    }
  }
  cout << "Yes";
}
