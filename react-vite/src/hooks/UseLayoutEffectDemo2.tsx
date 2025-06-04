import { useEffect, useLayoutEffect } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  overflow: "auto",
};

export function UseLayoutEffectDemo2() {
  // 初始渲染时 opacity: 0
  // 浏览器绘制
  // useEffect 异步执行, 设置 opacity: 1
  // 有淡入过渡
  useEffect(() => {
    const demoDiv = document.getElementById(
      "useLayoutEffect__demo-div",
    ) as HTMLDivElement;
    demoDiv.style.transition = "opacity 3s";
    demoDiv.style.opacity = "1";
  }, []);

  // 初始渲染时 opacity: 1
  // useLayoutEffect 同步执行, 设置 opacity: 1
  // 浏览器绘制
  // 没有淡入过渡
  useLayoutEffect(() => {
    const demoDiv = document.getElementById(
      "useLayoutEffect__demo-div2",
    ) as HTMLDivElement;
    demoDiv.style.transition = "opacity 3s";
    demoDiv.style.opacity = "1";
  });

  return (
    <div style={itemStyle}>
      <div
        id="useLayoutEffect__demo-div"
        style={{
          opacity: 0,
          height: 50,
          backgroundColor: "lightblue",
        }}
      >
        useLayoutEffect__demo-div
      </div>
      <div
        id="useLayoutEffect__demo-div2"
        style={{
          opacity: 0,
          height: 50,
          backgroundColor: "lightpink",
        }}
      >
        useLayoutEffect__demo-div2
      </div>
    </div>
  );
}
