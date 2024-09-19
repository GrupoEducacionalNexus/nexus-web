<<<<<<< staging
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
  listaDeInstrucoesDoChecklistApi,
  listaDoChecklistDoEstado,
} from '../../services/credenciamento/credenciamentoService';
import { uploadFile } from '../../services/uploadFile';
import api from '../../services/api';
import { getToken } from '../../services/auth';

// Importando os novos componentes
import SolicitacaoInfo from './SolicitacaoInfo';
import ChecklistCredenciamento from './ChecklistCredenciamento';

const Index = () => {
  const { user } = useContext(UserContext); // Desestruturação do contexto do usuário
  console.log('user', user)
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
=======
import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import styled from 'styled-components';
import UserContext from '../../UserContext';
import { buscaSolicitacaoDeCredenciamento } from '../../services/credenciamento/buscaSolicitacaoDeCredenciamento';
import { listaDeStatus } from '../../services/getListaDeStatus';
import { uploadFile } from '../../services/uploadFile';
import backgroundImage from '../../assets/sistema_chamados.png';
import { getToken } from '../../services/auth';
import SolicitacaoAccordion from './solicitacaoAccordion';

const Index = () => {
  const [state, setState] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    status: '',
    arquivo: '',
    id_credenciamento: 0,
    id_checklist_credenciamento: 0,
    success: '',
    error: '',
    arrayStatus: [],
    arrayChecklistCredenciamento: [],
    arrayDocumentosDoCredenciamento: [],
    arrayInstrucoesDoChecklist: [],
    modalShowCadastrarAnexo: false,
    itemDochecklist: ''
  });

  const userContext = useContext(UserContext);
>>>>>>> dev

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< staging
        const token = getToken();
        if (!token) {
          console.error('Token não encontrado');
          return;
        }

        const idUsuario = user.id;
        console.log('ID do usuário:', idUsuario);

        const credenciamentoData = await buscaSolicitacaoDeCredenciamento(idUsuario);
        console.log('Dados do credenciamento:', credenciamentoData);

        if (credenciamentoData.resultados && credenciamentoData.resultados.length > 0) {
          const credenciamento = credenciamentoData.resultados[0];
          console.log('credenciamento', credenciamento);
          setIdCredenciamento(credenciamento.id_credenciamento);
          setSolicitacaoInfo(credenciamento);
          await loadChecklists(token, credenciamento.id_estado);
        } else {
          console.error('Nenhum credenciamento encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar credenciamento:', error);
      }
    };

    fetchData();
  }, [user]);

  const loadChecklists = async (getToken, idEstado) => {
    try {
      const checklistsData = await listaDoChecklistDoEstado(getToken, idEstado);
      console.log('checklistsData', checklistsData)
      setChecklists(checklistsData || []); // Ensure it's an array
    } catch (error) {
      console.error('Erro ao buscar checklists:', error);
      setChecklists([]); // Set to empty array on error
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
  // const handleDeleteDocument = async (id, anexoUrl) => {
  //   try {
  //     const response = await fetch(`${api.baseURL}/documento_credenciamento/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'x-access-token': getToken(),
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ anexo: anexoUrl }),  // Enviar o nome do anexo
  //     });

  //     const data = await response.json();
  //     if (data.status === 200) {
  //       console.log('Documento deletado com sucesso:', data);
  //       // Atualizar a lista de documentos
  //     } else {
  //       console.error('Erro ao deletar documento:', data.msg);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao deletar o arquivo:', error);
  //   }
  // };

  const atualizarDocumentos = async (idChecklistCredenciamento, idCredenciamento) => {
    const documentosAtualizados = await listaDedocumentosDoCredenciamentoApi(idChecklistCredenciamento, idCredenciamento);
    setDocumentos(documentosAtualizados.resultados);
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
              checklists={checklists && checklists}
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
              atualizarDocumentos={atualizarDocumentos}
            // handleDeleteDocument={handleDeleteDocument}
=======
        const data = await buscaSolicitacaoDeCredenciamento(getToken(), userContext.user.id);
        setState(prevState => ({ ...prevState, ...data }));
        
        const statusList = await listaDeStatus(getToken());
        setState(prevState => ({ ...prevState, arrayStatus: statusList }));
      } catch (error) {
        console.error("Erro ao buscar dados de credenciamento:", error);
      }
    };
    fetchData();
  }, [userContext.user.id]);

  const setModalShowCadastrarAnexo = (value) => {
    setState(prevState => ({ ...prevState, modalShowCadastrarAnexo: value, error: '' }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    uploadFile(file, 'nexus/credenciamento/');
    setState(prevState => ({ ...prevState, arquivo: file }));
  };

  const cadastrarDocumentoDoCredenciamento = async (e) => {
    e.preventDefault();
    setState(prevState => ({ ...prevState, success: '', error: '' }));

    if (!state.arquivo) {
      setState(prevState => ({ ...prevState, error: 'Por favor, preencher o campo de anexo!' }));
      return;
    }

    // Adicione a lógica de chamada da API para cadastrar documento aqui
  };

  return (
    <Container fluid style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "100% 100%",
      backgroundRepeat: 'no-repeat',
      padding: '0px',
      minHeight: '100vh'
    }}>
      <Menu />
      <Row>
        <Col xs={12}>
          <AdminNavbar id_usuario={state.id_usuario} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} id="main">
          <MainContent>
            <SolicitacaoAccordion
              state={state}
              setModalShowCadastrarAnexo={setModalShowCadastrarAnexo}
              handleFileInputChange={handleFileInputChange}
              cadastrarDocumentoDoCredenciamento={cadastrarDocumentoDoCredenciamento}
              arrayChecklistCredenciamento={state.arrayChecklistCredenciamento}
>>>>>>> dev
            />
          </MainContent>
        </Col>
      </Row>
    </Container>
  );
};

<<<<<<< staging
=======
export const Form = styled.form`
  .titulo {
    color: #000233;
  }
`;

>>>>>>> dev
export default Index;
