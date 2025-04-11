function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 !== 0) {
    return false;
  }
  const target = sum / 2;
  const memo = new Map<string, boolean>();
  const dfs = (i: number, j: number): boolean => {
    const key = `${i}-${j}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }
    if (i < 0) {
      return j === 0;
    }
    const ret = (j >= nums[i] && dfs(i - 1, j - nums[i])) || dfs(i - 1, j);
    memo.set(key, ret);
    return ret;
  };
  return dfs(nums.length - 1, target);
}

function canPartition2(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 !== 0) {
    return false;
  }
  const target = sum / 2;
  const dp = Array.from({ length: nums.length + 1 }, () =>
    new Array(target + 1).fill(false),
  );
  dp[0][0] = true;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j <= target; j++) {
      dp[i + 1][j] = (j >= nums[i] && dp[i][j - nums[i]]) || dp[i][j];
    }
  }
  return dp[nums.length][target];
}
