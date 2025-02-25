function evenOddBit(n: number): number[] {
  const n2 = n.toString(2);

  let odd = 0,
    even = 0;
  n2.split("").forEach((v, idx) => {
    even += v === "1" && (n2.length - 1 - idx) % 2 === 0 ? 1 : 0;
    odd += v === "1" && (n2.length - 1 - idx) % 2 === 1 ? 1 : 0;
  });

  return [even, odd];
}
