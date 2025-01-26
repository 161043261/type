setTimeout(() => {
  console.log("3s timeout");
}, 3000);

let count = 0;
const intervalId = setInterval(() => {
  console.log("1s interval");
  count++;
  if (count == 5) {
    clearInterval(intervalId); // 停止定时器
  }
}, 1000);
