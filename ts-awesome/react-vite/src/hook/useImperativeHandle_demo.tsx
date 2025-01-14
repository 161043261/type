import { forwardRef, useRef } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  overflow: "auto",
};

const Child = forwardRef<HTMLParagraphElement>((_props, ref) => {
  return (
    <div>
      <p ref={ref}>Child</p>
    </div>
  );
});

// 父组件中获取子组件中的 DOM 元素
export function UseImperativeHandleDemo() {
  const childRef = useRef<HTMLParagraphElement>(
    null, // initialValue
    // React18 中，initialValue 不是必传的
    // React19 中，initialValue 是必传的
  );
  const getChildDOM = () => {
    console.log(childRef.current);
  };
  return (
    <div style={itemStyle}>
      <p>Parent</p>
      <button type="button" onClick={getChildDOM}>
        获取子组件中的 DOM
      </button>
      <hr />
      <Child ref={childRef} />
    </div>
  );
}
