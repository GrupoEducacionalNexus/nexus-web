import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaCalendarWeek } from 'react-icons/fa';

const ModalEmitirDeclaracaoDeOrientacao = ({
  show,
  onHide,
  dataDeOrientacao,
  setDataDeOrientacao,
  success,
  error,
  cadastrarEatualizarDeclaracaoDeOrientacao
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      size='md'
      centered>
      <Form onSubmit={(e) => {
        e.preventDefault();
        cadastrarEatualizarDeclaracaoDeOrientacao();
      }}>
        <Modal.Header closeButton>
          <h4 className='titulo'><FaCalendarWeek /> Emitir declaração de orientação</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="dataHoraPrevista">Data:</label>
            <input className="form-control form-control-sm" type="date" id="dataOrientacao" name="start"
              min="2023-01"
              onChange={e => setDataDeOrientacao(e.target.value)}
              value={dataDeOrientacao}
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
            <button type='submit' className='btn btn-outline-success'>Salvar</button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ModalEmitirDeclaracaoDeOrientacao;