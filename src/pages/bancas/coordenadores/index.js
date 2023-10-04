import { FaUserGraduate, FaLayerGroup, FaRegEdit, FaRegPlusSquare, FaRegSave, FaPencilAlt, FaShieldAlt, FaWpforms, FaClipboardList, FaBookMedical, FaBookReader } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../../services/api';
import { getToken, logout } from '../../../services/auth';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { listaDeAreasConcentracao } from '../../../services/getListaDeAreasConcentracao';
import { listaDeLinhasDePesquisas } from '../../../services/getListaDeLinhasDePesquisas';
import { listaDeOrientadores } from '../../../services/getListaDeOrientadores';
import { listaDeVinculoInstitucional } from '../../../services/getListaDeVinculoInstitucional';
import { uploadFile } from '../../../services/uploadFile';
import { listaDeMembrosExternos } from '../../../services/getListaDeMembrosExternos';
import Menu from '../../../components/Menu';
import AdminNavbar from '../../../components/Navbar';
import MainContent from '../../../components/MainContent';
import FloatingMenu from '../../../components/FloatingMenu';
import backgroundImage from '../../../assets/sistema_chamados.png';
import UserContext from '../../../UserContext';
import AccordionOrientadores from '../../../components/AccordionOrientadores';
import { listaDeTiposDeBanca } from '../../../services/getListaDeTiposDeBanca';

export default class Index extends Component {
	static contextType = UserContext;
	constructor(props) {
		super();

		this.state = {
			modalShowCadastrarBanca: false,
			modalShowExcluirBanca: false,
			modalShowEmitirAta: false,
			modalShowVisualizarAta: false,
			modalShowCadastrarOrientando: false,
			modalShowEditarOrientando: false,
			modalShowAtualizarAta: false,
			modalShowVisualizarFichaDeAvaliacao: false,
			modalShowEmitirFichaDeAvaliacao: false,
			modalShowEditarFichaDeAvaliacao: false,
			modalShowEmitirDeclaracao: false,
			modalCadastrarEAtualizarMembroExterno: false,
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

			//Orientandos
			id_orientando: '',
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
			email_coordenador: '',

			//ATA
			array_status: [],
			presidente: '',
			membro_externo: '',
			membro_interno: '',
			titulo_dissertacao: '',
			quant_pag: 0,
			id_statusAta: '',
			status_ata: '',
			data_horaPrevistaAta: '',
			id_ata: '',
			arrayLinhasDePesquisas: [],
			arrayAreaConcentracao: [],

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

			arrayOrientadores: [],
			arrayLinhasDePesquisas: [],
			arrayAreaConcentracao: [],
			array_bancasQE: [],
			array_bancasDE: [],
			array_bancasQT: [],
			array_bancasDT: [],
			arrayOrientacao: [],
			array_vinculoInstitucional: [],
			array_membros: [],

			//Membro externo
			id_vinculoInstitucional: 0,
			link_lattes: "",
			id_membroExterno: 0,
			assinatura: ""
		};
	}

	componentDidMount() {
		this.buscaInformacoesDoCoordenador(getToken());
		//this.listaDeOrientandos(getToken());
		listaDeTiposDeBanca(getToken()).then(result => this.setState({array_tiposBanca: result}));
		listaDeMembrosExternos().then(result => this.setState({ array_membros: result }));
	}

	setModalShowCadastrarOrientando(valor) {
		this.setState({ modalShowCadastrarOrientando: valor, success: '', error: '' });
	}

	handlerShowModalCadastrarOrientando() {
		this.setModalShowCadastrarOrientando(true);
		this.listaDeCursos(getToken());
		//listaDeTiposDeBanca(getToken()).then(result => this.setState({tiposDeBanca: result}));
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
	}

	handlerCloseModalCadastrarOrientando() {
		this.setModalShowCadastrarOrientando(false);
		this.setState({ success: '', error: '' })
		this.setState({
			nome: "", email: "", id_curso: "", senha: "",
			confirmarSenha: "", informacoes_adicionais: "",
			fase_processo: "", dataHoraInicialFaseProcesso: "",
			dataHoraFinalFaseProcesso: "", dataHoraConclusao: "",
			idLinhaPesquisa: ""
		})
	};

	setModalShowCadastrarEAtualizarMembroExterno(valor) {
		this.setState({ modalCadastrarEAtualizarMembroExterno: valor, success: '', error: '' });
	}

	handlerShowModalCadastrarEAtualizarMembroExterno(membro = null) {
		this.setModalShowCadastrarEAtualizarMembroExterno(true);
		listaDeVinculoInstitucional().then(result => this.setState({ array_vinculoInstitucional: result }));
		console.log(membro);

		if (membro !== null) {
			this.setState({
				id_membroExterno: membro.id_usuario,
				nome: membro.nome,
				email: membro.email,
				link_lattes: membro.link_lattes,
				id_vinculoInstitucional: membro.id_vinculoInstitucional,
				assinatura: membro.assinatura
			});
			return;
		}

		this.setState({
			id_membroExterno: 0,
			nome: "",
			email: "",
			link_lattes: "",
			id_vinculoInstitucional: 0,
			assinatura: ""
		});
	}

	handlerCloseModalCadastrarEAtualizarMembroExterno() {
		this.setModalShowCadastrarEAtualizarMembroExterno(false);
		this.setState({ success: '', error: '' });
	};

	setModalShowEditarOrientando(valor) {
		this.setState({ modalShowEditarOrientando: valor, success: '', error: '' });
	}

	handlerShowModalEditarOrientando(orientando) {
		this.setModalShowEditarOrientando(true);
		this.listaDeCursos(getToken());
		this.listaDeTiposDeBanca(getToken());
		listaDeOrientadores(orientando.id_areaConcentracao).then(result => this.setState({ arrayOrientadores: result }))
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
		listaDeLinhasDePesquisas(orientando.id_areaConcentracao).then(result => this.setState({ arrayLinhasDePesquisas: result }));
		this.setState({
			id_usuario: orientando.id_usuario, id_orientando: orientando.id, nome: orientando.nome,
			email: orientando.email, id_curso: orientando.id_curso, senha: orientando.senha,
			confirmarSenha: orientando.senha, informacoes_adicionais: orientando.informacoes_adicionais,
			fase_processo: orientando.id_tipoBanca, dataHoraInicialFaseProcesso: orientando.dataHoraInicialFaseProcesso,
			dataHoraFinalFaseProcesso: orientando.dataHoraFinalFaseProcesso,
			dataHoraConclusao: orientando.dataHoraConclusao,
			idAreaConcentracao: orientando.id_areaConcentracao, idLinhaPesquisa: orientando.id_linhaPesquisa,
			id_orientador: orientando.id_orientador
		});
		this.listaDeOrientacao(getToken(), orientando.id_usuario);
	}

	handlerCloseModalEditarOrientando() {
		this.setModalShowEditarOrientando(false);
		this.setState({
			success: '', error: '',
			id_usuario: '', id_orientando: '', nome: '',
			email: '', id_curso: '', senha: '',
			confirmarSenha: '', informacoes_adicionais: '',
			fase_processo: '', dataHoraInicialFaseProcesso: '',
			dataHoraFinalFaseProcesso: '',
			dataHoraConclusao: ''
		})
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

			if (data.status === 200) {
				this.setState({ array_cursos: data.resultados });
			}

			if (data.permissoes === false) {
				logout();
				this.props.history.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	cadastrarOrientando = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			let nome = this.state.nome;
			let email = this.state.email;
			let senha = this.state.senha;
			let confirmarSenha = this.state.confirmarSenha;
			let id_curso = parseInt(this.state.id_curso);
			let informacoes_adicionais = this.state.informacoes_adicionais;
			let fase_processo = 3;
			let dataHoraInicialFaseProcesso = this.state.dataHoraInicialFaseProcesso;
			let dataHoraFinalFaseProcesso = this.state.dataHoraFinalFaseProcesso;
			let dataHoraConclusao = this.state.dataHoraConclusao;
			let id_orientador = parseInt(this.state.id_orientador);
			let id_linhaPesquisa = parseInt(this.state.idLinhaPesquisa);
			let email_coordenador = this.state.email_coordenador;

			if (!nome || !email || !id_curso || !senha || !confirmarSenha || !fase_processo
				|| !dataHoraInicialFaseProcesso || !dataHoraFinalFaseProcesso || !dataHoraConclusao) {
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
					dataHoraConclusao,
					id_orientador,
					id_linhaPesquisa,
					email_coordenador
				}),
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeOrientandosDoOrientador(getToken(), id_orientador);
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
			let id_orientador = parseInt(this.state.id_orientador);
			let id_linhaPesquisa = parseInt(this.state.idLinhaPesquisa);

			if (!nome || !email || !id_curso || !senha || !confirmarSenha
				|| !fase_processo || !dataHoraInicialFaseProcesso || !dataHoraFinalFaseProcesso || !dataHoraConclusao) {
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
					id_orientando,
					nome,
					email,
					senha,
					id_curso,
					informacoes_adicionais,
					fase_processo,
					dataHoraInicialFaseProcesso,
					dataHoraFinalFaseProcesso,
					dataHoraConclusao,
					id_orientador,
					id_linhaPesquisa
				})
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeOrientandosDoOrientador(getToken(), id_orientador);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeOrientandosDoOrientador = async (token, idOrientador, nome = "", idLinhaPesquisa = 0, idFaseProcesso = 0) => {
		try {
			const response = await fetch(
				`${api.baseURL}/orientadores/${idOrientador}/orientandos?nome=${nome}&idLinhaPesquisa=${idLinhaPesquisa}&idFaseProcesso=${idFaseProcesso}`,
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

	buscaInformacoesDoCoordenador = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/coordenadores/${token}`,
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
				this.setState({ email_coordenador: data.resultados[0].email, idAreaConcentracao: data.resultados[0].id_areaConcentracao });
				listaDeLinhasDePesquisas(data.resultados[0].id_areaConcentracao)
				.then(result => this.setState({ arrayLinhasDePesquisas: result }));
				
				if (data.resultados[0].id_areaConcentracao === 1) {
					this.listaDeBancas(getToken(), 1, 1);
					this.listaDeBancas(getToken(), 2, 1);
				}

				if (data.resultados[0].id_areaConcentracao === 2) {
					this.listaDeBancas(getToken(), 1, 2);
					this.listaDeBancas(getToken(), 2, 2);
				}
				listaDeOrientadores(data.resultados[0].id_areaConcentracao).then(result => {
					this.setState({ arrayOrientadores: result });
					// result.map(orientador => this.listaDeOrientandosDoOrientador(getToken(), orientador.id));
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

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
			console.log(data)

			if (data.status === 200) {
				this.setState({ success: data.msg });
				if (data.resultados.length > 0) {
					/*
						array_bancasQE: [],
						array_bancasDE: [],
						array_bancasQT: [],
						array_bancasDT: []
					*/

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

			}

		} catch (error) {
			console.log(error);
		}
	};

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

			if (data.status === 200) {
				this.setState({ arrayOrientacao: data.resultados })
			}
		} catch (error) {
			return error;
		}
	};

	onChangeFileInput = (e) => {
		uploadFile(e, `enber/assinaturas/`);
		this.setState({ assinatura: 0 });
	}

	cadastrarEAtualizarMembro = async e => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { id_membroExterno, nome, email, link_lattes, id_vinculoInstitucional } = this.state;

			if (!nome || !email || !link_lattes || !id_vinculoInstitucional) {
				this.setState({ error: "Por favor, preencher todos os campos." });
				return;
			}

			let url = this.state.id_membroExterno !== 0 ? `${api.baseURL}/membro_externo/${id_membroExterno}` : `${api.baseURL}/membro_externo`;

			const response = await fetch(url, {
				method: id_membroExterno !== 0 ? 'PUT' : 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},

				body: JSON.stringify({
					nome, email, link_lattes, id_vinculoInstitucional, assinatura: Number(this.state.assinatura) !== 0 ? this.state.assinatura : JSON.parse(localStorage.getItem('@link'))
				})
			});

			const data = await response.json();
			if (data.status === 200) {
				this.setState({ success: data.msg });
				listaDeMembrosExternos().then(result => this.setState({ array_membros: result }));
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const orientandos = this.state.array_orientandos;
		const tiposDeBanca = this.state.array_tiposBanca;
		const areas_concentracao = this.state.arrayAreaConcentracao;
		const linhasDePesquisas = this.state.arrayLinhasDePesquisas;
		const array_cursos = this.state.array_cursos;
		const array_bancasQE = this.state.array_bancasQE;
		const array_bancasDE = this.state.array_bancasDE;
		const array_bancasQT = this.state.array_bancasQT;
		const array_bancasDT = this.state.array_bancasDT;
		const arrayOrientacao = this.state.arrayOrientacao;
		const array_vinculoInstitucional = this.state.array_vinculoInstitucional;
		const membros = this.state.array_membros;
		const arrayOrientadores = this.state.arrayOrientadores;

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
										<a className='button' onClick={() => this.handlerShowModalCadastrarOrientando()}><FaRegPlusSquare /> Cadastrar orientando</a>
									</li>
									<li>
										<a className='button' onClick={() => this.handlerShowModalCadastrarEAtualizarMembroExterno()}><FaRegPlusSquare /> Cadastrar membro externo</a>
									</li>
								</ul>
							</FloatingMenu>
							{this.state.idAreaConcentracao === 1 ? (
								<div className="row d-flex justify-content-center text-center text-light">
									<div className="col-sm-2 mb-3">
										<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
										<h5 style={{ fontSize: "15px" }}>Total de Bancas de Qualificação</h5>
										<h6>{array_bancasQE.length}</h6>
									</div>

									<div className="col-sm-2 border-left mb-3">
										<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
										<h5 style={{ fontSize: "15px" }}>Total de Bancas de Defesa</h5>
										<h6>{array_bancasDE.length}</h6>
									</div>
								</div>
							) : (
								<div className="row d-flex justify-content-center text-center text-light">
									<div className="col-sm-2 mb-3">
										<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
										<h5 >Total de Bancas de Qualificação</h5>
										<h6>{array_bancasQT.length}</h6>
									</div>

									<div className="col-sm-2 border-left mb-3">
										<FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
										<h5 >Total de bancas de qualificação</h5>
										<h6>{array_bancasDT.length}</h6>
									</div>
								</div>
							)}
							<Tabs
								variant="pills"
								defaultActiveKey="orientandos"
								transition={false}
								id="panel-admin"
								className="justify-content-center">
								<Tab
									eventKey="orientandos"
									title="Orientandos"
									style={{ marginTop: '12px' }}>
									<div className='container mb-5'>
										{arrayOrientadores.length > 0 ? (
											arrayOrientadores.map((orientador, index) => (
												<AccordionOrientadores idOrientador={orientador.id_usuario} total={orientandos.length} orientador={orientador.nome} listaDeOrientandosDoOrientador={this.listaDeOrientandosDoOrientador}>
													<div className='row d-flex align-items-center mt-2'>
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
																		this.listaDeOrientandosDoOrientador(getToken(), orientador.id_usuario, e.target.value)
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
																		this.listaDeOrientandosDoOrientador(getToken(), orientador.id_usuario, "", e.target.value, 0)
																	}}>
																	<option value="0">Selecione</option>
																	{linhasDePesquisas.length > 0 ?
																		linhasDePesquisas.map(linha => (
																			<option value={linha.id}>{linha.linha_pesquisa}</option>
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
																		this.listaDeOrientandosDoOrientador(getToken(), orientador.id_usuario, "", 0, e.target.value)
																	}}>
																	<option value="0">Selecione</option>
																	{tiposDeBanca.length > 0 ?
																		tiposDeBanca.map(tipo => (
																			<option value={tipo.id}>{tipo.nome}</option>
																		))
																		: (<option value="0">Nenhum resultado encontrado</option>)}
																</select>
															</div>
														</div>
													</div>
													<div className="table-responsive">
														<div class="table-wrapper">
															<table className="table text-center table-bordered table-striped table-hover bg-white">
																<thead className="thead-light">
																	<tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
																		<th scope="col" className="sticky-col" >Orientando</th>
																		<th>Orientador</th>
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
																			<tr key={orientando.id} title="Clique aqui para obter mais informações sobre o orientando">
																				<td>{orientando.nome}</td>
																				<td>{orientando.orientador}</td>
																				<td>{orientando.curso}</td>
																				<td>{orientando.linha_pesquisa}</td>
																				<td>{orientando.fase_processo}</td>
																				<td>{orientando.dataHoraInicialFaseProcessoTb}</td>
																				<td>{orientando.dataHoraFinalFaseProcessoTb}</td>
																				<td>{orientando.dataHoraConclusaoTb}</td>
																				<td><button className='button mr-2' onClick={() => this.handlerShowModalEditarOrientando(orientando)}><FaRegEdit /> Atualizar </button></td>
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

												</AccordionOrientadores>

											))
										) : ("")}
									</div>
								</Tab>

								<Tab
									eventKey="bancas"
									title="Bancas"
									style={{ marginTop: '30px' }}>

									<div className='container'>
										{this.state.idAreaConcentracao === 1 ? (
											<div className='container'>
												{/* <h4 className='text-center'><FaBookReader /> Educação</h4> */}
												<Accordion>
													<Card>
														<Accordion.Toggle as={Card.Header} eventKey="0">
															<h5><FaUserGraduate /> Qualificação </h5>
														</Accordion.Toggle>
														<Accordion.Collapse eventKey="0">
															<Card.Body>
																<div className="table-responsive">
																	<div class="table-wrapper">
																		<table className="table table-sm text-center table-bordered table-hover">
																			<thead class="thead-light">
																				<tr>
																					<th>Orientador</th>
																					<th>Orientando</th>
																					<th>curso</th>
																					<th>Fase do processo</th>
																					<th>Data/hora inicial do processo</th>
																					<th>Data/hora final do processo</th>
																					<th>Data e hora de conclusão</th>
																					<th>Data e hora de prevista</th>
																					<th>Observação</th>
																					<th>Status</th>
																				</tr>
																			</thead>
																			<tbody>
																				{array_bancasQE.length > 0 ?
																					array_bancasQE.map(banca => (
																						<tr key={banca.id} className={banca.status_confirmacaoBancaQ === "AGUARDANDO" ? "table-warning" : "table-success"} title="Clique aqui para obter mais informações sobre a banca">
																							<td>{banca.orientador}</td>
																							<td>{banca.orientando}</td>
																							<td>{banca.curso}</td>
																							<td>{banca.fase_processo}</td>
																							<td>{banca.dataHoraInicialFaseProcessoTb}</td>
																							<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																							<td>{banca.dataHoraConclusaoTb}</td>
																							<td>{banca.data_horaPrevista}</td>
																							<td>{banca.observacao}</td>
																							<td>{banca.status === 1 ? `Aguardando` : banca.status === 2 ? `Confirmado` : ``}</td>
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
																{
																	<div className="text-center font-weight-bold mt-3 mb-5">
																		Total de Registros: {array_bancasQE.length}
																	</div>
																}
															</Card.Body>
														</Accordion.Collapse>
													</Card>

													<Card>
														<Accordion.Toggle as={Card.Header} eventKey="1">
															<h5><FaUserGraduate /> Defesa</h5>
														</Accordion.Toggle>
														<Accordion.Collapse eventKey="1">
															<Card.Body>
																<div className="table-responsive ">
																	<div class="table-wrapper">
																		<table className="table table-sm text-center table-bordered table-hover ">
																			<thead class="thead-light">
																				<tr>
																					<th>Orientador</th>
																					<th>Orientando</th>
																					<th>curso</th>
																					<th>Fase do processo</th>
																					<th>Data/hora inicial do processo</th>
																					<th>Data/hora final do processo</th>
																					<th>Data/hora de conclusão</th>
																					<th>Data e hora de prevista</th>
																					<th>Observação</th>
																					<th>Status</th>
																				</tr>
																			</thead>
																			<tbody>
																				{array_bancasDE.length > 0 ?
																					array_bancasDE.map(banca => (
																						<tr key={banca.id} className={banca.status_confirmacaoBancaD === "AGUARDANDO" ? "table-warning" : "table-success"} title="Clique aqui para obter mais informações sobre a banca">
																							<td>{banca.orientador}</td>
																							<td>{banca.orientando}</td>
																							<td>{banca.curso}</td>
																							<td>{banca.fase_processo}</td>
																							<td>{banca.dataHoraInicialFaseProcessoTb}</td>
																							<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																							<td>{banca.dataHoraConclusaoTb}</td>
																							<td>{banca.data_horaPrevista}</td>
																							<td>{banca.observacao}</td>
																							<td>{banca.status === 1 ? `Aguardando` : banca.status === 2 ? `Confirmado` : ``}</td>
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
																{
																	<div className="text-center font-weight-bold mt-3 mb-5">
																		Total de Registros: {array_bancasDE.length}
																	</div>
																}
															</Card.Body>
														</Accordion.Collapse>
													</Card>
												</Accordion>
											</div>
										) : (
											<div className='container'>
												{/* <h4 className='text-center'><FaBookMedical /> Teologia</h4> */}
												<Accordion>
													<Card>
														<Accordion.Toggle as={Card.Header} eventKey="0">
															<h3><FaUserGraduate /> Qualificação </h3>
														</Accordion.Toggle>
														<Accordion.Collapse eventKey="0">
															<Card.Body>
																<div className="table-responsive">
																	<div class="table-wrapper">
																		<table className="table table-sm text-center table-bordered table-hover">
																			<thead class="thead-light">
																				<tr>
																					<th>Orientador</th>
																					<th>Orientando</th>
																					<th>curso</th>
																					<th>Fase do processo</th>
																					<th>Data/hora inicial do processo</th>
																					<th>Data/hora final do processo</th>
																					<th>Data e hora de conclusão</th>
																					<th>Data e hora de prevista</th>
																				</tr>
																			</thead>
																			<tbody>
																				{array_bancasQT.length > 0 ?
																					array_bancasQT.map(banca => (
																						<tr key={banca.id} className={banca.status_confirmacaoBancaQ === "AGUARDANDO" ? "table-warning" : "table-success"} title="Clique aqui para obter mais informações sobre a banca">
																							<td>{banca.orientador}</td>
																							<td>{banca.orientando}</td>
																							<td>{banca.curso}</td>
																							<td>{banca.fase_processo}</td>
																							<td>{banca.dataHoraInicialFaseProcessoTb}</td>
																							<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																							<td>{banca.dataHoraConclusaoTb}</td>
																							<td>{banca.data_horaPrevista}</td>
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
																{
																	<div className="text-center font-weight-bold mt-3 mb-5">
																		Total de Registros: {array_bancasQT.length}
																	</div>
																}
															</Card.Body>
														</Accordion.Collapse>
													</Card>

													<Card>
														<Accordion.Toggle as={Card.Header} eventKey="1">
															<h3><FaUserGraduate /> Defesa</h3>
														</Accordion.Toggle>
														<Accordion.Collapse eventKey="1">
															<Card.Body>
																<div className="table-responsive ">
																	<div class="table-wrapper">
																		<table className="table table-sm text-center table-bordered table-hover">
																			<thead class="thead-light">
																				<tr>
																					<th>Orientador</th>
																					<th>Orientando</th>
																					<th>curso</th>
																					<th>Fase do processo</th>
																					<th>Data/hora inicial do processo</th>
																					<th>Data/hora final do processo</th>
																					<th>Data/hora de conclusão</th>
																					<th>Data e hora de prevista</th>
																				</tr>
																			</thead>
																			<tbody>
																				{array_bancasDT.length > 0 ?
																					array_bancasDT.map(banca => (
																						<tr key={banca.id} className={banca.status_confirmacaoBancaD === "AGUARDANDO" ? "table-warning" : "table-success"} title="Clique aqui para obter mais informações sobre a banca">
																							<td>{banca.orientador}</td>
																							<td>{banca.orientando}</td>
																							<td>{banca.curso}</td>
																							<td>{banca.fase_processo}</td>
																							<td>{banca.dataHoraInicialFaseProcessoTb}</td>
																							<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																							<td>{banca.dataHoraConclusaoTb}</td>
																							<td>{banca.data_horaPrevista}</td>
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
																{
																	<div className="text-center font-weight-bold mt-3 mb-5">
																		Total de Registros: {array_bancasDT.length}
																	</div>
																}
															</Card.Body>
														</Accordion.Collapse>
													</Card>
												</Accordion>
											</div>
										)}
									</div>
								</Tab>

								<Tab
									eventKey="membro_externo"
									title="Membro externo"
									style={{ marginTop: '15px' }}>
									<div className='container'>

										{/* <h1 style={{ color: '#000233', fontSize: '20pt' }}><FaUserGraduate /> Membros externos</h1> */}

										<div className="table-responsive">
											<div class="table-wrapper">
												<table className="table table-sm text-center table-bordered table-hover bg-light">
													<thead className="thead-light">
														<tr>
															<th scope="col">Nome</th>
															<th>E-mail</th>
															<th>Assinatura</th>
															<th>Data/hora de criação</th>
															<th>Ações</th>
														</tr>
													</thead>
													<tbody>
														{membros.length > 0 ? (
															membros.map(membro => (
																<tr key={membro.id} title="Clique aqui para obter mais informações sobre o orientando">
																	<td>{membro.nome}</td>
																	<td>{membro.email}</td>
																	<td><img src={membro.assinatura} style={{ maxWidth: '100px' }} /></td>
																	<td>{membro.dataHoraCriacao}</td>
																	<td><button className='button' onClick={() => this.handlerShowModalCadastrarEAtualizarMembroExterno(membro)}><FaRegEdit /> Atualizar </button></td>
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
												Total de Registros: {membros.length}
											</div>
										}
									</div>
								</Tab>
							</Tabs>



							<Modal
								show={this.state.modalShowCadastrarOrientando}
								onHide={() => this.handlerCloseModalCadastrarOrientando()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='lg'
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
														autoComplete='off'
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
														autoComplete='off'
														onChange={(e) =>
															this.setState({ email: e.target.value })
														}
													/>
												</div>

												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label htmlFor="senha">Senha</label>
															<input
																type="password"
																className="form-control"
																id="senha"
																placeholder="Informe sua senha"
																autoComplete='off'
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
																autoComplete='off'
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
														value={3}
														disabled={true}
														onChange={e => this.setState({ fase_processo: e.target.value })}>
														<option value="0">Selecione</option>
														{tiposDeBanca.length > 0 ?
															tiposDeBanca.map(tipo => (
																<option value={tipo.id}>{tipo.nome}</option>
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

										<h4><FaClipboardList /> Informações academicas</h4>
										<hr />
										<div class="form-group">
											<label>Curso:*</label>
											<select class="form-control" id="selectCurso"
												value={this.state.id_curso}
												onChange={e => {
													this.setState({ id_curso: e.target.value, idAreaConcentracao: array_cursos.find(item => item.id === parseInt(e.target.value)).id_areaConcentracao })
													listaDeOrientadores(array_cursos.find(item => item.id === parseInt(e.target.value)).id_areaConcentracao)
														.then(result => this.setState({ arrayOrientadores: result }));
													listaDeLinhasDePesquisas(array_cursos.find(item => item.id === parseInt(e.target.value)).id_areaConcentracao)
														.then(result => this.setState({ arrayLinhasDePesquisas: result }));
												}}>
												<option value="0">Selecione</option>
												{array_cursos.length > 0 ?
													array_cursos.map(curso => (
														this.state.idAreaConcentracao === curso.id_areaConcentracao ?
															<option value={curso.id}>{curso.nome}</option> : ""
													))
													: (<option>0</option>)
												}
											</select>
										</div>

										<div className="form-group">
											<label htmlFor="nome">Orientador:*</label>
											<select class="form-control" id="selectOrientador"
												onChange={e => this.setState({ id_orientador: e.target.value })}>
												<option value="0">Selecione</option>
												{this.state.arrayOrientadores.length > 0 ?
													this.state.arrayOrientadores.map(orientador => (
														<option value={orientador.id}>{orientador.nome}</option>
													))
													: (<option>0</option>)
												}
											</select>
										</div>

										<div className="form-group">
											<label>Área de concentração:*</label>
											<select class="form-control" id="selectAreaConcentracao" value={this.state.idAreaConcentracao}
												onChange={e =>
													listaDeLinhasDePesquisas(e.target.value)
														.then(result => this.setState({ arrayLinhasDePesquisas: result }))
														.then(this.setState({ idAreaConcentracao: e.target.value }))
												}
												disabled={true}>
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
											<select class="form-control" id="selectLinhaPesquisa"
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
								centered
							>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> Atualizar as informações do orientando</h4>
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
														className="form-control"
														id="nome"
														placeholder="Digite seu nome completo"
														onChange={(e) =>
															this.setState({ nome: e.target.value })
														}
														value={this.state.nome}
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
														value={this.state.email}
													/>
												</div>

												<div className="row">
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
																value={this.state.senha}
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
																value={this.state.confirmarSenha}
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
																<option value={tipo.id}>{tipo.nome}</option>
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
														value={this.state.informacoes_adicionais}
													></textarea>
												</div>

												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora inicial do processo:</label>
													<input class="form-control" type="datetime-local" id="dataHoraInicialFaseProcesso" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraInicialFaseProcesso: e.target.value })}
														value={this.state.dataHoraInicialFaseProcesso}
													/>
												</div>

												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora final do processo:</label>
													<input class="form-control" type="datetime-local" id="dataHoraFinalFaseProcesso" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraFinalFaseProcesso: e.target.value })}
														value={this.state.dataHoraFinalFaseProcesso}
													/>
												</div>

												<div className="form-group">
													<label for="dataHoraPrevista">Data/hora de conclusão:</label>
													<input class="form-control" type="datetime-local" id="dataHoraConclusao" name="start"
														min="2022-01"
														onChange={e => this.setState({ dataHoraConclusao: e.target.value })}
														value={this.state.dataHoraConclusao}
													/>
												</div>
											</div>
										</div>

										<h4><FaClipboardList /> Informações academicas</h4>
										<hr />

										<div class="form-group">
											<label>Curso:*</label>
											<select class="form-control" id="selectCurso"
												value={this.state.id_curso}
												onChange={e => {
													this.setState({ id_curso: e.target.value, idAreaConcentracao: array_cursos.find(item => item.id === parseInt(e.target.value)).id_areaConcentracao })
													listaDeOrientadores(array_cursos.find(item => item.id === parseInt(e.target.value)).id_areaConcentracao)
														.then(result => this.setState({ arrayOrientadores: result }));
													listaDeLinhasDePesquisas(array_cursos.find(item => item.id === parseInt(e.target.value)).id_areaConcentracao)
														.then(result => this.setState({ arrayLinhasDePesquisas: result }));
												}}>
												<option value="0">Selecione</option>
												{array_cursos.length > 0 ?
													array_cursos.map(curso => (
														this.state.idAreaConcentracao === curso.id_areaConcentracao ?
															<option value={curso.id}>{curso.nome}</option> : ""
													))
													: (<option>0</option>)
												}
											</select>
										</div>

										<div className="form-group">
											<label htmlFor="nome">Orientador:*</label>
											<select class="form-control" id="selectOrientador" value={this.state.id_orientador}
												onChange={e => this.setState({ id_orientador: e.target.value })}>
												<option value="0">Selecione</option>
												{this.state.arrayOrientadores.length > 0 ?
													this.state.arrayOrientadores.map(orientador => (
														<option value={orientador.id}>{orientador.nome}</option>
													))
													: (<option>0</option>)
												}
											</select>
										</div>

										<div className="form-group">
											<label>Área de concentração:*</label>
											<select class="form-control" id="selectAreaConcentracao" value={this.state.idAreaConcentracao}
												onChange={e =>
													listaDeLinhasDePesquisas(e.target.value)
														.then(result => this.setState({ arrayLinhasDePesquisas: result }))
														.then(this.setState({ idAreaConcentracao: e.target.value }))
												}
												disabled={true}>
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
										<div className="row mt-2">
											<div className="col-sm-12 text-right">
												<button className='button'><FaRegSave /> Salvar</button>
											</div>
										</div>

									</Form>

									<hr />
									<h4 className='titulo'><FaUserGraduate /> Orientações</h4>
									<hr />
									<table className="table table-bordered table-striped table-hover custom-table bg-white">
										<thead className="thead-light">
											<tr>
												<th scope="col">Link</th>
												<th>Orientando</th>
												<th>Observacao</th>
												<th>Data/hora prevista</th>
											</tr>
										</thead>
										<tbody>
											{arrayOrientacao.length > 0 ? (
												arrayOrientacao.map(orientacao => (
													<tr key={orientacao.id} title="Clique aqui para obter mais informações sobre a orientação">
														<td>{orientacao.link}</td>
														<td>{orientacao.orientando}</td>
														<td>{orientacao.observacao}</td>
														<td>{orientacao.dataHoraPrevista}</td>
													</tr>
												))
											) : (<tr className="text-center">
												<td colSpan="10">
													Nenhum resultado encontrado
												</td>
											</tr>)}
										</tbody>
									</table>

									{
										<div className="text-center font-weight-bold mt-3 mb-5">
											Total de Registros: {arrayOrientacao.length}
										</div>
									}
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalCadastrarEAtualizarMembroExterno}
								onHide={() => this.handlerCloseModalCadastrarEAtualizarMembroExterno()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered
							>
								<Form onSubmit={this.cadastrarEAtualizarMembro}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaUserGraduate /> {this.state.id_membroExterno !== 0 ? `Atualizar` : `Cadastrar`}  membro externo</h4>
									</Modal.Header>
									<Modal.Body>


										<div class="form-group">
											<label for="nome">Nome:</label>
											<input className="form-control form-control-sm" type="text" placeholder="Nome" name="nome" id="nome"
												value={this.state.nome}
												onChange={e => this.setState({ nome: e.target.value })} />
										</div>

										<div class="form-group">
											<label for="email">Email:</label>
											<input className="form-control form-control-sm" type="email" placeholder="Email" name="email" id="email"
												value={this.state.email}
												onChange={e => this.setState({ email: e.target.value })} />
										</div>

										<div class="form-group">
											<label for="link_lattes">Link do currículo lattes:</label>
											<input className="form-control form-control-sm" type="text" placeholder="Lattes" name="link_lattes" id="link_lattes"
												value={this.state.link_lattes}
												onChange={e => this.setState({ link_lattes: e.target.value })} />
										</div>

										<div class="form-group">
											<label htmlFor="vinculo_institucional">Vinculo institucional:</label>
											<select class="form-control form-control-sm" id="vinculo_institucional"
												value={this.state.id_vinculoInstitucional}
												onChange={e => this.setState({ id_vinculoInstitucional: e.target.value })}>
												<option value="">{"Selecione uma opção".toLocaleUpperCase()}</option>
												{array_vinculoInstitucional.length > 0 ?
													array_vinculoInstitucional.map(vinculo_institucional => (
														<option value={vinculo_institucional.id}>{vinculo_institucional.nome}</option>
													))
													: (<option>0</option>)}
											</select>
										</div>

										<div className="form-group mt-2">
											<label>Anexar a assinatura digital:</label>
											<input
												type="file"
												className="form-control form-control-sm"
												id="comprovante"
												placeholder="Assinatura "
												accept="image/png, image/gif, image/jpeg"
												onChange={(e) => this.onChangeFileInput(e.target.files[0])}
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

										<p id='progresso' className='text-center'></p>
										<p>Após o envio do arquivo, clique em cadastrar para salvar as informações</p>

										<div className='d-flex justify-content-center'>
											<button id='btnCadastrarAnexo' className='button'><FaRegSave /> {this.state.id_membroExterno !== 0 ? `Atualizar` : `Cadastrar`}</button>
										</div>
									</Modal.Body>
								</Form>
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

	@media only screen and (min-width: 320px) and (max-width: 725px) {
		.button {
			display: block;
			width: 100%;
		}
	}
`;



