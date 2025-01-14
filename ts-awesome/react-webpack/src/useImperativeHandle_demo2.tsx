import { Ref, useImperativeHandle, useRef, useState } from 'react';

const itemStyle = {
  border: '1px solid lightblue',
  borderRadius: '10px',
  padding: '5px',
  overflow: 'auto',
};

interface ChildRef {
  name: string;
  cnt: number;
  addCnt: () => void;
  subCnt: () => void;
}

function Child({ ref }: { ref: Ref<ChildRef> }) {
  const [cnt, setCnt] = useState(0);
  const [flag, setFlag] = useState(false);
  useImperativeHandle(ref, () => {
    console.log('Child is rendering');
    return {
      name: 'child',
      cnt,
      addCnt: () => setCnt(cnt + 1),
      subCnt: () => setCnt(cnt - 1),
    };
  }, []);
  return (
    <div>
      <p>Child</p>
      <div>flag: {flag ? 'true' : 'false'}</div>
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
}

export function UseImperativeHandleDemo2() {
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
      <Child ref={childRef}></Child>
    </div>
  );
}
