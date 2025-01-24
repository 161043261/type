import { useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseStateArr() {
  const [arr, setArr] = useState(["Vue,"]);
  const [readonlyArr, setReadonlyArr] = useState(["Vue,"]);
  const clickHandler = () => {
    arr.push("React,");
    console.log(arr);
    setArr(arr);
    setReadonlyArr([...readonlyArr, "React,"]);
  };
  return (
    <div style={itemStyle}>
      <p>arr: {arr}</p>
      <p>readonlyArr: {readonlyArr}</p>
      <button type="button" onClick={clickHandler}>
        Push 'React'
      </button>
    </div>
  );
}
