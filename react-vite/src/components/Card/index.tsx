import { ReactNode } from "react";
import "./index.css";

interface Props {
  title?: string;
  children?: ReactNode; // props.children 类似 Vue 的插槽
  cb?: (arg: string) => void; // callback
}

declare global {
  interface Event {
    params: { name: string };
  }
}

export default function CardBro(props: Props) {
  ////////////////////////////////////////////
  //! 事件发送方
  // 创建自定义事件
  const ev = new Event("card-onClick");
  const sendToRight = () => {
    ev.params = { name: "whoami" };
    window.dispatchEvent(ev);
  };
  ////////////////////////////////////////////
  // 解构赋值时, 指定默认值
  const { title = "默认标题" } = props;
  console.log(props.children);
  if (props.cb) {
    props.cb("子传父");
  }
  return (
    <div className="card">
      <header>
        <div>{title}</div>
        <div>副标题</div>
      </header>
      <main>{props.children}</main>
      <footer>
        <button type="button" onClick={() => props.cb && props.cb("子传父")}>
          子传父
        </button>
        <button type="button" onClick={sendToRight}>
          兄弟通信
        </button>
      </footer>
    </div>
  );
}
