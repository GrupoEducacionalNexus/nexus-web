import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaUserGraduate, FaRegSave } from 'react-icons/fa';

const ModalEmitirFolhaDeAprovacao = ({
  show,
  onHide,
  dataAprovacao,
  setDataAprovacao,
  success,
  error,
  cadastrarEatualizarFolhaDeAprovacao
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      size='md'
      centered>
      <Modal.Header closeButton>
        <h4 className='titulo'><FaUserGraduate /> Emitir folha de aprovação</h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault();
          cadastrarEatualizarFolhaDeAprovacao();
        }}>
          <div className="form-group">
            <label htmlFor="dataAprovacao">Data de aprovação:</label>
            <input className="form-control form-control-sm" type="date" id="dataAprovacao" name="dataAprovacao"
              min="2022-01"
              onChange={e => setDataAprovacao(e.target.value)}
              value={dataAprovacao}
            />
          </div>

          <div className="row mt-2">
            <div className="col-sm-12">
              {success && (
                <div
                  className="alert alert-success text-center"
                  role="alert"
                >
                  {success}
                </div>
              )}
              {error && (
                <div
                  className="alert alert-danger text-center"
                  role="alert"
                >
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className='d-flex justify-content-center'>
            <button type='submit' className='btn btn-outline-success'><FaRegSave /> Salvar</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEmitirFolhaDeAprovacao;