//! js 插值 ${}
//! vue 插值 {{}}
//! jsx 插值 {}

import { UseImperativeHandleDemo } from './useImperativeHandle_demo';
import { UseImperativeHandleDemo2 } from './useImperativeHandle_demo2';
import { UseImperativeHandleDemo3 } from './useImperativeHandle_demo3';

export function App() {
  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    height: '200px',
  };

  return (
    <>
      <div style={rowStyle}>
        <UseImperativeHandleDemo />
        <UseImperativeHandleDemo2 />
        <UseImperativeHandleDemo3/>
      </div>
    </>
  );
}
