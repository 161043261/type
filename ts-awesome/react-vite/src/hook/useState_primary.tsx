import { useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseStatePrimary() {
  console.log("渲染组件");
  let cnt = 0;
  // 可以指定范型
  // useState<number>(0);
  const [reactiveCnt /* state */, setReactiveCnt /* dispatch */] = useState(0);
  const clickHandler = () => {
    cnt++;
    //! dispatch 异步更新, 可以提升性能
    //! 每次 +2
    // setReactiveCnt(reactiveCnt + 1);
    // setReactiveCnt(reactiveCnt + 2); // 异步, 后执行
    //! 每次 +3
    setReactiveCnt((prev) => prev + 1); // 异步, 后执行
    setReactiveCnt((prev) => prev + 2); // 异步, 后执行
    console.log(`cnt: ${cnt}, reactiveCnt: ${reactiveCnt}`); // 同步, 先执行
  };
  return (
    <div style={itemStyle}>
      <p>cnt: {cnt}</p>
      <p>reactiveCnt: {reactiveCnt}</p>
      <button type="button" onClick={clickHandler}>
        counter++
      </button>
    </div>
  );
}
