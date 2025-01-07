/* eslint-disable @typescript-eslint/no-explicit-any */
// js 插值 ${}
// vue 插值 {{}}
// jsx 插值 {}

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

  // return (
  //   // 这里，arg 是事件对象
  //   <button type="button" onClick={counter}>
  //     {"App"}
  //   </button>
  // );

  // return (
  //   // 立即调用
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

  // 指定 html 代码片段，等价于 v-html
  const htmlSnippet = `<p>dangerouslySetInnerHTML</p>`;

  // 遍历数组，等价于 v-for
  const arr = ["item1", "item2", "item3"];
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
      
      <div>
        {arr.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
    </>
  );
}
