import { ChangeEvent, useCallback, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

const wm = new WeakMap();
let cbCnt = 1;
let cachedCbCnt = 1;

export function UseCallbackDemo() {
  console.log("UseCallbackDemo is rending");
  const [inputVal, setInputVal] = useState("");
  // 每次重新渲染时都会重新创建 cb
  const cb = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log(ev);
  };
  if (!wm.has(cb)) {
    wm.set(cb, cbCnt++);
  }
  const cachedCb = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setInputVal(ev.target.value);
    },
    [] /* 依赖项数组是空数组, 只会在组件挂载后创建一次 cachedCb */,
  );
  if (!wm.has(cachedCb)) {
    wm.set(cachedCb, cachedCbCnt++);
  }

  console.log("wm:", wm);
  return (
    <div style={itemStyle}>
      <input
        type="text"
        value={inputVal}
        onChange={(ev) => {
          cb(ev);
          cachedCb(ev);
        }}
      />
    </div>
  );
}
