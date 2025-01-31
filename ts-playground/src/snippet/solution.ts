function reverseStr(s: string, k: number): string {
  let ans = "";
  for (let i = 0; i < s.length; i += 2 * k) {
    const n = Math.min(s.length - i, k);
    const subStr = s.substring(i, i + n);
    ans += subStr.split("").reverse().join("");
    ans += s.substring(i + n, Math.min(s.length, i + 2 * k));
  }
  return ans;
}
console.log(reverseStr("abcdefg", 2));
console.log(reverseStr("abcd", 2));
