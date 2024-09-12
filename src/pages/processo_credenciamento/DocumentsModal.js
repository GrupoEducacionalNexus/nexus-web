//DocumentsModal.js
import React from 'react';
import { Modal, Table, Form, ProgressBar, Button, Alert } from 'react-bootstrap';

const DocumentsModal = ({
  show,
  onHide,
  documentos,
  instrucoes,
  onFileChange,
  onSubmitFile,
  progressoUpload,
  handleDeleteDocument,  // Recebendo a função como prop
}) => {
  const handleDelete = (anexoUrl) => {
    if (handleDeleteDocument) {
      handleDeleteDocument(anexoUrl);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Anexos e Instruções</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-6">
            <h4>Instruções</h4>
            <ul>
              {instrucoes.length > 0 ? (
                instrucoes.map((instrucao, index) => <li key={index}>{instrucao.descricao}</li>)
              ) : (
                <li>Nenhuma instrução encontrada.</li>
              )}
            </ul>
          </div>
          <div className="col-sm-6">
            <h4>Anexar um novo documento</h4>
            <Form onSubmit={onSubmitFile}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Escolha um arquivo</Form.Label>
                <Form.Control type="file" onChange={onFileChange} />
              </Form.Group>
              {progressoUpload > 0 && <ProgressBar now={progressoUpload} label={`${progressoUpload}%`} />}
              <Button className='button' type="submit">Salvar</Button>
            </Form>

            <hr />
            <h4>Anexos Enviados</h4>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Anexo</th>
                  <th>Status</th>
                  <th>Observação</th>
                  <th>Data do envio</th>
                  <th>Ações</th>  {/* Nova coluna para ações */}
                </tr>
              </thead>
              <tbody>
                {documentos?.length > 0 ? (
                  documentos.map((anexo, index) => (
                    <tr key={index}>
                      <td><a href={anexo.anexo} target="_blank" rel="noopener noreferrer">Visualizar</a></td>
                      <td>{anexo.status}</td>
                      <td>{anexo.observacao || ''}</td>
                      <td>{anexo.dataHoraCriacao}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDelete(anexo.anexo)}>Excluir</Button>  {/* Botão de deletar */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Nenhum documento encontrado</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DocumentsModal;
