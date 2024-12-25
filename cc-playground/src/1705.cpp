#include <queue>
#include <vector>

using namespace std;

class Solution {
 public:
  int eatenApples(vector<int> &apples, vector<int> &days) {
    int ans = 0;

    struct _compare {
      bool operator()(const pair<int, int> &a, const pair<int, int> &b) const {
        return a.first > b.first;
      }
    };

    // template<_Tp, _Container = vector<_Tp>, _Compare = less<value_type>>
    priority_queue<pair<int, int>, vector<pair<int, int>>, _compare> pq;
    for (int i = 0; i < apples.size() || !pq.empty(); i++) {
      while (!pq.empty() && pq.top().first == i) {
        pq.pop();  // 头删
      }
      if (i < apples.size() && apples[i] > 0) {
        pq.emplace(i + days[i], apples[i]);
      }
      if (!pq.empty()) {
        ans++;
        auto [rotten_day, num] = pq.top();
        pq.pop();
        if (num > 1) {
          pq.emplace(rotten_day, num - 1);
        }
      }
    }
    return ans;
  }
};