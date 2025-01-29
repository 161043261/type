function containsNearbyDuplicate(nums: number[], k: number): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j <= Math.min(i + k, nums.length - 1); j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}
