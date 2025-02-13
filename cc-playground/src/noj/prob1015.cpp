#include "iostream"

using namespace std;

int main() {
  int lens[4];
  cin >> lens[0] >> lens[1] >> lens[2] >> lens[3];
  double avg;

  if (lens[0] == lens[1] && lens[1] == lens[2] && lens[2] == lens[3]) {
    cout << "B";
    return 0;
  }

  avg = (lens[0] + lens[1] + lens[2] + lens[3]) / 4.;
  int shortOrLong[4]{0, 0, 0, 0};
  int shortCnt = 0, longCnt = 0;
  for (int i = 0; i < 4; i++) {
    if (lens[i] < avg) {
      shortOrLong[i] = -1;  // -1 short
      shortCnt++;
    } else if (lens[i] > avg) {
      shortOrLong[i] = 1;  // 1 long
      longCnt++;
    }  // lens[i] == avg // 0 equal
  }

  if (longCnt == 3) {
    for (int i = 0; i < 4; i++) {
      if (shortOrLong[i] == -1) {
        cout << static_cast<char>('A' + (i - 0));
        return 0;
      }
    }
  }

  if (shortCnt == 3) {
    for (int i = 0; i < 4; i++) {
      if (shortOrLong[i] == 1) {
        cout << static_cast<char>('A' + (i - 0));
        return 0;
      }
    }
  }

  cout << 'C';
}
