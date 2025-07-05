import { createPortal } from "react-dom";

export function CreatePortalDemo() {
  return (
    <>
      {createPortal(
        <p
          style={{
            position: "fixed",
            left: "50%",
            top: "20%",
            transform: "translateX(-50%)",
            fontWeight: "normal",
            color: "slateblue",
          }}
        >
          CreatePortalDemo
        </p>,
        document.body /** key */,
      )}
    </>
  );
}
