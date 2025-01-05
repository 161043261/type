import { createRoot } from "react-dom/client";

// React 组件是函数，函数名首字母大写
// 不要在组件中定义组件
function Logo() {
  return <img src="react.svg" alt="react logo" />;
  // return (
  // <img
  //   src="react.svg"
  //   alt="react logo"
  // />
  // );
}

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "space-bewteen",
      }}
    >
      <Logo />
      <h3>N0va Desktop Extractor</h3>
    </div>
  );
}

const header = document.getElementById("header")!;
const root = createRoot(header);
root.render(<Header />);
