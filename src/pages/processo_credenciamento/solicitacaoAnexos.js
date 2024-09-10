import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import { uploadFile } from '../../services/uploadFile';
import UserContext from '../../UserContext';
import { buscaSolicitacaoDeCredenciamento, listaDedocumentosDoCredenciamentoApi } from '../../services/credenciamento/credenciamentoService';
import { getToken } from '../../services/auth';

const SolicitacaoAnexos = () => {
  const userContext = useContext(UserContext);
  const [idCredenciamento, setIdCredenciamento] = useState(0);
  const [arquivo, setArquivo] = useState(null);
  const [progressoUpload, setProgressoUpload] = useState(0);
  const [documentos, setDocumentos] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCredenciamentoData = async () => {
      try {
        const idUsuario = userContext.user.id;
        const { resultados } = await buscaSolicitacaoDeCredenciamento(idUsuario);
        const credenciamento = resultados[0];
        setIdCredenciamento(credenciamento.id_credenciamento);

        await fetchDocumentos(credenciamento.id_credenciamento);
      } catch (error) {
        console.error('Erro ao buscar credenciamento:', error);
      }
    };

    fetchCredenciamentoData();
  }, [userContext]);

  const fetchDocumentos = async (idCredenciamento) => {
    try {
      const token = getToken();
      const documentosData = await listaDedocumentosDoCredenciamentoApi(null, idCredenciamento, token);
      if (documentosData.status === 200) {
        setDocumentos(documentosData.resultados);
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!arquivo) return setError('Por favor, selecione um arquivo.');

    try {
      const fileUrl = await uploadFile(arquivo, `nexus/credenciamento/`, setProgressoUpload);
      const response = await fetch(`${api.baseURL}/documento_credenciamento`, {
        method: 'POST',
        headers: {
          'x-access-token': getToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_credenciamento: idCredenciamento,
          anexo: fileUrl,
          status: 1,
        }),
      });

      const data = await response.json();
      if (data.status === 200) {
        setSuccess('Arquivo enviado com sucesso!');
        await fetchDocumentos(idCredenciamento);
        setProgressoUpload(0);
      } else {
        setError('Erro ao salvar o anexo no banco de dados.');
      }
    } catch (error) {
      setError('Erro ao enviar documento.');
      console.error('Erro ao enviar documento:', error);
    }
  };

  return (
    <Container fluid>
      <Menu />
      <Row>
        <Col xs={12}>
          <AdminNavbar />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <MainContent>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Anexar arquivo</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              {progressoUpload > 0 && <ProgressBar now={progressoUpload} label={`${progressoUpload}%`} />}
              <Button type="submit">Salvar</Button>
            </Form>

            {success && <div className="alert alert-success mt-3">{success}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <hr />
            <h4>Anexos já enviados</h4>
            <ul>
              {documentos.length > 0 ? (
                documentos.map((doc, index) => (
                  <li key={index}>
                    <a href={doc.anexo} target="_blank" rel="noopener noreferrer">Visualizar Anexo</a> - Status: {doc.status}
                  </li>
                ))
              ) : (
                <li>Nenhum anexo enviado.</li>
              )}
            </ul>
          </MainContent>
        </Col>
      </Row>
    </Container>
  );
};

export default SolicitacaoAnexos;
