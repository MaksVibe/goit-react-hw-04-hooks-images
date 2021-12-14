import { Component } from "react";
import { createPortal } from "react-dom";

const modalRootRef = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEsc);
  }

  handleEsc = (e) => {
    if (e.code === "Escape") {
      this.props.onModalClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img
            src={this.props.largeImage}
            alt=""
            onClick={this.props.onModalClose}
          />
        </div>
      </div>,
      modalRootRef
    );
  }
}

export default Modal;
