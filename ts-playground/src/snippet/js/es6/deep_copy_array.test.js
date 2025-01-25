import { test } from "vitest";

test("Test1", () => {
  const originArr = [1, 2, 3, 4, 5];
  const copiedArr = [...originArr];
  copiedArr[1] = 0;
  console.log(originArr); // 深拷贝
});

test("Test2", () => {
  const originArr = [1, 2, 3, 4, 5];
  const copiedArr = JSON.parse(JSON.stringify(originArr));
  copiedArr[1] = 0;
  console.log(originArr); // 深拷贝
});

// 递归实现深拷贝
test("Test3", () => {
  /**
   *
   * @param {object} obj
   * @return {object}
   */
  const deepCopyObj = (obj) => {
    const newObj = {};
    for (let key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key)
        // target.hasOwnProperty(key)
      ) {
        // 不是从原型链上继承的属性
        if (Array.isArray(obj[key] /* target.key */)) {
          newObj[key] = deepCopyArr(obj[key]);
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          newObj[key] = deepCopyObj(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  };

  /**
   *
   * @param {Array} arr 等价于 any[]
   * @return {Array}
   */
  const deepCopyArr = (arr) => {
    const newArr = [];
    for (let item of arr) {
      if (Array.isArray(item)) {
        newArr.push(deepCopyArr(item)); // 递归
      } else if (typeof item === "object" && item !== null) {
        newArr.push(deepCopyObj(item));
      } else {
        newArr.push(item);
      }
    }
    return newArr;
  };

  const originArr = [1, [2, 3], 4, { k: 5 }];
  const copiedArr = deepCopyArr(originArr);
  originArr[1][0] = 3;
  originArr[3]["k"] = "v";
  console.log(originArr); // [ 1, [ 3, 3 ], 4, { k: 'v' } ]
  console.log(copiedArr); // [ 1, [ 2, 3 ], 4, { k: 5 } ]
});
