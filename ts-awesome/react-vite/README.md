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

react 中应该将数组视为**只读**, 不要修改原数组, 不要使用 push(), pop() 等方法

| 操作 | 不使用                    | 使用                               |
| ---- | ------------------------- | ---------------------------------- |
| 插入 | push(), unshift()         | concat, [newHead, ...arr, newTail] |
| 删除 | pop(), shift(), splice()  | filter(), slice(), toSpliced()     |
| 替换 | splice(), arr[i] = newVal | map(),toSpliced(), with()          |
| 排序 | reverse(), sort()         | toReversed(), toSorted()           |

以下 4 个方法不会修改原数组, 返回一个新数组, 参考 [Array](https://tianchenghang.github.io/ch08.html)

- toReversed(): 逆序
- toSorted(): 升序排序
- toSpliced(): 指定位置插入删除
- with(): 指定位置替换

## hook

> react 中, 所有的 hook 都必须在组件的顶层调用

### useState 更新机制

```jsx
// dispatch 异步更新, 可以提升性能
const [state, dispatch] = useState(data);
```

### useReducer

- useReducer 可用于基本类型和引用类型, 集中式状态管理, 适用于复杂类型, 例如数组或对象 (类似于 Vue 的 reactive, 但 reactive 只能用于引用类型)
- useState 可用于基本类型和引用类型 (类似于 Vue 的 ref, ref 可用于基本类型和引用类型)

```jsx
const [state, dispatch] = useReducer(reducer/*  */, initializerArg/* 默认值 */, initializer/* 初始化函数 */);
// dispatch(action) { reducer(state, action) }
```

### useSyncExternalStore

1. 订阅外部 store, 例如 redux, zustand (类似于 vuex, pinia)
2. 订阅浏览器 api, 例如 online, storage, location, hash, history 等
3. 抽离逻辑, 编写自定义 hook
4. 支持服务器端渲染