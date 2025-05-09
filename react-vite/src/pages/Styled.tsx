import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Button 的 CSS 类名是 JS 随机生成的, 避免类名冲突
const ColoredBtn = styled.button<{ success?: boolean }>`
  ${(props) =>
    props.success ? "background: lightblue" : "background: lightgreen"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 30px;
`;

// styled 继承
const AnchorBtn = styled(ColoredBtn)`
  text-decoration: underline;
  background: transparent;
`;

// styled 属性
const NumberInput = styled.input.attrs({
  type: "number",
  defaultValue: 1,
})`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
`;

const NumberInput2 = styled.input.attrs<{ defaultValue: number }>((props) => {
  return {
    type: "number",
    defaultValue: props.defaultValue,
  };
})`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
`;

// styled 全局属性
const GlobalStyle = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
}
:root {
  background: azure;
}
`;

// styled 动画
const xMove = keyframes`
0% {
  transform: translateX(0);
}
50% {
  transform: translateX(300px);
}
100% {
  transform: translateX(0);
}
`;

const Box = styled.div`
  position: fixed;
  left: 10%;
  top: 10%;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: lightpink;
  animation: ${xMove} 3s ease infinite;
`;

const StyledDemo: React.FC<{
  children?: ReactNode;
}> = (props) => {
  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <ColoredBtn>{props.children ?? "默认文本"}</ColoredBtn>
      <AnchorBtn success>{props.children ?? "链接文本"}</AnchorBtn>
      <NumberInput></NumberInput>
      <NumberInput2 defaultValue={30}></NumberInput2>
      {/* 注册全局样式 */}
      <GlobalStyle></GlobalStyle>
      {createPortal(<Box></Box>, document.body)}
    </main>
  );
};

export default StyledDemo;
