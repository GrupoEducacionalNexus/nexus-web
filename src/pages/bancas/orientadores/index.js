// nexus-web/src/pages/bancas/orientadores/index.js
import React, { Component } from 'react';
import styled from 'styled-components';
import { getToken } from '../../../services/auth';
import Logo_ATA from '../../../assets/logo_ata.jpg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';
import DocumentHeader from './DocumentHeader';
import DocumentFooter from './DocumentFooter';
import SignatureBlock from './SignatureBlock';
import DocumentContainer from './DocumentContainer';

import {
	handlerMostrarModalCadastrarBanca,
	handlerFecharModalCadastrarBanca,
	handlerMostrarModalAtualizarBanca,
	handlerFecharModalAtualizarBanca,
	handlerMostrarModalExcluirBanca,
	handlerFecharModalExcluirBanca,
	handlerMostrarModalFinalizarBanca,
	handlerFecharModalFinalizarBanca,
	handleCadastrarOrientando,
	handleAtualizarOrientando,
	handleCadastrarBanca,
	handleAtualizarBanca,
	handleExcluirBanca,
	handleOptionChange,
	handleResumoChange,
	getMemberRoleEnglish,
	getMemberRolePortuguese,
	getCourseTypeEnglish,
	getCourseTypePortuguese,
	getBancaTypeEnglish,
	getBancaTypePortuguese,
	getProgramNameEnglish,
	getProgramNamePortuguese,
	handlerFecharModalVisualizarDeclaracao,
	carregarMembrosDaDeclaracaoDeParticipacao, // Adicionado
} from './funcoesBanca';

import {
	FaUserGraduate,
	FaLayerGroup,
	FaCalendarWeek,
	FaRegEdit,
	FaRegSave,
	FaWpforms,
	FaPlus,
} from 'react-icons/fa';

import { listaDeLinhasDePesquisas } from '../../../services/getListaDeLinhasDePesquisas';
import { print } from '../../../services/print';
import { AtaDefesa } from '../../../components/AtaDefesa';
import { FolhaDeAprovacao } from '../../../components/FolhaDeAprovacao';
import Menu from '../../../components/Menu';
import backgroundImage from '../../../assets/sistema_chamados.png';
import MainContent from '../../../components/MainContent';
import UserContext from '../../../UserContext';
import Select from 'react-select';
import RODAPE1 from '../../../assets/rodape1.png';
import RODAPE2 from '../../../assets/rodape2.png';
import RODAPE3 from '../../../assets/rodape3.png';
import RODAPE4 from '../../../assets/rodape4.png';
import BACKGROUND_ENBER from '../../../assets/background_enber.png';
import ASSINATURA_JOSUE from '../../../assets/assinatura_josue.png';

import {
	listaDeCursos,
	excluirBanca,
	cadastrarOrientando,
	atualizarOrientando,
	cadastrarBanca,
	atualizarBanca,
	listaDeOrientandos,
	listaDeTiposDeBanca,
	listaDeBancas,
	cadastrarATA,
	atualizarATA,
	cadastrarFichaDeAvaliacao,
	atualizarFichaDeAvaliacao,
	uuid,
	cadastrarDeclaracaoDeParticipacao,
	listaDeDeclaracoesDeParticipacao,
	listaDeMembrosDaBanca,
	cadastrarOuAtualizarOrientacao,
	listaDeOrientacao,
	buscaInformacoesDoOrientador,
	cadastrarEatualizarFolhaDeAprovacao,
	cadastrarEatualizarDeclaracaoDeOrientacao,
} from '../apiServices';

import AdminNavbar from '../../../components/Navbar';
import PerguntaAvaliacao from './PerguntaAvaliacao';
import MemberList from './MemberList';
import CustomModal from './CustomModal';
import FichaDeAvaliacao from './FichaAvaliacao';
import SuccessErrorMessage from './SuccessErrorMessage';
import FormMultiSelect from './FormMultiSelect';
import MemberSignatures from './MemberSignatures';
import ConfirmButton from './ConfirmeButton';
import FormField from './FormField';
import FormModal from './FormModal';
import ConfirmationModal from './ConfirmationModal';
import DataTable from './DataTable';
import OrientandosTab from './OrientandosTab';
import StatisticsPanel from './StatisticsPanel';
import BancasTab from './BancasTab';
import { MenuFlutuante } from './MenuFlutuante';
import { getPerguntas } from './perguntas';

export default class Index extends Component {
	static contextType = UserContext;

	constructor(props) {
		super();
		this.state = {
			// Modals
			modalShowCadastrarBanca: false,
			modalShowAtualizarBanca: false,
			modalShowExcluirBanca: false,
			modalShowFinalizarBanca: false,
			modalShowEmitirAta: false,
			modalShowVisualizarAta: false,
			modalShowCadastrarOrientando: false,
			modalShowCadastrarOrientacao: false,
			modalShowEditarOrientando: false,
			modalShowAtualizarAta: false,
			modalShowVisualizarFichaDeAvaliacao: false,
			modalShowEmitirFichaDeAvaliacao: false,
			modalShowEditarFichaDeAvaliacao: false,
			modalShowEmitirDeclaracao: false,
			modalShowVisualizarDeclaracao: false,
			modalShowVisualizarFolhaDeAprovacao: false,
			modalShowCadastrarEAtualizarFolhaDeAprovacao: false,
			modalShowVisualizarDeclaracaoDeOrientacao: false,
			modalShowEmitirDeclaracaoDeOrientacao: false,
			modalShowVisualizarCertificadoDeAprovacao: false,
			keyTab: 'Checklist',
			success: '',
			error: '',

			// Dados
			array_orientandos: [],
			array_tiposBanca: [],
			array_bancasQ: [],
			array_bancasD: [],
			array_cursos: [],
			array_status: [],
			arrayLinhasDePesquisas: [],
			arrayAreaConcentracao: [],
			arrayOrientacao: [],
			arrayMembrosDaDeclaracaoDeParticipacao: [],
			array_declaracoes: [],
			arrayAnexosDaOrientacao: [],
			arrayAnexosDoOrientando: [],
			arrayMembrosInternos: [],
			arrayMembrosExternos: [],
			arraySelectedMembrosInternos: [],
			arraySelectedMembrosExternos: [],
			arraySelectedMembrosDaBanca: [],

			// Outros estados
			id_usuario: 0,
			id_orientador: '',
			id_banca: 0,
			id_tipoBanca: '',
			id_orientando: 0,
			id_curso: '',
			idLinhaPesquisa: '',
			idAreaConcentracao: '',
			id_membroInterno: '',
			id_membroExterno: '',
			id_statusAta: '',
			id_ata: '',
			id_fichaAvaliacao: '',
			id_orientacao: 0,
			id_membroDeclaracao: 0,
			idFolhaDeAprovacao: 0,
			idDeclaracaoDeOrientacao: 0,

			// Dados dos formulários
			nome: '',
			email: '',
			senha: '',
			confirmarSenha: '',
			informacoes_adicionais: '',
			fase_processo: '',
			dataHoraInicialFaseProcesso: '',
			dataHoraFinalFaseProcesso: '',
			dataHoraConclusao: '',
			data_horaPrevista: '',
			data_horaPrevistaAta: '',
			dataFichaAvaliacaoPtBr: '',
			dataAprovacao: '',
			dataDeOrientacao: '',
			titulo: '',
			title: '',
			resumo: '',
			palavra_chave: '',
			status_ata: '',
			titulo_teseOuDissertacao: '',
			quant_pag: 0,
			// Propriedades para as perguntas da ficha de avaliação
			titulo_projeto: '',
			resumoQ1: '',
			pergunta_condutora: '',
			resumoQ2: '',
			hipotese: '',
			resumoQ3: '',
			fundamentacao_teorica: '',
			resumoQ4: '',
			objetivo: '',
			resumoQ5: '',
			metodo: '',
			resumoQ6: '',
			cronograma: '',
			resumoQ7: '',
			conclusao_avaliacao: '',
			resumoQ8: '',
			link: '',
			observacao: '',
			nomeArquivo: '',
			anexo: '',
			membro: '',
			titulo_banca: '',
			codigo_validacao: 0,
			dataHoraCriacao: '',
			orientando: '',
			curso: '',
			dataDeclaracaoEnUs: '',
			dataDeclaracaoPtBr: '',
			data_horaPrevistaEnUs: '',
			data_horaPrevistaPtBr: '',
			sexo: '',
			tipo_banca: '',
			presidente: '',
			membro_externo: '',
			membro_interno: '',
			dataFormatAmericano: '',
			dtCadAta: '',
			assinatura_membroInterno: '',
			assinatura_presidente: '',
			assinatura_membroExterno: '',
			dtFolhaAprovacaoFormatada: '',
			link_ata: '',
			areaConcentracao: '',
			linha_pesquisa: '',
			orientador: '',
			documentoEmIngles: false,
		};

	}

	// Métodos que chamam as funções importadas

	handlerFecharModalCadastrarBanca = () => {
		handlerFecharModalCadastrarBanca(this);
	};

	// Modais de Atualizar Banca
	handlerMostrarModalAtualizarBanca = (banca) => {
		handlerMostrarModalAtualizarBanca(this, banca);
	};

	handlerFecharModalAtualizarBanca = () => {
		handlerFecharModalAtualizarBanca(this);
	};

	// Modais de Excluir Banca
	handlerMostrarModalExcluirBanca = (banca) => {
		handlerMostrarModalExcluirBanca(this, banca);
	};

	handlerFecharModalExcluirBanca = () => {
		handlerFecharModalExcluirBanca(this);
	};

	// Modais de Finalizar Banca
	handlerMostrarModalFinalizarBanca = (banca) => {
		handlerMostrarModalFinalizarBanca(this, banca);
	};

	handlerFecharModalFinalizarBanca = () => {
		handlerFecharModalFinalizarBanca(this);
	};

	// Manipulação de Formulários
	handleCadastrarOrientando = (e) => {
		handleCadastrarOrientando(this, e);
	};

	handleAtualizarOrientando = (e) => {
		handleAtualizarOrientando(this, e);
	};

	handleCadastrarBanca = (e) => {
		handleCadastrarBanca(this, e);
	};

	handleAtualizarBanca = (e) => {
		handleAtualizarBanca(this, e);
	};

	handleExcluirBanca = (e) => {
		handleExcluirBanca(this, e);
	};

	// Manipulação de Opções e Resumos
	handleOptionChange = (nomeEstadoResposta, valor) => {
		handleOptionChange(this, nomeEstadoResposta, valor);
	};

	handleResumoChange = (nomeEstadoResumo, valor) => {
		handleResumoChange(this, nomeEstadoResumo, valor);
	};

	// Funções Utilitárias
	obterPapelMembroEmInglês = (membroNome) => {
		return getMemberRoleEnglish(this, membroNome);
	};

	obterPapelMembroEmPortuguês = (membroNome) => {
		return getMemberRolePortuguese(this, membroNome);
	};

	obterTipoCursoEmInglês = () => {
		return getCourseTypeEnglish(this);
	};

	obterTipoCursoEmPortuguês = () => {
		return getCourseTypePortuguese(this);
	};

	obterTipoBancaEmInglês = () => {
		return getBancaTypeEnglish(this);
	};

	obterTipoBancaEmPortuguês = () => {
		return getBancaTypePortuguese(this);
	};

	obterNomeProgramaEmInglês = () => {
		return getProgramNameEnglish(this);
	};

	obterNomeProgramaEmPortuguês = () => {
		return getProgramNamePortuguese(this);
	};

	// Fechar Modal de Visualizar Declaração
	handlerFecharModalVisualizarDeclaracao = () => {
		handlerFecharModalVisualizarDeclaracao(this);
	};
	componentDidMount() {
		// Carregar membros da declaração de participação
		carregarMembrosDaDeclaracaoDeParticipacao(this);

		// Carregar outras informações necessárias
		this.loadInformacoesDoOrientador();
		this.loadOrientandos();
		this.loadBancas(1);
		this.loadBancas(2);
		this.loadTiposDeBanca();
	}

	// Funções para carregar dados
	loadInformacoesDoOrientador = async () => {
		const orientadorData = await buscaInformacoesDoOrientador(getToken());
		if (orientadorData.length > 0) {
			const idAreaConcentracao = orientadorData[0].id_areaConcentracao;
			this.setState({ idAreaConcentracao });
			// Carrega linhas de pesquisa
			const linhasDePesquisasData = await listaDeLinhasDePesquisas(idAreaConcentracao);
			this.setState({ arrayLinhasDePesquisas: linhasDePesquisasData });
		}
	};

	loadOrientandos = async (nome = '', idLinhaPesquisa = 0, idFaseProcesso = 0) => {
		const orientandosData = await listaDeOrientandos(getToken(), this.context.user.id, nome, idLinhaPesquisa, idFaseProcesso);
		this.setState({ array_orientandos: orientandosData });
	};

	loadBancas = async (id_tipoBanca) => {
		const bancasData = await listaDeBancas(getToken(), this.context.user.id, id_tipoBanca);
		if (id_tipoBanca === 1) {
			this.setState({ array_bancasQ: bancasData });
		} else if (id_tipoBanca === 2) {
			this.setState({ array_bancasD: bancasData });
		}
	};

	// Função para obter o tipo de membro em português
	getMemberRolePortuguese = (membroNome) => {
		const membro = this.state.arrayMembrosDaDeclaracaoDeParticipacao.find(
			(membro) => membro.nome === membroNome
		);
		return membro ? membro.tipo : '';
	};x
	loadTiposDeBanca = async () => {
		const tiposBancaData = await listaDeTiposDeBanca(getToken());
		this.setState({ array_tiposBanca: tiposBancaData });
	};

	loadCursos = async () => {
		const cursosData = await listaDeCursos(getToken());
		this.setState({ array_cursos: cursosData });
	};

	// Defina as funções como métodos da classe, chamando as funções importadas
	handlerMostrarModalCadastrarBanca = () => {
		handlerMostrarModalCadastrarBanca(this);
	};

	handlerFecharModalCadastrarBanca = () => {
		handlerFecharModalCadastrarBanca(this);
	};

	handlerMostrarModalAtualizarBanca = (banca) => {
		handlerMostrarModalAtualizarBanca(this, banca);
	};

	handlerFecharModalAtualizarBanca = () => {
		handlerFecharModalAtualizarBanca(this);
	};

	handleOptionChange = (nomeEstadoResposta, valor) => {
		handleOptionChange(this, nomeEstadoResposta, valor);
	};

	handleResumoChange = (nomeEstadoResumo, valor) => {
		handleResumoChange(this, nomeEstadoResumo, valor);
	};

	// Renderização
	render() {

		const {
			array_orientandos,
			array_tiposBanca,
			array_bancasQ,
			array_bancasD,
			array_cursos,
			array_status,
			arrayLinhasDePesquisas,
			arrayAreaConcentracao,
			arrayOrientacao,
			arrayMembrosDaDeclaracaoDeParticipacao,
			array_declaracoes,
			arrayAnexosDaOrientacao,
			arrayAnexosDoOrientando,
			nome,
		} = this.state;

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
						<AdminNavbar id_usuario={this.state.id_usuario}
							listaDeChamados={this.listaDeChamados}
							handlerShowModalCadastrarChamado={this.handlerShowModalCadastrarChamado}
						/> {/* Adicione o componente AdminNavbar aqui */}
					</Col>
				</Row>
				<Row>
					<Col xs={12} id="main">
						<MainContent>
							<MenuFlutuante
								handlerShowModalCadastrarBanca={this.handlerShowModalCadastrarBanca}
								handlerShowModalCadastrarEAtualizarOrientacao={this.handlerShowModalCadastrarEAtualizarOrientacao}
								id_orientando={this.state.id_orientando}
							>
							</MenuFlutuante>
							<div className="content">
								<div className="content">
									{/* Painel de Estatísticas */}
									<StatisticsPanel
										array_orientandos={array_orientandos}
										array_bancasQ={array_bancasQ}
										array_bancasD={array_bancasD}
									/>

									{/* Abas */}
									<Tabs
										variant="pills"
										defaultActiveKey="bancas"
										transition={false}
										id="panel-admin"
										className="justify-content-center"
									>
										<Tab eventKey="orientandos" title="Orientandos">
											<OrientandosTab
												nome={nome}
												array_orientandos={array_orientandos}
												arrayLinhasDePesquisas={arrayLinhasDePesquisas}
												array_tiposBanca={array_tiposBanca}
												handlerShowModalEditarOrientando={
													this.handlerShowModalEditarOrientando
												}
												loadOrientandos={this.loadOrientandos}
												setState={this.setState.bind(this)}
											/>
										</Tab>

										<Tab eventKey="bancas" title="Bancas">
											<BancasTab
												array_bancasQ={array_bancasQ}
												array_bancasD={array_bancasD}
												handlerShowModalAtualizarBanca={this.handlerShowModalAtualizarBanca}
												handlerShowModalEmitirDeclaracao={this.handlerShowModalEmitirDeclaracao}
												handlerShowModalEmitirAta={this.handlerShowModalEmitirAta}
												handlerShowModalAtualizarAta={this.handlerShowModalAtualizarAta}
												handlerShowModalVisualizarAta={this.handlerShowModalVisualizarAta}
												handlerShowModalEmitirFichaDeAvaliacao={
													this.handlerShowModalEmitirFichaDeAvaliacao
												}
												handlerShowModalEditarFichaDeAvaliacao={
													this.handlerShowModalEditarFichaDeAvaliacao
												}
												handlerShowModalVisualizarFichaDeAvaliacao={
													this.handlerShowModalVisualizarFichaDeAvaliacao
												}
												handlerShowModalExcluirBanca={this.handlerShowModalExcluirBanca}
												handlerShowModalFinalizarBanca={this.handlerShowModalFinalizarBanca}
												handlerShowModalEmitirDeclaracaoDeOrientacao={
													this.handlerShowModalEmitirDeclaracaoDeOrientacao
												}
												handlerShowModalVisualizarDeclaracaoDeOrientacao={
													this.handlerShowModalVisualizarDeclaracaoDeOrientacao
												}
												handlerShowModalCadastrarEAtualizarFolhaDeAprovacao={
													this.handlerShowModalCadastrarEAtualizarFolhaDeAprovacao
												}
												handlerShowModalVisualizarFolhaDeAprovacao={
													this.handlerShowModalVisualizarFolhaDeAprovacao
												}
												handlerShowModalVisualizarCertificadoDeAprovacao={
													this.handlerShowModalVisualizarCertificadoDeAprovacao
												}
											/>
										</Tab>
									</Tabs>
								</div>
								{/* /.content */}
								<br />
							</div>

							{/* Modal Cadastrar Banca */}

							<CustomModal
								show={this.state.modalShowCadastrarBanca}
								onHide={this.handlerCloseModalCadastrarBanca}
								title={
									<>
										<FaLayerGroup /> Registrar uma nova banca
									</>
								}
								size="xl"
							>
								<Form onSubmit={this.handleCadastrarBanca}>
									<div className="row" style={{ maxHeight: '380px', overflowY: 'scroll' }}>
										<div className="col-sm-6">
											{/* Orientando */}
											<FormSelect
												label="Orientando:*"
												id="selectOrientando"
												value={this.state.id_orientando}
												onChange={(e) => this.setState({ id_orientando: e.target.value })}
												options={[
													<option key="0" value="0">
														Selecione
													</option>,
													this.state.array_orientandos.length > 0
														? this.state.array_orientandos.map((orientando) => (
															<option key={orientando.id} value={orientando.id}>
																{orientando.nome.toUpperCase()}
															</option>
														))
														: <option key="0" value="0">Nenhum orientando encontrado</option>,
												]}
											/>

											{/* Tipo da banca */}
											<FormSelect
												label="Tipo da banca:*"
												id="selectTipoBanca"
												value={this.state.id_tipoBanca}
												onChange={(e) => this.setState({ id_tipoBanca: e.target.value })}
												options={[
													<option key="0" value="0">
														Selecione
													</option>,
													this.state.array_tiposBanca.length > 0
														? this.state.array_tiposBanca.map((tipo) =>
															parseInt(tipo.id) < 3 ? (
																<option key={tipo.id} value={tipo.id}>
																	{tipo.nome}
																</option>
															) : null
														)
														: <option key="0" value="0">Nenhum resultado encontrado</option>,
												]}
											/>

											{/* Área de concentração */}
											<FormSelect
												label="Área de concentração:*"
												id="selectAreaConcentracao"
												value={this.state.idAreaConcentracao}
												onChange={() => { }}
												options={
													this.state.arrayAreaConcentracao.length > 0
														? this.state.arrayAreaConcentracao.map((area) =>
															area.id === this.state.idAreaConcentracao ? (
																<option key={area.id} value={area.id}>
																	{area.nome}
																</option>
															) : null
														)
														: [
															<option key="0" value="0">
																Nenhuma área encontrada
															</option>,
														]
												}
												readOnly
											/>

											{/* Linha de pesquisa */}
											<FormSelect
												label="Linha de pesquisa:*"
												id="selectLinhaPesquisa"
												value={this.state.idLinhaPesquisa}
												onChange={(e) => this.setState({ idLinhaPesquisa: e.target.value })}
												options={[
													<option key="0" value="0">
														Selecione
													</option>,
													this.state.arrayLinhasDePesquisas.length > 0
														? this.state.arrayLinhasDePesquisas.map((linha) => (
															<option key={linha.id} value={linha.id}>
																{linha.linha_pesquisa}
															</option>
														))
														: <option key="0" value="0">Nenhuma linha de pesquisa encontrada</option>,
												]}
											/>

											{/* Data e hora prevista */}
											<FormInput
												label="Data e hora prevista:"
												id="dataHoraPrevista"
												type="datetime-local"
												value={this.state.data_horaPrevista}
												onChange={(e) => this.setState({ data_horaPrevista: e.target.value })}
												min="2022-01"
											/>

											{/* Membros internos */}
											<FormMultiSelect
												label="Membros internos:*"
												options={this.state.arrayMembrosInternos}
												value={this.state.arraySelectedMembrosInternos}
												onChange={(e) => this.setState({ arraySelectedMembrosInternos: e })}
											/>
										</div>
										<div className="col-sm-6">
											{/* Membros externos */}
											<FormMultiSelect
												label="Membros externos:*"
												options={this.state.arrayMembrosExternos}
												value={this.state.arraySelectedMembrosExternos}
												onChange={(e) => this.setState({ arraySelectedMembrosExternos: e })}
											/>

											{/* Título */}
											<FormTextarea
												label="Título:"
												id="titulo"
												rows="3"
												value={this.state.titulo}
												onChange={(e) => this.setState({ titulo: e.target.value })}
											/>

											{/* Título em inglês */}
											<FormTextarea
												label="Título em inglês:"
												id="title"
												rows="3"
												value={this.state.title}
												onChange={(e) => this.setState({ title: e.target.value })}
											/>

											{/* Resumo */}
											<FormTextarea
												label="Resumo:"
												id="resumo"
												rows="3"
												value={this.state.resumo}
												onChange={(e) => this.setState({ resumo: e.target.value })}
											/>

											{/* Palavra-chave */}
											<FormTextarea
												label="Palavra-chave:"
												id="palavra_chave"
												rows="3"
												value={this.state.palavra_chave}
												onChange={(e) => this.setState({ palavra_chave: e.target.value })}
											/>
										</div>
									</div>

									{/* Mensagens de Sucesso ou Erro */}
									<SuccessErrorMessage
										success={this.state.success}
										error={this.state.error}
									/>

									{/* Botão de Salvar */}
									<div className="d-flex justify-content-center">
										<button className="button">
											<FaRegSave /> Salvar
										</button>
									</div>
								</Form>
							</CustomModal>

							{/* Modal Cadastrar Orientando */}
							<FormModal
								show={this.state.modalShowCadastrarOrientando}
								onHide={this.handlerCloseModalCadastrarOrientando}
								title={
									<>
										<FaUserGraduate /> Cadastrar um novo orientando
									</>
								}
								size="md"
								onSubmit={this.handleCadastrarOrientando}
							>
								<p className="text-danger">
									As informações cadastrais serão utilizadas pelo aluno para acessar a plataforma.
								</p>
								<div className="row">
									<div className="col-sm-6">
										{/* Nome */}
										<FormField
											label="Nome"
											id="nome"
											value={this.state.nome}
											onChange={(e) => this.setState({ nome: e.target.value })}
											placeholder="Digite seu nome completo"
										/>

										{/* Email */}
										<FormField
											label="Email"
											id="email"
											type="email"
											value={this.state.email}
											onChange={(e) => this.setState({ email: e.target.value })}
											placeholder="Informe o seu email"
										/>

										{/* Curso */}
										<FormField
											label="Curso:*"
											id="selectCurso"
											value={this.state.id_curso}
											onChange={(e) => this.setState({ id_curso: e.target.value })}
											isSelect
											options={[
												<option key="0" value="0">
													Selecione
												</option>,
												this.state.array_cursos.length > 0
													? this.state.array_cursos.map((curso) => (
														<option key={curso.id} value={curso.id}>
															{curso.nome}
														</option>
													))
													: [
														<option key="0" value="0">
															Nenhum curso encontrado
														</option>,
													],
											]}
										/>

										{/* Senha */}
										<div className="row" style={{ marginBottom: 20 }}>
											<div className="col-md-6">
												<FormField
													label="Senha"
													id="senha"
													type="password"
													value={this.state.senha}
													onChange={(e) => this.setState({ senha: e.target.value })}
													placeholder="Informe sua senha"
												/>
											</div>

											{/* Repetir Senha */}
											<div className="col-md-6">
												<FormField
													label="Repetir Senha"
													id="confirmarSenha"
													type="password"
													value={this.state.confirmarSenha}
													onChange={(e) => this.setState({ confirmarSenha: e.target.value })}
													placeholder="Informe sua senha novamente"
												/>
											</div>
										</div>

										{/* Fase do processo */}
										<FormField
											label="Fase do processo:*"
											id="selectFaseProcesso"
											value={this.state.fase_processo}
											onChange={(e) => this.setState({ fase_processo: e.target.value })}
											isSelect
											options={[
												<option key="0" value="0">
													Selecione
												</option>,
												this.state.array_tiposBanca.length > 0
													? this.state.array_tiposBanca.map((tipo) => (
														<option key={tipo.id} value={tipo.id}>
															{tipo.nome}
														</option>
													))
													: [
														<option key="0" value="0">
															Nenhum resultado encontrado
														</option>,
													],
											]}
										/>
									</div>

									<div className="col-sm-6">
										{/* Informações adicionais */}
										<FormField
											label="Informações adicionais"
											id="informacoes_adicionais"
											value={this.state.informacoes_adicionais}
											onChange={(e) => this.setState({ informacoes_adicionais: e.target.value })}
											isTextarea
										/>

										{/* Data/hora inicial do processo */}
										<FormField
											label="Data/hora inicial do processo:"
											id="dataHoraInicialFaseProcesso"
											type="datetime-local"
											value={this.state.dataHoraInicialFaseProcesso}
											onChange={(e) => this.setState({ dataHoraInicialFaseProcesso: e.target.value })}
											additionalProps={{ min: '2022-01' }}
										/>

										{/* Data/hora final do processo */}
										<FormField
											label="Data/hora final do processo:"
											id="dataHoraFinalFaseProcesso"
											type="datetime-local"
											value={this.state.dataHoraFinalFaseProcesso}
											onChange={(e) => this.setState({ dataHoraFinalFaseProcesso: e.target.value })}
											additionalProps={{ min: '2022-01' }}
										/>

										{/* Data/hora de conclusão */}
										<FormField
											label="Data/hora de conclusão:"
											id="dataHoraConclusao"
											type="datetime-local"
											value={this.state.dataHoraConclusao}
											onChange={(e) => this.setState({ dataHoraConclusao: e.target.value })}
											additionalProps={{ min: '2022-01' }}
										/>
									</div>
								</div>

								{/* Mensagens de Sucesso ou Erro */}
								<SuccessErrorMessage success={this.state.success} error={this.state.error} />
							</FormModal>

							{/* Modal Editar Orientando */}
							<FormModal
								show={this.state.modalShowEditarOrientando}
								onHide={this.handlerCloseModalEditarOrientando}
								title={
									<>
										<FaUserGraduate /> Atualizar as informações do orientando - {this.state.nome}
									</>
								}
								size="lg"
								onSubmit={this.handleAtualizarOrientando}
							>
								<p className="text-danger">
									As informações cadastrais serão utilizadas pelo aluno para acessar a plataforma.
								</p>

								<div className="row">
									<div className="col-sm-6">
										{/* Nome */}
										<FormField
											label="Nome"
											id="nome"
											value={this.state.nome}
											onChange={(e) => this.setState({ nome: e.target.value })}
											placeholder="Digite seu nome completo"
											className="form-control form-control-sm"
										/>
									</div>
									<div className="col-sm-6">
										{/* Email */}
										<FormField
											label="Email"
											id="email"
											type="email"
											value={this.state.email}
											onChange={(e) => this.setState({ email: e.target.value })}
											placeholder="Informe o seu email"
											className="form-control form-control-sm"
										/>
									</div>
								</div>

								<div className="row">
									{/* Curso */}
									<div className="col-sm-6">
										<FormField
											label="Curso:*"
											id="selectCurso"
											value={this.state.id_curso}
											onChange={(e) => this.setState({ id_curso: e.target.value })}
											isSelect
											className="form-control form-control-sm"
											options={[
												<option key="0" value="0">
													Selecione
												</option>,
												this.state.array_cursos.length > 0
													? this.state.array_cursos.map((curso) =>
														this.state.idAreaConcentracao === curso.id_areaConcentracao ? (
															<option key={curso.id} value={curso.id}>
																{curso.nome}
															</option>
														) : null
													)
													: [
														<option key="0" value="0">
															Nenhum curso encontrado
														</option>,
													],
											]}
										/>
									</div>

									{/* Fase do processo */}
									<div className="col-sm-6">
										<FormField
											label="Fase do processo:*"
											id="selectFaseProcesso"
											value={this.state.fase_processo}
											onChange={(e) => this.setState({ fase_processo: e.target.value })}
											isSelect
											className="form-control form-control-sm"
											options={[
												<option key="0" value="0">
													Selecione
												</option>,
												this.state.array_tiposBanca.length > 0
													? this.state.array_tiposBanca.map((tipo) => (
														<option key={tipo.id} value={tipo.id}>
															{tipo.nome}
														</option>
													))
													: [
														<option key="0" value="0">
															Nenhum resultado encontrado
														</option>,
													],
											]}
										/>
									</div>
								</div>

								{/* Senha */}
								<div className="row">
									<div className="col-md-6">
										<FormField
											label="Senha"
											id="senha"
											type="password"
											value={this.state.senha}
											onChange={(e) => this.setState({ senha: e.target.value })}
											placeholder="Informe sua senha"
											className="form-control form-control-sm"
										/>
									</div>

									{/* Repetir Senha */}
									<div className="col-md-6">
										<FormField
											label="Repetir Senha"
											id="confirmarSenha"
											type="password"
											value={this.state.confirmarSenha}
											onChange={(e) => this.setState({ confirmarSenha: e.target.value })}
											placeholder="Informe sua senha novamente"
											className="form-control form-control-sm"
										/>
									</div>
								</div>

								{/* Informações adicionais */}
								<FormField
									label="Informações adicionais"
									id="informacoes_adicionais"
									value={this.state.informacoes_adicionais}
									onChange={(e) => this.setState({ informacoes_adicionais: e.target.value })}
									isTextarea
									className="form-control form-control-sm"
								/>

								{/* Datas */}
								<div className="row">
									{/* Data/hora inicial do processo */}
									<div className="col-sm-4">
										<FormField
											label="Data/hora inicial do processo:"
											id="dataHoraInicialFaseProcesso"
											type="datetime-local"
											value={this.state.dataHoraInicialFaseProcesso}
											onChange={(e) => this.setState({ dataHoraInicialFaseProcesso: e.target.value })}
											additionalProps={{ min: '2022-01' }}
											className="form-control form-control-sm"
										/>
									</div>

									{/* Data/hora final do processo */}
									<div className="col-sm-4">
										<FormField
											label="Data/hora final do processo:"
											id="dataHoraFinalFaseProcesso"
											type="datetime-local"
											value={this.state.dataHoraFinalFaseProcesso}
											onChange={(e) => this.setState({ dataHoraFinalFaseProcesso: e.target.value })}
											additionalProps={{ min: '2022-01' }}
											className="form-control form-control-sm"
										/>
									</div>

									{/* Data/hora de conclusão */}
									<div className="col-sm-4">
										<FormField
											label="Data/hora de conclusão:"
											id="dataHoraConclusao"
											type="datetime-local"
											value={this.state.dataHoraConclusao}
											onChange={(e) => this.setState({ dataHoraConclusao: e.target.value })}
											additionalProps={{ min: '2022-01' }}
											className="form-control form-control-sm"
										/>
									</div>
								</div>

								{/* Mensagens de Sucesso ou Erro */}
								<SuccessErrorMessage success={this.state.success} error={this.state.error} />

								{/* Botão de Salvar */}
								<div className="float-right">
									<button className="button">
										<FaRegSave /> Salvar
									</button>
								</div>

								{/* Orientações */}
								<hr />

								<div className="row">
									<div className="col-sm-10">
										<h3>
											<FaUserGraduate /> Orientações
										</h3>
									</div>
									<div className="col-sm-2">
										{/* Botão para Cadastrar Nova Orientação */}
										<button
											className="btn btn-primary"
											onClick={() =>
												this.handlerShowModalCadastrarEAtualizarOrientacao({
													id_orientacao: 0,
												})
											}
										>
											<FaPlus /> Nova Orientação
										</button>
									</div>
								</div>

								<hr />

								{/* Tabela de Orientações */}
								<DataTable
									headers={[
										'N° da orientação',
										'Link',
										'Orientando',
										'Observação',
										'Data/hora prevista',
										'Ações',
									]}
									data={this.state.arrayOrientacao}
									renderRow={(orientacao) => (
										<tr
											key={orientacao.id}
											title="Clique aqui para obter mais informações sobre a orientação"
										>
											<td>{orientacao.id}</td>
											<td>
												{orientacao.link ? (
													<a href={orientacao.link}>Link da orientação</a>
												) : (
													'Nenhum link anexado'
												)}
											</td>
											<td>{orientacao.orientando}</td>
											<td>{orientacao.observacao}</td>
											<td>{orientacao.dataHoraPrevistaTb}</td>
											<td>
												<button
													className="btn btn-sm btn-outline-primary"
													onClick={() =>
														this.handlerShowModalCadastrarEAtualizarOrientacao(orientacao)
													}
												>
													<FaRegEdit /> Atualizar
												</button>
											</td>
										</tr>
									)}
									noDataText="Nenhum resultado encontrado"
								/>

								{/* Total de Registros */}
								<div className="text-center font-weight-bold mt-3 mb-5">
									Total de Registros: {this.state.arrayOrientacao.length}
								</div>
							</FormModal>

							{/* Modal para Excluir Banca */}

							<ConfirmationModal
								show={this.state.modalShowExcluirBanca}
								onHide={this.handlerCloseModalExcluirBanca}
								title={
									<>
										<FaUserGraduate /> Excluir banca
									</>
								}
								message={
									<>
										Confirmar a exclusão da banca de {this.state.tipo_banca} do orientando{' '}
										{this.state.nome}
									</>
								}
								onConfirm={this.handleExcluirBanca}
								successMessage={this.state.success}
								errorMessage={this.state.error}
							/>

							{/* Modal para Emitir ATA */}

							<FormModal
								show={this.state.modalShowEmitirAta}
								onHide={this.handlerCloseModalEmitirAta}
								title={
									<>
										<FaUserGraduate /> Emitir ata de {this.state.tipo_banca.toLowerCase()}
									</>
								}
								size="md"
								onSubmit={this.handleCadastrarATA}
							>
								<FormField
									label="Status:"
									id="selectStatusAta"
									value={this.state.status_ata}
									onChange={(e) => this.setState({ status_ata: e.target.value })}
									isSelect
									className="form-control form-control-sm"
									options={[
										<option key="0" value="0">
											Selecionar
										</option>,
										this.state.array_status.length > 0
											? this.state.array_status.map((item) =>
												parseInt(item.id) > 2 ? (
													<option key={item.id} value={item.id}>
														{item.nome}
													</option>
												) : null
											)
											: [
												<option key="0" value="0">
													Nenhum resultado encontrado
												</option>,
											],
									]}
								/>

								{/* Mensagens de Sucesso ou Erro */}
								<SuccessErrorMessage success={this.state.success} error={this.state.error} />

								{/* Botão de Salvar */}
								<div className="d-flex justify-content-end">
									<button className="button">
										<FaRegSave /> Salvar
									</button>
								</div>
							</FormModal>

							{/* Modal para Atualizar ATA */}

							<FormModal
								show={this.state.modalShowAtualizarAta}
								onHide={this.handlerCloseModalAtualizarAta}
								title={
									<>
										<FaUserGraduate /> Atualizar ata de {this.state.tipo_banca}
									</>
								}
								size="md"
								onSubmit={this.handleAtualizarATA}
							>
								<FormField
									label="Status:"
									id="selectStatusAta"
									value={this.state.id_statusAta}
									onChange={(e) => this.setState({ id_statusAta: e.target.value })}
									isSelect
									className="form-control"
									options={[
										<option key="0" value="0">
											Selecionar
										</option>,
										this.state.array_status.length > 0
											? this.state.array_status.map((item) =>
												parseInt(item.id) > 2 ? (
													<option key={item.id} value={item.id}>
														{item.nome}
													</option>
												) : null
											)
											: [
												<option key="0" value="0">
													Nenhum resultado encontrado
												</option>,
											],
									]}
								/>

								{/* Mensagens de Sucesso ou Erro */}
								<SuccessErrorMessage success={this.state.success} error={this.state.error} />

								{/* Botão de Salvar */}
								<div className="d-flex justify-content-end">
									<button className="button">
										<FaRegSave /> Salvar
									</button>
								</div>
							</FormModal>

							{/* Modal para Visualizar ATA */}

							<CustomModal
								show={this.state.modalShowVisualizarAta}
								onHide={this.handlerCloseModalVisualizarAta}
								title={
									<>
										<FaUserGraduate /> Visualizar ata de {this.state.tipo_banca}
									</>
								}
								size="lg"
							>
								<div id="ata">
									<div className="container">
										{/* Se necessário, você pode envolver AtaDefesa com DocumentContainer */}
										{/* <DocumentContainer> */}
										<AtaDefesa
											nome={this.state.nome}
											id_curso={this.state.id_curso}
											titulo={this.state.titulo}
											data_horaPrevista={this.state.data_horaPrevista}
											status_ata={this.state.status_ata}
											arrayMembrosDaAtaDeDefesa={this.state.arrayMembrosDaAtaDeDefesa}
											dataFormatAmericano={this.state.dataFormatAmericano}
										/>
										{/* </DocumentContainer> */}
									</div>
								</div>
								<div className="modal-footer">
									<button className="button" onClick={() => print('ata')}>
										Imprimir
									</button>
								</div>
							</CustomModal>

							{/* cadastrar ficha de avaliação */}

							<FormModal
								show={this.state.modalShowEmitirFichaDeAvaliacao}
								onHide={this.handlerCloseModalEmitirFichaDeAvaliacao}
								title={
									<>
										<FaWpforms /> Cadastrar ficha de avaliação
									</>
								}
								size="lg"
								onSubmit={this.handleCadastrarFichaDeAvaliacao}
							>
								{/* Outros campos do formulário, como Orientando, Curso, etc. */}
								{/* Exemplo de um campo adicional */}
								<FormField
									label="Orientando:"
									id="selectOrientando"
									value={this.state.id_orientando}
									onChange={(e) => this.setState({ id_orientando: e.target.value })}
									isSelect
									options={[
										<option key="0" value="0">
											Selecione
										</option>,
										this.state.array_orientandos.map((orientando) => (
											<option key={orientando.id} value={orientando.id}>
												{orientando.nome}
											</option>
										)),
									]}
								/>

								{/* Renderização das perguntas utilizando o componente PerguntaAvaliacao */}
								{getPerguntas(this.state).map((pergunta) => (
									<PerguntaAvaliacao
										key={pergunta.numeroPergunta}
										numeroPergunta={pergunta.numeroPergunta}
										textoPergunta={pergunta.textoPergunta}
										nomeEstadoResposta={pergunta.nomeEstadoResposta}
										nomeEstadoResumo={pergunta.nomeEstadoResumo}
										valorSelecionado={this.state[pergunta.nomeEstadoResposta]}
										valorResumo={this.state[pergunta.nomeEstadoResumo]}
										aoAlterarResposta={this.handleOptionChange}
										aoAlterarResumo={this.handleResumoChange}
										opcoes={pergunta.opcoes}
									/>
								))}

								{/* Mensagens de sucesso ou erro */}
								<SuccessErrorMessage success={this.state.success} error={this.state.error} />

								{/* Botão de Salvar */}
								<div className="d-flex justify-content-end">
									<button className="button">
										<FaRegSave /> Salvar
									</button>
								</div>
							</FormModal>

							{/* Atualizar ficha de avaliação */}

							<FormModal
								show={this.state.modalShowEditarFichaDeAvaliacao}
								onHide={this.handlerCloseModalEditarFichaDeAvaliacao}
								title="Atualizar ficha de avaliação"
								size="lg"
								onSubmit={this.handleAtualizarFichaDeAvaliacao}
							>
								{/* Outros campos do formulário, como Orientando, Curso, etc. */}
								<div className="row">
									<div className="col-sm-6">
										<FormField
											label="Orientando:*"
											id="selectOrientando"
											value={this.state.id_orientando}
											onChange={(e) => this.setState({ id_orientando: e.target.value })}
											isSelect
											options={
												this.state.array_orientandos.length > 0
													? this.state.array_orientandos.map((orientando) =>
														this.state.id_orientando === orientando.id ? (
															<option key={orientando.id} value={orientando.id}>
																{orientando.nome}
															</option>
														) : null
													)
													: [
														<option key="0" value="0">
															Nenhum orientando encontrado
														</option>,
													]
											}
										/>
									</div>
									<div className="col-sm-6">
										<FormField
											label="Curso:*"
											id="selectCurso"
											value={this.state.id_curso}
											onChange={(e) => this.setState({ id_curso: e.target.value })}
											isSelect
											options={
												this.state.array_cursos.length > 0
													? this.state.array_cursos.map((curso) =>
														this.state.id_curso === curso.id ? (
															<option key={curso.id} value={curso.id}>
																{curso.nome}
															</option>
														) : null
													)
													: [
														<option key="0" value="0">
															Nenhum curso encontrado
														</option>,
													]
											}
										/>
									</div>
								</div>

								{/* Renderização das getPerguntas utilizando o componente PerguntaAvaliacao */}
								{getPerguntas(this).map((pergunta) => (
									<PerguntaAvaliacao
										key={pergunta.numeroPergunta}
										numeroPergunta={pergunta.numeroPergunta}
										textoPergunta={pergunta.textoPergunta}
										nomeEstadoResposta={pergunta.nomeEstadoResposta}
										nomeEstadoResumo={pergunta.nomeEstadoResumo}
										valorSelecionado={this.state[pergunta.nomeEstadoResposta]}
										valorResumo={this.state[pergunta.nomeEstadoResumo]}
										aoAlterarResposta={this.handleOptionChange}
										aoAlterarResumo={this.handleResumoChange}
										opcoes={pergunta.opcoes} // Passa as opções personalizadas se houver
									/>
								))}

								{/* Mensagens de sucesso ou erro */}
								<SuccessErrorMessage success={this.state.success} error={this.state.error} />

								{/* Botão de Salvar */}
								<div className="d-flex justify-content-end">
									<button className="button">
										<FaRegSave /> Salvar
									</button>
								</div>
							</FormModal>

							<CustomModal
								show={this.state.modalShowVisualizarFichaDeAvaliacao}
								onHide={this.handlerCloseModalVisualizarFichaDeAvaliacao}
								size="xl"
							>
								<FichaDeAvaliacao
									nome={this.state.nome}
									id_curso={this.state.id_curso}
									areaConcentracao={this.state.areaConcentracao}
									linha_pesquisa={this.state.linha_pesquisa}
									titulo_teseOuDissertacao={this.state.titulo_teseOuDissertacao}
									orientador={this.state.orientador}
									membro_interno={this.state.membro_interno}
									titulo_projeto={this.state.titulo_projeto}
									resumoQ1={this.state.resumoQ1}
									pergunta_condutora={this.state.pergunta_condutora}
									resumoQ2={this.state.resumoQ2}
									hipotese={this.state.hipotese}
									resumoQ3={this.state.resumoQ3}
									fundamentacao_teorica={this.state.fundamentacao_teorica}
									resumoQ4={this.state.resumoQ4}
									objetivo={this.state.objetivo}
									resumoQ5={this.state.resumoQ5}
									metodo={this.state.metodo}
									resumoQ6={this.state.resumoQ6}
									cronograma={this.state.cronograma}
									resumoQ7={this.state.resumoQ7}
									conclusao_avaliacao={this.state.conclusao_avaliacao}
									resumoQ8={this.state.resumoQ8}
									dataFichaAvaliacaoPtBr={this.state.dataFichaAvaliacaoPtBr}
									assinatura_presidente={this.state.assinatura_presidente}
									Logo_ATA={Logo_ATA}
								/>
							</CustomModal>

							{/* modal de declaração de participação */}

							<Modal
								show={this.state.modalShowVisualizarDeclaracao}
								onHide={this.handlerCloseModalVisualizarDeclaracao}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered
							>
								<Modal.Header closeButton>
									<h4 className="titulo">
										<FaUserGraduate /> Declaração de {this.state.membro}
									</h4>
								</Modal.Header>
								<Modal.Body>
									<div id="declaracao">
										<DocumentContainer>
											<DocumentHeader logoSrc={Logo_ATA} />
											<div style={{ padding: '50px' }}>
												<h4 className="text-center font-weight-bold mb-3">
													{this.state.documentoEmIngles
														? 'CERTIFICATE OF PARTICIPATION'
														: 'DECLARAÇÃO DE PARTICIPAÇÃO'}
												</h4>

												{this.state.documentoEmIngles ? (
													<p className="text-justify p-4">
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We hereby certify that{' '}
														{this.state.sexo === 'M' ? 'Prof. Dr. ' : 'Prof(a). Dr(a). '}
														<b>{this.state.membro.toUpperCase()}</b> participated on{' '}
														{this.state.data_horaPrevistaEnUs}, as an{' '}
														{this.getMemberRoleEnglish(this.state.membro)} of the Examination Committee for the
														{this.getCourseTypeEnglish()} {this.getBancaTypeEnglish()} of{' '}
														<b>{this.state.orientando.toUpperCase()}</b>, a regular student in the Graduate{' '}
														<strong>{this.getProgramNameEnglish()}</strong>, titled{' '}
														<b>{this.state.title.toUpperCase()}</b>. The Examination Committee was composed of
														the following members:
													</p>
												) : (
													<>nada</>
													// <p className="text-justify p-4">
													// 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atestamos que{' '}
													// 	{this.state.sexo === 'M' ? 'o ' : 'a '}
													// 	{this.state.sexo === 'M' ? 'Prof. Dr. ' : 'Prof(a). Dr(a). '}
													// 	{/* <b>{this.state.membro.toUpperCase()}</b>, participou em{' '} */}
													// 	{this.state.data_horaPrevistaPtBr}, como{' '}
													// 	{this.getMemberRolePortuguese(this.state.membro)} da Comissão Examinadora da{' '}
													// 	{this.getBancaTypePortuguese}
													// 	{this.getCourseTypePortuguese()} de{' '}
													// 	<b>{this.state.orientando.toUpperCase()}</b>, discente regular do{' '}
													// 	{this.getProgramNamePortuguese()}, Curso de{' '}
													// 	{this.state.curso ? this.state.curso.split(' ', 1)[0] : ''}, cujo trabalho se
													// 	intitula <b>{this.state.titulo_banca.toUpperCase()}</b>. A Comissão Examinadora foi
													// 	constituída pelos seguintes membros:
													// </p>
												)}

												{/* Lista de Membros */}
												<MemberList
													membros={this.state.arrayMembrosDaDeclaracaoDeParticipacao}
													isEnglish={this.state.documentoEmIngles}
												/>

												<p
													className={
														this.state.documentoEmIngles
															? 'text-right p-3'
															: 'mt-2 text-right p-4'
													}
												>
													{this.state.documentoEmIngles
														? this.state.dataDeclaracaoEnUs
														: `Orlando, ${this.state.data_horaPrevistaPtBr}`}
												</p>

												<SignatureBlock isEnglish={this.state.documentoEmIngles} />

												<div className="row">
													<div className="col-sm-6">
														<p className="text-center" style={{ fontSize: '8pt' }}>
															{this.state.documentoEmIngles
																? `Proof Control Code: ${this.state.codigo_validacao}`
																: `Código de controle do comprovante: ${this.state.codigo_validacao}`}
														</p>
													</div>
													<div className="col-sm-6">
														<p className="text-center" style={{ fontSize: '8pt' }}>
															{this.state.documentoEmIngles
																? 'The authenticity of this certificate can be verified at https://www.gestorgruponexus.com.br/validacao'
																: 'A autenticidade desta declaração poderá ser confirmada no endereço https://www.gestorgruponexus.com.br/validacao'}
														</p>
													</div>
												</div>

												<DocumentFooter />
											</div>
										</DocumentContainer>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={() => this.print('declaracao')}>Imprimir</Button>
								</Modal.Footer>
							</Modal>

							{/* Modal Visualizar Declaração de Orientação */}

							<Modal
								show={this.state.modalShowVisualizarDeclaracaoDeOrientacao}
								onHide={this.handlerCloseModalVisualizarDeclaracaoDeOrientacao}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered
							>
								<Modal.Header closeButton>
									<h4 className="titulo mb-3">
										<FaUserGraduate /> Declaração de orientação
									</h4>
								</Modal.Header>
								<Modal.Body>
									<div id="declaracao_participacao">
										<DocumentContainer>
											<DocumentHeader logoSrc={Logo_ATA} />
											<div style={{ padding: '50px' }}>
												<h4 className="text-center font-weight-bold mb-3">
													{this.state.documentoEmIngles ? 'Guidance Statement' : 'DECLARAÇÃO DE ORIENTAÇÃO'}
												</h4>

												{this.state.documentoEmIngles ? (
													<p
														style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12pt', textAlign: 'justify' }}
														className="p-3"
													>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We hereby declare that{' '}
														{this.state.sexo === 'M' ? 'Prof. Dr. ' : 'Prof(a). Dr(a). '}
														<b>{this.state.orientador}</b>, from the {this.getProgramNameEnglish()}, supervised the{' '}
														{this.getCourseTypeEnglish()} of {this.state.orientando.toUpperCase()}, a regular student in the{' '}
														{this.getProgramNameEnglish()}, titled <b>{this.state.title.toUpperCase()}</b>.
													</p>
												) : (
													<>nada</>
													// <p style={{ fontSize: '12pt', textAlign: 'justify' }} className="p-3">
													// 	&nbsp;&nbsp;&nbsp;&nbsp;Declaramos que {this.state.sexo === 'M' ? 'o ' : 'a '}
													// 	{this.state.sexo === 'M' ? 'Prof. Dr. ' : 'Prof(a). Dr(a). '}
													// 	<b>{this.state.orientador}</b>, do(a) {this.getProgramNamePortuguese()}, realizou a orientação da{' '}
													// 	{this.getCourseTypePortuguese()} de {this.state.orientando.toUpperCase()}, discente regular do{' '}
													// 	{this.getProgramNamePortuguese()}, no curso de {this.state.curso.split(' ', 1)[0]}, cujo trabalho se
													// 	intitula: <b>{this.state.titulo}</b>.
													// </p>
												)}

												<p className="text-right p-3">
													{this.state.documentoEmIngles
														? `Orlando, ${this.state.dataDeclaracaoEnUs}`
														: `Orlando, ${this.state.dataDeclaracaoPtBr}`}
												</p>

												<SignatureBlock isEnglish={this.state.documentoEmIngles} />

												<p className="text-center" style={{ marginTop: '100px' }}>
													{this.state.documentoEmIngles
														? `Proof Control Code: ${this.state.codigo_validacao}`
														: `Código de controle do comprovante: ${this.state.codigo_validacao}`}
												</p>

												<p className="text-center">
													{this.state.documentoEmIngles
														? 'The authenticity of this statement can be confirmed at https://www.gestorgruponexus.com.br/validacao'
														: 'A autenticidade desta declaração poderá ser confirmada no endereço https://www.gestorgruponexus.com.br/validacao'}
												</p>

												<DocumentFooter />
											</div>
										</DocumentContainer>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={() => this.print('declaracao_participacao')}>Imprimir</Button>
								</Modal.Footer>
							</Modal>

							{/* Modal Visualizar Certificado de Aprovacao */}

							<Modal
								show={this.state.modalShowVisualizarCertificadoDeAprovacao}
								onHide={this.handlerCloseModalVisualizarCertificadoDeAprovacao}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered
							>
								<Modal.Header closeButton>
									<h4 className="titulo">
										<FaCalendarWeek /> Certificado de Aprovação
									</h4>
								</Modal.Header>
								<Modal.Body>
									<div id="certificado_aprovacao">
										<DocumentContainer>
											<DocumentHeader logoSrc={Logo_ATA} />
											<h4 className="font-weight-bold text-center mt-3 mb-5 p-3">
												CERTIFICADO DE APROVAÇÃO
											</h4>

											<p className="mt-3 p-3">TÍTULO DA TESE: {this.state.titulo}</p>
											<p className="font-weight-bold p-3">AUTOR(A): {this.state.nome}</p>
											<p className="font-weight-bold p-3">ORIENTADOR(A): {this.state.orientador}</p>

											<p className="p-3">
												Aprovada como parte das exigências para obtenção do título de Doutor(a) em Ciências
												Sociais, pela Comissão Examinadora:
											</p>

											{/* Utilizando o componente MemberSignatures */}
											<MemberSignatures
												membros={
													arrayMembrosDaDeclaracaoDeParticipacao
												} />

											<DocumentFooter />
										</DocumentContainer>
									</div>
								</Modal.Body>
							</Modal>

							{/* Modal Finalizar Banca */}

							<CustomModal
								show={this.state.modalShowFinalizarBanca}
								onHide={this.handlerCloseModalFinalizarBanca}
								title={
									<>
										<FaCalendarWeek /> Finalizar banca
									</>
								}
								size="sm"
							>
								<Form onSubmit={this.atualizarBanca}>
									<div className="text-center">
										<p>
											Confirmar a finalização da banca de {this.state.tipo_banca} do orientando{' '}
											{this.state.nome}
										</p>
										<ConfirmButton>Confirmar</ConfirmButton>

										<SuccessErrorMessage
											success={this.state.success}
											error={this.state.error}
										/>
									</div>
								</Form>
							</CustomModal>

							{/* Modal Visualizar Folha de Aprovacao */}

							<Modal
								show={this.state.modalShowVisualizarFolhaDeAprovacao}
								onHide={() => this.handlerCloseModalVisualizarFolhaDeAprovacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek /> Visualizar folha de aprovação</h4>
								</Modal.Header>
								<Modal.Body>
									<div id='folha_aprovacao' className='container'>
										<FolhaDeAprovacao
											nome={this.state.nome}
											id_curso={this.state.idAreaConcentracao}
											titulo={this.state.titulo}
											arrayMembrosDaDeclaracaoDeParticipacao={
												this.state.arrayMembrosDaDeclaracaoDeParticipacao
											}
											dtFolhaAprovacaoFormatada={this.state.dtFolhaAprovacaoFormatada}
										/>
									</div>
									<div className='d-flex justify-content-center'>
										<button className='button' onClick={() => print('folha_aprovacao')}>Imprimir</button>
									</div>
								</Modal.Body>
							</Modal>

							{/* Modal Emitir Folha de Aprovacao */}

							<Modal
								show={this.state.modalShowCadastrarEAtualizarFolhaDeAprovacao}
								onHide={() => this.handlerCloseModalCadastrarEAtualizarFolhaDeAprovacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate />Emitir folha de aprovação</h4>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={this.cadastrarEatualizarFolhaDeAprovacao}>
										<div className="form-group">
											<label for="dataHoraPrevista">Data de aprovação:</label>
											<input class="form-control form-control-sm" type="date" id="dataAprovacao" name="start"
												min="2022-01"
												onChange={e => this.setState({ dataAprovacao: e.target.value })}
												value={this.state.dataAprovacao}
											/>
										</div>

										<div className="row mt-2">
											<div className="col-sm-12">
												{this.state.success && (
													<div
														className="alert alert-success text-center"
														role="alert"
													>
														{this.state.success}
													</div>
												)}
												{this.state.error && (
													<div
														className="alert alert-danger text-center"
														role="alert"
													>
														{this.state.error}
													</div>
												)}
											</div>
										</div>

										<div className='d-flex justify-content-center'>
											<button className='button'><FaRegSave /> Salvar</button>
										</div>
									</Form>

								</Modal.Body>
							</Modal>

							{/* Modal Emitir Declaração de Orientação */}

							<Modal
								show={this.state.modalShowEmitirDeclaracaoDeOrientacao}
								onHide={() => this.handlerCloseModalEmitirDeclaracaoDeOrientacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered>
								<Form onSubmit={this.cadastrarEatualizarDeclaracaoDeOrientacao}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaCalendarWeek /> Emitir declaração de orientação</h4>
									</Modal.Header>
									<Modal.Body>
										<div className="form-group">
											<label for="dataHoraPrevista">Data:</label>
											<input class="form-control form-control-sm" type="date" id="dataOrientacao" name="start"
												min="2023-01"
												onChange={e => this.setState({ dataDeOrientacao: e.target.value })}
												value={this.state.dataDeOrientacao}
											/>
										</div>

										<div className="row mt-2">
											<div className="col-sm-12">
												{this.state.success && (
													<div
														className="alert alert-success text-center"
														role="alert"
													>
														{this.state.success}
													</div>
												)}
												{this.state.error && (
													<div
														className="alert alert-danger text-center"
														role="alert"
													>
														{this.state.error}
													</div>
												)}
											</div>
										</div>

										<div className='d-flex justify-content-center'>
											<button className='btn btn-outline-success'>Salvar</button>
										</div>
									</Modal.Body>
								</Form>
							</Modal>

							{/* Modal Visualizar Declaração de Orientação */}

							<Modal
								show={this.state.modalShowVisualizarDeclaracaoDeOrientacao}
								onHide={() => this.handlerCloseModalVisualizarDeclaracaoDeOrientacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>
								<Modal.Header closeButton>
									<h4 className='titulo mb-3'><FaUserGraduate /> Declaração de orientação</h4>
								</Modal.Header>
								<Modal.Body>
									<div id='declaracao_participacao' className='container' style={{
										background: `url(${BACKGROUND_ENBER})`,
										backgroundRepeat: "no-repeat",
										backgroundPosition: "center",
										backgroundSize: "600px 600px"
									}}>
										{this.state.documentoEmIngles ? (
											<div className='container' style={{
												background: `url(${BACKGROUND_ENBER})`,
												backgroundRepeat: "no-repeat",
												backgroundPosition: "center",
												backgroundSize: "600px 600px"
											}}>

												<img style={{ minWidth: '100%', marginBottom: '10px', }} src={Logo_ATA} />
												<div style={{ padding: "50px" }}>
													<h4 className='text-center font-weight-bold mb-3'>Guidance statement</h4>
													<p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "12pt", textAlign: "justify" }} className='p-3'>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We hereby declare that {this.state.sexo === "M" ? " Prof.° Dr°. " : " Profa.° Dra°. "}
														<b>{this.state.orientador}</b> from the
														{this.state.id_curso === 1 ? ` Postgraduate Program in Educational Sciences` : ``}
														{this.state.id_curso === 2 ? ` Postgraduate Program in Educational Sciences` : ``}
														{this.state_curso === 3 ? ` Postgraduate Program in Theology` : ``}
														{this.state.id_curso === 4 ? ` Postgraduate Program in Theology` : ``} supervised the
														{this.state.id_curso === 1 ? ` Dissertation ` : ``}
														{this.state.id_curso === 2 ? ` Dissertation ` : ``}
														{this.state.id_curso === 3 ? ` Thesis ` : ``}
														{this.state.id_curso === 4 ? ` Thesis ` : ``}
														of {this.state.orientando}, a regular student
														of the {this.state.id_curso === 1 ? ` Postgraduate Program in Educational Sciences` : ``}
														{this.state.id_curso === 2 ? ` Postgraduate Program in Educational Sciences` : ``}
														{this.state_curso === 3 ? ` Postgraduate Program in Theology` : ``}
														{this.state.id_curso === 4 ? ` Postgraduate Program in Theology` : ``},
														in the Master's course titled: <b>{this.state.title.toUpperCase()}</b>.
													</p>

													<p className='text-right p-3'>Orlando, {this.state.dataDeclaracaoEnUs}</p>

													<div class="row d-flex justify-content-center mt-2 mb-2">
														<div class="col-lg-6 col-lg-offset-6 text-center">
															<div className="ml-auto">
																<img style={{ display: "block", margin: "0 auto" }} src='https://gestor-administrativo.s3.amazonaws.com/enber/assinaturas/Alcimar.png' />

																<p className='border-top border-dark'>Ivy Enber Christian University<br />Alcimar José da Silva<br />President</p>

																<img style={{ width: "100px", height: "100px", display: "block", margin: "0 auto" }} src={ASSINATURA_JOSUE} />

																<p className='border-top border-dark'>Ivy Enber Christian University<br />Josué Claudio Dantas<br />Chancellor</p>
															</div>
														</div>
													</div>

													<p className='text-center'>Proof Control Code: {this.state.codigo_validacao}</p>

													<p className='text-center' style={{ marginTop: "100px" }}>The authenticity of this statement can be
														confirmed at
														https://www.gestorgruponexus.com.br/validacao</p>

													<div className="row" style={{ marginTop: "80px" }}>
														<div className="col-sm-6">
															<p style={{ fontSize: "8pt" }}>Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047
																Section 1005.06 (1)(f). Florida Comission for independent Education</p>
														</div>
														<div className="col-sm-6 d-flex justify-content-center">
															<img style={{ width: '50px', height: '50px' }} src={RODAPE1} />
															<img style={{ width: '50px', height: '50px' }} src={RODAPE2} />
															<img style={{ width: '50px', height: '50px' }} src={RODAPE3} />
															<img style={{ width: '120px', height: '40px' }} src={RODAPE4} />
														</div>
													</div>
													<p className='text-center mt-3' style={{ fontSize: "9pt" }}>7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710</p>
												</div>
											</div>
										) : (
											<div className='container' style={{
												background: `url(${BACKGROUND_ENBER})`,
												backgroundRepeat: "no-repeat",
												backgroundPosition: "center",
												backgroundSize: "600px 600px"
											}}>
												<img style={{ minWidth: '100%', marginBottom: '10px', }} src={Logo_ATA} />
												<div style={{ padding: "50px" }}>
													<h4 className='text-center font-weight-bold mb-3'>DECLARAÇÃO DE ORIENTAÇÃO</h4>

													<p style={{ fontSize: "12pt", textAlign: "justify" }} className='p-3'>
														&nbsp;&nbsp;&nbsp;&nbsp;Declaramos que a {this.state.sexo === "M" ? " Prof. Dr. " : " Prof(a). Dr(a). "} <b>{this.state.orientador +
															' '}</b>
														do(a) {this.state.id_curso === 1 ? ` Programa de Pós Graduação em  Ciências da Educação` : ``}
														{this.state.id_curso === 2 ? ` Programa de Pós Graduação em  Ciências da Educação` : ``}
														{this.state.id_curso === 3 ? ` Programa de Pós Graduação em Teologia` : ``}
														{this.state.id_curso === 4 ? ` Programa de Pós Graduação em Teologia` : ``}, realizou a
														orientação {this.state.id_curso === 1 ? ` da dissertação ` : ``}
														{this.state.id_curso === 2 ? ` de tese ` : ``}
														{this.state.id_curso === 3 ? ` da dissertação ` : ``}
														{this.state.id_curso === 4 ? ` de tese ` : ``} de
														{" " + this.state.orientando.toLocaleUpperCase()}, discente regular do
														{this.state.id_curso === 1 ? ` Programa de Pós Graduação em  Ciências da Educação` : ``}
														{this.state.id_curso === 2 ? ` Programa de Pós Graduação em  Ciências da Educação` : ``}
														{this.state.id_curso === 3 ? ` Programa de Pós Graduação em Teologia` : ``}
														{this.state.id_curso === 4 ? ` Programa de Pós Graduação em Teologia` : ``}, no curso de {this.state.curso.split(" ", 1)[0] + " "}
														cujo trabalho se intitula: <b>{this.state.titulo}</b>
													</p>

													<p className='mt-3 mb-3 text-right p-3'>Orlando, {this.state.dataDeclaracaoPtBr}</p>

													<div class="row d-flex justify-content-center mt-2 mb-2">
														<div class="col-lg-6 col-lg-offset-6 text-center">
															<div className="ml-auto">
																<img style={{ display: "block", margin: "0 auto" }} src='https://gestor-administrativo.s3.amazonaws.com/enber/assinaturas/Alcimar.png' />
																<hr className='hr' />
																<p>Ivy Enber Christian University<br />Alcimar José da Silva<br />Presidente</p>
																<img style={{ width: "100px", height: "100px", display: "block", margin: "0 auto" }} src={ASSINATURA_JOSUE} />
																<hr className='hr' />
																<p className=''>Ivy Enber Christian University<br />Josué Claudio Dantas<br />Reitor</p>
															</div>
														</div>
													</div>

													<p className='text-center' style={{ marginTop: "100px" }}>Código de controle do comprovante:
														{this.state.codigo_validacao}</p>

													<p className='text-center'>A autenticidade desta declaração poderá ser
														confirmada no endereço
														https://www.gestorgruponexus.com.br/validacao
													</p>

													<div className="row" style={{ marginTop: "80px" }}>
														<div className="col-sm-6">
															<p style={{ fontSize: "8pt" }}>Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047
																Section 1005.06 (1)(f). Florida Comission for independent Education</p>
														</div>
														<div className="col-sm-6 d-flex justify-content-center">
															<img style={{ width: '50px', height: '50px' }} src={RODAPE1} />
															<img style={{ width: '50px', height: '50px' }} src={RODAPE2} />
															<img style={{ width: '50px', height: '50px' }} src={RODAPE3} />
															<img style={{ width: '120px', height: '40px' }} src={RODAPE4} />
														</div>
													</div>
													<p className='text-center mt-3' style={{ fontSize: "9pt" }}>7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710</p>
												</div>
											</div>
										)}
									</div>
								</Modal.Body>
								<Modal.Footer>
									<button className='button' onClick={() => print('declaracao_participacao')}>Imprimir</button>
								</Modal.Footer>
							</Modal>

							{/* Modal Visualizar Certificado de Aprovacao */}

							<Modal
								show={this.state.modalShowVisualizarCertificadoDeAprovacao}
								onHide={() => this.handlerCloseModalVisualizarCertificadoDeAprovacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek /> Certificado de Aprovação</h4>
								</Modal.Header>
								<Modal.Body>
									<div id='certificado_aprovacao'>
										<div className='container'>
											<img style={{ minWidth: '100%', marginBottom: '10px', }} src={Logo_ATA} />
											<h4 className='font-weight-bold text-center mt-3 mb-5 p-3'>CERTIFICADO DE APROVAÇÃO</h4>

											<p className='mt-3 p-3'>TÍTULO DA TESE: {this.state.titulo}</p>
											<p className='font-weight-bold p-3'>AUTORA: {this.state.nome}</p>
											<p className='font-weight-bold p-3'>ORIENTADOR(A): {this.state.orientador}</p>

											<p className='p-3'>Aprovada como parte das exigências para obtenção do Título de Doutora em Ciências Sociais,
												pela Comissão Examinadora:</p>

											{/* <img className="img-fluid m-auto" src={this.state.assinatura_presidente} />
											<hr /> */}

											{arrayMembrosDaDeclaracaoDeParticipacao.length > 0 ?
												arrayMembrosDaDeclaracaoDeParticipacao.map(membro => (
													<div>
														<img className="img-fluid" style={{ width: "220px", display: 'block', margin: '0 auto' }} src={membro.assinatura} />
														<hr />
														<p className="text-center">{membro.nome.toLocaleUpperCase()}</p>
														{/* <p className="text-center">{membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length).toLocaleUpperCase()}</p> */}
													</div>
												))
												: ("")
											}
											<h6 className='text-rodape p-3'>7350 FUTURES DRIVE,ORLANDO,FL 32819 WWW.ENBERUNIVERSITY.COM TEL : +1 321-300-9710</h6>
										</div>
									</div>
								</Modal.Body>
							</Modal>

							{/* Modal Atualizar Banca */}

							<Modal
								show={this.state.modalShowAtualizarBanca}
								onHide={this.handlerCloseModalAtualizarBanca}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="xl"
								centered
							>
								<Form onSubmit={this.atualizarBanca}>
									<Modal.Header closeButton>
										<h4 className="titulo">
											<FaLayerGroup /> Atualizar Banca
										</h4>
									</Modal.Header>
									<Modal.Body>
										<div className="row" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
											<div className="col-sm-6">
												{/* Orientando */}
												<FormSelect
													label="Orientando:*"
													id="selectOrientando"
													value={this.state.id_orientando}
													onChange={(e) => this.setState({ id_orientando: e.target.value })}
													options={[
														<option key="0" value="0">
															Selecione
														</option>,
														...this.state.array_orientandos.map((orientando) => (
															<option key={orientando.id} value={orientando.id}>
																{orientando.nome.toUpperCase()}
															</option>
														)),
													]}
												/>

												{/* Tipo da banca */}
												<FormSelect
													label="Tipo da banca:*"
													id="selectTipoBanca"
													value={this.state.id_tipoBanca}
													onChange={(e) => this.setState({ id_tipoBanca: e.target.value })}
													options={[
														<option key="0" value="0">
															Selecione
														</option>,
														...this.state.array_tiposBanca.filter((tipo) => parseInt(tipo.id) < 3)
															.map((tipo) => (
																<option key={tipo.id} value={tipo.id}>
																	{tipo.nome}
																</option>
															)),
													]}
												/>

												{/* Área de concentração */}
												<FormSelect
													label="Área de concentração:*"
													id="selectAreaConcentracao"
													value={this.state.idAreaConcentracao}
													onChange={(e) => this.setState({ idAreaConcentracao: e.target.value })}
													options={
														this.state.arrayAreaConcentracao.length > 0
															? this.state.arrayAreaConcentracao.map((area) => (
																<option key={area.id} value={area.id}>
																	{area.nome}
																</option>
															))
															: [
																<option key="0" value="0">
																	Nenhum resultado encontrado
																</option>,
															]
													}
												/>

												{/* Linha de pesquisa */}
												<FormSelect
													label="Linha de pesquisa:*"
													id="selectLinhaPesquisa"
													value={this.state.idLinhaPesquisa}
													onChange={(e) => this.setState({ idLinhaPesquisa: e.target.value })}
													options={[
														<option key="0" value="0">
															Selecione
														</option>,
														...this.state.arrayLinhasDePesquisas.map((linha) => (
															<option key={linha.id} value={linha.id}>
																{linha.linha_pesquisa}
															</option>
														)),
													]}
												/>

												{/* Data e hora prevista */}
												<FormInput
													label="Data e hora prevista:"
													id="dataHoraPrevista"
													type="datetime-local"
													value={this.state.data_horaPrevista}
													onChange={(e) => this.setState({ data_horaPrevista: e.target.value })}
													min="2022-01"
												/>

												{/* Membros internos */}
												<div className="form-group">
													<label htmlFor="selectMembrosInternos">Membros internos:*</label>
													<Select
														closeMenuOnSelect={false}
														value={this.state.arraySelectedMembrosInternos}
														isMulti
														options={this.state.arrayMembrosInternos}
														onChange={(e) => this.setState({ arraySelectedMembrosInternos: e })}
													/>
												</div>
											</div>
											<div className="col-sm-6">
												{/* Membros externos */}
												<div className="form-group">
													<label htmlFor="selectMembrosExternos">Membros externos:*</label>
													<Select
														closeMenuOnSelect={false}
														value={this.state.arraySelectedMembrosExternos}
														isMulti
														options={this.state.arrayMembrosExternos}
														onChange={(e) => this.setState({ arraySelectedMembrosExternos: e })}
													/>
												</div>

												{/* Título */}
												<FormTextarea
													label="Título:"
													id="titulo"
													rows={3}
													value={this.state.titulo}
													onChange={(e) => this.setState({ titulo: e.target.value })}
												/>

												{/* Título em inglês */}
												<FormTextarea
													label="Título em inglês:"
													id="title"
													rows={3}
													value={this.state.title}
													onChange={(e) => this.setState({ title: e.target.value })}
												/>

												{/* Resumo */}
												<FormTextarea
													label="Resumo:"
													id="resumo"
													rows={3}
													value={this.state.resumo}
													onChange={(e) => this.setState({ resumo: e.target.value })}
												/>

												{/* Palavra-chave */}
												<FormTextarea
													label="Palavra-chave:"
													id="palavra_chave"
													rows={3}
													value={this.state.palavra_chave}
													onChange={(e) => this.setState({ palavra_chave: e.target.value })}
												/>
											</div>
										</div>

										{/* Mensagens de sucesso ou erro */}
										<div className="row mt-2">
											<div className="col-sm-12">
												{this.state.success && (
													<div className="alert alert-success text-center" role="alert">
														{this.state.success}
													</div>
												)}
												{this.state.error && (
													<div className="alert alert-danger text-center" role="alert">
														{this.state.error}
													</div>
												)}
											</div>
										</div>
										<div className="d-flex justify-content-center">
											<button className="button">
												<FaRegSave /> Salvar
											</button>
										</div>
									</Modal.Body>
								</Form>
							</Modal>

						</MainContent>
					</Col>
				</Row>
			</Container >
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
`;