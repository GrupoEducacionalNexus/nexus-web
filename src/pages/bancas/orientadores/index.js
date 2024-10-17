// nexus-web/src/pages/bancas/orientadores/index.js
import React, { Component } from 'react';
import styled from 'styled-components';
import { getToken } from '../../../services/auth';
import Logo_ATA from '../../../assets/logo_ata.jpg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FaUserGraduate, FaCalendarWeek, FaRegSave, FaWpforms } from 'react-icons/fa';
import Menu from '../../../components/Menu';
import AdminNavbar from '../../../components/Navbar';
import MainContent from '../../../components/MainContent';
import UserContext from '../../../UserContext';
import FormModalOrientando from './FormModalOrientando';
import ModalVisualizarDeclaracaoDeOrientacao from './ModalVisualizarDeclaracaoDeOrientacao';
import ModalVisualizarCertificadoDeAprovacao from './ModalVisualizarCertificadoDeAprovacao';
import ModalEmitirDeclaracaoDeOrientacao from './ModalEmitirDeclaracaoDeOrientacao';
import ModalEmitirFolhaDeAprovacao from './ModalEmitirFolhaDeAprovacao';
import ModalAtualizarBanca from './ModalAtualizarBanca';
import { listaDeLinhasDePesquisas } from '../../../services/getListaDeLinhasDePesquisas';
import { print } from '../../../services/print';
import { AtaDefesa } from '../../../components/AtaDefesa';
import { FolhaDeAprovacao } from '../../../components/FolhaDeAprovacao';
import backgroundImage from '../../../assets/sistema_chamados.png';
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
import RegisterBancaModal from './RegisterBancaModal';
import StatisticsTabsPanel from './StatisticsTabPanel';
import FormModalEditarOrientando from './FormModalEditarOrientando';
import ModalDeclaracaoParticipacao from './ModalDeclaracaoParticipacao';
import FormModalEditarFichaDeAvaliacao from './FormModalEditarFichaDeAvaliacao';
import {
	handlerMostrarModalCadastrarBanca,
	handlerFecharModalCadastrarBanca,
	handlerMostrarModalAtualizarBanca,
	handlerFecharModalAtualizarBanca,
	handlerMostrarModalExcluirBanca,
	handlerFecharModalExcluirBanca,
	carregarMembrosDaDeclaracaoDeParticipacao,
	handleCadastrarOrientando,
	handleAtualizarOrientando,
	handleCadastrarBanca,
	handleAtualizarBanca,
	handleExcluirBanca,
	getMemberRoleEnglish,
	getCourseTypeEnglish,
	getBancaTypeEnglish,
	getBancaTypePortuguese,
	getProgramNameEnglish,
	handleResumoChange,
} from './funcoesBanca';

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
import ConfirmationModalExcluirBanca from './ConfirmationModalExcluirBanca';
import FormModalEmitirAta from './FormModalEmitirAta';
import DocumentFooter from './DocumentFooter';



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

	loadCursos = async () => {
		const cursosData = await listaDeCursos(getToken());
		this.setState({ array_cursos: cursosData });
	};

	// Modais de Finalizar Banca
	handlerMostrarModalFinalizarBanca = (banca) => {
		this.handlerMostrarModalFinalizarBanca(this, banca);
	};

	handlerFecharModalFinalizarBanca = () => {
		this.handlerFecharModalFinalizarBanca(this);
	};

	// Manipulação de Formulários
	handleCadastrarOrientando = (e) => {
		handleCadastrarOrientando(this, e);
	};

	handleAtualizarOrientando = (e) => {
		handleAtualizarOrientando(this, e);
	};

	handlerCloseModalCadastrarBanca = () => {
		this.setModalShowCadastrarBanca(false);
		this.setState({
			success: '',
			error: '',
			id_orientando: '',
			id_tipoBanca: '',
			data_horaPrevista: '',
			arraySelectedMembrosInternos: [],
			arraySelectedMembrosExternos: [],
			titulo: '',
			title: '',
			resumo: '',
			palavra_chave: '',
		});
	};

	// Modal Atualizar Banca
	setModalShowAtualizarBanca = (valor) => {
		this.setState({ modalShowAtualizarBanca: valor });
	};

	handleExcluirBanca = (e) => {
		handleExcluirBanca(this, e);
	};

	// Manipulação de Opções e Resumos
	handleOptionChange = (nomeEstadoResposta, valor) => {
		this.handleOptionChange(this, nomeEstadoResposta, valor);
	};

	handleResumoChange = (nomeEstadoResumo, valor) => {
		this.handleResumoChange(this, nomeEstadoResumo, valor);
	};

	// Funções Utilitárias
	obterPapelMembroEmInglês = (membroNome) => {
		return getMemberRoleEnglish(this, membroNome);
	};

	obterPapelMembroEmPortuguês = (membroNome) => {
		return this.getMemberRolePortuguese(this, membroNome);
	};

	obterTipoCursoEmInglês = () => {
		return getCourseTypeEnglish(this);
	};

	obterTipoCursoEmPortuguês = () => {
		// return getCourseTypePortuguese(this);
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
		// return getProgramNamePortuguese(this);
	};

	// Fechar Modal de Visualizar Declaração
	handlerFecharModalVisualizarDeclaracao = () => {
		this.handlerFecharModalVisualizarDeclaracao(this);
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

	handleOptionChange = (nomeEstadoResposta, valor) => {
		this.setState({ [nomeEstadoResposta]: valor });
	};

	handleResumoChange = (nomeEstadoResumo, valor) => {
		this.setState({ [nomeEstadoResumo]: valor });
	};

	// Função para obter o tipo de membro em inglês
	getMemberRoleEnglish = (membroNome) => {
		const membro = this.state.arrayMembrosDaDeclaracaoDeParticipacao.find(
			(membro) => membro.nome.slice(0, membro.nome.indexOf(' -')) === membroNome
		);
		if (membro) {
			const tipo = membro.nome.slice(membro.nome.indexOf('-') + 1).trim();
			if (tipo === 'presidente') return 'President';
			if (tipo === 'membro externo') return 'External Member';
			if (tipo === 'membro interno') return 'Internal Member';
		}
		return '';
	};

	// Função para obter o tipo de membro em português
	getMemberRolePortuguese = (membroNome) => {
		const membro = this.state.arrayMembrosDaDeclaracaoDeParticipacao.find(
			(membro) => membro.nome === membroNome
		);
		return membro ? membro.tipo : '';
	};
	loadTiposDeBanca = async () => {
		const tiposBancaData = await listaDeTiposDeBanca(getToken());
		this.setState({ array_tiposBanca: tiposBancaData });
	};
	loadCursos = async () => {
		const cursosData = await listaDeCursos(getToken());
		this.setState({ array_cursos: cursosData });
	};

	// Define as funções como métodos da classe, chamando as funções importadas
	handlerMostrarModalCadastrarBanca = () => {
		handlerMostrarModalCadastrarBanca(this);
	};

	// Função para obter o tipo de banca em português
	getBancaTypePortuguese = () => {
		return this.state.id_tipoBanca === 1 ? 'QUALIFICAÇÃO' : 'DEFESA';
	};

	// Função para obter o nome do programa em inglês
	getProgramNameEnglish = () => {
		const { id_curso } = this.state;
		if (id_curso === 1) return "Master's Program in EDUCATION SCIENCES";
		if (id_curso === 2) return 'Doctoral Program in EDUCATIONAL SCIENCES';
		if (id_curso === 3) return "Master's Program in THEOLOGY";
		if (id_curso === 4) return 'Doctoral Program in THEOLOGY';
		return '';
	};

	handleOptionChange = (nomeEstadoResposta, valor) => {
		this.handleOptionChange(this, nomeEstadoResposta, valor);
	};

	handleResumoChange = (nomeEstadoResumo, valor) => {
		handleResumoChange(this, nomeEstadoResumo, valor);
	};

	handleInputChange = (nomeEstado, valor) => {
		this.setState({ [nomeEstado]: valor });
	};

	handleSelectChange = (nomeEstado, valores) => {
		this.setState({ [nomeEstado]: valores });
	};

	// Definindo a função para abrir o modal
	handlerMostrarModalEmitirDeclaracaoDeOrientacao = () => {
		this.setState({ modalShowEmitirDeclaracaoDeOrientacao: true });
	};

	// Definindo a função para fechar o modal
	handlerCloseModalEmitirDeclaracaoDeOrientacao = () => {
		this.setState({ modalShowEmitirDeclaracaoDeOrientacao: false });
	};

	// Funções para abrir e fechar o modal
	setModalShowCadastrarEAtualizarFolhaDeAprovacao = (value) => {
		this.setState({ modalShowCadastrarEAtualizarFolhaDeAprovacao: value });
	};

	setDataAprovacao = (value) => {
		this.setState({ dataAprovacao: value });
	};

	handlerMostrarModalCadastrarEAtualizarFolhaDeAprovacao = (banca) => {
		this.setState({ modalShowCadastrarEAtualizarFolhaDeAprovacao: true, id_banca: banca.id });
	};

	handlerCloseModalCadastrarEAtualizarFolhaDeAprovacao = () => {
		this.setState({ modalShowCadastrarEAtualizarFolhaDeAprovacao: false });
	};

	handlerMostrarModalEmitirDeclaracaoDeOrientacao = (banca) => {
		this.setState({
			modalShowEmitirDeclaracaoDeOrientacao: true,
			// outras propriedades relacionadas
		});
	};

	handlerMostrarModalVisualizarDeclaracaoDeOrientacao = (banca) => {
		this.setState({
			modalShowVisualizarDeclaracaoDeOrientacao: true,
			documentoEmIngles: banca.documentoEmIngles,
			orientador: banca.orientador,
			// outras propriedades relacionadas
		});
	};

	// Renderização
	render() {
		// const perguntas = [
		const perguntas = [
			{
				numeroPergunta: 1,
				textoPergunta: 'O título do projeto reflete o estudo a ser realizado',
				nomeEstadoResposta: 'titulo_projeto',
				nomeEstadoResumo: 'resumoQ1',
				valorSelecionado: this.state.titulo_projeto,
				valorResumo: this.state.resumoQ1,
			},
			{
				numeroPergunta: 2,
				textoPergunta: 'A pergunta condutora está explicitada?',
				nomeEstadoResposta: 'pergunta_condutora',
				nomeEstadoResumo: 'resumoQ2',
				valorSelecionado: this.state.pergunta_condutora,
				valorResumo: this.state.resumoQ2,
			},
			// Adicione as demais perguntas seguindo o mesmo padrão
			{
				numeroPergunta: 3,
				textoPergunta: 'A hipótese está redigida de forma clara e o estudo proposto permite testá-la?',
				nomeEstadoResposta: 'hipotese',
				nomeEstadoResumo: 'resumoQ3',
				valorSelecionado: this.state.hipotese,
				valorResumo: this.state.resumoQ3,
			},
			{
				numeroPergunta: 4,
				textoPergunta: 'A fundamentação teórica e empírica dá sustentação ao estudo?',
				nomeEstadoResposta: 'fundamentacao_teorica',
				nomeEstadoResumo: 'resumoQ4',
				valorSelecionado: this.state.fundamentacao_teorica,
				valorResumo: this.state.resumoQ4,
			},
			{
				numeroPergunta: 5,
				textoPergunta: 'Os objetivos estão redigidos de forma clara e poderão ser atingidos?',
				nomeEstadoResposta: 'objetivo',
				nomeEstadoResumo: 'resumoQ5',
				valorSelecionado: this.state.objetivo,
				valorResumo: this.state.resumoQ5,
			},
			{
				numeroPergunta: 6,
				textoPergunta: 'O método contempla os passos necessários para garantir a validação interna da pesquisa?',
				nomeEstadoResposta: 'metodo',
				nomeEstadoResumo: 'resumoQ6',
				valorSelecionado: this.state.metodo,
				valorResumo: this.state.resumoQ6,
			},
			{
				numeroPergunta: 7,
				textoPergunta: 'O cronograma proposto é compatível com a proposta?',
				nomeEstadoResposta: 'cronograma',
				nomeEstadoResumo: 'resumoQ7',
				valorSelecionado: this.state.cronograma,
				valorResumo: this.state.resumoQ7,
			},
			{
				numeroPergunta: 8,
				textoPergunta: 'Conclusão da avaliação',
				nomeEstadoResposta: 'conclusao_avaliacao',
				nomeEstadoResumo: 'resumoQ8',
				valorSelecionado: this.state.conclusao_avaliacao,
				valorResumo: this.state.resumoQ8,
				opcoes: [
					'APROVADO SEM MODIFICAÇÕES',
					'APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E LIBERAÇÃO DO ORIENTADOR',
					'ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENTES DA BANCA QUE FEZ A AVALIAÇÃO INICIAL',
				],
			},
		];

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
			modalShowCadastrarEAtualizarFolhaDeAprovacao,
		} = this.state;

		return (
			<Container fluid style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "100% 100%",
				backgroundRepeat: 'no-repeat',
				padding: '0px',
				minHeight: '100vh'
			}}>

				<Menu /> ...
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
							<div>
								<StatisticsTabsPanel
									array_orientandos={this.state.array_orientandos}
									array_bancasQ={this.state.array_bancasQ}
									array_bancasD={this.state.array_bancasD}
									arrayLinhasDePesquisas={this.state.arrayLinhasDePesquisas}
									array_tiposBanca={this.state.array_tiposBanca}
									nome={this.state.nome}
									handlerShowModalEditarOrientando={this.handlerShowModalEditarOrientando}
									loadOrientandos={this.loadOrientandos}
									handlerShowModalAtualizarBanca={this.handlerShowModalAtualizarBanca}
									handlerShowModalEmitirDeclaracao={this.handlerShowModalEmitirDeclaracao}
									handlerShowModalEmitirAta={this.handlerShowModalEmitirAta}
									handlerShowModalAtualizarAta={this.handlerShowModalAtualizarAta}
									handlerShowModalVisualizarAta={this.handlerShowModalVisualizarAta}
									handlerShowModalEmitirFichaDeAvaliacao={this.handlerShowModalEmitirFichaDeAvaliacao}
									handlerShowModalEditarFichaDeAvaliacao={this.handlerShowModalEditarFichaDeAvaliacao}
									handlerShowModalVisualizarFichaDeAvaliacao={this.handlerShowModalVisualizarFichaDeAvaliacao}
									handlerShowModalExcluirBanca={this.handlerShowModalExcluirBanca}
									handlerShowModalFinalizarBanca={this.handlerShowModalFinalizarBanca}
									handlerShowModalEmitirDeclaracaoDeOrientacao={this.handlerShowModalEmitirDeclaracaoDeOrientacao}
									handlerShowModalVisualizarDeclaracaoDeOrientacao={this.handlerShowModalVisualizarDeclaracaoDeOrientacao}
									handlerShowModalCadastrarEAtualizarFolhaDeAprovacao={this.handlerShowModalCadastrarEAtualizarFolhaDeAprovacao}
									handlerShowModalVisualizarFolhaDeAprovacao={this.handlerShowModalVisualizarFolhaDeAprovacao}
									handlerShowModalVisualizarCertificadoDeAprovacao={this.handlerShowModalVisualizarCertificadoDeAprovacao}
								/>
							</div>

							{/* Modal Cadastrar Banca */}

							<RegisterBancaModal
								show={this.state.modalShowCadastrarBanca}
								onHide={this.handlerCloseModalCadastrarBanca}
								handleSubmit={this.handleCadastrarBanca}
								state={this.state}
								handleChange={this.handleChange}
								handleMultiSelectChange={this.handleMultiSelectChange}
							/>

							{/* Modal Cadastrar Orientando */}
							<FormModalOrientando
								show={this.state.modalShowCadastrarOrientando}
								onHide={this.handlerCloseModalCadastrarOrientando}
								handleCadastrarOrientando={this.handleCadastrarOrientando}
								nome={this.stateNome}
								email={this.stateEmail}
								id_curso={this.stateId_curso}
								senha={this.stateSenha}
								confirmarSenha={this.stateConfirmarSenha}
								fase_processo={this.stateFase_processo}
								informacoes_adicionais={this.stateInformacoes_adicionais}
								dataHoraInicialFaseProcesso={this.stateDataHoraicialFaseProcesso}
								dataHoraFinalFaseProcesso={this.stateDataHoraFinalFaseProcesso}
								dataHoraConclusao={this.stateDataHoraConclusao}
								array_cursos={this.stateArray_cursos}
								array_tiposBanca={this.stateArray_tiposBanca}
								success={this.stateSuccess}
								error={this.stateError}
								setState={this.setState}
							/>

							{/* Modal Editar Orientando */}
							<FormModalEditarOrientando
								show={this.state.modalShowEditarOrientando}
								onHide={this.handlerCloseModalEditarOrientando}
								handleAtualizarOrientando={this.handleAtualizarOrientando}
								nome={this.state.nome}
								email={this.state.email}
								id_curso={this.state.id_curso}
								senha={this.state.senha}
								confirmarSenha={this.state.confirmarSenha}
								fase_processo={this.state.fase_processo}
								informacoes_adicionais={this.state.informacoes_adicionais}
								dataHoraInicialFaseProcesso={this.state.dataHoraInicialFaseProcesso}
								dataHoraFinalFaseProcesso={this.state.dataHoraFinalFaseProcesso}
								dataHoraConclusao={this.state.dataHoraConclusao}
								array_cursos={this.state.array_cursos}
								array_tiposBanca={this.state.array_tiposBanca}
								arrayOrientacao={this.state.arrayOrientacao}
								success={this.state.success}
								error={this.state.error}
								setState={(updatedState) => this.setState(updatedState)}
								handlerShowModalCadastrarEAtualizarOrientacao={
									this.handlerShowModalCadastrarEAtualizarOrientacao
								}
							/>

							{/* Modal para Excluir Banca */}
							<ConfirmationModalExcluirBanca
								show={this.state.modalShowExcluirBanca}
								onHide={this.handlerFecharModalExcluirBanca}
								title={
									<>
										<FaUserGraduate /> Excluir banca
									</>
								}
								message={
									<>
										Confirmar a exclusão da banca de {this.state.tipo_banca} do orientando {this.state.nome}
									</>
								}
								onConfirm={this.handlerMostrarModalExcluirBanca}
								successMessage={this.state.success}
								errorMessage={this.state.error}
							/>

							{/* Modal para Emitir ATA */}
							<FormModalEmitirAta
								show={this.state.modalShowEmitirAta}
								onHide={this.handlerCloseModalEmitirAta}
								title={
									<>
										<FaUserGraduate /> Emitir ata de {this.state.tipo_banca.toLowerCase()}
									</>
								}
								size="md"
								onSubmit={this.handleCadastrarATA}
								status_ata={this.state.status_ata}
								setStatusAta={(value) => this.setState({ status_ata: value })}
								array_status={this.state.array_status}
								successMessage={this.state.success}
								errorMessage={this.state.error}
							/>

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
								{perguntas.map((pergunta) => (
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

							<FormModalEditarFichaDeAvaliacao
								show={this.state.modalShowEditarFichaDeAvaliacao}
								onHide={this.handlerCloseModalEditarFichaDeAvaliacao}
								handleAtualizarFichaDeAvaliacao={this.handleAtualizarFichaDeAvaliacao}
								id_orientando={this.state.id_orientando}
								setIdOrientando={(value) => this.setState({ id_orientando: value })}
								array_orientandos={this.state.array_orientandos}
								id_curso={this.state.id_curso}
								setIdCurso={(value) => this.setState({ id_curso: value })}
								array_cursos={this.state.array_cursos}
								success={this.state.success}
								error={this.state.error}
								handleOptionChange={this.handleOptionChange}
								handleResumoChange={this.handleResumoChange}
							/>

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
							<ModalDeclaracaoParticipacao
								show={this.state.modalShowVisualizarDeclaracao}
								onHide={this.handlerCloseModalVisualizarDeclaracao}
								membro={this.state.membro}
								documentoEmIngles={this.state.documentoEmIngles}
								sexo={this.state.sexo}
								data_horaPrevistaEnUs={this.state.data_horaPrevistaEnUs}
								data_horaPrevistaPtBr={this.state.data_horaPrevistaPtBr}
								getMemberRoleEnglish={this.getMemberRoleEnglish}
								getMemberRolePortuguese={this.getMemberRolePortuguese}
								getCourseTypeEnglish={this.getCourseTypeEnglish}
								// // getCourseTypePortuguese={this.getCourseTypePortuguese}
								getBancaTypeEnglish={this.getBancaTypeEnglish}
								getBancaTypePortuguese={this.getBancaTypePortuguese}
								getProgramNameEnglish={this.getProgramNameEnglish}
								// // getProgramNamePortuguese={getProgramNamePortuguese || null}
								orientando={this.state.orientando}
								title={this.state.title}
								curso={this.state.curso}
								titulo_banca={this.state.titulo_banca}
								arrayMembrosDaDeclaracaoDeParticipacao={this.state.arrayMembrosDaDeclaracaoDeParticipacao}
								dataDeclaracaoEnUs={this.state.dataDeclaracaoEnUs}
								codigo_validacao={this.state.codigo_validacao}
								print={this.print}
							/>

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
												}
											/>

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
											arrayMembrosDaDeclaracaoDeParticipacao={this.state.arrayMembrosDaDeclaracaoDeParticipacao}
											dtFolhaAprovacaoFormatada={this.state.dtFolhaAprovacaoFormatada}
										/>
									</div>
									<div className='d-flex justify-content-center'>
										<button className='button' onClick={() => print('folha_aprovacao')}>Imprimir</button>
									</div>
								</Modal.Body>
							</Modal>

							{/* Modal Emitir Folha de Aprovacao */}
							<ModalEmitirFolhaDeAprovacao
								show={modalShowCadastrarEAtualizarFolhaDeAprovacao}
								onHide={() =>
									this.setModalShowCadastrarEAtualizarFolhaDeAprovacao(false)
								}
								dataAprovacao={this.state.dataAprovacao}
								setDataAprovacao={this.setDataAprovacao}
								success={this.state.success}
								error={this.state.error}
								cadastrarEatualizarFolhaDeAprovacao={cadastrarEatualizarFolhaDeAprovacao}
							/>

							{/* Modal Emitir Declaração de Orientação */}

							<ModalEmitirDeclaracaoDeOrientacao
								show={this.state.modalShowEmitirDeclaracaoDeOrientacao}
								onHide={this.handlerCloseModalEmitirDeclaracaoDeOrientacao}
								dataDeOrientacao={this.state.dataDeOrientacao}
								setDataDeOrientacao={(data) => this.setState({ dataDeOrientacao: data })}
								success={this.state.success}
								error={this.state.error}
								cadastrarEatualizarDeclaracaoDeOrientacao={this.cadastrarEatualizarDeclaracaoDeOrientacao}
							/>

							{/* Modal Visualizar Declaração de Orientação */}

							<ModalVisualizarDeclaracaoDeOrientacao
								show={this.state.modalShowVisualizarDeclaracaoDeOrientacao}
								onHide={this.handlerCloseModalVisualizarDeclaracaoDeOrientacao}
								documentoEmIngles={this.state.documentoEmIngles}
								orientador={this.state.orientador}
								orientando={this.state.orientando}
								curso={this.state.curso}
								id_curso={this.state.id_curso}
								titulo={this.state.titulo}
								title={this.state.title}
								dataDeclaracaoEnUs={this.state.dataDeclaracaoEnUs}
								dataDeclaracaoPtBr={this.state.dataDeclaracaoPtBr}
								sexo={this.state.sexo}
								codigo_validacao={this.state.codigo_validacao}
								print={this.print}
							/>

							{/* Modal Visualizar Certificado de Aprovacao */}

							<ModalVisualizarCertificadoDeAprovacao
								show={this.state.modalShowVisualizarCertificadoDeAprovacao}
								onHide={this.handlerCloseModalVisualizarCertificadoDeAprovacao}
								titulo={this.state.titulo}
								nome={this.state.nome}
								orientador={this.state.orientador}
								arrayMembrosDaDeclaracaoDeParticipacao={this.state.arrayMembrosDaDeclaracaoDeParticipacao}
							/>

							{/* Modal Atualizar Banca */}

							<ModalAtualizarBanca
								show={this.state.modalShowAtualizarBanca}
								onHide={this.handlerFecharModalAtualizarBanca}
								atualizarBanca={this.handleAtualizarBanca}
								id_orientando={this.state.id_orientando}
								id_tipoBanca={this.state.id_tipoBanca}
								idAreaConcentracao={this.state.idAreaConcentracao}
								idLinhaPesquisa={this.state.idLinhaPesquisa}
								data_horaPrevista={this.state.data_horaPrevista}
								arraySelectedMembrosInternos={this.state.arraySelectedMembrosInternos}
								arraySelectedMembrosExternos={this.state.arraySelectedMembrosExternos}
								titulo={this.state.titulo}
								title={this.state.title}
								resumo={this.state.resumo}
								palavra_chave={this.state.palavra_chave}
								array_orientandos={this.state.array_orientandos}
								array_tiposBanca={this.state.array_tiposBanca}
								arrayAreaConcentracao={this.state.arrayAreaConcentracao}
								arrayLinhasDePesquisas={this.state.arrayLinhasDePesquisas}
								arrayMembrosInternos={this.state.arrayMembrosInternos}
								arrayMembrosExternos={this.state.arrayMembrosExternos}
								success={this.state.success}
								error={this.state.error}
								handleInputChange={this.handleInputChange}
								handleSelectChange={this.handleSelectChange}
							/>
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