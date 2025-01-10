import { Input, List } from "antd";
import React, { useState, useTransition } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

interface Item {
  id: number;
  name: string;
  address: string;
}

// chrome: 检查 -> 性能 -> CPU: 4 倍降速
export function UseTransitionAntd() {
  const [val, setVal] = useState("");
  const [list, setList] = useState<Item[]>();
  //! 在不阻塞 UI 的情况下更新状态 state, 用于性能优化
  const [isPending, startTransition] = useTransition();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setVal(newVal);
    fetch("/api/list?keyWord=" + newVal)
      .then((res) => res.json())
      .then((res) => {
        // setList(res.list);
        startTransition(() => {
          setList(res.list); // 在不阻塞 UI 的情况下更新状态 state, 可以提升性能
        });
      });
  };

  return (
    <div style={itemStyle}>
      <Input value={val} onChange={changeHandler}></Input>
      {
        // isPending 为 true 时, 显示 Loading
        isPending && <div>Loading</div>
      }
      <List
        dataSource={list}
        renderItem={(item) => (
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
