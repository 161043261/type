import { createContext, useContext, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

interface ICntCtx {
  cnt: number;
  setCnt: (cnt: number) => void;
}

// 全局上下文
const cntCtx = createContext<ICntCtx>({} as ICntCtx /* defaultValue */);

function Child() {
  const ctxVal = useContext<ICntCtx>(cntCtx);
  const { cnt, setCnt } = ctxVal;
  return (
    <>
      <div>Child cnt: {cnt} </div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        Child add
      </button>
    </>
  );
}

function Parent() {
  const ctxVal = useContext<ICntCtx>(cntCtx);
  const { cnt, setCnt } = ctxVal;
  return (
    <>
      <div>Parent cnt: {cnt}</div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        Parent add
      </button>
      <Child />
    </>
  );
}

export function UseContextDemo() {
  const [_cnt, _setCnt] = useState(777);
  const [cnt, setCnt] = useState(0);
  return (
    <div style={itemStyle}>
      <div>Grandparent cnt: {cnt}</div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        Grandparent add
      </button>
      <cntCtx.Provider value={{ cnt: _cnt, setCnt: _setCnt }}>
        <cntCtx.Provider value={{ cnt, setCnt }}>
          {/* 对于同一个 context (这里是 cntContext), 内层 context 的值会覆盖外层 context 的值 (这里 cnt 的初始值为 0) */}
          <Parent />
        </cntCtx.Provider>
      </cntCtx.Provider>
    </div>
  );
}
