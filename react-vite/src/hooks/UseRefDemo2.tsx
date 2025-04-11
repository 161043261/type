import { MutableRefObject, useRef, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseRefDemo2() {
  console.log("UseRefDemo2 is rendering");
  //// let prevCnt = 0;
  const prevCnt: MutableRefObject<number> = useRef(0);
  const [cnt, setCnt] = useState(0);
  const clickHandler = () => {
    // const [state, setState] = useState(initialValue);
    // setState 是异步更新的, 可以提升性能
    // 调用 setState 异步更新 state 值时, 会导致组件重新渲染
    setCnt(cnt + 1);
    //// prevCnt = cnt;

    // const refValue = useRef(initialValue);
    // 1. 组件重新渲染时, 不会再次调用 useRef
    // 2. 更新 prevCnt.current 属性值时, 不会导致组件重新渲染
    // 3. 除了初始化外 (组件函数体内) , 不要在渲染时读写 refValue.current,
    // 否则会使得组件的行为变得不可预测
    prevCnt.current = cnt;
  };
  return (
    <div style={itemStyle}>
      <div>
        旧值: {prevCnt.current}, 新值: {cnt}
      </div>
      <button type="button" onClick={clickHandler}>
        add
      </button>
    </div>
  );
}
