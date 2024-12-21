function getKth(lo: number, hi: number, k: number): number {
  const w2numArr = new Map<number, number[]>();
  for (let num = lo; num <= hi; num++) {
    let w = 0;
    let val = num;
    while (val !== 1) {
      w++;
      if (val % 2 === 0) {
        val /= 2
      } else {
        val = 3 * val + 1
      }
    }
    if (w2numArr.has(w)) {
      w2numArr.get(w)!.push(num)
    } else {
      w2numArr.set(w, [num])
    }
  }
  let cnt = 0;
  const sorted = [...w2numArr].sort((a, b) => a[0] - b[0])
  // console.log(sorted)
  for (const [, numArr] of sorted) {
    if (cnt + numArr.length >= k) {
      return (numArr.sort((a, b) => a - b))[k - cnt - 1];
    } else {
      cnt += numArr.length
    }
  }
  return -1;
}

console.log(getKth(1, 1000, 777))