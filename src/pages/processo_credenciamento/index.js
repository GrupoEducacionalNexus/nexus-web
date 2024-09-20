// src/pages/solicitacao_credenciamento/index.js

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import DocumentsModal from './DocumentsModal';
import SolicitacaoInfo from './SolicitacaoInfo';
import ChecklistCredenciamento from './ChecklistCredenciamento';
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
import apiAxios from '../../services/apiAxios';
import socket from '../../services/socket'; // Importar o socket

// Estilização com styled-components
const StyledContainer = styled(Container)`
  padding: 0;
  min-height: 100vh;
`;

const Index = () => {
  const { user } = useContext(UserContext);

  // Gerenciamento de estado
  const [idCredenciamento, setIdCredenciamento] = useState(null);
  const [solicitacaoInfo, setSolicitacaoInfo] = useState({});
  const [checklists, setChecklists] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [instrucoes, setInstrucoes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [itemDoChecklist, setItemDoChecklist] = useState('');
  const [progressoUpload, setProgressoUpload] = useState(0);
  const [arquivo, setArquivo] = useState(null);
  const [idChecklistCredenciamento, setIdChecklistCredenciamento] = useState(null);
  const [token, setToken] = useState('');

  // Hook para buscar dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        setToken(token);
        const idUsuario = user?.id;

        if (!idUsuario) {
          console.warn('Usuário não autenticado.');
          return;
        }

        const credenciamentoData = await buscaSolicitacaoDeCredenciamento(token, idUsuario);
        const credenciamento = credenciamentoData.resultados?.[0];
        console.log('credenciamento :>> ', credenciamento);

        if (credenciamento) {
          setIdCredenciamento(credenciamento.id_credenciamento);
          setSolicitacaoInfo(credenciamento);
          await loadChecklists(token, credenciamento.id_estado);
        } else {
          console.warn('Nenhum credenciamento encontrado para o usuário.');
        }
      } catch (error) {
        console.error('Erro ao buscar credenciamento:', error);
      }
    };

    if (user && user.id) {
      fetchData();
    }
  }, [user]);

  // Função para carregar checklists
  const loadChecklists = useCallback(async (token, idEstado) => {
    try {
      const checklistsData = await listaDoChecklistDoEstado(token, idEstado);
      setChecklists(checklistsData || []);
    } catch (error) {
      console.error('Erro ao buscar checklists:', error);
      setChecklists([]);
    }
  }, []);

  // Função para exibir o modal com documentos e instruções
  const handleShowModal = useCallback(async (checklist) => {
    setItemDoChecklist(checklist.nome);
    setIdChecklistCredenciamento(checklist.id_checklist);
    setModalShow(true);

    try {
      const [instrucoesData, documentosData] = await Promise.all([
        listaDeInstrucoesDoChecklistApi(checklist.id_checklist, token),
        listaDedocumentosDoCredenciamentoApi(checklist.id_checklist, idCredenciamento, token),
      ]);

      setInstrucoes(instrucoesData || []);
      console.log('instrucoesData :>> ', instrucoesData);
      setDocumentos(documentosData?.status === 200 ? documentosData.resultados : []);
    } catch (error) {
      console.error('Erro ao buscar documentos ou instruções:', error);
      setInstrucoes([]);
      setDocumentos([]);
    }
  }, [idCredenciamento, token]);

  // Função para fechar o modal e limpar estados relacionados
  const handleCloseModal = useCallback(() => {
    setModalShow(false);
    setInstrucoes([]);
    setDocumentos([]);
    setArquivo(null);
    setProgressoUpload(0);
  }, []);

  // Função para lidar com a mudança de arquivo
  const handleFileChange = useCallback((e) => {
    setArquivo(e.target.files[0]);
  }, []);

  // Função para fazer upload do arquivo
  const handleFileUpload = useCallback(async (e) => {
    e.preventDefault();
    if (!arquivo) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    try {
      const fileUrl = await uploadFile(arquivo, 'nexus/credenciamento/', setProgressoUpload);

      const response = await apiAxios.post('/documento_credenciamento', {
        id_credenciamento: idCredenciamento,
        id_checklist_credenciamento: idChecklistCredenciamento,
        id_usuario: user.id,
        anexo: fileUrl,
        status: 1,
      }, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 200) {
        const novosDocumentos = await listaDedocumentosDoCredenciamentoApi(idChecklistCredenciamento, idCredenciamento, token);
        setDocumentos(novosDocumentos.resultados || []);
        setProgressoUpload(0);
      } else {
        console.error('Erro ao registrar o anexo no banco de dados:', response.data.msg);
      }
    } catch (error) {
      console.error('Erro ao enviar documento:', error);
    }
  }, [
    token,
    arquivo,
    idCredenciamento,
    idChecklistCredenciamento,
    user.id,
  ]);

  // Função para atualizar a lista de documentos
  const atualizarDocumentos = useCallback(async () => {
    try {
      const documentosAtualizados = await listaDedocumentosDoCredenciamentoApi(
        idChecklistCredenciamento,
        idCredenciamento, 
        token
      );
      setDocumentos(documentosAtualizados.resultados || []);
    } catch (error) {
      console.error('Erro ao atualizar documentos:', error);
    }
  }, [idChecklistCredenciamento, idCredenciamento, token]);

  // Hook para configurar o Socket.IO e escutar eventos de atualização
  useEffect(() => {
    if (!idCredenciamento) return;

    // Definir o ID do credenciamento para escutar eventos específicos
    socket.emit('join', { idCredenciamento });

    // Escutar o evento de atualização de status
    socket.on('atualizacao_status', (dados) => {
      if (dados.idCredenciamento === idCredenciamento) {
        console.log('Atualização de status recebida via socket:', dados);
        setSolicitacaoInfo(dados.solicitacaoInfo);
        setChecklists(dados.checklists);
        // Opcional: Atualizar outros estados conforme necessário
      }
    });

    // Limpar os listeners ao desmontar o componente
    return () => {
      socket.emit('leave', { idCredenciamento });
      socket.off('atualizacao_status');
    };
  }, [idCredenciamento]);

  return (
    <StyledContainer fluid>
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
              onShowModal={handleShowModal}
            />
            <DocumentsModal
              show={modalShow}
              onHide={handleCloseModal}
              documentos={documentos}
              instrucoes={instrucoes}
              onFileChange={handleFileChange}
              onSubmitFile={handleFileUpload}
              progressoUpload={progressoUpload}
              atualizarDocumentos={atualizarDocumentos}
            />
          </MainContent>
        </Col>
      </Row>
    </StyledContainer>
  );
};

// Estilização adicional para o formulário
export const Form = styled.form`
  .titulo {
    color: #000233;
  }
`;

export default Index;
