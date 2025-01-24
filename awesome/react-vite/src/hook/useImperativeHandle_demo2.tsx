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
  const [flag, setFlag] = useState(false);
  // defineExpose
  useImperativeHandle(
    ref,
    () => {
      console.log("[useImperativeHandle_demo2] Child is rendering");
      return {
        name: "child",
        cnt,
        addCnt: () => setCnt(cnt + 1),
        subCnt: () => setCnt(cnt - 1),
      };
    } /* dependencies */,
  );

  return (
    <div>
      <p>Child</p>
      <div>flag: {flag ? "true" : "false"}</div>
      <div>cnt: {cnt}</div>
      <button type="button" onClick={() => setFlag(!flag)}>
        setFlag
      </button>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        addCnt
      </button>
      <button type="button" onClick={() => setCnt(cnt - 1)}>
        subCnt
      </button>
    </div>
  );
});

export function UseImperativeHandleDemo2() {
  const childRef = useRef<ChildRef>(
    null, // initialValue
    // React18 中, initialValue 不是必传的
    // React19 中, initialValue 是必传的
  );
  const printChildRef = () => {
    console.log(childRef.current);
  };
  return (
    <div style={itemStyle}>
      <p>Parent</p>
      <button type="button" onClick={printChildRef}>
        printChildRef
      </button>
      <button type="button" onClick={() => childRef.current?.addCnt()}>
        addCnt
      </button>
      <button type="button" onClick={() => childRef.current?.subCnt()}>
        subCnt
      </button>
      <Child ref={childRef}></Child>
    </div>
  );
}
