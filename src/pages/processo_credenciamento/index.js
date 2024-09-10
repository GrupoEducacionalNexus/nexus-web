import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import DocumentsModal from './DocumentsModal';
import UserContext from '../../UserContext';
import {
  buscaSolicitacaoDeCredenciamento,
  listaDedocumentosDoCredenciamentoApi,
  listaDoChecklistDoEstado,
  listaDeInstrucoesDoChecklistApi,
} from '../../services/credenciamento/credenciamentoService';
import { uploadFile } from '../../services/uploadFile';
import api from '../../services/api';
import { getToken } from '../../services/auth';

const Index = () => {
  const userContext = useContext(UserContext);
  const [idCredenciamento, setIdCredenciamento] = useState(0);
  const [solicitacaoInfo, setSolicitacaoInfo] = useState({});
  const [checklists, setChecklists] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [instrucoes, setInstrucoes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [itemDochecklist, setItemDochecklist] = useState("");
  const [progressoUpload, setProgressoUpload] = useState(0);
  const [arquivo, setArquivo] = useState(null);
  const [idChecklistCredenciamento, setIdChecklistCredenciamento] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUsuario = userContext.user.id;
        const credenciamentoData = await buscaSolicitacaoDeCredenciamento(idUsuario);
        const credenciamento = credenciamentoData.resultados[0];
        setIdCredenciamento(credenciamento.id_credenciamento);
        setSolicitacaoInfo(credenciamento);
        console.log(credenciamento)  // Armazenando as informações da solicitação

        // Busca checklists do estado
        await listaDoChecklistDoEstado(credenciamento.id_estado).then(setChecklists);
      } catch (error) {
        console.error('Erro ao buscar credenciamento:', error);
      }
    };

    fetchData();
  }, [userContext]);

  const handleShowModal = async (checklist) => {
    setItemDochecklist(checklist.nome);
    setIdChecklistCredenciamento(checklist.id_checklist);
    setModalShow(true);

    try {
      const instrucoesData = await listaDeInstrucoesDoChecklistApi(checklist.id_checklist);
      setInstrucoes(instrucoesData);

      const documentosData = await listaDedocumentosDoCredenciamentoApi(checklist.id_checklist, idCredenciamento);
      if (documentosData.status === 200 && documentosData.resultados && documentosData.resultados.length > 0) {
        setDocumentos(documentosData.resultados);
      } else {
        setDocumentos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar documentos ou instruções:', error);
    }
  };

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      if (!arquivo) {
        console.error('Nenhum arquivo selecionado.');
        return;
      }

      const fileUrl = await uploadFile(arquivo, `nexus/credenciamento/`, setProgressoUpload);

      const response = await fetch(`${api.baseURL}/documento_credenciamento`, {
        method: 'POST',
        headers: {
          'x-access-token': getToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_credenciamento: idCredenciamento,
          id_checklist_credenciamento: idChecklistCredenciamento,
          id_usuario: userContext.user.id,
          anexo: fileUrl,
          status: 1,
        }),
      });

      const data = await response.json();
      if (data.status === 200) {
        const novosDocumentos = await listaDedocumentosDoCredenciamentoApi(idChecklistCredenciamento, idCredenciamento);
        setDocumentos(novosDocumentos.resultados);
        setProgressoUpload(0);
      } else {
        console.error('Erro ao registrar o anexo no banco de dados:', data.msg);
      }
    } catch (error) {
      console.error('Erro ao enviar documento:', error);
    }
  };

  return (
    <Container fluid style={{ padding: '0px', minHeight: '100vh' }}>
      <Menu />
      <Row>
        <Col xs={12}>
          <AdminNavbar />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <MainContent>
            {/* Accordion para informações da solicitação */}
            <Accordion>
              <Card>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Informações da Solicitação</Accordion.Header>
                  <Accordion.Body>
                    <p><strong>Nome do Gestor:</strong> {solicitacaoInfo.gestor}</p>
                    <p><strong>Email:</strong> {solicitacaoInfo.email}</p>
                    <p><strong>Telefone:</strong> {solicitacaoInfo.telefone}</p>
                    <p><strong>CPF/CNPJ:</strong> {solicitacaoInfo.cpf_cnpj}</p>
                    <p><strong>Razão Social:</strong> {solicitacaoInfo.razao_social}</p>
                    <p><strong>Nome Fantasia:</strong> {solicitacaoInfo.nome_fantasia}</p>
                    <p><strong>status da solicitação:</strong>
                      <p style={{ color: 'green' }}>{solicitacaoInfo.status}</p>
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>

              {/* Accordion com o checklist do credenciamento */}
              <Card>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Checklist do Credenciamento</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {checklists.length > 0 ? (
                        checklists.map((checklist, index) => (
                          <Col sm={4} key={index}>
                            <Card className="text-center font-weight-bold">
                              <Card.Header>{index + 1} - {checklist.nome}</Card.Header>
                              <Card.Body>
                                <Button
                                  className='button'
                                  onClick={() => handleShowModal(checklist)}>
                                  Ver Anexos e Instruções
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                      ) : (
                        <Col>Nenhum checklist encontrado</Col>
                      )}
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            </Accordion>

            <DocumentsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              documentos={documentos}
              instrucoes={instrucoes}
              onFileChange={handleFileChange}
              onSubmitFile={handleFileUpload}
              progressoUpload={progressoUpload}
            />
          </MainContent>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
