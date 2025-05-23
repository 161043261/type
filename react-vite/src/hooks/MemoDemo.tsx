import { memo, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

interface User {
  name: string;
  age: number;
}

const Child = memo((props: { user: User }) => {
  console.log("[memo_demo] Child is rendering");
  const { user } = props;
  return (
    <>
      <p>name: {user.name}</p>
      <p>age: {user.age}</p>
    </>
  );
});

export function MemoDemo() {
  const [inputVal, setInputVal] = useState("");
  const [user, setUser] = useState({
    name: "yuki",
    age: 22,
  });
  return (
    <div style={itemStyle}>
      <input
        type="text"
        value={inputVal}
        onChange={(ev) => setInputVal(ev.target.value)}
      />
      <button
        type="button"
        onClick={() => setUser({ ...user, name: inputVal })}
      >
        更改 user
      </button>
      <Child user={user}></Child>
    </div>
  );
}
