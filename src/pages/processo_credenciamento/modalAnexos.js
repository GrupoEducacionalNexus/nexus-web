// src/components/ModalAnexos.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaRegSave } from 'react-icons/fa';

const ModalAnexos = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Anexos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="anexo">
            <Form.Label>Anexar arquivo</Form.Label>
            <Form.Control type="file" className="form-control form-control-sm" />
          </Form.Group>
          <Button type="submit" className="float-right">
            <FaRegSave /> Salvar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAnexos;
