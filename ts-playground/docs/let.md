# let

- 没有变量提升
- 有暂时性死区

代码块中使用 let 声明变量前, 该变量都是不可用的

```js
var x = 1;
if (true) {
  // <<< TDZ, Temporal Dead Zone 暂时性死区
  x = 2; // ReferenceError
  // >>> TDZ
  let x;
}
```

暂时性死区也意味着 typeof 不再是一个 100% 安全的操作

```js
// <<< TDZ
typeof x; // ReferenceError
let x;
// >>> TDZ

function foo(/* TDZ >>> */ x = y, y = 2 /* << TDZ */) {
  return [x, y];
}
```
