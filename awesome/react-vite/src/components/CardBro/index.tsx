import { FC, ReactNode } from "react";
import "../Card/index.css"; // .card
import "./index.css"; // .bro

interface Props {
  title?: string;
  children?: ReactNode; // props.children 类似 Vue 的插槽
  cb?: (arg: string) => void;
}

//! FC: Function Component
const CardBro: FC<Props> = (props: Props) => {
  ////////////////////////////////////////////
  //! 事件接收方
  window.addEventListener("card-onClick", (ev) => {
    console.log(ev.params);
  });
  ////////////////////////////////////////////
  // 解构赋值时, 指定默认值
  const { title = "默认标题" } = props;
  console.log(props.children);
  if (props.cb) {
    props.cb("子传父");
  }
  return (
    <div className="card bro">
      <header>
        <div>{title}</div>
        <div>副标题</div>
      </header>
      <main>{props.children}</main>
      <footer>
        <button type="button" onClick={() => props.cb && props.cb("子传父")}>
          子传父
        </button>
        <button type="button">兄弟通信</button>
      </footer>
    </div>
  );
};

export default CardBro;
