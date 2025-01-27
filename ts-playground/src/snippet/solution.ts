function getRow(rowIndex: number): number[] {
  let ans = [1];
  for (let i = 0; i <= rowIndex; i++) {
    ans = ans.map((val, idx) => {
      if (idx === 0) {
        return 0;
      }
      return val + ans[idx - 1];
    });
    ans.push(1);
  }
  return ans;
}
