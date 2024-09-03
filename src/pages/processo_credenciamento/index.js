import React, { useState, useEffect, useContext } from 'react';
import { FaCalendarWeek, FaClipboardList, FaFileAlt, FaFileExport, FaFolderOpen, FaRegSave, FaUsers } from 'react-icons/fa';
import { Accordion, Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
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
