import { createRoot } from "react-dom/client";

function Logo() {
  return <img src="react.svg" alt="react" />;
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

import { App } from "./App";
const app = document.getElementById("root")!;
createRoot(app).render(<App />);
