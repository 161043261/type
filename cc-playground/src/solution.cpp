#include <algorithm>
#include <vector>

using namespace std;

class Solution {
 public:
  vector<vector<int>> subsetsWithDup(vector<int> &nums) {
    ranges::sort(nums);
    this->nums = nums;
    this->n = nums.size();
    this->dfs(0);
    return this->ans;
  }

 private:
  vector<int> nums;
  int n;
  vector<int> path = {};
  vector<vector<int>> ans = {};

  void dfs(int i) {
    if (i == this->n) {
      this->ans.push_back(this->path);
      return;
    }

    int item = this->nums[i];
    this->path.push_back(item);
    dfs(i + 1);
    this->path.pop_back();

    i++;
    while (i < this->n && this->nums[i] == item) {
      i++;
    }
    this->dfs(i);
  }
};

int main() {
  auto testcase = Solution{};
  return 0;
}
