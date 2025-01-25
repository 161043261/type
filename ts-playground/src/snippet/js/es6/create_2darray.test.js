//! pnpm test create_2darray
import { test } from "vitest";

// First arr2d: [ [ 1, 1 ], [ 1, 1 ] ]
// Second arr2d: [ [ 1, 3 ], [ 1, 3 ] ]
test("Test1", () => {
  let arr2d = new Array(2).fill(new Array(2).fill(1));
  console.log("First arr2d:", arr2d);
  arr2d[0][1] = 3;
  console.log("Second arr2d:", arr2d);
});

test("Test2", () => {
  let arr2d = new Array(2);
  for (let arr /* 值拷贝 */ of arr2d) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    arr = new Array(2).fill(1);
  }
  // First arr2d: [ <2 empty items> ]
  console.log("First arr2d:", arr2d);

  let entered = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (let idx in arr2d) {
    entered = true; //! 不会进入该 for 循环
  }
  // entered: false
  console.log("entered:", entered);

  // arr2d.length: 2
  console.log("arr2d.length:", arr2d.length);
  for (let idx = 0; idx < arr2d.length; idx++) {
    arr2d[idx] = /* new */ Array(2).fill(1);
  }

  // Second arr2d: [ [ 1, 1 ], [ 1, 1 ] ]
  console.log("Second arr2d:", arr2d);
  arr2d[0][1] = 3;
  // Third arr2d: [ [ 1, 3 ], [ 1, 1 ] ]
  console.log("Third arr2d:", arr2d);
});

// First arr2d: [ [ 1, 1 ], [ 1, 1 ] ]
// Second arr2d: [ [ 1, 3 ], [ 1, 1 ] ]
test("Test3", () => {
  // > Array.from([1, 2, 3], item => item * item)
  // [1, 4, 9]
  const arr2d = Array.from(
    {
      length: 2,
    },
    () => /* new */ Array(2).fill(1),
  );
  console.log("First arr2d:", arr2d);
  arr2d[0][1] = 3;
  console.log("Second arr2d:", arr2d);
});

test("Test4", () => {
  const arr2d = /* new */ Array(2)
    .fill(undefined)
    .map(() => new Array(2).fill(1));
  console.log("First arr2d:", arr2d);
  arr2d[0][1] = 3;
  console.log("Second arr2d:", arr2d);

  // 等价于
  const arr1d = Array(2).fill(undefined);
  // The map() method of Array instances creates obj1 **new** array...
  const newArr2d = arr1d.map(() => {
    return Array(2).fill(1);
  });
  console.log("First newArr2d:", newArr2d);
  newArr2d[0][1] = 3;
  console.log("Second newArr2d:", newArr2d);
});
