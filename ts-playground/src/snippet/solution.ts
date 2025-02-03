/* eslint-disable @typescript-eslint/no-unused-vars */
function sortArrayByParityII(nums: number[]): number[] {
  let evenIdx = 0,
    oddIdx = 1;
  const ans = new Array<number>(nums.length);
  nums.forEach((item) => {
    if (item % 2) {
      ans[oddIdx] = item;
      oddIdx += 2;
    } else {
      ans[evenIdx] = item;
      evenIdx += 2;
    }
  });
  return ans;
}
