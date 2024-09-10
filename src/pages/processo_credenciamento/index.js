// src/pages/solicitacao_credenciamento/index.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

// Importando os novos componentes
import SolicitacaoInfo from './SolicitacaoInfo';
import ChecklistCredenciamento from './ChecklistCredenciamento';

const Index = () => {
  const { user } = useContext(UserContext); // Desestruturação do contexto do usuário
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
        const idUsuario = user.id;
        const credenciamentoData = await buscaSolicitacaoDeCredenciamento(idUsuario);
        const credenciamento = credenciamentoData.resultados[0];
        console.log('credenciamento', credenciamento)
        setIdCredenciamento(credenciamento.id_credenciamento);
        setSolicitacaoInfo(credenciamento);
        
        // Carrega o checklist do estado
        await loadChecklists(credenciamento.id_estado);
      } catch (error) {
        console.error('Erro ao buscar credenciamento:', error);
      }
    };

    fetchData();
  }, [user]);

  const loadChecklists = async (idEstado) => {
    try {
      const checklists = await listaDoChecklistDoEstado(idEstado);
      setChecklists(checklists);
    } catch (error) {
      console.error('Erro ao buscar checklists:', error);
    }
  };

  const handleShowModal = async (checklist) => {
    try {
      setItemDochecklist(checklist.nome);
      setIdChecklistCredenciamento(checklist.id_checklist);
      setModalShow(true);

      const instrucoesData = await listaDeInstrucoesDoChecklistApi(checklist.id_checklist);
      setInstrucoes(instrucoesData);

      const documentosData = await listaDedocumentosDoCredenciamentoApi(checklist.id_checklist, idCredenciamento);
      setDocumentos(documentosData.status === 200 ? documentosData.resultados : []);
    } catch (error) {
      console.error('Erro ao buscar documentos ou instruções:', error);
    }
  };

  const handleFileChange = (e) => setArquivo(e.target.files[0]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!arquivo) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

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
          id_usuario: user.id,
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
            <SolicitacaoInfo solicitacaoInfo={solicitacaoInfo} />
            <ChecklistCredenciamento
              checklists={checklists}
              handleShowModal={handleShowModal}
            />
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
