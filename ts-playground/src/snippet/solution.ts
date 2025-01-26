/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
function countPartitions(nums: number[]): number {
  let _sum = nums.reduce((acc, num) => acc - num, 0);
  let ans = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    _sum += 2 * nums[i];
    if (_sum % 2 === 0) ans++;
  }
  return ans;
}

function countMentions(numberOfUsers: number, events: string[][]): number[] {
  events.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] === "OFFLINE" ? -1 : 1;
    }
    return Number.parseInt(a[1]) - Number.parseInt(b[1]);
  });
  console.log(events);
  const state = new Array(numberOfUsers).fill(0);
  const ans = new Array(numberOfUsers).fill(0);
  let all = 0;
  for (const event of events) {
    const [eventType, timestamp, target] = event;
    const cur = Number.parseInt(timestamp);
    switch (eventType) {
      case "MESSAGE":
        switch (target) {
          case "ALL":
            all++;
            break;

          case "HERE":
            state.forEach((val, idx) => {
              if (val === 0) {
                ans[idx]++;
                return;
              }
              // val > 0
              if (cur >= val) {
                state[idx] = 0;
                ans[idx]++;
              }
              // val > 0 && cur < val
            });
            break;

          default:
            target
              .split(" ")
              .map((item) => Number.parseInt(item.slice(2)))
              .forEach((idx) => ans[idx]++);
            break;
        }
        break;

      case "OFFLINE":
        const id = Number.parseInt(target);
        state[id] = cur + 60;
        break;
    }
  }
  return ans.map((item) => item + all);
}

function maxFrequency(nums: number[], k: number): number {
  const cnts = new Array<number>(nums.length + 1).fill(0);
  let acc = 0;
  for (let i = 0; i < nums.length; i++) {
    acc += nums[i] === k ? 1 : 0;
    cnts[i + 1] = acc;
  }
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j <= nums.length; j++) {
      const subNums = nums.slice(i, j);
      const val2cnt = new Map<number, number>();
      for (const val of subNums) {
        val2cnt.set(k - val, (val2cnt.get(k - val) ?? 0) + 1);
      }
      ans = Math.max(
        ans,
        ...Array.from(val2cnt.values()).map(
          (val) => val + cnts[i] + cnts[nums.length] - cnts[j],
        ),
      );
    }
  }
  return ans;
}

console.log(maxFrequency([1, 2, 3, 4, 5, 6], 1));
console.log(maxFrequency([10, 2, 3, 4, 5, 5, 4, 3, 2, 2], 10));
