import React from 'react';

const ModalRight = ({ isOpenModalRight, children }) => {

  const modalClassName = isOpenModalRight ? "modal-right-overlay fade-in" : "modal-right-overlay fade-out";
  if (!isOpenModalRight) {
    return null;
  }

  return (
    <div className={modalClassName}>
      <div className="modal-right-content modal-right">
        {children}
      </div>
    </div>
  )
}

export default ModalRight;