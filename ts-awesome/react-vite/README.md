# ch01

JSX 规则

1. 组件（函数）只能返回一个根元素

```tsx
function Component() {
  return (
    <div>
      <h1>待办事项</h1>
      <ul>
        <li>唱</li>
        <li>跳</li>
        <li>rap</li>
      </ul>
    </div>
  );
}
```

或使用空标签 Fragment

```js
function Component() {
  return (
    <>
      <h1>待办事项</h1>
      <ul>
        <li>唱</li>
        <li>跳</li>
        <li>rap</li>
      </ul>
    </>
  );
}
```

2. 标签必须闭合

```tsx
function Component() {
  // <img> 等自闭合标签必须写为 <img />
  return <img src="vite.svg" alt="vite logo" />;
}
```

3. 属性名使用驼峰命名

例：stroke-width => strokeWidth, class => className

### babel

1. es6 => es5：将新版本的 js 语法转换为旧版本的 js 语法
2. Polyfill：垫片，使得新功能在旧浏览器中可用
3. jsx => js：将 jsx 语法转换为 js 语法
4. 自定义插件

### swc

1. es6 => es5, ts => js, jsx => js, ...
2. 打包
3. 代码压缩，优化


### 虚拟 dom

优点: 性能好, 跨平台

**fiber**