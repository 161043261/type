/**
 * vitest test generator_function.test.js
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*
 */

import { test } from "vitest";

test("Test_GeneratorFunction", () => {
  const f = new Function("console.log('wtf')");
  f(); // wtf

  const GeneratorFunction = function* () {}.constructor;

  console.log(`GeneratorFunction instanceof Function:
  ${GeneratorFunction instanceof Function}`);

  const foo = new GeneratorFunction(`
    yield 'a';
    yield 'b';
    yield 'c';
    `);
  let str = "";
  for (const val of foo()) {
    str += val;
  }
  console.log(str); // obj1,obj2,obj3,
});

test("Test_Generator", () => {
  function* infinite() {
    let idx = 0;
    while (true) {
      yield idx++;
    }
  }

  // or: const infinite = function* () { ... }

  const generator /* : Generator */ = infinite();
  console.log(generator.next().value); // 0
  console.log(generator.next().value); // 1
  console.log(generator.next().value); // 2
});

// 生成器函数中 return val 或抛出错误 (未捕获) 会结束迭代
// 生成器对象的 next 方法的返回 { value: val, done: true }

test("Test1", () => {
  // subGenFunc instanceof GeneratorFunction 生成器函数
  function* subGenFunc(i) {
    yield i + 1;
    yield i + 2;
  }

  // genFunc instanceof GeneratorFunction 生成器函数
  function* genFunc(i) {
    yield i;
    //! yield* 委托给另一个 generator 或可遍历对象
    yield* subGenFunc(i) /* : generator */;
    yield i + 10;
    return "wtf";
  }

  const gen = genFunc(0);
  console.log(gen.next().value); // 0
  console.log(gen.next().value); // 1
  console.log(gen.next().value); // 2
  console.log(gen.next().value); // 10 (Tips: NOT 12)
  console.log(gen.next().value, gen.next().done); // wtf, true
  console.log(gen.next().value, gen.next().done); // undefined, true
  console.log(gen.next().value, gen.next().done); // undefined, true
});

test("Test2", () => {
  const GeneratorFunction = function* () {}.constructor;

  function* genFunc(i) {
    yield i;
    yield i + 10;
  }

  //! genFunc: 生成器函数
  //! 不能使用箭头函数定义生成器函数
  console.log(
    "generator instanceof GeneratorFunction:",
    genFunc instanceof GeneratorFunction,
  ); // true

  //! gen: 可迭代的生成器对象
  //! 调用生成器函数 genFunc 时, 返回可迭代的生成器对象 gen
  const gen = /* 不能使用 new 关键字! */ genFunc(10);
  // 调用生成器对象 gen 的 next 方法时
  // 生成器函数 genFunc 的函数体会被执行, 直到遇到第一个 yield 表达式
  // 生成器对象 gen 的 next 方法返回一个对象 { value: any, done: boolean }
  const ret = gen.next();
  // value 属性值即遇到的第一个 yield 表达式的值
  console.log(ret, ret.value); // { value: 10, done: false } 10
  console.log(gen.next().value); // 20
  // 迭代结束后, 生成器对象 gen 的 next 方法返回 { value: undefined, done: true }
  console.log(gen.next()); // { value: undefined, done: true }
});

test("Test3", () => {
  function* logGenFunc() {
    console.log(0);
    console.log(1, yield);
    console.log(2, yield);
    console.log(3, yield);
  }

  const gen = logGenFunc();
  gen.next();
  gen.next([6, 6, 6]);
  gen.next("wtf");
  gen.next(["w", "t", "f"]);
  gen.next("Won't be logged!");
});

//! 生成器作为计算属性
test("Test4", () => {
  class Nums {
    *[Symbol.iterator]() {
      yield 1;
      yield 2;
    }
  }

  const chars = {
    *[Symbol.iterator]() {
      yield "a";
      yield "b";
    },
  };
  console.log(Array.from(new Nums()));
  console.log(Array.from(chars));
});

test("Test5", () => {
  function* powers(n) {
    for (let cur = n; ; cur *= n) {
      yield cur;
    }
  }

  for (const power of powers(2) /* iterable */) {
    if (power > 32) {
      break;
    }
    console.log(power);
  }
});

/**
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
 */
test("Test_SymbolIterator", () => {
  const iterableVar = {};
  iterableVar[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  console.log(iterableVar);
  console.log([...iterableVar]);
});
