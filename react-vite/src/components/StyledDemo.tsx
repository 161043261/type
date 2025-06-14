import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const Button = styled.button<{ success?: boolean }>`
  ${(_props) =>
    _props.success ? "background: lightblue" : "background: lightgreen"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 30px;
`;

// styled 继承
const ErrorButton = styled(Button)`
  background: lightpink;
`;

const LinkButton = styled(Button)`
  text-decoration: underline;
  background: transparent;
`;

// styled 属性
const Input = styled.input.attrs({
  type: "number",
  defaultValue: 1,
})`
  margin-top: 10px;
`;

const Input2 = styled.input.attrs<{ defaultValue: number }>((props) => {
  return {
    type: "number",
    defaultValue: props.defaultValue,
  };
})`
  margin-top: 10px;
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
  opacity: 100%;
  transform: translateX(0);
}
50% {
  opacity: 10%;
  transform: translateX(300px);
}
100% {
  opacity: 100%;
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

export function CssInJS(props: { children?: ReactNode }) {
  const twArg = "slate";
  const twArg2 = 500;
  // const templateStr = `text-${twArg}-${twArg2}`

  // parser: 模板字符串的解析函数
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function parser(
    templateStrArr: TemplateStringsArray,
    ...insertedValues: any[]
  ) {
    // templateStrArr: ['text-', '-', '']
    // insertedValues: ['slate', 500]
    console.log(templateStrArr, insertedValues);
    return `color: #62748e;`;
  }
  const ret = parser`text-${twArg}-${twArg2}`; // color: #62748e
  console.log(ret);

  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <Button>{props.children ?? "默认文本"}</Button>
      <Button success>{props.children ?? "成功文本"}</Button>
      <ErrorButton>{props.children ?? "失败文本"}</ErrorButton>
      <LinkButton>{props.children ?? "链接文本"}</LinkButton>
      <Input defaultValue={30}></Input>
      <Input2 defaultValue={30}></Input2>
      {/* 注册全局样式 */}
      <GlobalStyle></GlobalStyle>
      {createPortal(<Box></Box>, document.body)}
    </main>
  );
}
