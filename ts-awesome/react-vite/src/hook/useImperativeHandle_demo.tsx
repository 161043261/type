import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  overflow: "auto",
};

interface ChildRef {
  name: string;
  cnt: number;
  addCnt: () => void;
  subCnt: () => void;
}

const Child = forwardRef<ChildRef>((_props, ref) => {
  const [cnt, setCnt] = useState(0);

  // defineExpose
  useImperativeHandle(ref, () => {
    return {
      name: "child",
      cnt,
      addCnt: () => setCnt(cnt + 1),
      subCnt: () => setCnt(cnt - 1),
    };
  });

  return (
    <div>
      <p>Child</p>
      <div>cnt: {cnt}</div>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        addCnt
      </button>
      <button type="button" onClick={() => setCnt(cnt - 1)}>
        subCnt
      </button>
    </div>
  );
});

export function UseImperativeHandleDemo() {
  const childRef = useRef<ChildRef>(null);
  const printRef = () => {
    console.log(childRef.current);
  };
  return (
    <div style={itemStyle}>
      <p>Parent</p>
      <button type="button" onClick={printRef}>
        printRef
      </button>
      <button type="button" onClick={() => childRef.current?.addCnt()}>
        addCnt
      </button>
      <button type="button" onClick={() => childRef.current?.subCnt()}>
        subCnt
      </button>
      <hr />
      <Child ref={childRef}></Child>
    </div>
  );
}
