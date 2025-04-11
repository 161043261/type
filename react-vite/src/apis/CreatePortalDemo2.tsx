import { ReactNode } from "react";
import "./CreatePortalDemo.scss";
import { createPortal } from "react-dom";

interface IProps {
  children: [header: ReactNode, footer: ReactNode];
  message: string;
}
export function Toast(props: IProps) {
  return createPortal(
    <main className="toast">
      <header>{props.children[0] ?? "Header"}</header>
      <div>{props.message}</div>
      <footer>{props.children[1] ?? "Footer"}</footer>
    </main>,
    document.body,
  );
}
