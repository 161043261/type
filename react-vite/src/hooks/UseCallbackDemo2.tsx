import { memo, useCallback, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

interface Props {
  user: {
    name: string;
    age: number;
  };
  logger: () => void;
}

// React.memo 用于性能优化
// React 默认父组件重新渲染时, 即使子组件的 props, state 或 useContext 未改变, 子组件也会重新渲染
// 可以使用 React.memo 包裹子组件, 避免不必要的渲染
const Child = memo((props: Props) => {
  console.log("[useCallback_demo2] Child is rendering");
  // const [_, set_] = useState(0);
  return (
    <>
      {/* <button type="button" onClick={() => set_(_ + 1)}>
        Child state _: {_}
      </button> */}
      <div>name: {props.user.name}</div>
      <div>age: {props.user.age}</div>
      <button type="button" onClick={props.logger}>
        logger
      </button>
    </>
  );
});

export function UseCallbackDemo2() {
  console.log("UseCallbackDemo2 is rendering");
  const [input, setInput] = useState("");
  //* 未使用 useState
  //* 输入框内容改变时, 父组件 UseCallbackDemo2 重新渲染
  //* user 会被重新创建, 子组件 Child 的 props 改变, 导致子组件也重新渲染
  // const user = { // 父组件重新渲染时, 每次得到的 user 地址不同
  //   name: "yuki",
  //   age: 22,
  // };
  const [user /* setState */] = useState({
    //! 父组件重新渲染时, 每次得到的 user 地址相同
    name: "yuki",
    age: 22,
  });
  //* 未使用 useCallback 优化
  //* 输入框内容改变时, 父组件 UseCallbackDemo2 重新渲染
  //* logger 会被重新创建, 子组件 Child 的 props 改变, 导致子组件也重新渲染
  // const logger = () => { // 父组件重新渲染时, 每次得到的 logger 地址不同
  //   console.log("logging");
  // };
  const logger = useCallback(
    //! 父组件重新渲染时, 每次得到的 logger 地址相同
    () => {
      console.log("logging");
    },
    [] /* dependencies */,
  );
  return (
    <div style={itemStyle}>
      <input
        type="text"
        value={input}
        onChange={(ev) => setInput(ev.target.value)}
      />
      <Child user={user} logger={logger}></Child>
    </div>
  );
}
