import babel from "@babel/core";
import presetEnv from "@babel/preset-env";
import presetReact from "@babel/preset-react";
import fs from "node:fs";
const es6Code = fs.readFileSync("./es6.raw.js", "utf-8");
const result1 = babel.transform(es6Code, {
  presets: [
    [
      presetEnv,
      {
        // entry: 手动引入
        // usage: 按需引入
        useBuiltIns: "usage",
        corejs: 3, // corejs 版本
      },
    ],
  ],
});
//! console.log(result1.code);

const reactCode = fs.readFileSync("./react.raw.jsx");
const result2 = babel.transform(reactCode, {
  presets: [
    [
      presetEnv,
      {
        // entry: 手动引入
        // usage: 按需引入
        useBuiltIns: "usage",
        corejs: 3, // corejs 版本
      },
    ],
    presetReact,
  ],
});
//! console.log(result2.code);

// 自定义 babel 插件
// types 包含所有 ast 方法
function transformFunc({ types }) {
  return {
    name: "transformFunc",
    visitor: {
      // 匹配箭头函数
      ArrowFunctionExpression(path) {
        // 箭头函数转换为普通函数
        const node = path.node;
        const functionExpression = types.functionExpression(
          null, // 匿名函数
          node.params,
          types.blockStatement([types.returnStatement(node.body)]),
          node.async
        )
        path.replaceWith(functionExpression);
      }
    }
  }
}
const result3 = babel.transform(es6Code, {
  plugins: [transformFunc]
})
//! console.log(result3.code);

import swc from '@swc/core'
const result4 = swc.transformFileSync("./es6.raw.js", {
  jsc: {
    parser: {
      syntax: "ecmascript",
    },
    target: "es5",
  },
});
//! console.log(result4.code);

const result5 = swc.transformFileSync('./react.raw.jsx', {
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: true
    },
    target: 'es5'
  }
})
console.log(result5.code);