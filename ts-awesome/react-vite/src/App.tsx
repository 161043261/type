/* eslint-disable @typescript-eslint/no-explicit-any */
//! js 插值 ${}
//! vue 插值 {{}}
//! jsx 插值 {}

import { UseState } from "./hook/UseState";

export function App() {
  // jsx 插值：支持数字，字符串，基本类型数组，html 元素，表达式；不支持对象
  // 属性，事件：驼峰命名
  const counter = (arg: any) => {
    console.log(arg);
  };

  // 泛型函数：加逗号
  const _fn = <T,>(arg: T) => {
    console.log(arg);
  };
  _fn("Hello Seattle, I am a mountaineer");

  //! return (
  //!   // 这里，arg 是事件对象
  //!   <button type="button" onClick={counter}>
  //!     {"App"}
  //!   </button>
  //! );

  // return (
  //   // 需要传递参数时, 会立即调用
  //   // <button type="button" onClick={counter(1)}>
  //   // 解决：使用高阶函数
  //   <button type="button" onClick={() => counter(1)}>
  //     {"App"}
  //   </button>
  // );

  // 传递事件对象
  // 绑定 id, className，等价于 v-bind
  const id = "btn1";
  const className = "primary-btn";
  const style = {
    padding: "5px 5px",
    color: "white",
    backgroundColor: "slateblue",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const rowStyle = { display: "flex", justifyContent: "space-around" };
  const itemStyle = {
    border: "1px solid lightblue",
    borderRadius: "10px",
    padding: "10px",
    width: "30vw",
  };

  // 指定 html 代码片段，等价于 v-html
  const htmlSnippet = `<p>v-html</p>`;

  // 遍历数组，等价于 v-for
  const arr = ["Vue", "React", "Angular"];

  const cond = true;
  return (
    <>
      <button
        id={id} // 等价于 v-bind
        className={`${className} btn1`} // 等价于 v-bind
        type="button"
        style={style}
        onClick={(ev) => counter(ev)}
      >
        {"btn"}
      </button>

      <div dangerouslySetInnerHTML={{ __html: htmlSnippet }}></div>

      <div style={rowStyle}>
        <div style={itemStyle}>
          <ul>
            {arr.map((item) => {
              // key: 数值或字符串
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>

        <div style={itemStyle}>
          使用与预算符或三目运算符的条件渲染
          {cond && <p>renderIfTrue</p>}
          {cond ? <span>spanA</span> : <span>spanB</span>}
        </div>

        {/************************* Hooks *************************/}
        <UseState />
      </div>
    </>
  );
}
