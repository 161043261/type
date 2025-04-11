import { createPortal } from "react-dom";
import "./index.scss";

export const Modal: React.FC = () => {
  // BEM: Block__Element--Modifier
  return createPortal(
    <main className="modal-container">
      <header className="modal-header">
        <h1 className="modal-title">Default Title</h1>
      </header>
      <section className="modal-content">
        <div>Default Content</div>
      </section>
      <footer className="modal-footer">
        <button className="modal-close-btn">关闭</button>
        <button className="modal-confirm-btn">确定</button>
      </footer>
    </main>,
    document.body,
  );
};
