import { createContext, useContext, useState } from 'react';

const itemStyle = {
  border: '1px solid lightblue',
  borderRadius: '10px',
  padding: '5px',
};

interface ICntCtx {
  cnt: number;
  setCnt: (cnt: number) => void;
}

// 全局上下文
const CntCtx = createContext({} as ICntCtx /* defaultValue */);

function Child() {
  const cntCtx = useContext<ICntCtx>(CntCtx);
  const { cnt, setCnt } = cntCtx;
  return (
    <>
      <div>Child cnt: {cnt} </div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        childAdd
      </button>
      <button type="button" onClick={() => setCnt(cnt - 1)}>
        childSub
      </button>
    </>
  );
}

function Parent() {
  const cntCtx = useContext<ICntCtx>(CntCtx);
  const { cnt, setCnt } = cntCtx;
  return (
    <>
      <div>Parent cnt: {cnt}</div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        parentAdd
      </button>
      <button type="button" onClick={() => setCnt(cnt - 1)}>
        parentSub
      </button>
      <Child />
    </>
  );
}

export function UseContextDemo() {
  const [overridedCnt, setOverridedCnt] = useState(1);
  const [cnt, setCnt] = useState(0);
  return (
    <div style={itemStyle}>
      <div>Grandparent cnt: {cnt}</div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        add
      </button>
      <button type="button" onClick={() => setCnt(cnt - 1)}>
        sub
      </button>
      <CntCtx value={{ cnt: overridedCnt, setCnt: setOverridedCnt }}>
        <CntCtx value={{ cnt, setCnt }}>
          {/* 对于同一个 context (这里是 cntCtx), 内层的 context 的 value 会覆盖外层
          context 的 value (这里 cnt 的初始值为 0) */}
          <Parent />
        </CntCtx>
      </CntCtx>

      <ul>
        <li>React18: CntCtx.Provider</li>
        <li>React19: CntCtx</li>
      </ul>
    </div>
  );
}
