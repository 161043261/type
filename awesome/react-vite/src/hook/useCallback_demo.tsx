import { ChangeEvent, useCallback, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

const wm = new WeakMap();
let cnt = 1;

export function UseCallbackDemo() {
  console.log("UseCallbackDemo is rending");
  const [input, setInput] = useState("");

  // 未使用 useCallback 优化, 组件重新渲染时, changeCb 也会被重新创建
  // const changeCb = (ev: ChangeEvent<HTMLInputElement>) => {
  //   setInput(ev.target.value);
  // };

  // 使用 useCallback 优化, changeCb 只会被创建一次
  const changeCb = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setInput(ev.target.value);
    },
    [] /* 依赖项为空 */,
  );
  if (!wm.has(changeCb)) {
    wm.set(changeCb, cnt++);
  }
  console.log("statistics:", wm.get(changeCb));
  return (
    <div style={itemStyle}>
      <input type="text" value={input} onChange={changeCb} />
    </div>
  );
}
