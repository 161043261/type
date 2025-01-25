import { test } from "vitest";

test("Test1", () => {
  // 非尾递归
  function fib1(n) {
    if (n <= 1) {
      return 1;
    }
    // stack
    // | fib1(48) |
    // | fib1(49) |
    // | fib1(50) |
    return fib1(n - 1) + fib1(n - 2);
  }

  const t1 = Date.now();
  console.log(fib1(40));
  console.log(Date.now() - t1); // about 1s

  // 尾递归优化
  function fib2(n, curr = 1, next = 1) {
    if (n <= 1) {
      return next;
    }
    // stack
    // | fib2(49, 1, 2) |
    return fib2(n - 1, next, curr + next);
  }
  const t2 = Date.now();
  console.log(fib2(40));
  console.log(Date.now() - t2); // about 0
});

test("Test2", () => {
  function fact2(n, ans) {
    if (n === 1) {
      return ans;
    }
    return fact2(n - 1, n * ans);
  }
  console.log(fact2(5, 1)); // 120

  function currying(fact, ans) {
    return function (n) {
      return fact.call(this, n, ans);
    };
  }
  const calc = currying(fact2, 1);
  console.log(calc(5)); // 120
});

test("Test3", () => {
  function foo(x, y) {
    if (y > 0) {
      return foo(x, y - 1);
    } else {
      return x;
    }
  }
  try {
    foo(1, 100_000);
  } catch (e) {
    console.log(e); // RangeError: Maximum call stack size exceeded
  }
});

test("Test4", () => {
  function bar(x, y) {
    if (y > 0) {
      // return bar(x, y - 1);
      // 返回新函数
      return bar.bind(null, x, y - 1);
    } else {
      return x;
    }
  }

  // trampoline 蹦床函数将递归改写为循环
  function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }
    return f;
  }

  console.log(trampoline(bar(1, 100_000))); // 1
});

test("Test_TailCallOptimization", () => {
  // 尾递归优化的实现
  function tco(f) {
    let value;
    let active = false;
    let accumulated = [];
    console.log(arguments[0] === f, arguments[0]); // true [Function: foo]

    return function accumulator() {
      console.log(arguments[0] === f, arguments); // false [Arguments] { '0': 1, '1': 100 }
      accumulated.push(arguments);
      if (!active) {
        active = true;
        while (accumulated.length) {
          value = f.apply(this, accumulated.shift());
        }
        active = false;
        return value;
      }
    };
  }

  const foo2co = tco(function foo(x, y) {
    if (y > 0) {
      return foo2co(x + 1, y - 1 /* arguments */);
    } else {
      return x;
    }
  }); // tco
  console.log(foo2co(1, 100));
});
