import { useMemo, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseMemoDemo() {
  const [search, setSearch] = useState("");
  const [goods, setGoods] = useState([
    { id: 1, name: "good1", price: 10, cnt: 1 },
    { id: 2, name: "good2", price: 20, cnt: 2 },
    { id: 3, name: "good3", price: 30, cnt: 3 },
  ]);

  const addHandler = (id: number) => {
    setGoods(
      goods.map((item) =>
        item.id === id ? { ...item, cnt: item.cnt + 1 } : item,
      ),
    );
  };

  const subHandler = (id: number) => {
    setGoods(
      goods.map((item) =>
        item.id === id ? { ...item, cnt: item.cnt - 1 } : item,
      ),
    );
  };

  // 输入框的内容改变时, total 也会重新计算
  // const total = () => {
  //   console.log("Computing");
  //   return goods.reduce((acc, item) => acc + item.price * item.cnt, 0);
  // };

  //! 使用 useMemo, 仅当依赖项改变时才会重新计算, 类似 Vue 的 computed 计算属性
  const total = useMemo(
    () => {
      console.log("Computing");
      return goods.reduce((acc, item) => acc + item.price * item.cnt, 0);
    },
    [goods] /* dependencies */,
  );

  return (
    <div style={itemStyle}>
      <input
        type="text"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>cnt</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price * item.cnt}</td>
              <td>
                <span>{item.cnt}</span>
                <button type="button" onClick={() => addHandler(item.id)}>
                  +
                </button>
                <button type="button" onClick={() => subHandler(item.id)}>
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>total: {total}</p>
    </div>
  );
}
