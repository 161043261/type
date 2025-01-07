/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "10px",
  width: "30vw",
};

export function UseState() {
  let cnt = 0;
  // >>>
  const [reactiveCnt /* number */, setReactiveCnt /* function */] = useState(0);
  // <<<
  const clickHandler = () => {
    cnt++;
    setReactiveCnt(reactiveCnt + 1);
    console.log(cnt, reactiveCnt);
  };
  return (
    <div style={itemStyle}>
      <p>cnt {cnt}</p>
      <p>reactiveCnt {reactiveCnt}</p>
      <button type="button" onClick={clickHandler}>
        counter++;
      </button>
    </div>
  );
}
