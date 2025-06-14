import { useRef } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  overflow: "auto",
};

const Child = ({ ref }: { ref: React.Ref<HTMLDivElement> } /** props */) => {
  return <div ref={ref}>Child</div>;
};

// 父组件中获取子组件中的 DOM 元素
export function UseImperativeHandleDemo() {
  const childRef = useRef<HTMLDivElement>(null /** initialVal */);
  const getChildDOM = () => {
    console.log(childRef.current);
  };
  return (
    <div style={itemStyle}>
      <button type="button" onClick={getChildDOM}>
        获取子组件的 DOM 节点
      </button>
      <Child ref={childRef} />
    </div>
  );
}
