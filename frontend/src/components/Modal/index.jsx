import { createPortal } from "react-dom";

export default function Modal({ children }) {
  const modalRoot = document.querySelector("#modal-root");
  return createPortal(
    <div className="font-Poppins fixed inset-0  z-30 bg-black/40  ">
      <div className="z-4 h-screen w-screen bg-transparent">{children}</div>
    </div>,
    modalRoot
  );
}
