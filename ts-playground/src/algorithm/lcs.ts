// LCS 算法
const A = "xzyzzyx";
const B = "zxyyzxz";

// interface ArrayLike<T> {
//   readonly length: number;
//   readonly [n: number]: T;
// }

// console.log({
//   length: 2
// }["length"])

const dp = Array.from(
  {
    length: A.length + 1,
  } as ArrayLike<number[]>,
  () => /* new */ Array(B.length + 1).fill(0),
);

// console.log(dp)
for (let i = 1; i < dp.length; i++) {
  for (let j = 1; j < dp[0].length; j++) {
    if (A.charAt(i - 1) === B.charAt(j - 1)) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp);

let cur = 0;
let ans = "";
const range = Math.min(A.length, B.length);
for (let i = 1, j = 1; i <= range; i++) {
  const j_ = j;
  for (; j <= i; j++) {
    if (dp[i][j] == cur + 1) {
      // 找到
      console.log(i - 1, j - 1);
      cur++;
      ans += A.charAt(i - 1);
      break;
    }
  }
  j = j_; // 未找到, 复位
}

console.log(ans);
