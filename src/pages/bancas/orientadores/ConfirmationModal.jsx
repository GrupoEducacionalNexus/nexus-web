// ConfirmationModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ConfirmationModal = ({
  show,
  onHide,
  title,
  message,
  onConfirm,
  confirmText = 'Confirmar',
  confirmVariant = 'outline-success',
  size = 'sm',
  successMessage,
  errorMessage,
}) => (
  <Modal
    show={show}
    onHide={onHide}
    backdrop="static"
    size={size}
    centered
    aria-labelledby="contained-modal-title-vcenter"
  >
    <Form onSubmit={onConfirm}>
      <Modal.Header closeButton>
        <h4 className="titulo">{title}</h4>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>{message}</p>
        <Button type="submit" variant={confirmVariant}>
          {confirmText}
        </Button>
        <div className="row mt-2">
          <div className="col-sm-12">
            {successMessage && (
              <div className="alert alert-success text-center" role="alert">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Form>
  </Modal>
);

export default ConfirmationModal;
