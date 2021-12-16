import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRootRef = document.querySelector("#modal-root");

const Modal = ({ onModalClose, largeImage }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.code === "Escape") {
        onModalClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onModalClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={largeImage} alt="" onClick={onModalClose} />
      </div>
    </div>,
    modalRootRef
  );
};

export default Modal;
