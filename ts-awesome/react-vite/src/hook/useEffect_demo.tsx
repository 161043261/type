/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseEffectDemo() {
  /**
   * const demoDiv = document.getElementById(
   *   "useEffect__demo-div"
   * ) as HTMLDivElement;
   * // demoDiv: null, 组件渲染未完成
   * console.log("demoDiv:", demoDiv);
   */

  const [cnt, setCnt] = useState(0);
  const [name, setName] = useState("");
  const [showChild, setShowChild] = useState(true);
  function Child(props: any) {
    useEffect(() => {
      console.log("Mounted:", props);

      // 卸载函数
      const destructor = () => {
        console.log("Unmounted");
        const demoDivChild = document.getElementById(
          "useEffect__demo-div-child",
        ) as HTMLDivElement;
        // demoDivChild: null, 组件已卸载
        console.log("demoDivChild:", demoDivChild);
      };
      return destructor;
    }, [props, props.name]);
    return <div id="useEffect__demo-div-child">Child</div>;
  }

  // effect (setup) 函数的执行时机 (DidMount + DidUpdate)
  // 1. 组件渲染完成 (挂载) 后, 执行 effect (setup), 等价于 DidMount
  // 2. 组件更新 (依赖项更新) 前, 执行 destructor
  // 3. 组件更新 (依赖项更新) 后, 执行 effect (setup), 等价于 DidUpdate
  // 4. 组件卸载后, 执行 destructor
  useEffect(
    () => {
      const demoDiv = document.getElementById(
        "useEffect__demo-div",
      ) as HTMLDivElement;
      // eslint-disable-next-line no-irregular-whitespace
      //! useEffect demoDiv: <div id=​"useEffect__demo-div">​</div>​
      //! effect (setup) 函数: 组件渲染完成后执行
      console.log("useEffect demoDiv:", demoDiv);
      demoDiv.style.color = "red";
    } /* effect (setup) 函数 */,
    [cnt] /* 依赖项 */,
    // 如果依赖项是空数组, 则 effect 函数只在组件挂载后执行一次
  );
  return (
    <div style={itemStyle}>
      <div id="useEffect__demo-div">demo</div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        {cnt}
      </button>
      <input
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        type="text"
      ></input>

      <hr />
      <button type="button" onClick={() => setShowChild(!showChild)}>
        showChild
      </button>
      {showChild && <Child name="name"></Child>}
    </div>
  );
}
