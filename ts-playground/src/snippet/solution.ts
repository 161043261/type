/* eslint-disable @typescript-eslint/no-unused-vars */
function minimumSize(nums: number[], maxOperations: number): number {
  let l = 1, r = Math.max(...nums)
  const isValid = (val: number): boolean => {
    let ret = 0;
    for (const num of nums) {
      ret += Math.ceil(num / val) - 1
    }
    return ret <= maxOperations;
  }
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2)
    if (isValid(mid)) {
      r = mid -1
    } else {
      l = mid + 1;
    }
  }
  return l;
}
