import { Input, List } from "antd";
import { useDeferredValue, useState } from "react";
import mockjs from "mockjs";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  overflow: "auto",
};

interface Item {
  id: number;
  name: number;
  address: string;
}

// chrome: 检查 -> 性能 -> CPU: 4 倍降速
export function UseDeferredValueAntd() {
  const [val, setVal] = useState("");
  const list: Item[] = mockjs.mock({
    "addrlist|1000": [
      {
        "id|+1": 1,
        name: "@natural", // 数字
        address: "@county(true)",
      },
    ],
  }).addrlist;
  console.log(list.length);
  const deferredVal = useDeferredValue(val);
  const isDeferred = deferredVal !== val;
  const findItem = () => {
    // useTransition, useDeferredValue 都有类似防抖 (debounce) 的功能: 连续触发事件, n 秒内函数只执行最后 1 次
    // 输入框, 用户连续输入 1, 2, 3
    // useDeferredValue 不会对 1 搜索一次, 对 12 搜索一次, 对 123 再搜索一次
    // 而是延迟的只对 123 搜索一次, 性能优化
    console.log("val:", val);
    console.log("deferredVal:", deferredVal);
    console.log("isDeferred:", isDeferred);
    return list.filter((item) => item.name.toString().includes(deferredVal)); // 搜索
  };
  return (
    <div style={itemStyle}>
      <Input value={val} onChange={(e) => setVal(e.target.value)}></Input>
      <List
        style={{
          opacity: isDeferred ? 0.1 : 1,
          // ease-in-out 慢 -> 快 -> 慢
          transition: "opacity 1s ease-in-out",
        }}
        dataSource={findItem()}
        renderItem={(item: Item) => (
          <List.Item>
            <List.Item.Meta title={item.name} description={item.address} />
          </List.Item>
        )}
      />
    </div>
  );
}
