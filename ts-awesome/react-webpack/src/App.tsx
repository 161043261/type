//! js 插值 ${}
//! vue 插值 {{}}
//! jsx 插值 {}

import { UseImperativeHandleDemo } from './useImperativeHandle_demo';

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
      </div>
    </>
  );
}
