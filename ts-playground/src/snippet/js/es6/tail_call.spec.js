import { test } from "vitest";

test("Test_Tail_Call", () => {
  function tco(f) {
    let value;
    let active = false;
    const accumulated = [];
    return function accumulator(x, y) {
      accumulated.push([x, y]);
      if (!active) {
        active = true;
        while (accumulated.length > 0) {
          value = f.apply({}, accumulated.shift());
        }
        active = false;
        return value;
      }
    };
  }
  const foo2co = tco(function foo(x, y) {
    if (y > 0) {
      return foo2co(/* foo */ x + 1, y - 1);
    } else {
      return x;
    }
  });
  console.log(foo2co(1, 100_0000));
});
