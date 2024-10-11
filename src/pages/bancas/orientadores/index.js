// nexus-web/src/pages/bancas/orientadores/index.js
import React, { Component } from 'react';
import styled from 'styled-components';
import { getToken } from '../../../services/auth';
import Logo_ATA from '../../../assets/logo_ata.jpg';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
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
	FaUserGraduate,
	FaLayerGroup,
	FaCalendarWeek,
	FaRegEdit,
	FaRegPlusSquare,
	FaRegSave,
	FaPencilAlt,
	FaShieldAlt,
	FaFileAlt,
	FaPaste,
	FaWpforms,
	FaClipboardList,
	FaPlus,
} from 'react-icons/fa';

import { listaDeAreasConcentracao } from '../../../services/getListaDeAreasConcentracao';
import { listaDeLinhasDePesquisas } from '../../../services/getListaDeLinhasDePesquisas';
import { listaDeOrientadores } from '../../../services/getListaDeOrientadores';
import { listaDeMembrosExternos } from '../../../services/getListaDeMembrosExternos';
import { print } from '../../../services/print';
import { AtaDefesa } from '../../../components/AtaDefesa';
import { FolhaDeAprovacao } from '../../../components/FolhaDeAprovacao';
import Menu from '../../../components/Menu';
import backgroundImage from '../../../assets/sistema_chamados.png';
import MainContent from '../../../components/MainContent';
import FloatingMenu from '../../../components/FloatingMenu';
import UserContext from '../../../UserContext';
import Select from 'react-select';
import RODAPE1 from '../../../assets/rodape1.png';
import RODAPE2 from '../../../assets/rodape2.png';
import RODAPE3 from '../../../assets/rodape3.png';
import RODAPE4 from '../../../assets/rodape4.png';
import BACKGROUND_ENBER from '../../../assets/background_enber.png';
import ASSINATURA_JOSUE from '../../../assets/assinatura_josue.png';
import BancaList from './BancaList';
import OrientandosTable from './OrientandosTable';
import FilterForm from './FilterForm';

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
} from './apiServices';
import AdminNavbar from '../../../components/Navbar';
import PerguntaAvaliacao from './PerguntaAvaliacao';
import MemberList from './MemberList';

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

	componentDidMount() {
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

	loadTiposDeBanca = async () => {
		const tiposBancaData = await listaDeTiposDeBanca(getToken());
		this.setState({ array_tiposBanca: tiposBancaData });
	};

	loadCursos = async () => {
		const cursosData = await listaDeCursos(getToken());
		this.setState({ array_cursos: cursosData });
	};

	// Funções para manipular modais e eventos

	// Modal Cadastrar Banca
	setModalShowCadastrarBanca = (valor) => {
		this.setState({ modalShowCadastrarBanca: valor });
	};

	handlerShowModalCadastrarBanca = async () => {
		this.setModalShowCadastrarBanca(true);
		await this.loadTiposDeBanca();
		const areasConcentracaoData = await listaDeAreasConcentracao();
		this.setState({ arrayAreaConcentracao: areasConcentracaoData });

		const linhasDePesquisasData = await listaDeLinhasDePesquisas(this.state.idAreaConcentracao);
		this.setState({ arrayLinhasDePesquisas: linhasDePesquisasData });

		const orientadoresData = await listaDeOrientadores(0);
		let arrayMembrosInternos = [];
		if (orientadoresData.length > 0) {
			orientadoresData.forEach((item) => {
				if (item.id_usuario !== this.context.user.id) {
					arrayMembrosInternos.push({ value: item.id_usuario, label: item.nome });
				}
			});
			this.setState({ arrayMembrosInternos });
		}

		const membrosExternosData = await listaDeMembrosExternos();
		let arrayMembrosExternos = [];
		if (membrosExternosData.length > 0) {
			membrosExternosData.forEach((item) => {
				arrayMembrosExternos.push({ value: item.id_usuario, label: item.nome });
			});
			this.setState({ arrayMembrosExternos });
		}
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

	handlerShowModalAtualizarBanca = async (banca) => {
		this.setModalShowAtualizarBanca(true);
		this.setState({
			id_banca: banca.id,
			id_orientador: banca.id_orientador,
			id_orientando: banca.id_orientando,
			id_tipoBanca: banca.id_tipoBanca,
			idAreaConcentracao: banca.id_areaConcentracao,
			idLinhaPesquisa: banca.id_linhaPesquisa,
			data_horaPrevista: banca.dataHoraPrevista,
			titulo: banca.titulo,
			title: banca.title,
			resumo: banca.resumo,
			palavra_chave: banca.palavra_chave,
		});

		// Carregar membros da banca
		const membrosDaBancaData = await listaDeMembrosDaBanca(banca.id);
		let arraySelectedMembrosInternos = [];
		let arraySelectedMembrosExternos = [];

		membrosDaBancaData.forEach((membro) => {
			if (membro.id_tipo === 2) {
				arraySelectedMembrosInternos.push({ value: membro.id, label: membro.nome });
			}
			if (membro.id_tipo === 3) {
				arraySelectedMembrosExternos.push({ value: membro.id, label: membro.nome });
			}
		});

		this.setState({ arraySelectedMembrosInternos, arraySelectedMembrosExternos });

		await this.loadTiposDeBanca();
		const areasConcentracaoData = await listaDeAreasConcentracao();
		this.setState({ arrayAreaConcentracao: areasConcentracaoData });

		const linhasDePesquisasData = await listaDeLinhasDePesquisas(this.state.idAreaConcentracao);
		this.setState({ arrayLinhasDePesquisas: linhasDePesquisasData });

		const orientadoresData = await listaDeOrientadores(0);
		let arrayMembrosInternos = [];
		if (orientadoresData.length > 0) {
			orientadoresData.forEach((item) => {
				if (item.id_usuario !== this.context.user.id) {
					arrayMembrosInternos.push({ value: item.id_usuario, label: item.nome });
				}
			});
			this.setState({ arrayMembrosInternos });
		}

		const membrosExternosData = await listaDeMembrosExternos();
		let arrayMembrosExternos = [];
		if (membrosExternosData.length > 0) {
			membrosExternosData.forEach((item) => {
				arrayMembrosExternos.push({ value: item.id_usuario, label: item.nome });
			});
			this.setState({ arrayMembrosExternos });
		}
	};

	handlerCloseModalAtualizarBanca = () => {
		this.setModalShowAtualizarBanca(false);
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

	// Modal Excluir Banca
	setModalShowExcluirBanca = (valor) => {
		this.setState({ modalShowExcluirBanca: valor });
	};

	handlerShowModalExcluirBanca = (banca) => {
		this.setState({
			id_banca: banca.id,
			tipo_banca: banca.tipo_banca,
			nome: banca.orientando,
			id_tipoBanca: banca.id_tipoBanca,
			id_orientando: banca.id_orientando,
		});
		this.setModalShowExcluirBanca(true);
	};

	handlerCloseModalExcluirBanca = () => {
		this.setModalShowExcluirBanca(false);
		this.setState({
			success: '',
			error: '',
			id_banca: '',
			tipo_banca: '',
			nome: '',
		});
	};

	// Modal Finalizar Banca
	setModalShowFinalizarBanca = (valor) => {
		this.setState({ modalShowFinalizarBanca: valor });
	};

	handlerShowModalFinalizarBanca = (banca) => {
		this.setState({
			id_banca: banca.id,
			tipo_banca: banca.tipo_banca,
			nome: banca.orientando,
			id_tipoBanca: banca.id_tipoBanca,
			id_orientando: banca.id_orientando,
		});
		this.setModalShowFinalizarBanca(true);
	};

	handlerCloseModalFinalizarBanca = () => {
		this.setModalShowFinalizarBanca(false);
		this.setState({
			success: '',
			error: '',
			id_banca: '',
			tipo_banca: '',
			nome: '',
		});
	};

	// Continue ajustando os outros modais e funções de manipulação de eventos...

	// Funções de manipulação de formulários

	// Cadastrar Orientando
	handleCadastrarOrientando = async (e) => {
		e.preventDefault();

		const {
			nome,
			email,
			senha,
			confirmarSenha,
			id_curso,
			informacoes_adicionais,
			fase_processo,
			dataHoraInicialFaseProcesso,
			dataHoraFinalFaseProcesso,
			dataHoraConclusao,
		} = this.state;

		if (
			!nome ||
			!email ||
			!senha ||
			!confirmarSenha ||
			!id_curso ||
			!informacoes_adicionais ||
			!fase_processo ||
			!dataHoraInicialFaseProcesso ||
			!dataHoraFinalFaseProcesso ||
			!dataHoraConclusao
		) {
			this.setState({ error: 'Por favor, preencher todos os campos!' });
			return;
		}

		if (senha !== confirmarSenha) {
			this.setState({ error: 'Por favor, informe senhas iguais!' });
			return;
		}

		const orientandoData = {
			nome,
			email,
			senha,
			id_curso: parseInt(id_curso),
			informacoes_adicionais,
			fase_processo,
			dataHoraInicialFaseProcesso,
			dataHoraFinalFaseProcesso,
			dataHoraConclusao,
		};

		const result = await cadastrarOrientando(orientandoData);

		if (result.status === 200) {
			this.setState({ success: result.msg });
			this.loadOrientandos();
			this.handlerCloseModalCadastrarOrientando();
		} else {
			this.setState({ error: result.msg || 'Erro ao cadastrar orientando' });
		}
	};

	// Atualizar Orientando
	handleAtualizarOrientando = async (e) => {
		e.preventDefault();

		const {
			id_usuario,
			id_orientando,
			nome,
			email,
			senha,
			confirmarSenha,
			id_curso,
			informacoes_adicionais,
			fase_processo,
			dataHoraInicialFaseProcesso,
			dataHoraFinalFaseProcesso,
			dataHoraConclusao,
		} = this.state;

		if (!nome || !email || !senha || !confirmarSenha || !id_curso) {
			this.setState({ error: 'Por favor, preencher todos os campos!' });
			return;
		}

		if (senha !== confirmarSenha) {
			this.setState({ error: 'Por favor, informe senhas iguais!' });
			return;
		}

		const orientandoData = {
			id_usuario,
			nome,
			email,
			senha,
			id_curso: parseInt(id_curso),
			informacoes_adicionais,
			fase_processo,
			dataHoraInicialFaseProcesso,
			dataHoraFinalFaseProcesso,
			dataHoraConclusao,
		};

		const result = await atualizarOrientando(id_orientando, orientandoData);

		if (result.status === 200) {
			this.setState({ success: result.msg });
			this.loadOrientandos();
			this.handlerCloseModalEditarOrientando();
		} else {
			this.setState({ error: result.msg || 'Erro ao atualizar orientando' });
		}
	};

	// Cadastrar Banca
	handleCadastrarBanca = async (e) => {
		e.preventDefault();

		const {
			id_orientando,
			id_tipoBanca,
			data_horaPrevista,
			idLinhaPesquisa,
			arraySelectedMembrosInternos,
			arraySelectedMembrosExternos,
			titulo,
			title,
			resumo,
			palavra_chave,
		} = this.state;

		if (
			!id_orientando ||
			!id_tipoBanca ||
			!idLinhaPesquisa ||
			!data_horaPrevista ||
			arraySelectedMembrosInternos.length === 0 ||
			arraySelectedMembrosExternos.length === 0
		) {
			this.setState({ error: 'Por favor, preencher todos os campos!' });
			return;
		}

		const bancaData = {
			id_orientando,
			id_tipoBanca,
			id_linhaPesquisa: idLinhaPesquisa,
			arraySelectedMembrosInternos,
			arraySelectedMembrosExternos,
			data_horaPrevista,
			titulo,
			title,
			resumo,
			palavra_chave,
		};

		const result = await cadastrarBanca(bancaData);

		if (result.status === 200) {
			this.setState({ success: result.msg });
			this.loadBancas(1);
			this.loadBancas(2);
			this.handlerCloseModalCadastrarBanca();
		} else {
			this.setState({ error: result.msg || 'Erro ao cadastrar banca' });
		}
	};

	// Atualizar Banca
	handleAtualizarBanca = async (e) => {
		e.preventDefault();

		const {
			id_banca,
			id_orientador,
			id_orientando,
			id_tipoBanca,
			data_horaPrevista,
			idLinhaPesquisa,
			arraySelectedMembrosInternos,
			arraySelectedMembrosExternos,
			titulo,
			title,
			resumo,
			palavra_chave,
		} = this.state;

		if (
			!id_orientando ||
			!id_tipoBanca ||
			!idLinhaPesquisa ||
			!data_horaPrevista ||
			arraySelectedMembrosInternos.length === 0 ||
			arraySelectedMembrosExternos.length === 0
		) {
			this.setState({ error: 'Por favor, preencher todos os campos!' });
			return;
		}

		const bancaData = {
			id_orientador,
			id_orientando,
			id_tipoBanca,
			idLinhaPesquisa,
			arraySelectedMembrosInternos,
			arraySelectedMembrosExternos,
			data_horaPrevista,
			titulo,
			title,
			resumo,
			palavra_chave,
		};

		const result = await atualizarBanca(id_banca, bancaData);

		if (result.status === 200) {
			this.setState({ success: result.msg });
			this.loadBancas(1);
			this.loadBancas(2);
			this.handlerCloseModalAtualizarBanca();
		} else {
			this.setState({ error: result.msg || 'Erro ao atualizar banca' });
		}
	};

	// Excluir Banca
	handleExcluirBanca = async (e) => {
		e.preventDefault();
		const { id_banca, id_tipoBanca, id_orientando } = this.state;

		const result = await excluirBanca(id_banca, id_tipoBanca, id_orientando);

		if (result.status === 200) {
			this.setState({ success: result.msg });
			this.loadBancas(1);
			this.loadBancas(2);
			this.handlerCloseModalExcluirBanca();
		} else {
			this.setState({ error: result.msg || 'Erro ao excluir banca' });
		}
	};

	// Continue ajustando as outras funções de manipulação de formulários seguindo o mesmo padrão...

	handleOptionChange = (nomeEstadoResposta, valor) => {
		this.setState({ [nomeEstadoResposta]: valor });
	};

	handleResumoChange = (nomeEstadoResumo, valor) => {
		this.setState({ [nomeEstadoResumo]: valor });
	};

	// Dentro do seu componente principal

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

	// Função para obter o tipo de curso em inglês
	getCourseTypeEnglish = () => {
		const { id_curso } = this.state;
		if (id_curso === 1 || id_curso === 3) return 'DISSERTATION';
		if (id_curso === 2 || id_curso === 4) return 'THESIS';
		return '';
	};

	// Função para obter o tipo de curso em português
	getCourseTypePortuguese = () => {
		const { id_curso } = this.state;
		if (id_curso === 1 || id_curso === 3) return ' DA DISSERTAÇÃO';
		if (id_curso === 2 || id_curso === 4) return ' DE TESE';
		return '';
	};

	// Função para obter o tipo de banca em inglês
	getBancaTypeEnglish = () => {
		return this.state.id_tipoBanca === 1 ? 'QUALIFICATION' : 'DEFENSE';
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

	// Função para obter o nome do programa em português
	getProgramNamePortuguese = () => {
		const { id_curso } = this.state;
		if (id_curso === 1 || id_curso === 2) return 'Programa de Pós-Graduação em Ciências da Educação';
		if (id_curso === 3 || id_curso === 4) return 'Programa de Pós-Graduação em Teologia';
		return '';
	};

	handlerCloseModalVisualizarDeclaracao = () => {
		this.setState({ modalShowVisualizarDeclaracao: false });
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
							<FloatingMenu>
								<ul className="dropdown-menu">
									<li>
										<a className='button' onClick={() => this.handlerShowModalCadastrarBanca()}><FaRegPlusSquare /> Registrar banca </a>
									</li>
									{this.state.id_orientando !== 0 ? (
										<li>
											<a className='button' onClick={() => this.handlerShowModalCadastrarEAtualizarOrientacao()}> Registrar orientação</a>
										</li>
									) : ("")}

									<li>
										<a>Para adicionar novas opções entre em contato com o desenvolvedor </a>
									</li>
								</ul>
							</FloatingMenu>
							<div className="content">
								<div className="content">
									<div className="row d-flex justify-content-center text-center" style={{ marginBottom: "10px" }}>
										<div className="col-sm-3 mb-2">
											<FaUserGraduate style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
											<h5 style={{ fontSize: "12pt" }}>Total de Orientandos Registrados</h5>
											<h6>{array_orientandos.length}</h6>
										</div>

										<div className="col-sm-3 mb-2">
											<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
											<h5 style={{ fontSize: "12pt" }}>Total de Bancas de Qualificação</h5>
											<h6>{array_bancasQ.length}</h6>
										</div>

										<div className="col-sm-3 mb-2">
											<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
											<h5 style={{ fontSize: "12pt" }}>Total de Bancas de Defesa</h5>
											<h6>{array_bancasD.length}</h6>
										</div>
									</div>

									<Tabs
										variant="pills"
										defaultActiveKey="bancas"
										transition={false}
										id="panel-admin"
										className="justify-content-center">
										<Tab eventKey="orientandos" title="Orientandos">
											<div className='container'>
												{/* Formulário de Filtros */}
												<FilterForm
													nome={this.state.nome}
													linhasDePesquisas={arrayLinhasDePesquisas}
													tiposDeBanca={array_tiposBanca}
													onNomeChange={(e) => {
														this.setState({ nome: e.target.value });
														this.loadOrientandos(e.target.value);
													}}
													onLinhaPesquisaChange={(e) => {
														this.setState({ idLinhaPesquisa: e.target.value });
														this.loadOrientandos("", e.target.value, 0);
													}}
													onFaseProcessoChange={(e) => {
														this.setState({ fase_processo: e.target.value });
														this.loadOrientandos("", 0, e.target.value);
													}}
												/>

												{/* Tabela de Orientandos */}
												<OrientandosTable
													orientandos={array_orientandos}
													onEditarOrientando={this.handlerShowModalEditarOrientando}
												/>

												{/* Total de Registros */}
												<div className="text-center text-white font-weight-bold mt-3 mb-5">
													Total de Registros: {array_orientandos.length}
												</div>
											</div>
										</Tab>

										<Tab eventKey="bancas" title="Bancas">
											<Container style={{ backgroundColor: "#F8F9FA", padding: "20px" }}>
												<div className='row d-flex justify-content-center'>

													{/* Seção de Qualificação */}
													<BancaList
														title="Qualificação"
														icon={<FaPencilAlt />}
														bancas={array_bancasQ}
														statusField="status_confirmacaoBancaQ"
														renderButtons={(banca) => (
															<>
																<button className='button' onClick={() => this.handlerShowModalAtualizarBanca(banca)}>
																	<FaRegPlusSquare /> Atualizar banca
																</button>
																{(banca.status_confirmacaoBancaQ === "CONFIRMADO" || banca.status_confirmacaoBancaQ === "FINALIZADA") && (
																	<button className='button mt-2' onClick={() => this.handlerShowModalEmitirDeclaracao(banca)}>
																		Declaração de participação
																	</button>
																)}
																{(banca.status_confirmacaoBancaQ === "CONFIRMADO" || banca.status_confirmacaoBancaQ === "FINALIZADA") && banca.id_ata === null && (
																	<button className='button mt-2' onClick={() => this.handlerShowModalEmitirAta(banca)}>
																		Emitir ATA
																	</button>
																)}
																{(banca.status_confirmacaoBancaQ === "CONFIRMADO" || banca.status_confirmacaoBancaQ === "FINALIZADA") && banca.id_ata !== null && (
																	<>
																		<button className='button mt-2' onClick={() => this.handlerShowModalAtualizarAta(banca)}>
																			Atualizar ATA
																		</button>
																		<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarAta(banca)}>
																			ATA
																		</button>
																	</>
																)}
																{(banca.status_confirmacaoBancaQ === "CONFIRMADO" || banca.id_fichaAvaliacao === null) && (
																	<button className='button mt-2' onClick={() => this.handlerShowModalEmitirFichaDeAvaliacao(banca)}>
																		Emitir ficha de avaliação
																	</button>
																)}
																{(banca.status_confirmacaoBancaQ === "CONFIRMADO" || banca.status_confirmacaoBancaQ === "FINALIZADA") && banca.id_fichaAvaliacao !== null && (
																	<>
																		<button className='button mt-2' onClick={() => this.handlerShowModalEditarFichaDeAvaliacao(banca)}>
																			Atualizar ficha de avaliação
																		</button>
																		<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarFichaDeAvaliacao(banca)}>
																			Visualizar ficha de avaliação
																		</button>
																	</>
																)}
																<button className='button mt-2' onClick={() => this.handlerShowModalExcluirBanca(banca)}>
																	Excluir banca
																</button>
																{banca.status_confirmacaoBancaQ === "CONFIRMADO" && (
																	<button className='button mt-2' onClick={() => this.handlerShowModalFinalizarBanca(banca)}>
																		Finalizar banca
																	</button>
																)}
															</>
														)}
													/>

													{/* Seção de Defesa */}
													<BancaList
														title="Defesa"
														icon={<FaShieldAlt />}
														bancas={array_bancasD}
														statusField="status_confirmacaoBancaD"
														renderButtons={(banca) => (
															<>
																<button className='button' onClick={() => this.handlerShowModalAtualizarBanca(banca)}>
																	<FaRegPlusSquare /> Atualizar banca
																</button>
																<button className='button mt-2' onClick={() => this.handlerShowModalEmitirDeclaracaoDeOrientacao(banca)}>
																	Emitir declaração de orientação
																</button>
																<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarDeclaracaoDeOrientacao({ ...banca, documentoEmIngles: false })}>
																	Declaração de orientação
																</button>
																<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarDeclaracaoDeOrientacao({ ...banca, documentoEmIngles: true })}>
																	Guidance statement
																</button>
																{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && (
																	<button className='button mt-2' onClick={() => this.handlerShowModalEmitirDeclaracao(banca)}>
																		Declaração de participação
																	</button>
																)}
																{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata === null && (
																	<button className='button mt-2' onClick={() => this.handlerShowModalEmitirAta(banca)}>
																		Emitir ATA
																	</button>
																)}
																{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata !== null && (
																	<>
																		<button className='button mt-2' onClick={() => this.handlerShowModalAtualizarAta(banca)}>
																			Atualizar ATA
																		</button>
																		<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarAta(banca)}>
																			ATA
																		</button>
																	</>
																)}
																{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.id_fichaAvaliacao === null) && (
																	<button className='button mt-2' onClick={() => this.handlerShowModalEmitirFichaDeAvaliacao(banca)}>
																		Emitir ficha de avaliação
																	</button>
																)}
																{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata !== null && banca.id_fichaAvaliacao !== null && (
																	<>
																		<button className='button mt-2' onClick={() => this.handlerShowModalEditarFichaDeAvaliacao(banca)}>
																			Atualizar ficha de avaliação
																		</button>
																		<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarFichaDeAvaliacao(banca)}>
																			Visualizar ficha de avaliação
																		</button>
																	</>
																)}
																{banca.status_confirmacaoBancaD === "FINALIZADA" && (
																	<>
																		<button className='button mt-2' onClick={() => this.handlerShowModalCadastrarEAtualizarFolhaDeAprovacao(banca)}>
																			Emitir folha de aprovação
																		</button>
																		<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarFolhaDeAprovacao(banca)}>
																			Folha de aprovação
																		</button>
																		<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarCertificadoDeAprovacao(banca)}>
																			Certificado de aprovação
																		</button>
																	</>
																)}
																<button className='button mt-2' onClick={() => this.handlerShowModalExcluirBanca(banca)}>
																	Excluir
																</button>
																{banca.status_confirmacaoBancaD === "CONFIRMADO" && (
																	<button className='button mt-2' onClick={() => this.handlerShowModalFinalizarBanca(banca)}>
																		Finalizar
																	</button>
																)}
															</>
														)}
													/>

												</div>
											</Container>
										</Tab>
									</Tabs>

								</div>
								{/* /.content */}
								<br />
							</div>

							<Modal
								show={this.state.modalShowCadastrarBanca}
								onHide={() => this.handlerCloseModalCadastrarBanca()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='xl'
								centered>
								<Form onSubmit={this.handleCadastrarBanca}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaLayerGroup /> Registrar uma nova banca</h4>
									</Modal.Header>
									<Modal.Body>
										<div className='row' style={{ maxHeight: "380px", overflowY: "scroll" }}>
											<div className='col-sm-6'>
												{/* Orientando */}
												<div className="form-group">
													<label>Orientando:*</label>
													<select
														className="form-control form-control-sm"
														id="selectOrientando"
														value={this.state.id_orientando}
														onChange={(e) => this.setState({ id_orientando: e.target.value })}
													>
														<option value="0">Selecione</option>
														{this.state.array_orientandos.length > 0 ? (
															this.state.array_orientandos.map((orientando) => (
																<option key={orientando.id} value={orientando.id}>
																	{orientando.nome.toUpperCase()}
																</option>
															))
														) : (
															<option value="0">Nenhum orientando encontrado</option>
														)}
													</select>
												</div>

												{/* Tipo da banca */}
												<div className="form-group">
													<label>Tipo da banca:*</label>
													<select
														className="form-control form-control-sm"
														id="selectTipoBanca"
														value={this.state.id_tipoBanca}
														onChange={(e) => this.setState({ id_tipoBanca: e.target.value })}
													>
														<option value="0">Selecione</option>
														{this.state.array_tiposBanca.length > 0 ? (
															this.state.array_tiposBanca.map((tipo) =>
																parseInt(tipo.id) < 3 ? (
																	<option key={tipo.id} value={tipo.id}>
																		{tipo.nome}
																	</option>
																) : null
															)
														) : (
															<option value="0">Nenhum resultado encontrado</option>
														)}
													</select>
												</div>

												{/* Área de concentração */}
												<div className="form-group">
													<label>Área de concentração:* </label>
													<select
														className="form-control form-control-sm"
														id="selectAreaConcentracao"
														value={this.state.idAreaConcentracao}
														readOnly
													>
														{this.state.arrayAreaConcentracao.length > 0 ? (
															this.state.arrayAreaConcentracao.map((area) =>
																area.id === this.state.idAreaConcentracao ? (
																	<option key={area.id} value={area.id}>
																		{area.nome}
																	</option>
																) : null
															)
														) : (
															<option value="0">Nenhuma área encontrada</option>
														)}
													</select>
												</div>

												{/* Linha de pesquisa */}
												<div className="form-group">
													<label>Linha de pesquisa:*</label>
													<select
														className="form-control form-control-sm"
														id="selectLinhaPesquisa"
														value={this.state.idLinhaPesquisa}
														onChange={(e) => this.setState({ idLinhaPesquisa: e.target.value })}
													>
														<option value="0">Selecione</option>
														{this.state.arrayLinhasDePesquisas.length > 0 ? (
															this.state.arrayLinhasDePesquisas.map((linha) => (
																<option key={linha.id} value={linha.id}>
																	{linha.linha_pesquisa}
																</option>
															))
														) : (
															<option value="0">Nenhuma linha de pesquisa encontrada</option>
														)}
													</select>
												</div>

												{/* Data e hora prevista */}
												<div className="form-group">
													<label htmlFor="dataHoraPrevista">Data e hora prevista:</label>
													<input
														className="form-control form-control-sm"
														type="datetime-local"
														id="dataHoraPrevista"
														name="dataHoraPrevista"
														min="2022-01"
														value={this.state.data_horaPrevista}
														onChange={(e) => this.setState({ data_horaPrevista: e.target.value })}
													/>
												</div>

												{/* Membros internos */}
												<div className="form-group">
													<label htmlFor="selectMembrosInternos">Membros internos:*</label>
													<Select
														closeMenuOnSelect={false}
														isMulti
														options={this.state.arrayMembrosInternos}
														onChange={(e) => this.setState({ arraySelectedMembrosInternos: e })}
														value={this.state.arraySelectedMembrosInternos}
													/>
												</div>
											</div>
											<div className='col-sm-6'>
												{/* Membros externos */}
												<div className="form-group">
													<label htmlFor="selectMembrosExternos">Membros externos:*</label>
													<Select
														closeMenuOnSelect={false}
														isMulti
														options={this.state.arrayMembrosExternos}
														onChange={(e) => this.setState({ arraySelectedMembrosExternos: e })}
														value={this.state.arraySelectedMembrosExternos}
													/>
												</div>

												{/* Título */}
												<div className="form-group">
													<label htmlFor="titulo">Título:</label>
													<textarea
														className="form-control form-control-sm"
														id="titulo"
														rows="3"
														value={this.state.titulo}
														onChange={(e) => this.setState({ titulo: e.target.value })}
													></textarea>
												</div>

												{/* Título em inglês */}
												<div className="form-group">
													<label htmlFor="title">Título em inglês:</label>
													<textarea
														className="form-control form-control-sm"
														id="title"
														rows="3"
														value={this.state.title}
														onChange={(e) => this.setState({ title: e.target.value })}
													></textarea>
												</div>

												{/* Resumo */}
												<div className="form-group">
													<label htmlFor="resumo">Resumo:</label>
													<textarea
														className="form-control form-control-sm"
														id="resumo"
														rows="3"
														value={this.state.resumo}
														onChange={(e) => this.setState({ resumo: e.target.value })}
													></textarea>
												</div>

												{/* Palavra-chave */}
												<div className="form-group">
													<label htmlFor="palavra_chave">Palavra-chave:</label>
													<textarea
														className="form-control form-control-sm"
														id="palavra_chave"
														rows="3"
														value={this.state.palavra_chave}
														onChange={(e) => this.setState({ palavra_chave: e.target.value })}
													></textarea>
												</div>
											</div>
										</div>

										{/* Mensagens de Sucesso ou Erro */}
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

										{/* Botão de Salvar */}
										<div className='d-flex justify-content-center'>
											<button className='button'><FaRegSave /> Salvar</button>
										</div>
									</Modal.Body>
								</Form>

							</Modal>

							{/* Modal for Registering a New Orientando */}
							<Modal
								show={this.state.modalShowCadastrarOrientando}
								onHide={this.handlerCloseModalCadastrarOrientando}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="md"
								centered
							>
								<Form onSubmit={this.handleCadastrarOrientando}>
									<Modal.Header closeButton>
										<h4 className="titulo">
											<FaUserGraduate /> Cadastrar um novo orientando
										</h4>
									</Modal.Header>
									<Modal.Body>
										<p className="text-danger">
											As informações cadastrais serão utilizadas pelo aluno para acessar a
											plataforma.
										</p>
										<div className="row">
											<div className="col-sm-6">
												{/* Nome */}
												<div className="form-group">
													<label htmlFor="nome">Nome</label>
													<input
														type="text"
														className="form-control"
														id="nome"
														placeholder="Digite seu nome completo"
														value={this.state.nome}
														onChange={(e) => this.setState({ nome: e.target.value })}
													/>
												</div>

												{/* Email */}
												<div className="form-group">
													<label htmlFor="email">Email</label>
													<input
														type="email"
														className="form-control"
														id="email"
														placeholder="Informe o seu email"
														value={this.state.email}
														onChange={(e) => this.setState({ email: e.target.value })}
													/>
												</div>

												{/* Curso */}
												<div className="form-group">
													<label>Curso:*</label>
													<select
														className="form-control"
														id="selectCurso"
														value={this.state.id_curso}
														onChange={(e) => this.setState({ id_curso: e.target.value })}
													>
														<option value="0">Selecione</option>
														{this.state.array_cursos.length > 0 ? (
															this.state.array_cursos.map((curso) => (
																<option key={curso.id} value={curso.id}>
																	{curso.nome}
																</option>
															))
														) : (
															<option value="0">Nenhum curso encontrado</option>
														)}
													</select>
												</div>

												{/* Senha */}
												<div className="row" style={{ marginBottom: 20 }}>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="senha">Senha</label>
															<input
																type="password"
																className="form-control"
																id="senha"
																placeholder="Informe sua senha"
																value={this.state.senha}
																onChange={(e) => this.setState({ senha: e.target.value })}
															/>
														</div>
													</div>

													{/* Repetir Senha */}
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="confirmarSenha">Repetir Senha</label>
															<input
																type="password"
																className="form-control"
																id="confirmarSenha"
																placeholder="Informe sua senha novamente"
																value={this.state.confirmarSenha}
																onChange={(e) =>
																	this.setState({ confirmarSenha: e.target.value })
																}
															/>
														</div>
													</div>
												</div>

												{/* Fase do processo */}
												<div className="form-group">
													<label>Fase do processo:*</label>
													<select
														className="form-control"
														id="selectFaseProcesso"
														value={this.state.fase_processo}
														onChange={(e) =>
															this.setState({ fase_processo: e.target.value })
														}
													>
														<option value="0">Selecione</option>
														{this.state.array_tiposBanca.length > 0 ? (
															this.state.array_tiposBanca.map((tipo) => (
																<option key={tipo.id} value={tipo.id}>
																	{tipo.nome}
																</option>
															))
														) : (
															<option value="0">Nenhum resultado encontrado</option>
														)}
													</select>
												</div>
											</div>

											<div className="col-sm-6">
												{/* Informações adicionais */}
												<div className="form-group">
													<label htmlFor="informacoes_adicionais">
														Informações adicionais
													</label>
													<textarea
														className="form-control"
														id="informacoes_adicionais"
														rows="3"
														value={this.state.informacoes_adicionais}
														onChange={(e) =>
															this.setState({ informacoes_adicionais: e.target.value })
														}
													></textarea>
												</div>

												{/* Data/hora inicial do processo */}
												<div className="form-group">
													<label htmlFor="dataHoraInicialFaseProcesso">
														Data/hora inicial do processo:
													</label>
													<input
														className="form-control"
														type="datetime-local"
														id="dataHoraInicialFaseProcesso"
														name="dataHoraInicialFaseProcesso"
														min="2022-01"
														value={this.state.dataHoraInicialFaseProcesso}
														onChange={(e) =>
															this.setState({ dataHoraInicialFaseProcesso: e.target.value })
														}
													/>
												</div>

												{/* Data/hora final do processo */}
												<div className="form-group">
													<label htmlFor="dataHoraFinalFaseProcesso">
														Data/hora final do processo:
													</label>
													<input
														className="form-control"
														type="datetime-local"
														id="dataHoraFinalFaseProcesso"
														name="dataHoraFinalFaseProcesso"
														min="2022-01"
														value={this.state.dataHoraFinalFaseProcesso}
														onChange={(e) =>
															this.setState({ dataHoraFinalFaseProcesso: e.target.value })
														}
													/>
												</div>

												{/* Data/hora de conclusão */}
												<div className="form-group">
													<label htmlFor="dataHoraConclusao">
														Data/hora de conclusão:
													</label>
													<input
														className="form-control"
														type="datetime-local"
														id="dataHoraConclusao"
														name="dataHoraConclusao"
														min="2022-01"
														value={this.state.dataHoraConclusao}
														onChange={(e) =>
															this.setState({ dataHoraConclusao: e.target.value })
														}
													/>
												</div>
											</div>
										</div>

										{/* Mensagens de Sucesso ou Erro */}
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
									</Modal.Body>

									<Modal.Footer>
										<button className="button">
											<FaRegSave /> Salvar
										</button>
									</Modal.Footer>
								</Form>
							</Modal>

							{/* Modal for Editing an Existing Orientando */}
							<Modal
								show={this.state.modalShowEditarOrientando}
								onHide={this.handlerCloseModalEditarOrientando}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered
							>
								<Modal.Header closeButton>
									<h4 className="titulo">
										<FaUserGraduate /> Atualizar as informações do orientando -{' '}
										{this.state.nome}
									</h4>
								</Modal.Header>
								<Modal.Body>
									<p className="text-danger">
										As informações cadastrais serão utilizadas pelo aluno para acessar a
										plataforma.
									</p>

									<Form onSubmit={this.handleAtualizarOrientando}>
										<div className="row">
											<div className="col-sm-6">
												{/* Nome */}
												<div className="form-group">
													<label htmlFor="nome">Nome</label>
													<input
														type="text"
														className="form-control form-control-sm"
														id="nome"
														placeholder="Digite seu nome completo"
														value={this.state.nome}
														onChange={(e) => this.setState({ nome: e.target.value })}
													/>
												</div>
											</div>
											<div className="col-sm-6">
												{/* Email */}
												<div className="form-group">
													<label htmlFor="email">Email</label>
													<input
														type="email"
														className="form-control form-control-sm"
														id="email"
														placeholder="Informe o seu email"
														value={this.state.email}
														onChange={(e) => this.setState({ email: e.target.value })}
													/>
												</div>
											</div>
										</div>

										<div className="row">
											{/* Curso */}
											<div className="col-sm-6">
												<div className="form-group">
													<label>Curso:*</label>
													<select
														className="form-control form-control-sm"
														id="selectCurso"
														value={this.state.id_curso}
														onChange={(e) => this.setState({ id_curso: e.target.value })}
													>
														<option value="0">Selecione</option>
														{this.state.array_cursos.length > 0 ? (
															this.state.array_cursos.map((curso) =>
																this.state.idAreaConcentracao === curso.id_areaConcentracao ? (
																	<option key={curso.id} value={curso.id}>
																		{curso.nome}
																	</option>
																) : null
															)
														) : (
															<option value="0">Nenhum curso encontrado</option>
														)}
													</select>
												</div>
											</div>

											{/* Fase do processo */}
											<div className="col-sm-6">
												<div className="form-group">
													<label>Fase do processo:*</label>
													<select
														className="form-control form-control-sm"
														id="selectFaseProcesso"
														value={this.state.fase_processo}
														onChange={(e) =>
															this.setState({ fase_processo: e.target.value })
														}
													>
														<option value="0">Selecione</option>
														{this.state.array_tiposBanca.length > 0 ? (
															this.state.array_tiposBanca.map((tipo) => (
																<option key={tipo.id} value={tipo.id}>
																	{tipo.nome}
																</option>
															))
														) : (
															<option value="0">Nenhum resultado encontrado</option>
														)}
													</select>
												</div>
											</div>
										</div>

										{/* Senha */}
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor="senha">Senha</label>
													<input
														type="password"
														className="form-control form-control-sm"
														id="senha"
														placeholder="Informe sua senha"
														value={this.state.senha}
														onChange={(e) => this.setState({ senha: e.target.value })}
													/>
												</div>
											</div>

											{/* Repetir Senha */}
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor="confirmarSenha">Repetir Senha</label>
													<input
														type="password"
														className="form-control form-control-sm"
														id="confirmarSenha"
														placeholder="Informe sua senha novamente"
														value={this.state.confirmarSenha}
														onChange={(e) =>
															this.setState({ confirmarSenha: e.target.value })
														}
													/>
												</div>
											</div>
										</div>

										{/* Informações adicionais */}
										<div className="form-group">
											<label htmlFor="informacoes_adicionais">Informações adicionais</label>
											<textarea
												className="form-control form-control-sm"
												id="informacoes_adicionais"
												rows="3"
												value={this.state.informacoes_adicionais}
												onChange={(e) =>
													this.setState({ informacoes_adicionais: e.target.value })
												}
											></textarea>
										</div>

										{/* Datas */}
										<div className="row">
											{/* Data/hora inicial do processo */}
											<div className="col-sm-4">
												<div className="form-group">
													<label htmlFor="dataHoraInicialFaseProcesso">
														Data/hora inicial do processo:
													</label>
													<input
														className="form-control form-control-sm"
														type="datetime-local"
														id="dataHoraInicialFaseProcesso"
														name="dataHoraInicialFaseProcesso"
														min="2022-01"
														value={this.state.dataHoraInicialFaseProcesso}
														onChange={(e) =>
															this.setState({ dataHoraInicialFaseProcesso: e.target.value })
														}
													/>
												</div>
											</div>

											{/* Data/hora final do processo */}
											<div className="col-sm-4">
												<div className="form-group">
													<label htmlFor="dataHoraFinalFaseProcesso">
														Data/hora final do processo:
													</label>
													<input
														className="form-control form-control-sm"
														type="datetime-local"
														id="dataHoraFinalFaseProcesso"
														name="dataHoraFinalFaseProcesso"
														min="2022-01"
														value={this.state.dataHoraFinalFaseProcesso}
														onChange={(e) =>
															this.setState({ dataHoraFinalFaseProcesso: e.target.value })
														}
													/>
												</div>
											</div>

											{/* Data/hora de conclusão */}
											<div className="col-sm-4">
												<div className="form-group">
													<label htmlFor="dataHoraConclusao">
														Data/hora de conclusão:
													</label>
													<input
														className="form-control form-control-sm"
														type="datetime-local"
														id="dataHoraConclusao"
														name="dataHoraConclusao"
														min="2022-01"
														value={this.state.dataHoraConclusao}
														onChange={(e) =>
															this.setState({ dataHoraConclusao: e.target.value })
														}
													/>
												</div>
											</div>
										</div>

										{/* Mensagens de Sucesso ou Erro */}
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

										{/* Botão de Salvar */}
										<div className="float-right">
											<button className="button">
												<FaRegSave /> Salvar
											</button>
										</div>
									</Form>

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
									<div className="table-responsive table-sm text-center">
										<div className="table-wrapper">
											<table className="table table-bordered table-striped table-hover bg-white text-center">
												<thead
													className="thead-light"
													style={{ position: 'sticky', top: 0, zIndex: 1 }}
												>
													<tr>
														<th>N° da orientação</th>
														<th scope="col">Link</th>
														<th>Orientando</th>
														<th>Observação</th>
														<th>Data/hora prevista</th>
														<th>Ações</th>
													</tr>
												</thead>
												<tbody>
													{this.state.arrayOrientacao.length > 0 ? (
														this.state.arrayOrientacao.map((orientacao) => (
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
																			this.handlerShowModalCadastrarEAtualizarOrientacao(
																				orientacao
																			)
																		}
																	>
																		<FaRegEdit /> Atualizar
																	</button>
																</td>
															</tr>
														))
													) : (
														<tr className="text-center">
															<td colSpan="6">Nenhum resultado encontrado</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
									</div>

									{/* Total de Registros */}
									<div className="text-center font-weight-bold mt-3 mb-5">
										Total de Registros: {this.state.arrayOrientacao.length}
									</div>
								</Modal.Body>
							</Modal>


							<Modal
								show={this.state.modalShowExcluirBanca}
								onHide={this.handlerCloseModalExcluirBanca}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="sm"
								centered
							>
								<Form onSubmit={this.handleExcluirBanca}>
									<Modal.Header closeButton>
										<h4 className="titulo">
											<FaUserGraduate /> Excluir banca
										</h4>
									</Modal.Header>
									<Modal.Body className="text-center">
										<p>
											Confirmar a exclusão da banca de {this.state.tipo_banca} do orientando{' '}
											{this.state.nome}
										</p>
										<button className="btn btn-outline-success">Confirmar</button>
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
									</Modal.Body>
								</Form>
							</Modal>
							<Modal
								show={this.state.modalShowEmitirAta}
								onHide={this.handlerCloseModalEmitirAta}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="md"
								centered
							>
								<Form onSubmit={this.handleCadastrarATA}>
									<Modal.Header closeButton>
										<h4 className="titulo">
											<FaUserGraduate /> Emitir ata de {this.state.tipo_banca.toLowerCase()}
										</h4>
									</Modal.Header>
									<Modal.Body>
										<div className="form-group">
											<label htmlFor="selectStatusAta">Status:</label>
											<select
												className="form-control form-control-sm"
												id="selectStatusAta"
												value={this.state.status_ata}
												onChange={(e) => this.setState({ status_ata: e.target.value })}
											>
												<option value="0">Selecionar</option>
												{this.state.array_status.length > 0 ? (
													this.state.array_status.map((item) =>
														parseInt(item.id) > 2 ? (
															<option key={item.id} value={item.id}>
																{item.nome}
															</option>
														) : null
													)
												) : (
													<option value="0">Nenhum resultado encontrado</option>
												)}
											</select>
										</div>

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
									</Modal.Body>
									<Modal.Footer>
										<button className="button">
											<FaRegSave /> Salvar
										</button>
									</Modal.Footer>
								</Form>
							</Modal>



							<Modal
								show={this.state.modalShowAtualizarAta}
								onHide={this.handlerCloseModalAtualizarAta}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="md"
								centered
							>
								<Form onSubmit={this.handleAtualizarATA}>
									<Modal.Header closeButton>
										<h4 className="titulo">
											<FaUserGraduate /> Atualizar ata de {this.state.tipo_banca}
										</h4>
									</Modal.Header>
									<Modal.Body>
										<div className="form-group">
											<label htmlFor="selectStatusAta">Status:</label>
											<select
												className="form-control"
												id="selectStatusAta"
												value={this.state.id_statusAta}
												onChange={(e) => this.setState({ id_statusAta: e.target.value })}
											>
												<option value="0">Selecionar</option>
												{this.state.array_status.length > 0 ? (
													this.state.array_status.map((item) =>
														parseInt(item.id) > 2 ? (
															<option key={item.id} value={item.id}>
																{item.nome}
															</option>
														) : null
													)
												) : (
													<option value="0">Nenhum resultado encontrado</option>
												)}
											</select>
										</div>

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
									</Modal.Body>
									<Modal.Footer>
										<button className="button">
											<FaRegSave /> Salvar
										</button>
									</Modal.Footer>
								</Form>
							</Modal>


							<Modal
								show={this.state.modalShowVisualizarAta}
								onHide={this.handlerCloseModalVisualizarAta}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
							>
								<Modal.Header closeButton>
									<h4 className="titulo">
										<FaUserGraduate /> Visualizar ata de {this.state.tipo_banca}
									</h4>
								</Modal.Header>
								<Modal.Body>
									<div id="ata">
										<div className="container">
											<AtaDefesa
												nome={this.state.nome}
												id_curso={this.state.id_curso}
												titulo={this.state.titulo}
												data_horaPrevista={this.state.data_horaPrevista}
												status_ata={this.state.status_ata}
												arrayMembrosDaAtaDeDefesa={this.state.arrayMembrosDaAtaDeDefesa}
												dataFormatAmericano={this.state.dataFormatAmericano}
											/>
										</div>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<button className="button" onClick={() => print('ata')}>
										Imprimir
									</button>
								</Modal.Footer>
							</Modal>

							<Modal
								show={this.state.modalShowEmitirFichaDeAvaliacao}
								onHide={this.handlerCloseModalEmitirFichaDeAvaliacao}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered
							>
								<Form onSubmit={this.handleCadastrarFichaDeAvaliacao}>
									<Modal.Header closeButton>
										<h4 className="titulo">
											<FaWpforms /> Cadastrar ficha de avaliação
										</h4>
									</Modal.Header>
									<Modal.Body>
										{/* ... (Outros campos do formulário, como Orientando, Curso, etc.) */}

										{/* Renderização das perguntas utilizando o componente PerguntaAvaliacao */}
										{perguntas.map((pergunta) => (
											<PerguntaAvaliacao
												key={pergunta.numeroPergunta}
												numeroPergunta={pergunta.numeroPergunta}
												textoPergunta={pergunta.textoPergunta}
												nomeEstadoResposta={pergunta.nomeEstadoResposta}
												nomeEstadoResumo={pergunta.nomeEstadoResumo}
												valorSelecionado={pergunta.valorSelecionado}
												valorResumo={pergunta.valorResumo}
												aoAlterarResposta={this.handleOptionChange}
												aoAlterarResumo={this.handleResumoChange}
												opcoes={pergunta.opcoes} // Isso permitirá passar opções personalizadas
											/>
										))}

										{/* ... (Campos adicionais, se houver) */}

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
									</Modal.Body>
									<Modal.Footer>
										<button className="button">
											<FaRegSave /> Salvar
										</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowEditarFichaDeAvaliacao}
								onHide={this.handlerCloseModalEditarFichaDeAvaliacao}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered
							>
								<Form onSubmit={this.handleAtualizarFichaDeAvaliacao}>
									<Modal.Header closeButton>
										<h4 className="titulo">Atualizar ficha de avaliação</h4>
									</Modal.Header>
									<Modal.Body>
										{/* Outros campos do formulário, como Orientando, Curso, etc. */}
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>Orientando:*</label>
													<select
														className="form-control"
														id="selectOrientando"
														value={this.state.id_orientando}
														onChange={(e) => this.setState({ id_orientando: e.target.value })}
													>
														{this.state.array_orientandos.length > 0 ? (
															this.state.array_orientandos.map((orientando) =>
																this.state.id_orientando === orientando.id ? (
																	<option key={orientando.id} value={orientando.id}>
																		{orientando.nome}
																	</option>
																) : null
															)
														) : (
															<option value="0">Nenhum orientando encontrado</option>
														)}
													</select>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Curso:*</label>
													<select
														className="form-control"
														id="selectCurso"
														value={this.state.id_curso}
														onChange={(e) => this.setState({ id_curso: e.target.value })}
													>
														{this.state.array_cursos.length > 0 ? (
															this.state.array_cursos.map((curso) =>
																this.state.id_curso === curso.id ? (
																	<option key={curso.id} value={curso.id}>
																		{curso.nome}
																	</option>
																) : null
															)
														) : (
															<option value="0">Nenhum curso encontrado</option>
														)}
													</select>
												</div>
											</div>
										</div>

										{/* Renderização das perguntas utilizando o componente PerguntaAvaliacao */}
										{perguntas.map((pergunta) => (
											<PerguntaAvaliacao
												key={pergunta.numeroPergunta}
												numeroPergunta={pergunta.numeroPergunta}
												textoPergunta={pergunta.textoPergunta}
												nomeEstadoResposta={pergunta.nomeEstadoResposta}
												nomeEstadoResumo={pergunta.nomeEstadoResumo}
												valorSelecionado={pergunta.valorSelecionado}
												valorResumo={pergunta.valorResumo}
												aoAlterarResposta={this.handleOptionChange}
												aoAlterarResumo={this.handleResumoChange}
												opcoes={pergunta.opcoes} // Passa as opções personalizadas se houver
											/>
										))}

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
									</Modal.Body>
									<Modal.Footer>
										<button className="button">
											<FaRegSave /> Salvar
										</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowVisualizarFichaDeAvaliacao}
								onHide={() => this.handlerCloseModalVisualizarFichaDeAvaliacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='xl'
								centered>
								<Modal.Header closeButton>
								</Modal.Header>
								<Modal.Body>
									<div id="ficha_avaliacao" className='page'>
										<img style={{ width: '100%', marginBottom: '20px' }} src={Logo_ATA} />
										<h6 className='text-center font-weight-bold'>IVY ENBER CHRISTIAN UNIVERSITY</h6>
										<h6 className='text-center font-weight-bold mb-3'>FICHA DE AVALIAÇÃO DA QUALIFICAÇÃO DO PROJETO</h6>

										<p>ALUNO(A): {this.state.nome}</p>
										<p>NÍVEL:  {this.state.id_curso === 1 || this.state.id_curso === 3 ? `(x) MESTRADO  ( ) DOUTORADO}` : `( ) MESTRADO  (x) DOUTORADO`}</p>
										<p>ÁREA DE CONCENTRAÇÃO: {this.state.areaConcentracao}</p>
										<p>LINHA DE PESQUISA: {this.state.linha_pesquisa}</p>
										<p>TÍTULO DO PROJETO DE DISSERTAÇÃO/TESE: {this.state.titulo_teseOuDissertacao}</p>
										<p>ORIENTADOR(A): {this.state.orientador}</p>
										<p>AVALIADOR(A): {this.state.membro_interno}</p>
										<p>{this.state.membro_interno}</p>

										<p>1 - O título do projeto reflete o estudo a ser realizado</p>
										<p>{this.state.titulo_projeto === "SIM" ? "(X)" : "()"} SIM</p>
										<p>{this.state.titulo_projeto === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
										<p>{this.state.titulo_projeto === "NÃO" ? "(X)" : "()"} NÃO</p>
										<p>Resumo: {this.state.resumoQ1}</p>

										<p>2 - A pergunta condutora está explicitada?</p>
										<p>{this.state.pergunta_condutora === "SIM" ? "(X)" : "()"} SIM</p>
										<p>{this.state.pergunta_condutora === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
										<p>{this.state.pergunta_condutora === "NÃO" ? "(X)" : "()"} NÃO</p>

										<p>Resumo: {this.state.resumoQ2}</p>

										<p>3 - A hipótese (não responder quando o desenho do estudo não couber a formulação de hipótese) está
											redigida de forma clara e o estudo proposto permite testá-la?</p>
										<p>{this.state.hipotese === "SIM" ? "(X)" : "()"} SIM</p>
										<p>{this.state.hipotese === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
										<p>{this.state.hipotese === "NÃO" ? "(X)" : "()"} NÃO</p>

										<p>Resumo: {this.state.resumoQ3}</p>

										<p>4 - A fundamentação teórica e empírica (revisão da literatura) dá sustentação ao estudo tanto nos aspectos
											teóricos quanto metodológicos?</p>

										<p>7350 FUTURES DRIVE •
											ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.:
											+1 (321) 300-9710</p>

										<p>{this.state.fundamentacao_teorica === "SIM" ? "(X)" : "()"} SIM</p>
										<p>{this.state.fundamentacao_teorica === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
										<p>{this.state.fundamentacao_teorica === "NÃO" ? "(X)" : "()"} NÃO</p>

										<p>Sugestão: {this.state.resumoQ4}</p>

										<p>5 - Os objetivos estão redigidos de forma clara e poderão ser atingidos a partir do estudo empírico
											delineado?</p>
										<p>{this.state.objetivo === "SIM" ? "(X)" : "()"} SIM</p>
										<p>{this.state.objetivo === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
										<p>{this.state.objetivo === "NÃO" ? "(X)" : "()"} NÃO</p>

										<p>Sugestão: {this.state.resumoQ5}</p>

										<p>6 - O método contempla os passos necessários para garantir a validação interna da pesquisa?</p>
										<p>{this.state.metodo === "SIM" ? "(X)" : "()"} SIM</p>
										<p>{this.state.metodo === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
										<p>{this.state.metodo === "NÃO" ? "(X)" : "()"} NÃO</p>

										<p>Sugestão: {this.state.resumoQ6}</p>

										<p>7 - O cronograma proposto é compatível com a proposta?</p>
										<p>{this.state.cronograma === "SIM" ? "(X)" : "()"} SIM</p>
										<p>{this.state.cronograma === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
										<p>{this.state.cronograma === "NÃO" ? "(X)" : "()"} NÃO</p>

										<p>Sugestão: {this.state.resumoQ7}</p>

										<p>7 - CONCLUSÃO DA AVALIAÇÃO</p>

										<p>{this.state.conclusao_avaliacao === "APROVADO SEM MODIFICAÇÕES" ? "(X)" : "()"} APROVADO SEM MODIFICAÇÕES</p>
										<p>{this.state.conclusao_avaliacao === "APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E LIBERAÇÃO DO ORIENTADOR" ? "(X)" : "()"} APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E
											LIBERAÇÃO DO ORIENTADOR</p>
										<p>{this.state.conclusao_avaliacao === "ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A AVALIAÇÃO INICIAL" ? "(X)" : "()"} ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS
											ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A
											AVALIAÇÃO INICIAL</p>

										<p>Sugestão: {this.state.resumoQ8}</p>

										<p>7350 FUTURES DRIVE •
											ORLANDO • FL 32819 WWW.ENBERUNIVERSITY.COM • TEL.:
											+1 (321) 300-9710</p>

										<p>Orientações:</p>
										<p>A orientanda terá o tempo de 20 min para fazer a sua exposição da sua pesquisa
											Cada um dos membros da banca terá 20 min para fazer as suas considerações a respeito do texto enviado
											para avaliação;</p>
										<p>Em seguida, a banca reunir-se á em uma outra sala do Meet a fim de que possa redigir o seu parecer final
											referente a qualificação/defesa.</p>
										<p>Link do Meet: meet.google.com/hvf-khsa-cfq</p>

										<p>ENCAMINHADO A COORDENAÇÃO / COLEGIADO PARA PROVIDÊNCIAS ADMINISTRATIVAS
											CABÍVEIS</p>

										<p>Orlando Flórida, {this.state.dataFichaAvaliacaoPtBr}</p>

										<hr />
										<div className="row mt-5 text-center">
											<div className="col border-bottom border-dark  mr-1">
												<img className="img-fluid" src={this.state.assinatura_presidente} />
											</div>

										</div>

										<p className='text-center'>Assinatura do Examinador</p>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<button className='button' onClick={() => print('ficha_avaliacao')}>Imprimir</button>
								</Modal.Footer>
							</Modal>

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
													<p className="text-justify p-4">
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atestamos que{' '}
														{this.state.sexo === 'M' ? 'o ' : 'a '}
														{this.state.sexo === 'M' ? 'Prof. Dr. ' : 'Prof(a). Dr(a). '}
														<b>{this.state.membro.toUpperCase()}</b>, participou em{' '}
														{this.state.data_horaPrevistaPtBr}, como {this.getMemberRolePortuguese(this.state.membro)} da
														Comissão Examinadora da {this.getBancaTypePortuguese()}
														{this.getCourseTypePortuguese()} de <b>{this.state.orientando.toUpperCase()}</b>,
														discente regular do {this.getProgramNamePortuguese()}, Curso de{' '}
														{this.state.curso ? this.state.curso.split(' ', 1)[0] : ''}, cujo trabalho se
														intitula <b>{this.state.titulo_banca.toUpperCase()}</b>. A Comissão Examinadora foi
														constituída pelos seguintes membros:
													</p>
												)}

												{/* Lista de Membros */}
												<MemberList
													membros={this.state.arrayMembrosDaDeclaracaoDeParticipacao}
													isEnglish={this.state.documentoEmIngles}
												/>

												<p className={this.state.documentoEmIngles ? 'text-right p-3' : 'mt-2 text-right p-4'}>
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
														{/* Conteúdo em Inglês */}
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We hereby declare that{' '}
														{this.state.sexo === 'M' ? ' Prof. Dr. ' : ' Prof. Dr. '}
														<b>{this.state.orientador}</b> from the{' '}
														{/* Aqui você pode ajustar conforme necessário */}
														supervised the thesis of {this.state.orientando}, a regular student in the Master's
														course titled: <b>{this.state.title.toUpperCase()}</b>.
													</p>
												) : (
													<p style={{ fontSize: '12pt', textAlign: 'justify' }} className="p-3">
														{/* Conteúdo em Português */}
														&nbsp;&nbsp;&nbsp;&nbsp;Declaramos que o(a){' '}
														{this.state.sexo === 'M' ? ' Prof. Dr. ' : ' Prof(a). Dr(a). '}{' '}
														<b>{this.state.orientador}</b> do(a){' '}
														{this.state.id_curso === 1
															? ' Programa de Pós-Graduação em Ciências da Educação'
															: ' Programa de Pós-Graduação em Teologia'}
														, realizou a orientação da{' '}
														{this.state.id_curso === 1 ? 'dissertação' : 'tese'} de{' '}
														{this.state.orientando.toUpperCase()}, discente regular do
														{this.state.id_curso === 1
															? ' Programa de Pós-Graduação em Ciências da Educação'
															: ' Programa de Pós-Graduação em Teologia'}
														, no curso de {this.state.curso.split(' ', 1)[0]} cujo trabalho se intitula:{' '}
														<b>{this.state.titulo}</b>
													</p>
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
									<Button onClick={() => print('declaracao_participacao')}>Imprimir</Button>
								</Modal.Footer>
							</Modal>

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

											{this.state.arrayMembrosDaDeclaracaoDeParticipacao.length > 0 &&
												this.state.arrayMembrosDaDeclaracaoDeParticipacao.map((membro) => (
													<div key={membro.id}>
														<img
															className="img-fluid"
															style={{ width: '220px', display: 'block', margin: '0 auto' }}
															src={membro.assinatura}
															alt={`Assinatura de ${membro.nome}`}
														/>
														<hr />
														<p className="text-center">{membro.nome.toUpperCase()}</p>
													</div>
												))}

											<DocumentFooter />
										</DocumentContainer>
									</div>
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowFinalizarBanca}
								onHide={() => this.handlerCloseModalFinalizarBanca()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='sm'
								centered>
								<Form onSubmit={this.atualizarBanca}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaCalendarWeek /> Finalizar banca</h4>
									</Modal.Header>
									<Modal.Body className='text-center'>
										<p>Confirmar a finalização da banca de {this.state.tipo_banca} do orientando {this.state.nome}</p>
										<button className='btn btn-outline-success'>Confirmar</button>

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
									</Modal.Body>
								</Form>
							</Modal>

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