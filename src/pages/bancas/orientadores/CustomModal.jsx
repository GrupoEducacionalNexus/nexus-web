// CustomModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({
  show,
  onHide,
  title,
  size = 'lg',
  centered = true,
  backdrop="static",
  children,
  footer,
}) => (
  <Modal show={show} onHide={onHide} size={size} centered={centered}>
    <Modal.Header closeButton>
      <h4 className="titulo">{title}</h4>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    {footer && <Modal.Footer>{footer}</Modal.Footer>}
  </Modal>
);

export default CustomModal;
