import { useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseStateObj() {
  const d = new Date();
  // const [obj, setObj] = useState({
  //   date: `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`,
  //   name: "React",
  //   age: 19,
  // });
  //! useState(fn); 函数 fn 返回一个对象, 只执行一次
  const [obj, setObj] = useState(() => {
    const date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    return {
      date,
      name: "React",
      age: 19,
    };
  });
  const clickHandler = () => {
    // setObj({
    //   ...obj,
    //   name: 'Vue' // 覆盖原 name
    // })
    //! Object.assign({}, target, ...sources);
    setObj(Object.assign({}, obj, { name: "Vue" })); // 覆盖原 name
  };
  return (
    <div style={itemStyle}>
      <p>date: {obj.date}</p>
      <p>name: {obj.name}</p>
      <p>age: {obj.age}</p>
      <button type="button" onClick={clickHandler}>
        setObj
      </button>
    </div>
  );
}
