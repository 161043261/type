import { useRef, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseRefDemo3() {
  // let timer: null | NodeJS.Timeout = null;
  // 组件重新渲染时, 不会再次调用 useRef
  const timer = useRef<null | NodeJS.Timeout>(null);
  // 调用 setCnt 异步更新 cnt 值时, 会导致组件重新渲染
  const [cnt, setCnt] = useState(0);
  const start = () => {
    // 更新 timer.current 属性值时, 不会导致组件重新渲染
    timer.current = setInterval(() => {
      setCnt((val) => val + 1); // prev: 上一个渲染周期中 cnt 的值
      // setCnt(cnt + 1); // 当前渲染周期中 cnt 的值
    }, 100);
  };
  const end = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  };
  return (
    <div style={itemStyle}>
      <p>计时器</p>
      <div>{cnt}</div>
      <button type="button" onClick={start}>
        start
      </button>
      <button type="button" onClick={end}>
        end
      </button>
    </div>
  );
}
