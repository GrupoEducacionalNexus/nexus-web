import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import SuccessErrorMessage from './SuccessErrorMessage';

const ConfirmationModalExcluirBanca = ({
  show,
  onHide,
  title,
  message,
  onConfirm,
  successMessage,
  errorMessage,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
        <SuccessErrorMessage success={successMessage} error={errorMessage} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModalExcluirBanca;