import { useEffect, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseEffectDemo() {
  const demoDiv = document.getElementById(
    "useEffect_demoDiv"
  ) as HTMLDivElement;
  //! demoDiv: null
  //! 组件渲染未完成
  console.log("demoDiv:", demoDiv);

  const [cnt, setCnt] = useState(0);
  const [name, setName] = useState("");

  // effect 函数的执行时机 (DidMount + DidUpdate)
  // 1. 组件渲染完成 (挂载完成) 后执行, 等价于 DidMount
  // 2. 组件更新 (依赖项更新) 后执行, 等价于 DidUpdate
  useEffect(
    () => {
      const demoDiv = document.getElementById(
        "useEffect_demoDiv"
      ) as HTMLDivElement;
      // eslint-disable-next-line no-irregular-whitespace
      //! useEffect demoDiv: <div id=​"useEffect_demoDiv">​</div>​
      //! effect 副作用函数: 组件渲染完成后执行
      console.log("useEffect demoDiv:", demoDiv);
      demoDiv.style.color = "red";
    } /* effect 副作用函数 */,
    [cnt] /* 依赖项 */
  );
  return (
    <div style={itemStyle}>
      <div id="useEffect_demoDiv">demo</div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        {cnt}
      </button>
      <input
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        type="text"
      ></input>
    </div>
  );
}
