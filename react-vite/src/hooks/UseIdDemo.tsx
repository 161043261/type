import { useId } from "react";
import { itemStyle } from "../constants.ts";

export const UseIdDemo: React.FC = () => {
  const id = useId();
  const inputId = useId();
  console.log("id -->", id, "inputId -->", inputId);
  // id --> :r0: inputId --> :r1:
  // id --> :r2: inputId --> :r3:
  return (
    <main style={itemStyle}>
      <label htmlFor={inputId}>输入框</label>
      <input type="text" id={inputId}></input>
    </main>
  );
};
