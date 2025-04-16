// 受控组件, 非受控组件
import { itemStyle } from "../constants.ts";
import { ChangeEvent, useRef, useState } from "react";
import { Modal } from "./Modal/index.tsx";

export const ComponentDemo: React.FC = () => {
  const [value, setValue] = useState("value");
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    // 操作 DOM 获取值
    setValue(ev.target.value);
  };

  const value2 = "value2";
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange2 = () => {
    console.log(inputRef.current?.value);
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    console.log(fileRef.current?.files);
  };

  const [isAlive, setAlive] = useState(false);
  return (
    <main style={{ ...itemStyle, display: "flex", flexDirection: "column" }}>
      <div>value: {value}</div>
      {/* 受控组件: 使用 useState 实现数据双向绑定 */}
      <input type="text" value={value} onChange={handleChange} />
      <div>value2: {value2}</div>
      {/* 非受控组件: 使用 useRef 操作 DOM 获取值 */}
      <input
        type="text"
        defaultValue={value2}
        ref={inputRef}
        onChange={handleChange2}
      />
      <input type="file" ref={fileRef} onChange={handleUpload} />

      <div>
        <button type="button" onClick={() => setAlive(!isAlive)}>setAlive</button>
        {isAlive && <Modal />}
      </div>
    </main>
  );
};
