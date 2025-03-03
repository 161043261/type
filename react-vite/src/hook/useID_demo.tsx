import { useId } from "react";
import { itemStyle } from "../constants.ts";

export const UseIdDemo: React.FC = () => {
  const ID = useId();
  const iptID = useId();
  console.log(ID, iptID);
  return (
    <main style={itemStyle}>
      <label htmlFor={iptID}>输入框</label>
      <input type="text" id={iptID}></input>
    </main>
  );
};
