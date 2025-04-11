import { useRef } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseRefDemo() {
  const divRef = useRef<HTMLDivElement>(null);
  // null 空对象, 解引用
  // undefined 未定义

  const clickHandler = () => {
    // console.log(divRef.current);
    console.dir(divRef.current);
    divRef.current!.style.backgroundColor = "lightblue";
  };

  return (
    <div style={itemStyle}>
      <div ref={divRef}>HTMLDivElement</div>
      <button onClick={clickHandler} type="button">
        获取 DOM 元素
      </button>
    </div>
  );
}
