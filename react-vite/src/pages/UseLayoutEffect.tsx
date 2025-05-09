import { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

const Block = styled.div`
  width: 200px;
  height: 200px;
  background: lightpink;
  opacity: 0;
  transition: opacity 5s;
`;

const Block2 = styled(Block)`
  background: lightblue;
  position: absolute;
  top: 300px;
`;

export function UseLayoutEffectDemo() {
  useEffect(() => {
    const block = document.getElementById("block")!;
    block.style.opacity = "1"; // 不透明度
  }, []);

  useLayoutEffect(() => {
    const block2 = document.getElementById("block2")!;
    block2.style.opacity = "1"; // 不透明度
  });

  return (
    <div>
      <Block id="block">block</Block>
      <Block2 id="block2">block2</Block2>
    </div>
  );
}
