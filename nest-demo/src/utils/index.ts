export function getTime() {
  const pad0 = (num: number) => num.toString().padStart(2, '0');
  const time = new Date();
  return `${pad0(time.getHours())}:${pad0(time.getMinutes())}:${pad0(time.getSeconds())}`;
}

export function randNum(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from)) + from;
}

export function randArr(from: number, to: number, len: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(randNum(from, to));
  }
  return arr;
}
