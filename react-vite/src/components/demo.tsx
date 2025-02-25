// 受控组件, 非受控组件
import { itemStyle } from "../constants.ts";
import { ChangeEvent, useRef, useState } from "react";

export const ComponentDemo: React.FC = () => {
  const [value, setValue] = useState("value");

  const value2 = "value2";
  const iptRef = useRef<HTMLInputElement>(null);
  const handleChange = () => {
    // 操作原生 DOM 获取值
    console.log(iptRef.current?.value);
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    console.log(fileRef.current?.files);
  };
  return (
    <main style={{ ...itemStyle, display: "flex", flexDirection: "column" }}>
      受控组件: 数据双向绑定
      <input
        value={value}
        type="text"
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setValue(ev.target.value)
        }
      />
      <div>value: {value}</div>
      非受控组件: 不是响应式数据, 操作原生 DOM 获取值
      <input defaultValue={value2} ref={iptRef} onChange={handleChange} />
      特殊的非受控组件: input type="file", 文件上传
      <input type="file" ref={fileRef} onChange={handleUpload} />
    </main>
  );
};
