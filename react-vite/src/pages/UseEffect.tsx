import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid lightblue;
  border-radius: 10px;
  padding: 5px;
`;

const UseEffectDemo: React.FC = () => {
  const sectionDemo = document.getElementById("section-demo");
  console.log("sectionDemo:", sectionDemo); // sectionDemo: null

  const [cnt, setCnt] = useState(0);
  const [name, setName] = useState("");
  const [showChild, setShowChild] = useState(true);

  useEffect(
    () => {
      const demoSection = document.getElementById(
        "section-demo",
      ) as HTMLElement;
      console.log("[effect] demoSection:", demoSection);
      demoSection.style.color = "red";
    } /** effect */,
    [cnt] /** dependency */,
  );

  const Child: React.FC<{ name: string }> = ({ name }) => {
    const sectionDemo = document.getElementById("section-demo");
    console.log("sectionDemo:", sectionDemo); // sectionDemo: null

    useEffect(
      () => {
        console.log("effect: onMounted, name:", name);
        const sectionChildDemo = document.getElementById("section-child-demo");
        console.log("[effect] sectionChildDemo:", sectionChildDemo);
        const timer = setTimeout(() => {
          fetch("http://localhost:5173?name=" + name);
        }, 1000);

        const destructor = () => {
          console.log("[destructor] onUnMounted");
          const sectionChildDemo =
            document.getElementById("section-child-demo");
          console.log("[destructor] sectionChildDemo:", sectionChildDemo);
          clearTimeout(timer); // 防抖
        };
        return destructor;
      } /** effect */,
    );

    return <section id="section-child-demo">I'm child</section>;
  };

  return (
    <StyledDiv>
      <section id="section-demo">Demo Section</section>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        {cnt}++
      </button>
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <hr />
      <button type="button" onClick={() => setShowChild(!showChild)}>
        showChild
      </button>
      {showChild && <Child name={name} />}
    </StyledDiv>
  );
};

export default UseEffectDemo;
