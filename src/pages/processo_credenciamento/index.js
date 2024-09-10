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
  const [checklists, setChecklists] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [instrucoes, setInstrucoes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [itemDochecklist, setItemDochecklist] = useState("");
  const [progressoUpload, setProgressoUpload] = useState(0);
  const [arquivo, setArquivo] = useState(null);
  const [idChecklistCredenciamento, setIdChecklistCredenciamento] = useState(null);

  // Carregar os dados iniciais do credenciamento e checklists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUsuario = userContext.user.id;
        const { resultados } = await buscaSolicitacaoDeCredenciamento(idUsuario);
        const credenciamento = resultados[0];
        setIdCredenciamento(credenciamento.id_credenciamento);

        const checklistsData = await listaDoChecklistDoEstado(credenciamento.id_estado);
        setChecklists(checklistsData);
      } catch (error) {
        console.error('Erro ao buscar credenciamento:', error);
      }
    };

    fetchData();
  }, [userContext]);

  // Abre o modal e carrega os documentos e instruções
  const handleShowModal = async (checklist) => {
    setItemDochecklist(checklist.nome);
    setIdChecklistCredenciamento(checklist.id_checklist);
    setModalShow(true);

    try {
      const instrucoesData = await listaDeInstrucoesDoChecklistApi(checklist.id_checklist);
      setInstrucoes(instrucoesData);

      const documentosData = await listaDedocumentosDoCredenciamentoApi(checklist.id_checklist, idCredenciamento);
      setDocumentos(documentosData.resultados || []);
    } catch (error) {
      console.error('Erro ao buscar documentos ou instruções:', error);
    }
  };

  // Lida com a mudança de arquivo para upload
  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  // Envia o arquivo selecionado e o registra no banco de dados
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!arquivo) return console.error('Nenhum arquivo selecionado.');

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
            <Accordion>
              <Card>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Checklist do Credenciamento</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {checklists.length ? checklists.map((checklist, index) => (
                        <Col sm={4} key={index}>
                          <Card className="text-center">
                            <Card.Header>{index + 1} - {checklist.nome}</Card.Header>
                            <Card.Body>
                              <Button onClick={() => handleShowModal(checklist)}>Anexos e Instruções</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      )) : <Col>Nenhum checklist encontrado</Col>}
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
