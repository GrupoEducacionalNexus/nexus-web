import { FaRedo, FaUserGraduate, FaPercent, FaRegCreditCard, FaLayerGroup, FaUsers, FaExclamationTriangle, FaCalendarWeek, FaFilter, FaSearch, FaClipboardList, FaRegWindowClose, FaFileExport, FaPrint, FaCalendarCheck, FaCalendarMinus, FaFileSignature, FaAnchor, FaShieldAlt, FaWpforms, FaBookReader, FaBookMedical, FaTrashAlt, FaAddressBook, FaRegEdit, FaRegCalendarCheck, FaPlus } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { getToken, logout } from '../../services/auth';
import Modal from 'react-bootstrap/Modal';
import * as xlsx from 'xlsx/xlsx.mjs';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import * as FileSaver from 'file-saver';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Certificado } from '../../components/Certificado';
import { listaDeOrientadores } from '../../services/getListaDeOrientadores';
import { listaTipoDeDocumentos } from '../../services/getListaTipoDeDocumentos';
import { listaDeStatus } from '../../services/getListaDeStatus';
import { listaDeLinhasDePesquisas } from '../../services/getListaDeLinhasDePesquisas';
import { listaDeOrientandos } from '../../services/getListaDeOrientandos';
import { print } from '../../services/print';
import { listaDeSolicitacoes } from '../../services/listaDeSolicitacoes';
import { AtaDefesa } from '../../components/AtaDefesa';
import { handleCpf } from '../../services/mascaraCpf';
import { uuid } from '../../services/uuid';
import { CertificadoPosGraduacao } from '../../components/CertificadoPosGraduacao';
import Menu from '../../components/Menu';
import backgroundImage from '../../assets/sistema_chamados.png';
import MainContent from '../../components/MainContent';
import FloatingMenu from '../../components/FloatingMenu';
import AdminNavbar from '../../components/Navbar';
import Select from 'react-select';
import { listaDeAreasConcentracao } from '../bancas/apiServices';

export default class Index extends Component {
	constructor(props) {
		super();
		this.state = {
			id_ciclo: '',
			nomeCiclo: '',
			mesEAnoCiclo: '',
			responsavel: '',
			arrayCiclos: [],
			modalShowCadastrarCiclo: false,
			modalShowEditarCiclo: false,
			modalShowCadastrarPendencia: false,
			modalShowEditarAluno: false,
			modalShowAdicionarObservacao: false,
			modalShowAlterarDataDiario: false,
			modalShowAdicionarAlunoSolicitacao: false,
			modalShowAdicionarAlunoCertificacao: false,
			modalShowMarcaItensChecklist: false,
			modalShowCadastrarEvento: false,
			modalShowEditarEvento: false,
			modalShowEditarCertificado: false,
			modalShowEditarTeseOuDissertacao: false,
			modalShowEditarBanca: false,
			modalShowLiderDoGrupoDeTrabalho: false,
			modalShowEditarOrientando: false,
			modalShowAtualizarSolicitacao: false,
			modalShowGerarCertificado: false,
			modalShowVisualizarCertificado: false,
			keyTab: 'Checklist',
			success: '',
			error: '',
			errorAlteracoes: '',
			listaAlunos: [],
			listaAlunosCheckList: [],
			listaAlunosEPendencias: [],
			arrayTesesEDissertacoes: [],
			arquivoListaAlunos: [],
			checkCertificadoImp: 0,
			checkDeclaracaoImp: 0,
			checkCarimbos: 0,
			checkSelos: 0,
			checkAssinaturas: 0,
			checkListaImpressos: 0,
			checkEtiquetaImpressa: 0,
			nomePendencia: '',
			listaPendencias: [],
			listaPendenciasDoAluno: [],
			listaPendenciasDoCiclo: [],
			arrayPendenciasPorUnidades: [],
			arrayAlunosPendencias: [],
			arrayCheckedItensAlunosProcessoDeCertificacao: [],
			array_bancasQ: [],
			array_bancasD: [],
			arrayUsuarios: [],
			array_gruposTrabalho: [],
			arrayCertificados: [],

			//Dados do aluno
			id_aluno: 0,
			observacao: '',
			nomeAluno: '',
			data_nascimento: '',
			instituicaoAluno: '',
			rg: 0,
			cpf: 0,
			nacionalidade: '',
			naturalidade: '',
			pai: '',
			mae: '',
			situacaoTurma: '',
			turma: '',

			pesqNomeAluno: '',
			pesqInstituicaoAluno: '',
			listRowSelectedsChecklist: [],
			data_diario: '',
			contRowsChecklist: 0,
			avancar: 0,
			totalDeAlunosDoCiclo: 0,
			solicitacao: 0,
			quantidade_alunos: 0,
			quantidade_alunosCertImp: 0,
			percentual_alunosCertImp: 0,
			quant_decImp: 0,
			perc_decImp: 0,
			quant_carimbos: 0,
			perc_carimbos: 0,
			quant_selos: 0,
			perc_selos: 0,
			quant_assinaturas: 0,
			perc_assinaturas: 0,
			quant_listaImpresso: 0,
			perc_listaImpresso: 0,
			quant_etiquetaImpresso: 0,
			perc_etiquetaImpresso: 0,

			//Dados do evento
			temaEvento: '',
			dataEventoInicial: '',
			dataEventoFinal: '',
			carga_horaria: 0,
			arrayEventos: [],
			arquivoDeMembros: [],
			id_evento: 0,
			arrayMembrosDoEvento: [],
			arrayCodigosDeValidacao: [],
			id_grupoTrabalho: 0,

			//Dados do membro
			cpfMembro: '',
			nomeMembro: '',
			codigo_validacao: '',


			//Dados da tese ou dissertação
			id_documento: 0,
			autor: '',
			titulo: '',
			tituloEmOutroIdioma: '',
			idOrientador: '',
			idTipoDocumento: '',
			dataDefesa: '',
			resumo: '',
			idioma: '',
			tipo: '',
			linhaPesquisa: '',
			arquivo: null,
			descricaoDoArquivo: '',
			url: '',
			disabled: false,
			arrayTipoDeDocumentos: [],
			arrayOrientadores: [],
			idLinhaPesquisa: '',
			idAreaConcentracao: 0,

			CheckedTodosChecklist: 0,
			desmarcarTodosOsItensMarcados: 0,

			//Banca
			id_banca: '',
			id_tipoBanca: '',
			valorTaxaBanca: '',
			data_pagBancaQ: '',
			observacaoBanca: '',
			orientando: '',
			status_banca: '',
			array_status: [],
			email_orientador: "",
			email_orientando: "",

			//ATA
			id_ata: '',
			presidente: '',
			membro_externo: '',
			membro_interno: '',
			quant_pag: 0,
			status_ata: '',
			data_horaPrevistaAta: '',
			titulo_teseOuDissertacao: "",
			status_ata: 0,
			nome: "",
			data_horaPrevistaAta: "",
			id_statusAta: 0,
			id_tipoBanca: 0,
			tipo_banca: 0,
			link_ata: "",
			assinatura_membroInterno: "",
			assinatura_presidente: "",
			assinatura_membroExterno: "",
			id_curso: "",
			data_horaPrevista: "",
			dtCadAta: "",
			dataFormatAmericano: "",

			id_alunoG: 0,
			array_orientacao: [],
			array_bancasQE: [],
			array_bancasDE: [],
			array_bancasQT: [],
			array_bancasDT: [],
			arrayOrientacaoE: [],
			arrayOrientacaoT: [],
			array_orientandosE: [],
			array_orientandosT: [],
			array_lideresGt: [],
			array_solicitacoes: [],
			arrayLinhasDePesquisas: [],
			arrayAreaConcentracao: [],
			arraySelectedLiderGt: [],

			id_orientando: '',
			observacao: '',
			id_usuario: 0,
			tipo_solicitacao: '',

			//Certificado
			id_usuario: 0,
			id_certificado: 0,
			nome_completo: '',
			curso: '',
			data_emissaoDoDiploma: '',
			numero_livro: 0,
			numero_pagina: 0,
			numero_registro: 0,
			data_local: '',
			linkDoCertificado: ``
		};
	}

	componentDidMount() {
		this.listaCiclos(getToken());
		this.listaPendencias(getToken());
		this.listaDeEventos(getToken());
		this.listaDeBancas(getToken(), 1, 1);
		this.listaDeBancas(getToken(), 2, 1);
		this.listaDeBancas(getToken(), 1, 2);
		this.listaDeBancas(getToken(), 2, 2);
		listaDeOrientandos(getToken(), 1).then(result => this.setState({ array_orientandosE: result }));
		listaDeOrientandos(getToken(), 2).then(result => this.setState({ array_orientandosT: result }));
		listaDeStatus(getToken()).then(result => this.setState({ array_status: result }));
		listaDeSolicitacoes(getToken()).then(result => this.setState({ array_solicitacoes: result }));
		this.listaDeCertificados(getToken());
	}

	setModalShowCadastrarPendencia(valor) {
		this.setState({ modalShowCadastrarPendencia: valor, success: '', error: '' });
	}

	handlerShowModalCadastrarPendencia() {
		this.setModalShowCadastrarPendencia(true);
	}

	handlerCloseModalCadastrarPendencia() {
		this.setModalShowCadastrarPendencia(false);
	};

	setModalShowCadastrarCiclo(valor) {
		this.setState({ modalShowCadastrarCiclo: valor, success: '', error: '' });
	}

	handlerShowModalCadastrarCiclo() {
		this.setModalShowCadastrarCiclo(true);
	}

	handlerCloseModalCadastrarCiclo() {
		this.setModalShowCadastrarCiclo(false);
	};

	setModalShowEditarCiclo(valor) {
		this.setState({ modalShowEditarCiclo: valor });
	}

	handlerShowModalEditarCiclo(ciclo) {
		this.setModalShowEditarCiclo(true);
		this.setState({ id_ciclo: ciclo.id, nomeCiclo: ciclo.nome, arrayAlunosPendencias: [[]], errorAlteracoes: "", contRowsChecklist: 0, quantidade_alunos: ciclo.quantidade_alunos });
		this.listaDeAlunosPorCiclos(getToken(), ciclo.id, 0, this.state.pesqNomeAluno !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno !== "" ? this.state.pesqInstituicaoAluno : "");
	}

	handlerCloseModalEditarCiclo() {
		this.setModalShowEditarCiclo(false);
		this.setState({
			id_ciclo: '', nomeCiclo: '', listaAlunosEPendencias: [], listaAlunosCheckList: [], listaDePendenciasPorCiclos: [], quantidade_alunos: 0, quantidade_alunosCertImp: 0,
			percentual_alunosCertImp: 0, quant_decImp: 0, perc_decImp: 0
		});
	};

	setModalShowAdicionarObservacao(valor) {
		this.setState({ modalShowAdicionarObservacao: valor, success: '', error: '' });
	}

	handlerShowModalAdicionarObservacao() {
		this.setState({ success: '', errorAlteracoes: '' });

		if (this.state.contRowsChecklist === 1) {
			this.setModalShowAdicionarObservacao(true);
			this.setState({ errorAlteracoes: '' });
		} else {
			this.setState({ errorAlteracoes: 'Por favor, selecione apenas 1 registro para adicionar uma observação' });
		}
	}

	handlerCloseModalAdicionarObservacao() {
		this.setModalShowAdicionarObservacao(false);
		this.setState({ success: '', errorAlteracoes: '' });
	};

	setModalShowAdicionarAlunoSolicitacao(valor) {
		this.setState({ modalShowAdicionarAlunoSolicitacao: valor, success: '', error: '' });
	}

	handlerShowModalAdicionarAlunoSolicitacao() {
		this.setState({ success: '', errorAlteracoes: '', solicitacao: 1 });
		this.setModalShowAdicionarAlunoSolicitacao(true);
	}

	handlerCloseModalAdicionarAlunoSolicitacao() {
		this.setModalShowAdicionarAlunoSolicitacao(false);
		this.setState({ nomeAluno: '', instituicaoAluno: '', success: '', errorAlteracoes: '', solicitacao: 0 });
	};

	setModalShowAdicionarAlunoCertificacao(valor) {
		this.setState({ modalShowAdicionarAlunoCertificacao: valor, success: '', error: '' });
	}

	handlerShowModalAdicionarAlunoCertificacao(aluno = null) {
		console.log(aluno);
		this.setState({ success: '', errorAlteracoes: '' });
		this.setModalShowAdicionarAlunoCertificacao(true);
		if (aluno !== null) {
			this.setState({
				id_aluno: aluno.id_usuario,
				nomeAluno: aluno.nome,
				data_nascimento: aluno.dataNascimento,
				instituicaoAluno: aluno.nomeInstituicao,
				rg: aluno.rg,
				cpf: aluno.cpf_cnpj,
				nacionalidade: aluno.nacionalidade,
				naturalidade: aluno.naturalidade,
				pai: aluno.pai,
				mae: aluno.mae,
				situacaoTurma: aluno.situacaoTurma,
				turma: aluno.turma
			});
			return
		}
		this.setState({
			id_aluno: 0,
			nomeAluno: "",
			data_nascimento: "",
			instituicaoAluno: "",
			rg: "",
			cpf: "",
			nacionalidade: "",
			naturalidade: "",
			pai: "",
			mae: "",
			situacaoTurma: "",
			turma: "",
			solicitacao: 0
		});

	}

	handlerCloseModalAdicionarAlunoCertificacao() {
		this.setModalShowAdicionarAlunoCertificacao(false);
		this.setState({ nomeAluno: '', instituicaoAluno: '', success: '', errorAlteracoes: '' });
	};

	setModalShowAlterarDataDiario(valor) {
		this.setState({ modalShowAlterarDataDiario: valor, success: '', errorAlteracoes: '' });
	}

	handlerShowModalAlterarDataDiario() {
		if (this.state.contRowsChecklist > 0) {
			this.setModalShowAlterarDataDiario(true);
			this.setState({ errorAlteracoes: '' });
		} else {
			this.setState({ errorAlteracoes: 'Selecione pelo menos 1 item para registrar a data do diário' });
		}
	}

	handlerCloseModalAlterarDataDiario() {
		this.setModalShowAlterarDataDiario(false);
		this.setState({ id_aluno: 0, nomeAluno: '', success: '', error: '', data_diario: '' });
	};

	setModalShowMarcarItensCheckList(valor) {
		this.setState({ modalShowMarcaItensChecklist: valor, success: '', error: '' });
	}

	handlerShowModalMarcarItensCheckList() {
		this.setState({ success: '', errorAlteracoes: '' });
		if (this.state.contRowsChecklist > 0) {
			this.setModalShowMarcarItensCheckList(true);
			this.setState({ errorAlteracoes: '' });
		} else {
			this.setState({ errorAlteracoes: 'Selecione pelo menos 1 item' });
		}
	}

	handlerCloseModalMarcarItensCheckList() {
		this.setModalShowMarcarItensCheckList(false);
		this.setState({ success: '', error: '', arrayCheckedItensAlunosProcessoDeCertificacao: [], desmarcarTodosOsItensMarcados: 0 });
	};

	setModalShowEditarTeseOuDissertacao(valor) {
		this.setState({ modalShowEditarTeseOuDissertacao: valor, success: '', error: '', successUpload: '', errorUpload: '', disabled: false });
	}

	handlerShowModalEditarTeseOuDissertacao(documento) {
		console.log(documento);
		this.setModalShowEditarTeseOuDissertacao(true);
		this.setState({
			id_documento: documento.id,
			autor: documento.autor,
			titulo: documento.titulo,
			tituloEmOutroIdioma: documento.tituloEmOutroIdioma,
			idOrientador: documento.idOrientador,
			idTipoDocumento: documento.idTipoDocumento,
			dataDefesa: documento.inputData_defesa,
			resumo: documento.resumo,
			idioma: documento.idioma,
			tipo: documento.tipo_documento,
			linhaPesquisa: documento.linha_pesquisa,
			descricaoDoArquivo: documento.descricao,
			url: documento.url,
			idLinhaPesquisa: documento.id_linhaPesquisa,
			idAreaConcentracao: documento.id_areaConcentracao
		});

		listaDeOrientadores().then(result => this.setState({ arrayOrientadores: result }));
		listaTipoDeDocumentos().then(result => this.setState({ arrayTipoDeDocumentos: result }));
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
		listaDeLinhasDePesquisas(documento.id_areaConcentracao).then(result => this.setState({ arrayLinhasDePesquisas: result }))
	}

	handlerCloseModalEditarTeseOuDissertacao() {
		this.setModalShowEditarTeseOuDissertacao(false);
	};

	setModalShowEditarBanca(valor) {
		this.setState({ modalShowEditarBanca: valor });
	}

	handlerShowModalEditarBanca(id_tipoBanca, idAreaConcentracao) {
		this.setState({ id_tipoBanca, idAreaConcentracao });
		console.log(id_tipoBanca, idAreaConcentracao);
		this.setModalShowEditarBanca(true);
	}

	handlerCloseModalEditarBanca() {
		this.setModalShowEditarBanca(false);
		this.setState({ success: '', error: '' });
	};

	setModalShowEditarOrientando(valor) {
		this.setState({ modalShowEditarOrientando: valor, success: '', error: '' });
	}

	handlerShowModalEditarOrientando(idAreaConcentracao) {
		this.setModalShowEditarOrientando(true);
		this.setState({ idAreaConcentracao });
	}

	handlerCloseModalEditarOrientando() {
		this.setModalShowEditarOrientando(false);
		this.setState({ idAreaConcentracao: 0 });
	};

	setModalShowAtualizarSolicitacao(valor) {
		this.setState({ modalShowAtualizarSolicitacao: valor });
	}

	handlerShowModalAtualizarSolicitacao(solicitacao) {
		this.setModalShowAtualizarSolicitacao(true);
		this.setState({
			tipo_solicitacao: solicitacao.tipo,
			presidente: solicitacao.orientador,
			membro_externo: solicitacao.membro_externo,
			membro_interno: solicitacao.membro_interno,
			titulo_teseOuDissertacao: solicitacao.titulo_teseOuDissertacao,
			quant_pag: solicitacao.quant_pag,
			status_ata: solicitacao.status_ata,
			nome: solicitacao.solicitante,
			data_horaPrevistaAta: solicitacao.data_horaPrevistaAta,
			id_statusAta: solicitacao.id_statusAta,
			id_tipoBanca: solicitacao.id_tipoBanca,
			tipo_banca: solicitacao.tipo_banca,
			link_ata: solicitacao.link,
			assinatura_membroInterno: solicitacao.assinatura_membroInterno,
			assinatura_presidente: solicitacao.assinatura_presidente,
			assinatura_membroExterno: solicitacao.assinatura_membroExterno,
			id_curso: solicitacao.id_curso,
			data_horaPrevista: solicitacao.data_horaPrevista,
			dtCadAta: solicitacao.dtCadAta,
			dataFormatAmericano: solicitacao.dataFormatAmericano
		});

	}

	handlerCloseModalAtualizarSolicitacao() {
		this.setModalShowAtualizarSolicitacao(false);
	};

	setModalShowGerarCertificado(valor) {
		this.setState({ modalShowGerarCertificado: valor });
	}

	handlerShowModalGerarCertificado(certificado = null) {
		this.setModalShowGerarCertificado(true);

		if (certificado !== null) {
			this.setState({
				id_usuario: certificado.id_usuario,
				id_certificado: certificado.id,
				cpf: certificado.cpf_cnpj,
				nome_completo: certificado.nome,
				curso: certificado.curso,
				data_emissaoDoDiploma: certificado.data_emissaoDoDiploma,
				numero_livro: certificado.numero_livro,
				numero_pagina: certificado.numero_pagina,
				numero_registro: certificado.numero_registro,
				data_local: certificado.data_local
			});
			return
		}

		this.setState({
			id_usuario: 0,
			id_certificado: 0,
			cpf: "",
			nome_completo: "",
			curso: "",
			data_emissaoDoDiploma: "",
			numero_livro: 0,
			numero_pagina: 0,
			numero_registro: 0,
			data_local: "",
		});
	}

	handlerCloseModalGerarCertificado() {
		this.setModalShowGerarCertificado(false);
		this.setState({ success: '', error: '' });
	};

	setModalShowVisualizarCertificado(valor) {
		this.setState({ modalShowVisualizarCertificado: valor });
	}

	handlerShowModalVisualizarCertificado(certificado) {
		this.setModalShowVisualizarCertificado(true);
		console.log(certificado);
		this.setState({
			id_certificado: certificado.id,
			nome_completo: certificado.nome,
			curso: certificado.curso,
			data_emissaoDoDiploma: certificado.data_emissaoDoDiploma,
			numero_livro: certificado.numero_livro,
			numero_pagina: certificado.numero_pagina,
			numero_registro: certificado.numero_registro,
			data_local: certificado.data_local,
			codigo_validacao: certificado.codigo_validacao,
			linkDoCertificado: `https://www.gestorgruponexus.com.br/validacao_certificado`
		});
	}

	handlerCloseModalVisualizarCertificado() {
		this.setModalShowVisualizarCertificado(false);
		this.setState({ success: '', error: '' });
	};

	setModalShowVisualizarAta(valor) {
		this.setState({ modalShowVisualizarAta: valor });
	}

	handlerShowModalVisualizarAta(banca) {
		if (banca.presidente !== null && banca.membro_externo !== null &&
			banca.membro_interno !== null && banca.titulo_dissertacao !== null &&
			banca.quant_pag !== null && banca.status_ata !== null) {
			this.setModalShowVisualizarAta(true);
			this.setState({
				presidente: banca.orientador,
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
				link_ata: banca.link,
				assinatura_membroInterno: banca.assinatura_membroInterno,
				assinatura_presidente: banca.assinatura_presidente,
				assinatura_membroExterno: banca.assinatura_membroExterno,
				id_curso: banca.id_curso,
				data_horaPrevista: banca.data_horaPrevista,
				dtCadAta: banca.dtCadAta,
				dataFormatAmericano: banca.dataFormatAmericano
			});
		}
	}

	handlerCloseModalVisualizarAta() {
		this.setModalShowVisualizarAta(false);
		this.setState({
			success: '', error: ''
		})
	};


	cadastrarCiclo = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		const nomeCiclo = 'CICLO - ';
		const mesEAnoCiclo = this.state.mesEAnoCiclo;
		if (!mesEAnoCiclo) {
			this.setState({ error: 'Por favor, preencher todos os campos.' });
		} else {
			try {
				const response = await fetch(`${api.baseURL}/ciclos`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					},
					body: JSON.stringify({
						nome: nomeCiclo + mesEAnoCiclo
					}),
				});

				const data = await response.json();
				console.log(data)

				if (data.status === 200) {
					this.listaCiclos(getToken());
					this.setState({ success: data.msg });
				}

				if (data.status === 400) {
					this.setState({ error: data.msg });
				}
			} catch (error) {
				this.setState({ error: 'Ocorreu um erro' });
			}
		}
	};

	listaCiclos = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/ciclos`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token,
				},
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ arrayCiclos: data.resultados });
			}

			if (data.permissoes === false) {
				logout();
				this.props.history.push("/");
			}
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	carregarArquivoListaAlunos = (e) => {
		e.preventDefault();
		console.log(e.target.files);
		if (e.target.files) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				const workbook = xlsx.read(data, { type: "array", cellDates: true, });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = xlsx.utils.sheet_to_json(worksheet);
				this.setState({ arquivoListaAlunos: json });
				this.cadastrarListaDeAlunos(getToken());
				console.log(json);
			};
			reader.readAsArrayBuffer(e.target.files[0]);
		}
	}

	exportarTabelaParaXlsx = (csvData, fileName) => {
		const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
		const fileExtension = '.xlsx';
		const worksheet = xlsx.utils.json_to_sheet(csvData);
		const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	}

	cadastrarListaDeAlunos = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/alunos`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				},
				body: JSON.stringify({
					alunos: this.state.arquivoListaAlunos,
					id_ciclo: this.state.id_ciclo,
					tipoAluno: 1
				}),
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeAlunosPorCiclos(getToken(), this.state.id_ciclo, 0, this.state.pesqNomeAluno !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno !== "" ? this.state.pesqInstituicaoAluno : "");
				this.setState({ displaySpinner: 'none' })
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			this.setState({ error: 'Ocorreu um erro' });
		}
	}

	check_solicicitacao = (e) => {
		console.log(e);
		this.setState({ solicitacao: e });
	}

	cadastrarEatualizarAluno = async (e) => {
		e.preventDefault();
		try {
			let id_ciclo = this.state.id_ciclo;
			let id_aluno = this.state.id_aluno;
			let nome = this.state.nomeAluno;
			let dataNascimento = this.state.data_nascimento;
			let rg = this.state.rg;
			let cpf = this.state.cpf;
			let nacionalidade = this.state.nacionalidade;
			let naturalidade = this.state.naturalidade;
			let pai = this.state.pai;
			let mae = this.state.mae;
			let situacaoTurma = this.state.situacaoTurma;
			let turma = this.state.turma;
			let instituicao = this.state.instituicaoAluno;
			let solicitacao = this.state.solicitacao;
			let url = id_aluno !== 0 ? `${api.baseURL}/alunos/${id_aluno}` : `${api.baseURL}/alunos`;
			let method = id_aluno !== 0 ? `PUT` : `POST`;

			if (nome.length !== 0) {
				const response = await fetch(url, {
					method: method,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					},
					body: id_aluno === 0 ? JSON.stringify({
						alunos: [{
							nome,
							dataNascimento,
							rg,
							cpf,
							nacionalidade,
							naturalidade,
							pai,
							mae,
							situacaoTurma,
							turma,
							nomeInstituicao: instituicao,
							solicitacao: solicitacao
						}],
						id_ciclo,
						tipoAluno: 1

					}) : JSON.stringify({
						nome,
						dataNascimento,
						rg,
						cpf,
						nacionalidade,
						naturalidade,
						pai,
						mae,
						situacaoTurma,
						turma,
						nomeInstituicao: instituicao,
						solicitacao: solicitacao,
						tipoAluno: 1
					})
				});

				const data = await response.json();
				if (data.status === 200) {
					this.setState({ success: data.msg });
					this.listaDeAlunosPorCiclos(getToken(), this.state.id_ciclo, 0, this.state.pesqNomeAluno !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno !== "" ? this.state.pesqInstituicaoAluno : "");
					this.setState({ displaySpinner: 'none' })
				}

				if (data.status === 400) {
					this.setState({ error: data.msg });
				}
			} else {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
			}
		} catch (error) {
			//this.setState({ error: 'Ocorreu um erro' });
		}
	}

	listaDeAlunosPorCiclos = async (token, idCiclo = "", paginacao = 0, nomeAluno = "", nomeInstituicao = "", dataDiario = "") => {
		try {
			const response = await fetch(
				`${api.baseURL}/ciclos/${token}/alunos?idCiclo=${idCiclo}&paginacao=${paginacao}&nome=${nomeAluno}&instituicao=${nomeInstituicao}&data_diario=${dataDiario}`,
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
					this.setState({
						listaAlunosCheckList: data.resultados, listaAlunosEPendencias: data.resultados,
						quantidade_alunos: data.quant_alunosCiclo, quantidade_alunosCertImp: data.quantidade_alunosCertImp,
						percentual_alunosCertImp: data.percentual_alunosCertImp,
						quant_decImp: data.quant_decImp,
						perc_decImp: data.perc_decImp,
						quant_carimbos: data.quant_carimbos,
						perc_carimbos: data.perc_carimbos,
						quant_selos: data.quant_selos,
						perc_selos: data.perc_selos,
						quant_assinaturas: data.quant_assinaturas,
						perc_assinaturas: data.perc_assinaturas,
						quant_listaImpresso: data.quant_listaImpresso,
						perc_listaImpresso: data.perc_listaImpresso,
						quant_etiquetaImpresso: data.quant_etiquetaImpresso,
						perc_etiquetaImpresso: data.perc_etiquetaImpresso
					});
					this.listaDePendenciasPorCiclos(getToken(), this.state.id_ciclo);
					this.listaDePendenciasPorUnidades(getToken(), this.state.id_ciclo);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	listaDePendenciasPorCiclos = async (token, idCiclo = "", pesqNomeAluno = "", pesqInstituicaoAluno = "") => {
		try {
			const response = await fetch(
				`${api.baseURL}/ciclos/${token}/pendencias?idCiclo=${idCiclo}&pesqNomeAluno=${pesqNomeAluno}&pesqInstituicao=${pesqInstituicaoAluno}`,
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
			console.log(data.resultados);
			if (data.status === 200) {
				this.setState({ listaPendenciasDoCiclo: data.resultados });
			}

			//console.log(data);
		} catch (error) {
			//console.log(error);
		}

	};

	listaDePendenciasPorUnidades = async (token, idCiclo = "") => {
		try {
			const response = await fetch(
				`${api.baseURL}/ciclos/${token}/pendenciasPorUnidade?idCiclo=${idCiclo}`,
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
			console.log(data.resultados);
			if (data.status === 200) {
				this.setState({ arrayPendenciasPorUnidades: data.resultados });
			}

			console.log(data);
		} catch (error) {
			//console.log(error);
		}

	};

	checkedEtapaAtualDoProcessoDeCertificacaoDoAluno = async (id_aluno, checked, value) => {
		this.setState({ checked: checked })
		try {
			const response = await fetch(`${api.baseURL}/checklist/${id_aluno}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken(),
				},
				body: JSON.stringify({
					id_ciclo: this.state.id_ciclo,
					id_aluno,
					checked,
					value,
					arrayIdsAlunos: []
				}),
			});

			const data = await response.json();

			if (parseInt(data.status) === 200) {
				this.listaDeAlunosPorCiclos(getToken(), this.state.id_ciclo, 0, this.state.pesqNomeAluno !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno !== "" ? this.state.pesqInstituicaoAluno : "")
				this.setState({ success: data.msg });
			}

			if (parseInt(data.status) === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	onChangeCheckedItensAlunosProcessoDeCertificacao = (checked) => {
		let arrayChecked = this.state.arrayCheckedItensAlunosProcessoDeCertificacao;

		if (arrayChecked.indexOf(checked) === -1) {
			arrayChecked.push(checked);
		} else {
			arrayChecked.splice(arrayChecked.indexOf(checked), 1);
		}
		this.setState({ arrayCheckedItensAlunosProcessoDeCertificacao: arrayChecked });
	}

	checkedListDosAlunosProcessoDeCertificacao = async (e) => {
		e.preventDefault();
		try {
			if (this.state.listRowSelectedsChecklist.length > 0 && this.state.arrayCheckedItensAlunosProcessoDeCertificacao.length > 0) {
				const response = await fetch(`${api.baseURL}/checklist/${getToken()}`, {
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken(),
					},
					body: JSON.stringify({
						arrayIdsAlunos: this.state.listRowSelectedsChecklist,
						checkeds: this.state.arrayCheckedItensAlunosProcessoDeCertificacao,
						desmarcarTodosOsItensMarcados: this.state.desmarcarTodosOsItensMarcados
					}),
				});

				const data = await response.json();
				console.log(data)

				if (parseInt(data.status) === 200) {
					this.state.listRowSelectedsChecklist.map(id => {
						document.querySelector('.rowCheck_' + id).classList.remove('bg-primary');
					});
					this.listaDeAlunosPorCiclos(getToken(), this.state.id_ciclo, 0, this.state.pesqNomeAluno !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno !== "" ? this.state.pesqInstituicaoAluno : "")
					this.setState({ success: data.msg, listRowSelectedsChecklist: [], contRowsChecklist: 0 });

				}

				if (parseInt(data.status) === 400) {
					this.setState({ error: data.msg });
				}
			} else {
				this.setState({ error: "Selecione uma opção, antes de confirmar!" });
			}
		} catch (error) {
			console.log(error);
		}
	}

	registrarObservacao = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		const id_aluno = this.state.id_aluno;
		const observacao = this.state.observacao;
		try {
			const response = await fetch(`${api.baseURL}/checklist/${id_aluno}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken(),
				},
				body: JSON.stringify({
					id_aluno: id_aluno,
					observacao,
					checked: '',
					arrayIdsAlunos: []
				})
			});

			const data = await response.json();
			console.log(data)

			if (parseInt(data.status) === 200) {
				this.listaDeAlunosPorCiclos(getToken(), this.state.id_ciclo, 0, this.state.pesqNomeAluno !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno !== "" ? this.state.pesqInstituicaoAluno : "")
				this.setState({ success: data.msg, listRowSelectedsChecklist: [], contRowsChecklist: 0 });
				let rowSelected = document.querySelector('.rowCheck_' + this.state.id_aluno);
				rowSelected.classList.remove('bg-primary');
			}

			if (parseInt(data.status) === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	cadastrarPendencia = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		const nomePendencia = this.state.nomePendencia
		if (!nomePendencia) {
			this.setState({ error: 'Por favor, preencher todos os campos.' });
		} else {
			try {
				const response = await fetch(`${api.baseURL}/pendencias`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					},
					body: JSON.stringify({
						nome: nomePendencia.toLocaleUpperCase()
					}),
				});

				const data = await response.json();
				console.log(data)

				if (data.status === 200) {
					this.setState({ success: data.msg });
					this.listaPendencias(getToken());
				}

				if (data.status === 400) {
					this.setState({ error: data.msg });
				}
			} catch (error) {
				this.setState({ error: 'Ocorreu um erro' });
			}
		}
	};

	listaPendencias = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/pendencias`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token,
				},
			});

			const data = await response.json();
			//console.log(data);
			if (data.status === 200) {
				this.setState({ listaPendencias: data.resultados });
			}

			if (data.permissoes === false) {
				logout();
				this.props.history.push("/");
			}

		} catch (error) {
			console.log(error);
		}
	};


	clickRow = (aluno) => {
		console.log(aluno);
		this.setState({ id_aluno: aluno.id_usuario, nomeAluno: aluno.nome });
		const id = aluno.id_usuario;
		let rowSelected = document.querySelector('.rowCheck_' + id);
		rowSelected.classList.add('bg-primary');
		let listRowSelectedsChecklist = this.state.listRowSelectedsChecklist;
		let indexRowSelected = listRowSelectedsChecklist.indexOf(id);
		let contRowsChecklist = this.state.contRowsChecklist;

		if (indexRowSelected === -1) {
			listRowSelectedsChecklist.push(id);
			contRowsChecklist = this.state.contRowsChecklist += 1;
			this.setState({ listRowSelectedsChecklist: listRowSelectedsChecklist, contRowsChecklist: contRowsChecklist })
		} else {
			listRowSelectedsChecklist.splice(indexRowSelected, 1);
			rowSelected.classList.remove('bg-primary');
			contRowsChecklist = this.state.contRowsChecklist -= 1;
			this.setState({ listRowSelectedsChecklist: listRowSelectedsChecklist, contRowsChecklist: contRowsChecklist })
		}

		console.log(listRowSelectedsChecklist);

	}

	registrarDataDoDiario = async (e) => {
		e.preventDefault();

		this.setState({ success: '', error: '' });
		let arrayIdsAlunos = this.state.listRowSelectedsChecklist;
		let data_diario = this.state.data_diario;

		try {
			if (data_diario !== "") {
				const response = await fetch(`${api.baseURL}/checklist/${getToken()}/dataDiario`, {
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					},
					body: JSON.stringify({
						arrayIdsAlunos,
						data_diario
					})
				});

				const data = await response.json();
				console.log(data);

				if (data.status === 200) {
					this.state.listRowSelectedsChecklist.map(id => {
						document.querySelector('.rowCheck_' + id).classList.remove('bg-primary');
					})
					this.setState({ success: data.msg, listRowSelectedsChecklist: [], contRowsChecklist: 0, marcaTodosOsItensDoChecklist: 0 });
					this.listaDeAlunosPorCiclos(getToken(), this.state.id_ciclo, 0, this.state.pesqNomeAluno !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno !== "" ? this.state.pesqInstituicaoAluno : "")
				}
			} else {
				this.setState({ error: "Por favor, preencher campo de data!" });
			}

		} catch (error) {
			this.setState({ error: 'Ocorreu um erro' });
		}
	}

	limparFiltro = () => {
		this.setState({ pesqNomeAluno: '', pesqInstituicaoAluno: '', data_diario: '' });
		document.getElementById('pesqNomeAluno').value = '';
		document.getElementById('pesqInstituicaoAluno').value = '';
		document.getElementById('pesqDtDiario').value = '';
		this.listaDeAlunosPorCiclos(getToken(), this.state.id_ciclo, 0, "", "");
	}

	excluirCiclo = async (token, idCiclo) => {
		try {
			const response = await fetch(
				`${api.baseURL}/ciclos/${idCiclo}`,
				{
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': token,
					},
					body: JSON.stringify({
						idCiclo
					}),
				}
			);

			const data = await response.json();
			if (data.status === 200) {
				console.log(data);
				this.handlerCloseModalEditarCiclo();
				this.listaCiclos(getToken());
			}

			//console.log(data);
		} catch (error) {
			//console.log(error);
		}
	}

	setModalShowCadastrarEvento(valor) {
		this.setState({ modalShowCadastrarEvento: valor, error: '', temaEvento: '', dataEventoInicial: '', dataEventoFinal: '' });
	}

	handlerShowModalCadastrarEvento() {
		this.setModalShowCadastrarEvento(true);
	}

	handlerCloseModalCadastrarEvento() {
		this.setModalShowCadastrarEvento(false);
	};

	setModalShowEditarEvento(valor) {
		this.setState({ modalShowEditarEvento: valor, success: '', error: '', arquivoDeMembros: 0, arrayMembrosDoEvento: [] });
	}

	handlerShowModalEditarEvento(evento) {
		this.setState({ id_evento: evento.id, temaEvento: evento.tema });
		this.setModalShowEditarEvento(true);
		this.listaDeMembrosPorEvento(getToken(), evento.id);
	}

	handlerCloseModalEditarEvento() {
		this.setModalShowEditarEvento(false);
	};

	setModalShowAdicionarLiderDoGrupoDeTrabalho(valor) {
		this.setState({ modalShowLiderDoGrupoDeTrabalho: valor });
	}

	handlerShowModalLiderDoGrupoDeTrabalho(evento) {
		this.setModalShowAdicionarLiderDoGrupoDeTrabalho(true);
		this.setState({ id_evento: evento.id });
		this.listaDeUsuarios(getToken());
		this.listaDeGruposDeTrabalho(evento.id);
		this.listaDeLideresDoGrupoDeTrabalho(evento.id);
	}

	handlerCloseModalLiderDoGrupoDeTrabalho() {
		this.setModalShowAdicionarLiderDoGrupoDeTrabalho(false);
		this.setState({ success: '', error: '' });
	};


	setModalShowEditarCertificado(valor) {
		this.setState({ modalShowEditarCertificado: valor, success: '', error: '' });
	}

	handlerShowModalEditarCertificado(membro) {
		console.log(membro);
		this.setModalShowEditarCertificado(true);
		this.setState({
			cpfMembro: membro.cpf,
			nomeMembro: membro.nome_completo,
			codigo_validacao: membro.codigo_validacao,
			dataEventoInicial: membro.dataEventoInicial,
			dataEventoFinal: membro.dataEventoFinal,
			carga_horaria: membro.carga_horaria
		});
	}

	handlerCloseModalEditarCertificado() {
		this.setModalShowEditarCertificado(false);
	};


	cadastrarEvento = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });

		let tema = this.state.temaEvento;
		let dataEventoInicial = this.state.dataEventoInicial;
		let dataEventoFinal = this.state.dataEventoFinal;
		let carga_horaria = parseInt(this.state.carga_horaria);

		if (!tema || !dataEventoInicial || !dataEventoFinal || !carga_horaria) {
			this.setState({ error: 'Por favor, preencher todos os campos.' });
		} else {
			try {
				const response = await fetch(`${api.baseURL}/eventos`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					},
					body: JSON.stringify({
						tema,
						dataEventoInicial,
						dataEventoFinal,
						carga_horaria
					}),
				});

				const data = await response.json();
				console.log(data);

				if (data.status === 200) {
					this.setState({ success: data.msg });
					this.listaDeEventos(getToken());
				}

				if (data.status === 400) {
					this.setState({ error: data.msg });
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	listaDeEventos = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/eventos`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token,
				},
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ arrayEventos: data.resultados });
			}

			if (data.permissoes === false) {
				logout();
				this.props.history.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	excluirEvento = async (token, id_evento) => {
		this.setState({ arquivoDeMembros: [] });

		try {
			const response = await fetch(
				`${api.baseURL}/eventos/${id_evento}`,
				{
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': token,
					},
					body: JSON.stringify({
						id_evento
					}),
				}
			);

			const data = await response.json();
			if (data.status === 200) {
				console.log(data);
				this.handlerCloseModalEditarEvento();
				this.listaDeEventos(getToken());
			}

			//console.log(data);
		} catch (error) {
			//console.log(error);
		}
	}


	importarArquivoDeMembros = (e) => {
		e.preventDefault();
		console.log(e.target.files);
		if (e.target.files) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				const workbook = xlsx.read(data, { type: "array", cellDates: true, });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = xlsx.utils.sheet_to_json(worksheet);

				//Gerando código de validação do certificado
				let codigosDeValidacao = [];

				json.length > 0 ?
					json.map(() => codigosDeValidacao.push(uuid())) :
					json.map(() => codigosDeValidacao.push(0));

				this.setState({ arquivoDeMembros: json, arrayCodigosDeValidacao: codigosDeValidacao });
				this.cadastrarListaDeMembros(getToken());

			};
			reader.readAsArrayBuffer(e.target.files[0]);
		}

	}

	cadastrarListaDeMembros = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/membros`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				},
				body: JSON.stringify({
					membros: this.state.arquivoDeMembros,
					id_evento: this.state.id_evento,
					codigosDeValidacao: this.state.arrayCodigosDeValidacao
				}),
			});

			const data = await response.json();
			//console.log(data)

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeMembrosPorEvento(getToken(), this.state.id_evento)
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeMembrosPorEvento = async (token, idEvento = "") => {
		try {
			const response = await fetch(
				`${api.baseURL}/eventos/${token}/membros?idEvento=${idEvento}`,
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
			console.log(data);
			if (data.status === 200) {
				if (data.resultados.length > 0) {
					this.setState({ arrayMembrosDoEvento: data.resultados });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	listaDeTesesEDissertacoes = async () => {
		try {
			const response = await fetch(`${api.baseURL}/documentos`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();
			console.log(data);
			if (data.status === 200) {
				this.setState({ arrayTesesEDissertacoes: data.resultados });
			}

			if (data.permissoes === false) {
				logout();
				this.props.history.push("/");
			}

		} catch (error) {
			console.log(error);
		}
	};

	atualizarTesesEDissertacoes = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });

		const id_documento = this.state.id_documento;
		const autor = this.state.autor;
		const titulo = this.state.titulo;
		const tituloEmOutroIdioma = this.state.tituloEmOutroIdioma;
		const id_orientador = this.state.idOrientador;
		const id_tipoDocumento = this.state.idTipoDocumento;
		const data_defesa = this.state.dataDefesa;
		const resumo = this.state.resumo;
		const idioma = this.state.idioma;
		const descricao = this.state.descricaoDoArquivo;
		const url = this.state.url;
		const idAreaConcentracao = this.state.idAreaConcentracao;
		const idLinhaPesquisa = this.state.idLinhaPesquisa;

		if (!titulo || !tituloEmOutroIdioma || !id_orientador || !id_tipoDocumento || !data_defesa ||
			!resumo || !idioma || !descricao || !idAreaConcentracao
			|| !idLinhaPesquisa) {
			this.setState({ error: 'Por favor, preencher todos os campos.' });
		} else {
			try {
				const response = await fetch(`${api.baseURL}/documentos/${id_documento}`, {
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken(),
					},
					body: JSON.stringify({
						autor,
						titulo,
						tituloEmOutroIdioma,
						id_orientador,
						id_tipoDocumento,
						data_defesa,
						resumo,
						idioma,
						descricao,
						url,
						id_linhaPesquisa: idLinhaPesquisa
					})
				});

				const data = await response.json();

				if (parseInt(data.status) === 200) {
					this.setState({ success: data.msg });
					this.listaDeTesesEDissertacoes();
				}

				if (parseInt(data.status) === 400) {
					this.setState({ error: data.msg });
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	marcaOuDesmarcaTodosOsItensDoChecklist = (checked) => {
		let listRowSelectedsChecklist = this.state.listRowSelectedsChecklist;
		let listaAlunosCheckList = this.state.listaAlunosCheckList;

		if (listRowSelectedsChecklist.length === 0) {
			listaAlunosCheckList.map(item => {
				document.querySelector('.rowCheck_' + item.id_usuario).classList.add('bg-primary');
				listRowSelectedsChecklist.push(item.id_usuario);
			});
			this.setState({ CheckedTodosChecklist: 1, contRowsChecklist: listaAlunosCheckList.length, listRowSelectedsChecklist: listRowSelectedsChecklist });
			//console.log(this.state.listRowSelectedsChecklist);
			return
		}
		listaAlunosCheckList.map((item) => {
			document.querySelector('.rowCheck_' + item.id_usuario).classList.remove('bg-primary');
			listRowSelectedsChecklist.pop();
		});

		this.setState({ CheckedTodosChecklist: 0, contRowsChecklist: 0, listRowSelectedsChecklist: listRowSelectedsChecklist });
		//console.log(this.state.listRowSelectedsChecklist);

	}


	atualizarcheckedAlunoXPendencia = async (id, value) => {
		console.log(id, value);
		try {
			const response = await fetch(`${api.baseURL}/alunoxpendencia/${id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken(),
				},
				body: JSON.stringify({
					status: value
				}),
			});

			const data = await response.json();
			console.log(data)

			if (parseInt(data.status) === 200) {
				this.setState({ success: data.msg });
				this.listaDePendenciasPorCiclos(getToken(), this.state.id_ciclo, this.state.pesqNomeAluno.length !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno.length !== "" ? this.state.pesqInstituicaoAluno : "")
				this.listaDePendenciasPorUnidades(getToken(), this.state.id_ciclo);
			}

			if (parseInt(data.status) === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	capitalizar = (str) => {
		return str.length > 0 ? str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); })
			: "";
	}

	listaDeBancas = async (token, id_tipoBanca, id_areaConcentracao) => {
		try {
			const response = await fetch(`${api.baseURL}/bancas?tipo_banca=${id_tipoBanca}&id_areaConcentracao=${id_areaConcentracao}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': token
					},
				}
			);

			const data = await response.json();
			console.log(data);

			if (data.status === 200) {
				//Bancas de qualificação de educação
				if (data.id_tipoBanca === 1 && data.id_areaConcentracao === 1) {
					this.setState({ array_bancasQE: data.resultados })
				}

				//Bancas de defesa de educação
				if (data.id_tipoBanca === 2 && data.id_areaConcentracao === 1) {
					this.setState({ array_bancasDE: data.resultados })
				}

				//Bancas de qualificação de teologia
				if (data.id_tipoBanca === 1 && data.id_areaConcentracao === 2) {
					this.setState({ array_bancasQT: data.resultados })
				}

				//Bancas de defesa de teologia
				if (data.id_tipoBanca === 2 && data.id_areaConcentracao === 2) {
					this.setState({ array_bancasDT: data.resultados })
				}
			}

		} catch (error) {
			console.log(error);
		}
	};

	onChangeValorDaTaxaDeQual = (v) => {
		v = v.replace(/\D/g, '');
		v = v.replace(/(\d{1,2})$/, ',$1');
		v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
		this.setState({ valorTaxaBanca: v });
	}

	atualizarOrientando = async (e, id_orientando, dt_confirmacaoTaxaQ = "", status_confirmacaoBancaQ = "", dt_confirmacaoTaxaD = "", status_confirmacaoBancaD = "", observacao = "") => {
		e.preventDefault();

		try {
			const response = await fetch(`${api.baseURL}/orientandos/${id_orientando}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken(),
				},
				body: JSON.stringify({
					id_usuario: 0, id_orientando,
					dt_confirmacaoTaxaQ, status_confirmacaoBancaQ, dt_confirmacaoTaxaD,
					status_confirmacaoBancaD, observacao
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg, error: "" });
				listaDeOrientandos(getToken(), 1).then(result => this.setState({ array_orientandosE: result }));
				listaDeOrientandos(getToken(), 2).then(result => this.setState({ array_orientandosT: result }));
				this.listaDeBancas(getToken(), 1, 1);
				this.listaDeBancas(getToken(), 2, 1);
				this.listaDeBancas(getToken(), 1, 2);
				this.listaDeBancas(getToken(), 2, 2);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg, success: "" });
			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeUsuarios = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/usuarios`,
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
			if (data.status === 200) {

				const arrayUsuarios = [];
				data.resultados.map(usuario => {
					arrayUsuarios.push({ value: usuario.id, label: usuario.email });
				});
				this.setState({ arrayUsuarios });
			}
		} catch (error) {
			console.log(error);
		}
	};

	listaDeGruposDeTrabalho = async (id_evento) => {
		try {
			this.setState({ id_evento });
			console.log(id_evento);

			const response = await fetch(
				`${api.baseURL}/eventos/${id_evento}/grupos_trabalho`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
				}
			);

			const data = await response.json();
			console.log(data);
			if (data.status === 200) {
				if (data.resultados.length > 0) {
					this.setState({ array_gruposTrabalho: data.resultados });
					return
				}
				this.setState({ array_gruposTrabalho: [] });
			}
		} catch (error) {
			console.log(error);
		}
	};


	cadastrarLiderGrupoDeTrabalho = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });

		const { arraySelectedLiderGt, id_grupoTrabalho, id_evento } = this.state;

		if (!arraySelectedLiderGt || !id_grupoTrabalho) {
			this.setState({ error: 'Por favor, preencher todos os campos.' });
		} else {
			try {
				const response = await fetch(`${api.baseURL}/lider_gt`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					},
					body: JSON.stringify({
						id_usuario: arraySelectedLiderGt.value, id_grupoTrabalho, id_evento
					}),
				});

				const data = await response.json();

				if (data.status === 200) {
					this.setState({ success: data.msg });
					this.listaDeLideresDoGrupoDeTrabalho(this.state.id_evento);
				}

				if (data.status === 400) {
					this.setState({ error: data.msg });
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	listaDeLideresDoGrupoDeTrabalho = async (id_evento) => {
		try {
			this.setState({ id_evento });
			console.log(id_evento);

			const response = await fetch(
				`${api.baseURL}/eventos/${id_evento}/lider_gt`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
				}
			);

			const data = await response.json();
			console.log(data);
			if (data.status === 200) {
				this.setState({ array_lideresGt: data.resultados });
			}
		} catch (error) {
			console.log(error);
		}
	};


	atualizarSolicitacao = async (e, id_status, id_solicitacao, email, tipo) => {
		e.preventDefault();

		try {
			const response = await fetch(`${api.baseURL}/solicitacao/${id_solicitacao}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken(),
				},
				body: JSON.stringify({
					id_status, email, tipo
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				listaDeSolicitacoes(getToken()).then(result => this.setState({ array_solicitacoes: result, id_status }));
			}

			if (data.status === 400) {
				this.setState({ error: data.msg, success: "" });
			}
		} catch (error) {
			console.log(error);
		}
	}


	cadastrarEatualizarCertificado = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });

		const { id_certificado, id_usuario, cpf, nome_completo, curso, data_emissaoDoDiploma,
			numero_livro, numero_pagina, numero_registro, data_local } = this.state;

		if (!cpf || !nome_completo || !curso || !data_emissaoDoDiploma ||
			!numero_livro || !numero_pagina || !numero_registro || !data_local) {
			this.setState({ error: 'Por favor, preencher todos os campos.' });
		} else {
			const url = id_certificado === 0 ? `${api.baseURL}/certificados` : `${api.baseURL}/certificados/${id_certificado}`
			try {
				const response = await fetch(url, {
					method: id_certificado === 0 ? 'POST' : 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					},
					body: JSON.stringify(id_certificado === 0 ? {
						cpf, nome_completo, curso, codigo_validacao: uuid(),
						data_emissaoDoDiploma, numero_livro, numero_pagina, numero_registro, data_local
					} : {
						id_usuario, cpf, nome_completo, curso,
						data_emissaoDoDiploma, numero_livro, numero_pagina, numero_registro, data_local
					})
				});

				const data = await response.json();

				if (data.status === 200) {
					this.setState({ success: data.msg });
					this.listaDeCertificados(getToken());
				}

				if (data.status === 400) {
					this.setState({ error: data.msg });
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	listaDeCertificados = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/certificados`,
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
			if (data.status === 200) {
				this.setState({ arrayCertificados: data.resultados });
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const ciclos = this.state.arrayCiclos;
		const listaAlunosCheckList = this.state.listaAlunosCheckList;
		const listaAlunosEPendencias = this.state.listaAlunosEPendencias;
		const pendencias = this.state.listaPendencias;
		const listaPendenciasDoAluno = this.state.listaPendenciasDoAluno;
		const listaPendenciasDoCiclo = this.state.listaPendenciasDoCiclo;
		const eventos = this.state.arrayEventos;
		const membros = this.state.arrayMembrosDoEvento;
		const listaPendenciasPorUnidades = this.state.arrayPendenciasPorUnidades;
		const array_bancasQE = this.state.array_bancasQE;
		const array_bancasDE = this.state.array_bancasDE;
		const array_bancasQT = this.state.array_bancasQT;
		const array_bancasDT = this.state.array_bancasDT;
		const listaDeStatus = this.state.array_status;
		const areas_concentracao = this.state.arrayAreaConcentracao;
		const linhasDePesquisas = this.state.arrayLinhasDePesquisas;
		const array_orientandosE = this.state.array_orientandosE;
		const array_orientandosT = this.state.array_orientandosT;
		const arrayUsuarios = this.state.arrayUsuarios;
		const array_gruposTrabalho = this.state.array_gruposTrabalho;
		const array_lideresGt = this.state.array_lideresGt;
		const array_solicitacoes = this.state.array_solicitacoes;
		const arrayCertificados = this.state.arrayCertificados;

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
										<button className='button' ></button>
										<a onClick={() => this.handlerShowModalCadastrarCiclo()}><FaPlus /> Cadastrar Ciclo</a>
									</li>
									<li>
										<a onClick={() => this.handlerShowModalCadastrarEvento()}><FaPlus /> Cadastrar evento</a>
									</li>
									<li>
										<a onClick={() => this.handlerShowModalGerarCertificado()}><FaPlus /> Gerar certificado</a>
									</li>
									{this.state.id_ciclo && (
										<li>
											<a onClick={() => this.handlerShowModalAdicionarAlunoCertificacao()}><FaUserGraduate /> Cadastrar Aluno</a>
										</li>
									)}
								</ul>
							</FloatingMenu>
							<div className="container-fluid">
								<Tabs
									variant="pills"
									defaultActiveKey="ciclos"
									id="panel-admin"
									className="justify-content-center"
								>
									<Tab
										eventKey="ciclos"
										title="Ciclos"
										style={{ marginTop: '30px' }}>
										<div className='container'>
											<div className="row">
												<div className="col-sm-12">
													<h3 className='text-light'><FaRedo /> Ciclos</h3>
												</div>
											</div>
											<hr />

											<div className="row">
												{ciclos.length > 0 ? (
													ciclos.map(ciclo => (
														<div className="col-sm-3">
															<Card key={ciclo.id} className="text-light text-center font-weight-bold zoom" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
																<Card.Header>{ciclo.nome}</Card.Header>
																<Card.Body>
																	<Card.Text>
																		<button className='btn btn-sm btn-dark' onClick={() => this.handlerShowModalEditarCiclo(ciclo)} title="Clique aqui para obter mais informações sobre o ciclo">Configurações</button>
																	</Card.Text>

																</Card.Body>
															</Card>
														</div>
													))
												) : (<Card style={{ width: '18rem' }}>
													<Card.Body>
														<Card.Title>Nenhum resultado encontrado</Card.Title>
													</Card.Body>
												</Card>)}
											</div>
										</div>
									</Tab>

									<Tab
										eventKey="eventos"
										title="Eventos"
										style={{ marginTop: '30px' }}>
										<div className='container'>
											<div className="row">
												<div className="col-sm-12">
													<h3 className='text-light'><FaLayerGroup /> Eventos</h3>
												</div>
											</div>
											<hr />
											<div className="table-responsive text-center">
												<table className="table table-light table-sm table-hover rounded">
													<thead>
														<tr>
															<th scope="col">Tema</th>
															<th>Data inical</th>
															<th>Data final</th>
															<th>Carga horária</th>
															<th>Ações</th>
														</tr>
													</thead>
													<tbody>
														{eventos.length > 0 ? (
															eventos.map(evento => (
																<tr key={evento.id} title="Clique aqui para obter mais informações sobre o evento">
																	<td className='align-middle'>{evento.tema}</td>
																	<td className='align-middle'>{evento.dataEventoInicial}</td>
																	<td className='align-middle'>{evento.dataEventoFinal}</td>
																	<td className='align-middle'>{evento.carga_horaria}hrs</td>
																	<td className='align-middle'><button className='btn btn-sm btn-dark btn-block' onClick={() => this.handlerShowModalEditarEvento(evento)}>Membros</button>
																		{parseInt(evento.grupo_trabalho) === 1 ? (<button className='btn btn-sm btn-dark btn-block' onClick={() => this.handlerShowModalLiderDoGrupoDeTrabalho(evento)}>Grupo de trabalho</button>) :
																			""}
																	</td>
																</tr>
															))
														) : (<tr className="text-center">
															<td colSpan="10">
																Nenhum evento encontrado
															</td>
														</tr>)}
													</tbody>
												</table>
											</div>
											{
												<div className="text-center font-weight-bold mt-3 mb-5 text-white">
													Total de Registros: {eventos.length}
												</div>
											}

										</div>
									</Tab>

									{/* <Tab
									eventKey="TesesEDissertacoes"
									title="Teses e dissertações"
									style={{ marginTop: '30px' }}
								>
									<div className='container'>
										<div className="row mt-4">
											<div className="col-sm-12">
												<h3 className='titulo'><FaExclamationTriangle /> Teses e dissertações</h3>
											</div>
										</div>

										<hr />

										<div className="table-responsive table-sm text-center">
											<table className="table table-bordered table-hover custom-table">
												<thead class="thead-light">
													<tr>
														<th>Autor</th>
														<th>Tipo</th>
														<th>defesa</th>
														<th>Orientador</th>
														<th>Link</th>
														<th>Data/hora Cad.</th>
														<th>Detalhes</th>
													</tr>
												</thead>
												<tbody>
													{TesesEDissertacoes.length > 0 ? (
														TesesEDissertacoes.map(documento => (
															<tr key={documento.id} title="Clique aqui para obter mais informações sobre o documento">
																<td>{documento.autor}</td>
																<td>{documento.tipo_documento}</td>
																<td>{documento.data_defesa}</td>
																<td>{documento.orientador}</td>
																<td><a href={documento.url} target="_blank">Baixar documento</a></td>
																<td>{documento.dataHoraCriacao}</td>
																<td><button className='button' onClick={() => this.handlerShowModalEditarTeseOuDissertacao(documento)}>Detalhes</button></td>
															</tr>
														))
													) : (<tr className="text-center">
														<td colSpan="10">
															Nenhum registro encontrado
														</td>
													</tr>)}
												</tbody>
											</table>
										</div>
										{
											<div className="text-center font-weight-bold mt-3 mb-5">
												Total de Registros: {TesesEDissertacoes.length}
											</div>
										}
									</div>

								</Tab> */}

									<Tab
										eventKey="bancas"
										title="Bancas"
										style={{ marginTop: '30px' }}>
										<div className='container'>
											<div className="row mt-4">
												<div className="col-sm-6">
													<h4 className='text-light text-center mb-4'><FaBookReader /> Bancas de educação</h4>
													<div className="row">
														<div className="col-sm-6">
															<Card className='text-light zoom' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
																<Card.Body className='text-center'>
																	<Card.Text className='font-weight-bold'><FaBookReader /> Qualificação</Card.Text>
																	<Card.Subtitle className='font-weight-bold'>Total: {array_bancasQE.length}</Card.Subtitle>
																	<button className='btn btn-sm btn-dark btn-block mt-2' onClick={() => this.handlerShowModalEditarBanca(1, 1)}><FaRegEdit /> Visualizar</button>
																</Card.Body>
															</Card>
														</div>
														<div className="col-sm-6">
															<Card className='text-light zoom' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
																<Card.Body className='text-center'>
																	<Card.Text className='font-weight-bold'><FaBookReader /> Defesa</Card.Text>
																	<Card.Subtitle className='font-weight-bold'>Total: {array_bancasDE.length}</Card.Subtitle>
																	<button className='btn btn-sm btn-dark btn-block mt-2' onClick={() => this.handlerShowModalEditarBanca(1, 2)}><FaRegEdit /> Visualizar</button>
																</Card.Body>
															</Card>
														</div>
													</div>

													<div className="row p-3">
														<div className="col-sm-12 d-flex justify-content-center">
															<Card className=' text-light zoom w-100' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
																<Card.Body className='text-center'>
																	<div className='row'>
																		<div className='col-sm'><h6 className='font-weight-bold'><FaBookReader /> Orientandos</h6></div>
																		<div className='col-sm'><h6 className='font-weight-bold'><FaBookReader /> Total: {array_orientandosE.length}</h6></div>
																	</div>
																	<button className='btn btn-sm btn-dark btn-block mt-2' onClick={() => this.handlerShowModalEditarOrientando(1)}><FaRegEdit /> Visualizar</button>
																</Card.Body>
															</Card>
														</div>
													</div>
												</div>
												<div className="col-sm-6">
													<h4 className='text-light text-center mb-4'><FaBookMedical /> Bancas de teologia</h4>
													<div className="row">
														<div className="col-sm-6">
															<Card className='text-light zoom' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
																<Card.Body className='text-center'>
																	<Card.Text className='font-weight-bold'><FaBookMedical /> Qualificação</Card.Text>
																	<Card.Subtitle className='font-weight-bold'>Total: {array_bancasQT.length}</Card.Subtitle>
																	<button className='btn btn-sm btn-dark btn-block mt-2' onClick={() => this.handlerShowModalEditarBanca(2, 1)}><FaRegEdit /> Visualizar</button>
																</Card.Body>
															</Card>
														</div>
														<div className="col-sm-6">
															<Card className='text-light zoom' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
																<Card.Body className='text-center'>
																	<Card.Text className='font-weight-bold'><FaBookMedical /> Defesa</Card.Text>
																	<Card.Subtitle className='font-weight-bold'>Total: {array_bancasDT.length}</Card.Subtitle>
																	<button className='btn btn-sm btn-dark btn-block mt-2' onClick={() => this.handlerShowModalEditarBanca(2, 2)}><FaRegEdit /> Visualizar</button>
																</Card.Body>
															</Card>
														</div>
													</div>

													<div className="row p-3">
														<div className="col-sm-12 d-flex justify-content-center">
															<Card className='text-light zoom w-100' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
																<Card.Body className='text-center'>
																	<div className='row'>
																		<div className='col-sm'><h6 className='font-weight-bold'><FaBookReader /> Orientandos</h6></div>
																		<div className='col-sm'><h6 className='font-weight-bold'><FaBookReader /> Total: {array_orientandosT.length}</h6></div>
																	</div>
																	<button className='btn btn-sm btn-dark btn-block mt-2' onClick={() => this.handlerShowModalEditarOrientando(2)}><FaRegEdit /> Visualizar</button>
																</Card.Body>
															</Card>
														</div>
													</div>
												</div>
											</div>
										</div>
									</Tab>

									<Tab
										eventKey="solicitacoes"
										title="Solicitações"
										style={{ marginTop: '30px' }}>
										<div className='container'>
											<h3 className='text-light'><FaLayerGroup /> Solicitações</h3>
											<hr />
											<div className="table-responsive text-center">
												<div class="table-wrapper">
													<table class="table table-light table-sm text-center table-hover border">
														<thead>
															<tr>
																<th scope="col">Solicitante</th>
																<th scope="col">Link do anexo</th>
																<th scope="col">Tipo</th>
																<th scope="col">Status</th>
																<th scope="col">Data/hora</th>
															</tr>
														</thead>
														<tbody>
															{array_solicitacoes.length > 0 ? (
																array_solicitacoes.map((solicitacao, index) => (
																	<tr key={index}>
																		<td>{solicitacao.solicitante}</td>
																		<td><a href={solicitacao.anexo} className='font-weight-bold'>Baixar</a></td>
																		<td>{solicitacao.tipo}</td>
																		<td>
																			<div class="form-group">
																				<select class="form-control form-control-sm" id="selectStatusSolicitacao"
																					value={solicitacao.id_status}
																					onChange={e => this.atualizarSolicitacao(e, e.target.value, solicitacao.id, solicitacao.email, solicitacao.tipo)}>
																					<option value="0">Selecionar</option>
																					{listaDeStatus.length > 0 ? (
																						listaDeStatus.map(item => (
																							item.id > 6 && item.id <= 9 ?
																								<option value={item.id}>{item.nome}</option> : ""
																						))
																					) : (
																						<option value="0">Nenhum resultado encontrado</option>
																					)}
																				</select>
																			</div>
																		</td>
																		<td>{solicitacao.dataHoraCriacao}</td>

																	</tr>
																))
															) : (<tr className="text-center">
																<td colSpan="10">
																	Nenhuma solicitação encontrada
																</td>
															</tr>)}
														</tbody>
													</table>
												</div>
											</div>
											{
												<div className="text-center font-weight-bold mt-3 mb-5 text-white">
													Total de Registros: {array_solicitacoes.length}
												</div>
											}

										</div>
									</Tab>

									<Tab
										eventKey="certificados_digitais"
										title="Certificados digitais"
										style={{ marginTop: '30px' }}>
										<div className='container'>
											<div className="row">
												<div className="col-sm-12">
													<h3 className='text-light'><FaLayerGroup /> Certificados digitais</h3>
												</div>
											</div>

											<hr />

											<div class="table-responsive text-center">
												<div class="table-wrapper">
													<div class="table-wrapper">
														<table class="table table-hover table-sm table-light">
															<thead>
																<tr>
																	<th scope="col">CPF</th>
																	<th scope="col">Nome</th>
																	<th scope="col">Curso</th>
																	<th scope="col">Código de válidação</th>
																	<th scope="col">Certificado</th>
																	<th scope="col">Link</th>
																	<th scope="col">Ações</th>
																</tr>
															</thead>
															<tbody>
																{arrayCertificados.length > 0 ? (
																	arrayCertificados.map((certificado, index) => (
																		<tr key={index}>
																			<td>{certificado.cpf_cnpj}</td>
																			<td>{certificado.nome}</td>
																			<td>{certificado.curso}</td>
																			<td>{certificado.codigo_validacao}</td>
																			<td><button className='btn btn-sm btn-dark mt-2' onClick={() => this.handlerShowModalVisualizarCertificado(certificado)}>Visualizar</button></td>
																			<td><a target='_blank' href={`https://www.gestorgruponexus.com.br/certificado_digital?codigo_validacao=${certificado.codigo_validacao}`}>Link de acesso</a></td>
																			<td><button className='btn btn-sm btn-dark mt-2' onClick={() => this.handlerShowModalGerarCertificado(certificado)}>Atualizar</button></td>
																		</tr>
																	))
																) : ("")}

															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</Tab>
								</Tabs>
							</div >
							{/* /.container-fluid */}
							<Modal
								show={this.state.modalShowCadastrarPendencia}
								onHide={() => this.handlerCloseModalCadastrarPendencia()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								centered
							>
								<Form onSubmit={this.cadastrarPendencia}>
									<Modal.Header closeButton>
										<Modal.Title id="contained-modal-title-vcenter" >
											<h3 className='titulo'><FaRegWindowClose /> Registrar uma nova pendência</h3>
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div className="row text-center border-bottom">
											<div className="col-md-12">
												<div className="form-group">
													<input class="form-control" type="text" id="inputNomePendencia" name="start"
														value={this.state.nomePendencia}
														onChange={e => this.setState({ nomePendencia: e.target.value })}
													/>
												</div>
											</div>
										</div>

										<div className="row">
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
										<button className='btn btn-outline-primary'>SIM</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowEditarAluno}
								onHide={() => this.handlerCloseModalEditarAluno()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered
							>
								<Form onSubmit={this.cadastrarPendencia}>
									<Modal.Header closeButton>
										<Modal.Title id="contained-modal-title-vcenter" className='text-center'>
											Informações do aluno
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div className="row text-center border-bottom">
											<div className="col-md-12">
												<div className="form-group">
													<input class="form-control" type="text" id="inputNomePendencia" name="start"
														value={this.state.nomePendencia}
														onChange={e => this.setState({ nomePendencia: e.target.value })}
													/>
												</div>
											</div>
										</div>

										<div className="row">
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
										<hr />

										<h3 className='titulo'>Lista de pendências do aluno</h3>
										<hr />
										<div className="table-responsive">
											<table className="table table-bordered table-hover text-center">
												<thead class="thead-light">
													<tr>
														<th scope="col">Id</th>
														<th scope="col">Pendência</th>
														<th scope="col">Data e hora de Cad.</th>
													</tr>
												</thead>
												<tbody>
													{listaPendenciasDoAluno.length > 0 ? (
														listaPendenciasDoAluno.map(pendencia => (
															<tr key={pendencia.id_pendencia}>
																<td>{pendencia.id_pendencia}</td>
																<td>{pendencia.pendencia}</td>
																<td>{pendencia.dataHoraCriacao}</td>
															</tr>
														))
													) : (<tr className="text-center">
														<td colSpan="10">
															<Spinner animation="border" />
														</td>
													</tr>)}
												</tbody>
											</table>
										</div>
										{
											<div className="text-center font-weight-bold mt-3 mb-5">
												Total de Registros:
											</div>
										}
									</Modal.Body>

								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowCadastrarCiclo}
								onHide={() => this.handlerCloseModalCadastrarCiclo()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								centered
							>
								<Form onSubmit={this.cadastrarCiclo}>
									<Modal.Header closeButton>
										<Modal.Title id="contained-modal-title-vcenter" className='text-center'>
											<FaCalendarWeek /> Selecione o mês do ciclo
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div className="row text-center border-bottom">
											<div className="col-md-12">
												<div className="form-group">
													<input class="form-control" type="month" id="inputMesEAno" name="start"
														min="2022-01" value={this.state.mesEAnoCiclo}
														onChange={e => this.setState({ mesEAnoCiclo: e.target.value })}
													/>
												</div>
											</div>
										</div>

										<div className="row text-center">
											<div className="col-md-12">
												<p>Tem certeza que deseja criar um novo ciclo ?</p>
											</div>
										</div>
										<div className="row">
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
										<button className='btn btn-outline-primary'>SIM</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowEditarCiclo}
								onHide={() => this.handlerCloseModalEditarCiclo()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								className='modal-fullscreen'>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek /> Processo de Certificação - {this.state.nomeCiclo}</h4>
								</Modal.Header>
								<Modal.Body>
									<div className='container'>
										<div class="row d-flex justify-content-center mt-4 mb-4">
											<div class="col-lg-4 col-lg-offset-4 text-center">
												<h3 className='titulo mb-4'><FaUserGraduate />Importar lista de alunos </h3>
												<form >
													<div class="custom-file">
														<input
															type="file"
															name="upload"
															id="upload"
															class="custom-file-input"
															onChange={this.carregarArquivoListaAlunos}
															accept=".xlsx"
															onClick={(e) => { e.currentTarget.value = null }}
														/>
														<label class="custom-file-label" for="customFileLang">Carregar lista de alunos</label>
													</div>
												</form>
											</div>
										</div>
										{/* {this.state.quantidade_alunos === 0 ? (
								) : (

								<div class="row d-flex justify-content-center mt-4 mb-4">
									<div class="col-lg-4 col-lg-offset-4 text-center">
										<button className='btn btn-sm btn-outline-danger' onClick={() => this.excluirCiclo(getToken(), this.state.id_ciclo)}><FaTrashAlt /> Excluir Ciclo</button>
									</div>
								</div>
							)} */}

										<div className="row text-center">
											<div className="col-sm-6 mb-2">
												<FaUsers style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
												<h5 className='titulo'>Total de alunos do ciclo</h5>
												<h6>{this.state.quantidade_alunos}</h6>
											</div>

											<div className="col-sm-6 border-left mb-3">
												<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
												<h5 className='titulo'>Total de alunos com pendências</h5>
												<h6>{listaPendenciasDoCiclo.length}</h6>
											</div>
										</div>


										<Tabs
											variant="pills"
											defaultActiveKey="checklist"
											transition={false}
											id="painel_certificacao"
											className="justify-content-center">

											<Tab
												eventKey="checklist"
												title="Checklist"
												style={{ marginTop: '30px' }}>
												<div className='container'>
													<div className="row text-center">
														<div className="col-sm-3 mb-2">
															<FaRegCreditCard style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
															<h5 className='titulo'>Total de certificados impressos </h5>
															<h6>{this.state.quantidade_alunosCertImp}</h6>
														</div>

														<div className="col-sm-3 border-left mt-2">
															<FaPercent style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
															<h5 className='titulo'>Percentual de certificados impressos</h5>
															<h6>{this.state.percentual_alunosCertImp}%</h6>
														</div>

														<div className="col-sm-3 border-left mb-2">
															<FaUserGraduate style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
															<h5 className='titulo'>Total de declarações Impressas </h5>
															<h6>{this.state.quant_decImp}</h6>
														</div>

														<div className="col-sm-3 border-left mt-2">
															<FaPercent style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
															<h5 className='titulo'>Percentual de declarações Impressas</h5>
															<h6>{this.state.perc_decImp}%</h6>
														</div>
													</div>

													<div className="row text-center">
														<div className="col-sm-3 border-left mb-2">
															<FaUserGraduate style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
															<h5 className='titulo'>Total de assinaturas </h5>
															<h6>{this.state.quant_assinaturas}</h6>
														</div>

														<div className="col-sm-3 border-left mt-2">
															<FaPercent style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
															<h5 className='titulo'>Percentual de assinaturas</h5>
															<h6>{this.state.perc_assinaturas}%</h6>
														</div>

														<div className="col-sm-3 border-left mb-2">
															<FaUserGraduate style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
															<h5 className='titulo'>Total de etiquetas impressas </h5>
															<h6>{this.state.quant_etiquetaImpresso}</h6>
														</div>

														<div className="col-sm-3 border-left mt-2">
															<FaPercent style={{ width: '30px', height: '30px', marginBottom: '10px', color: '#000233' }} />
															<h5 className='titulo'>Percentual de etiquetas impressas</h5>
															<h6>{this.state.perc_etiquetaImpresso}%</h6>
														</div>
													</div>

													<h4 className='lead'><FaFilter /> Filtros</h4>
													<hr />
													<div className='row'>
														<div className='col-md-4'>
															<div className="form-group">
																<label for="staticEmail2">Nome do aluno</label>
																<input class="form-control form-control-sm " type="text" id="pesqNomeAluno" name="start" placeholder='Nome'
																	onChange={e => this.setState({ pesqNomeAluno: e.target.value.trim() })}
																/>
															</div>
														</div>
														<div className='col-md-4'>
															<div className="form-group">
																<label for="staticEmail2">Instituição</label>
																<input class="form-control form-control-sm " type="text" id="pesqInstituicaoAluno" name="start" placeholder='Instituição'
																	onChange={e => this.setState({ pesqInstituicaoAluno: e.target.value.trim() })}
																/>
															</div>
														</div>

														<div className="col-md-4">
															<div className="form-group">
																<label for="staticEmail2">Data do diário</label>
																<input class="form-control form-control-sm" type="date" id="pesqDtDiario" name="start"
																	min="2022-01" value={this.state.data_diario}
																	onChange={e => this.setState({ data_diario: e.target.value })}
																/>
															</div>
														</div>
													</div>

													<div class="row d-flex justify-content-center mt-2 mb-2">
														<div class="col-lg-6 col-lg-offset-6 text-center">
															<div className="ml-auto">
																<button className='btn btn-sm btn-outline-primary input-group-btn ml-2' onClick={() => this.listaDeAlunosPorCiclos(getToken(), this.state.id_ciclo, 0, this.state.pesqNomeAluno !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno !== "" ? this.state.pesqInstituicaoAluno : "", this.state.data_diario !== "" ? this.state.data_diario : "")}>Buscar <FaSearch /> </button>
																<button className='btn btn-sm btn-outline-danger input-group-btn ml-2' onClick={() => this.limparFiltro()}><FaFilter /> Limpar Filtro</button>
																<button className='btn btn-sm btn-outline-primary' onClick={() => this.exportarTabelaParaXlsx(listaAlunosCheckList, "checklist")}>Exportar<FaFileExport /></button>
															</div>
														</div>
													</div>

													<div className="row">
														<div className="col-sm-12">
															{this.state.errorAlteracoes && (
																<div
																	className="alert alert-danger text-center"
																	role="alert"
																>
																	{this.state.errorAlteracoes}
																</div>
															)}
														</div>
													</div>
													<hr />
													<div class="card">
														<div class="card-header" style={{ backgroundColor: '#000233', color: '#ffffff' }}>
															Ações de Alteração
														</div>
														<div class="card-body">
															<div className='row justify-content-center'>
																<div className='col-md-3 mb-2'>
																	<button className='btn btn-outline-primary' onClick={() => this.handlerShowModalAlterarDataDiario()}><FaCalendarMinus /> Registrar Data do diário em lote</button>
																</div>
																<div className='col-md-3 mb-2'>
																	<button className='btn btn-outline-primary' onClick={() => this.handlerShowModalAdicionarObservacao()}><FaFileSignature /> Registrar uma nova Observação</button>
																</div>
																<div className='col-md-3 mb-2'>
																	<button className='btn btn-outline-primary' onClick={() => this.handlerShowModalMarcarItensCheckList()}><FaCalendarCheck /> Marcar ou desmarcar checklist em lote</button>
																</div>
															</div>
														</div>
													</div>

													<div className="table-responsive table-sm">
														<div class="table-wrapper">
															<table className="table table-bordered table-hover">
																<thead class="thead-light " style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																	<tr>
																		<th scope="col" className="sticky-col">Nome</th>
																		<th scope="col" className='custom-th'>Percentual de conclusão</th>
																		<th scope="col" className='custom-th'>Data do diário</th>
																		<th scope="col" className='custom-th'>Observação</th>
																		<th scope="col" className='custom-th'>Instituição</th>
																		<th scope="col" className='custom-th'>Certificado Impresso</th>
																		<th scope="col" className='custom-th'>Declaração Impressa</th>
																		{/* <th scope="col" className='custom-th'>Carimbos</th>
														<th scope="col" className='custom-th'>Selo</th> */}
																		<th scope="col" className='custom-th'>Assinaturas</th>
																		<th scope="col" className='custom-th'>Etiqueta Impressa</th>
																		<th scope="col" className='custom-th'>Docs Embalados</th>

																	</tr>
																</thead>
																<tbody className='custom-tbody'>
																	{listaAlunosCheckList.length > 0 ? (
																		listaAlunosCheckList.map((aluno, index) => (
																			<tr key={aluno.id_usuario} onClick={() => this.clickRow(aluno)} className={aluno.observacao !== null ? "rowCheck_" + aluno.id_usuario + " text-danger" : "rowCheck_" + aluno.id_usuario + ` ${aluno.solicitacao === 1 ? ` text-primary` : ``}`}>
																				<td className="sticky-col">{aluno.nome !== null ? this.capitalizar(aluno.nome) : ""}</td>
																				<td className='custom-td'>{parseFloat(aluno.percentual_conclusao) !== 0 ? `${aluno.percentual_conclusao}%` : `${0}%`}</td>
																				<td className='custom-td'>{aluno.data_diario}</td>
																				<td className='custom-td'>{aluno.observacao === null ? '-' : aluno.observacao}</td>
																				<td className='custom-td'>{aluno.nomeInstituicao}</td>
																				<td className='text-center custom-td'>
																					<div class="custom-control custom-checkbox">
																						<input type="checkbox" class="custom-control-input" id={"checkCertificadoImp_" + aluno.id_usuario} value={aluno.certificado_imp === 0 ? 1 : 0} checked={aluno.certificado_imp === 1} onChange={e => this.checkedEtapaAtualDoProcessoDeCertificacaoDoAluno(aluno.id_usuario, 'certificado_imp', e.target.value)} />
																						<label class="custom-control-label" for={"checkCertificadoImp_" + aluno.id_usuario}></label>
																					</div>
																				</td>

																				<td className='text-center custom-td'>
																					<div class="custom-control custom-checkbox">
																						<input type="checkbox" class="custom-control-input" id={"checkDeclaracaoImp_" + aluno.id_usuario} value={aluno.declaracao_imp === 0 ? 1 : 0} checked={aluno.declaracao_imp === 1} onChange={e => this.checkedEtapaAtualDoProcessoDeCertificacaoDoAluno(aluno.id_usuario, 'declaracao_imp', e.target.value)} />
																						<label class="custom-control-label" for={"checkDeclaracaoImp_" + aluno.id_usuario}></label>
																					</div>
																				</td>

																				{/* <td className='text-center custom-td'>
																	<div class="custom-control custom-checkbox">
																		<input type="checkbox" class="custom-control-input" id={"checkCarimbos_" + aluno.id_usuario} value={aluno.carimbos === 0 ? 1 : 0} checked={aluno.carimbos === 1} onChange={e => this.checkedEtapaAtualDoProcessoDeCertificacaoDoAluno(aluno.id_usuario, 'carimbos', e.target.value)} />
																		<label class="custom-control-label" for={"checkCarimbos_" + aluno.id_usuario}></label>
																	</div>
																</td>

																<td className='text-center custom-td'>
																	<div class="custom-control custom-checkbox">
																		<input type="checkbox" class="custom-control-input" id={"checkSelo_" + aluno.id_usuario} value={aluno.selo === 0 ? 1 : 0} checked={aluno.selo === 1} onChange={e => this.checkedEtapaAtualDoProcessoDeCertificacaoDoAluno(aluno.id_usuario, 'selo', e.target.value)} />
																		<label class="custom-control-label" for={"checkSelo_" + aluno.id_usuario}></label>
																	</div>
																</td> */}

																				<td className='text-center custom-td'>
																					<div class="custom-control custom-checkbox">
																						<input type="checkbox" class="custom-control-input" id={"checkAssinaturas_" + aluno.id_usuario} value={aluno.assinaturas === 0 ? 1 : 0} checked={aluno.assinaturas === 1} onChange={e => this.checkedEtapaAtualDoProcessoDeCertificacaoDoAluno(aluno.id_usuario, 'assinaturas', e.target.value)} />
																						<label class="custom-control-label" for={"checkAssinaturas_" + aluno.id_usuario}></label>
																					</div>
																				</td>


																				<td className='text-center  custom-td'>
																					<div class="custom-control custom-checkbox">
																						<input type="checkbox" class="custom-control-input" id={"checkEtiquetaImpresso_" + aluno.id_usuario} value={aluno.etiquetaImpresso === 0 ? 1 : 0} checked={aluno.etiquetaImpresso === 1} onChange={e => this.checkedEtapaAtualDoProcessoDeCertificacaoDoAluno(aluno.id_usuario, 'etiquetaImpresso', e.target.value)} />
																						<label class="custom-control-label" for={"checkEtiquetaImpresso_" + aluno.id_usuario}></label>
																					</div>
																				</td>

																				<td className='text-center custom-td'>
																					<div class="custom-control custom-checkbox">
																						<input type="checkbox" class="custom-control-input" id={"checkListaImpresso_" + aluno.id_usuario} value={aluno.listaImpresso === 0 ? 1 : 0} checked={aluno.listaImpresso === 1} onChange={e => this.checkedEtapaAtualDoProcessoDeCertificacaoDoAluno(aluno.id_usuario, 'listaImpresso', e.target.value)} />
																						<label class="custom-control-label" for={"checkListaImpresso_" + aluno.id_usuario}></label>
																					</div>
																				</td>

																			</tr>

																		))
																	) : (<tr className="text-center">
																		<td className='custom-td' colSpan="15">
																			<Spinner animation="border" />
																		</td>
																	</tr>)}

																	{/* {<div>{JSON.stringify(this.state.arquivoListaAlunos)}</div>} */}
																</tbody>
															</table>
														</div>
													</div>
													{

														<div className="row d-flex justify-content-center
												 font-weight-bold mt-3 mb-5">
															<div className='col-3'>Total de Registros: {listaAlunosCheckList.length}</div>
															<div className='col-3'>
																<div class="custom-control custom-checkbox">
																	<input type="checkbox" class="custom-control-input" id={"checkMarcaTodos"} value={this.state.CheckedTodosChecklist === 0 ? 1 : 0} checked={this.state.CheckedTodosChecklist === 0 ? 0 : 1} onChange={e => this.marcaOuDesmarcaTodosOsItensDoChecklist(e.target.value)} />
																	<label class="custom-control-label" for={"checkMarcaTodos"}>Marca ou desmarcar todos</label>
																</div>
															</div>
														</div>
													}
												</div>
											</Tab>

											<Tab
												eventKey="pendencias_gerais"
												title="Pendências Gerais"
												style={{ marginTop: '30px' }}>
												<div className='container'>
													<h4 className='lead'><FaFilter /> Filtros</h4>
													<hr />
													<div className='row d-flex align-items-center'>
														<div className='col-md-6'>
															<div className="form-group">
																<label for="staticEmail2">Nome do Aluno</label>
																<input class="form-control" type="text" id="pesqNome" name="start" placeholder='Nome'
																	onChange={e => this.setState({ pesqNomeAluno: e.target.value.trim() })}
																/>
															</div>
														</div>
														<div className='col-md-6'>
															<div className="form-group">
																<label for="staticEmail2">Instituição</label>
																<input class="form-control" type="text" id="pesqInstituicao" name="start" placeholder='Instituição'
																	onChange={e => this.setState({ pesqInstituicaoAluno: e.target.value.trim() })}
																/>
															</div>
														</div>
													</div>

													<div class="row d-flex justify-content-center mt-4 mb-4">
														<div class="col-lg-12 col-lg-offset-6 text-center">
															<div className="ml-auto">
																<button className='btn btn-sm btn-outline-primary mr-2' onClick={() => this.listaDePendenciasPorCiclos(getToken(), this.state.id_ciclo, this.state.pesqNomeAluno.length !== "" ? this.state.pesqNomeAluno : "", this.state.pesqInstituicaoAluno.length !== "" ? this.state.pesqInstituicaoAluno : "")}>Buscar <FaSearch /> </button>
																<button className='btn btn-sm btn-outline-danger mr-2' onClick={() => this.limparFiltro()}><FaFilter /> Limpar filtro</button>
																<button className='btn btn-sm btn-outline-primary' onClick={() => this.exportarTabelaParaXlsx(listaPendenciasDoCiclo, "listaAlunosEPendencias")}>Exportar<FaFileExport /></button>
															</div>
														</div>
													</div>

													<hr />

													<div className="table-responsive table-sm ">
														<div class="table-wrapper">
															<table className="table table-bordered table-hover " ref={el => (this.componentRef = el)}>
																<thead class="thead-light">
																	<tr>
																		<th scope="col">Nome</th>
																		<th>Pendências</th>
																		<th>Instituição</th>
																		<th>Status</th>
																		<th scope="col">Data/hora de Criacão</th>
																	</tr>
																</thead>
																<tbody>
																	{listaPendenciasDoCiclo.length > 0 ?
																		listaPendenciasDoCiclo.map(aluno => (
																			<tr key={aluno.id_aluno} className={aluno.status === 0 ? `text-danger` : `text-success`}>
																				<td>{aluno.nome !== null ? this.capitalizar(aluno.nome) : ""}</td>
																				<td>{aluno.pendencias}</td>
																				<td>{aluno.nomeInstituicao}</td>
																				<td> <div class="custom-control custom-checkbox">
																					<input type="checkbox" class="custom-control-input" id={`checkidAlunosXPendencia_${aluno.id}`} value={aluno.status === 0 ? 1 : 0} checked={aluno.status === 0 ? 0 : 1} onChange={e => this.atualizarcheckedAlunoXPendencia(aluno.id, e.target.value)} />
																					<label class="custom-control-label" for={`checkidAlunosXPendencia_${aluno.id}`}>{aluno.status === 0 ? `Marca como resolvido` : `Desmarca como resolvido`}</label>
																				</div></td>
																				<td>{aluno.dataHoraCriacao}</td>
																			</tr>)
																		) : (<tr className="text-center">
																			<td colSpan="15">
																				<Spinner animation="border" />
																			</td>
																		</tr>)}

																</tbody>
															</table>
														</div>
													</div>
													{
														<div className="text-center font-weight-bold mt-3 mb-5">
															Total de Registros: {listaPendenciasDoCiclo.length}
														</div>
													}
												</div>
											</Tab>

											<Tab
												eventKey="pendencias_unidade"
												title="Pendências por unidade"
												style={{ marginTop: '30px' }}

											>
												<div className='container'
												>
													<div class="row d-flex justify-content-center mt-4 mb-4">
														<div class="col-lg-12 col-lg-offset-6 text-center">

															<div className="ml-auto">
																<ReactToPrint
																	trigger={() => {
																		return <a href="#" className='btn btn-sm btn-outline-primary'>Imprimir <FaPrint /></a>;
																	}}
																	content={() => this.componentRef}
																/>

																<button className='btn btn-sm btn-outline-primary ml-2' onClick={() => this.exportarTabelaParaXlsx(listaPendenciasPorUnidades, "listaAlunosEPendencias")}>Exportar <FaFileExport /></button>
															</div>
														</div>
													</div>

													<hr />


													<div class="table-responsive">
														<div class="table-wrapper">
															<table className="table table-bordered" ref={el => (this.componentRef = el)}>
																<thead class="thead-light">
																	<tr>
																		<th scope='col'>Instituição</th>
																		<th>Total de pendências encontradas</th>
																	</tr>
																</thead>
																<tbody>
																	{listaPendenciasPorUnidades.length > 0 ?
																		listaPendenciasPorUnidades.map((unidade, index) => (
																			<tr key={index} className={unidade.quant_naoResolvidas === 0 ? `text-success` : ``}>
																				<td>{unidade.nomeInstituicao !== null ? this.capitalizar(unidade.nomeInstituicao) : ""}</td>
																				<td>{unidade.quant_pendRegistradas}</td>
																			</tr>)
																		) : (<tr className="text-center">
																			<td colSpan="15">
																				<Spinner animation="border" />
																			</td>
																		</tr>)}

																</tbody>
															</table>
														</div>
													</div>

													{
														<div className="text-center font-weight-bold mt-3 mb-5">
															Total de Registros: {listaPendenciasPorUnidades.length}
														</div>
													}
												</div>
											</Tab>

											<Tab
												eventKey="lista_alunos"
												title="Alunos"
												style={{ marginTop: '30px' }}>
												<div className='container'>
													<div className="table-responsive table-sm">
														<div class="table-wrapper">
															<table className="table table-sm table-bordered table-hover">
																<thead class="thead-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																	<tr>
																		<th scope="col" className="sticky-col">Nome</th>
																		<th>Data de Nascimento</th>
																		<th scope="col">Naturalidade</th>
																		<th scope="col">Situação do Aluno</th>
																		<th scope="col">Turma</th>
																		<th scope="col">Instituição</th>
																		<th scope="col">Ações</th>
																	</tr>
																</thead>
																<tbody>
																	{listaAlunosEPendencias.length > 0 ?
																		listaAlunosEPendencias.map(aluno => (
																			<tr key={aluno.id}>
																				<td className="sticky-col">{aluno.nome}</td>
																				<td>{aluno.dataNascimento}</td>
																				<td>{aluno.naturalidade}</td>
																				<td>{aluno.situacaoTurma}</td>
																				<td>{aluno.turma}</td>
																				<td>{aluno.nomeInstituicao}</td>
																				<td><button className='button' onClick={() => this.handlerShowModalAdicionarAlunoCertificacao(aluno)}><FaUserGraduate /> Atualizar</button></td>
																			</tr>)
																		) : (<tr className="text-center">
																			<td colSpan="15">
																				<Spinner animation="border" />
																			</td>
																		</tr>)}
																</tbody>
															</table>
														</div>
													</div>
													{
														<div className="text-center font-weight-bold mt-3 mb-5">
															Total de Registros: {listaAlunosEPendencias.length}
														</div>
													}
												</div>
											</Tab>
										</Tabs>

										{/* <Accordion>
								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="0">
										<h3 className='titulo'><FaUserGraduate /> Checklist </h3>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="0">
										<Card.Body>


										</Card.Body>
									</Accordion.Collapse>
								</Card>

								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="1">
										<h3 className='titulo'><FaUserGraduate /> Pendências gerais</h3>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="1">
										<Card.Body>

										</Card.Body>
									</Accordion.Collapse>
								</Card>

								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="2">
										<h3 className='titulo'><FaUserGraduate /> Pendências por unidade</h3>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="2">
										<Card.Body>


										</Card.Body>
									</Accordion.Collapse>
								</Card>

								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="3">
										<div className='row'>
											<div className='col-sm-6'>
												<h3 className='titulo'><FaBuromobelexperte /> Lista de Alunos</h3>
											</div>
										</div>
									</Accordion.Toggle>

									<Accordion.Collapse eventKey="3">
										<Card.Body>

										</Card.Body>
									</Accordion.Collapse>
								</Card>


							</Accordion> */}
									</div>
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowAdicionarObservacao}
								onHide={() => this.handlerCloseModalAdicionarObservacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								centered
							>
								<Form onSubmit={this.registrarObservacao}>
									<Modal.Header closeButton>
										<Modal.Title id="contained-modal-title-vcenter" >
											<h5 className='titulo'><FaRegWindowClose /> Registrar observação para {this.state.nomeAluno}</h5>
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div className="row border-bottom">
											<div className="col-md-12">
												<div class="form-group">
													<label for="exampleFormControlSelect1">Observação</label>
													<select class="form-control" id="selectObservacao"
														onChange={e => this.setState({ observacao: e.target.value })}>
														<option value={0}>Selecione uma opção</option>
														{pendencias.length > 0 ?
															pendencias.map(pendencia => (
																<option value={pendencia.nome}>{pendencia.nome}</option>
															))
															: (<option>0</option>)}
													</select>
												</div>
											</div>
										</div>

										<div className="row">
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
										<button className='btn btn-outline-primary'>SIM</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowAlterarDataDiario}
								onHide={() => this.handlerCloseModalAlterarDataDiario()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								centered
							>
								<Form onSubmit={this.registrarDataDoDiario}>
									<Modal.Header closeButton>
										<Modal.Title id="contained-modal-title-vcenter" >
											<h3 className='titulo'><FaRegWindowClose />Alterar Data do Diário</h3>
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div className="row border-bottom">
											<div className="col-md-12">
												<div className="form-group">
													<label for="exampleInputEmail1">Data do diário</label>
													<input class="form-control" type="date" id="inputDtDiario" name="start"
														min="2022-01" value={this.state.data_diario}
														onChange={e => this.setState({ data_diario: e.target.value })}
													/>
												</div>
											</div>
										</div>

										<div className="row">
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
										<button className='btn btn-outline-primary'>SIM</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowAdicionarAlunoSolicitacao}
								onHide={() => this.handlerCloseModalAdicionarAlunoSolicitacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size=''
							>
								<Form onSubmit={this.cadastrarEatualizarAluno}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaCalendarWeek /> Adicionar um aluno de solicitação</h4>
									</Modal.Header>
									<Modal.Body>
										<div className="form-group">
											<label for="nome">Nome: </label>
											<input className="form-control" type="text" placeholder="Nome" name="nome" id="nome"
												onChange={e => this.setState({ nomeAluno: e.target.value })} />
										</div>

										<div className="form-group">
											<label for="instituicao">Instituição</label>
											<input className="form-control " type="text" placeholder="Instituição" name="instituicao"
												id="instituicao"
												onChange={e => this.setState({ instituicaoAluno: e.target.value })} />
										</div>

										<div className="row">
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
										<button className='btn btn-outline-primary'>SIM</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowMarcaItensChecklist}
								onHide={() => this.handlerCloseModalMarcarItensCheckList()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered
							>
								<Form onSubmit={this.checkedListDosAlunosProcessoDeCertificacao}>
									<Modal.Header closeButton>
										<Modal.Title id="contained-modal-title-vcenter" >
											<h5 className='titulo'><FaRegWindowClose />Marcar itens de checklist</h5>
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<div class="custom-control custom-checkbox">
											<input type="checkbox" class="custom-control-input" id={"checkDesmarcarTodos"} value={this.state.desmarcarTodosOsItensMarcados === 0 ? 1 : 0} checked={this.state.desmarcarTodosOsItensMarcados === 0 ? 0 : 1} onChange={e => this.setState({ desmarcarTodosOsItensMarcados: parseInt(e.target.value) })} />
											<label class="custom-control-label" for={"checkDesmarcarTodos"}>Deseja desmarcar todos os itens que já estão marcados?</label>
										</div>
										<hr />
										<div className="row mb-3 text-center">
											<div className="col-md-4">
												<h4>Certificado Impresso</h4>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id={"checkCertificadoImp"} onChange={() => this.onChangeCheckedItensAlunosProcessoDeCertificacao("certificado_imp")} value={1} />
													<label class="custom-control-label" for={"checkCertificadoImp"}></label>
												</div>
											</div>

											<div className="col-md-4">
												<h4>Declaração Impressa</h4>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id={"checkDeclaracaoImp"} onChange={() => this.onChangeCheckedItensAlunosProcessoDeCertificacao("declaracao_imp")} value={1} />
													<label class="custom-control-label" for={"checkDeclaracaoImp"}></label>
												</div>
											</div>

											<div className="col-md-4">
												<h4>Carimbos</h4>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id={"checkCarimbos"} onChange={() => this.onChangeCheckedItensAlunosProcessoDeCertificacao("carimbos")} value={1} />
													<label class="custom-control-label" for={"checkCarimbos"}></label>
												</div>
											</div>
										</div>

										<div className="row mb-3 text-center">
											<div className="col-md-2">
												<h4>Selo</h4>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id={"checkSelo"} onChange={() => this.onChangeCheckedItensAlunosProcessoDeCertificacao("selo")} value={1} />
													<label class="custom-control-label" for={"checkSelo"}></label>
												</div>
											</div>

											<div className="col-md-3">
												<h4>Assinaturas</h4>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id={"checkAssinaturas"} onChange={() => this.onChangeCheckedItensAlunosProcessoDeCertificacao("assinaturas")} value={1} />
													<label class="custom-control-label" for={"checkAssinaturas"}></label>
												</div>
											</div>

											<div className="col-md-3">
												<h4>Lista Impresso</h4>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id={"checkListaImpresso"} onChange={() => this.onChangeCheckedItensAlunosProcessoDeCertificacao("listaImpresso")} value={1} />
													<label class="custom-control-label" for={"checkListaImpresso"}></label>
												</div>
											</div>
											<div className="col-md-4">
												<h4>Etiqueta Impressa</h4>
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id={"checkEtiquetaImpresso"} onChange={() => this.onChangeCheckedItensAlunosProcessoDeCertificacao("etiquetaImpresso")} value={1} />
													<label class="custom-control-label" for={"checkEtiquetaImpresso"}></label>
												</div>
											</div>
										</div>

										<div className="row">
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
										<button className='btn btn-outline-primary'>SIM</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowEditarEvento}
								onHide={() => this.handlerCloseModalEditarEvento()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								className='modal-fullscreen'
								centered>

								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter">
										<FaCalendarWeek /> Informações do evento - {this.state.temaEvento}
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<div className='container'>
										<h1 style={{ color: '#000233', fontSize: '20pt' }}><FaLayerGroup /> Membros</h1>
										<hr />
										<div className="table-responsive table-sm text-center">
											<table className="table table-bordered table-hover custom-table">
												<thead class="thead-light">
													<tr>
														<th>Nome Completo</th>
														<th>E-mail</th>
														<th>Telefone</th>
														<th>Instituição de Origem</th>
														<th>Curso de Formação</th>
														<th>Estado</th>
														<th>Cidade</th>
														<th>Data e hora da inscrição</th>
														{/* <th>Certificado</th> */}
													</tr>
												</thead>
												<tbody>
													{membros.length > 0 ? (
														membros.map(membro => (
															<tr key={membro.id} title="Clique aqui para obter mais informações sobre o evento">
																<td>{membro.nome_completo}</td>
																<td>{membro.email}</td>
																<td>{membro.telefone}</td>
																<td>{membro.instituicao_origem}</td>
																<td>{membro.curso_formacao}</td>
																<td>{membro.estado}</td>
																<td>{membro.cidade}</td>
																<td>{membro.dataHoraCriacao}</td>

																{/* <td><button className='button' onClick={() => this.handlerShowModalEditarCertificado(membro)}>Certificado</button></td> */}
															</tr>
														))
													) : (<tr className="text-center">
														<td colSpan="10">
															Nenhuma membro encontrado
														</td>
													</tr>)}
												</tbody>
											</table>
										</div>
										{
											<div className="text-center font-weight-bold mt-3 mb-5">
												Total de Registros: {membros.length}
											</div>
										}
									</div>
								</Modal.Body>
								<Modal.Footer>
								</Modal.Footer>
							</Modal>

							<Modal
								show={this.state.modalShowCadastrarEvento}
								onHide={() => this.handlerCloseModalCadastrarEvento()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size=''
							>
								<Form onSubmit={this.cadastrarEvento}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaCalendarWeek /> Adicionar um novo evento</h4>
									</Modal.Header>
									<Modal.Body>
										<div className='container'>
											<div className="row">
												<div className="col-md-12 mb-2">
													<label for="selectSolicitacao">Tema</label>
													<input className="form-control" type="text" placeholder="Nome" name="nome"
														onChange={e => this.setState({ temaEvento: e.target.value })} />
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<label for="selectSolicitacao">Data inicial</label>
														<input class="form-control" type="datetime-local" id="dataEventoInicial" name="start"
															min="2022-01"
															onChange={e => this.setState({ dataEventoInicial: e.target.value })}
														/>
													</div>
												</div>

												<div className="col-md-12">
													<div className="form-group">
														<label for="selectSolicitacao">Data final</label>
														<input class="form-control" type="datetime-local" id="dataEventoFinal" name="start"
															min="2022-01"
															onChange={e => this.setState({ dataEventoFinal: e.target.value })}
														/>
													</div>
												</div>

												<div className="col-md-12">
													<label for="selectSolicitacao">Carga horária</label>
													<input className="form-control" type="number" placeholder="Carga horária" name="carga_horaria"
														onChange={e => e.target.value <= 0 ? alert("Informe um valor maior que 0") : this.setState({ carga_horaria: e.target.value })
														} />
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
										<button className='btn btn-outline-primary'>SIM</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowEditarCertificado}
								onHide={() => this.handlerCloseModalEditarCertificado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								className='modal-fullscreen'>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek /> Certificado</h4>
								</Modal.Header>
								<Modal.Body>
									<div className='d-flex justify-content-center'>
										<button className='button mb-4' onClick={() => print('certificado')}>Imprimir</button>
									</div>

									<div id="certificado">
										<Certificado
											nomeMembro={this.state.nomeMembro}
											cpfMembro={this.state.cpfMembro}
											temaEvento={this.state.temaEvento}
											dataEventoInicial={this.state.dataEventoInicial}
											dataEventoFinal={this.state.dataEventoFinal}
											cargaHoraria={this.state.carga_horaria}
											codigo_validacao={this.state.codigo_validacao}
										/>
									</div>
								</Modal.Body>

							</Modal>

							<Modal
								show={this.state.modalShowEditarTeseOuDissertacao}
								onHide={() => this.handlerCloseModalEditarTeseOuDissertacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered
							>

								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter">
										<FaCalendarWeek /> Informações do documento
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<div className='container'>
										<div className="row d-flex justify-content-center text-center">
											<div className="col-lg-4 col-lg-offset-4">
												<a className='btn btn-sm btn-outline-primary' target="blanck" href={this.state.url}>Baixar arquivo</a>
											</div>
										</div>
										<hr />

										<Form onSubmit={this.atualizarTesesEDissertacoes}>
											<div className="row">
												<div className="col-md-6">
													<div className="row">
														<div className="col-md-12">
															<div className="form-group">
																<label htmlFor="nome">Nome completo do autor:*</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="titulo"
																	placeholder="Digite seu nome"
																	onChange={(e) =>
																		this.setState({ autor: e.target.value })
																	}
																	value={this.state.autor}
																/>
															</div>
														</div>
													</div>

													<h4>Informações do documento:*</h4>
													<hr />

													<div className="form-group">
														<label htmlFor="nome">Titulo:*</label>
														<input
															type="text"
															className="form-control form-control-sm"
															id="titulo"
															placeholder="Digite seu nome"
															onChange={(e) =>
																this.setState({ titulo: e.target.value })
															}
															value={this.state.titulo}
														/>
													</div>

													<div className="form-group">
														<label htmlFor="nome">Titulo em outro idioma:*</label>
														<input
															type="text"
															className="form-control form-control-sm"
															id="tituloEmOutroIdioma"
															placeholder="Digite seu nome"
															onChange={(e) =>
																this.setState({ tituloEmOutroIdioma: e.target.value })
															}
															value={this.state.tituloEmOutroIdioma}
														/>
													</div>

													<div className="form-group">
														<label htmlFor="nome">Orientador:*</label>
														<select class="form-control" id="selectOrientador" value={this.state.idOrientador}
															onChange={e => this.setState({ idOrientador: e.target.value })}>
															<option value="0">Selecione</option>
															{this.state.arrayOrientadores.length > 0 ?
																this.state.arrayOrientadores.map(orientador => (
																	<option value={orientador.id}>{orientador.nome}</option>
																))
																: (<option>0</option>)
															}

														</select>
													</div>

													<div className="form-group ">
														<label>Data de defesa:*</label>
														<input class="form-control form-control-sm" type="datetime-local" id="dataDefesa" name="start"
															min="2022-01" value={this.state.dataDefesa}
															onChange={e => this.setState({ dataDefesa: e.target.value })}

														/>
													</div>

												</div>

												<div className="col-md-6 border-left">
													<div className="form-group">
														<label>Resumo:*</label>
														<textarea
															className="form-control form-control-sm"
															id="resumo"
															placeholder="Digite seu nome"
															onChange={(e) =>
																this.setState({ resumo: e.target.value })
															}
															value={this.state.resumo}
															rows="4" cols="100"
														></textarea>
													</div>

													<div className="form-group">
														<label>Idioma:*</label>
														<input
															type="text"
															className="form-control form-control-sm"
															id="idioma"
															placeholder="Digite seu nome"
															onChange={(e) =>
																this.setState({ idioma: e.target.value })
															}
															value={this.state.idioma}
														/>
													</div>

													<div class="form-group">
														<label>Tipo:*</label>
														<select class="form-control" id="selectTipoDocumento"
															value={this.state.idTipoDocumento}
															onChange={e => this.setState({ idTipoDocumento: e.target.value })}>
															<option value="0">Selecione</option>
															{this.state.arrayTipoDeDocumentos.length > 0 ?
																this.state.arrayTipoDeDocumentos.map(tipo => (
																	<option value={tipo.id}>{tipo.nome}</option>
																))
																: (<option>0</option>)
															}
														</select>
													</div>

													<div className="form-group">
														<label>Área de concentração:* </label>
														<select className="form-control" id="selectAreaConcentracao"
															value={this.state.idAreaConcentracao}
															onChange={e =>
																listaDeLinhasDePesquisas(e.target.value)
																	.then(result => this.setState({ arrayLinhasDePesquisas: result }))
																	.then(this.setState({ idAreaConcentracao: e.target.value }))
															}>
															<option value="0">Selecione</option>
															{areas_concentracao.length > 0 ?
																areas_concentracao.map(area => (
																	<option value={area.id}>{area.nome}</option>
																))
																: (<option>0</option>)
															}
														</select>
													</div>

													<div className="form-group">
														<label>Linha de pesquisa:*</label>
														<select class="form-control" id="selectLinhaPesquisa" value={this.state.idLinhaPesquisa}
															onChange={e => this.setState({ idLinhaPesquisa: e.target.value })}>
															<option value="0">Selecione</option>
															{linhasDePesquisas.length > 0 ?
																linhasDePesquisas.map(linha => (
																	<option value={linha.id}>{linha.linha_pesquisa}</option>
																))
																: (<option>0</option>)
															}
														</select>
													</div>

													<div className="form-group">
														<label>Descrição do arquivo:*</label>
														<input
															type="text"
															className="form-control form-control-sm"
															id="descricaoDoArquivo"
															placeholder="Digite seu nome"
															onChange={(e) =>
																this.setState({ descricaoDoArquivo: e.target.value })
															}
															value={this.state.descricaoDoArquivo}
														/>
													</div>

													<div className="row">
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

													<button className='btn btn-sm btn-outline-primary'>Salvar</button>
												</div>
											</div>
										</Form>
									</div>
								</Modal.Body>
								<Modal.Footer>
								</Modal.Footer>
							</Modal>


							<Modal
								show={this.state.modalShowEditarBanca}
								onHide={() => this.handlerCloseModalEditarBanca()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='xl'>

								<Modal.Body style={{ maxHeight: "600px", overflowY: 'auto' }}>
									{this.state.id_tipoBanca === 1 && this.state.idAreaConcentracao === 1 &&
										(
											<div className='container'>
												<div className="table-responsive table-sm">
													<div class="table-wrapper">
														<table className="table text-center table-bordered table-hover">
															<thead class="thead-light">
																<tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																	<th className='sticky-col'>Orientador</th>
																	<th>Orientando</th>
																	<th>curso</th>
																	{/* <th>Fase do processo</th> */}
																	{/* <th>Data/hora inicial do processo</th>
													<th>Data/hora final do processo</th>
													<th>Data e hora de conclusão</th> */}
																	<th>Data e hora prevista</th>
																	<th>Observação</th>
																	<th>Data de confirmação da taxa de qualificação</th>
																	<th>Confirmação da taxa de qualificação</th>
																	{/* <th>Data/hora de criação</th> */}
																</tr>
															</thead>
															<tbody>
																{array_bancasQE.length > 0 ?
																	array_bancasQE.map(banca => (
																		<tr key={banca.id} className={banca.status_confirmacaoBancaQ === "AGUARDANDO" ? "table-warning" : "table-success"} title="Clique aqui para obter mais informações sobre a banca">
																			<td className='sticky-col'>{banca.orientador}</td>
																			<td>{banca.orientando}</td>
																			<td>{banca.curso}</td>
																			{/* <td>{banca.fase_processo}</td> */}
																			{/* <td>{banca.dataHoraInicialFaseProcessoTb}</td>
																		<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																		<td>{banca.dataHoraConclusaoTb}</td> */}
																			<td>{banca.data_horaPrevista}</td>
																			{/* <td>{banca.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td> */}
																			<td>{banca.observacao}</td>
																			<td>{banca.dt_confirmacaoTaxaQ}</td>
																			<td>{banca.status_confirmacaoBancaQ}</td>
																			{/* <td>{banca.dtHCadBanca}</td> */}
																		</tr>
																	))
																	: (
																		<tr>
																			<td colSpan="12">Nenhum resultado encontrado</td>
																		</tr>
																	)}

															</tbody>
														</table>
													</div>
												</div>

											</div>
										)}

									{this.state.id_tipoBanca === 1 && this.state.idAreaConcentracao === 2 &&
										(
											<div className='container'>
												<div className="table-responsive table-sm">
													<div class="table-wrapper">
														<table className="table text-center table-bordered table-hover">
															<thead class="thead-light">
																<tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																	<th className='sticky-col'>Orientador</th>
																	<th>Orientando</th>
																	<th>curso</th>
																	{/* <th>Fase do processo</th> */}
																	{/* <th>Data/hora inicial do processo</th>
													<th>Data/hora final do processo</th>
													<th>Data/hora de conclusão</th> */}
																	<th>Data e hora de prevista</th>
																	<th>Taxa de apostilamento</th>
																	<th>Data e hora de confirmação de pagamento</th>
																	<th>Observação</th>
																	<th>Data de confirmação da taxa de defesa</th>
																	<th>Confirmação da taxa de defesa</th>
																	{/* <th>Data/hora de criação</th> */}
																	<th>ATA</th>
																</tr>
															</thead>
															<tbody>
																{array_bancasDE.length > 0 ?
																	array_bancasDE.map(banca => (
																		<tr key={banca.id} className={banca.status_confirmacaoBancaD === "AGUARDANDO" ? "table-warning" : "table-success"} title="Clique aqui para obter mais informações sobre a banca">
																			<td className='sticky-col'>{banca.orientador}</td>
																			<td>{banca.orientando}</td>
																			<td>{banca.curso}</td>
																			{/* <td>{banca.fase_processo}</td> */}
																			{/* <td>{banca.dataHoraInicialFaseProcessoTb}</td>
															<td>{banca.dataHoraFinalFaseProcessoTb}</td>
															<td>{banca.dataHoraConclusaoTb}</td> */}
																			<td>{banca.data_horaPrevista}</td>
																			<td>{banca.observacao}</td>
																			<td>{banca.dt_confirmacaoTaxaQ}</td>
																			<td>{banca.status_confirmacaoBancaQ}</td>
																			<td>{banca.dt_confirmacaoTaxaD}</td>
																			<td>{banca.status_confirmacaoBancaD}</td>
																			{/* <td>{banca.dtHCadBanca}</td> */}
																			<td>{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata !== null ? (<button className='btn btn-outline-primary' onClick={() => this.handlerShowModalVisualizarAta(banca)}>Visualizar ATA</button>) : ""}</td>
																		</tr>
																	)) : (
																		<tr>
																			<td colSpan="12">Nenhum resultado encontrado</td>
																		</tr>
																	)}
															</tbody>
														</table>
													</div>
												</div>
											</div>
										)}

									{this.state.id_tipoBanca === 2 && this.state.idAreaConcentracao === 1 &&
										(
											<div className='container'>
												<div className="table-responsive">
													<div class="table-wrapper">
														<table className="table text-center table-bordered table-hover">
															<thead class="thead-light">
																<tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																	<th className='sticky-col'>Orientador</th>
																	<th>Orientando</th>
																	<th>curso</th>
																	{/* <th>Fase do processo</th> */}
																	{/* <th>Data/hora inicial do processo</th>
													<th>Data/hora final do processo</th>
													<th>Data e hora de conclusão</th> */}
																	<th>Data e hora de prevista</th>
																	{/* <th>Taxa de qualificação</th> */}
																	<th>Observação</th>
																	<th>Data de confirmação da taxa de qualificação</th>
																	<th>Confirmação da taxa de qualificação</th>
																	{/* <th>Data/hora de criação</th> */}
																</tr>
															</thead>
															<tbody>
																{array_bancasQT.length > 0 ?
																	array_bancasQT.map(banca => (
																		<tr key={banca.id} className={banca.status_confirmacaoBancaQ === "AGUARDANDO" ? "table-warning" : "table-success"} title="Clique aqui para obter mais informações sobre a banca">
																			<td className='sticky-col'>{banca.orientador}</td>
																			<td>{banca.orientando}</td>
																			<td>{banca.curso}</td>
																			{/* <td>{banca.fase_processo}</td> */}
																			{/* <td>{banca.dataHoraInicialFaseProcessoTb}</td>
															<td>{banca.dataHoraFinalFaseProcessoTb}</td>
															<td>{banca.dataHoraConclusaoTb}</td> */}
																			<td>{banca.data_horaPrevista}</td>
																			{/* <td>{banca.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td> */}
																			<td>{banca.observacao}</td>
																			<td>{banca.dt_confirmacaoTaxaQ}</td>
																			<td>{banca.status_confirmacaoBancaQ}</td>
																			{/* <td>{banca.dtHCadBanca}</td> */}
																		</tr>
																	))
																	: (
																		<tr>
																			<td colSpan="12">Nenhum resultado encontrado</td>
																		</tr>
																	)}

															</tbody>
														</table>
													</div>
												</div>

											</div>
										)}

									{this.state.id_tipoBanca === 2 && this.state.idAreaConcentracao === 2 &&
										(
											<div className='container'>
												<div className="table-responsive table-sm">
													<div class="table-wrapper">
														<table className="table text-center table-bordered table-hover">
															<thead class="thead-light">
																<tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																	<th className='sticky-col'>Orientador</th>
																	<th>Orientando</th>
																	<th>curso</th>
																	{/* <th>Fase do processo</th> */}
																	{/* <th>Data/hora inicial do processo</th>
													<th>Data/hora final do processo</th>
													<th>Data/hora de conclusão</th> */}
																	<th>Data e hora de prevista</th>
																	<th>Taxa de apostilamento</th>
																	<th>Observação</th>
																	<th>Data de confirmação da taxa de defesa</th>
																	<th>Confirmação da taxa de defesa</th>
																	<th>Data/hora de criação</th>
																	<th>ATA</th>
																</tr>
															</thead>
															<tbody>
																{array_bancasDT.length > 0 ?
																	array_bancasDT.map(banca => (
																		<tr key={banca.id} className={banca.status_confirmacaoBancaD === "AGUARDANDO" ? "table-warning" : "table-success"} title="Clique aqui para obter mais informações sobre a banca">
																			<td className='sticky-col'>{banca.orientador}</td>
																			<td>{banca.orientando}</td>
																			<td>{banca.curso}</td>
																			{/* <td>{banca.fase_processo}</td> */}
																			{/* <td>{banca.dataHoraInicialFaseProcessoTb}</td>
															<td>{banca.dataHoraFinalFaseProcessoTb}</td>
															<td>{banca.dataHoraConclusaoTb}</td> */}
																			<td>{banca.data_horaPrevista}</td>
																			<td>{banca.data_pagamento}</td>
																			<td>{banca.observacao}</td>
																			<td>{banca.dt_confirmacaoTaxaD}</td>
																			<td>{banca.status_confirmacaoBancaD}</td>
																			<td>{banca.dtHCadBanca}</td>
																			<td>{(banca.status_confirmacaoBancaD === "CONFIRMADO" || banca.status_confirmacaoBancaD === "FINALIZADA") && banca.id_ata !== null ? (<button className='btn btn-outline-primary' onClick={() => this.handlerShowModalVisualizarAta(banca)}>Visualizar ATA</button>) : ""}</td>
																		</tr>
																	))
																	: (
																		<tr>
																			<td colSpan="12">Nenhum resultado encontrado</td>
																		</tr>
																	)}
															</tbody>
														</table>
													</div>
												</div>
											</div>
										)}

								</Modal.Body>

							</Modal>

							{/* <Modal
					show={this.state.modalShowEditarBanca}
					onHide={() => this.handlerCloseModalEditarBanca()}
					aria-labelledby="contained-modal-title-vcenter"
					backdrop="static"
					size='lg'
					centered
				>
					<Form onSubmit={this.atualizarOrientando}>
						<Modal.Header closeButton>
							<h4 className='titulo'><FaCalendarWeek /> Atualizar as informações da banca de {this.state.id_tipoBanca === 1 ? `qualificação` : `Defesa`} do orientando {this.state.orientando}</h4>
						</Modal.Header>
						<Modal.Body>
							<h4 className='lead font-weight-bold'>Informações sobre a taxa {this.state.id_tipoBanca === 1 ? `da banca` : `de apostilamento`} de {this.state.id_tipoBanca === 1 ? `qualificação` : `Defesa`}</h4>
							<hr />
							<div className="row">
								<div className="col-sm-6">

									<div className="form-group">
										<label>Valor:</label>
										<input
											type="text"
											className="form-control form-control-sm"
											id="inputValorTaxaBancaQualificacao"
											placeholder="Informe o valor"
											onInput={(e) =>
												this.onChangeValorDaTaxaDeQual(e.target.value)
											}
											value={this.state.valorTaxaBanca}
										/>
									</div>

									<div className="form-group">
										<label for="inputDtPagConfirmaQualificacao">Data de confirmação do pagamento:</label>
										<input class="form-control" type="datetime-local" id="inputDtPagConfirmaQualificacao" name="start"
											min="2022-01" value={this.state.data_pagBanca}
											onChange={e => this.setState({ data_pagBanca: e.target.value })}
										/>
									</div>
								</div>

								<div className="col-sm-6">
									<div class="form-group">
										<label for="exampleFormControlTextarea1">Observação: </label>
										<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
											onChange={(e) =>
												this.setState({ observacaoBanca: e.target.value })
											}
											value={this.state.observacaoBanca}
										></textarea>
									</div>

									<div class="form-group">
										<label for="selectStatusBanca">Status:*</label>
										<select class="form-control" id="selectStatusBanca"
											value={this.state.status_banca}
											onChange={e => this.setState({ status_banca: e.target.value })}>
											<option value="0">Selecionar</option>
											{listaDeStatus.length > 0 ? (
												listaDeStatus.map(item => (
													<option value={item.id}>{item.nome}</option>
												))
											) : (
												<option value="0">Nenhum resultado encontrado</option>
											)}
										</select>
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
							<button className='btn btn-outline-primary'>Salvar</button>
						</Modal.Footer>
					</Form>
				</Modal> */}

							<Modal
								show={this.state.modalShowAdicionarAlunoCertificacao}
								onHide={() => this.handlerCloseModalAdicionarAlunoCertificacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
							>
								<Form onSubmit={this.cadastrarEatualizarAluno}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaUserGraduate /> Adicionar um novo aluno para certificação</h4>
									</Modal.Header>
									<Modal.Body>
										<div className='row'>
											<div className='col-sm-6'>
												<div className="form-group">
													<label for="inputNomeCompleto">Nome completo:</label>
													<input className="form-control" type="text" id='inputNomeCompleto' placeholder="Nome" name="nome"
														onChange={e => this.setState({ nomeAluno: e.target.value })}
														value={this.state.nomeAluno} />
												</div>

												<div className="form-group">
													<label for="inputDataNascimento">Data de nascimento</label>
													<input class="form-control" type="date" id="inputDataNascimento" name="data_nascimento"
														onChange={e => this.setState({ data_nascimento: e.target.value })}
														value={this.state.data_nascimento}
													/>
												</div>

												<div className="form-group">
													<label for="inputInstituicao">Instituição:</label>
													<input className="form-control" type="text" id='inputInstituicao' placeholder="Instituição" name="instituicao"
														onChange={e => this.setState({ instituicaoAluno: e.target.value })}
														value={this.state.instituicaoAluno}
													/>
												</div>

												<div className="form-group">
													<label for="inputRg">RG:</label>
													<input className="form-control" type="number" id='inputRg' placeholder="rg" name="rg"
														onChange={e => this.setState({ rg: e.target.value })}
														value={this.state.rg}
													/>
												</div>

												<div className="form-group">
													<label for="inputCpf">CPF:</label>
													<input className="form-control" type="number" placeholder="cpf" id='inputCpf' name="cpf"
														onChange={e => this.setState({ cpf: e.target.value })}
														value={this.state.cpf}
													/>
												</div>

												<div className="form-group">
													<label for="inputNaturalidade">Naturalidade:</label>
													<input className="form-control" type="text" id='inputNaturalidade' placeholder="Naturalidade" name="naturalidade"
														onChange={e => this.setState({ naturalidade: e.target.value })}
														value={this.state.naturalidade}
													/>
												</div>
											</div>

											<div className='col-sm-6'>
												<div className="form-group">
													<label for="inputNacionalidade">Nacionalidade:</label>
													<input className="form-control" type="text" id='inputNacionalidade' placeholder="Nacionalidade" name="nacionalidade"
														onChange={e => this.setState({ nacionalidade: e.target.value })}
														value={this.state.nacionalidade}
													/>
												</div>

												<div className="form-group">
													<label for="inputPai">Nome do pai:</label>
													<input className="form-control" type="text" id='inputPai' placeholder="Pai" name="pai"
														onChange={e => this.setState({ pai: e.target.value })}
														value={this.state.pai} />
												</div>

												<div className="form-group">
													<label for="inputMae">Nome da mãe:</label>
													<input className="form-control" type="text" id='inputMae' placeholder="Mãe" name="mae"
														onChange={e => this.setState({ mae: e.target.value })}
														value={this.state.mae}
													/>
												</div>

												<div className="form-group">
													<label for="inputTurma">Turma:</label>
													<input className="form-control" type="text" id='inputTurma' placeholder="Turma" name="turma"
														onChange={e => this.setState({ turma: e.target.value })}
														value={this.state.turma}
													/>
												</div>

												<div className="form-group">
													<label for="inputSituacao">Situação:</label>
													<input className="form-control" type="text" id='inputSituacao' placeholder="Situação" name="situacao"
														onChange={e => this.setState({ situacaoTurma: e.target.value })}
														value={this.state.situacaoTurma}
													/>
												</div>

												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="checkboxSolicitacao" value={this.state.solicitacao} onChange={(e) => this.check_solicicitacao(this.state.solicitacao === 1 ? 0 : 1)}
														style={{ width: '20px', height: '20px' }} />
													<label class="form-check-label" for="checkboxSolicitacao">Solicitação</label>
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
										<button className='btn btn-outline-primary'>Salvar</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowLiderDoGrupoDeTrabalho}
								onHide={() => this.handlerCloseModalLiderDoGrupoDeTrabalho()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered>

								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter">
										<FaCalendarWeek /> Adicionar lider de grupo de trabalho
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={this.cadastrarLiderGrupoDeTrabalho}>
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label htmlFor="nome">Email:*</label>
													<Select options={this.state.arrayUsuarios} onChange={(e) => this.setState({ arraySelectedLiderGt: e })} />
													{/* <select class="form-control form-control-sm" id="selectUsuario" value={this.state.id_usuario}
														>
														<option value="0">Selecione</option>
														{arrayUsuarios.length > 0 ?
															arrayUsuarios.map(usuario => (
																<option value={usuario.id}>{usuario.email}</option>
															)) : (<option>0</option>)
														}
													</select> */}
												</div>
											</div>

											<div className="col-sm-6">
												<div class="form-group">
													<label htmlFor="selectGrupoDeTrabalho">Grupo:*</label>
													<select class="form-control form-control-sm" id="selectGrupoDeTrabalho"
														onChange={e => this.setState({ id_grupoTrabalho: parseInt(e.target.value) })}>
														<option value={0}>{"Selecione uma opção".toLocaleUpperCase()}</option>
														{array_gruposTrabalho.length > 0 ?
															array_gruposTrabalho.map(grupo => (
																<option value={grupo.id}>{grupo.nome}</option>
															))
															: (<option>0</option>)}
													</select>
												</div>
											</div>
										</div>

										<div className="row">
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
											<button className='button'>Salvar</button>
										</div>
									</Form>

									<hr />

									<div className='container'>
										<h1 style={{ color: '#000233', fontSize: '20pt' }}><FaLayerGroup /> Lideres</h1>
										<hr />
										<div className="table-responsive table-sm text-center" style={{ maxHeight: "350px", overflowY: 'scroll' }}>
											<div class="table-wrapper">
												<table className="table table-bordered table-hover custom-table">
													<thead class="thead-light">
														<tr>
															<th>Lider</th>
															<th>E-mail</th>
															<th>Grupo de trabalho</th>
														</tr>
													</thead>
													<tbody>
														{array_lideresGt.length > 0 ? (
															array_lideresGt.map(lider => (
																<tr key={lider.id} title="Clique aqui para obter mais informações sobre o evento">
																	<td>{lider.email}</td>
																	<td>{lider.nome}</td>
																	<td>{lider.grupo_trabalho}</td>
																</tr>
															))
														) : (<tr className="text-center">
															<td colSpan="10">
																Nenhuma membro encontrado
															</td>
														</tr>)}
													</tbody>
												</table>
											</div>
										</div>
										{
											<div className="text-center font-weight-bold mt-3 mb-5">
												Total de Registros: {array_lideresGt.length}
											</div>
										}
									</div>
								</Modal.Body>
								<Modal.Footer>
								</Modal.Footer>
							</Modal>


							<Modal
								show={this.state.modalShowEditarOrientando}
								onHide={() => this.handlerCloseModalEditarOrientando()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="xl"
								centered>

								<Modal.Body >
									{this.state.idAreaConcentracao === 1 && (
										<div className="container-fluid">
											<div className="table-responsive table-sm">
												<div class="table-wrapper">
													<table className="table text-center table-bordered table-striped table-hover bg-white" >
														<thead className="thead-light">
															<tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																<th className="sticky-col" scope="col">Orientando</th>
																<th >Orientador</th>
																<th>Curso</th>
																<th>Fase do processo</th>
																<th>Data/hora de conclusão</th>
																<th>Data de confirmação da taxa de qualificação</th>
																<th>Confirmação da taxa de qualificação</th>
																<th>Data de confirmação da taxa de Defesa</th>
																<th>Confirmação da taxa de defesa</th>
																<th scope="col">Observação</th>
																<th>Data/hora de criação</th>
															</tr>
														</thead>
														<tbody>
															{array_orientandosE.length > 0 ? (
																array_orientandosE.map(orientando => (
																	<tr key={orientando.id} title="Clique aqui para obter mais informações sobre o orientando">
																		<td className="sticky-col">{orientando.nome}</td>
																		<td >{orientando.orientador}</td>
																		<td>{orientando.curso}</td>
																		<td>{orientando.fase_processo}</td>
																		<td>{orientando.dataHoraConclusaoTb}</td>

																		<td className={orientando.status_confirmacaoBancaQ === 1 ? "table-warning" : "table-success"}>
																			<div className="form-group">
																				<input class="form-control form-control-sm" type="datetime-local" id="inputDtPagConfirmaQualificacao" name="start"
																					min="2020-01" value={orientando.dt_confirmacaoTaxaQ}
																					onChange={e => this.atualizarOrientando(e, orientando.id, e.target.value, "", "", "", "")}
																				/>
																			</div>
																		</td>
																		<td className={orientando.status_confirmacaoBancaQ === 1 ? "table-warning" : "table-success"}>
																			<div class="form-group">
																				<select class="form-control form-control-sm" id="selectStatusBanca" style={{ width: "200px" }}
																					value={orientando.status_confirmacaoBancaQ}
																					onChange={e => this.atualizarOrientando(e, orientando.id, "", e.target.value, "", "", "")}>
																					<option value="0">Selecionar</option>
																					{listaDeStatus.length > 0 ? (
																						listaDeStatus.map(item => (
																							item.id > 0 && item.id <= 2 ?
																								<option value={item.id}>{item.nome}</option> : ""
																						))
																					) : (
																						<option value="0">Nenhum resultado encontrado</option>
																					)}
																				</select>
																			</div>
																		</td>

																		<td className={orientando.status_confirmacaoBancaD === 1 ? "table-warning" : "table-success"}>
																			<div className="form-group">
																				<input class="form-control form-control-sm" type="datetime-local" id="inputDtPagConfirmaQualificacao" name="start"
																					min="2022-01" value={orientando.dt_confirmacaoTaxaD}
																					onChange={e => this.atualizarOrientando(e, orientando.id, "", "", e.target.value, "", "")}
																				/>
																			</div>
																		</td>

																		<td className={orientando.status_confirmacaoBancaD === 1 ? "table-warning" : "table-success"}>
																			<div class="form-group">
																				<select class="form-control form-control-sm" id="selectStatusBanca" style={{ width: "200px" }}
																					value={orientando.status_confirmacaoBancaD}
																					onChange={e => this.atualizarOrientando(e, orientando.id, "", "", "", e.target.value, "")}>
																					<option value="0">Selecionar</option>
																					{listaDeStatus.length > 0 ? (
																						listaDeStatus.map(item => (
																							item.id > 0 && item.id <= 2 ?
																								<option value={item.id}>{item.nome}</option> : ""
																						))
																					) : (
																						<option value="0">Nenhum resultado encontrado</option>
																					)}
																				</select>
																			</div>
																		</td>

																		<td>
																			<div class="form-group">
																				<textarea class="form-control" id="exampleFormControlTextarea1" style={{ width: "500px" }}
																					onChange={e => this.atualizarOrientando(e, orientando.id, "", "", "", "", e.target.value)}
																					value={orientando.observacao}
																				></textarea>
																			</div>
																		</td>

																		<td>{orientando.dtHCadOrientando}</td>
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
										</div>
									)}

									{this.state.idAreaConcentracao === 2 && (
										<div className='container-fluid'>
											<div className="table-responsive table-sm">
												<div class="table-wrapper">
													<table className="table text-center table-bordered table-striped  table-hover bg-white">
														<thead className="thead-light" >
															<tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																<th scope="col" className="sticky-col">Orientando</th>
																<th>Orientador</th>
																<th>Curso</th>
																<th>Fase do processo</th>
																<th>Data/hora de conclusão</th>
																<th>Data de confirmação da taxa de qualificação</th>
																<th>Confirmação da taxa de qualificação</th>
																<th>Data de confirmação da taxa de Defesa</th>
																<th>Confirmação da taxa de defesa</th>
																<th scope="col">Observação</th>
																<th>Data/hora de criação</th>
															</tr>
														</thead>
														<tbody className='modal-body'>
															{array_orientandosT.length > 0 ? (
																array_orientandosT.map(orientando => (
																	<tr key={orientando.id} title="Clique aqui para obter mais informações sobre o orientando">
																		<td className="sticky-col">{orientando.nome}</td>
																		<td>{orientando.orientador}</td>
																		<td>{orientando.curso}</td>
																		<td>{orientando.fase_processo}</td>
																		<td>{orientando.dataHoraConclusaoTb}</td>
																		<td className={orientando.status_confirmacaoBancaQ === 1 ? "table-warning" : "table-success"}>
																			<div className="form-group">
																				<input class="form-control form-control-sm" type="datetime-local" id="inputDtPagConfirmaQualificacao" name="start"
																					min="2022-01" value={orientando.dt_confirmacaoTaxaQ}
																					onChange={e => this.atualizarOrientando(e, orientando.id, e.target.value, "", "", "", "")}
																				/>
																			</div>
																		</td>
																		<td className={orientando.status_confirmacaoBancaQ === 1 ? "table-warning" : "table-success"}>
																			<div class="form-group">
																				<select class="form-control form-control-sm" id="selectStatusBanca" style={{ width: "200px" }}
																					value={orientando.status_confirmacaoBancaQ}
																					onChange={e => this.atualizarOrientando(e, orientando.id, "", e.target.value, "", "", "")}>
																					<option value="0">Selecionar</option>
																					{listaDeStatus.length > 0 ? (
																						listaDeStatus.map(item => (
																							item.id > 0 && item.id <= 2 ?
																								<option value={item.id}>{item.nome}</option> : ""
																						))
																					) : (
																						<option value="0">Nenhum resultado encontrado</option>
																					)}
																				</select>
																			</div>
																		</td>

																		<td className={orientando.status_confirmacaoBancaD === 1 ? "table-warning" : "table-success"}>
																			<div className="form-group">
																				<input class="form-control form-control-sm" type="datetime-local" id="inputDtPagConfirmaQualificacao" name="start"
																					min="2022-01" value={orientando.dt_confirmacaoTaxaD}
																					onChange={e => this.atualizarOrientando(e, orientando.id, "", "", e.target.value, "", "")}
																				/>
																			</div>
																		</td>

																		<td className={orientando.status_confirmacaoBancaD === 1 ? "table-warning" : "table-success"}>
																			<div class="form-group">
																				<select class="form-control form-control-sm" id="selectStatusBanca" style={{ width: "200px" }}
																					value={orientando.status_confirmacaoBancaD}
																					onChange={e => this.atualizarOrientando(e, orientando.id, "", "", "", e.target.value, "")}>
																					<option value="0">Selecionar</option>
																					{listaDeStatus.length > 0 ? (
																						listaDeStatus.map(item => (
																							item.id > 0 && item.id <= 2 ?
																								<option value={item.id}>{item.nome}</option> : ""
																						))
																					) : (
																						<option value="0">Nenhum resultado encontrado</option>
																					)}
																				</select>
																			</div>
																		</td>

																		<td>
																			<div class="form-group">
																				<textarea class="form-control" id="exampleFormControlTextarea1" style={{ width: "500px" }}
																					onChange={e => this.atualizarOrientando(e, orientando.id, "", "", "", "", e.target.value)}
																					value={orientando.observacao}
																				></textarea>
																			</div>
																		</td>
																		<td>{orientando.dtHCadOrientando}</td>
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
										</div>
									)}
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowAtualizarSolicitacao}
								onHide={() => this.handlerCloseModalAtualizarSolicitacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> ATA</h4>
								</Modal.Header>
								<Modal.Body>
									<div id='ata'>
										<div className='container page'>
											<AtaDefesa nome={this.state.nome}
												id_curso={this.state.id_curso}
												titulo_teseOuDissertacao={this.state.titulo_teseOuDissertacao}
												data_horaPrevista={this.state.data_horaPrevista}
												presidente={this.state.presidente}
												membro_interno={this.state.membro_interno}
												membro_externo={this.state.membro_externo}
												id_statusAta={this.state.id_statusAta}
												assinatura_presidente={this.state.assinatura_presidente}
												assinatura_membroInterno={this.state.assinatura_membroInterno}
												assinatura_membroExterno={this.state.assinatura_membroExterno}
												dtCadAta={this.state.dtCadAta}
												dataFormatAmericano={this.state.dataFormatAmericano} />
										</div>
										<button className='button' onClick={() => print('ata')}>Imprimir</button>
									</div>
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowGerarCertificado}
								onHide={() => this.handlerCloseModalGerarCertificado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
								centered>
								<Form onSubmit={this.cadastrarEatualizarCertificado}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaCalendarWeek /> {this.state.id_certificado === 0 ? `Gerar um novo certificado` : `Atualizar informações do certificado`}</h4>
									</Modal.Header>
									<Modal.Body>
										<div className='row'>
											<div className='col-sm-6'>
												<div class="form-group">
													<label htmlFor="cpf">CPF:</label>
													<input
														className="form-control form-control-sm"
														type="text"
														placeholder="INFORME O SEU CPF"
														name="Cpf"
														id='Cpf'
														onChange={(e) => handleCpf(e.target.value).then(result => this.setState({ cpf: result }))}
														value={this.state.cpf}
													/>
												</div>

												<div className="form-group">
													<label for="inputNomeCompleto">Nome Completo:</label>
													<input className="form-control form-control-sm" type="text" id='inputNomeCompleto' placeholder="Nome" name="nome"
														onChange={e => this.setState({ nome_completo: e.target.value })}
														value={this.state.nome_completo} />
												</div>

												<div class="form-group">
													<label for="inputCurso">Curso:</label>
													<textarea class="form-control form-control-sm" rows="5" id="inputCurso"
														onChange={e => this.setState({ curso: e.target.value })}
														value={this.state.curso}></textarea>
												</div>

												<div className="form-group">
													<label for="inputDtEmissaoDoDiploma">Data de emissão do diploma:</label>
													<input class="form-control form-control-sm" type="date" id="inputDtEmissaoDoDiploma" name="start"
														min="2022-01" value={this.state.data_emissaoDoDiploma}
														onChange={e => this.setState({ data_emissaoDoDiploma: e.target.value })}
													/>
												</div>
											</div>
											<div className='col-sm-6'>
												<div className="form-group">
													<label for="inputNumeroDoLivro">Número do livro:</label>
													<input className="form-control form-control-sm" type="number" placeholder="" id='inputNumeroDoLivro' name="inputNumeroDoLivro"
														onChange={e => this.setState({ numero_livro: e.target.value })}
														value={this.state.numero_livro}
													/>
												</div>

												<div className="form-group">
													<label for="inputNumeroDaPagina">Número da página:</label>
													<input className="form-control form-control-sm" type="number" placeholder="" id='inputNumeroDaPagina' name="inputNumeroDaPagina"
														onChange={e => this.setState({ numero_pagina: e.target.value })}
														value={this.state.numero_pagina}
													/>
												</div>

												<div className="form-group">
													<label for="inputNumeroDoRegistro">Número do registro:</label>
													<input className="form-control form-control-sm" type="number" placeholder="" id='inputNumeroDoRegistro' name="inputNumeroDoRegistro"
														onChange={e => this.setState({ numero_registro: e.target.value })}
														value={this.state.numero_registro}
													/>
												</div>

												<div className="form-group">
													<label for="inputDataLocal">Data do local:</label>
													<input class="form-control form-control-sm" type="date" id="inputDataLocal" name="start"
														min="2022-01" value={this.state.data_local}
														onChange={e => this.setState({ data_local: e.target.value })}
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
										<button id='btnCadastrarAnexo' className='button'>Confirmar</button>
									</Modal.Footer>
								</Form>
							</Modal>

							<Modal
								show={this.state.modalShowVisualizarCertificado}
								onHide={() => this.handlerCloseModalVisualizarCertificado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='xl'
								centered>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek /> Certificado de {this.state.nome_completo}</h4>
								</Modal.Header>
								<Modal.Body>
									<CertificadoPosGraduacao
										nome_completo={this.state.nome_completo}
										curso={this.state.curso}
										data_emissaoDoDiploma={this.state.data_emissaoDoDiploma}
										numero_livro={this.state.numero_livro}
										numero_pagina={this.state.numero_pagina}
										numero_registro={this.state.numero_registro}
										data_local={this.state.data_local}
										linkDoCertificado={this.state.linkDoCertificado}
										codigo_validacao={this.state.codigo_validacao}
									/>
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
							</Modal>

							<Modal
								show={this.state.modalShowVisualizarAta}
								onHide={() => this.handlerCloseModalVisualizarAta()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'

							>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> Visualizar ata de defesa</h4>
								</Modal.Header>
								<Modal.Body>

									<div id='ata'>
										<div className='container page'>
											<AtaDefesa nome={this.state.nome}
												id_curso={this.state.id_curso}
												titulo_teseOuDissertacao={this.state.titulo_teseOuDissertacao}
												data_horaPrevista={this.state.data_horaPrevista}
												presidente={this.state.presidente}
												membro_interno={this.state.membro_interno}
												membro_externo={this.state.membro_externo}
												id_statusAta={this.state.id_statusAta}
												assinatura_presidente={this.state.assinatura_presidente}
												assinatura_membroInterno={this.state.assinatura_membroInterno}
												assinatura_membroExterno={this.state.assinatura_membroExterno}
												dtCadAta={this.state.dtCadAta}
												dataFormatAmericano={this.state.dataFormatAmericano} />
										</div>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<button className='button' onClick={() => print('ata')}>Imprimir</button>
								</Modal.Footer>
							</Modal>

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
`;
