import { useImperativeHandle, useRef, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  overflow: "auto",
};

interface ChildRef {
  cnt: number;
  addCnt: () => void;
}

const Child = ({ ref }: { ref: React.Ref<ChildRef> }) => {
  const [cnt, setCnt] = useState(0);
  const [flag, setFlag] = useState(false);
  // 类似 Vue 的 defineExpose
  useImperativeHandle(ref, () => {
    console.log("Invoke createHandle");
    return {
      cnt,
      addCnt: () => setCnt(cnt + 1),
    }; // createHandle
  }, [cnt]);

  return (
    <div>
      <div>flag: {flag ? "true" : "false"}</div>
      <div>cnt: {cnt}</div>
      <button type="button" onClick={() => setFlag(!flag)}>
        setFlag
      </button>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        addCnt
      </button>
    </div>
  );
};

export function UseImperativeHandleDemo2() {
  const childRef = useRef<ChildRef>(null);
  const printChildRef = () => {
    console.log(childRef.current);
  };
  return (
    <div style={itemStyle}>
      <button type="button" onClick={printChildRef}>
        printChildRef
      </button>
      <button type="button" onClick={() => childRef.current?.addCnt()}>
        addCnt
      </button>
      <Child ref={childRef}></Child>
    </div>
  );
}
