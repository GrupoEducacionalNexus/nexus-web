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
  const [idChecklistCredenciamento, setIdChecklistCredenciamento] = useState(null); // Adicionando o estado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUsuario = userContext.user.id;
        const credenciamentoData = await buscaSolicitacaoDeCredenciamento(idUsuario);
        const credenciamento = credenciamentoData.resultados[0];
        setIdCredenciamento(credenciamento.id_credenciamento);
        console.log('Credenciamento:', credenciamento);

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
    setIdChecklistCredenciamento(checklist.id_checklist); // Armazenar id_checklist_credenciamento
    setModalShow(true);
  
    try {
      // Buscando as instruções do checklist
      const instrucoesData = await listaDeInstrucoesDoChecklistApi(checklist.id_checklist);
      setInstrucoes(instrucoesData);
  
      // Buscando os documentos anexados para o checklist e credenciamento
      const documentosData = await listaDedocumentosDoCredenciamentoApi(checklist.id_checklist, idCredenciamento);
      console.log('Documentos recebidos:', documentosData);
  
      if (documentosData.status === 200 && documentosData.resultados && documentosData.resultados.length > 0) {
        setDocumentos(documentosData.resultados); // Acessando corretamente os resultados
      } else {
        console.log('Nenhum documento encontrado.');
        setDocumentos([]); // Certifique-se de limpar o estado caso não haja documentos
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

      await uploadFile(arquivo, `nexus/credenciamento/`, setProgressoUpload);
      await listaDedocumentosDoCredenciamentoApi(idChecklistCredenciamento, idCredenciamento); // Usar idChecklistCredenciamento
      setProgressoUpload(0); // Resetar progresso após upload
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
        <Col xs={12} id="main">
          <MainContent>
            <Accordion>
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
                                <Button onClick={() => handleShowModal(checklist)}>Anexos e Instruções</Button>
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
              documentos={documentos? documentos : []}
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
