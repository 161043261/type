import { test } from "vitest";

test("Test1", () => {
  function Timer() {
    this.cnt1 = 0;
    this.cnt2 = 0;
    let timerId1 = setInterval(() => {
      // console.log(this); // Timer { cnt1: ?, cnt2: 0 }
      this /* Timer */.cnt1++;
    }, 1000);

    let timerId2 = setInterval(function () {
      // console.log(this); // Timeout { ... }
      this /* Timeout */.cnt2++;
    }, 1000);

    return { timer: this, timerId1, timerId2 };
  }

  const { timer, timerId1, timerId2 } = new Timer();

  setTimeout(() => {
    console.log("cnt1:", timer.cnt1); // cnt1: 3
    clearInterval(timerId1);
  }, 3100); // 3

  setTimeout(() => {
    console.log("cnt2:", timer.cnt2); // cnt2: 0
    clearInterval(timerId2);
  }, 3100); // 0
});
