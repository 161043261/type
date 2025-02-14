/* eslint-disable @typescript-eslint/no-explicit-any */
//! js 插值 ${}
//! vue 插值 {{}}
//! jsx 插值 {}

// css-module
import styled from "./app.module.scss";
console.log("styled:", styled);
import { UseStatePrimary } from "./hook/useState_primary";
import { UseStateArr } from "./hook/useState_arr";
import { UseStateObj } from "./hook/useState_obj";
import { UseReducerDemo } from "./hook/useReducer_demo";
import { UseReducerDemo2 } from "./hook/useReducer_demo2";
import { UseSyncExternalStoreDemo } from "./hook/useSyncExternalStore_demo";
import { UseSyncExternalStoreDemo2 } from "./hook/useSyncExternalStore_demo2";
import { UseTransitionAntd } from "./hook/useTransition_antd";
import { UseDeferredValueAntd } from "./hook/useDefferedValue_antd";
import { UseEffectDemo } from "./hook/useEffect_demo";
import { UseEffectDemo2 } from "./hook/useEffect_demo2";
import { UseLayoutEffectDemo } from "./hook/useLayoutEffect_demo";
import { UseLayoutEffectDemo2 } from "./hook/useLayoutEffect_demo2";
import { UseLayoutEffectDemo3 } from "./hook/useLayoutEffect_demo3";
import { UseRefDemo } from "./hook/useRef_demo";
import { UseRefDemo2 } from "./hook/useRef_demo2";
import { UseRefDemo3 } from "./hook/useRef_demo3";
import { UseImperativeHandleDemo2 } from "./hook/useImperativeHandle_demo2";
import { UseImperativeHandleDemo } from "./hook/useImperativeHandle_demo";
import { UseImperativeHandleDemo3 } from "./hook/useImperativeHandle_demo3";
import { UseContextDemo } from "./hook/useContext_demo";
import { MemoDemo } from "./hook/memo_demo";
import { UseMemoDemo } from "./hook/useMemo_demo";
import { UseCallbackDemo } from "./hook/useCallback_demo";
import { UseCallbackDemo2 } from "./hook/useCallback_demo2";
import Card from "./components/Card";
import CardBro from "./components/CardBro";
import { UseDebugValueDemo } from "./hook/useDebugValue_demo.tsx";
import { UseIdDemo } from "./hook/useID_demo.tsx";
import { ComponentDemo } from "./components/demo.tsx";

export function App() {
  // jsx 插值: 支持数字, 字符串, 基本类型数组, html 元素, 表达式; 不支持对象
  // 属性, 事件: 驼峰命名
  const counter = (arg: any) => {
    console.log(arg);
  };

  // 泛型函数: 加逗号
  const _fn = <T,>(arg: T) => {
    console.log(arg);
  };
  _fn("Hello Seattle, I am a mountaineer");

  //! return (
  //!   // 这里, arg 是事件对象
  //!   <button type="button" onClick={counter}>
  //!     {"App"}
  //!   </button>
  //! );

  // return (
  //   // 需要传递参数时, 会立即调用
  //   // <button type="button" onClick={counter(1)}>
  //   // 解决: 使用高阶函数
  //   <button type="button" onClick={() => counter(1)}>
  //     {"App"}
  //   </button>
  // );

  // 传递事件对象
  // 绑定 id, className, 等价于 v-bind
  const id = "btn1";
  const className = "primary-btn";

  const rowStyle = {
    display: "flex",
    justifyContent: "space-around",
    height: "200px",
  };

  const itemStyle = {
    border: "1px solid lightblue",
    borderRadius: "10px",
    padding: "5px",
  };

  // 指定 html 代码片段, 等价于 v-html
  const htmlSnippet = `<p>v-html</p>`;

  // 遍历数组, 等价于 v-for
  const arr = ["Vue", "React", "Angular"];

  const cond = true;
  return (
    <>
      <button
        id={id} // 等价于 v-bind
        className={`${className} btn1`} // 等价于 v-bind
        type="button"
        onClick={(ev) => counter(ev)}
      >
        {"btn"}
      </button>

      <div dangerouslySetInnerHTML={{ __html: htmlSnippet }}></div>

      <div className={styled.rowStyle}>
        <div className={styled.itemStyle}>
          {/*<div style={rowStyle}>*/}
          {/*  <div style={itemStyle}>*/}
          <ul>
            {arr.map((item) => {
              // key: 数值或字符串
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>

        <div style={itemStyle}>
          条件渲染
          {cond && <p>renderIfTrue</p>}
          {cond ? <span>spanA</span> : <span>spanB</span>}
        </div>

        <UseStatePrimary />
        <UseStateArr />
        <UseStateObj />
        <UseReducerDemo />
        <UseReducerDemo2 />
      </div>

      <div style={rowStyle}>
        <UseSyncExternalStoreDemo />
        <UseSyncExternalStoreDemo2 />
        <UseTransitionAntd />
        <UseDeferredValueAntd />
      </div>

      <div style={rowStyle}>
        <UseEffectDemo />
        <UseEffectDemo2 />
        <UseLayoutEffectDemo />
        <UseLayoutEffectDemo2 />
        <UseLayoutEffectDemo3 />
      </div>

      <div style={rowStyle}>
        <UseRefDemo />
        <UseRefDemo2 />
        <UseRefDemo3 />
        <UseImperativeHandleDemo />
        <UseImperativeHandleDemo2 />
        <UseImperativeHandleDemo3 />
      </div>

      <div style={rowStyle}>
        <UseContextDemo />
        <MemoDemo />
        <UseMemoDemo />
        <UseCallbackDemo />
        <UseCallbackDemo2 />
      </div>

      <div style={rowStyle}>
        <UseDebugValueDemo />
        <UseIdDemo />

        <div style={itemStyle}>
          <button type="button" onClick={() => window.msgPrompt()}>
            msgPrompt
          </button>
        </div>

        <Card title={"主标题"} cb={(arg: string) => console.log(arg)}>
          <div>props.children</div>
          <div>类似 Vue 的插槽 slot</div>
        </Card>

        <CardBro title={"兄弟组件"}></CardBro>
        <ComponentDemo></ComponentDemo>
      </div>
    </>
  );
}
