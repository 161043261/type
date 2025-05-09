import ReactDOM from "react-dom/client";
import "./index.css";

export default function Msg() {
  return <div style={{ color: "red" }}>消息提示</div>;
}

interface Item {
  msgContainer: HTMLDivElement;
  root: ReactDOM.Root;
}

const queue: Item[] = [];

window.msgPrompt = () => {
  const msgContainer = document.createElement("div");
  msgContainer.className = "msg";
  msgContainer.style.top = `${queue.length * 50}px`;
  document.body.appendChild(msgContainer);
  // 容器 msgContainer 关联组件 Msg
  // 将容器 msgContainer 注册为根组件
  const root = ReactDOM.createRoot(msgContainer);
  root.render(<Msg />);
  queue.push({
    msgContainer,
    root,
  });
  setTimeout(() => {
    const item = queue.find((item) => item.msgContainer === msgContainer)!;
    queue.splice(queue.indexOf(item), 1);
    root.unmount();
    document.body.removeChild(item.msgContainer);
  }, 2000);
};

declare global {
  interface Window {
    msgPrompt: () => void;
  }
}
