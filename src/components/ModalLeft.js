import React from 'react';

const ModalLeft = ({isOpenLeft: isOpenLeft, children}) => {

  const modalClassName = isOpenLeft ? "modal-left-overlay fade-in" : "modal-left-overlay fade-out";
    if(!isOpenLeft) {
        return null;
    }

    return (
        <div className={modalClassName}>
        <div className="modal-left-content modal-left">
          {children}
        </div>
      </div>
    )
} 

export default ModalLeft;