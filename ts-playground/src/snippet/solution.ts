function search(nums: number[], target: number): boolean {
  if (nums.length === 0) {
    return false;
  }

  // if (target < nums[0] && target > nums.at(-1)!) {
  //   return false;
  // }

  if (target >= nums[0]) {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === target) {
        return true;
      }
      if (nums[i] > target || (i > 0 && nums[i] < nums[i - 1])) {
        return false;
      }
    }
  }

  if (target <= nums.at(-1)!) {
    for (let i = -1; i >= -nums.length; i--) {
      if (nums.at(i)! === target) {
        return true;
      }
      if (nums.at(i)! < target || (i < -1 && nums.at(i)! > nums.at(i + 1)!)) {
        return false
      }
    }
  }

  return false;
}

console.log(search([2, 5, 6, 0, 0, 1, 2], 0))
console.log(search([2, 5, 6, 0, 0, 1, 2], 3))
