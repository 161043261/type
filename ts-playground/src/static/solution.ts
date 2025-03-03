function minCut(s: string): number {
  const cache = new Map<string, boolean>();
  const cache2 = new Map<number, number>();

  const isPalindrome = (l: number, r: number): boolean => {
    if (l >= r) {
      return true;
    }
    const key = `${l},${r}`;
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    // while (l < r) {
    //   if (s[l++] !== s[r--]) {
    //     cache.set(key, false);
    //     return false;
    //   }
    // }
    // cache.set(key, true);
    // return true;
    const ret = s[l] === s[r] && isPalindrome(l + 1, r - 1);
    cache.set(key, ret);
    return ret;
  };

  const dfs = (r: number): number => {
    if (isPalindrome(0, r)) {
      return 0;
    }
    if (cache2.has(r)) {
      return cache2.get(r)!;
    }
    let ans = Infinity;
    for (let l = 1; l <= r; l++) {
      if (isPalindrome(l, r)) {
        ans = Math.min(ans, dfs(l - 1) + 1);
      }
    }
    cache2.set(r, ans);
    return ans;
  };

  return dfs(s.length - 1);
}
