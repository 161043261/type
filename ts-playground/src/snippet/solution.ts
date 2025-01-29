function intersect(nums1: number[], nums2: number[]): number[] {
  const toMap = (nums: number[]) => {
    const numToCnt = new Map<number, number>();
    nums.forEach((num) => numToCnt.set(num, (numToCnt.get(num) ?? 0) + 1));
    return numToCnt;
  };
  const [numToCnt1, numToCnt2] = [toMap(nums1), toMap(nums2)];
  const ans: number[] = [];
  for (const [num, cnt] of numToCnt1) {
    if (numToCnt2.has(num)) {
      const len = Math.min(cnt, numToCnt2.get(num)!);
      ans.push(...new Array(len).fill(num));
    }
  }
  return ans;
}

console.log(intersect([1, 2, 2, 1], [2, 2]));
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4]));
