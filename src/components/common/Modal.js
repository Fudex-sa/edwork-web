import React, { Component } from "react";
import * as ModalComponent from "react-modal";

const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: "rgba(50, 50, 50, 0.5)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ModalComponent.setAppElement("#root");

class Modal extends Component {
  render() {
    const {
      children,
      title = "Title",
      modalIsOpen = 0,
      onRequestClose,
      className,
      styles = {},
      shouldCloseOnOverlayClick = true,
    } = this.props;
    return (
      <div>
        <ModalComponent
          {...this.props}
          isOpen={modalIsOpen}
          onRequestClose={onRequestClose}
          style={{ ...customStyles, ...styles }}
          className={className || "modal_content"}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
          <div className="container">
            <div className="container-header">
              <p className="title">{title}</p>
              <span className="close" onClick={onRequestClose} role="button" />
            </div>
            <div className="content">{children}</div>
          </div>
        </ModalComponent>
      </div>
    );
  }
}

export default Modal;
