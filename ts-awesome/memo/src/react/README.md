# React18

JSX 规则

1. 组件（函数）只能返回一个根元素

```jsx
function Component() {
  return (
    <div>
      <h1>待办事项</h1>
      <ul>
        <li>唱</li>
        <li>跳</li>
      </ul>
    </div>
  );
}
```

或使用空标签 Fragment

```jsx
function Component() {
  return (
    <>
      <h1>待办事项</h1>
      <ul>
        <li>唱</li>
        <li>跳</li>
      </ul>
    </>
  );
}
```

2. 标签必须闭合

```jsx
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

```js
// setState 是异步更新的, 可以提升性能
// 调用 setState 异步更新 state 值时, 会导致组件重新渲染
const [state, setState] = useState(initialState);
```

> [!WARN]
> 对比 `setState(newVal)` 和 `setState((prev) => newVal)`

```js
setState(curr + 1); // curr: 当前渲染周期中 state 的值
setState((prev) => prev + 1); // prev: 上一个渲染周期中 state 的值
```

### useReducer

- useReducer 可用于基本类型和引用类型, 集中式状态管理, 适用于复杂类型, 例如数组或对象 (类似于 Vue 的 reactive, 但 reactive 只能用于引用类型)
- useState 可用于基本类型和引用类型 (类似于 Vue 的 ref, ref 可用于基本类型和引用类型)

```js
const [state, dispatch] = useReducer(
  reducer /*  */,
  initializerArg /* 默认值 */,
  initializer /* 初始化函数 */
);
// dispatch(action) { reducer(state, action) }
```

### useSyncExternalStore

1. 订阅外部 store, 例如 redux, zustand (类似于 vuex, pinia)
2. 订阅浏览器 api, 例如 online, storage, location, hash, history 等
3. 抽离逻辑, 编写自定义 hook
4. 支持服务器端渲染

如果 getSnapshot 返回值与上一次返回值不同, 则 react 会重新渲染组件, 如果**总是**返回一个不同的值, 则会进入无限循环 infinite loops, 报错 Maximum update depth exceeded

### useTransition

- useTransition 用于性能优化, 特别适用于长时间任务, 例如计算/请求/渲染大量数据等
- useTransition 将某些更新标记为过渡更新, 即降低某些更新的优先级, React 先处理高优先级的更新, 例如用户输入; 延迟处理过渡更新, 例如渲染列表等

```js
const [isPending, startTransition] = useTransition();
// isPending = true: 正在过渡
// isPending = false: 过渡结束
```

startTransition 必须是**同步**的

```js
// 错误
startTransition(() => {
  setTimeout(() => {
    window.history.pushState({}, "", "/");
  }, 1000);
});

// 正确
setTimeout(() => {
  startTransition(() => {
    window.history.pushState({}, "", "/");
  });
}, 1000);
```

```js
// 错误
startTransition(async () => {
  await fetch("http://localhost:5173");
  window.history.pushState({}, "", "/");
});

// 正确
await fetch("http://localhost:5173");
startTransition(() => {
  window.history.pushState({}, "", "/");
});
```

原理: useTransition 降低某些更新的优先级为 LowPriority

```js
// React 的优先级
const ImmediatePriority = 1; // 立即执行的优先级: 点击, 输入, ...
const UserBlockingPriority = 2; // 用户阻塞的优先级: 滚动, 拖拽, ...
const NormalPriority = 3; // 普通优先级: dom 渲染, 网络请求, ...
const LowPriority = 4; // 低优先级
const IdlePriority = 5; // 空闲优先级: console.log
```

```bash
pnpm i mockjs
pnpm i @types/mockjs -D
```

### useDeferredValue

useDeferredValue 根据设备的情况, 延迟某些状态的更新, 直到主渲染任务完成, 特别适用于频繁更新的内容, 例如输入框. 避免频繁更新导致的性能问题

> useTransition 和 useDeferredValue 的区别

1. 相同点: 都是延迟更新, 用于性能优化
2. useTransition 关注状态的过渡, 例如渲染列表, useDeferredValue 关注值的延迟更新, 例如输入框

- useTransition, useDeferredValue 类似防抖 (debounce): 连续触发事件, n 秒内函数只执行最后 1 次 (回城)
- useDeferredValue 不是防抖, 防抖有确定的延迟时间, useDeferredValue 没有确定的延迟时间, 而是根据设备的情况, 延迟某些状态的更新, 如果设备情况好, 那么延迟几乎是无感的

### useEffect

useEffect 是 React 中处理副作用的钩子

**纯函数, 副作用函数**

纯函数

1. 输入决定输出: 相同的输入总是得到相同的输出
2. 无副作用: 不会改变外部状态, 也不会依赖外部可变状态, 即纯函数不会影响外部的变量, 文件, 数据库...

副作用函数: 会改变外部状态, 或依赖外部可变状态

深拷贝

1. `JSON.parse(JSON.stringfy(obj));` 会丢失属性值为 undefined 的属性
2. lodash cloneDeep
3. `window.structuredClone(obj);` 浏览器自带

> effect (setup) 函数的执行时机

1. 组件渲染完成 (挂载) 后, 执行 effect (setup), 等价于 DidMount
2. 组件更新 (依赖项更新) 前, 执行 destructor
3. 组件更新 (依赖项更新) 后, 执行 effect (setup), 等价于 DidUpdate
4. 组件卸载后, 执行 destructor

组件更新等价于先卸载, 后挂载 ?

```js
// useEffect 无返回值
useEffect(effect: () => void | Destructor, // setup
dependencies?: Array);
```

### useLayoutEffect

```js
useLayoutEffect(() => void | Destructor, // setup
dependencies?: Array);
```

> [!IMPORTANT]
> 对比 useEffect 和 useLayoutEffect

| 区别                | useLayoutEffect        | useEffect              |
| ------------------- | ---------------------- | ---------------------- |
| effect 函数执行时机 | 浏览器布局，绘制前执行 | 浏览器布局，绘制后执行 |
| effect 函数执行方式 | 同步执行               | 异步执行               |
| DOM 渲染            | 阻塞 DOM 渲染          | 不阻塞 DOM 渲染        |

- 异步的 useEffect 可能会导致闪烁，同步的 useLayoutEffect 可以避免闪烁
- useLayoutEffect 可以模拟生命周期钩子：componentDidMount, componentDidUpdate 和 componentWillUnmount 等同步方法

### useRef

useRef: 获取 DOM 元素，数据存储

```jsx
// 获取 DOM 元素
const divRef = useRef < HTMLDivElement > null;
<div ref={divRef}>HTMLDivElement</div>;
```

```js
// React
const refValue = useRef(initialValue);
refValue.current;
// React 的 useRef() 返回的 refValue 不是响应式的
// refValue 是普通对象，值改变时，视图不会重新渲染

// Vue
const refValue = ref(initialValue);
refValue.value;
// Vue 的 ref() 返回的 refValue 是响应式的
// refValue 是 Proxy 代理对象，值改变时，视图会重新渲染
```

> [!IMPORTANT]
> 对比 useState 和 useRef

```js
const [state, setState] = useState(initializer);
```

- setState 是异步更新的, 可以提升性能
- 调用 setState 异步更新 state 值时, 会导致组件重新渲染
- useState 返回的 state 可以作为 useEffect 等其他 hooks 的依赖项。通过 setState 函数，state 是一个响应式对象

```js
const refValue = useRef(initialValue);
```

1. 组件重新渲染时，不会再次调用 useRef
2. 更新 prevCnt.current 属性值时，不会导致组件重新渲染
3. 除了初始化外（组件函数体内），不要在渲染时读写 refValue.current，否则会使得组件的行为变得不可预测
4. useRef 返回的 refValue 不能作为 useEffect 等其他 hooks 的依赖项，refValue 不是一个响应式对象，只是一个普通对象
5. React 的 useRef 不能直接获取子组件，需要使用 forwardRef（Vue 的 ref 可以直接获取子组件）

### useImperativeHandle

父组件可以访问子组件的属性，调用子组件的方法，类似 Vue 的 defineExpose

```js
useImperativeHandle(parentRef, () => {
  return {
    // 暴露给父组件的属性和方法
  };
}, dependencies?: Array);
```
