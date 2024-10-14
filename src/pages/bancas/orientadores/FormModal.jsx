// FormModal.js
import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaRegSave } from 'react-icons/fa';

const FormModal = ({ show, onHide, title, size, onSubmit, children }) => (
  <Modal
    show={show}
    onHide={onHide}
    backdrop="static"
    size={size || 'md'}
    centered
  >
    <Form onSubmit={onSubmit}>
      <Modal.Header closeButton>
        <h4 className="titulo">{title}</h4>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button className="button">
          <FaRegSave /> Salvar
        </button>
      </Modal.Footer>
    </Form>
  </Modal>
);

export default FormModal;
