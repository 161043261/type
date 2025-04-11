import React, { useRef, useState } from "react";

// 问题 1: num 为什么一直是 0

// - 组件每次重新渲染, 组件函数会重新执行, 所有的局部变量 (例如 num) 都会重新初始化
// - setCnt 执行后, 触发组件重新渲染, 组件每次重新渲染时, num 都会重新初始化为 0
// - useRef 只会在组件挂载时执行 1 次

// 问题 2: refNum.current 为什么一直比 cnt 小 1

// - const [state, setState] = useState(initialState | () => initialState)
// - setState 异步更新 state 值
// 使用 setCnt(val => { refNum.current = val + 1; return val + 1; }) 解决问题 2
const UseRefDemo: React.FC = () => {
  let num = 0;
  const refNum = useRef(0);
  const [cnt, setCnt] = useState(0);
  const handleClick = () => {
    // setCnt 执行后, 组件重新渲染, num 重新初始化为 0
    // setCnt(cnt);
    // num = cnt;
    // refNum.current = cnt;
    setCnt((val) => {
      num = val + 1;
      refNum.current = val + 1;
      return val + 1;
    });
  };
  return (
    <div>
      <button onClick={handleClick}>++</button>
      <div>cnt: {cnt}</div>
      {/* num 一直为 0 */}
      <div>num: {num}</div>
      {/* refNum.current 为什么一直比 num 小 1 */}
      <div>refNum.current: {refNum.current}</div>
    </div>
  );
};

export default UseRefDemo;
