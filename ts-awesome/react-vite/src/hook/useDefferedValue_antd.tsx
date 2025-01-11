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
export function UseDefferedValueAntd() {
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
  const defferedVal = useDeferredValue(val);
  const isStale /* isOld */ = defferedVal !== val;
  const findItem = () => {
    // useDeferredValue 也类似防抖 (debounce): 连续触发事件, n 秒内函数只执行最后 1 次 (回城)
    // 输入框, 用户连续输入 1, 2, 3
    // useDefferedValue 不会对 1 搜索一次, 对 12 搜索一次, 对 123 再搜索一次
    // 而是延迟的只对 123 搜索一次, 性能优化

    // useDefferedValue 不是防抖, 防抖有确定的延迟时间
    // useDefferedValue 没有确定的延迟时间, 而是根据设备的情况, 延迟某些状态的更新, 如果设备情况好, 那么延迟几乎是无感的
    console.log("val:", val);
    console.log("defferedVal:", defferedVal);
    console.log("isStale:", isStale);
    return list.filter((item) => item.name.toString().includes(defferedVal)); // 搜索
  };
  return (
    <div style={itemStyle}>
      <Input value={val} onChange={(e) => setVal(e.target.value)}></Input>
      <List
        style={{
          opacity: isStale ? 0.1 : 1,
          // ease-in-out 慢 -> 快 -> 慢
          // chrome: 检查 -> 性能 -> CPU: 4 倍降速
          transition: "opacity 1s ease-in-out",
        }}
        dataSource={findItem()}
        renderItem={(item: Item) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={item.address}
            ></List.Item.Meta>
          </List.Item>
        )}
      ></List>
    </div>
  );
}
