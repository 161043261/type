/* eslint-disable @typescript-eslint/no-explicit-any */
//! js 插值 ${}
//! vue 插值 {{}}
//! jsx 插值 {}

// css-module
import styled from "./app.module.scss";
console.log("styled:", styled);
import { UseStatePrimary } from "./hooks/UseStatePrimary.tsx";
import { UseStateArr } from "./hooks/UseStateArr.tsx";
import { UseStateObj } from "./hooks/UseStateObj.tsx";
import { UseReducerDemo } from "./hooks/UseReducerDemo.tsx";
import { UseReducerDemo2 } from "./hooks/UseReducerDemo2.tsx";
import { UseSyncExternalStoreDemo } from "./hooks/UseSyncExternalStoreDemo.tsx";
import { UseSyncExternalStoreDemo2 } from "./hooks/UseSyncExternalStoreDemo2.tsx";
import { UseTransitionAntd } from "./hooks/UseTransitionAntd.tsx";
import { UseDeferredValueAntd } from "./hooks/UseDeferredValueAntd.tsx";
import { UseEffectDemo } from "./hooks/UseEffectDemo.tsx";
import { UseLayoutEffectDemo } from "./hooks/UseLayoutEffectDemo.tsx";
import { UseLayoutEffectDemo2 } from "./hooks/UseLayoutEffectDemo2.tsx";
import { UseLayoutEffectDemo3 } from "./hooks/UseLayoutEffectDemo3.tsx";
import { UseRefDemo } from "./hooks/UseRefDemo.tsx";
import { UseRefDemo2 } from "./hooks/UseRefDemo2.tsx";
import { UseRefDemo3 } from "./hooks/UseRefDemo3.tsx";
import { UseImperativeHandleDemo2 } from "./hooks/UseImperativeHandleDemo2.tsx";
import { UseImperativeHandleDemo } from "./hooks/UseImperativeHandleDemo.tsx";
import { UseImperativeHandleDemo3 } from "./hooks/UseImperativeHandleDemo3.tsx";
import { UseContextDemo } from "./hooks/UseContextDemo.tsx";
import { MemoDemo } from "./hooks/MemoDemo.tsx";
import { UseMemoDemo } from "./hooks/UseMemoDemo.tsx";
import { UseCallbackDemo } from "./hooks/UseCallbackDemo.tsx";
import { UseCallbackDemo2 } from "./hooks/UseCallbackDemo2.tsx";
import Card from "./components/Card/index.tsx";
import CardBro from "./components/CardBro/index.tsx";
import { UseDebugValueDemo } from "./hooks/UseDebugValueDemo.tsx";
import { UseIdDemo } from "./hooks/UseIdDemo.tsx";
import { ComponentDemo } from "./components/Demo.tsx";
import { CreatePortalDemo } from "./apis/CreatePortalDemo.tsx";
import { Toast } from "./apis/CreatePortalDemo2.tsx";
import { CssInJS } from "./components/StyledDemo.tsx";

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
