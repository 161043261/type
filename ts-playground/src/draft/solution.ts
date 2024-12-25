/* eslint-disable @typescript-eslint/no-unused-vars */
function eatenApples(apples: number[], days: number[]): number {
  let numAndExpireDate: [number, number][] = [];
  let ans = 0;
  for (
    let date = 0;
    !(numAndExpireDate.length === 0 && date >= apples.length);
    date++
  ) {
    if (date < apples.length) {
      numAndExpireDate.push([apples[date], date + days[date]]);
    }
    numAndExpireDate = numAndExpireDate
      .filter(([num, expireDate]) => {
        return expireDate > date && num > 0;
      })
      .sort((a, b) => a[1] - b[1]);
    if (numAndExpireDate.length > 0) {
      ans++;
      numAndExpireDate[0][0]--;
    }
  }
  return ans;
}
