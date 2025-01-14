import { Ref, useRef } from 'react';

const itemStyle = {
  border: '1px solid lightblue',
  borderRadius: '10px',
  padding: '5px',
  overflow: 'auto',
};

function Child({ ref }: { ref: Ref<HTMLParagraphElement> }) {
  return (
    <div>
      <p ref={ref}>Child</p>
    </div>
  );
}

export function UseImperativeHandleDemo() {
  const childRef = useRef<HTMLParagraphElement>(null);
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
