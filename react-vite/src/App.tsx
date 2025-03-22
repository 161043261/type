/* eslint-disable @typescript-eslint/no-explicit-any */
//! js 插值 ${}
//! vue 插值 {{}}
//! jsx 插值 {}

// css-module
import styled from "./app.module.scss";
console.log("styled:", styled);
import { UseStatePrimary } from "./hooks/useState_primary.tsx";
import { UseStateArr } from "./hooks/useState_arr.tsx";
import { UseStateObj } from "./hooks/useState_obj.tsx";
import { UseReducerDemo } from "./hooks/useReducer_demo.tsx";
import { UseReducerDemo2 } from "./hooks/useReducer_demo2.tsx";
import { UseSyncExternalStoreDemo } from "./hooks/useSyncExternalStore_demo.tsx";
import { UseSyncExternalStoreDemo2 } from "./hooks/useSyncExternalStore_demo2.tsx";
import { UseTransitionAntd } from "./hooks/useTransition_antd.tsx";
import { UseDeferredValueAntd } from "./hooks/useDeferredValue_antd.tsx";
import { UseEffectDemo } from "./hooks/useEffect_demo.tsx";
import { UseLayoutEffectDemo } from "./hooks/useLayoutEffect_demo.tsx";
import { UseLayoutEffectDemo2 } from "./hooks/useLayoutEffect_demo2.tsx";
import { UseLayoutEffectDemo3 } from "./hooks/useLayoutEffect_demo3.tsx";
import { UseRefDemo } from "./hooks/useRef_demo.tsx";
import { UseRefDemo2 } from "./hooks/useRef_demo2.tsx";
import { UseRefDemo3 } from "./hooks/useRef_demo3.tsx";
import { UseImperativeHandleDemo2 } from "./hooks/useImperativeHandle_demo2.tsx";
import { UseImperativeHandleDemo } from "./hooks/useImperativeHandle_demo.tsx";
import { UseImperativeHandleDemo3 } from "./hooks/useImperativeHandle_demo3.tsx";
import { UseContextDemo } from "./hooks/useContext_demo.tsx";
import { MemoDemo } from "./hooks/memo_demo.tsx";
import { UseMemoDemo } from "./hooks/useMemo_demo.tsx";
import { UseCallbackDemo } from "./hooks/useCallback_demo.tsx";
import { UseCallbackDemo2 } from "./hooks/useCallback_demo2.tsx";
import Card from "./components/card/index.tsx";
import CardBro from "./components/card_bro/index.tsx";
import { UseDebugValueDemo } from "./hooks/useDebugValue_demo.tsx";
import { UseIdDemo } from "./hooks/useID_demo.tsx";
import { ComponentDemo } from "./components/demo.tsx";
import { CreatePortalDemo } from "./apis/createPortal_demo.tsx";
import { Toast } from "./apis/createPortal_demo2.tsx";
import { CssInJS } from "./components/styled_demo.tsx";

export default function App() {
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
        <div className="itemStyle">
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

        <CreatePortalDemo></CreatePortalDemo>
        <Toast message={"Toast 消息"}>
          {/* children[0], header */}
          <div>Toast 顶部</div>
          {/* children[1], footer */}
          <div>Toast 底部</div>
        </Toast>

        <CssInJS>这是 styled</CssInJS>
      </div>
    </>
  );
}
