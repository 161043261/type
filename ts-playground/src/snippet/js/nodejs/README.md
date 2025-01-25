### require 导入自定义模块

1. 将相对路径转换为绝对路径
2. 检查缓存
3. 读入源文件代码
4. 包裹为一个自执行函数, 可以通过 arguments.callee.toString() 查看自执行函数
5. 缓存模块 (多次 require 时, 只会执行一次, 例 [path](./path.js))
6. 返回 module.exports 的值

```js
function require(relativePath) {
  // 将相对路径转换为绝对路径
  let absolutePath = path.resolve(__dirname, relativePath);

  // 检查缓存: 缓存命中
  if (caches[absolutePath]) {
    return caches[absolutePath];
  }

  // 检查缓存: 缓存未命中
  let nativeCode = fs.readFileSync(absolutePath.toString())

  let module = {};
  let exports = module.exports = {};

  // 包裹为一个自执行函数
  (function (exports, require, module, __filename, __dirname) {
      /* native code */
      // assign to exports, module;
    },
  )(exports, require, module, __filename, __dirname);

  // 缓存模块
  caches[absolutePath] = module.exports;

  return caches[absolutePath]
}
```
