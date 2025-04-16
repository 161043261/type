const obj = { name: "Vue" };

// 纯函数
function pureFn() {
  // const newObj = window.structuredClone(obj); // 深拷贝
  //! 会丢失属性值为 undefined 的属性
  const newObj = JSON.parse(JSON.stringify(obj)); // 深拷贝
  newObj.name = "React";
  return newObj;
}

const newObj = pureFn(obj);
console.log(obj, newObj);

// 副作用函数, 非纯函数
function sideEffectFn /* impureFn */() {
  obj.name = "React";
  return obj;
}

const obj2 = sideEffectFn(obj);
console.log(obj, obj2);

const source = {
  a: 1,
  b: undefined,
  c: { d: undefined },
  e: null,
  f: { g: null },
};
// {"a":1,"c":{},"e":null,"f":{"g":null}}
console.log(JSON.stringify(source));
const target = JSON.parse(JSON.stringify(source));
// { a: 1, c: {}, e: null, f: { g: null } }
console.log(target);
