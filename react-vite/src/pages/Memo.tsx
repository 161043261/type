import React, { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid lightblue;
  border-radius: 10px;
  padding: 5px;
`;

// 使用 React.memo 包裹子组件, 避免不必要的重新渲染
interface User {
  name: string;
}

const Boy = (props: { user: User }) => {
  console.log("Boy is rendering");
  const { user } = props;
  return <h1>name: {user.name}</h1>;
};

const Girl = React.memo((props: { user: User }) => {
  console.log("Girl is rendering");
  const { user } = props;
  return <h1>name: {user.name}</h1>;
});

export function MemoDemo() {
  const [inputVal, setInputVal] = useState("");
  const [user, setUser] = useState({
    name: "whoami",
  });
  return (
    <StyledDiv>
      <input value={inputVal} onChange={(ev) => setInputVal(ev.target.value)} />
      <button onClick={() => setUser({ ...user, name: inputVal })}>
        更改 user
      </button>
      <Boy user={user}></Boy>
      <Girl user={user}></Girl>
    </StyledDiv>
  );
}
