"use strict";
function minimumCost(m, n, horizontalCut, verticalCut) {
  horizontalCut.sort((a, b) => a - b);
  verticalCut.sort((a, b) => a - b);
  let ans = 0,
    i = 0,
    j = 0;
  while (i < m - 1 || j < n - 1) {
    if (j === n - 1 || (i < m - 1 && horizontalCut[i] < verticalCut[j])) {
      ans += horizontalCut[i++] * (n - j); // 上下连边
    } else {
      ans += verticalCut[j++] * (m - i); // 左右连边
    }
  }
  return ans;
}
console.log(minimumCost(6, 3, [2, 3, 2, 3, 1], [1, 2]));
