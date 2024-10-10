import { FaUserGraduate, FaLayerGroup, FaCalendarWeek, FaRegEdit, FaRegPlusSquare, FaRegSave, FaPencilAlt, FaShieldAlt, FaFileAlt, FaPaste, FaWpforms, FaClipboardList, FaPlus } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../../services/api';
import { getToken } from '../../../services/auth';
import Modal from 'react-bootstrap/Modal';
import Logo_ATA from '../../../assets/logo_ata.jpg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Accordion, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { listaDeStatus } from '../../../services/getListaDeStatus';
import { listaDeAreasConcentracao } from '../../../services/getListaDeAreasConcentracao';
import { listaDeLinhasDePesquisas } from '../../../services/getListaDeLinhasDePesquisas';
import { listaDeOrientadores } from '../../../services/getListaDeOrientadores';
import { listaDeMembrosExternos } from '../../../services/getListaDeMembrosExternos';
import { uploadFile } from '../../../services/uploadFile';
import { listaDeAnexos } from '../../../services/getListaDeAnexos';
import { print } from '../../../services/print';
import { AtaDefesa } from '../../../components/AtaDefesa';
import { FolhaDeAprovacao } from '../../../components/FolhaDeAprovacao';
import Menu from '../../../components/Menu';
import backgroundImage from '../../../assets/sistema_chamados.png';
import MainContent from '../../../components/MainContent';
import FloatingMenu from '../../../components/FloatingMenu';
import AdminNavbar from '../../../components/Navbar';
import UserContext from '../../../UserContext';
import Select from 'react-select';
import RODAPE1 from '../../../assets/rodape1.png';
import RODAPE2 from '../../../assets/rodape2.png';
import RODAPE3 from '../../../assets/rodape3.png';
import RODAPE4 from '../../../assets/rodape4.png';
import BACKGROUND_ENBER from '../../../assets/background_enber.png';
import ASSINATURA_JOSUE from '../../../assets/assinatura_josue.png';

export default class Index extends Component {
	static contextType = UserContext;
	constructor(props) {
		super();

		this.state = {
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

			//Banca
			array_orientandos: [],
			id_usuario: 0,
			array_tiposBanca: [],
			id_tipoBanca: '',
			tipo_banca: '',
			data_horaPrevista: '',
			confirmar: 0,
			data_HoraPrevistaDeDefesa: '',
			data_HoraPagTaxaDeApostilamento: '',
			array_bancasQ: [],
			array_bancasD: [],
			status_banca: 0,
			idLinhaPesquisa: '',
			linha_pesquisa: '',
			idAreaConcentracao: '',
			areaConcentracao: '',
			id_membroInterno: '',
			id_membroExterno: '',
			arrayMembrosInternos: [],
			arrayMembrosExternos: [],
			titulo: '',
			title: '',
			resumo: '',
			palavra_chave: '',

			//Orientandos
			id_orientando: 0,
			nome: '',
			id_curso: '',
			email: '',
			senha: '',
			confirmarSenha: '',
			informacoes_adicionais: '',
			array_cursos: [],
			id_banca: 0,
			fase_processo: '',
			dataHoraInicialFaseProcesso: '',
			dataHoraFinalFaseProcesso: '',
			dataHoraConclusao: '',

			//ATA
			array_status: [],
			presidente: '',
			membro_externo: '',
			membro_interno: '',
			titulo_teseOuDissertacao: '',
			quant_pag: 0,
			id_statusAta: '',
			status_ata: '',
			data_horaPrevistaAta: '',
			id_ata: '',
			arrayLinhasDePesquisas: [],
			arrayAreaConcentracao: [],
			link_ata: "",
			assinatura_membroInterno: "",
			assinatura_presidente: "",
			assinatura_membroExterno: "",
			dtCadAta: "",
			dataFormatAmericano: "",

			//Ficha de avaliação
			id_fichaAvaliacao: '',
			id_orientador: '',
			orientador: '',
			titulo_projeto: '',
			pergunta_condutora: '',
			hipotese: '',
			fundamentacao_teorica: '',
			objetivo: '',
			metodo: '',
			cronograma: '',
			conclusao_avaliacao: '',
			resumoQ1: '',
			resumoQ2: '',
			resumoQ3: '',
			resumoQ4: '',
			resumoQ5: '',
			resumoQ6: '',
			resumoQ7: '',
			resumoQ8: '',
			dataFichaAvaliacaoPtBr: '',

			//Orientação
			id_orientacao: 0,
			link: '',
			observacao: '',
			arrayOrientacao: [],
			arquivos: [],
			anexo: "",
			nomeArquivo: "",

			//Declaração
			sexo: "",
			tipo_membro: 0,
			orientador: [],
			arrayMembrosDaDeclaracaoDeParticipacao: [],
			arrayMembrosDaAtaDeDefesa: [],
			id_membroDeclaracao: 0,
			array_declaracoes: [],
			membro: "",
			titulo_banca: "",
			codigo_validacao: 0,
			dataHoraCriacao: "",
			orientando: "",
			curso: "",
			dataDeclaracaoEnUs: "",
			dataDeclaracaoPtBr: "",
			data_horaPrevistaEnUs: "",
			data_horaPrevistaPtBr: "",
			anexo: null,
			arrayAnexosDaOrientacao: [],
			arrayAnexosDoOrientando: [],

			//Folha de aprovação
			idFolhaDeAprovacao: 0,
			dtFolhaAprovacaoFormatada: "",
			arraySelectedMembrosExternos: [],
			arraySelectedMembrosInternos: [],
			arraySelectedMembrosDaBanca: [],

			idDeclaracaoDeOrientacao: 0,
			dataDeOrientacao: '',
			title: "",

			id_usuario: 0,
			documentoEmIngles: false
		};
	}

	componentDidMount() {
		this.buscaInformacoesDoOrientador(getToken());
		this.listaDeOrientandos(getToken(), this.context.user.id);
		this.listaDeBancas(getToken(), 1);
		this.listaDeBancas(getToken(), 2);
		this.listaDeTiposDeBanca(getToken());
	}

	setModalShowCadastrarBanca(valor) {
		this.setState({ modalShowCadastrarBanca: valor });
	}

	handlerShowModalCadastrarBanca() {
		this.setModalShowCadastrarBanca(true);
		this.listaDeTiposDeBanca(getToken());
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
		listaDeLinhasDePesquisas(this.state.idAreaConcentracao)
			.then(result => this.setState({ arrayLinhasDePesquisas: result }));

		listaDeOrientadores(0).then(result => {
			let arrayMembrosInternos = [];
			if (result.length > 0) {
				result.map((item, index) => {
					console.log(item.id_usuario);
					if (item.id_usuario !== this.context.user.id) {
						arrayMembrosInternos.push({ value: item.id_usuario, label: item.nome });
					}

				});
				this.setState({ arrayMembrosInternos });
			}
		});

		listaDeMembrosExternos().then(result => {
			let arrayMembrosExternos = [];
			if (result.length > 0) {
				result.map((item, index) => {
					arrayMembrosExternos.push({ value: item.id_usuario, label: item.nome });
				});
				this.setState({ arrayMembrosExternos });
			}
		});
	}

	handlerCloseModalCadastrarBanca() {
		this.setModalShowCadastrarBanca(false);
		this.setState({ success: '', error: '', id_orientando: '', id_tipoBanca: '', data_horaPrevista: '' });
	};


	setModalShowAtualizarBanca(valor) {
		this.setState({ modalShowAtualizarBanca: valor });
	}

	handlerShowModalAtualizarBanca(banca) {
		this.setModalShowAtualizarBanca(true);
		console.log(banca);

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
			palavra_chave: banca.palavra_chave
		});

		this.listaDeMembrosDaBanca(banca.id);
		this.listaDeTiposDeBanca(getToken());
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
		listaDeLinhasDePesquisas(this.state.idAreaConcentracao).then(result => this.setState({ arrayLinhasDePesquisas: result }));

		listaDeOrientadores(0).then(result => {
			console.log(result);
			let arrayMembrosInternos = [];
			if (result.length > 0) {
				result.map((item, index) => {
					if (item.id_usuario !== this.context.user.id) {
						arrayMembrosInternos.push({ value: item.id_usuario, label: item.nome });
					}
				});
				this.setState({ arrayMembrosInternos });
			}
		});

		listaDeMembrosExternos().then(result => {
			let arrayMembrosExternos = [];
			if (result.length > 0) {
				result.map((item, index) => {
					arrayMembrosExternos.push({ value: item.id_usuario, label: item.nome });
				});
				this.setState({ arrayMembrosExternos });
			}
		});
	}

	handlerCloseModalAtualizarBanca() {
		this.setModalShowAtualizarBanca(false);
		this.setState({ success: '', error: '', id_orientando: '', id_tipoBanca: '', data_horaPrevista: '', arraySelectedMembrosInternos: [], arraySelectedMembrosExternos: [] });
	};

	setModalShowExcluirBanca(valor) {
		this.setState({ modalShowExcluirBanca: valor });
	}

	handlerShowModalExcluirBanca(banca) {
		this.setState({ id_banca: banca.id, tipo_banca: banca.tipo_banca, nome: banca.orientando, id_tipoBanca: banca.id_tipoBanca, id_orientando: banca.id_orientando });
		this.setModalShowExcluirBanca(true);

	}

	handlerCloseModalExcluirBanca() {
		this.setModalShowExcluirBanca(false);
		this.setState({ success: '', error: '', id_banca: '', tipo_banca: '', nome: '' })
	};


	setModalShowFinalizarBanca(valor) {
		this.setState({ modalShowFinalizarBanca: valor });
	}

	handlerShowModalFinalizarBanca(banca) {
		this.setState({ id_banca: banca.id, tipo_banca: banca.tipo_banca, nome: banca.orientando, id_tipoBanca: banca.id_tipoBanca, id_orientando: banca.id_orientando });
		this.setModalShowFinalizarBanca(true);

	}

	handlerCloseModalFinalizarBanca() {
		this.setModalShowFinalizarBanca(false);
		this.setState({ success: '', error: '', id_banca: '', tipo_banca: '', nome: '' })
	};


	setModalShowEmitirAta(valor) {
		this.setState({ modalShowEmitirAta: valor });
	}

	handlerShowModalEmitirAta(banca) {
		console.log(banca)
		this.setModalShowEmitirAta(true);
		this.setState({
			id_banca: banca.id,
			titulo_teseOuDissertacao: "",
			quant_pag: 0,
			status_ata: "",
			nome: "",
			data_horaPrevistaAta: "",
			id_statusAta: "",
			tipo_banca: banca.tipo_banca,
			link_ata: ""
		});
		listaDeStatus(getToken()).then(result => this.setState({ array_status: result }));
	}

	handlerCloseModalEmitirAta() {
		this.setModalShowEmitirAta(false);
		this.setState({ success: '', error: '' })
	};

	setModalShowAtualizarAta(valor) {
		this.setState({ modalShowAtualizarAta: valor });
	}

	handlerShowModalAtualizarAta(banca) {
		this.setModalShowAtualizarAta(true);
		console.log(banca);
		this.setState({
			id_ata: banca.id_ata,
			id_banca: banca.id,
			titulo_teseOuDissertacao: banca.title,
			quant_pag: banca.quant_pag,
			status_ata: banca.status_ata,
			nome: banca.orientando,
			data_horaPrevistaAta: banca.data_horaPrevistaAta,
			id_statusAta: banca.id_statusAta,
			tipo_banca: banca.tipo_banca,
			link_ata: banca.link
		});

		listaDeStatus(getToken()).then(result => this.setState({ array_status: result }));
	}

	handlerCloseModalAtualizarAta() {
		this.setModalShowAtualizarAta(false);
		this.setState({ success: '', error: '' })
	};

	setModalShowVisualizarAta(valor) {
		this.setState({ modalShowVisualizarAta: valor });
	}

	handlerShowModalVisualizarAta(banca) {
		this.setModalShowVisualizarAta(true);
		this.listaDeMembrosDaBanca(banca.id);
		this.setState({
			titulo: banca.titulo,
			quant_pag: banca.quant_pag,
			status_ata: banca.status_ata,
			nome: banca.orientando,
			data_horaPrevistaAta: banca.data_horaPrevistaAta,
			id_tipoBanca: banca.id_tipoBanca,
			tipo_banca: banca.tipo_banca,
			link_ata: banca.link,
			id_curso: banca.id_curso,
			data_horaPrevista: banca.dataHoraPrevistaAta,
			dtCadAta: banca.dtCadAta,
			dataFormatAmericano: banca.dataFormatAmericano
		});
	}

	handlerCloseModalVisualizarAta() {
		this.setModalShowVisualizarAta(false);
		this.setState({
			success: '', error: '', id_tipoBanca: '',
			tipo_banca: ''
		})
	};

	setModalShowEmitirDeclaracao(valor) {
		this.setState({ modalShowEmitirDeclaracao: valor });
	}

	handlerShowModalEmitirDeclaracao(banca) {
		this.setModalShowEmitirDeclaracao(true);
		this.listaDeMembrosDaBanca(banca.id);
		this.setState({
			id_banca: banca.id,
			id_orientador: banca.id_orientador
		});
		this.listaDeDeclaracoesDeParticipacao(banca.id);
	}

	handlerCloseModalEmitirDeclaracao() {
		this.setModalShowEmitirDeclaracao(false);
		this.setState({
			success: '', error: ''
		})
	};

	setModalShowVisualizarDeclaracao(valor) {
		this.setState({ modalShowVisualizarDeclaracao: valor });
	}

	handlerShowModalVisualizarDeclaracao(declaracao) {
		console.log(declaracao);
		this.setModalShowVisualizarDeclaracao(true);
		this.setState({
			id_curso: declaracao.id_curso,
			membro: declaracao.membro,
			titulo_banca: declaracao.titulo_banca,
			title: declaracao.title,
			codigo_validacao: declaracao.codigo_validacao,
			dataHoraCriacao: declaracao.dataHoraCriacao,
			orientando: declaracao.orientando,
			curso: declaracao.curso,
			data_horaPrevista: declaracao.data_horaPrevista,
			dataDeclaracaoEnUs: declaracao.dataDeclaracaoEnUs,
			dataDeclaracaoPtBr: declaracao.dataDeclaracaoPtBr,
			data_horaPrevistaEnUs: declaracao.data_horaPrevistaEnUs,
			data_horaPrevistaPtBr: declaracao.data_horaPrevistaPtBr,
			sexo: declaracao.sexo,
			id_tipoBanca: declaracao.id_tipoBanca,
			documentoEmIngles: declaracao.documentoEmIngles
		});
	}

	handlerCloseModalVisualizarDeclaracao() {
		this.setModalShowVisualizarDeclaracao(false);
		this.setState({
			membro: "",
			titulo_banca: "",
			codigo_validacao: "",
			dataHoraCriacao: "",
			orientando: "",
			curso: "",
			data_horaPrevista: "",
			dataDeclaracaoEnUs: "",
			dataDeclaracaoPtBr: "",
			data_horaPrevistaEnUs: "",
			data_horaPrevistaPtBr: ""
		});
	};

	setModalShowVisualizarDeclaracaoDeOrientacao(valor) {
		this.setState({ modalShowVisualizarDeclaracaoDeOrientacao: valor });
	}

	handlerShowModalVisualizarDeclaracaoDeOrientacao(banca) {
		console.log(banca.codigoDeclaracaoDeOrientacao);
		this.setModalShowVisualizarDeclaracaoDeOrientacao(true);
		if (banca.idDeclaracaoOrientacao !== null) {
			this.setState({
				id_curso: banca.id_curso,
				title: banca.title,
				orientador: banca.orientador,
				orientando: banca.orientando,
				codigo_validacao: banca.codigoDeclaracaoDeOrientacao,
				titulo: banca.titulo,
				documentoEmIngles: banca.documentoEmIngles,
				// dataHoraCriacao: banca.dataHoraCriacao,
				// orientador: banca.orientando,
				// 
				curso: banca.curso,
				// data_horaPrevista: banca.data_horaPrevista,
				// dataDeclaracaoEnUs: banca.dataDeclaracaoEnUs,
				dataDeclaracaoPtBr: banca.dataDeclaracaoDeOrientacaoPtBr,
				dataDeclaracaoEnUs: banca.dataDeclaracaoDeOrientacaoEnUs
				// data_horaPrevistaEnUs: banca.data_horaPrevistaEnUs,
				// data_horaPrevistaPtBr: banca.data_horaPrevistaPtBr,
				// sexo: banca.sexo
			});
		}
	}

	handlerCloseModalVisualizarDeclaracaoDeOrientacao() {
		this.setModalShowVisualizarDeclaracaoDeOrientacao(false);
	};

	setModalShowCadastrarOrientando(valor) {
		this.setState({ modalShowCadastrarOrientando: valor, success: '', error: '' });
	}

	handlerShowModalCadastrarOrientando() {
		this.setModalShowCadastrarOrientando(true);
		this.listaDeCursos(getToken());
		this.listaDeTiposDeBanca(getToken());
		this.setState({
			id_usuario: 0, id_orientando: 0, nome: "",
			email: "", id_curso: 0, senha: "",
			confirmarSenha: "", informacoes_adicionais: "",
			fase_processo: 0, dataHoraInicialFaseProcesso: "",
			dataHoraFinalFaseProcesso: "",
			dataHoraConclusao: ""
		})
	}

	handlerCloseModalCadastrarOrientando() {
		this.setModalShowCadastrarOrientando(false);
		this.setState({ success: '', error: '' })
	};

	setModalShowCadastrarOrientacao(valor) {
		this.setState({ modalShowCadastrarOrientacao: valor, success: '', error: '' });
	}

	handlerShowModalCadastrarEAtualizarOrientacao(orientacao = null) {
		this.setModalShowCadastrarOrientacao(true);
		if (orientacao !== null) {
			console.log(orientacao);
			// this.listaDeOrientacao(getToken(), orientacao.id);
			listaDeAnexos(getToken(), orientacao.id).then(result => this.setState({ arrayAnexosDaOrientacao: result.resultadosAnexosDaOrientacao, arrayAnexosDoOrientando: result.resultadosAnexosDoOrientando }));

			this.setState({
				id_orientacao: orientacao.id, link: orientacao.link,
				observacao: orientacao.observacao,
				data_horaPrevista: orientacao.dataHoraPrevista, anexo: orientacao.anexo
			});
			return;
		}

		this.setState({
			id_orientacao: 0,
			link: "",
			observacao: "",
			data_horaPrevista: "",
			nomeArquivo: "",
			anexo: ""
		});
	}

	handlerCloseModalCadastrarOrientacao() {
		this.setModalShowCadastrarOrientacao(false);
		localStorage.removeItem("@link");
		this.setState({
			id_orientacao: 0,
			link: "",
			observacao: "",
			data_horaPrevista: "",
			nomeArquivo: "",
			anexo: ""
		});
	};

	setModalShowEditarOrientando(valor) {
		this.setState({ modalShowEditarOrientando: valor, success: '', error: '' });
	}

	handlerShowModalEditarOrientando(orientando) {
		this.setModalShowEditarOrientando(true);
		this.listaDeCursos(getToken());
		this.listaDeTiposDeBanca(getToken());
		this.listaDeOrientacao(getToken(), orientando.id_usuario);
		this.setState({
			id_usuario: orientando.id_usuario, id_orientando: orientando.id, nome: orientando.nome,
			email: orientando.email, id_curso: orientando.id_curso, senha: orientando.senha,
			confirmarSenha: orientando.senha, informacoes_adicionais: orientando.informacoes_adicionais,
			fase_processo: orientando.id_tipoBanca, dataHoraInicialFaseProcesso: orientando.dataHoraInicialFaseProcesso,
			dataHoraFinalFaseProcesso: orientando.dataHoraFinalFaseProcesso,
			dataHoraConclusao: orientando.dataHoraConclusao
		})
	}

	handlerCloseModalEditarOrientando() {
		this.setModalShowEditarOrientando(false);
		this.setState({
			success: '', error: '',
			id_usuario: '', id_orientando: 0, nome: '',
			email: '', id_curso: '', senha: '',
			confirmarSenha: '', informacoes_adicionais: '',
			fase_processo: '', dataHoraInicialFaseProcesso: '',
			dataHoraFinalFaseProcesso: '',
			dataHoraConclusao: ''
		})
	};

	setModalShowVisualizarFichaDeAvaliacao(valor) {
		this.setState({ modalShowVisualizarFichaDeAvaliacao: valor });
	}

	handlerShowModalVisualizarFichaDeAvaliacao(banca) {
		console.log(banca);
		this.setModalShowVisualizarFichaDeAvaliacao(true);
		this.setState({
			membro_externo: banca.membro_externo,
			membro_interno: banca.membro_interno,
			titulo_teseOuDissertacao: banca.titulo_teseOuDissertacao,
			quant_pag: banca.quant_pag,
			status_ata: banca.status_ata,
			nome: banca.orientando,
			data_horaPrevistaAta: banca.data_horaPrevistaAta,
			id_statusAta: banca.id_statusAta,
			id_tipoBanca: banca.id_tipoBanca,
			tipo_banca: banca.tipo_banca,
			id_curso: banca.id_curso,
			titulo_projeto: banca.titulo_projeto,
			pergunta_condutora: banca.pergunta_condutora,
			hipotese: banca.hipotese,
			fundamentacao_teorica: banca.fundamentacao_teorica,
			objetivo: banca.objetivo,
			metodo: banca.metodo,
			cronograma: banca.cronograma,
			conclusao_avaliacao: banca.conclusao_avaliacao,
			resumoQ1: banca.resumoQ1,
			resumoQ2: banca.resumoQ2,
			resumoQ3: banca.resumoQ3,
			resumoQ4: banca.resumoQ4,
			resumoQ5: banca.resumoQ5,
			resumoQ6: banca.resumoQ6,
			resumoQ7: banca.resumoQ7,
			resumoQ8: banca.resumoQ8,
			areaConcentracao: banca.areaConcentracao,
			linha_pesquisa: banca.linha_pesquisa,
			orientador: banca.orientador,
			dataFichaAvaliacaoPtBr: banca.dataFichaAvaliacaoPtBr,
			assinatura_presidente: banca.assinatura_presidente
		});
	}

	handlerCloseModalVisualizarFichaDeAvaliacao() {
		this.setModalShowVisualizarFichaDeAvaliacao(false);
		this.setState({ success: '', error: '' });
	};

	setModalShowEmitirFichaDeAvaliacao(valor) {
		this.setState({ modalShowEmitirFichaDeAvaliacao: valor });
	}

	handlerShowModalEmitirFichaDeAvaliacao(banca) {
		this.setModalShowEmitirFichaDeAvaliacao(true);
		this.listaDeCursos(getToken());
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
		listaDeLinhasDePesquisas(banca.id_areaConcentracao).then(result => this.setState({ arrayLinhasDePesquisas: result }))
		this.setState({
			presidente: banca.presidente,
			membro_externo: banca.membro_externo,
			membro_interno: banca.membro_interno,
			titulo_teseOuDissertacao: banca.titulo_teseOuDissertacao,
			quant_pag: banca.quant_pag,
			status_ata: banca.status_ata,
			nome: banca.orientando,
			data_horaPrevistaAta: banca.data_horaPrevistaAta,
			id_statusAta: banca.id_statusAta,
			id_tipoBanca: banca.id_tipoBanca,
			tipo_banca: banca.tipo_banca,
			id_curso: banca.id_curso,
			idAreaConcentracao: banca.id_areaConcentracao,
			idLinhaPesquisa: banca.id_linhaPesquisa,
			id_orientando: banca.id_orientando,
			id_orientador: banca.id_orientador,
			orientador: banca.orientador,
			id_banca: banca.id,
			titulo_projeto: "",
			pergunta_condutora: "",
			hipotese: "",
			fundamentacao_teorica: "",
			objetivo: "",
			metodo: "",
			cronograma: "",
			conclusao_avaliacao: "",
			resumoQ1: "",
			resumoQ2: "",
			resumoQ3: "",
			resumoQ4: "",
			resumoQ5: "",
			resumoQ6: "",
			resumoQ7: "",
			resumoQ8: "",
			id_fichaAvaliacao: 0
		});
	}

	handlerCloseModalEmitirFichaDeAvaliacao() {
		this.setModalShowEmitirFichaDeAvaliacao(false);
		this.setState({ success: '', error: '' });
	};

	setModalShowEditarFichaDeAvaliacao(valor) {
		this.setState({ modalShowEditarFichaDeAvaliacao: valor });
	}

	handlerShowModalEditarFichaDeAvaliacao(banca) {
		console.log(banca);
		this.setModalShowEditarFichaDeAvaliacao(true);
		this.listaDeCursos(getToken());
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
		listaDeLinhasDePesquisas(banca.id_areaConcentracao).then(result => this.setState({ arrayLinhasDePesquisas: result }))
		this.setState({
			presidente: banca.presidente,
			membro_externo: banca.membro_externo,
			membro_interno: banca.membro_interno,
			titulo_teseOuDissertacao: banca.titulo_teseOuDissertacao,
			quant_pag: banca.quant_pag,
			status_ata: banca.status_ata,
			nome: banca.orientando,
			data_horaPrevistaAta: banca.data_horaPrevistaAta,
			id_statusAta: banca.id_statusAta,
			id_tipoBanca: banca.id_tipoBanca,
			tipo_banca: banca.tipo_banca,
			id_curso: banca.id_curso,
			idAreaConcentracao: banca.id_areaConcentracao,
			idLinhaPesquisa: banca.id_linhaPesquisa,
			id_orientando: banca.id_orientando,
			id_orientador: banca.id_orientador,
			orientador: banca.orientador,
			id_banca: banca.id,
			titulo_projeto: banca.titulo_projeto,
			pergunta_condutora: banca.pergunta_condutora,
			hipotese: banca.hipotese,
			fundamentacao_teorica: banca.fundamentacao_teorica,
			objetivo: banca.objetivo,
			metodo: banca.metodo,
			cronograma: banca.cronograma,
			conclusao_avaliacao: banca.conclusao_avaliacao,
			resumoQ1: banca.resumoQ1,
			resumoQ2: banca.resumoQ2,
			resumoQ3: banca.resumoQ3,
			resumoQ4: banca.resumoQ4,
			resumoQ5: banca.resumoQ5,
			resumoQ6: banca.resumoQ6,
			resumoQ7: banca.resumoQ7,
			resumoQ8: banca.resumoQ8,
			id_fichaAvaliacao: banca.id_fichaAvaliacao
		});
	}

	handlerCloseModalEditarFichaDeAvaliacao() {
		this.setModalShowEditarFichaDeAvaliacao(false);
		this.setState({ success: '', error: '' });
	};


	setModalShowVisualizarFolhaDeAprovacao(valor) {
		this.setState({ modalShowVisualizarFolhaDeAprovacao: valor });
	}

	handlerShowModalVisualizarFolhaDeAprovacao(banca) {
		console.log(banca);
		this.setModalShowVisualizarFolhaDeAprovacao(true);
		this.setState({
			nome: banca.orientando,
			id_curso: banca.id_curso,
			titulo: banca.titulo,
			dtFolhaAprovacaoFormatada: banca.dtFolhaAprovacao
		});
		this.listaDeMembrosDaBanca(banca.id);
	}

	handlerCloseModalVisualizarFolhaDeAprovacao() {
		this.setModalShowVisualizarFolhaDeAprovacao(false);
		this.setState({
			success: '', error: '', id_tipoBanca: '',
			tipo_banca: ''
		})
	};

	setModalShowVisualizarCertificadoDeAprovacao(valor) {
		this.setState({ modalShowVisualizarCertificadoDeAprovacao: valor });
	}

	handlerShowModalVisualizarCertificadoDeAprovacao(banca) {
		console.log(banca);
		this.listaDeMembrosDaBanca(banca.id);
		this.setModalShowVisualizarCertificadoDeAprovacao(true);
		this.setState({
			nome: banca.orientando,
			presidente: banca.orientador,
			membro_externo: banca.membro_externo,
			membro_interno: banca.membro_interno,
			assinatura_membroInterno: banca.assinatura_membroInterno,
			assinatura_presidente: banca.assinatura_presidente,
			assinatura_membroExterno: banca.assinatura_membroExterno,
			titulo: banca.titulo,
			orientador: banca.orientador
		});
	}

	handlerCloseModalVisualizarCertificadoDeAprovacao() {
		this.setModalShowVisualizarCertificadoDeAprovacao(false);
	};

	setModalShowCadastrarEAtualizarFolhaDeAprovacao(valor) {
		this.setState({ modalShowCadastrarEAtualizarFolhaDeAprovacao: valor });
	}

	handlerShowModalCadastrarEAtualizarFolhaDeAprovacao(banca) {
		this.setModalShowCadastrarEAtualizarFolhaDeAprovacao(true);

		if (banca.idFolhaDeAprovacao !== null) {
			this.setState({
				idFolhaDeAprovacao: banca.idFolhaDeAprovacao,
				id_banca: banca.id,
				titulo_teseOuDissertacao: banca.titulo_teseOuDissertacao,
				dataAprovacao: banca.dtFolhaAprovacao
			});
			return
		}

		this.setState({
			idFolhaDeAprovacao: 0,
			id_banca: banca.id,
			titulo_teseOuDissertacao: "",
			dataAprovacao: ""
		});
	}

	handlerCloseModalCadastrarEAtualizarFolhaDeAprovacao() {
		this.setModalShowCadastrarEAtualizarFolhaDeAprovacao(false);
		this.setState({
			success: '', error: '', id_tipoBanca: '',
			tipo_banca: ''
		})
	};

	setModalShowEmitirDeclaracaoDeOrientacao(valor) {
		this.setState({ modalShowEmitirDeclaracaoDeOrientacao: valor, success: '', error: '' });
	}

	handlerShowModalEmitirDeclaracaoDeOrientacao(banca) {
		this.setModalShowEmitirDeclaracaoDeOrientacao(true);

		if (banca.idDeclaracaoOrientacao !== null) {
			this.setState({
				idDeclaracaoOrientacao: banca.idDeclaracaoOrientacao,
				id_banca: banca.id
			});
			return
		}

		this.setState({
			idDeclaracaoOrientacao: 0,
			id_banca: banca.id
		});
	}

	handlerCloseModalEmitirDeclaracaoDeOrientacao() {
		this.setModalShowEmitirDeclaracaoDeOrientacao(false);
	};

	listaDeCursos = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/cursos`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token,
				},
			});

			const data = await response.json();
			console.log(data);
			if (data.status === 200) {
				this.setState({ array_cursos: data.resultados });
			}
		} catch (error) {
			console.log(error);
		}
	};

	excluirBanca = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });

		const { id_banca, id_tipoBanca, id_orientando } = this.state;

		try {
			const response = await fetch(
				`${api.baseURL}/bancas/${this.state.id_banca}`,
				{
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken(),
					},
					body: JSON.stringify({ id_banca, id_tipoBanca, id_orientando }),
				}
			);

			const data = await response.json();
			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeBancas(getToken(), 1);
				this.listaDeBancas(getToken(), 2);
				this.handlerCloseModalExcluirBanca();
			}
			//console.log(data);
		} catch (error) {
			//console.log(error);
		}
	}

	// atualizarBanca = async (e) => {
	// 	e.preventDefault();
	// 	this.setState({ success: '', error: '' });

	// 	const { id_banca, id_tipoBanca, id_orientando } = this.state;

	// 	try {
	// 		const response = await fetch(
	// 			`${api.baseURL}/bancas/${this.state.id_banca}`,
	// 			{
	// 				method: 'PUT',
	// 				headers: {
	// 					Accept: 'application/json',
	// 					'Content-Type': 'application/json',
	// 					'x-access-token': getToken(),
	// 				},
	// 				body: JSON.stringify({ id_tipoBanca, id_orientando }),
	// 			}
	// 		);

	// 		const data = await response.json();
	// 		if (data.status === 200) {
	// 			this.setState({ success: data.msg });
	// 			this.listaDeBancas(getToken(), 1);
	// 			this.listaDeBancas(getToken(), 2);
	// 			this.handlerCloseModalFinalizarBanca();
	// 		}

	// 		//console.log(data);
	// 	} catch (error) {
	// 		//console.log(error);
	// 	}
	// }

	cadastrarOrientando = async (e) => {
		e.preventDefault();

		try {
			let nome = this.state.nome;
			let email = this.state.email;
			let senha = this.state.senha;
			let confirmarSenha = this.state.confirmarSenha;
			let id_curso = parseInt(this.state.id_curso);
			let informacoes_adicionais = this.state.informacoes_adicionais;
			let fase_processo = this.state.fase_processo;
			let dataHoraInicialFaseProcesso = this.state.dataHoraInicialFaseProcesso;
			let dataHoraFinalFaseProcesso = this.state.dataHoraFinalFaseProcesso;
			let dataHoraConclusao = this.state.dataHoraConclusao;

			if (!nome || !email || !id_curso || !senha || !confirmarSenha || !informacoes_adicionais
				|| !fase_processo || !dataHoraInicialFaseProcesso || !dataHoraFinalFaseProcesso || !dataHoraConclusao) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			if (senha.localeCompare(confirmarSenha) === -1) {
				this.setState({ error: 'Por favor, informe senhas iguais!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/orientandos`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					nome,
					email,
					senha,
					id_curso,
					informacoes_adicionais,
					fase_processo,
					dataHoraInicialFaseProcesso,
					dataHoraFinalFaseProcesso,
					dataHoraConclusao
				}),
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeOrientandos(getToken(), this.context.user.id);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	atualizarOrientando = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			let id_usuario = this.state.id_usuario;
			let id_orientando = this.state.id_orientando;
			let nome = this.state.nome;
			let email = this.state.email;
			let senha = this.state.senha;
			let confirmarSenha = this.state.confirmarSenha;
			let id_curso = parseInt(this.state.id_curso);
			let informacoes_adicionais = this.state.informacoes_adicionais;
			let fase_processo = this.state.fase_processo;
			let dataHoraInicialFaseProcesso = this.state.dataHoraInicialFaseProcesso;
			let dataHoraFinalFaseProcesso = this.state.dataHoraFinalFaseProcesso;
			let dataHoraConclusao = this.state.dataHoraConclusao;

			if (!nome || !email || !id_curso || !senha || !confirmarSenha) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			if (senha.localeCompare(confirmarSenha) === -1) {
				this.setState({ error: 'Por favor, informe senhas iguais!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/orientandos/${id_orientando}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					id_usuario,
					nome,
					email,
					senha,
					id_curso,
					informacoes_adicionais,
					fase_processo,
					dataHoraInicialFaseProcesso,
					dataHoraFinalFaseProcesso,
					dataHoraConclusao
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeOrientandos(getToken(), this.context.user.id);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	cadastrarBanca = async (e) => {
		e.preventDefault();

		try {
			let id_orientando = parseInt(this.state.id_orientando);
			let id_tipoBanca = parseInt(this.state.id_tipoBanca);
			let data_horaPrevista = this.state.data_horaPrevista;
			let id_linhaPesquisa = parseInt(this.state.idLinhaPesquisa);
			let arraySelectedMembrosInternos = this.state.arraySelectedMembrosInternos;
			let arraySelectedMembrosExternos = this.state.arraySelectedMembrosExternos;
			let titulo = this.state.titulo;
			let title = this.state.title;
			let resumo = this.state.resumo;
			let palavra_chave = this.state.palavra_chave;

			if (!id_orientando || !id_tipoBanca || !id_linhaPesquisa || !data_horaPrevista
				|| arraySelectedMembrosInternos.length === 0 || arraySelectedMembrosExternos.length === 0) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/bancas`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					id_orientando,
					id_tipoBanca,
					id_linhaPesquisa,
					arraySelectedMembrosInternos,
					arraySelectedMembrosExternos,
					data_horaPrevista,
					titulo,
					title,
					resumo,
					palavra_chave
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg, error: "" });
				this.listaDeBancas(getToken(), 1);
				this.listaDeBancas(getToken(), 2);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	atualizarBanca = async (e) => {
		e.preventDefault();

		try {
			const { id_banca, id_orientador, id_orientando, id_tipoBanca, data_horaPrevista, idLinhaPesquisa,
				arraySelectedMembrosInternos, arraySelectedMembrosExternos,
				titulo, title, resumo, palavra_chave } = this.state;

			if (!id_orientando || !id_tipoBanca || !idLinhaPesquisa || !data_horaPrevista
				|| arraySelectedMembrosInternos.length === 0 || arraySelectedMembrosExternos.length === 0) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/bancas/${id_banca}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
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
					palavra_chave
				})
			});

			const data = await response.json();
			console.log(data)

			if (data.status === 200) {
				this.setState({ success: data.msg, error: "" });
				this.listaDeBancas(getToken(), 1);
				this.listaDeBancas(getToken(), 2);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeOrientandos = async (token, idOrientador, nome = "", idLinhaPesquisa = 0, idFaseProcesso = 0) => {
		try {
			const response = await fetch(
				`${api.baseURL}/orientadores/${idOrientador}/orientandos?nome=${nome}&idLinhaPesquisa=${idLinhaPesquisa}&idFaseProcesso=${idFaseProcesso}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': token,
					},
				}
			);

			const data = await response.json();
			if (data.status === 200) {
				if (data.resultados.length > 0) {
					this.setState({ array_orientandos: data.resultados });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	listaDeTiposDeBanca = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/tipo_banca`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': token,
					},
				}
			);

			const data = await response.json();
			if (data.status === 200) {
				if (data.resultados.length > 0) {
					this.setState({ array_tiposBanca: data.resultados });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	listaDeBancas = async (token, id_tipoBanca) => {
		try {
			const response = await fetch(`${api.baseURL}/orientadores/${token}/bancas?tipo_banca=${id_tipoBanca}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': token
					}
				}
			);

			const data = await response.json();
			console.log(data)
			if (data.status === 200) {
				if (data.resultados.length > 0) {
					parseInt(data.id_tipoBanca) === 1 ? this.setState({ array_bancasQ: data.resultados }) :
						this.setState({ array_bancasD: data.resultados });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	cadastrarATA = async (e) => {
		e.preventDefault();

		try {
			const { id_banca, status_ata } = this.state;

			if (!status_ata) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/ata`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					id_banca,
					status: status_ata
				})
			});

			const data = await response.json();
			console.log(data)

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeBancas(getToken(), 1);
				this.listaDeBancas(getToken(), 2);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	atualizarATA = async (e) => {
		e.preventDefault();
		try {
			const { id_banca, id_ata, id_statusAta } = this.state;

			if (!id_statusAta) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/ata/${id_ata}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					id_banca,
					status: id_statusAta
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeBancas(getToken(), 1);
				this.listaDeBancas(getToken(), 2);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	cadastrarFichaDeAvaliacao = async (e) => {
		e.preventDefault();
		this.setState({ success: "", error: "" })

		try {
			const { titulo_projeto: titulo_projeto, pergunta_condutora,
				hipotese, fundamentacao_teorica,
				objetivo, metodo, cronograma,
				conclusao_avaliacao, resumoQ1,
				resumoQ2, resumoQ3, resumoQ4,
				resumoQ5, resumoQ6, resumoQ7, resumoQ8, id_banca } = this.state;

			if (!titulo_projeto || !pergunta_condutora, !hipotese || !fundamentacao_teorica ||
				!objetivo || !metodo || !cronograma || !conclusao_avaliacao) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/ficha_avaliacao`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					titulo_projeto, pergunta_condutora, hipotese,
					fundamentacao_teorica, objetivo, metodo,
					cronograma, conclusao_avaliacao, resumoQ1,
					resumoQ2, resumoQ3, resumoQ4, resumoQ5,
					resumoQ6, resumoQ7, resumoQ8, id_banca
				}),
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeBancas(getToken(), 1);
				this.listaDeBancas(getToken(), 2);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	uuid = () => {
		return Date.now().toString().substring(16, 20) + Math.random().toString().substring(10);
	}

	cadastrarDeclaracaoDeParticipacao = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { id_usuario, id_banca } = this.state;

			if (!id_usuario) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const codigo_validacao = this.uuid();

			const response = await fetch(`${api.baseURL}/declaracao_participacao`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					id_usuario, codigo_validacao, id_banca
				}),
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeDeclaracoesDeParticipacao(this.state.id_banca);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeDeclaracoesDeParticipacao = async (id_banca) => {
		try {
			const response = await fetch(`${api.baseURL}/bancas/${id_banca}/declaracoes_participacao`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				}
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ array_declaracoes: data.resultados })
			}
		} catch (error) {
			return error;
		}
	};

	listaDeMembrosDaBanca = async (id_banca) => {
		try {
			const response = await fetch(`${api.baseURL}/bancas/${id_banca}/membros`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				}
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ arrayMembrosDaDeclaracaoDeParticipacao: data.resultados, arrayMembrosDaAtaDeDefesa: data.resultados });
				const { arraySelectedMembrosInternos, arraySelectedMembrosExternos } = this.state;

				data.resultados.map(membro => {
					if (membro.id_tipo == 2) {
						arraySelectedMembrosInternos.push({ value: membro.id, label: membro.nome });
					}

					if (membro.id_tipo == 3) {
						arraySelectedMembrosExternos.push({ value: membro.id, label: membro.nome });
					}
				});
			}
		} catch (error) {
			return error;
		}
	};

	atualizarFichaDeAvaliacao = async (e) => {
		e.preventDefault();

		try {
			const { titulo_projeto, pergunta_condutora,
				hipotese, fundamentacao_teorica,
				objetivo, metodo, cronograma,
				conclusao_avaliacao, resumoQ1,
				resumoQ2, resumoQ3, resumoQ4,
				resumoQ5, resumoQ6, resumoQ7, resumoQ8, id_fichaAvaliacao } = this.state;

			if (!titulo_projeto || !pergunta_condutora, !hipotese || !fundamentacao_teorica ||
				!objetivo || !metodo || !cronograma || !conclusao_avaliacao) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/ficha_avaliacao/${id_fichaAvaliacao}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					titulo_projeto, pergunta_condutora, hipotese,
					fundamentacao_teorica, objetivo, metodo,
					cronograma, conclusao_avaliacao, resumoQ1,
					resumoQ2, resumoQ3, resumoQ4, resumoQ5,
					resumoQ6, resumoQ7, resumoQ8
				}),
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeBancas(getToken(), 1);
				this.listaDeBancas(getToken(), 2);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	cadastrarOuAtualizarOrientacao = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { id_orientacao, link, id_orientando, observacao, data_horaPrevista, nomeArquivo } = this.state;

			if (!link || !data_horaPrevista) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			let method = id_orientacao === 0 ? 'POST' : 'PUT';
			let url = id_orientacao === 0 ? 'orientacao' : `orientacao/${id_orientacao}`;
			let headers = { Accept: 'application/json', 'Content-Type': 'application/json', 'x-access-token': getToken() };
			let body = JSON.stringify({
				link, id_orientando, observacao, data_horaPrevista, nomeArquivo, anexo: JSON.parse(localStorage.getItem('@link')) ? JSON.parse(localStorage.getItem('@link')) : ""
			});

			const response = await fetch(`${api.baseURL}/${url}`, {
				method,
				headers,
				body
			});

			const data = await response.json();
			console.log(data);

			if (data.status === 200) {
				localStorage.removeItem("@link");
				this.setState({ success: data.msg });
				this.listaDeOrientacao(getToken(), this.state.id_usuario);
				if (id_orientacao !== 0) {
					listaDeAnexos(getToken(), id_orientacao).then(result => this.setState({ arrayAnexosDaOrientacao: result.resultadosAnexosDaOrientacao }));
				}
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}


	listaDeOrientacao = async (token, id_orientando) => {
		try {
			const response = await fetch(`${api.baseURL}/orientandos/${id_orientando}/orientacao`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				}
			});

			const data = await response.json();
			console.log(data);
			if (data.status === 200) {
				this.setState({ arrayOrientacao: data.resultados })
			}
		} catch (error) {
			return error;
		}
	};

	buscaInformacoesDoOrientador = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/orientadores/${token}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': token
					}
				}
			);

			const data = await response.json();
			console.log(data)
			if (data.status === 200) {
				this.setState({ idAreaConcentracao: data.resultados[0].id_areaConcentracao });
				listaDeLinhasDePesquisas(data.resultados[0].id_areaConcentracao)
					.then(result => this.setState({ arrayLinhasDePesquisas: result }));
			}
		} catch (error) {
			console.log(error);
		}
	};

	onChangeFileInput = (e) => {
		uploadFile(e, `enber/bancas/anexos do orientando/`);
	}

	// listaDeAnexos = async (id_orientacao) => {
	// 	try {
	// 		const response = await fetch(`${api.baseURL}/orientacao/${id_orientacao}/anexos`,
	// 			{
	// 				method: 'GET',
	// 				headers: {
	// 					Accept: 'application/json',
	// 					'Content-Type': 'application/json',
	// 					'x-access-token': getToken()
	// 				}
	// 			}
	// 		);

	// 		const data = await response.json();
	// 		console.log(data);
	// 		if (data.status === 200) {
	// 			this.setState({ arrayAnexosDaOrientacao: data.resultados });
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	cadastrarEatualizarFolhaDeAprovacao = async (e) => {
		e.preventDefault();
		this.setState({ success: "", Error: "" });

		try {
			const { id_banca, dataAprovacao, idFolhaDeAprovacao } = this.state;

			if (!dataAprovacao) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const url = idFolhaDeAprovacao === 0 ? `${api.baseURL}/folha_aprovacao` : `${api.baseURL}/folha_aprovacao/${idFolhaDeAprovacao}`;
			console.log(url);
			const response = await fetch(url, {
				method: idFolhaDeAprovacao === 0 ? 'POST' : 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify(idFolhaDeAprovacao === 0 ? {
					id_banca,
					dataAprovacao
				} : {
					dataAprovacao
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeBancas(getToken(), 1);
				this.listaDeBancas(getToken(), 2);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	cadastrarEatualizarDeclaracaoDeOrientacao = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { idDeclaracaoDeOrientacao, dataDeOrientacao, id_banca } = this.state;

			if (!dataDeOrientacao) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const codigo_validacao = this.uuid();

			const url = idDeclaracaoDeOrientacao === 0 ? `${api.baseURL}/declaracao_orientacao` : `${api.baseURL}/declaracao_orientacao/${idDeclaracaoDeOrientacao}`;

			const response = await fetch(url, {
				method: idDeclaracaoDeOrientacao === 0 ? 'POST' : 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: idDeclaracaoDeOrientacao === 0 ? JSON.stringify({
					dataDeOrientacao, codigo_validacao, id_banca
				}) : JSON.stringify({
					idDeclaracaoDeOrientacao, dataDeOrientacao, codigo_validacao, id_banca
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeDeclaracoesDeParticipacao(this.state.id_banca);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const orientandos = this.state.array_orientandos;
		const tiposDeBanca = this.state.array_tiposBanca;
		const bancasQ = this.state.array_bancasQ;
		const bancasD = this.state.array_bancasD;
		const listaDeStatus = this.state.array_status;
		const areas_concentracao = this.state.arrayAreaConcentracao;
		const linhasDePesquisas = this.state.arrayLinhasDePesquisas;
		const arrayOrientacao = this.state.arrayOrientacao;
		const arrayMembrosDaDeclaracaoDeParticipacao = this.state.arrayMembrosDaDeclaracaoDeParticipacao;
		const array_declaracoes = this.state.array_declaracoes;
		const arrayAnexosDaOrientacao = this.state.arrayAnexosDaOrientacao;
		const arrayAnexosDoOrientando = this.state.arrayAnexosDoOrientando;
		const arrayMembrosExternos = this.state.arrayMembrosExternos;
		const arrayMembrosInternos = this.state.arrayMembrosInternos;

		return (
			<Container fluid style={{
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
								<div className="row d-flex justify-content-center text-center" style={{ marginBottom: "10px" }}>
									<div className="col-sm-3 mb-2">
										<FaUserGraduate style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
										<h5 style={{ fontSize: "12pt" }}>Total de Orientandos Registrados</h5>
										<h6>{orientandos.length}</h6>
									</div>

									<div className="col-sm-3 mb-2">
										<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
										<h5 style={{ fontSize: "12pt" }}>Total de Bancas de Qualificação</h5>
										<h6>{bancasQ.length}</h6>
									</div>

									<div className="col-sm-3 mb-2">
										<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
										<h5 style={{ fontSize: "12pt" }}>Total de Bancas de Defesa</h5>
										<h6>{bancasD.length}</h6>
									</div>
								</div>

								<Tabs
									variant="pills"
									defaultActiveKey="bancas"
									transition={false}
									id="panel-admin"
									className="justify-content-center">

									<Tab
										eventKey="orientandos"
										title="Orientandos"
									>
										<div className='container'>
											<div className='row d-flex align-items-center text-light'>
												<div className='col'>
													<div className="form-group">
														<label htmlFor="nome">Nome</label>
														<input
															type="text"
															className="form-control form-control-sm"
															id="nome"
															placeholder="Digite o nome completo do orientando"
															autoComplete='off'
															onChange={(e) => {
																this.setState({ nome: e.target.value });
																this.listaDeOrientandos(getToken(), this.context.user.id, e.target.value)
															}}
														/>
													</div>
												</div>

												<div class="col">
													<div className="form-group">
														<label>Linha de pesquisa:</label>
														<select class="form-control form-control-sm" id="selectLinhaPesquisa" value={this.state.idLinhaPesquisa}
															onChange={e => {
																this.setState({ idLinhaPesquisa: e.target.value })
																this.listaDeOrientandos(getToken(), this.context.user.id, "", e.target.value, 0)
															}}>
															<option value="0">Selecione</option>
															{linhasDePesquisas.length > 0 ?
																linhasDePesquisas.map(linha => (
																	<option key={linha.id} value={linha.id}>{linha.linha_pesquisa}</option>
																))
																: (<option>0</option>)
															}
														</select>
													</div>
												</div>

												<div className='col'>
													<div className="form-group">
														<label>Fase do processo:</label>
														<select class="form-control form-control-sm" id="selectFaseProcesso"
															value={this.state.fase_processo}
															onChange={e => {
																this.setState({ fase_processo: e.target.value })
																this.listaDeOrientandos(getToken(), this.context.user.id, "", 0, e.target.value)
															}}>
															<option value="0">Selecione</option>
															{tiposDeBanca.length > 0 ?
																tiposDeBanca.map(tipo => (
																	<option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
																))
																: (<option key={0} value="0">Nenhum resultado encontrado</option>)}
														</select>
													</div>
												</div>
											</div>

											<div className="table-responsive table-sm text-center">
												<div class="table-wrapper">
													<table className="table table-bordered table-striped table-hover bg-white">
														<thead className="thead-light">
															<tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																<th scope="col" className="sticky-col">Nome</th>
																<th>Curso</th>
																<th>Linha de pesquisa</th>
																<th>Fase do processo</th>
																<th>Data/hora inicial do processo</th>
																<th>Data/hora final do processo</th>
																<th>Data/hora de conclusão</th>
																<th>Ações</th>
															</tr>
														</thead>
														<tbody>
															{orientandos.length > 0 ? (
																orientandos.map(orientando => (
																	<tr key={orientando.id} className={orientando.status_confirmacaoBancaD === 7 ? `table-success` : ``} title="Clique aqui para obter mais informações sobre o orientando">
																		<td >{orientando.nome.length > 0 ? orientando.nome.toLocaleUpperCase() : ""}</td>

																		<td>{orientando.curso}</td>
																		<td>{orientando.linha_pesquisa}</td>
																		<td>{orientando.fase_processo}</td>
																		<td>{orientando.dataHoraInicialFaseProcessoTb}</td>
																		<td>{orientando.dataHoraFinalFaseProcessoTb}</td>
																		<td>{orientando.dataHoraConclusaoTb}</td>
																		<td><button className='button' onClick={() => this.handlerShowModalEditarOrientando(orientando)}><FaRegEdit /> Atualizar </button></td>
																	</tr>
																))
															) : (<tr className="text-center">
																<td colSpan="10">
																	Nenhum resultado encontrado
																</td>
															</tr>)}
														</tbody>
													</table>
												</div>
											</div>
											{
												<div className="text-center text-white font-weight-bold mt-3 mb-5">
													Total de Registros: {orientandos.length}
												</div>
											}
										</div>
									</Tab>

									<Tab
										eventKey="bancas"
										title="Bancas">
										<Container style={{ backgroundColor: "#F8F9FA" }}>
											<div className='row d-flex justify-content-center'>
												<div className='col-sm-6'>
													<h4 className='text-center lead font-weight-bold'><FaPencilAlt /> Qualificação</h4>
													<Container style={{ maxHeight: "400px", overflowY: 'scroll', textAlign: 'center' }}>
														<Accordion>
															{Array.isArray(bancasQ) && bancasQ.length > 0 ? (
																bancasQ.map(banca => (
																	<Accordion key={banca.id} defaultActiveKey="0" flush style={{ backgroundColor: banca.status_confirmacaoBancaD === "FINALIZADA" ? "#00ff87" : "" }}>
																		<Accordion.Item eventKey={banca.id} style={{ backgroundColor: '#ffffff', marginBottom: '5px' }}>
																			<Accordion.Header>
																				<h5><FaLayerGroup /> {banca.orientando ? banca.orientando.toLocaleUpperCase() : ""} - {banca.status_confirmacaoBancaD}</h5>
																				<h6 className="list-group-item">Curso: {banca.curso}</h6>
																				<h6 className="list-group-item">Data e hora prevista: {banca.dataHoraPrevistaFormatada}</h6>
																			</Accordion.Header>
																			<Accordion.Body style={{ overflowY: "scroll", height: "350px" }}>
																				<div className='d-flex flex-column'>
																					<button className='button' onClick={() => this.handlerShowModalAtualizarBanca(banca)}><FaRegPlusSquare /> Atualizar banca </button>
																					{banca.status_confirmacaoBancaQ === "CONFIRMADO" || banca.status_confirmacaoBancaQ === "FINALIZADA" ? (
																						<button className='button mt-2' onClick={() => this.handlerShowModalEmitirDeclaracao(banca)}>Declaração de participação</button>
																					) : null}
																					{(banca.status_confirmacaoBancaQ === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata === null ? (
																						<button className='button mt-2' onClick={() => this.handlerShowModalEmitirAta(banca)}>Emitir ATA</button>
																					) : null}
																					{/* ... outros botões ... */}
																				</div>
																			</Accordion.Body>
																		</Accordion.Item>
																	</Accordion>
																))
															) : (
																<Spinner animation="border" role="status">
																	<span className="visually-hidden">Carregando...</span>
																</Spinner>
															)}
														</Accordion>

													</Container>
												</div>
												<div className='col-sm-6'>
													<h4 className='text-center lead font-weight-bold'><FaShieldAlt /> Defesa</h4>
													<Container style={{ maxHeight: "400px", overflowY: 'scroll', textAlign: 'center' }}>
														<Accordion>
															{bancasD?.length > 0 ?
																bancasD.map(banca => (
																	<Accordion key={banca.id} defaultActiveKey="0" flush style={{ backgroundColor: banca.status_confirmacaoBancaD === "FINALIZADA" ? "#00ff87" : "" }}>
																		<Accordion.Item eventKey={banca.id} style={{ backgroundColor: '#fffffff', marginBottom: '5px' }}>
																			<Accordion.Header>
																				<h5><FaLayerGroup /> {
																					banca.orientando ? banca.orientando.toLocaleUpperCase() : ""} - {banca.status_confirmacaoBancaD}</h5>
																				<h6 className="list-group-item">Curso: {banca.curso}</h6>
																				<h6 className="list-group-item">Data e hora prevista: {banca.dataHoraPrevistaFormatada}</h6>																			</Accordion.Header>
																			<Accordion.Body style={{ overflowY: "scroll", height: "350px" }}>
																				<div className='d-flex flex-column'>
																					<button className='button' onClick={() => this.handlerShowModalAtualizarBanca(banca)}><FaRegPlusSquare /> Atualizar banca </button>
																					<button className='button mt-2' onClick={() => this.handlerShowModalEmitirDeclaracaoDeOrientacao(banca)}>Emitir declaração de orientação</button>
																					<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarDeclaracaoDeOrientacao({ ...banca, documentoEmIngles: false })}>Declaração de orientação</button>
																					<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarDeclaracaoDeOrientacao({ ...banca, documentoEmIngles: true })}>Guidance statement</button>
																					{banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA" ? (<button className='button mt-2' onClick={() => this.handlerShowModalEmitirDeclaracao(banca)}>Declaração de participação</button>) : ""}
																					{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata === null ? (<button className='button mt-2' onClick={() => this.handlerShowModalEmitirAta(banca)}>Emitir ATA</button>) : ""}
																					{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata !== null ? (<button className='button mt-2' onClick={() => this.handlerShowModalAtualizarAta(banca)}>Atualizar ATA</button>) : ""}
																					{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata !== null ? (<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarAta(banca)}>ATA</button>) : ""}
																					{banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.id_fichaAvaliacao === null ? (<button className='button mt-2' onClick={() => this.handlerShowModalEmitirFichaDeAvaliacao(banca)}>Emitir ficha de avaliação</button>) : ""}
																					{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata !== null && banca.id_fichaAvaliacao !== null ? (<button className='button mt-2' onClick={() => this.handlerShowModalEditarFichaDeAvaliacao(banca)}>Atualizar ficha de avaliação</button>) : ""}
																					{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata !== null && banca.id_fichaAvaliacao !== null ? (<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarFichaDeAvaliacao(banca)}>Visualizar ficha de avaliação</button>) : ""}
																					{banca.status_confirmacaoBancaD === "FINALIZADA" ? (<button className='button mt-2' onClick={() => this.handlerShowModalCadastrarEAtualizarFolhaDeAprovacao(banca)}>Emitir folha de aprovação</button>) : ""}
																					{banca.status_confirmacaoBancaD === "FINALIZADA" ? (<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarFolhaDeAprovacao(banca)}>Folha de aprovação</button>) : ""}
																					{banca.status_confirmacaoBancaD === "FINALIZADA" ? (<button className='button mt-2' onClick={() => this.handlerShowModalVisualizarCertificadoDeAprovacao(banca)}>Certificado de aprovação</button>) : ""}
																					<button className='button mt-2' onClick={() => this.handlerShowModalExcluirBanca(banca)}>Excluir</button>
																					{banca.status_confirmacaoBancaD === "CONFIRMADO" ? (<button className='button mt-2' onClick={() => this.handlerShowModalFinalizarBanca(banca)}>Finalizar</button>) : ""}
																				</div>
																			</Accordion.Body>
																		</Accordion.Item>

																	</Accordion>

																))
																: (
																	<Spinner animation="border" role="status">
																		<span className="visually-hidden"></span>
																	</Spinner>
																)}
														</Accordion>
													</Container>
												</div>
											</div>
										</Container>
									</Tab>
								</Tabs>

							</div >
							{/* /.content */}
							< br />


							<Modal
								show={this.state.modalShowCadastrarBanca}
								onHide={() => this.handlerCloseModalCadastrarBanca()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='xl'
								centered>
								<Form onSubmit={this.cadastrarBanca}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaLayerGroup /> Registrar uma nova banca</h4>
									</Modal.Header>
									<Modal.Body >
										<div className='row' style={{ maxHeight: "380px", overflowY: "scroll" }}>
											<div className='col-sm-6'>
												<div class="form-group">
													<label>Orientando:*</label>
													<select class="form-control form-control-sm" id="selectOrientando"
														value={this.state.id_orientando}
														onChange={e => this.setState({ id_orientando: e.target.value })}>
														<option value="0">Selecione</option>
														{orientandos.length > 0 ?
															orientandos.map(orientando => (
																<option key={orientando.id} value={orientando.id}>{orientando.nome.toUpperCase()}</option>
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div className="form-group">
													<label>Tipo da banca:*</label>
													<select class="form-control form-control-sm" id="selectOrientando"
														value={this.state.id_tipoBanca}
														onChange={e => this.setState({ id_tipoBanca: e.target.value })}>
														<option value="0">Selecione</option>
														{tiposDeBanca.length > 0 ?
															tiposDeBanca.map(tipo =>
																parseInt(tipo.id) < 3 ? (
																	<option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
																) : ""
															)
															: (<option value="0">Nenhum resultado encontrado</option>)}
													</select>
												</div>

												<div className="form-group">
													<label>Área de concentração:* </label>
													<select className="form-control form-control-sm" id="selectAreaConcentracao"
														value={this.state.idAreaConcentracao}>
														{areas_concentracao.length > 0 ?
															areas_concentracao.map(area => (
																area.id === this.state.idAreaConcentracao && (<option key={area.id} value={area.id}>{area.nome}</option>)
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div className="form-group">
													<label>Linha de pesquisa:*</label>
													<select class="form-control form-control-sm" id="selectLinhaPesquisa" value={this.state.idLinhaPesquisa}
														onChange={e => this.setState({ idLinhaPesquisa: e.target.value })}>
														<option value="0">Selecione</option>
														{linhasDePesquisas.length > 0 ?
															linhasDePesquisas.map(linha => (
																<option key={linha.id} value={linha.id}>{linha.linha_pesquisa}</option>
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div className="form-group">
													<label for="dataHoraPrevista">Data e hora prevista:</label>
													<input class="form-control form-control-sm" type="datetime-local" id="dataHoraPrevista" name="start"
														min="2022-01"
														onChange={e => this.setState({ data_horaPrevista: e.target.value })}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="selectSetoresParticipantes">Membros internos:*</label>
													<Select
														closeMenuOnSelect={false}
														isMulti
														options={this.state.arrayMembrosInternos}
														onChange={(e) => this.setState({ arraySelectedMembrosInternos: e })}
													/>
												</div>
											</div>
											<div className='col-sm-6'>
												<div className="form-group">
													<label htmlFor="selectSetoresParticipantes">Membros externos:*</label>
													<Select
														closeMenuOnSelect={false}
														isMulti
														options={this.state.arrayMembrosExternos}
														onChange={(e) => this.setState({ arraySelectedMembrosExternos: e })}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="nome">Membro externo:*</label>
													<select class="form-control form-control-sm" id="selectOrientador"
														onChange={e => this.setState({ id_membroExterno: e.target.value })}>
														<option value="0">Selecione</option>
														{arrayMembrosExternos.length > 0 ?
															arrayMembrosExternos.map(membro => (
																<option value={membro.id_usuario}>{membro.nome}</option>
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div class="form-group">
													<label for="exampleFormControlTextarea1">Titulo:</label>
													<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ titulo: e.target.value })
														}
													></textarea>
												</div>

												<div class="form-group">
													<label for="exampleFormControlTextarea1">Titulo em inglês:</label>
													<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ title: e.target.value })
														}
													></textarea>
												</div>

												<div class="form-group">
													<label for="exampleFormControlTextarea1">Resumo:</label>
													<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ resumo: e.target.value })
														}
													></textarea>
												</div>

												<div class="form-group">
													<label for="exampleFormControlTextarea1">Palavra chave:</label>
													<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ palavra_chave: e.target.value })
														}
													></textarea>
												</div>
											</div>
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
									</Modal.Body>

								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowCadastrarOrientando}
								onHide={() => this.handlerCloseModalCadastrarOrientando()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered
							>
								<Form onSubmit={this.cadastrarOrientando}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaUserGraduate /> Cadastrar um novo orientando</h4>
									</Modal.Header>
									<Modal.Body>
										<p className='text-danger'>As informações cadastrais serão utilizadas pelo aluno para acessar a plataforma.</p>
										<div className='row'>
											<div className='col-sm-6'>
												<div className="form-group">
													<label htmlFor="nome">Nome</label>
													<input
														type="text"
														className="form-control"
														id="nome"
														placeholder="Digite seu nome completo"
														onChange={(e) =>
															this.setState({ nome: e.target.value })
														}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="email">Email</label>
													<input
														type="email"
														className="form-control"
														id="email"
														placeholder="Informe o seu email"
														onChange={(e) =>
															this.setState({ email: e.target.value })
														}
													/>
												</div>

												<div class="form-group">
													<label>Curso:*</label>
													<select class="form-control" id="selectCurso"
														value={this.state.id_curso}
														onChange={e => this.setState({ id_curso: e.target.value })}>
														<option value="0">Selecione</option>
														{this.state.array_cursos.length > 0 ?
															this.state.array_cursos.map(curso => (
																<option key={curso.id} value={curso.id}>{curso.nome}</option>
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div className="row" style={{ marginBottom: 20 }}>
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="senha">Senha</label>
															<input
																type="password"
																className="form-control"
																id="senha"
																placeholder="Informe sua senha"
																onChange={(e) =>
																	this.setState({ senha: e.target.value })
																}
															/>
														</div>
													</div>

													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="repetir_senha">Repetir Senha</label>
															<input
																type="password"
																className="form-control"
																id="repetir_senha"
																placeholder="Informe sua senha novamente"
																onChange={(e) =>
																	this.setState({ confirmarSenha: e.target.value })
																}
															/>
														</div>
													</div>
												</div>

												<div className="form-group">
													<label>Fase do processo:*</label>
													<select class="form-control" id="selectFaseProcesso"
														value={this.state.fase_processo}
														onChange={e => this.setState({ fase_processo: e.target.value })}>
														<option value="0">Selecione</option>
														{tiposDeBanca.length > 0 ?
															tiposDeBanca.map(tipo => (
																<option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
															))
															: (<option value="0">Nenhum resultado encontrado</option>)}
													</select>
												</div>
											</div>

											<div className='col-sm-6'>
												<div class="form-group">
													<label for="exampleFormControlTextarea1">Informações adicionais</label>
													<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ informacoes_adicionais: e.target.value })
														}
													></textarea>
												</div>


												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora inicial do processo:</label>
													<input class="form-control" type="datetime-local" id="dataHoraInicialFaseProcesso" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraInicialFaseProcesso: e.target.value })}
													/>
												</div>

												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora final do processo:</label>
													<input class="form-control" type="datetime-local" id="dataHoraFinalFaseProcesso" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraFinalFaseProcesso: e.target.value })}
													/>
												</div>

												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora de conclusão:</label>
													<input class="form-control" type="datetime-local" id="dataHoraConclusao" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraConclusao: e.target.value })}
													/>
												</div>
											</div>
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
									</Modal.Body>

									<Modal.Footer>
										<button className='button'><FaRegSave /> Salvar</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowEditarOrientando}
								onHide={() => this.handlerCloseModalEditarOrientando()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> Atualizar as informações do orientando - {this.state.nome}</h4>
								</Modal.Header>
								<Modal.Body>
									<p className='text-danger'>As informações cadastrais serão utilizadas pelo aluno para acessar a plataforma.</p>

									<Form onSubmit={this.atualizarOrientando}>

										<div className='row'>
											<div className='col-sm-6'>
												<div className="form-group">
													<label htmlFor="nome">Nome</label>
													<input
														type="text"
														className="form-control form-control-sm"
														id="nome"
														placeholder="Digite seu nome completo"
														onChange={(e) =>
															this.setState({ nome: e.target.value })
														}
														value={this.state.nome}
													/>
												</div>
											</div>
											<div className='col-sm-6'>
												<div className="form-group">
													<label htmlFor="email">Email</label>
													<input
														type="email"
														className="form-control form-control-sm"
														id="email"
														placeholder="Informe o seu email"
														onChange={(e) =>
															this.setState({ email: e.target.value })
														}
														value={this.state.email}
													/>
												</div>
											</div>
										</div>

										<div className='row'>
											<div className='col-sm-6'>
												<div class="form-group">
													<label>Curso:*</label>
													<select class="form-control form-control-sm" id="selectCurso"
														value={this.state.id_curso}
														onChange={e => this.setState({ id_curso: e.target.value })}>
														<option value="0">Selecione</option>
														{this.state.array_cursos.length > 0 ?
															this.state.array_cursos.map(curso => (
																this.state.idAreaConcentracao === curso.id_areaConcentracao ? (
																	<option key={curso.id} value={curso.id}>{curso.nome}</option>
																) : ("")

															))
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>
											<div className='col-sm-6'>
												<div className="form-group">
													<label>Fase do processo:*</label>
													<select class="form-control form-control-sm" id="selectFaseProcesso"
														value={this.state.fase_processo}
														onChange={e => this.setState({ fase_processo: e.target.value })}>
														<option value="0">Selecione</option>
														{tiposDeBanca.length > 0 ?
															tiposDeBanca.map(tipo => (
																<option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
															))
															: (<option value="0">Nenhum resultado encontrado</option>)}
													</select>
												</div>

											</div>
										</div>

										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor="senha">Senha</label>
													<input
														type="password"
														className="form-control form-control-sm"
														id="senha"
														placeholder="Informe sua senha"
														onChange={(e) =>
															this.setState({ senha: e.target.value })
														}
														value={this.state.senha}
													/>
												</div>
											</div>

											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor="repetir_senha">Repetir Senha</label>
													<input
														type="password"
														className="form-control form-control-sm"
														id="repetir_senha"
														placeholder="Informe sua senha novamente"
														onChange={(e) =>
															this.setState({ confirmarSenha: e.target.value })
														}
														value={this.state.confirmarSenha}
													/>
												</div>
											</div>
										</div>


										<div class="form-group">
											<label for="exampleFormControlTextarea1">Informações adicionais</label>
											<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
												onChange={(e) =>
													this.setState({ informacoes_adicionais: e.target.value })
												}
												value={this.state.informacoes_adicionais}
											></textarea>
										</div>

										<div className='row'>
											<div className='col-sm-4'>
												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora inicial do processo:</label>
													<input class="form-control form-control-sm" type="datetime-local" id="dataHoraInicialFaseProcesso" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraInicialFaseProcesso: e.target.value })}
														value={this.state.dataHoraInicialFaseProcesso}

													/>
												</div>
											</div>
											<div className='col-sm-4'>
												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora final do processo:</label>
													<input class="form-control form-control-sm" type="datetime-local" id="dataHoraFinalFaseProcesso" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraFinalFaseProcesso: e.target.value })}
														value={this.state.dataHoraFinalFaseProcesso}

													/>
												</div>
											</div>

											<div className='col-sm-4'>
												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora de conclusão:</label>
													<input class="form-control form-control-sm" type="datetime-local" id="dataHoraConclusao" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraConclusao: e.target.value })}
														value={this.state.dataHoraConclusao}

													/>
												</div>
											</div>
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
										<div className='float-right'>
											<button className='button'><FaRegSave /> Salvar</button>
										</div>
									</Form>

									<hr />

									<div className='row'>
										<div className='col-sm-10'>
											<h3><FaUserGraduate /> Orientações</h3>
										</div>
										<div className='col-sm-2'>

										</div>
									</div>

									<hr />
									<div className="table-responsive table-sm text-center">
										<div class="table-wrapper">
											<table className="table table-bordered table-striped table-hover bg-white text-center">
												<thead className="thead-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
													<tr>
														<th>N° da orientação</th>
														<th scope="col">Link</th>
														<th>Orientando</th>
														<th>Observacao</th>
														<th>Data/hora prevista</th>
														<th>Ações</th>
													</tr>
												</thead>
												<tbody>
													{arrayOrientacao.length > 0 ? (
														arrayOrientacao.map(orientacao => (
															<tr key={orientacao.id} title="Clique aqui para obter mais informações sobre a orientação">
																<td>{orientacao.id}</td>
																<td>{orientacao.link !== 0 ? (<a href={orientacao.link}>Link da orientação</a>) : "Nenhum link anexado"}</td>
																<td>{orientacao.orientando}</td>
																<td>{orientacao.observacao}</td>
																<td>{orientacao.dataHoraPrevistaTb}</td>
																<td><button className='btn btn-sm btn-outline-primary' onClick={() => this.handlerShowModalCadastrarEAtualizarOrientacao(orientacao)}><FaRegEdit /> Atualizar </button></td>
															</tr>
														))
													) : (<tr className="text-center">
														<td colSpan="10">
															Nenhum resultado encontrado
														</td>
													</tr>)}
												</tbody>
											</table>
										</div>
									</div>
									{
										<div className="text-center font-weight-bold mt-3 mb-5">
											Total de Registros: {arrayOrientacao.length}
										</div>
									}

								</Modal.Body>

								<Modal.Footer>

								</Modal.Footer>

							</Modal >

							<Modal
								show={this.state.modalShowExcluirBanca}
								onHide={() => this.handlerCloseModalExcluirBanca()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='sm'
								centered
							>
								<Form onSubmit={this.excluirBanca}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaCalendarWeek /> Excluir banca</h4>
									</Modal.Header>
									<Modal.Body className='text-center'>
										<p>Confirmar a exclusão da banca de {this.state.tipo_banca} do orientando {this.state.nome}</p>
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
								show={this.state.modalShowEmitirAta}
								onHide={() => this.handlerCloseModalEmitirAta()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered
							>
								<Form onSubmit={this.cadastrarATA}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaUserGraduate /> Emitir ata de {this.state.tipo_banca.toLocaleLowerCase()}</h4>
									</Modal.Header>
									<Modal.Body>
										<div class="form-group">
											<label for="selectStatusBanca">Status:</label>
											<select class="form-control form-control-sm" id="selectStatusAta"
												value={this.state.status_ata}
												onChange={e => this.setState({ status_ata: e.target.value })}>
												<option value="0">Selecionar</option>
												{listaDeStatus.length > 0 ? (
													listaDeStatus.map(item =>
														parseInt(item.id) > 2 ? (<option key={item.id} value={item.id}>{item.nome}</option>) : "")
												) : (
													<option value="0">Nenhum resultado encontrado</option>
												)}
											</select>
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
									</Modal.Body>
									<Modal.Footer>
										<button className='button'><FaRegSave /> Salvar</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowAtualizarAta}
								onHide={() => this.handlerCloseModalAtualizarAta()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered
							>
								<Form onSubmit={this.atualizarATA}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaUserGraduate /> Atualizar ata de {this.state.tipo_banca}</h4>
									</Modal.Header>
									<Modal.Body>
										<div class="form-group">
											<label for="selectStatusBanca">Status:</label>
											<select class="form-control" id="selectStatusAta"
												value={this.state.id_statusAta}
												onChange={e => this.setState({ id_statusAta: e.target.value })}>
												<option value="0">Selecionar</option>
												{listaDeStatus.length > 0 ? (
													listaDeStatus.map(item =>
														parseInt(item.id) > 2 ? (<option key={item.id} value={item.id}>{item.nome}</option>) : "")
												) : (
													<option value="0">Nenhum resultado encontrado</option>
												)}
											</select>
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
									</Modal.Body>
									<Modal.Footer>
										<button className='button'><FaRegSave /> Salvar</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowVisualizarAta}
								onHide={() => this.handlerCloseModalVisualizarAta()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> Visualizar ata de {this.state.tipo_banca}</h4>
								</Modal.Header>
								<Modal.Body>
									<div id='ata'>
										<div className='container'>
											<AtaDefesa nome={this.state.nome}
												id_curso={this.state.id_curso}
												titulo={this.state.titulo}
												data_horaPrevista={this.state.data_horaPrevista}
												status_ata={this.state.status_ata}
												arrayMembrosDaAtaDeDefesa={this.state.arrayMembrosDaAtaDeDefesa}
												dataFormatAmericano={this.state.dataFormatAmericano} />
										</div>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<button className='button' onClick={() => print('ata')}>Imprimir</button>
								</Modal.Footer>

							</Modal>

							<Modal
								show={this.state.modalShowEmitirFichaDeAvaliacao}
								onHide={() => this.handlerCloseModalEmitirFichaDeAvaliacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>
								<Form onSubmit={this.cadastrarFichaDeAvaliacao}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaWpforms /> Cadastrar ficha de avaliação</h4>
									</Modal.Header>
									<Modal.Body>
										<div className='row'>
											<div className='col-sm-6'>
												<div class="form-group">
													<label>Orientando:*</label>
													<select class="form-control form-control-sm" id="selectOrientando"
														value={this.state.id_orientando}
														onChange={e => this.setState({ id_orientando: e.target.value })}>
														{orientandos.length > 0 ?
															orientandos.map(orientando =>
																(this.state.id_orientando === orientando.id) ?
																	(<option key={orientando.id} value={orientando.id}>{orientando.nome}</option>) : ("")
															)
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>
											<div className='col-sm-6'>
												<div class="form-group ">
													<label>Curso:*</label>
													<select class="form-control form-control-sm" id="selectCurso"
														value={this.state.id_curso}
														onChange={e => this.setState({ id_curso: e.target.value })}>
														{this.state.array_cursos.length > 0 ?
															this.state.array_cursos.map(curso =>
																this.state.id_curso === curso.id ? (
																	<option key={curso.id} value={curso.id}>{curso.nome}</option>
																) : ("")
															)
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>
										</div>

										<div className='row'>
											<div className='col-sm-6'>
												<div className="form-group">
													<label>Área de concentração:* </label>
													<select className="form-control form-control-sm" id="selectAreaConcentracao"
														value={this.state.idAreaConcentracao}
														onChange={e => this.setState({ idAreaConcentracao: e.target.value })}>

														{areas_concentracao.length > 0 ?
															areas_concentracao.map(area =>
																this.state.idAreaConcentracao === area.id ?
																	(<option key={area.id} value={area.id}>{area.nome}</option>) : ("")
															)
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>

											<div className='col-sm-6'>
												<div className="form-group">
													<label>Linha de pesquisa:*</label>
													<select class="form-control form-control-sm" id="selectLinhaPesquisa" value={this.state.idLinhaPesquisa}
														onChange={e => this.setState({ idLinhaPesquisa: e.target.value })}>
														{linhasDePesquisas.length > 0 ?
															linhasDePesquisas.map(linha =>
																this.state.idLinhaPesquisa === linha.id ?
																	(<option key={linha.id} value={linha.id}>{linha.linha_pesquisa}</option>) : ("")
															)
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>
										</div>

										<div class="form-group">
											<label for="exampleFormControlTextarea1">Titulo da dissertação/tese</label>
											<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
												onChange={(e) =>
													this.setState({ titulo_teseOuDissertacao: e.target.value })
												}
												value={this.state.titulo_teseOuDissertacao}
											></textarea>
										</div>

										<div className="form-group">
											<label htmlFor="nome">Orientador:</label>
											<input
												type="text"
												className="form-control form-control-sm"
												id="presidente"
												placeholder="Digite seu nome completo"
												onChange={(e) =>
													this.setState({ orientador: e.target.value })
												}
												value={this.state.orientador}
												disabled={true}
											/>
										</div>

										<div className="form-group">
											<label htmlFor="nome">Membro externo:</label>
											<input
												type="text"
												className="form-control form-control-sm"
												id="nome"
												placeholder="Digite seu nome completo"
												onChange={(e) =>
													this.setState({ membro_externo: e.target.value })
												}
												value={this.state.membro_externo}
												disabled={true}
											/>
										</div>

										<div className="form-group">
											<label htmlFor="nome">Membro interno:</label>
											<input
												type="text"
												className="form-control form-control-sm"
												id="nome"
												placeholder="Digite seu nome completo"
												onChange={(e) =>
													this.setState({ membro_interno: e.target.value })
												}
												value={this.state.membro_interno}
												disabled={true}
											/>
										</div>

										<p>1 - O título do projeto reflete o estudo a ser realizado</p>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ1Option" onChange={e => this.setState({ titulo_projeto: "SIM" })} />SIM
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ1Option" onChange={e => this.setState({ titulo_projeto: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ1Option" onChange={e => this.setState({ titulo_projeto: "NÃO" })} />NÃO
											</label>
										</div>

										<hr />

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ1"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ1: e.target.value })
												}
												value={this.state.resumoQ1}
												rows="4" cols="100"
											></textarea>
										</div>

										<p>2 - A pergunta condutora está explicitada?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ2Option" onChange={e => this.setState({ pergunta_condutora: "SIM" })} />SIM
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ2Option" onChange={e => this.setState({ pergunta_condutora: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ2Option" onChange={e => this.setState({ pergunta_condutora: "NÃO" })} />NÃO
											</label>
										</div>
										<hr />
										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ2"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ2: e.target.value })
												}
												value={this.state.resumoQ2}
												rows="4" cols="100"
											></textarea>
										</div>

										<p>3 - A hipótese (não responder quando o desenho do estudo não couber a formulação de hipótese) está
											redigida de forma clara e o estudo proposto permite testá-la?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ3Option" onChange={e => this.setState({ hipotese: "SIM" })} />SIM
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ3Option" onChange={e => this.setState({ hipotese: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ3Option" onChange={e => this.setState({ hipotese: "NÃO" })} />NÃO
											</label>
										</div>
										<hr />
										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ3"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ3: e.target.value })
												}
												value={this.state.resumoQ3}
												rows="4" cols="100"
											></textarea>
										</div>

										<p>4 - A fundamentação teórica e empírica (revisão da literatura) dá sustentação ao estudo tanto nos aspectos
											teóricos quanto metodológicos?</p>
										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ4Option" onChange={e => this.setState({ fundamentacao_teorica: "SIM" })} />SIM
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ4Option" onChange={e => this.setState({ fundamentacao_teorica: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ4Option" onChange={e => this.setState({ fundamentacao_teorica: "NÃO" })} />NÃO
											</label>
										</div>

										<hr />

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ4"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ4: e.target.value })
												}
												value={this.state.resumoQ4}
												rows="4" cols="100"
											></textarea>
										</div>

										<p>5 - Os objetivos estão redigidos de forma clara e poderão ser atingidos a partir do estudo empírico
											delineado?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ5Option" onChange={e => this.setState({ objetivo: "SIM" })} />SIM
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ5Option" onChange={e => this.setState({ objetivo: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ5Option" onChange={e => this.setState({ objetivo: "NÃO" })} />NÃO
											</label>
										</div>

										<hr />

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ5"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ5: e.target.value })
												}
												rows="4" cols="100"
											></textarea>
										</div>

										<p>6 - O método contempla os passos necessários para garantir a validação interna da pesquisa?</p>
										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ6Option" onChange={e => this.setState({ metodo: "SIM" })} />SIM
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ6Option" onChange={e => this.setState({ metodo: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ6Option" onChange={e => this.setState({ metodo: "NÃO" })} />NÃO
											</label>
										</div>

										<hr />

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ6"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ6: e.target.value })
												}
												value={this.state.resumoQ6}
												rows="4" cols="100"
											></textarea>
										</div>

										<p>7 - O cronograma proposto é compatível com a proposta?</p>
										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ7Option" onChange={e => this.setState({ cronograma: "SIM" })} />SIM
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ7Option" onChange={e => this.setState({ cronograma: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ7Option" onChange={e => this.setState({ cronograma: "NÃO" })} />NÃO
											</label>
										</div>

										<hr />

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ7"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ7: e.target.value })
												}
												value={this.state.resumoQ7}
												rows="4" cols="100"
											></textarea>
										</div>

										<p>CONCLUSÃO DA AVALIAÇÃO</p>
										<div className="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ8Option" onChange={e => this.setState({ conclusao_avaliacao: "APROVADO SEM MODIFICAÇÕES" })} />APROVADO
											</label>
										</div>

										<div class="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ8Option" onChange={e => this.setState({ conclusao_avaliacao: "APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E LIBERAÇÃO DO ORIENTADOR" })} />
												APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E
												LIBERAÇÃO DO ORIENTADOR
											</label>
										</div>

										<div class="form-check">
											<label className="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ8Option" onChange={e => this.setState({ conclusao_avaliacao: "ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A AVALIAÇÃO INICIAL" })} />
												ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS
												ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A
												AVALIAÇÃO INICIAL
											</label>
										</div>

										<hr />

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ8"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ8: e.target.value })
												}
												value={this.state.resumoQ8}
												rows="4" cols="100"
											></textarea>
										</div>

										<p>ENCAMINHADO A COORDENAÇÃO / COLEGIADO PARA PROVIDÊNCIAS ADMINISTRATIVAS
											CABÍVEIS</p>
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
									<Modal.Footer>
										<button className='button'><FaRegSave /> Salvar</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowEditarFichaDeAvaliacao}
								onHide={() => this.handlerCloseModalEditarFichaDeAvaliacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered
							>
								<Form onSubmit={this.atualizarFichaDeAvaliacao}>
									<Modal.Header closeButton>
										<h4 className='titulo'>Atualizar ficha de avaliação</h4>
									</Modal.Header>
									<Modal.Body>
										<div className='row'>
											<div className='col-sm-6'>
												<div class="form-group">
													<label>Orientando:*</label>
													<select class="form-control" id="selectOrientando"
														value={this.state.id_orientando}
														onChange={e => this.setState({ id_orientando: e.target.value })}>
														{orientandos.length > 0 ?
															orientandos.map(orientando =>
																(this.state.id_orientando === orientando.id) ?
																	(<option key={orientando.id} value={orientando.id}>{orientando.nome}</option>) : ("")
															)
															: (<option>0</option>)
														}

													</select>
												</div>
											</div>
											<div className='col-sm-6'>
												<div class="form-group">
													<label>Curso:*</label>
													<select class="form-control" id="selectCurso"
														value={this.state.id_curso}
														onChange={e => this.setState({ id_curso: e.target.value })}>
														{this.state.array_cursos.length > 0 ?
															this.state.array_cursos.map(curso =>
																this.state.id_curso === curso.id ? (
																	<option key={curso.id} value={curso.id}>{curso.nome}</option>
																) : ("")
															)
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>
										</div>

										<div className='row'>
											<div className='col-sm-6'>
												<div className="form-group">
													<label>Área de concentração:* </label>
													<select className="form-control" id="selectAreaConcentracao"
														value={this.state.idAreaConcentracao}
														onChange={e =>
															listaDeLinhasDePesquisas(e.target.value)
																.then(result => this.setState({ arrayLinhasDePesquisas: result }))
																.then(this.setState({ idAreaConcentracao: e.target.value }))
														}>

														{areas_concentracao.length > 0 ?
															areas_concentracao.map(area =>
																this.state.idAreaConcentracao === area.id ?
																	(<option key={area.id} value={area.id}>{area.nome}</option>) : ("")
															)
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>

											<div className='col-sm-6'>
												<div className="form-group">
													<label>Linha de pesquisa:*</label>
													<select class="form-control" id="selectLinhaPesquisa" value={this.state.idLinhaPesquisa}
														onChange={e => this.setState({ idLinhaPesquisa: e.target.value })}>
														{linhasDePesquisas.length > 0 ?
															linhasDePesquisas.map(linha =>
																this.state.idLinhaPesquisa === linha.id ?
																	(<option key={linha.id} value={linha.id}>{linha.linha_pesquisa}</option>) : ("")
															)
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>
										</div>

										<div class="form-group">
											<label for="exampleFormControlTextarea1">Titulo da dissertação/tese</label>
											<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
												onChange={(e) =>
													this.setState({ titulo_teseOuDissertacao: e.target.value })
												}
												value={this.state.titulo_teseOuDissertacao}
											></textarea>
										</div>

										<div className="form-group">
											<label htmlFor="nome">Orientador:</label>
											<input
												type="text"
												className="form-control"
												id="presidente"
												placeholder="Digite seu nome completo"
												onChange={(e) =>
													this.setState({ orientador: e.target.value })
												}
												value={this.state.orientador}
												disabled={true}
											/>
										</div>

										<div className="form-group">
											<label htmlFor="nome">Membro externo:</label>
											<input
												type="text"
												className="form-control"
												id="nome"
												placeholder="Digite seu nome completo"
												onChange={(e) =>
													this.setState({ membro_externo: e.target.value })
												}
												value={this.state.membro_externo}
												disabled={true}
											/>
										</div>

										<div className="form-group">
											<label htmlFor="nome">Membro interno:</label>
											<input
												type="text"
												className="form-control"
												id="nome"
												placeholder="Digite seu nome completo"
												onChange={(e) =>
													this.setState({ membro_interno: e.target.value })
												}
												value={this.state.membro_interno}
												disabled={true}
											/>
										</div>

										<p>1 - O título do projeto reflete o estudo a ser realizado</p>
										{this.state.titulo_projeto}
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ1Option" checked={this.state.titulo_projeto === "SIM"} onChange={e => this.setState({ titulo_projeto: "SIM" })} />SIM
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ1Option" checked={this.state.titulo_projeto === "PARCIALMENTE"} onChange={e => this.setState({ titulo_projeto: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ1Option" checked={this.state.titulo_projeto === "NÃO"} onChange={e => this.setState({ titulo_projeto: "NÃO" })} />NÃO
											</label>
										</div>

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ1"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ1: e.target.value })
												}
												value={this.state.resumoQ1}
												rows="4" cols="100"
											></textarea>
										</div>
										{this.state.pergunta_condutora}
										<p>2 - A pergunta condutora está explicitada?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ2Option" checked={this.state.pergunta_condutora === "SIM"} onChange={e => this.setState({ pergunta_condutora: "SIM" })} />SIM
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ2Option" checked={this.state.pergunta_condutora === "PARCIALMENTE"} onChange={e => this.setState({ pergunta_condutora: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ2Option" checked={this.state.pergunta_condutora === "NÃO"} onChange={e => this.setState({ pergunta_condutora: "NÃO" })} />NÃO
											</label>
										</div>

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ2"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ2: e.target.value })
												}
												value={this.state.resumoQ2}
												rows="4" cols="100"
											></textarea>
										</div>
										{this.state.hipotese}
										<p>3 - A hipótese (não responder quando o desenho do estudo não couber a formulação de hipótese) está
											redigida de forma clara e o estudo proposto permite testá-la?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ3Option" checked={this.state.hipotese === "SIM"} onChange={e => this.setState({ hipotese: "SIM" })} />SIM
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ3Option" checked={this.state.hipotese === "PARCIALMENTE"} onChange={e => this.setState({ hipotese: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ3Option" checked={this.state.hipotese === "NÃO"} onChange={e => this.setState({ hipotese: "NÃO" })} />NÃO
											</label>
										</div>

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ3"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ3: e.target.value })
												}
												value={this.state.resumoQ3}
												rows="4" cols="100"
											></textarea>
										</div>
										{this.state.fundamentacao_teorica}
										<p>4 - A fundamentação teórica e empírica (revisão da literatura) dá sustentação ao estudo tanto nos aspectos
											teóricos quanto metodológicos?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ4Option" checked={this.state.fundamentacao_teorica === "SIM"} onChange={e => this.setState({ fundamentacao_teorica: "SIM" })} />SIM
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ4Option" checked={this.state.fundamentacao_teorica === "PARCIALMENTE"} onChange={e => this.setState({ fundamentacao_teorica: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ4Option" checked={this.state.fundamentacao_teorica === "NÃO"} onChange={e => this.setState({ fundamentacao_teorica: "NÃO" })} />NÃO
											</label>
										</div>

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ4"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ4: e.target.value })
												}
												value={this.state.resumoQ4}
												rows="4" cols="100"
											></textarea>
										</div>
										{this.state.objetivo}
										<p>5 - Os objetivos estão redigidos de forma clara e poderão ser atingidos a partir do estudo empírico
											delineado?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ5Option" checked={this.state.objetivo === "SIM"} onChange={e => this.setState({ objetivo: "SIM" })} />SIM
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ5Option" checked={this.state.objetivo === "PARCIALMENTE"} onChange={e => this.setState({ objetivo: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ5Option" checked={this.state.objetivo === "NÃO"} onChange={e => this.setState({ objetivo: "NÃO" })} />NÃO
											</label>
										</div>

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ5"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ5: e.target.value })
												}
												value={this.state.resumoQ5}
												rows="4" cols="100"
											></textarea>
										</div>
										{this.state.metodo}
										<p>6 - O método contempla os passos necessários para garantir a validação interna da pesquisa?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ6Option" checked={this.state.metodo === "SIM"} onChange={e => this.setState({ metodo: "SIM" })} />SIM
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ6Option" checked={this.state.metodo === "PARCIALMENTE"} onChange={e => this.setState({ metodo: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ6Option" checked={this.state.metodo === "NÃO"} onChange={e => this.setState({ metodo: "NÃO" })} />NÃO
											</label>
										</div>

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ6"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ6: e.target.value })
												}
												value={this.state.resumoQ6}
												rows="4" cols="100"
											></textarea>
										</div>

										{this.state.cronograma}
										<p>7 - O cronograma proposto é compatível com a proposta?</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ7Option" checked={this.state.cronograma === "SIM"} onChange={e => this.setState({ cronograma: "SIM" })} />SIM
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ7Option" checked={this.state.cronograma === "PARCIALMENTE"} onChange={e => this.setState({ cronograma: "PARCIALMENTE" })} />PARCIALMENTE
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ7Option" checked={this.state.cronograma === "NÃO"} onChange={e => this.setState({ cronograma: "NÃO" })} />NÃO
											</label>
										</div>

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ7"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ7: e.target.value })
												}
												value={this.state.resumoQ7}
												rows="4" cols="100"
											></textarea>
										</div>

										{this.state.conclusao_avaliacao}
										<p>CONCLUSÃO DA AVALIAÇÃO</p>
										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ8Option" checked={this.state.conclusao_avaliacao === "APROVADO SEM MODIFICAÇÕES"} onChange={e => this.setState({ conclusao_avaliacao: "APROVADO SEM MODIFICAÇÕES" })} />APROVADO SEM MODIFICAÇÕES
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ8Option" checked={this.state.conclusao_avaliacao === "APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E LIBERAÇÃO DO ORIENTADOR"} onChange={e => this.setState({ conclusao_avaliacao: "APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E LIBERAÇÃO DO ORIENTADOR" })} />
												APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E
												LIBERAÇÃO DO ORIENTADOR
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" name="radioQ8Option" checked={this.state.conclusao_avaliacao === "ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A AVALIAÇÃO INICIAL"} onChange={e => this.setState({ conclusao_avaliacao: "ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A AVALIAÇÃO INICIAL" })} />
												ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS
												ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A
												AVALIAÇÃO INICIAL
											</label>
										</div>

										<div className="form-group">
											<label>Resumo:*</label>
											<textarea
												className="form-control form-control-sm"
												id="textareaResumoQ8"
												placeholder="Digite seu nome"
												onChange={(e) =>
													this.setState({ resumoQ8: e.target.value })
												}
												value={this.state.resumoQ8}
												rows="4" cols="100"
											></textarea>
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
									</Modal.Body>
									<Modal.Footer>
										<button className='button'><FaRegSave /> Salvar</button>
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
								onHide={() => this.handlerCloseModalVisualizarDeclaracao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> Declaração de {this.state.membro}</h4>
								</Modal.Header>
								<Modal.Body>
									<div id='declaracao'>
										{this.state.documentoEmIngles ? (
											<div className='container' style={{
												background: `url(${BACKGROUND_ENBER})`,
												backgroundRepeat: "no-repeat",
												backgroundPosition: "center",
												backgroundSize: "600px 600px"
											}}>
												<img style={{ minWidth: '100%', marginBottom: '10px', }} src={Logo_ATA} />
												<div style={{ padding: "50px" }}>
													<h4 className='text-center font-weight-bold mb-3'>CERTIFICATE OF PARTICIPATION</h4>

													<p className='text-justify p-4'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We hereby certify that {this.state.sexo === "M" ? " Prof. Dr. " : " Prof(a). Dr(a). "} <b>{this.state.membro.toLocaleUpperCase() + " "}</b>
														participated on {this.state.data_horaPrevistaEnUs}, as an
														{arrayMembrosDaDeclaracaoDeParticipacao.length > 0 ?
															arrayMembrosDaDeclaracaoDeParticipacao.map(membro => (
																membro.nome.slice(0, membro.nome.indexOf(' -')) === this.state.membro ?
																	membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length).trim() === "presidente" ?
																		" president".toUpperCase() : "" ||
																			membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length).trim() === "membro externo" ?
																			" external member".toUpperCase() : "" ||
																				membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length).trim() === "membro interno" ?
																				" internal member".toUpperCase() : ""
																	: ""
															))
															: ("")} of the Examination Committee for the
														{this.state.id_curso === 1 ? ` DISSERTATION` : ``}
														{this.state.id_curso === 2 ? ` THESIS` : ``}
														{this.state.id_curso === 3 ? ` DISSERTATION` : ``}
														{this.state.id_curso === 4 ? ` THESIS` : ``} {this.state.id_tipoBanca === 1 ? `QUALIFICATION` : `DEFENSE`} of <b>{this.state.orientando.toLocaleUpperCase()}</b>,
														a regular student in the Graduate <strong>
															{this.state.id_curso === 1 ? `Masters Program in EDUCATION SCIENCES` : ``}
															{this.state.id_curso === 2 ? `Doctoral Program in EDUCATIONAL SCIENCES` : ``}
															{this.state.id_curso === 3 ? `Master's Program in THEOLOGY` : ``}
															{this.state.id_curso === 4 ? `Doctoral Program in THEOLOGY` : ``}</strong>,
														titled <b>{this.state.title.toLocaleUpperCase()}&nbsp;</b>
														The Examination Committee was composed of the following members:
													</p>

													<ol className='mt-3' style={{ listStyle: 'lower-roman' }}>
														{arrayMembrosDaDeclaracaoDeParticipacao.length > 0 ?
															arrayMembrosDaDeclaracaoDeParticipacao.map(membro => (
																membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length).trim() === "presidente" ?
																	<li>{membro.nome.slice(0, membro.nome.indexOf(' -')) + " - president"}</li> : "" ||
																		membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length).trim() === "membro externo" ?
																		<li>{membro.nome.slice(0, membro.nome.indexOf(' -')) + " -  external member"}</li> : "" ||
																			membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length).trim() === "membro interno" ?
																			<li>{membro.nome.slice(0, membro.nome.indexOf(' -')) + " - internal member"}</li> : ""
															))
															: (<li></li>)
														}
													</ol>

													<p className='text-right p-3'>{this.state.dataDeclaracaoEnUs}</p>

													<div class="row d-flex justify-content-center">
														<div class="col-lg-6 col-lg-offset-6 text-center">
															<div className="ml-auto">
																<img style={{ display: "block", margin: "0 auto" }} src='https://gestor-administrativo.s3.amazonaws.com/enber/assinaturas/Alcimar.png' />

																<p className='border-top border-dark' style={{ fontSize: "8pt" }}>Ivy Enber Christian University<br />Alcimar José da Silva<br />President</p>

																<img style={{ width: "100px", height: "100px", display: "block", margin: "0 auto" }} src={ASSINATURA_JOSUE} />

																<p className='border-top border-dark' style={{ fontSize: "8pt" }}>Ivy Enber Christian University<br />Josué Claudio Dantas<br />Chancellor</p>
															</div>
														</div>
													</div>

													<div className="row">
														<div className="col-sm-6">
															<p className='text-center' style={{ fontSize: "8pt" }}>Proof Control Code:
																{this.state.codigo_validacao}</p>
														</div>
														<div className="col-sm-6">
															<p className='text-center' style={{ fontSize: "8pt" }}>The authenticity of this certificate can be verified at
																https://www.gestorgruponexus.com.br/validacao
															</p>
														</div>
													</div>

													<div className="row">
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

													<p className='text-center mt-3' style={{ fontSize: "8pt" }}>7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710</p>
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

													<h4 className='text-center font-weight-bold mb-3'>DECLARAÇÃO DE PARTICIPAÇÃO</h4>
													<p className='text-justify p-4'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atestamos que {this.state.sexo === "M" ? " o " : " a "}
														{this.state.sexo === "M" ? " Prof. Dr. " : " Prof(a). Dr(a). "}<b>{this.state.membro.toUpperCase()}</b>, participou em {this.state.data_horaPrevistaPtBr},
														como
														{arrayMembrosDaDeclaracaoDeParticipacao.length > 0 ?
															arrayMembrosDaDeclaracaoDeParticipacao.map(membro => (
																membro.nome === this.state.membro ?
																	" " + membro.tipo + " " : ""
															))
															: ("")
														}
														da Comissão Examinadora da {this.state.id_tipoBanca === 1 ? `QUALIFICAÇÃO` : `DEFESA`}
														{this.state.id_curso === 1 ? ` DA DISSERTAÇÃO ` : ``}
														{this.state.id_curso === 2 ? ` DE TESE ` : ``}
														{this.state.id_curso === 3 ? ` DA DISSERTAÇÃO ` : ``}
														{this.state.id_curso === 4 ? ` DE TESE ` : ``}
														de
														<b>&nbsp;{this.state.orientando.toLocaleUpperCase()}</b>, discente regular do
														{this.state.id_curso === 1 ? ` Programa de Pós Graduação em  Ciências da Educação` : ``}
														{this.state.id_curso === 2 ? ` Programa de Pós Graduação em  Ciências da Educação` : ``}
														{this.state.id_curso === 3 ? ` Programa de Pós Graduação em Teologia` : ``}
														{this.state.id_curso === 4 ? ` Programa de Pós Graduação em Teologia` : ``}, Curso de {this.state.curso.split(" ", 1)[0]},
														cujo trabalho se intitula <b>{this.state.titulo_banca.toLocaleUpperCase()}</b>. A Comissão Examinadora foi constituída pelos seguintes membros:</p>
													<ol className=''>
														{arrayMembrosDaDeclaracaoDeParticipacao.length > 0 ?
															arrayMembrosDaDeclaracaoDeParticipacao.map(membro => (
																<li>{membro.nome}</li>
															))
															: (<li></li>)
														}
													</ol>
													<p className='mt-2 text-right p-4'>Orlando, {this.state.data_horaPrevistaPtBr}</p>

													<div class="row d-flex justify-content-center">
														<div class="col-lg-6 col-lg-offset-6 text-center">
															<div className="ml-auto">
																<img style={{ display: "block", margin: "0 auto" }} src='https://gestor-administrativo.s3.amazonaws.com/enber/assinaturas/Alcimar.png' />
																<hr className='hr' />
																<p style={{ fontSize: "8pt" }}>Ivy Enber Christian University<br />Alcimar José da Silva<br />Presidente</p>
																<img style={{ width: "100px", height: "100px", display: "block", margin: "0 auto" }} src={ASSINATURA_JOSUE} />
																<hr className='hr' />
																<p style={{ fontSize: "8pt" }}>Ivy Enber Christian University<br />Josué Claudio Dantas<br />Reitor</p>
															</div>
														</div>
													</div>

													<div className="row">
														<div className="col-sm-6">
															<p className='text-center' style={{ fontSize: "8pt" }}>Código de controle do comprovante:
																{this.state.codigo_validacao}</p>
														</div>
														<div className="col-sm-6 d-flex justify-content-center">
															<p className='text-center' style={{ fontSize: "8pt" }}>A autenticidade desta declaração poderá ser
																confirmada no endereço
																https://www.gestorgruponexus.com.br/validacao
															</p>
														</div>
													</div>

													<div className="row">
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

													<p className='text-center mt-3' style={{ fontSize: "8pt" }}>7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710</p>
												</div>
											</div>
										)}


										{/* <div className='container '>
											<img style={{ minWidth: '100%', marginBottom: '10px', }} src={Logo_ATA} />
											<h4 className='text-center font-weight-bold mb-3'>DECLARAÇÃO DE PARTICIPAÇÃO</h4>
											<p className='text-justify p-4'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atestamos que {this.state.sexo === "M" ? " o " : " a "}
												{this.state.sexo === "M" ? " Prof. Dr. " : " Prof(a). Dr(a). "} <b>{this.state.membro.toLocaleUpperCase()}</b>, participou em {this.state.data_horaPrevistaPtBr},
												como
												{array_membrosBanca.length > 0 ?
													array_membrosBanca.map(membro => (
														membro.nome.slice(0, membro.nome.indexOf(' -')) === this.state.membro ?
															membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length) + " " : ""
													))
													: ("")
												}
												da Comissão Examinadora da DEFESA DE TESE de
												<b>&nbsp;{this.state.orientando.toLocaleUpperCase()}</b>, discente regular do Programa de Pós-Graduação em Ciências
												Sociais, Curso de Doutorado, cujo trabalho se intitula <b>{this.state.titulo_banca.toLocaleUpperCase()}</b>.A Comissão Examinadora foi constituída pelos seguintes membros:</p>
											<ol className='mt-3'>
												{array_membrosBanca.length > 0 ?
													array_membrosBanca.map(membro => (
														<li>{membro.nome}</li>
													))
													: (<li></li>)
												}
											</ol>
											<p className='mt-4 text-center'>{this.state.dataDeclaracaoPtBr}</p>

											<img style={{ display: "block", margin: "0 auto" }} src='https://gestor-administrativo.s3.amazonaws.com/enber/assinaturas/Alcimar.png' />

											<p className='border-top border-dark text-center'>Alcimar José da Silva<br />Presidente</p>

											<img style={{ width: "100px", height: "100px", display: "block", margin: "0 auto" }} src='https://gestor-administrativo.s3.amazonaws.com/enber/assinaturas/josue.png' />

											<p className='border-top border-dark text-center'>IVY ENBER CHRISTIAN UNIVERSITY<br />JOSUÉ CLAUDIO DANTAS<br />REITOR</p>

											<p className='text-center'>Código de controle do comprovante:
												{this.state.codigo_validacao}</p>

											<p className='text-center'>A autenticidade desta declaração poderá ser
												confirmada no endereço
												https://www.gestorgruponexus.com.br/validacao
											</p>
										</div> */}
									</div>
								</Modal.Body>
								<Modal.Footer>
									<button className='button' onClick={() => print('declaracao')}>Imprimir</button>
								</Modal.Footer>
							</Modal>

							<Modal
								show={this.state.modalShowEmitirDeclaracao}
								onHide={() => this.handlerCloseModalEmitirDeclaracao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate />Emitir declaração de participação</h4>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={this.cadastrarDeclaracaoDeParticipacao}>
										<div className="form-group">
											<label htmlFor="nome">Membro:</label>
											<select class="form-control form-control-sm" id="selectMembro"
												onChange={e => this.setState({ id_usuario: e.target.value })}>
												<option value="0">Selecione</option>
												{arrayMembrosDaDeclaracaoDeParticipacao.length > 0 ?
													arrayMembrosDaDeclaracaoDeParticipacao.map(membro => (
														<option key={membro.id} value={membro.id}>{membro.nome + ` - ` + membro.tipo}</option>
													))
													: (<option>0</option>)
												}
											</select>
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
											<button className='button'><FaRegSave /> Emitir</button>
										</div>

									</Form>
									<hr />
									<div className='row'>
										<div className='col-sm-12'>
											<h4><FaPaste /> Declarações</h4>
										</div>
									</div>
									<hr />
									<div className="table-responsive table-sm text-center" style={{ maxHeight: "300px", overflowY: "scroll", padding: "15px" }}>
										<table className="table table-bordered table-striped table-hover custom-table bg-white">
											<thead className="thead-light">
												<tr>
													<th scope="col">Membro</th>
													<th>Código de validação</th>
													<th>Ações</th>
												</tr>
											</thead>
											<tbody>
												{array_declaracoes.length > 0 ? (
													array_declaracoes.map(declaracao => (
														<tr key={array_declaracoes.id} title="Clique aqui para obter mais informações sobre a declaração">
															<td>{declaracao.membro}</td>
															<td>{declaracao.codigo_validacao}</td>
															<td><button className='button w-100 mb-2' onClick={() => this.handlerShowModalVisualizarDeclaracao({ ...declaracao, documentoEmIngles: false })}>Declaração de Participação</button>
																<button className='button w-100' onClick={() => this.handlerShowModalVisualizarDeclaracao({ ...declaracao, documentoEmIngles: true })}>Participation Declaration</button></td>
														</tr>
													))
												) : (<tr className="text-center">
													<td colSpan="10">
														Nenhum resultado encontrado
													</td>
												</tr>)}
											</tbody>
										</table>
									</div>
									{
										<div className="text-center font-weight-bold mt-3 mb-5">
											Total de Registros: {array_declaracoes.length}
										</div>
									}
								</Modal.Body>
								<Modal.Footer>

								</Modal.Footer>

							</Modal>

							<Modal
								show={this.state.modalShowCadastrarOrientacao}
								onHide={() => this.handlerCloseModalCadastrarOrientacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate />{this.state.id_orientacao !== 0 ? ("Atualizar") : ("Cadastrar")} orientação</h4>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={this.cadastrarOuAtualizarOrientacao}>
										<div className='row'>
											<div className='col-sm-6'><div className="form-group">
												<label htmlFor="nome">Link do meet:</label>
												<input
													type="text"
													className="form-control form-control-sm"
													id="link"
													placeholder="Informe o link da banca"
													onChange={(e) =>
														this.setState({ link: e.target.value })
													}
													value={this.state.link}
												/>
											</div>
											</div>
											<div className='col-sm-6'><div class="form-group">
												<label>Orientando:*</label>
												<select class="form-control form-control-sm" id="selectOrientando"
													disabled={true}
													value={this.state.id_orientando}
													onChange={e => this.setState({ id_orientando: e.target.value })}>
													<option value="0">Selecione</option>
													{orientandos.length > 0 ?
														orientandos.map(orientando => (
															<option key={orientando.id} value={orientando.id}>{orientando.nome}</option>
														))
														: (<option>0</option>)
													}
												</select>
											</div>
											</div>
										</div>

										<div class="form-group">
											<label for="exampleFormControlTextarea1">Observação</label>
											<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
												onChange={(e) =>
													this.setState({ observacao: e.target.value })
												}
												value={this.state.observacao}
											></textarea>
										</div>

										<div className="form-group">
											<label for="dataHoraPrevista">Data e hora prevista:</label>
											<input class="form-control form-control-sm" type="datetime-local" id="dataHoraPrevista" name="start" value={this.state.data_horaPrevista}
												min="2022-01"
												onChange={e => this.setState({ data_horaPrevista: e.target.value })}
											/>
										</div>

										<hr />

										<h5><FaFileAlt /> Informações do arquivo</h5>
										<hr />

										<div className='row'>
											<div className='col-sm-6'>
												<div className="form-group">
													<label htmlFor="nome">Nome do arquivo:</label>
													<input
														type="text"
														className="form-control form-control-sm"
														id="nome"
														placeholder="Informe o nome do arquivo"
														onChange={(e) =>
															this.setState({ nomeArquivo: e.target.value })
														}
														value={this.state.nomeArquivo}
													/>
												</div>
											</div>
											<div className='col-sm-6'>
												<div className="form-group mb-3">
													<label for="anexo">Anexar arquivo</label>
													<input type="file" className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
												</div>
											</div>
										</div>

										<div class="progress">
											<div id='progresso' class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
										</div>

										<div className='d-flex justify-content-center'>
											<button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
										</div>
									</Form>

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

									{this.state.id_orientacao !== 0 && (
										<div className='container'>
											<h5><FaFileAlt /> Anexados da orientação</h5>
											<p className='text-danger'>Atenção: arquivos anexados pelo orientador</p>
											<hr />

											<div className='row overflow-auto' style={{ maxHeight: "500px" }}>
												{arrayAnexosDaOrientacao.length > 0 ? (
													arrayAnexosDaOrientacao.map((anexo, index) => (
														<div className='col-sm-4'>
															<Card key={anexo.id} className="zoom text-center h-100">
																<Card.Body >
																	{index === 0 ? (<p className='text-danger'>Ultima anexo</p>) : ""}
																	<h4><FaFileAlt /> {anexo.nome}</h4>
																	<p>{anexo.dataHoraCriacao}</p>
																	<a href={anexo.link} target="_blank">Visualizar</a>
																</Card.Body>
															</Card>
														</div>
													))
												) : (<div class="card w-100">
													<div class="card-body">
														<h5 class="card-title">Nenhum resultado encontrado</h5>
													</div>
												</div>)}
											</div>

											<hr />

											<h5><FaFileAlt /> Anexados do orientando {this.state.nome}</h5>
											<div className='row overflow-auto' style={{ maxHeight: "500px" }}>
												{arrayAnexosDoOrientando.length > 0 ? (
													arrayAnexosDoOrientando.map((anexo, index) => (
														<div className='col-sm-6'>
															<Card key={anexo.id} className="zoom text-center h-100">
																<Card.Body >
																	{index === 0 ? (<p className='text-danger'>Ultimo anexo</p>) : ""}
																	<h4><FaFileAlt /> {anexo.nome}</h4>
																	<p>{anexo.dataHoraCriacao}</p>
																	<a href={anexo.link} target="_blank">Visualizar</a>
																</Card.Body>
															</Card>
														</div>
													))
												) : (
													<div className='col-sm-6'>
														<div class="card w-50 text-center">
															<div class="card-body">
																<h5 class="card-title">Nenhum resultado encontrado</h5>
															</div>
														</div>
													</div>)}
											</div>
										</div>
									)}
								</Modal.Body>

								<Modal.Footer>

								</Modal.Footer>
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
								onHide={() => this.handlerCloseModalAtualizarBanca()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='xl'
								centered>
								<Form onSubmit={this.atualizarBanca}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaLayerGroup /> Atualizar Banca</h4>
									</Modal.Header>
									<Modal.Body >
										<div className='row' style={{ maxHeight: "400px", overflowY: "scroll" }}>
											<div className='col-sm-6'>
												<div class="form-group">
													<label>Orientando:*</label>
													<select class="form-control form-control-sm" id="selectOrientando"
														value={this.state.id_orientando}
														onChange={e => this.setState({ id_orientando: e.target.value })}>
														<option value="0">Selecione</option>
														{orientandos.length > 0 ?
															orientandos.map(orientando => (
																<option key={orientando.id} value={orientando.id}>{orientando.nome.toUpperCase()}</option>
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div className="form-group">
													<label>Tipo da banca:*</label>
													<select class="form-control form-control-sm" id="selectOrientando"
														value={this.state.id_tipoBanca}
														onChange={e => this.setState({ id_tipoBanca: e.target.value })}>
														<option value="0">Selecione</option>
														{tiposDeBanca.length > 0 ?
															tiposDeBanca.map(tipo =>
																parseInt(tipo.id) < 3 ? (
																	<option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
																) : ""
															)
															: (<option value="0">Nenhum resultado encontrado</option>)}
													</select>
												</div>

												<div className="form-group">
													<label>Área de concentração:* </label>
													<select className="form-control form-control-sm" id="selectAreaConcentracao"
														value={this.state.idAreaConcentracao}>
														{areas_concentracao.length > 0 ?
															areas_concentracao.map(area => (
																area.id === this.state.idAreaConcentracao && (<option key={area.id} value={area.id}>{area.nome}</option>)
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div className="form-group">
													<label>Linha de pesquisa:*</label>
													<select class="form-control form-control-sm" id="selectLinhaPesquisa" value={this.state.idLinhaPesquisa}
														onChange={e => this.setState({ idLinhaPesquisa: e.target.value })}>
														<option value="0">Selecione</option>
														{linhasDePesquisas.length > 0 ?
															linhasDePesquisas.map(linha => (
																<option key={linha.id} value={linha.id}>{linha.linha_pesquisa}</option>
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div className="form-group">
													<label for="dataHoraPrevista">Data e hora prevista:</label>
													<input class="form-control form-control-sm" type="datetime-local" id="dataHoraPrevista" name="start"
														min="2022-01"
														onChange={e => this.setState({ data_horaPrevista: e.target.value })}
														value={this.state.data_horaPrevista}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="selectSetoresParticipantes">Membros internos:*</label>
													<Select
														closeMenuOnSelect={false}
														value={this.state.arraySelectedMembrosInternos}
														isMulti
														options={this.state.arrayMembrosInternos}
														onChange={(e) => this.setState({ arraySelectedMembrosInternos: e })}
													/>
												</div>
											</div>
											<div className='col-sm-6'>
												<div className="form-group">
													<label htmlFor="selectSetoresParticipantes">Membros externos:*</label>
													<Select
														closeMenuOnSelect={false}
														value={this.state.arraySelectedMembrosExternos}
														isMulti
														options={this.state.arrayMembrosExternos}
														onChange={(e) => this.setState({ arraySelectedMembrosExternos: e })}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="nome">Membro externo:*</label>
													<select class="form-control form-control-sm" id="selectOrientador"
														onChange={e => this.setState({ id_membroExterno: e.target.value })}>
														<option value="0">Selecione</option>
														{arrayMembrosExternos.length > 0 ?
															arrayMembrosExternos.map(membro => (
																<option value={membro.id_usuario}>{membro.nome}</option>
															))
															: (<option>0</option>)
														}
													</select>
												</div>

												<div class="form-group">
													<label for="exampleFormControlTextarea1">Titulo:</label>
													<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ titulo: e.target.value })
														}
														value={this.state.titulo}
													></textarea>
												</div>

												<div class="form-group">
													<label for="exampleFormControlTextarea1">Titulo em inglês:</label>
													<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ title: e.target.value })
														}
														value={this.state.title}
													></textarea>
												</div>

												<div class="form-group">
													<label for="exampleFormControlTextarea1">Resumo:</label>
													<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ resumo: e.target.value })
														}
														value={this.state.resumo}
													></textarea>
												</div>

												<div class="form-group">
													<label for="exampleFormControlTextarea1">Palavra chave:</label>
													<textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
														onChange={(e) =>
															this.setState({ palavra_chave: e.target.value })
														}
														value={this.state.palavra_chave}
													></textarea>
												</div>
											</div>
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



