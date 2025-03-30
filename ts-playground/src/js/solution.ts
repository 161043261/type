function generateParenthesis(n: number): string[] {
  let leftCnt = 0,
    rightCnt = 0;
  let path = "";
  const ans: string[] = [];
  const backtrack = () => {
    if (rightCnt > leftCnt) {
      return;
    }
    if (path.length === 2 * n) {
      leftCnt === rightCnt && ans.push(path);
      return;
    }

    leftCnt++;
    path += "(";
    backtrack();
    leftCnt--;
    path = path.slice(0, path.length - 1);

    rightCnt++;
    path += ")";
    backtrack();
    rightCnt--;
    path = path.slice(0, path.length - 1);

  };

  backtrack()
  return ans;
}

const ans = generateParenthesis(3);

console.log(ans);
