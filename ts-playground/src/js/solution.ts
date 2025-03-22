function maximumOr(nums: number[], k: number): number {
  const suf: number[] = new Array(nums.length).fill(0);
  for (let i = nums.length - 1; i >= 0; i--) {
    suf[i] = suf[i + 1] | nums[i + 1];
  }
  let ans = 0n /** BigInt */,
    pre = 0n; /** BigInt */
  for (let i = 0; i < nums.length; i++) {
    const cur = pre | (BigInt(nums[i]) << BigInt(k)) | BigInt(suf[i]);
    ans = cur > ans ? cur : ans;
    pre |= BigInt(nums[i]);
  }
  return Number(ans);
}
