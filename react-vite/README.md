# React

## React 面试题

JSX 可以理解为 React.createElement 的语法糖, JSX 元素会被 babel 编译为 React.Element 对象

React.createElement 用于创建 React.Element 对象

`React.createElement(type, [props], [...children])`

React.cloneElement 用于更新 React.Element 对象, 返回一个新的 React.Element 对象

`React.cloneElement(element, [props], [...children])`

### JSX 安全性

字符串转义: React 会对字符串中的特殊字符进行转义, 防止 XSS

```jsx
const userInput = '<script>alert("XSS")</script>';
const element = <div>{userInput}</div>;
```

React 会将 userInput 中的 `<` 和 `>` 转移为 `&lt` 和 `&gt`

### JSX 元素和 Fiber 节点的关系

JSX 只描述组件, 不包括组件 scheduler (调度器: 时间分片, 任务切片, 优先级调度); reconciler (协调器, 对比旧的 currentFiberTree, 构建新的 currentFiberTree, 即新旧 DOM 对比); renderer (渲染器, 将虚拟 DOM 转换为真实 UI) 等需要的信息, 例如

- 组件更新的优先级
- 组件的 state

### 类组件和函数组件

- 类组件: 类组件只实例化 1 次, 类组件中保存 state, 每次更新时, 只调用 render 方法和对应的生命周期钩子
- 函数组件: 每次更新时, 都重新执行函数, 该函数和该函数中的普通变量会重新创建, 为了使得函数组件可以保存 state (不会因为函数重新执行导致重置), 就有了 React Hooks (useState 等, React 在内存中维护一个链表, 存储 useState 返回的状态)

### 组件的强化方式

1. 类组件继承
2. 函数组件自定义 hooks
3. HOC 高阶组件

### 组件通信

Demo1

```jsx
function Modal({ content: ContentElement }) {
  return <div>{ContentElement}</div>;
}

function Content({ text }) {
  // {Element}
  return <div>{text}</div>;
}

<Modal content={<Content text="MyGo!!!!!" />} />;
```

Demo2

```jsx
function Timer({ content: ContentFunction }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
  }, [time]);

  // <Function />
  return (
    <div>
      <ContentFunction time={time} />
    </div>
  );
}

function Content({ time }) {
  return <div>{time}</div>;
}

<Timer content={Content} />;
```

Demo3

```jsx
function Timer({ content: ContentCallback }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
  }, [time]);

  // {Element}
  return <div> {ContentCallback(time)} </div>;
}

function Content({ time }) {
  return <div>{time}</div>;
}

<Timer content={(time) => <Content time={time} />} />;
```

Demo4: props + callback

```jsx
function Son(props) {
  const { fatherSays, say2father } = props;
  return (
    <div>
      I'm child
      <div> fatherSays {fatherSays} </div>
      say2father
      <input
        onChange={(ev) => say2father(ev.target.value)}
        placeholder="say2father"
      />
    </div>
  );
}

function Father() {
  const [childSays, setChildSays] = useState("");
  const [fatherSays, setFatherSays] = useState("");
  return (
    <div>
      I'm father
      <div> childSays {childSays} </div>
      say2child
      <input
        onChange={(ev) => setFatherSays(ev.target.value)}
        placeholder="say2child"
      />
      <Son fatherSays={fatherSays} say2father={setChildSays} />
    </div>
  );
}
```

EventBus 更适合小程序

EventBus 的缺点

- 需要手动绑定 (subscribe/on) 和解绑 (unsubscribe/off)
- 违背了 React 单向数据流原则

### useState

问题: cnt 等于 3 时, 点击 Alert, 再将 cnt 更新为 5, 3s 后 alert `cnt: 3`

解释: 点击 Alert, handleClick 闭包捕获当前渲染周期的 cnt 值 (3), 再将 cnt 更新为 5, 组件重新渲染, 但是定时器的回调函数是在旧的渲染周期中创建的, 所以 alert `cnt: 3`

```jsx
function Counter() {
  const [cnt, setCnt] = useState(0);
  // 组件每次重新渲染, 都会重新创建 handleClick
  function handleClick() {
    // 闭包捕获当前渲染周期的 cnt 值
    setTimeout(() => {
      alert("cnt: " + cnt);
    }, 3000);
  }

  return (
    <div>
      <p>Click {cnt} times</p>
      <button onClick={() => setCnt(cnt + 1)}>cnt++</button>
      <button onClick={handleClick}>Alert</button>
    </div>
  );
}
```

```jsx
function Counter2() {
  const [cnt2, setCnt2] = useState(0);
  const cntRef = useRef(cnt2);
  useEffect(() => {
    cntRef.current = cnt2;
  }, [cnt2]);

  function handleClick() {
    setTimeout(() => {
      alert("cnt2: " + cntRef.current);
    }, 3000);
  }

  return (
    <div>
      <p>Click {cnt2} times</p>
      <button onClick={() => setCnt2(cnt2 + 1)}>cnt++</button>
      <button onClick={handleClick}>Alert</button>
    </div>
  );
}
```

- setState 是异步更新的, 可以提高性能
- 调用 setState 异步更新 state 值时, 会导致组件重新渲染
- setState 是异步的, 可以提高性能
- 多次传入相同的 newVal 调用 setState(newVal) 时, React 屏蔽后续更新, 即自带防抖功能
- `setCnt(cnt + 1)` 使用闭包捕获的 cnt 值 (上一个渲染周期的 cnt 值)
- `setCnt((cnt) => cnt + 1)` 最新的 cnt 值

```jsx
function Counter() {
  const [cnt, setCnt] = useState(0);
  console.log("render");

  const handleClick = () => {
    // 打印 1 次 render, cnt +1
    setCnt(cnt + 1);
    setCnt(cnt + 1);
  };

  const handleClick2 = () => {
    // 打印 1 次 render, cnt +2 (合并更新)
    setCnt((val) => val + 1);
    setCnt((val) => val + 1);
  };

  const handleClick3 = () => {
    setTimeout(() => {
      // 打印 1 次 render, cnt +1
      setCnt(cnt + 1);
      setCnt(cnt + 1);
    }, 0);
  };

  const handleClick4 = () => {
    setTimeout(() => {
      // 打印 1 次 render, cnt +2 (合并更新)
      setCnt((val) => val + 1);
      setCnt((val) => val + 1);
    }, 0);
  };

  return (
    <div>
      <div>cnt: {cnt}</div>
      <button onClick={handleClick}>add</button>
      <button onClick={handleClick2}>add2</button>
      <button onClick={handleClick3}>add3</button>
      <button onClick={handleClick4}>add4</button>
    </div>
  );
}
```

### useRef

- React 的 useRef 返回的 refVal 是普通 JS 对象, 不是 state 状态 (没有对应的 setState); 改变 refVal.current 值时, 不会触发组件重新渲染
- 组件每次重新渲染, 组件函数会重新执行, 所有的局部变量都会重新初始化
- useRef 只会在组件挂载时调用 1 次, 组件重新渲染时, 不会重新调用 useRef
- useRef 的返回值不能作为 useEffect 等其他 hooks 的 dependencies 中的依赖项, 因为 useRef 返回普通 JS 对象, 不是 state 状态 (没有对应的 setState)

### context

Demo1

```tsx
import { createContext, useContext } from "react";

interface IThemeCtx {
  color: string;
  background: string;
}

const themeCtx = createContext<IThemeCtx>({} as IThemeCtx);

const Demo = () => {
  const { color, background } = useContext<IThemeCtx>(themeCtx);
  return <div style={{ color, background }}>Demo</div>;
};

const Demo2 = ({ color, background }: IThemeCtx) => (
  <div style={{ color, background }}>Demo2</div>
);

export default function ContextDemo() {
  return (
    <themeCtx.Provider value={{ color: "lightblue", background: "lightgreen" }}>
      {/* Provider + useContext */}
      <Demo />
      {/* Provider + Consumer */}
      <themeCtx.Consumer>
        {(value: IThemeCtx) => <Demo2 {...value} />}
      </themeCtx.Consumer>
    </themeCtx.Provider>
  );
}
```

Demo2 动态 context

```tsx
import { createContext, memo, useContext, useState } from "react";

interface IThemeCtx {
  color: string;
  background: string;
}

const themeCtx = createContext<IThemeCtx>({} as IThemeCtx);

const Demo = () => {
  console.log("Demo render");
  const { color, background } = useContext<IThemeCtx>(themeCtx);
  return <div style={{ color, background }}>Demo</div>;
};

const MemoDemo = memo(() => {
  console.log("MemoDemo render");
  return <Demo />;
});

export default function UseContextDemo() {
  const [theme, setTheme] = useState<IThemeCtx>({
    color: "lightblue",
    background: "lightgreen",
  });
  return (
    <div>
      <themeCtx.Provider value={theme}>
        <MemoDemo />
      </themeCtx.Provider>
      <button
        onClick={() =>
          // 更新 context 时, Demo 重新渲染, MemoDemo 不重新渲染
          setTheme({ color: theme.background, background: theme.color })
        }
      >
        swapColor
      </button>
    </div>
  );
}
```

Demo3 嵌套 Provider

```tsx
import { createContext, useState } from "react";

interface IThemeCtx {
  color: string;
  background: string;
  name: string;
}

interface ILangCtx {
  lang: string;
  name: string;
}

const themeCtx = createContext<IThemeCtx>({} as IThemeCtx);
const langCtx = createContext<ILangCtx>({} as ILangCtx);

const Child = () => {
  return (
    <themeCtx.Consumer>
      {(themeVal) => {
        return (
          <langCtx.Consumer>
            {(langVal) => {
              const {
                color,
                background,
                name: themeName /** ThemeCtx */,
              } = themeVal;
              const { lang, name: langName /** LangCtx */ } = langVal;
              return (
                <div>
                  {JSON.stringify({
                    color,
                    background,
                    themeName,
                    lang,
                    langName,
                  })}
                </div>
              );
            }}
          </langCtx.Consumer>
        );
      }}
    </themeCtx.Consumer>
  );
};

export default function UseContextDemo4() {
  const [themeVal /** , setThemeVal */] = useState<IThemeCtx>({
    color: "lightblue",
    background: "lightgreen",
    name: "ThemeCtx",
  });
  const [langVal /** , setLangVal */] = useState<ILangCtx>({
    lang: "zhCN",
    name: "LangCtx",
  });
  return (
    <themeCtx.Provider value={themeVal}>
      <langCtx.Provider value={langVal}>
        <Child />
      </langCtx.Provider>
    </themeCtx.Provider>
  );
}
```

context 对比 props: 不需要每一层手动添加 props

### React HOC

高阶组件: 装饰模式

高阶组件是一个无副作用的纯函数, 入参是一个组件, 返回一个装饰后的增强组件

```jsx
const WithPropsProxy = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    const newProps = {
      ...props,
      mixinProp: "FromHOC",
    };

    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};
```
