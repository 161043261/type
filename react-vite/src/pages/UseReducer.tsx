import { useReducer } from "react";

export function UseReducerDemo() {
  const initialState = { cnt: 0 };
  type TState = typeof initialState;

  // reducer 更新状态的函数
  const reducer = (
    state: TState,
    action: { type: "add" | "sub"; delta: number },
  ) => {
    console.log("reducer:", action);
    switch (action.type) {
      case "add":
        return { cnt: state.cnt + action.delta }; // 必须返回新对象, 不能修改原对象
      case "sub":
        return { cnt: state.cnt - action.delta }; // 必须返回新对象, 不能修改原对象
      default:
        return state;
    }
  };

  // 初始化函数, 只执行 1 次
  const initializer = (state: TState) => {
    console.log("initializer:", state);
    state.cnt++;
    return state;
  };

  const [cntState /* state */, dispatch] = useReducer(
    reducer,
    initialState,
    initializer, // 可选参数, 默认 (initialState) => initialState;
  );
  return (
    <>
      <div>
        <p>useReducer cnt: {cntState.cnt}</p>
        <button
          type="button"
          onClick={() => dispatch({ type: "add", delta: 1 })}
        >
          add
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "sub", delta: 1 })}
        >
          sub
        </button>
      </div>
    </>
  );
}
