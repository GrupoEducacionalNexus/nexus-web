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
import styled from 'styled-components';

const Index = () => {
  const { user } = useContext(UserContext);
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
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        setToken(token);
        const idUsuario = user.id;
        const credenciamentoData = await buscaSolicitacaoDeCredenciamento(token, idUsuario);
        const credenciamento = credenciamentoData.resultados[0];
        console.log('credenciamento', credenciamento)
        setIdCredenciamento(credenciamento.id_credenciamento);
        setSolicitacaoInfo(credenciamento);

        // Carrega o checklist do estado
        await loadChecklists(token, credenciamento.id_estado);
      } catch (error) {
        console.error('Erro ao buscar credenciamento:', error);
      }
    };

    fetchData();
  }, [user]);

  const loadChecklists = async (token, idEstado) => {
    try {
      const checklists = await listaDoChecklistDoEstado(token, idEstado);
      setChecklists(checklists);
    } catch (error) {
      console.error('Erro ao buscar checklists:', error);
      setChecklists([]);
    }
  };

  const handleShowModal = async (checklist) => {
    try {
      setItemDochecklist(checklist.nome);
      setIdChecklistCredenciamento(checklist.id_checklist);
      setModalShow(true);

      const instrucoesData = await
        listaDeInstrucoesDoChecklistApi(checklist.id_checklist);
      setInstrucoes(instrucoesData);

      const documentosData = await listaDedocumentosDoCredenciamentoApi(
        checklist.id_checklist,
        idCredenciamento,
        token
      );
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
          'x-access-token': token,
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

  const atualizarDocumentos = async (idChecklistCredenciamento, idCredenciamento, token) => {
    const documentosAtualizados = await listaDedocumentosDoCredenciamentoApi(idChecklistCredenciamento, idCredenciamento, token);
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
            />
          </MainContent>
        </Col>
      </Row>
    </Container>
  );
};

export const Form = styled.form`
  .titulo {
    color: #000233;
  }
`;
export default Index;
