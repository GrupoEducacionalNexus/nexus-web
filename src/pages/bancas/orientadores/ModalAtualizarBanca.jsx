// nexus-web/src/pages/bancas/orientadores/index.js
import React, { Component } from 'react';
import styled from 'styled-components';
import { getToken } from '../../../services/auth';
import Logo_ATA from '../../../assets/logo_ata.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserGraduate, FaCalendarWeek } from 'react-icons/fa';
import Menu from '../../../components/Menu';
import AdminNavbar from '../../../components/Navbar';
import MainContent from '../../../components/MainContent';
import UserContext from '../../../UserContext';
import FormModalOrientando from './FormModalOrientando';
import ModalVisualizarCertificadoDeAprovacao from './ModalVisualizarCertificadoDeAprovacao';
import ModalEmitirDeclaracaoDeOrientacao from './ModalEmitirDeclaracaoDeOrientacao';
import ModalAtualizarBanca from './ModalAtualizarBanca';
import { listaDeLinhasDePesquisas } from '../../../services/getListaDeLinhasDePesquisas';
import { print } from '../../../services/print';
import backgroundImage from '../../../assets/sistema_chamados.png';
import StatisticsTabsPanel from './StatisticsTabPanel';
import RegisterBancaModal from './RegistrarBancaModal';
import ConfirmationModalExcluirBanca from './ConfirmationModalExcluirBanca';
import FormModalEmitirAta from './FormModalEmitirAta';
import ModalVisualizarDeclaracaoDeOrientacao from './ModalVisualizarDeclaracaoDeOrientacao';

export default class Index extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      // Modal visibility states
      modals: {
        modalShowCadastrarBanca: false,
        modalShowAtualizarBanca: false,
        modalShowExcluirBanca: false,
        modalShowEmitirAta: false,
        modalShowEmitirDeclaracaoDeOrientacao: false,
        modalShowVisualizarCertificadoDeAprovacao: false,
        modalShowVisualizarDeclaracaoDeOrientacao: false,
      },

      // Data
      array_orientandos: [],
      array_tiposBanca: [],
      array_bancasQ: [],
      array_bancasD: [],
      array_cursos: [],
      arrayLinhasDePesquisas: [],

      // Other States
      id_usuario: 0,
      id_banca: 0,
      tipo_banca: '',
      nome: '',
      success: '',
      error: '',
      orientador: '',
      arrayMembrosDaDeclaracaoDeParticipacao: [],
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = async () => {
    try {
      const orientadorData = await listaDeLinhasDePesquisas(getToken());
      if (orientadorData && orientadorData.length > 0) {
        this.setState({ arrayLinhasDePesquisas: orientadorData });
      }
      this.loadOrientandos();
      this.loadBancas(1);
      this.loadBancas(2);
      this.loadTiposDeBanca();
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
    }
  };

  loadOrientandos = async () => {
    try {
      const orientandosData = await listaDeLinhasDePesquisas(getToken(), this.context.user?.id || 0);
      if (orientandosData) {
        this.setState({ array_orientandos: orientandosData });
      }
    } catch (error) {
      console.error('Erro ao carregar orientandos:', error);
    }
  };

  loadBancas = async (id_tipoBanca) => {
    try {
      const bancasData = await listaDeLinhasDePesquisas(getToken(), this.context.user?.id || 0, id_tipoBanca);
      if (bancasData) {
        if (id_tipoBanca === 1) {
          this.setState({ array_bancasQ: bancasData });
        } else if (id_tipoBanca === 2) {
          this.setState({ array_bancasD: bancasData });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar bancas:', error);
    }
  };

  loadTiposDeBanca = async () => {
    try {
      const tiposBancaData = await listaDeLinhasDePesquisas(getToken());
      if (tiposBancaData) {
        this.setState({ array_tiposBanca: tiposBancaData });
      }
    } catch (error) {
      console.error('Erro ao carregar tipos de banca:', error);
    }
  };

  handleModalVisibility = (modalName, visibility) => {
    this.setState((prevState) => ({
      modals: {
        ...prevState.modals,
        [modalName]: visibility,
      },
    }));
  };

  render() {
    const {
      array_orientandos = [],
      array_tiposBanca = [],
      array_bancasQ = [],
      array_bancasD = [],
      array_cursos = [],
      arrayLinhasDePesquisas = [],
      modals,
      nome,
      tipo_banca,
      success,
      error,
      orientador,
      arrayMembrosDaDeclaracaoDeParticipacao,
    } = this.state;

    return (
      <Container
        fluid
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          padding: '0px',
          minHeight: '100vh',
        }}
      >
        <Menu />
        <Row>
          <Col xs={12}>
            <AdminNavbar id_usuario={this.state.id_usuario} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} id="main">
            <MainContent>
              <StatisticsTabsPanel
                array_orientandos={array_orientandos}
                array_bancasQ={array_bancasQ}
                array_bancasD={array_bancasD}
                arrayLinhasDePesquisas={arrayLinhasDePesquisas}
                array_tiposBanca={array_tiposBanca}
                nome={nome}
                handleModalVisibility={this.handleModalVisibility}
              />

              <RegisterBancaModal
                show={modals.modalShowCadastrarBanca}
                onHide={() => this.handleModalVisibility('modalShowCadastrarBanca', false)}
                handleSubmit={() => console.log('Cadastrar Banca')}
                state={this.state}
                handleChange={(field, value) => this.setState({ [field]: value })}
                handleMultiSelectChange={(field, value) => this.setState({ [field]: value })}
              />

              <FormModalOrientando
                show={modals.modalShowEmitirDeclaracaoDeOrientacao}
                onHide={() => this.handleModalVisibility('modalShowEmitirDeclaracaoDeOrientacao', false)}
                handleCadastrarOrientando={() => console.log('Cadastrar Orientando')}
              />

              <ModalVisualizarCertificadoDeAprovacao
                show={modals.modalShowVisualizarCertificadoDeAprovacao}
                onHide={() => this.handleModalVisibility('modalShowVisualizarCertificadoDeAprovacao', false)}
                titulo={nome || 'Certificado de Aprovação'}
                nome={nome}
                orientador={orientador || 'Orientador não informado'}
                arrayMembrosDaDeclaracaoDeParticipacao={arrayMembrosDaDeclaracaoDeParticipacao || []}
              />

              <ConfirmationModalExcluirBanca
                show={modals.modalShowExcluirBanca}
                onHide={() => this.handleModalVisibility('modalShowExcluirBanca', false)}
                onConfirm={() => console.log('Excluir Banca')}
              />

              <FormModalEmitirAta
                show={modals.modalShowEmitirAta}
                onHide={() => this.handleModalVisibility('modalShowEmitirAta', false)}
                title={<><FaUserGraduate /> Emitir Ata</>}
                size="md"
                onSubmit={() => console.log('Emitir Ata')}
              />

              <ModalAtualizarBanca
                show={modals.modalShowAtualizarBanca}
                onHide={() => this.handleModalVisibility('modalShowAtualizarBanca', false)}
                id_orientando={this.state.id_orientando}
                setIdOrientando={(value) => this.setState({ id_orientando: value })}
                array_orientandos={array_orientandos}
                id_tipoBanca={this.state.id_tipoBanca}
                setIdTipoBanca={(value) => this.setState({ id_tipoBanca: value })}
                array_tiposBanca={array_tiposBanca}
                idAreaConcentracao={this.state.idAreaConcentracao}
                setIdAreaConcentracao={(value) => this.setState({ idAreaConcentracao: value })}
                arrayAreaConcentracao={this.state.arrayAreaConcentracao}
                idLinhaPesquisa={this.state.idLinhaPesquisa}
                setIdLinhaPesquisa={(value) => this.setState({ idLinhaPesquisa: value })}
                arrayLinhasDePesquisas={arrayLinhasDePesquisas}
                data_horaPrevista={this.state.data_horaPrevista}
                setDataHoraPrevista={(value) => this.setState({ data_horaPrevista: value })}
                arrayMembrosInternos={this.state.arrayMembrosInternos}
                arraySelectedMembrosInternos={this.state.arraySelectedMembrosInternos}
                setArraySelectedMembrosInternos={(value) => this.setState({ arraySelectedMembrosInternos: value })}
                arrayMembrosExternos={this.state.arrayMembrosExternos}
                arraySelectedMembrosExternos={this.state.arraySelectedMembrosExternos}
                setArraySelectedMembrosExternos={(value) => this.setState({ arraySelectedMembrosExternos: value })}
                titulo={this.state.titulo}
                setTitulo={(value) => this.setState({ titulo: value })}
                title={this.state.title}
                setTitle={(value) => this.setState({ title: value })}
                resumo={this.state.resumo}
                setResumo={(value) => this.setState({ resumo: value })}
                palavra_chave={this.state.palavra_chave}
                setPalavraChave={(value) => this.setState({ palavra_chave: value })}
                success={success}
                error={error}
                handleSubmit={() => console.log('Atualizar Banca')}
              />

              <ModalVisualizarDeclaracaoDeOrientacao
                show={modals.modalShowVisualizarDeclaracaoDeOrientacao}
                onHide={() => this.handleModalVisibility('modalShowVisualizarDeclaracaoDeOrientacao', false)}
              />
            </MainContent>
          </Col>
        </Row>
      </Container>
    );
  }
}

export const Form = styled.form`
  .titulo {
    color: #000233;
  }

  @media only screen and (min-width: 320px) and (max-width: 725px) {
    .button {
      display: block;
      width: 100%;
    }
  }
`