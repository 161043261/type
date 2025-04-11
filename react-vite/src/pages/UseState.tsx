import { useState } from "react";

export default function UseStateDemo() {
  const [curVal, setCurVal] = useState(0);
  const handleClick = () => {
    setCurVal(curVal + 1);
    setCurVal(curVal + 1);
    setCurVal(curVal + 1);
    console.log("handleClick:", curVal); // 0
  };

  const handleClick2 = () => {
    setCurVal((preVal /** 1 */) => preVal + 1);
    setCurVal((preVal /** 2 */) => preVal + 1);
    setCurVal((preVal /** 3 */) => preVal + 1);
    console.log("handleClick2:", curVal); // 1
  };

  return (
    <>
      <h1>Current Value: {curVal}</h1>
      {/* Click first */}
      <button onClick={handleClick}>curVal += 1</button>
      {/* Click second */}
      <button onClick={handleClick2}>curVal += 3</button>
    </>
  );
}
