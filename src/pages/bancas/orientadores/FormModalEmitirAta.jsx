import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaUserGraduate, FaRegSave } from 'react-icons/fa';
import FormField from './FormField';
import SuccessErrorMessage from './SuccessErrorMessage';

const FormModalEmitirAta = ({
  show,
  onHide,
  title,
  size,
  onSubmit,
  status_ata,
  setStatusAta,
  array_status,
  successMessage,
  errorMessage,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <FormField
            label="Status:"
            id="selectStatusAta"
            value={status_ata}
            onChange={(e) => setStatusAta(e.target.value)}
            isSelect
            className="form-control form-control-sm"
            options={
              array_status?.length > 0
                ? [
                    <option key="0" value="0">
                      Selecione
                    </option>,
                    ...array_status.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nome}
                      </option>
                    )),
                  ]
                : [
                    <option key="0" value="0">
                      Nenhum resultado encontrado
                    </option>,
                  ]
            }
          />

          {/* Mensagens de Sucesso ou Erro */}
          <SuccessErrorMessage success={successMessage} error={errorMessage} />

          {/* Botão de Salvar */}
          <div className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="primary">
              <FaRegSave /> Salvar
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModalEmitirAta;