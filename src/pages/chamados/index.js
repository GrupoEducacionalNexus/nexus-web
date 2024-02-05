import { FaRegSave, FaCalendarWeek, FaFileAlt, FaEye, FaEyeSlash, FaFilter, FaSearch, FaPlus, FaRegWindowClose, FaUserGraduate, FaUserCheck, FaTv, FaRegCommentDots, FaBoxes, FaCloudDownloadAlt, FaDesktop } from 'react-icons/fa';
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import Menu from '../../components/Menu';
import { Accordion, Card, Col, Container, Modal, Nav, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import api from '../../services/api';
import { getToken } from '../../services/auth';
import { listaDeSetores } from '../../services/getListaDeSetores';
import { listaDePrioridades } from '../../services/getListaDePrioridades';
import { handleMoeda } from '../../services/mascaraMoeda';
import { uploadFile } from '../../services/uploadFile';
import { listaDeStatus } from '../../services/getListaDeStatus';
import { listaDeUsuariosDoSetor } from '../../services/getListaDeUsuariosDoSetor';
import Select from 'react-select';
import AccordionChamados from '../../components/AccordionChamados';
import UserContext from '../../UserContext';
import MainContent from '../../components/MainContent';
import AdminNavbar from '../../components/Navbar';
import FloatingMenu from '../../components/FloatingMenu';
import { dataHoraFormatada } from '../../services/dataHoraAtual';
import moment from 'moment';

export default class Index extends Component {
	static contextType = UserContext;
	constructor(props) {
		super();
		this.state = {
			id_usuario: 0,
			modalShowCadastrarChamado: false,
			modalShowEditarChamadoRecebido: false,
			modalShowEditarChamadoSolicitado: false,
			modalShowCadastrarTipoChamado: false,
			modalShowAtualizarTipoChamado: false,
			modalShowVisualizarSetores: false,
			modalShowFiltrarChamado: false,
			keyTab: 'Checklist',
			success: '',
			error: '',

			//Dados do chamado
			id_chamado: 0,
			idResponsavel: 0,
			descricao: '',
			idSetorResponsavel: 0,
			idTipoChamado: 0,
			idPrioridade: 0,
			valor: '',
			dataHoraFinalizacao: '',
			status: 0,
			setorResponsavel: "",
			prioridade: "",
			statusAtual: "",

			arraySetores: [],
			arrayTiposDeChamados: [],
			arrayPrioridades: [],
			arrayChamadosSolicitados: [],
			arrayChamadosRecebidos: [],
			arrayChamadosSemAtribuicao: [],
			arrayAnexosDoChamado: [],
			arrayStatus: [],
			arrayUsuariosDoSetorResponsavel: [],
			arrayUsuariosDoSetorParaAtribuicaoDeChamado: [],
			arraySetoresParticipantes: [],
			arraySelectedParticipantes: [],
			arraySetoresDoChamado: [],
			id_comentario: 0,
			comentario: "",
			arrayChamadosXComentarios: [],
			arrayParticipacoesEmChamados: [],
			checkIncluirInformacaoDePagamento: false,
			checkAnexarDocumento: false,
			id_tipoChamado: "",
			tipo_chamado: "",

			//Campos de pesquisa
			idChamadoPesq: 0,
			setorResponsavelPesq: "",
			prioridadePesq: "",
			dataHoraFinalizacaoPesq: "",
			statusPesq: "",
			descricaoPesq: "",

			arrayDadosDoSolicitante: [],
			idPermissao: [],
			arrayChamadosPorSetor: [],
			id_setor: 0
		};
	}

	componentDidMount() {
		const userContext = this.context;
		this.setState({ id_setor: userContext.user.id_setor });
		this.listaDeChamados(userContext.user.id_setor, 0);
		this.listaDeChamados(userContext.user.id_setor, 1);
		this.listaDeChamados(userContext.user.id_setor, 2);
		this.listaDeChamados(userContext.user.id_setor, 3);

		listaDePrioridades(getToken()).then(result => this.setState({ arrayPrioridades: result }));

		listaDeStatus(getToken()).then(result => result.length > 0 ?
			this.setState({ arrayStatus: result }) : this.setState({ arrayStatus: [] }));

		listaDeSetores(getToken()).then(result => {
			let arraySetoresParticipantes = [];
			if (result.length > 0) {
				result.map((item, index) => {
					arraySetoresParticipantes.push({ value: item.id, label: item.nome });
				});
				this.setState({ arraySetores: result, arraySetoresParticipantes });
			}
		});
	}

	setModalShowCadastrarTipoChamado(valor) {
		this.setState({ modalShowCadastrarTipoChamado: valor, success: '', error: '' });
	}

	handlerShowModalCadastrarTipoChamado() {
		this.setModalShowCadastrarTipoChamado(true);
		this.setState({
			id_tipoChamado: 0,
			tipo_chamado: ""
		});
		this.listaDeTiposDeChamado(this.state.idSetorResponsavel)
	}

	handlerCloseModalCadastrarTipoChamado() {
		this.setModalShowCadastrarTipoChamado(false);
	};

	setModalShowAtualizarTipoChamado(valor) {
		this.setState({ modalShowAtualizarTipoChamado: valor, success: '', error: '' });
	}

	handlerShowModalAtualizarTipoChamado(tipo_chamado) {
		console.log(tipo_chamado);
		this.setModalShowAtualizarTipoChamado(true);

		this.setState({
			id_tipoChamado: tipo_chamado.id,
			tipo_chamado: tipo_chamado.nome,
			idSetorResponsavel: tipo_chamado.idSetorResponsavel
		});
	}

	handlerCloseModalAtualizarTipoChamado() {
		this.setModalShowAtualizarTipoChamado(false);
		this.setState({
			id_tipoChamado: 0,
			tipo_chamado: ""
		});
	};

	setModalShowCadastrarChamado(valor) {
		this.setState({ modalShowCadastrarChamado: valor, success: '', error: '' });
	}

	handlerShowModalCadastrarChamado() {
		this.setModalShowCadastrarChamado(true);
		localStorage.removeItem("@link");
		this.setState({
			descricao: '',
			idTipoChamado: 0,
			idPrioridade: 0,
			valor: 0,
			idSetorResponsavel: 0,
			idResponsavel: 0,
			arraySelectedParticipantes: [],
			dataHoraFinalizacao: '',
			link: ''
		})
		listaDeSetores(getToken()).then(result => {
			let arraySetoresParticipantes = [];
			if (result.length > 0) {
				result.map((item, index) => {
					arraySetoresParticipantes.push({ value: item.id, label: item.nome });
				});
				this.setState({ arraySetores: result, arraySetoresParticipantes });
			}
		});
		listaDePrioridades(getToken()).then(result => this.setState({ arrayPrioridades: result }));
	}

	handlerCloseModalCadastrarChamado() {
		this.setModalShowCadastrarChamado(false);
		localStorage.removeItem("@link");
		this.setState({
			id_chamado: 0, descricao: "", idTipoChamado: 0,
			idPrioridade: 0, valor: "", idSetorResponsavel: ""
		});
		this.listaDeChamados(this.context.user.id_setor, 0);
	};

	setModalShowEditarChamadoRecebido(valor) {
		this.setState({ modalShowEditarChamadoRecebido: valor, success: '', error: '' });
	}

	handlerShowModalEditarChamadoRecebido(chamado) {
		this.setModalShowEditarChamadoRecebido(true);
		localStorage.removeItem("@link");
		this.confirmarVisualizacaoDeChamado(getToken(), chamado.id);
		this.anexosDoChamado(getToken(), chamado.id);
		this.listaDeComentarios(getToken(), chamado.id);
		this.onChangeSetorResponsavel(chamado.idSetorResponsavel);
		this.informacoesDoSolicitante(getToken(), chamado.idSolicitante, chamado.id);
		this.setState({
			id_chamado: chamado.id, descricao: chamado.descricao, idSetorResponsavel: chamado.idSetorResponsavel,
			setorResponsavel: chamado.setor_responsavel, prioridade: chamado.prioridade, statusAtual: chamado.status,
			idTipoChamado: chamado.idTipoChamado, idPrioridade: chamado.idPrioridade,
			valor: chamado.valor !== 0 ?
				chamado.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).substring(2) :
				chamado.valor,
			dataHoraFinalizacao: chamado.dataHoraFinalizacao, status: chamado.id_status, idResponsavel: this.state.id_usuario
		});
		this.listaSetoresDoChamado(getToken(), chamado.id);
	}

	handlerCloseModalEditarChamadoRecebido() {
		this.setModalShowEditarChamadoRecebido(false);
		this.setState({
			id_chamado: 0
		});
	};

	setModalShowFiltrarChamado(valor) {
		this.setState({ modalShowFiltrarChamado: valor, success: '', error: '' });
	}

	handlerShowModalFiltrarChamado() {
		this.setModalShowFiltrarChamado(true);
		this.listaDeChamados(this.context.user.id_setor, 4);
	}

	handlerCloseModalFiltrarChamado() {
		this.setModalShowFiltrarChamado(false);
	};

	setModalShowEditarChamadoSolicitado(valor) {
		this.setState({ modalShowEditarChamadoSolicitado: valor });
	}

	handlerShowModalEditarChamadoSolicitado(chamado) {
		this.setModalShowEditarChamadoSolicitado(true);
		this.anexosDoChamado(getToken(), chamado.id);
		this.onChangeSetorResponsavel(chamado.idSetorResponsavel);
		this.setState({
			id_chamado: chamado.id, descricao: chamado.descricao, idSetorResponsavel: chamado.idSetorResponsavel,
			idTipoChamado: chamado.idTipoChamado, idPrioridade: chamado.idPrioridade,
			valor: chamado.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).substring(2),
			dataHoraFinalizacao: chamado.dataHoraFinalizacao, status: chamado.id_status
		});
		this.listaSetoresDoChamado(getToken(), chamado.id);
		this.listaDeComentarios(getToken(), chamado.id);

	}

	handlerCloseModalEditarChamadoSolicitado() {
		this.setModalShowEditarChamadoSolicitado(false);
		this.setState({
			id_chamado: 0, arrayChamadosXComentarios: []
		});
	};

	onChangeSetorResponsavel = async (e) => {
		this.setState({ idSetorResponsavel: e });
		const indice = this.state.arraySetoresParticipantes.findIndex(objeto => objeto.value === parseInt(e));
		this.state.arraySetoresParticipantes.splice(indice, 1);
		this.listaDeTiposDeChamado(e);
		listaDeUsuariosDoSetor(getToken(), e).then(result => {
			this.setState({ arrayUsuariosDoSetorResponsavel: result });
		});
	}

	setModalShowVisualizarSetores(valor) {
		this.setState({ modalShowVisualizarSetores: valor, success: '', error: '' });
	}

	handlerShowModalVisualizarSetores() {
		this.setModalShowVisualizarSetores(true);
	}

	handlerCloseModalVisualizarSetores() {
		this.setModalShowVisualizarSetores(false);
	};


	listaDeTiposDeChamado = async (idSetorResponsavel) => {
		try {
			const response = await fetch(
				`${api.baseURL}/setores/${idSetorResponsavel}/tipos_chamados`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					},
				}
			);

			const data = await response.json();
			console.log(data);
			if (data.status === 200) {
				this.setState({ arrayTiposDeChamados: data.resultados });
			}
		} catch (error) {
			console.log(error);
		}
	}

	cadastrarEAtualizarChamado = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });

		try {
			const { descricao, idSetorResponsavel, idTipoChamado,
				idPrioridade, valor, dataHoraFinalizacao, id_chamado, status, idResponsavel, arraySelectedParticipantes } = this.state;

			if (!descricao || !idSetorResponsavel || !idTipoChamado || !idPrioridade) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const url = id_chamado === 0 ? `${api.baseURL}/chamados` : `${api.baseURL}/chamados/${id_chamado}`;

			const response = await fetch(`${url}`, {
				method: id_chamado === 0 ? 'POST' : 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken(),
				},
				body: id_chamado === 0 ? JSON.stringify({
					descricao, idTipoChamado,
					idPrioridade, valor, idSetorResponsavel,
					idResponsavel: parseInt(idResponsavel), arraySelectedParticipantes, dataHoraFinalizacao,
					link: JSON.parse(localStorage.getItem('@link')) ? JSON.parse(localStorage.getItem('@link')) : ""
				}) : JSON.stringify({
					descricao, dataHoraFinalizacao, idResponsavel
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeChamados(this.context.user.id_setor, 1);
				this.listaDeChamados(this.context.user.id_setor, 0);
				localStorage.removeItem("@link");
				if (id_chamado !== 0) {
					this.listaDeComentarios(getToken(), id_chamado);
					return
				}

				setTimeout(() => this.handlerCloseModalCadastrarChamado(), 3000);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}


	listaDeChamados = async (id_setor = 0, tipo = 0, id_chamado = 0,
		idSetorResponsavel = 0, idPrioridade = 0,
		dataHoraFinalizacao = "", status = 0, descricao = "") => {
		try {
			const response = await fetch(`${api.baseURL}/setores/${id_setor}/chamados?tipo=${tipo}&
			id_chamado=${id_chamado}&idSetorResponsavel=${idSetorResponsavel}&
			idPrioridade=${idPrioridade}&dataHoraFinalizacao=${dataHoraFinalizacao}&status=${status}&descricao=${descricao}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'x-access-token': getToken()
					}
				}
			);

			const data = await response.json();

			if (data.status === 200) {

				let arrayChamadosRecebidosComOstatusSolicitados = [];
				let arrayChamadosRecebidosComOstatusEmProducao = [];
				let arrayChamadosRecebidosComOstatusFinalizados = [];

				if (tipo === 0) {
					data.resultados.map((chamado, index) => {
						if (chamado.id_status === 5) {
							arrayChamadosRecebidosComOstatusSolicitados.push(
								{
									id: chamado.id, title: `Chamado ${chamado.id}`, description: chamado.tipo_chamado, label: chamado.dataHoraFinalizacao, metadata: chamado, style: {
										backgroundColor:
											moment(chamado.dataHoraFinalizacao, 'YYYY-MM-DD HH:mm').isAfter(moment(dataHoraFormatada, 'YYYY-MM-DD HH:mm')) ? '' : '#F5C6CB'
									}
								}
							)
						}

						if (chamado.id_status === 7) {
							arrayChamadosRecebidosComOstatusFinalizados.push(
								{ id: chamado.id, title: `Chamado ${chamado.id}`, description: chamado.tipo_chamado, label: chamado.dataHoraFinalizacao, metadata: chamado, style: { backgroundColor: moment(chamado.dataHoraFinalizacao, 'YYYY-MM-DD HH:mm').isAfter(moment(dataHoraFormatada, 'YYYY-MM-DD HH:mm')) ? '' : '#F5C6CB' } }
							)
						}

						if (chamado.id_status === 9) {
							arrayChamadosRecebidosComOstatusEmProducao.push(
								{ id: chamado.id, title: `Chamado ${chamado.id}`, description: chamado.tipo_chamado, label: chamado.dataHoraFinalizacao, metadata: chamado, style: { backgroundColor: moment(chamado.dataHoraFinalizacao, 'YYYY-MM-DD HH:mm').isAfter(moment(dataHoraFormatada, 'YYYY-MM-DD HH:mm')) ? '' : '#F5C6CB' } }
							)
						}
					});
				}

				if (tipo === 1) {
					this.setState({ arrayChamadosSolicitados: data.resultados });
					return
				}

				if (tipo === 2) {
					this.setState({ arrayChamadosSemAtribuicao: data.resultados });
					listaDeUsuariosDoSetor(getToken(), data.id_setor).then(result => this.setState({ arrayUsuariosDoSetorParaAtribuicaoDeChamado: result }));
					return
				}

				if (tipo === 3) {
					this.setState({ arrayParticipacoesEmChamados: data.resultados });
					return
				}

				if (tipo === 4) {
					this.setState({ arrayChamadosPorSetor: data.resultados });
					return
				}

				this.setState({
					id_usuario: data.id_usuario,
					idSetorResponsavel: parseInt(data.id_setor),
					idPermissao: data.id_permissao,
					arrayChamadosRecebidos: data.resultados
				});

				console.log(this.state.data);

			}
		} catch (error) {
			console.log(error);
		}
	};

	anexosDoChamado = async (token, id_chamado) => {
		try {
			const response = await fetch(`${api.baseURL}/chamados/${id_chamado}/anexos`,
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

				this.setState({ arrayAnexosDoChamado: data.resultados });
			}
		} catch (error) {
			console.log(error);
		}
	};

	onChangeFileInput = (e) => {
		console.log(e);
		uploadFile(e, `nexus/chamados/`);
	}

	confirmarVisualizacaoDeChamado = async (token, id_chamado) => {
		try {
			const response = await fetch(`${api.baseURL}/chamados/${id_chamado}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				},
				body: JSON.stringify({
					visualizado: 1
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.listaDeChamados(this.context.user.id_setor, 0);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	alterarResponsavelDoChamado = async (token, id_chamado, idResponsavel) => {
		this.setState({ idResponsavel });
		try {
			const response = await fetch(`${api.baseURL}/chamados/${id_chamado}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				},
				body: JSON.stringify({
					idResponsavel
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.listaDeChamados(this.context.user.id_setor, 0);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	alterarDataDeFinalizacaoDoChamado = async (token, id_chamado, dataHoraFinalizacao) => {
		this.setState({ dataHoraFinalizacao });
		try {
			const response = await fetch(`${api.baseURL}/chamados/${id_chamado}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				},
				body: JSON.stringify({
					dataHoraFinalizacao
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.listaDeChamados(this.context.user.id_setor, 0);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	limpaFiltro = (id_setor, tipo) => {
		this.listaDeChamados(id_setor, tipo);
		this.setState({
			idChamadoPesq: "",
			setorResponsavelPesq: "",
			prioridadePesq: "",
			dataHoraFinalizacaoPesq: "",
			statusPesq: ""
		});
	}

	onChangeSetoresParticipantes = (e) => {
		console.log(e.target);
	}

	listaSetoresDoChamado = async (token, id_chamado) => {
		try {
			const response = await fetch(
				`${api.baseURL}/chamados/${id_chamado}/setores`,
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
				this.setState({ arraySetoresDoChamado: data.resultados });
			}
		} catch (error) {
			console.log(error);
		}
	}

	handleDragEnd = async (cardId, sourceLaneId, targetLaneId) => {
		const response = await fetch(`${api.baseURL}/chamados/${cardId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getToken()
			},
			body: JSON.stringify({
				status: targetLaneId
			})
		});

		const data = await response.json();

		if (data.status === 200) {
			this.listaDeChamados(this.context.user.id_setor, 0);
			this.listaDeComentarios(getToken(), cardId);
		}

	}

	onCardClick = (cardId, metadata, laneId) => {
		console.log(cardId, metadata, laneId);
		this.handlerShowModalEditarChamadoRecebido(metadata);
	}

	cadastrarEatualizarComentario = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { id_chamado, comentario, arraySetoresDoChamado } = this.state;

			if (!comentario) {
				this.setState({ error: 'Informe um comentário!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/comentarios`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					id_chamado,
					descricao: comentario,
					arraySetoresDoChamado,
					anexo: JSON.parse(localStorage.getItem('@link')) ? JSON.parse(localStorage.getItem('@link')) : null
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeComentarios(getToken(), id_chamado);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeComentarios = async (token, id_chamado) => {

		try {
			const response = await fetch(
				`${api.baseURL}/chamados/${id_chamado}/comentarios`,
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
					this.setState({ arrayChamadosXComentarios: data.resultados });

				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	atribuirResponsavelDoChamado = async (idChamado, idResponsavel) => {
		const response = await fetch(`${api.baseURL}/chamados/${idChamado}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getToken()
			},
			body: JSON.stringify({
				idResponsavel
			})
		});

		const data = await response.json();

		if (data.status === 200) {
			this.listaDeChamados(this.context.user.id_setor, 0);
			this.listaDeChamados(this.context.user.id_setor, 2);
		}
	}

	alteraIncluirInformacaoDePagamento = () => {
		this.setState({ checkIncluirInformacaoDePagamento: !this.state.checkIncluirInformacaoDePagamento });
	}

	alteraAnexarDocumento = () => {
		this.setState({ checkAnexarDocumento: !this.state.checkAnexarDocumento });
	}

	handleClick = e => {
		this.setState({ target: e.target, show: !this.state.show });
	};

	cadastrarEatualizarTipoChamado = async (e) => {
		e.preventDefault();
		this.setState({ success: "", error: "" });
		const { id_tipoChamado, tipo_chamado, idSetorResponsavel } = this.state;

		if (!tipo_chamado) {
			this.setState({ error: "Por favor, preecher todos os campos!" });
			return;
		}

		const response = await fetch(`${api.baseURL}/tipos_chamados${id_tipoChamado !== 0 ? `/${id_tipoChamado}` : ``}`, {
			method: id_tipoChamado !== 0 ? 'PUT' : 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getToken(),
			},
			body: JSON.stringify({
				nome: tipo_chamado, idSetorResponsavel
			})
		});

		const data = await response.json();

		if (parseInt(data.status) === 200) {
			this.setState({ success: data.msg });
			this.listaDeTiposDeChamado(idSetorResponsavel);
		}

		if (parseInt(data.status) === 400) {
			this.setState({ error: data.msg });
		}
	}

	informacoesDoSolicitante = async (token, idSolicitante, id_chamado) => {
		try {
			const response = await fetch(
				`${api.baseURL}/chamados/${id_chamado}/solicitante?idSolicitante=${idSolicitante}`,
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
				this.setState({ arrayDadosDoSolicitante: data.resultados });
			}
		} catch (error) {
			console.log(error);
		}
	}

	atualizarStatusDoChamado = async (idChamado, status, tipo_chamado) => {
		const response = await fetch(`${api.baseURL}/chamados/${idChamado}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getToken()
			},
			body: JSON.stringify({
				status
			})
		});

		const data = await response.json();

		if (data.status === 200) {
			if (tipo_chamado === 0) {
				this.listaDeChamados(this.context.user.id_setor, 0);
				return;
			}

			if (tipo_chamado === 1) {
				this.listaDeChamados(this.context.user.id_setor, 1);
				return;
			}

			if (tipo_chamado === 2) {
				this.listaDeChamados(this.context.user.id_setor, 2);
				return;
			}

			if (tipo_chamado === 3) {
				this.listaDeChamados(this.context.user.id_setor, 4);
				return;
			}

		}
	}

	render() {
		const arrayChamadosRecebidos = this.state.arrayChamadosRecebidos;
		const arrayChamadosSolicitados = this.state.arrayChamadosSolicitados;
		const arrayChamadosSemAtribuicao = this.state.arrayChamadosSemAtribuicao;
		const arrayParticipacoesEmChamados = this.state.arrayParticipacoesEmChamados;
		return (

			<Container fluid >
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
										<a onClick={() => this.handlerShowModalCadastrarChamado()}><FaPlus /> Solicitar chamado</a>
									</li>
									<li>
										<a onClick={() => this.handlerShowModalFiltrarChamado()}><FaPlus /> Filtrar chamado</a>
									</li>
									<li>
										<a onClick={() => this.handlerShowModalCadastrarTipoChamado()}><FaPlus /> Tipos de chamado</a>
									</li>
									{this.context.user.id_permissao.includes(14) ? (
										<li>
											<a onClick={() => this.handlerShowModalVisualizarSetores()}><FaPlus /> Diretoria</a>
										</li>
									) : ("")}
								</ul>
							</FloatingMenu>

							<Tab.Container id="left-tabs-example" defaultActiveKey="chamados_recebidos">
								<Row>
									<Col sm={2}>
										<Nav variant="pills" className="flex-column">
											<Nav.Item>
												<Nav.Link eventKey="chamados_recebidos"><FaDesktop /> Chamados Recebidos</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="chamados_solicitados"><FaDesktop /> Chamados Solicitados</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="chamadosSemAtribuicao"><FaDesktop /> Chamados sem Atribuição</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="participacoesEmChamados"><FaDesktop /> Participações em Chamados</Nav.Link>
											</Nav.Item>
										</Nav>
									</Col>
									<Col sm={10}>
										<Tab.Content>
											<Tab.Pane eventKey="chamados_recebidos">
												<Container style={{ backgroundColor: "#F8F9FA" }}>
													<div className="row d-flex justify-content-center border p-3" >
														{['SOLICITADO', 'EM PRODUÇÃO', 'FINALIZADO(A)'].map((status) => (
															<div key={status} className="col-sm-4" style={{ cursor: 'pointer' }}>
																<h6 className='text-center font-weight-bold'>{status}</h6>
																<Container style={{ maxHeight: "400px", overflowY: 'scroll' }} className='p-4'>
																	{arrayChamadosRecebidos
																		.filter((chamado) => chamado.status === status)
																		.map((chamado) => (
																			<div key={chamado.id} className={`card zoom ${chamado.id_status === 5 ? `border-primary` : chamado.id_status === 9 ? `border-warning` : `border-success`} `} >
																				<div className="card-body d-flex flex-column">
																					<h6 className="card-title font-weight-bold">{`${chamado.id} - ${chamado.tipo_chamado}`}</h6>
																					<h6 className='text-center'>{`${chamado.status}`}</h6>
																					<h6>Conclusão: {chamado.dataHoraFinalizacaoFormatado}</h6>
																					<p className="card-text" style={{ height: "80px", overflowY: "scroll" }}>{chamado.descricao}</p>
																					<button className='w-100 btn btn-sm btn-outline-primary mb-2 ' onClick={() => this.handlerShowModalEditarChamadoRecebido(chamado)}>Visualizar</button>
																					{chamado.id_status === 5 && (
																						<button className='w-100 btn btn-sm btn-outline-warning' onClick={() => this.atualizarStatusDoChamado(chamado.id, 9, 0)}>Mover para Produção</button>
																					)}
																					{chamado.id_status === 9 && (
																						<button className='w-100 btn btn-sm btn-outline-success' onClick={() => this.atualizarStatusDoChamado(chamado.id, 7, 0)}>Finalizar</button>
																					)}
																				</div>
																			</div>
																		))}
																	{arrayChamadosRecebidos.filter((chamado) => chamado.status === status).length === 0 && (
																		<div className="card">
																			<div className="card-body">
																				<h5 className="card-title text-center">Nenhum chamado disponível {status.localeCompare('EM PRODUÇÃO') > -1 ? `` : `em`} {status.toLowerCase()}</h5>
																			</div>
																		</div>
																	)}
																</Container>
															</div>
														))}
													</div>
												</Container>
											</Tab.Pane>
											<Tab.Pane eventKey="chamados_solicitados">
												<Container fluid style={{ backgroundColor: "#F8F9FA" }}>
													<div className="row d-flex justify-content-center mt-3">
														{['SOLICITADO', 'EM PRODUÇÃO', 'FINALIZADO(A)'].map((status) => (
															<div key={status} className="col-sm-4" style={{ cursor: 'pointer' }}>
																<h6 className='text-center font-weight-bold'>{status}</h6>
																<Container style={{ maxHeight: "400px", overflowY: 'scroll' }} className='p-4'>
																	{arrayChamadosSolicitados
																		.filter((chamado) => chamado.status === status)
																		.map((chamado) => (
																			<div key={chamado.id} className={`card zoom ${chamado.id_status === 5 ? `border-primary` : chamado.id_status === 9 ? `border-warning` : `border-success`} `}>
																				<div className="card-body d-flex flex-column">
																					<h6 className="card-title font-weight-bold">{`${chamado.id} - ${chamado.tipo_chamado}`}</h6>
																					<h6 className='text-center'>{`${chamado.status}`}</h6>
																					<h6>Conclusão: {chamado.dataHoraFinalizacaoFormatado}</h6>
																					<p className="card-text fs-6" style={{ height: "80px", overflowY: "scroll" }}>{chamado.descricao}</p>
																					<button className='w-100 btn btn-sm btn-outline-primary mb-2 ' onClick={() => this.handlerShowModalEditarChamadoSolicitado(chamado)}>Visualizar</button>
																				</div>
																			</div>
																		))}
																	{arrayChamadosSolicitados.filter((chamado) => chamado.status === status).length === 0 && (
																		<div className="card">
																			<div className="card-body">
																				<h5 className="card-title text-center">Nenhum chamado disponível {status.localeCompare('EM PRODUÇÃO') > -1 ? `` : `em`} {status.toLowerCase()}</h5>
																			</div>
																		</div>
																	)}
																</Container>
															</div>
														))}
													</div>
												</Container>
											</Tab.Pane>
											<Tab.Pane eventKey="chamadosSemAtribuicao">
												<Container fluid style={{ backgroundColor: "#F8F9FA" }}>
													<div className="row d-flex justify-content-center mt-3">
														{['SOLICITADO', 'EM PRODUÇÃO', 'FINALIZADO(A)'].map((status) => (
															<div key={status} className="col-sm-4" style={{ cursor: 'pointer' }}>
																<h6 className='text-center font-weight-bold'>{status}</h6>
																<Container style={{ maxHeight: "400px", overflowY: 'scroll' }} className='p-4'>
																	{arrayChamadosSemAtribuicao
																		.filter((chamado) => chamado.status === status)
																		.map((chamado) => (
																			<div key={chamado.id} className={`card zoom ${chamado.id_status === 5 ? `border-primary` : chamado.id_status === 9 ? `border-warning` : `border-success`} `}>
																				<div className="card-body d-flex flex-column">
																					<h6 className="card-title font-weight-bold">{`${chamado.id} - ${chamado.tipo_chamado}`}</h6>
																					<h6 className='text-center'>{`${chamado.status}`}</h6>
																					<h6>Conclusão: {chamado.dataHoraFinalizacaoFormatado}</h6>
																					<p className="card-text fs-6" style={{ height: "80px", overflowY: "scroll" }}>{chamado.descricao}</p>
																					<div className="form-group">
																						<select class="form-control form-control-sm" id="selectResponsavel"
																							onChange={(e) => this.atribuirResponsavelDoChamado(chamado.id, parseInt(e.target.value))}>
																							<option value="0">Selecione</option>
																							{this.state.arrayUsuariosDoSetorParaAtribuicaoDeChamado.length > 0 ?
																								this.state.arrayUsuariosDoSetorParaAtribuicaoDeChamado.map(setor => (
																									<option value={setor.id}>{setor.nome}</option>
																								))
																								: (<option>0</option>)
																							}
																						</select>
																						<div className='d-flex justify-content-center mt-2'>
																							<button className='button' onClick={() => this.handlerShowModalEditarChamadoRecebido(chamado)}>Visualizar</button>
																						</div>
																						{chamado.id_status === 5 && (
																							<button className='w-100 btn btn-sm btn-outline-warning' onClick={() => this.atualizarStatusDoChamado(chamado.id, 9)}>Mover para Produção</button>
																						)}
																						{chamado.id_status === 9 && (
																							<button className='w-100 btn btn-sm btn-outline-success' onClick={() => this.atualizarStatusDoChamado(chamado.id, 7)}>Finalizar</button>
																						)}

																					</div>
																				</div>
																			</div>
																		))}
																	{arrayChamadosSemAtribuicao.filter((chamado) => chamado.status === status).length === 0 && (
																		<div className="card">
																			<div className="card-body">
																				<h5 className="card-title text-center">Nenhum chamado disponível {status.localeCompare('EM PRODUÇÃO') > -1 ? `` : `em`} {status.toLowerCase()}</h5>
																			</div>
																		</div>
																	)}
																</Container>
															</div>
														))}
													</div>
												</Container>
											</Tab.Pane>
											<Tab.Pane eventKey="participacoesEmChamados">
												<div className="row d-flex justify-content-center mt-3">
													{['SOLICITADO', 'EM PRODUÇÃO', 'FINALIZADO(A)'].map((status) => (
														<div key={status} className="col-sm-4" style={{ cursor: 'pointer' }}>
															<h6 className='text-center font-weight-bold'>{status}</h6>
															<Container style={{ maxHeight: "400px", overflowY: 'scroll', backgroundColor: "#F8F9FA" }} className='p-4'>
																{arrayParticipacoesEmChamados
																	.filter((chamado) => chamado.status === status)
																	.map((chamado) => (
																		<div key={chamado.id} className={`card zoom ${chamado.id_status === 5 ? `border-primary` : chamado.id_status === 9 ? `border-warning` : `border-success`} `} >
																			<div className="card-body d-flex flex-column">
																				<h6 className="card-title font-weight-bold">{`${chamado.id} - ${chamado.tipo_chamado}`}</h6>
																				<h6 className='text-center'>{`${chamado.status}`}</h6>
																				<h6>Conclusão: {chamado.dataHoraFinalizacaoFormatado}</h6>
																				<p className="card-text fs-6" style={{ height: "80px", overflowY: "scroll" }}>{chamado.descricao}</p>
																				<button className='w-100 btn btn-sm btn-outline-primary mb-2 ' onClick={() => this.handlerShowModalEditarChamadoSolicitado(chamado)}>Visualizar</button>
																				{/* {chamado.id_status === 5 && (
																		<button className='w-100 btn btn-sm btn-outline-warning' onClick={() => this.atualizarStatusDoChamado(chamado.id, 9)}>Mover para Produção</button>
																	)}
																	{chamado.id_status === 9 && (
																		<button className='w-100 btn btn-sm btn-outline-success' onClick={() => this.atualizarStatusDoChamado(chamado.id, 7)}>Finalizar</button>
																	)} */}
																			</div>
																		</div>
																	))}
																{arrayParticipacoesEmChamados.filter((chamado) => chamado.status === status).length === 0 && (
																	<div className="card">
																		<div className="card-body">
																			<h5 className="card-title text-center">Nenhum chamado disponível {status.localeCompare('EM PRODUÇÃO') > -1 ? `` : `em`} {status.toLowerCase()}</h5>
																		</div>
																	</div>
																)}
															</Container>
														</div>
													))}
												</div>
											</Tab.Pane>
										</Tab.Content>
									</Col>
								</Row>
							</Tab.Container>

							{/* <Tabs
								defaultActiveKey="chamados_recebidos"
								id="fill-tab-solicitacoes"
								className="justify-content-center"
								variant='pills'>

								<Tab eventKey="chamados_recebidos" title={`Chamados recebidos`}>

								</Tab>

								<Tab eventKey="chamados_solicitados" title={`Chamados solicitados`}>

								</Tab>

								<Tab eventKey="chamadosSemAtribuicao" title={`Chamados sem atribuição`}>

								</Tab>

								<Tab eventKey="participacoesEmChamados" title={`Participações em chamados`}>

								</Tab>
							</Tabs> */}

							<Modal
								show={this.state.modalShowCadastrarChamado}
								onHide={() => this.handlerCloseModalCadastrarChamado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'>
								<Form onSubmit={this.cadastrarEAtualizarChamado}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaPlus />Solicitar chamado</h4>
									</Modal.Header>
									<Modal.Body >
										<div className='container'>
											<div class="form-group">
												<label for="exampleFormControlTextarea1">Descrição:*</label>
												<textarea class="form-control" id="descricao" rows="3"
													onChange={(e) =>
														this.setState({ descricao: e.target.value })
													}
												></textarea>
											</div>

											<div className='row'>
												<div className='col-sm-4'>
													<div className="form-group">
														<label htmlFor="selectSetorResponsavel">Setor responsável:*</label>
														<select class="form-control form-control-sm" id="selectSetorResponsavel"
															onChange={(e) => this.onChangeSetorResponsavel(e.target.value)}>
															<option value="0">Selecione</option>
															{this.state.arraySetores.length > 0 ?
																this.state.arraySetores.map(setor => (
																	<option value={setor.id}>{setor.nome}</option>
																))
																: (<option>0</option>)
															}
														</select>
													</div>
												</div>

												<div className='col-sm-4'>
													<div className="form-group">
														<label htmlFor="selectSetorResponsavel">Responsável:*</label>
														<select class="form-control form-control-sm" id="selectSetorResponsavel"
															onChange={(e) => this.setState({ idResponsavel: e.target.value })}>
															<option value="0">Selecione</option>
															{this.state.arrayUsuariosDoSetorResponsavel.length > 0 ?
																this.state.arrayUsuariosDoSetorResponsavel.map(setor => (
																	<option value={setor.id}>{setor.nome}</option>
																))
																: (<option>0</option>)
															}
														</select>
													</div>
												</div>

												<div className='col-sm-4'>
													<div className="form-group">
														<label htmlFor="idTipoSolicitacao">Tipo do chamado:*</label>
														<select class="form-control form-control-sm" id="idTipoSolicitacao"
															onChange={e => this.setState({ idTipoChamado: e.target.value })}>
															<option value="0">Selecione</option>
															{this.state.arrayTiposDeChamados.length > 0 ?
																this.state.arrayTiposDeChamados.map(tipo => (
																	<option value={tipo.id}>{tipo.nome}</option>
																))
																: (<option>0</option>)
															}
														</select>
													</div>
												</div>
											</div>

											<div className='row'>
												<div className='col-sm-4'>
													<div className="form-group">
														<label htmlFor="selectSetoresParticipantes">Setores participantes:*</label>
														<Select
															closeMenuOnSelect={false}
															isMulti
															options={this.state.arraySetoresParticipantes}
															onChange={(e) => this.setState({ arraySelectedParticipantes: e })}
														/>
													</div>
												</div>

												<div className='col-sm-4'>
													<div className="form-group">
														<label htmlFor="selectPrioridade">Prioridade:*</label>
														<select class="form-control form-control-sm" id="selectPrioridade"
															onChange={e => this.setState({ idPrioridade: e.target.value })}>
															<option value="0">Selecione</option>
															{this.state.arrayPrioridades.length > 0 ?
																this.state.arrayPrioridades.map(prioridade => (
																	<option value={prioridade.id}>{prioridade.nome}</option>
																))
																: (<option>0</option>)
															}
														</select>
													</div>
												</div>
												<div className='col-sm-4'>
													<div className="form-group">
														<label for="dataHoraPrevista">Data de conclusão:</label>
														<input class="form-control form-control-sm" type="date" id="dataFinalizacao" name="start"
															min="2022-01"
															onChange={e => this.setState({ dataHoraFinalizacao: e.target.value })}
															value={this.state.dataHoraFinalizacao}
														/>
													</div>
												</div>
											</div>

											<div className='col-sm-6'>
												<div class="col-auto">
													<div class="custom-control custom-checkbox mr-sm-2">
														<input type="checkbox" class="custom-control-input" id="checkIncluirInformacaoDePagamento"
															checked={this.state.checkIncluirInformacaoDePagamento}
															onChange={this.alteraIncluirInformacaoDePagamento}
														/>
														<label class="custom-control-label" for="checkIncluirInformacaoDePagamento">Incluir informações de pagamento</label>
													</div>
												</div>

												<div class="col-auto">
													<div class="custom-control custom-checkbox mr-sm-2">
														<input type="checkbox" class="custom-control-input" id="checkAnexarDocumento"
															checked={this.state.checkAnexarDocumento}
															onChange={this.alteraAnexarDocumento}
														/>
														<label class="custom-control-label" for="checkAnexarDocumento">Anexar documento</label>
													</div>
												</div>
											</div>

											<hr />

											<div className='row'>
												{this.state.checkIncluirInformacaoDePagamento && (
													<div className='col-sm-6'>
														<div className="form-group">
															<label htmlFor="nome">Valor</label>
															<input
																type="text"
																className="form-control form-control-sm"
																id="valor"
																placeholder="Informe o valor"
																autoComplete="off"
																onChange={(e) =>
																	handleMoeda(e.target.value).then(result => this.setState({ valor: result }))
																}
																value={this.state.valor}
															/>
														</div>
													</div>)}
											</div>

											{this.state.checkAnexarDocumento && (
												<div className='container'>
													<div className="form-group mb-3">
														<label for="anexo">Anexar arquivo</label>
														<input type="file" className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
													</div>

													<div class="progress">
														<div id='progresso' className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
													</div>
												</div>
											)}

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
										</div>
									</Modal.Body>
									<Modal.Footer>
										<button id='btnCadastrarAnexo' className='btn btn-outline-primary btn-sm'><FaRegSave /> Salvar</button>
									</Modal.Footer>
								</Form>
							</Modal>


							<Modal
								show={this.state.modalShowEditarChamadoRecebido}
								onHide={() => this.handlerCloseModalEditarChamadoRecebido()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								className='modal-fullscreen'>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek />Detalhes do chamado: {this.state.id_chamado}</h4>
								</Modal.Header>
								<Modal.Body style={{ maxHeight: "600px", overflowY: "scroll", padding: "25px" }}>
									<div className='row'>
										<div className='col-sm-4'>
											<Accordion >
												<Accordion.Item eventKey="0">
													<Accordion.Header>
														<h6 className='font-weight-bold text-center'><FaCalendarWeek /> Setores participantes</h6>
													</Accordion.Header>
													<Accordion.Body>
														<ul class="list-group">
															{this.state.arraySetoresDoChamado.length > 0 ? (
																this.state.arraySetoresDoChamado.map((item, index) => (
																	<li class="list-group-item text-dark">{item.nome}</li>
																))
															) : (
																<li class="list-group-item text-danger">Nenhum setor está participando do chamado!</li>
															)}
														</ul>
													</Accordion.Body>
												</Accordion.Item>
											</Accordion>

											<Accordion >
												<Accordion.Item eventKey="1">
													<Accordion.Header>
														<h6 className='font-weight-bold text-center'><FaBoxes />Informações do solicitante</h6>													</Accordion.Header>
													<Accordion.Body>
														{this.state.arrayDadosDoSolicitante.length > 0 ? (
															<ul class="list-group">
																<li className="list-group-item text-dark">Nome: {this.state.arrayDadosDoSolicitante[0].nome}</li>
																<li className="list-group-item text-dark">Setor: {this.state.arrayDadosDoSolicitante[0].setor}</li>
															</ul>
														) : ("")}
													</Accordion.Body>
												</Accordion.Item>
											</Accordion>

											<Accordion >
												<Accordion.Item eventKey="2">
													<Accordion.Header>
														<h6 className='font-weight-bold text-center'><FaCalendarWeek /> Informações da solicitação</h6>
													</Accordion.Header>
													<Accordion.Body>
														<ul className="list-group">
															<li className="list-group-item text-dark d-inline-block" style={{ maxWidth: '600px', overflowY: "scroll", maxHeight: '400px' }}><b>Descrição:</b> {this.state.descricao}</li>
															<li className="list-group-item text-dark"><b>Setor responsável:</b> {this.state.setorResponsavel}</li>
															<li className="list-group-item text-dark"><b>Prioridade:</b> {this.state.prioridade} - <b>Status atual:</b> {this.state.statusAtual}</li>
														</ul>
													</Accordion.Body>
												</Accordion.Item>
											</Accordion>

											{this.state.arrayAnexosDoChamado.length > 0 ? (
												<Accordion >
													<Accordion.Item eventKey="2">
														<Accordion.Header>
															<h6 className='font-weight-bold text-center'><FaCalendarWeek /> Arquivos anexados</h6>
														</Accordion.Header>
														<Accordion.Body>
															<table className="table table-sm text-center">
																<thead>
																	<tr>
																		<th scope="col">Link</th>
																		<th scope="col">Responsável pelo anexo</th>
																		<th scope="col">Data/hora de criação</th>
																	</tr>
																</thead>
																<tbody>
																	{this.state.arrayAnexosDoChamado.length > 0 ? (
																		this.state.arrayAnexosDoChamado.map((item, index) => (
																			<tr key={index}>
																				<td scope="row"><a href={item.link}>arquivo</a></td>
																				<td>{item.responsavel_anexo}</td>
																				<td>{item.dataHoraCriacao}</td>
																			</tr>
																		))
																	) : (
																		<tr>
																			<td colSpan="12">Nenhum item foi anexado</td>
																		</tr>
																	)}
																</tbody>
															</table>
														</Accordion.Body>
													</Accordion.Item>
												</Accordion>
											) : ("")}
										</div>

										<div className='col-sm-3'>
											<h6 className='font-weight-bold text-center'>Ações</h6>
											<div className="form-group">
												<label htmlFor="selectSetorResponsavel">Alterar responsável:</label>
												<select className="form-control form-control-sm" id="selectSetorResponsavel" value={this.state.idResponsavel}
													onChange={(e) => this.alterarResponsavelDoChamado(getToken(), this.state.id_chamado, e.target.value)}>
													<option value="0">Selecione</option>
													{this.state.arrayUsuariosDoSetorResponsavel.length > 0 ?
														this.state.arrayUsuariosDoSetorResponsavel.map(setor => (
															<option value={setor.id}>{setor.nome}</option>
														))
														: (<option>0</option>)
													}
												</select>
											</div>

											<div className="form-group">
												<label for="dataHoraPrevista">Alterar data de conclusão:</label>
												<input class="form-control form-control-sm" type="date" id="dataHoraFinalizacao" name="start"
													min="2022-01"
													onChange={e => this.alterarDataDeFinalizacaoDoChamado(getToken(), this.state.id_chamado, e.target.value)}
													value={this.state.dataHoraFinalizacao}
												/>
											</div>

											<Form onSubmit={this.cadastrarEatualizarComentario}>
												<div class="form-group">
													<label for="comentar">Postar comentário:</label>
													<textarea class="form-control" rows="5" id="comentar" style={{ backgroundColor: '#f4f4f4', color: "#000233" }}
														onChange={(e) => this.setState({ comentario: e.target.value })}
													></textarea>
												</div>

												<div class="custom-control custom-checkbox mr-sm-2">
													<input type="checkbox" class="custom-control-input" id="checkAnexarDocumento"
														checked={this.state.checkAnexarDocumento}
														onChange={this.alteraAnexarDocumento}
													/>
													<label class="custom-control-label" for="checkAnexarDocumento">Anexar documento</label>
												</div>

												<hr />

												{this.state.checkAnexarDocumento && (
													<div className='container'>
														<div className="form-group">
															<label for="anexo">Anexar arquivo</label>
															<input type="file" className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
														</div>

														<div class="progress">
															<div id='progresso' className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
														</div>
													</div>
												)}

												<div class="d-flex justify-content-center mt-3" style={{ marginBottom: "120px" }}>
													<button id='btnCadastrarAnexo' className='button'><FaRegSave /> Comentar</button>
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
										</div>

										<div className='col-sm-5'>
											<h6 className='text-center'><FaRegCommentDots /> Comentários</h6>

											<div style={{ maxHeight: "400px", overflowY: "scroll", padding: "15px" }}>
												{this.state.arrayChamadosXComentarios.length > 0 ? (
													this.state.arrayChamadosXComentarios.map((comentario, index) => (
														<div className="card" style={{ border: "1px solid #000233" }}>
															<div className="card-header font-weight-bold">
																{comentario.nome} - {comentario.dataHoraCriacao}
															</div>
															<div className="card-body">
																<p className="card-text">{comentario.descricao}</p>
															</div>
															{comentario.anexo && (<div className="card-footer text-center">
																<a href={comentario.anexo} className="button"><FaCloudDownloadAlt /> Baixar anexo</a>
															</div>)}
														</div>
													))
												) : ("")}
											</div>
										</div>
									</div>
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowEditarChamadoSolicitado}
								onHide={() => this.handlerCloseModalEditarChamadoSolicitado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								className='modal-fullscreen'>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek />Detalhes do chamado: {this.state.id_chamado}</h4>
								</Modal.Header>
								<Modal.Body >
									<div className='row'>
										<div className='col-sm-5' style={{ maxHeight: "600px", overflowY: "scroll" }}>
											<div style={{ maxHeight: "600px", overflowY: "scroll", padding: "15px" }}>
												<div class="form-group">
													<label for="exampleFormControlTextarea1">Descrição:*</label>
													<textarea class="form-control" id="descricao" rows="3"
														onChange={(e) =>
															this.setState({ descricao: e.target.value })
														}
														value={this.state.descricao}></textarea>
												</div>

												<div className='row'>
													<div className='col-sm-6'>
														<div className="form-group">
															<label htmlFor="selectSetorResponsavel">Setor responsável:*</label>
															<select class="form-control form-control-sm" id="selectSetorResponsavel"
																onChange={(e) => this.onChangeSetorResponsavel(e.target.value)} value={this.state.idSetorResponsavel}>
																{this.state.arraySetores.length > 0 ?
																	this.state.arraySetores.map(setor => (
																		this.state.idSetorResponsavel === setor.id ? (
																			<option value={setor.id}>{setor.nome}</option>
																		) : ("")
																	))
																	: (<option>0</option>)
																}
															</select>
														</div>
													</div>

													<div className='col-sm-6'>
														<div className="form-group">
															<label htmlFor="idTipoSolicitacao">Tipo:*</label>
															<select class="form-control form-control-sm" id="idTipoSolicitacao"
																onChange={e => this.setState({ idTipoChamado: e.target.value })} value={this.state.idTipoChamado}>
																{this.state.arrayTiposDeChamados.length > 0 ?
																	this.state.arrayTiposDeChamados.map(tipo => (
																		tipo.id === this.state.idTipoChamado ? (
																			<option value={tipo.id}>{tipo.nome}</option>
																		) : ("")
																	))
																	: (<option>0</option>)
																}
															</select>
														</div>
													</div>
												</div>

												<div className='row'>
													<div className='col-sm-6'>
														<div className="form-group">
															<label htmlFor="selectPrioridade">Prioridade:*</label>
															<select class="form-control form-control-sm" id="selectPrioridade"
																onChange={e => this.setState({ idPrioridade: e.target.value })} value={this.state.idPrioridade}>
																{this.state.arrayPrioridades.length > 0 ?
																	this.state.arrayPrioridades.map(prioridade => (
																		prioridade.id === this.state.idPrioridade ? (
																			<option value={prioridade.id}>{prioridade.nome}</option>
																		) : ("")
																	))
																	: (<option>0</option>)
																}
															</select>
														</div>
													</div>

													<div className='col-sm-6'>
														<div className="form-group">
															<label htmlFor="nome">Valor</label>
															<input
																type="text"
																className="form-control form-control-sm"
																id="valor"
																placeholder="Informe o valor"
																onChange={(e) =>
																	handleMoeda(e.target.value).then(result => this.setState({ valor: result }))
																}
																value={this.state.valor}
															/>
														</div>
													</div>
												</div>
												<div className='row'>
													<div class="col-sm-6">
														<div className="form-group">
															<label for="dataHoraPrevista">Data de conclusão:</label>
															<input class="form-control" type="datetime-local" id="dataHoraFinalizacao" name="start"
																min="2022-01"
																onChange={e => this.setState({ dataHoraFinalizacao: e.target.value })}
																value={this.state.dataHoraFinalizacao}
																disabled={true}
															/>
														</div>
													</div>
													<div className='col-sm-6'>
														<div class="form-group">
															<label for="selectStatusBanca">Status:</label>
															<select class="form-control" id="selectStatusAta"
																value={this.state.status}
																onChange={e => this.setState({ status: e.target.value })}>
																{this.state.arrayStatus.length > 0 ? (
																	this.state.arrayStatus.map(item =>
																		parseInt(item.id) > 4 && item.id === this.state.status ? (<option value={item.id}>{item.nome}</option>) : "")
																) : (
																	<option value="0">Nenhum resultado encontrado</option>
																)}
															</select>
														</div>
													</div>
												</div>
											</div>

											{this.state.arrayAnexosDoChamado.length > 0 ? (
												<div className='container'>
													<h4><FaFileAlt /> Arquivos anexados</h4>
													<hr />
													<table className="table table-sm text-center">
														<thead>
															<tr>
																<th scope="col">Link</th>
																<th scope="col">Responsável pelo anexo</th>
																<th scope="col">Data/hora de criação</th>
															</tr>
														</thead>
														<tbody>
															{this.state.arrayAnexosDoChamado.length > 0 ? (
																this.state.arrayAnexosDoChamado.map((item, index) => (
																	<tr key={index}>
																		<td scope="row"><a href={item.link}>arquivo</a></td>
																		<td>{item.responsavel_anexo}</td>
																		<td>{item.dataHoraCriacao}</td>
																	</tr>
																))
															) : (
																<tr>
																	<td colSpan="12">Nenhum item foi anexado</td>
																</tr>
															)}
														</tbody>
													</table>
												</div>
											) : ("")}
										</div>
										<div className='col-sm-7'>

											<h4 className='titulo'><FaCalendarWeek /> Setores participantes</h4>
											<ul class="list-group list-group-flush mt-2 mb-2">
												{this.state.arraySetoresDoChamado.length > 0 ? (
													this.state.arraySetoresDoChamado.map((item, index) => (
														<li class="list-group-item text-dark">{item.nome}</li>
													))
												) : (
													<li class="list-group-item text-danger">Nenhum setor está participando do chamado!</li>
												)}
											</ul>

											<h4 className='titulo mt-3'><FaCalendarWeek /> Comentários</h4>
											<hr />

											<div style={{ maxHeight: "300px", overflowY: "scroll", padding: "15px" }}>
												{this.state.arrayChamadosXComentarios.length > 0 ? (
													this.state.arrayChamadosXComentarios.map((comentario, index) => (
														<div className="card" style={{ border: "1px solid #000233" }}>
															<div className="card-header font-weight-bold">
																{comentario.nome} - {comentario.dataHoraCriacao}
															</div>
															<div className="card-body">
																<p className="card-text">{comentario.descricao}</p>
															</div>
															{comentario.anexo && (<div className="card-footer text-center">
																<a href={comentario.anexo} className="button"><FaCloudDownloadAlt /> Baixar anexo</a>
															</div>)}
														</div>
													))
												) : ("")}
											</div>

											<Form onSubmit={this.cadastrarEatualizarComentario}>
												<div class="form-group">
													<label for="comentar"></label>
													<textarea class="form-control" rows="5" id="comentar" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}
														onChange={(e) => this.setState({ comentario: e.target.value })}
													></textarea>
												</div>

												<div class="custom-control custom-checkbox mr-sm-2">
													<input type="checkbox" class="custom-control-input" id="checkAnexarDocumento"
														checked={this.state.checkAnexarDocumento}
														onChange={this.alteraAnexarDocumento}
													/>
													<label class="custom-control-label" for="checkAnexarDocumento">Anexar documento</label>
												</div>

												<hr />

												{this.state.checkAnexarDocumento && (
													<div className='container'>
														<div className="form-group mb-3">
															<label for="anexo">Anexar arquivo</label>
															<input type="file" className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
														</div>

														<div class="progress">
															<div id='progresso' className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
														</div>
													</div>
												)}

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

												<div class="d-flex justify-content-center" style={{ marginBottom: "120px" }}>
													<button id='btnCadastrarAnexo' className='button'><FaRegSave /> Comentar</button>
												</div>

											</Form>
										</div>
									</div>
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowCadastrarTipoChamado}
								onHide={() => this.handlerCloseModalCadastrarTipoChamado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="md"
								centered>

								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter" >
										<h5 className='titulo'><FaRegWindowClose /> Cadastrar</h5>
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={this.cadastrarEatualizarTipoChamado}>
										<div className="form-group">
											<label htmlFor="nome">Tipo de chamado</label>
											<input
												type="text"
												className="form-control"
												id="nome"
												placeholder="Informe o nome"
												autoComplete='off'
												onChange={(e) =>
													this.setState({ tipo_chamado: e.target.value })
												}
												value={this.state.tipo_chamado}
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
											<button className='button'>Cadastrar</button>
										</div>
									</Form>

									<hr />

									<div className='row'>
										<div className='col-sm-10'>	<h2 className='lead'><FaUserGraduate /> Tipos de chamados</h2></div>
									</div>

									<hr />

									<div className="table-responsive table-sm" style={{ maxHeight: "300px", overflowY: "scroll", padding: "15px" }}>
										<table className="table table-bordered table-hover text-center">
											<thead className="thead-light">
												<tr>
													<th scope="col" >Id</th>
													<th scope="col" >Nome</th>
													<th scope="col" >Data e hora de criação</th>
													<th scope='col'>Ações</th>
												</tr>
											</thead>
											<tbody>
												{this.state.arrayTiposDeChamados.length > 0 ? (
													this.state.arrayTiposDeChamados.map(tipo_chamado => (
														<tr key={tipo_chamado.id} title="Clique aqui para obter mais informações sobre o tipo de chamado">
															<td>{tipo_chamado.id}</td>
															<td>{tipo_chamado.nome}</td>
															<td>{tipo_chamado.dataHoraCriacao}</td>
															<td><button className='button' onClick={() => this.handlerShowModalAtualizarTipoChamado(tipo_chamado)}>Atualizar</button></td>
														</tr>
													))
												) : (<tr className="text-center">
													<td colSpan="15">
														<Spinner animation="border" />
													</td>
												</tr>)}
											</tbody>
										</table>
									</div>
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowAtualizarTipoChamado}
								onHide={() => this.handlerCloseModalAtualizarTipoChamado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="sm"
								centered>

								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter" >
										<h5 className='titulo'><FaRegWindowClose />{this.state.id_tipoChamado !== 0 ? ` Atualizar` : ` Cadastrar`}</h5>
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={this.cadastrarEatualizarTipoChamado}>
										<div className="form-group">
											<label htmlFor="nome">Tipo de chamado</label>
											<input
												type="text"
												className="form-control"
												id="nome"
												placeholder="Informe o nome"
												autoComplete='off'
												onChange={(e) =>
													this.setState({ tipo_chamado: e.target.value })
												}
												value={this.state.tipo_chamado}
											/>
										</div>

										<div className='d-flex justify-content-center'>
											<button className='button'>Confirmar</button>
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
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowVisualizarSetores}
								onHide={() => this.handlerCloseModalVisualizarSetores()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								className='modal-fullscreen'>

								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter" >
										<h5 className='titulo'><FaRegWindowClose /> Setores</h5>
									</Modal.Title>
								</Modal.Header>
								<Modal.Body style={{ maxHeight: "600px", overflowY: "scroll" }}>
									{this.state.arraySetores.length > 0 ? (
										this.state.arraySetores.map(setor => (
											<AccordionChamados id_setor={setor.id} setor={setor.nome} listaDeChamados={this.listaDeChamados} limpaFiltro={this.limpaFiltro}>
												<div class="form-group">
													<label for="descricaoPesq">Descrição:*</label>
													<textarea class="form-control" id="descricaoPesq" rows="3"
														onChange={(e) =>
															this.setState({ descricaoPesq: e.target.value })
														}
														value={this.state.descricaoPesq}></textarea>
												</div>

												<div className='row d-flex align-items-center mt-2'>
													<div className='col'>
														<div className="form-group">
															<label for="staticEmail2">N° de chamado:</label>
															<input class="form-control form-control-sm" type="number" id="idChamadoPesq" name="start" placeholder='' value={this.state.idChamadoPesq}
																onChange={e => this.setState({ idChamadoPesq: e.target.value })}
															/>
														</div>
													</div>

													<div className='col'>
														<div className="form-group">
															<label htmlFor="prioridadePesq">Prioridade:</label>
															<select class="form-control form-control-sm" id="prioridadePesq" value={this.state.prioridadePesq}
																onChange={e => this.setState({ prioridadePesq: e.target.value })}>
																<option value="0">Selecione</option>
																{this.state.arrayPrioridades.length > 0 ?
																	this.state.arrayPrioridades.map(prioridade => (
																		<option value={prioridade.id}>{prioridade.nome}</option>
																	))
																	: (<option>0</option>)
																}
															</select>
														</div>
													</div>

													<div class="col">
														<div className="form-group">
															<label for="dataHoraPrevista">Data de conclusão:</label>
															<input class="form-control form-control-sm" type="date" id="dataFinalizacaoPesq" name="start"
																min="2022-01"
																onChange={e => this.setState({ dataHoraFinalizacaoPesq: e.target.value })}
																value={this.state.dataHoraFinalizacaoPesq}
															/>
														</div>
													</div>

													<div className='col'>
														<div class="form-group">
															<label for="selectStatus">Status:</label>
															<select class="form-control form-control-sm" id="statusPesq"
																value={this.state.statusPesq}
																onChange={e => this.setState({ statusPesq: e.target.value })}>
																<option value="0">Selecionar</option>
																{this.state.arrayStatus.length > 0 ? (
																	this.state.arrayStatus.map(item =>
																		parseInt(item.id) > 4 ? (<option value={item.id}>{item.nome}</option>) : "")
																) : (
																	<option value="0">Nenhum resultado encontrado</option>
																)}
															</select>
														</div>
													</div>
												</div>

												<div class="row d-flex justify-content-center mt-2 mb-4">
													<div class="col-lg-12 col-lg-offset-6 text-center">
														<div className="ml-auto">
															<button className='btn btn-sm btn-outline-primary mr-2' onClick={() => this.listaDeChamados(setor.id, 4, this.state.idChamadoPesq !== "" ? this.state.idChamadoPesq : "", this.state.setorResponsavelPesq !== "" ? this.state.setorResponsavelPesq : "",
																this.state.prioridadePesq !== "" ? this.state.prioridadePesq : "",
																this.state.dataHoraFinalizacaoPesq !== "" ? this.state.dataHoraFinalizacaoPesq : "",
																this.state.statusPesq !== "" ? this.state.statusPesq : "",
																this.state.descricaoPesq !== "" ? this.state.descricaoPesq : "")}>Buscar <FaSearch /> </button>
															<button className='btn btn-sm btn-outline-primary mr-2' onClick={() => this.limpaFiltro(setor.id, 4)}><FaFilter /> Limpar filtro</button>
														</div>
													</div>
												</div>

												<hr />
												<div className="table-responsive table-sm">
													<div class="table-wrapper">
														<table className="table table-bordered table-light table-hover text-center">
															<thead >
																<tr>
																	<th scope="col">N° do chamado</th>
																	<th scope="col">Tipo de chamado</th>
																	<th scope="col">Prioridade</th>
																	<th scope="col">Visualizado</th>
																	<th scope="col">Data de finalização</th>
																	<th scope="col">Status</th>
																	<th scope="col">Ações</th>
																</tr>
															</thead>
															<tbody>
																{this.state.arrayChamadosPorSetor.length > 0 ? (
																	this.state.arrayChamadosPorSetor.map(item => (
																		<tr>
																			<th scope="row">{item.id}</th>
																			<td>{item.tipo_chamado}</td>
																			<td>{item.prioridade}</td>
																			<td>{parseInt(item.visualizado) === 1 ? <FaEye style={{ width: "200px" }} /> : <FaEyeSlash style={{ width: "200px" }} />}</td>
																			<td>{item.dataHoraFinalizacao !== null ? item.dataHoraFinalizacao : "Em análise"}</td>
																			<td>{item.status}</td>
																			<td><button className='button' onClick={() => this.handlerShowModalEditarChamadoRecebido(item)}>Visualizar</button></td>
																		</tr>
																	))
																) :
																	(<tr className="text-center">
																		<td colSpan="15">
																			<Spinner animation="border" />
																		</td>
																	</tr>)}
															</tbody>
														</table>
													</div>
												</div>
											</AccordionChamados>

										))
									) : ("")}
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowFiltrarChamado}
								onHide={() => this.handlerCloseModalFiltrarChamado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek />Filtrar chamado</h4>
								</Modal.Header>
								<Modal.Body >
									<div className='container'>
										<div class="form-group">
											<label for="descricaoPesq">Descrição:*</label>
											<textarea class="form-control" id="descricaoPesq" rows="3"
												onChange={(e) =>
													this.setState({ descricaoPesq: e.target.value })
												}
												value={this.state.descricaoPesq}></textarea>
										</div>

										<div className='row d-flex align-items-center mt-2'>
											<div className='col'>
												<div className="form-group">
													<label for="staticEmail2">N° de chamado:</label>
													<input class="form-control form-control-sm" type="number" id="idChamadoPesq" name="start" placeholder='' value={this.state.idChamadoPesq}
														onChange={e => this.setState({ idChamadoPesq: e.target.value })}
													/>
												</div>
											</div>

											<div className='col'>
												<div className="form-group">
													<label htmlFor="prioridadePesq">Prioridade:</label>
													<select class="form-control form-control-sm" id="prioridadePesq" value={this.state.prioridadePesq}
														onChange={e => this.setState({ prioridadePesq: e.target.value })}>
														<option value="0">Selecione</option>
														{this.state.arrayPrioridades.length > 0 ?
															this.state.arrayPrioridades.map(prioridade => (
																<option value={prioridade.id}>{prioridade.nome}</option>
															))
															: (<option>0</option>)
														}
													</select>
												</div>
											</div>

											<div class="col">
												<div className="form-group">
													<label for="dataHoraPrevista">Data de conclusão:</label>
													<input class="form-control form-control-sm" type="date" id="dataFinalizacaoPesq" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraFinalizacaoPesq: e.target.value })}
														value={this.state.dataHoraFinalizacaoPesq}
													/>
												</div>
											</div>

											<div className='col'>
												<div class="form-group">
													<label for="selectStatus">Status:</label>
													<select class="form-control form-control-sm" id="statusPesq"
														value={this.state.statusPesq}
														onChange={e => this.setState({ statusPesq: e.target.value })}>
														<option value="0">Selecionar</option>
														{this.state.arrayStatus.length > 0 ? (
															this.state.arrayStatus.map(item =>
																parseInt(item.id) > 4 ? (<option value={item.id}>{item.nome}</option>) : "")
														) : (
															<option value="0">Nenhum resultado encontrado</option>
														)}
													</select>
												</div>
											</div>
										</div>

										<div class="row d-flex justify-content-center mt-2 mb-4">
											<div class="col-lg-12 col-lg-offset-6 text-center">
												<div className="ml-auto">
													<button className='btn btn-sm btn-outline-primary mr-2' onClick={() => this.listaDeChamados(this.context.user.id_setor, 4, this.state.idChamadoPesq !== "" ? this.state.idChamadoPesq : "", this.state.setorResponsavelPesq !== "" ? this.state.setorResponsavelPesq : "",
														this.state.prioridadePesq !== "" ? this.state.prioridadePesq : "",
														this.state.dataHoraFinalizacaoPesq !== "" ? this.state.dataHoraFinalizacaoPesq : "",
														this.state.statusPesq !== "" ? this.state.statusPesq : "",
														this.state.descricaoPesq !== "" ? this.state.descricaoPesq : "")}>Buscar <FaSearch /> </button>
													<button className='btn btn-sm btn-outline-primary mr-2' onClick={() => this.limpaFiltro(this.state.id_setor, 4)}><FaFilter /> Limpar filtro</button>
												</div>
											</div>
										</div>
									</div>

									<div className="row" style={{ height: "500px", overflowY: "scroll" }}>
										{this.state.arrayChamadosPorSetor.length > 0 ? (
											this.state.arrayChamadosPorSetor.map(item => (
												<div className="col-sm-6">
													<Card key={item.id} className="text-center " style={{ border: "1px solid #000233" }}>
														<Card.Header className='font-weight-bold'>N° do chamado: {item.id} - {item.status}</Card.Header>
														<Card.Body style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", maxHeight: "240px", overflowY: "scroll" }}>
															<Card.Text>Tipo: {item.tipo_chamado}</Card.Text>
															<Card.Text>{parseInt(item.visualizado) === 1 ? <FaEye style={{ width: "200px" }} /> : <FaEyeSlash style={{ width: "200px" }} />}</Card.Text>
															<Card.Text>Data de finalização: {item.dataHoraFinalizacao !== null ? item.dataHoraFinalizacao : "Em análise"}</Card.Text>
															<div className='d-flex justify-content-center'>
																<button className='button d-block' onClick={() => this.handlerShowModalEditarChamadoSolicitado(item)}>Visualizar</button>
															</div>
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
								</Modal.Body>
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



