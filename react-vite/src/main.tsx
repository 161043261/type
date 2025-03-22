import { createRoot } from "react-dom/client";
import "./components/msg/index";
import { RouterProvider } from "react-router";
import router from "./router/index.tsx";

function Logo() {
  return <img src="react.svg" alt="react" />;
}

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "space-between",
      }}
    >
      <Logo />
      <h3>React</h3>
    </div>
  );
}

const header = document.getElementById("header")!;
const root = createRoot(header);
root.render(<Header />);

import { StrictMode } from "react";
const app = document.getElementById("root")!;
const root2 = createRoot(app);
root2.render(
  <StrictMode>
    <RouterProvider router={router}>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
    </RouterProvider>
  </StrictMode>,
);
