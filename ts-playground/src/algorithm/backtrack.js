"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
// 全排列
function permute(nums) {
  const ans = [];
  const path = [];
  const used = new Array(nums.length).fill(false);
  const backtrack = function () {
    if (path.length === nums.length) {
      ans.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }
      path.push(nums[i]);
      used[i] = true;
      backtrack();
      path.pop();
      used[i] = false;
    }
  };
  backtrack();
  return ans;
}
// n 皇后: 将 n 个皇后放置在 n×n 的棋盘上, 皇后间不能相互攻击
function solveNQueens(n) {
  const ans = [];
  const board = Array.from({ length: n }, () => new Array(n).fill("."));
  // O(1) 时间复杂度判断当前位置是否会被攻击
  const usedCol = new Array(n).fill(false);
  const rowAddCol = [];
  const rowSubCol = [];
  const backtrack = function (row) {
    if (row === n) {
      ans.push(board.map((item) => item.join("")));
    }
    for (let col = 0; col < n; col++) {
      if (
        usedCol[col] ||
        rowAddCol.includes(row + col) ||
        rowSubCol.includes(row - col)
      ) {
        continue;
      }
      board[row][col] = "Q";
      usedCol[col] = true;
      rowAddCol.push(row + col);
      rowSubCol.push(row - col);
      backtrack(row + 1);
      board[row][col] = ".";
      usedCol[col] = false;
      rowAddCol.pop();
      rowSubCol.pop();
    }
  };
  backtrack(0);
  return ans;
}
