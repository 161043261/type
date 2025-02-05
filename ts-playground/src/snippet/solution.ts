function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const item: number[] = []
  const used = new Array<boolean>(nums.length).fill(false)
  const ans: number[][] = [];
  const backtrack = () => {
    if (item.length === nums.length) {
      ans.push([...item])
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) continue;
      item.push(nums[i]);
      used[i] = true;
      backtrack()
      item.pop();
      used[i] = false;
    }
  }
  backtrack()
  return ans
};