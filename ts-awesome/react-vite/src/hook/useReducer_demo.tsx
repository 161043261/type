import { useReducer, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseReducerDemo() {
  //// useState
  const [stateCnt, setStateCnt] = useState(0);

  //// useReducer
  const initializerArg = {
    cnt: 0,
  };
  type TState = typeof initializerArg;
  //! 通过 dispatch 触发 reducer
  //! dispatch(action) { reducer(state, action) }
  const reducer = (state: TState, action: { type: "add" | "sub" }) => {
    // console.log("reducer:", action);
    // useReducer: 集中式状态管理
    switch (action.type) {
      case "add":
        return { cnt: state.cnt + 1 }; // 必须返回新对象, 不能修改原对象
      case "sub":
        return { cnt: state.cnt - 1 }; // 必须返回新对象, 不能修改原对象
      default:
        return state;
    }
  };
  // 初始化函数, 只执行 1 次
  const initializer = (state: TState) => {
    console.log("initializer:", state);
    return state;
  };
  //! 通过 dispatch 触发 reducer
  //! dispatch(action) { reducer(state, action) }
  const [reducerCnt /* state */, dispatch] = useReducer(
    reducer,
    initializerArg,
    initializer, // 可选参数, 默认 (initializerArg) => initializerArg;
  );

  return (
    <>
      <div style={itemStyle}>
        <button type="button" onClick={() => setStateCnt(stateCnt + 1)}>
          +1
        </button>
        <button type="button" onClick={() => setStateCnt(stateCnt - 1)}>
          -1
        </button>
        <p>useState cnt1: {stateCnt}</p>
        <button type="button" onClick={() => dispatch({ type: "add" })}>
          add
        </button>
        <button type="button" onClick={() => dispatch({ type: "sub" })}>
          sub
        </button>
        <p>useReducer cnt2: {reducerCnt.cnt}</p>
      </div>
    </>
  );
}
