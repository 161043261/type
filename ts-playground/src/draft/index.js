function solution(n) {
  let ans = 0;
  const calc = function (cnt, pre2 = false) {
    if (cnt === n) {
      ans++;
      return;
    }
    if (cnt + 1 <= n) {
      calc(cnt + 1, false);
    }
    if (cnt + 2 <= n && !pre2) {
      calc(cnt + 2, true);
    }
  };
  calc(0, false);
  return ans;
}

function main() {
  // Add your test cases here
  console.log(solution(2) === 2);
}

main();
