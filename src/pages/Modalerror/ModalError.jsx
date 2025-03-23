import React from "react";

const Modal = ({ message, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={closeModal}>Fechar</button>
      </div>
    </div>
  );
};
export default Modal;
