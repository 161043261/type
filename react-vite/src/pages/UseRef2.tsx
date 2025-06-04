import { useRef, useState } from "react";

export default function UseRefDemo2() {
  // 组件每次重新渲染时, timer 都会重新初始化为 null
  // let timer: null | NodeJS.Timeout = null;
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [cnt, setCnt] = useState(0);
  const handleStart = () => {
    timer.current = setInterval(() => {
      setCnt((cnt) => cnt + 1);
    }, 500);
  };
  const handleEnd = () => {
    console.log(timer);
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };
  return (
    <div>
      <div>cnt: {cnt}</div>
      <button onClick={handleStart}>Start counter</button>
      <button onClick={handleEnd}>End counter</button>
    </div>
  );
}
