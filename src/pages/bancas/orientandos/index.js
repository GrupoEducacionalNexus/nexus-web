import { FaUserGraduate, FaLayerGroup, FaRegSave, FaPencilAlt, FaShieldAlt, FaFileAlt, FaSlideshare, FaCalendarWeek } from 'react-icons/fa';
import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styled from 'styled-components';
import api from '../../../services/api';
import { getToken, logout } from '../../../services/auth';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card, Col, Container, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import backgroundImage from '../../../assets/sistema_chamados.png';
import { uploadFile } from '../../../services/uploadFile';
import { consultaCep } from '../../../services/consultaCep';
import { handleTelefone } from '../../../services/mascaraTelefone';
import { handleCpf } from '../../../services/mascaraCpf';
import { handleRg } from '../../../services/mascaraRg';
import Menu from '../../../components/Menu';
import AdminNavbar from '../../../components/Navbar';
import MainContent from '../../../components/MainContent';
import FloatingMenu from '../../../components/FloatingMenu';

export default class Index extends Component {
	constructor(props) {
		super();

		this.state = {
			modalShowEditarOrientacao: false,

			success: '',
			error: '',

			//Banca
			array_orientandos: [],
			id_orientando: '',
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

			//Orientandos
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
			arquivoTeseOuDissertacao: '',

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
			array_orientacao: [],

			arrayTipoDeDocumentos: [],
			idTipoDocumento: 0,
			modalShowEditarOrientando: false,
			modalShowEditarMeusAnexos: false,
			modalShowSolicitacao: false,

			arrayAnexosDaOrientacao: [],

			nomeArquivo: '',
			id_orientacao: '',
			arrayAnexosDoOrientando: [],
			email_orientador: '',

			//Solicitação
			idTipo: 0,
			cep: '',
			bairro: '',
			endereco: '',
			cidade: '',
			uf: '',
			numero: '',
			telefone: '',
			rg: '',
			cpf: '',
			nacionalidade: '',
			naturalidade: '',
			dt_nascimento: '',
			estado_civil: '',
			id_solicitacao: 0,
			array_solicitacoes: [],
			arrayTiposDesolicitacao: [],
			enviarArquivoNovamente: false
		};
	}

	onChangeFileInput = (e) => {
		uploadFile(e, `enber/bancas/anexos do orientando/`);
	}

	componentDidMount() {
		// this.buscaInformacoesDoOrientando(getToken());
		this.listaDeBancas(getToken(), 1);
		this.listaDeBancas(getToken(), 2);
		this.listaDeOrientacao(getToken());
		this.listaDeSolicitacoes(getToken());
	}

	setModalShowEditarOrientacao(valor) {
		this.setState({ modalShowEditarOrientacao: valor, success: '', error: '' });
	}

	handlerShowModalEditarOrientacao(orientacao) {
		this.setModalShowEditarOrientacao(true);
		this.setState({ id_orientacao: orientacao.id });
		this.listaDeAnexosDoOrientando(getToken(), orientacao.id);
	}

	handlerCloseModalEditarOrientacao() {
		this.setModalShowEditarOrientacao(false);
	};


	setModalShowEditarOrientando(valor) {
		this.setState({ modalShowEditarOrientando: valor, success: '', error: '' });
	}

	handlerShowModalEditarOrientando(orientando) {
		console.log(orientando);
		this.setModalShowEditarOrientando(true);
	}

	handlerCloseModalEditarOrientando() {
		this.setModalShowEditarOrientando(false);
	};

	setModalShowEditarMeusAnexos(valor) {
		this.setState({ modalShowEditarMeusAnexos: valor, success: '', error: '' });
	}

	handlerShowModalEditarMeusAnexos(orientacao) {
		console.log(orientacao);
		this.setModalShowEditarMeusAnexos(true);
		this.setState({
			id_orientacao: orientacao.id,
			email_orientador: orientacao.email_orientador, nome: orientacao.orientando
		});
		this.listaDeAnexosDoOrientando(getToken(), orientacao.id);
	}

	handlerCloseModalEditarMeusAnexos() {
		this.setModalShowEditarMeusAnexos(false);
	};

	setModalShowSolicitacao(valor) {
		this.setState({ modalShowSolicitacao: valor, success: '', error: '' });
	}

	handlerShowModalSolicitacao(solicitacao = null, id_tipo = 0) {
		this.setModalShowSolicitacao(true);
		localStorage.removeItem("@link");
		this.listaDeTiposDeSolicitacao(getToken());
		if (solicitacao === null) {
			this.setState({
				id_solicitacao: 0,
				cep: "",
				bairro: "",
				endereco: "",
				cidade: "",
				uf: "",
				numero: "",
				telefone: "",
				rg: "",
				cpf: "",
				nacionalidade: "",
				naturalidade: "",
				dt_nascimento: "",
				estado_civil: ""
			});
			return
		}

		this.setState({
			id_solicitacao: solicitacao.id,
			idTipo: solicitacao.idTipo,
			cep: solicitacao.cep,
			bairro: solicitacao.bairro,
			endereco: solicitacao.logradouro,
			cidade: solicitacao.cidade,
			uf: solicitacao.estado,
			numero: solicitacao.numero,
			telefone: solicitacao.telefone,
			rg: solicitacao.rg,
			cpf: solicitacao.cpf_cnpj,
			nacionalidade: solicitacao.nacionalidade,
			naturalidade: solicitacao.naturalidade,
			dt_nascimento: solicitacao.dt_nascimento,
			estado_civil: solicitacao.estado_civil
		})
	}

	handlerCloseModalSolicitacao() {
		this.setModalShowSolicitacao(false);
	};

	listaDeBancas = async (token, id_tipoBanca) => {
		try {
			const response = await fetch(`${api.baseURL}/orientandos/${token}/bancas?tipo_banca=${id_tipoBanca}`,
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
			if (data.status === 200) {
				console.log(data);
				if (data.resultados.length > 0) {
					parseInt(data.id_tipoBanca) === 1 ? this.setState({ array_bancasQ: data.resultados }) :
						this.setState({ array_bancasD: data.resultados })
				}
			}

			if (data.permissoes === false) {
				logout();
				this.props.history.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	listaDeOrientacao = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/orientandos/${token}/orientacao`, {
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
				this.setState({ array_orientacao: data.resultados });
			}
		} catch (error) {
			return error;
		}
	};

	atualizarOrientando = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { id_orientando, arquivoTeseOuDissertacao, idTipoDocumento } = this.state;
			console.log(arquivoTeseOuDissertacao);

			if (!arquivoTeseOuDissertacao || !idTipoDocumento) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			let formData = new FormData();
			formData.append('arquivoTeseOuDissertacao', arquivoTeseOuDissertacao);
			formData.append('idTipoDocumento', idTipoDocumento);

			const response = await fetch(`${api.baseURL}/orientandos/${id_orientando}`, {
				method: 'PUT',
				headers: {
					'x-access-token': getToken()
				},
				body: formData
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	cadastrarAnexoDoOrientando = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { id_orientacao, nomeArquivo, email_orientador, nome } = this.state;

			if (!nomeArquivo) {
				this.setState({ error: 'Por favor, informe o nome do arquivo!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/anexos`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify({
					id_orientacao, nome: nomeArquivo,
					link: JSON.parse(localStorage.getItem('@link')) ? JSON.parse(localStorage.getItem('@link')) : "",
					email_orientador: email_orientador, orientando: nome
				}),
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeAnexosDoOrientando(getToken(), id_orientacao);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeAnexosDoOrientando = async (token, id_orientacao) => {
		try {
			const response = await fetch(`${api.baseURL}/orientacao/${id_orientacao}/anexos`, {
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
				this.setState({ arrayAnexosDaOrientacao: data.resultadosAnexosDaOrientacao, arrayAnexosDoOrientando: data.resultadosAnexosDoOrientando });
			}
		} catch (error) {
			return error;
		}
	};

	cadastrarEAtualizarSolicitacao = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { id_solicitacao, cep, bairro, endereco, cidade,
				uf, telefone, numero, rg, cpf, nacionalidade,
				naturalidade, dt_nascimento, estado_civil, idTipo, enviarArquivoNovamente } = this.state;

			if (idTipo === 1 && id_solicitacao === 0) {
				if (!idTipo || !bairro
					|| !endereco || !cidade
					|| !uf || !telefone
					|| !rg || !cpf || !nacionalidade
					|| !naturalidade || !dt_nascimento
					|| !estado_civil || !JSON.parse(localStorage.getItem('@link'))) {
					this.setState({ error: 'Por favor, preencher todos os campos!' });
					return;
				}
			}

			if (idTipo === 1 && id_solicitacao !== 0) {
				if (!idTipo || !bairro
					|| !endereco || !cidade
					|| !uf || !telefone
					|| !rg || !cpf || !nacionalidade
					|| !naturalidade || !dt_nascimento
					|| !estado_civil || enviarArquivoNovamente ? !JSON.parse(localStorage.getItem('@link')) : "") {
					this.setState({ error: 'Por favor, preencher todos os campos!' });
					return;
				}
			}

			if (idTipo === 2 && id_solicitacao === 0) {
				if (!idTipo || !JSON.parse(localStorage.getItem('@link'))) {
					this.setState({ error: 'Por favor, preencher todos os campos!' });
					return;
				}
			}

			if (idTipo === 2 && id_solicitacao !== 0) {
				if (!JSON.parse(localStorage.getItem('@link'))) {
					this.setState({ error: 'Por favor, preencher todos os campos!' });
					return;
				}
			}

			const url = id_solicitacao !== 0 ? `${api.baseURL}/solicitacao/${id_solicitacao}` : `${api.baseURL}/solicitacao`;

			//Verifica se o tipo da solicitação é diploma ou ficha catalográfica
			const solicitacao = idTipo === 1 ? {
				cep, bairro,
				endereco, cidade,
				uf, numero, telefone,
				rg, cpf, nacionalidade,
				naturalidade, dt_nascimento,
				estado_civil,
				link: JSON.parse(localStorage.getItem('@link')) ? JSON.parse(localStorage.getItem('@link')) : "",
				idTipo
			} : {
				idTipo,
				link: JSON.parse(localStorage.getItem('@link')) ? JSON.parse(localStorage.getItem('@link')) : "",
			};

			const response = await fetch(`${url}`, {
				method: id_solicitacao !== 0 ? 'PUT' : 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken()
				},
				body: JSON.stringify(solicitacao),
			});

			const data = await response.json();

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeSolicitacoes(getToken());
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}

	alteraEnviarArquivoNovamente = () => {
		this.setState({ enviarArquivoNovamente: !this.state.enviarArquivoNovamente });
		localStorage.removeItem("@link");
	}

	listaDeSolicitacoes = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/orientandos/${token}/solicitacao`, {
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
				this.setState({ array_solicitacoes: data.resultados });
			}
		} catch (error) {
			return error;
		}
	};

	listaDeTiposDeSolicitacao = async (token) => {
		try {
			const response = await fetch(`${api.baseURL}/tipo_solicitacao`, {
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
				this.setState({ arrayTiposDesolicitacao: data.resultados });
			}
		} catch (error) {
			return error;
		}
	};

	render() {
		const bancasQ = this.state.array_bancasQ;
		const bancasD = this.state.array_bancasD;
		const array_orientacao = this.state.array_orientacao;
		const arrayAnexosDaOrientacao = this.state.arrayAnexosDaOrientacao;
		const arrayAnexosDoOrientando = this.state.arrayAnexosDoOrientando;
		const array_solicitacoes = this.state.array_solicitacoes;
		const arrayTiposDesolicitacao = this.state.arrayTiposDesolicitacao;

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
							{/* <FloatingMenu>
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
							</FloatingMenu> */}
							<div className="content">

								<div className='container'>
									<Tabs
										variant="pills"
										defaultActiveKey="orientacao"
										transition={false}
										id="panel-admin"
										className="justify-content-center">
										<Tab
											eventKey="orientacao"
											title="Orientação"
											style={{ marginTop: '30px' }}>
											<div className='container'>
												<div className='row'>
													<div className='col-sm-10'>
														<h1 style={{ color: '#ffffff', fontSize: '20pt' }}><FaUserGraduate /> Orientações</h1>
													</div>
												</div>
												<hr />
												<div className='row'>
													{array_orientacao.length > 0 ? (
														array_orientacao.map((orientacao, index) => (
															<div className='col-sm-4'>
																<Card key={orientacao.id} className="zoom text-center" style={{ minHeight: "350px", backgroundColor: "rgba(255, 255, 255, 0.3)", color: "#ffffff", marginBottom: "20px" }}>
																	<Card.Body >
																		{index === 0 ? (<p>Ultima orientação realizada</p>) : ""}
																		<FaSlideshare style={{ width: "200px", height: "50px", marginBottom: "20px" }} />
																		<Card.Text>
																			Orientação: {orientacao.id}
																		</Card.Text>
																		<Card.Text>
																			{orientacao.link}
																		</Card.Text>
																		<Card.Text>Observação: {orientacao.observacao}</Card.Text>
																		<Card.Text> Data/hora prevista {orientacao.dataHoraPrevistaTb}</Card.Text>
																		<button className='btn btn-sm btn-outline-light btn-block' onClick={() => this.handlerShowModalEditarOrientacao(orientacao)}>Anexos da orientação</button>
																		<button className='btn btn-sm btn-outline-light btn-block' onClick={() => this.handlerShowModalEditarMeusAnexos(orientacao)}>Meus anexos</button>

																	</Card.Body>
																</Card>
															</div>
														))
													) : (<Card key={0} className="zoom text-center" style={{ minHeight: "200px", backgroundColor: "rgba(255, 255, 255, 0.3)", color: "#ffffff", marginBottom: "20px" }}>
														<Card.Body >

															<FaSlideshare style={{ width: "200px", height: "50px", marginBottom: "20px" }} />
															<Card.Text>
																Nenhum orientação registrada
															</Card.Text>
														</Card.Body>
													</Card>)}

												</div>

											</div>
										</Tab>

										<Tab
											eventKey="bancas"
											title="Bancas"
											style={{ marginTop: '30px' }}>
											<div className='container'>
												<div className='row'>
													<div className='col-sm-6'>
														<h1 style={{ color: "#ffffff", fontSize: '20pt' }}><FaLayerGroup /> Bancas</h1>
													</div>
												</div>
												<hr />
												<div className='row'>
													<div className='col-sm-6'>
														<Accordion>
															{bancasQ.length > 0 ?
																bancasQ.map(banca => (
																	<Card style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff" }}>
																		<Accordion.Toggle as={Card.Header} eventKey={banca.id} bg={`red`}>
																			<h5><FaLayerGroup /> Qualificação</h5>
																		</Accordion.Toggle>
																		<Accordion.Collapse eventKey={banca.id}>
																			<Card.Body>
																				<ul className="list-group">
																					<li className={
																						banca.status_confirmacaoBancaQ === "AGUARDANDO" ? `list-group-item lead font-weight-bold text-warning` : `list-group-item lead font-weight-bold text-success`}>Status: {banca.status_confirmacaoBancaQ === "FINALIZADA" ? `aguardando` : `finalizada`}</li>
																					<li className="list-group-item">Curso: {banca.curso}</li>
																					<li className="list-group-item">Data e hora prevista: {banca.data_horaPrevista}</li>
																				</ul>


																			</Card.Body>
																		</Accordion.Collapse>
																	</Card>
																)) : (
																	<Card>
																		<Accordion.Toggle as={Card.Header} eventKey="0">
																			<h5><FaLayerGroup /> Qualificação - nenhum resultado encontrado</h5>
																		</Accordion.Toggle>
																		<Accordion.Collapse eventKey="0">
																			<Card.Body>

																			</Card.Body>
																		</Accordion.Collapse>
																	</Card>
																)}
														</Accordion>
													</div>
													<div className='col-sm-6'>
														<Accordion> 
															{bancasD.length > 0 ?
																bancasD.map(banca => (
																	<Card style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff", marginBottom: "20px" }}>
																		<Accordion.Toggle as={Card.Header} eventKey={banca.id} >
																			<h5><FaLayerGroup /> Defesa</h5>
																		</Accordion.Toggle>
																		<Accordion.Collapse eventKey={banca.id}>
																			<Card.Body>
																				<ul className="list-group ">
																					<li className={banca.status_confirmacaoBancaD === "AGUARDANDO" ? `list-group-item lead font-weight-bold text-warning` : `list-group-item lead font-weight-bold text-success`}>Status: {banca.status_confirmacaoBancaD === "FINALIZADA" ? `finalizada` : `confirmado`}</li>
																					<li className="list-group-item">Curso: {banca.curso}</li>
																					<li className="list-group-item">Data e hora prevista: {banca.data_horaPrevista}</li>
																				</ul>

																				{banca.status_confirmacaoBancaD === "FINALIZADA" ? (
																					<div className='container mt-3'>
																						<div className='row mb-2'>
																							<div className='col-sm-8'>
																								<h6 className='lead'>Solicitações</h6>
																							</div>
																							<div className='col-sm-4 text-right'>
																								<button className='btn btn-sm btn-light btn-block' onClick={() => this.handlerShowModalSolicitacao()}>Solicitar</button>
																							</div>
																						</div>

																						<hr/>
																						<div className="table-responsive table-sm text-center">
																							<div class="table-wrapper">
																								<table class="table text-center">
																									<thead>
																										<tr>
																											<th scope="col">Link do anexo</th>
																											<th scope="col">Tipo</th>
																											<th scope="col">Status</th>
																											<th scope="col">Data/hora</th>
																											<th>Ações</th>
																										</tr>
																									</thead>
																									<tbody>
																										{array_solicitacoes.length > 0 ? (
																											array_solicitacoes.map((solicitacao, index) => (
																												<tr key={index}>
																													<td><a href={solicitacao.anexo} className='font-weight-bold'>Baixar</a></td>
																													<td>{solicitacao.tipo}</td>
																													<td>{solicitacao.status}</td>
																													<td>{solicitacao.dataHoraCriacao}</td>
																													<td><button className='btn btn-sm btn-outline-light btn-block' onClick={() => this.handlerShowModalSolicitacao(solicitacao, solicitacao.idTipo)}>Atualizar</button></td>
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
																					</div>
																				) : ("")}
																			</Card.Body>
																		</Accordion.Collapse>
																	</Card>
																))
																: (
																	<Card>
																		<Accordion.Toggle as={Card.Header} eventKey="0">
																			<h5><FaLayerGroup /> Defesa - nenhum resultado encontrado</h5>
																		</Accordion.Toggle>
																		<Accordion.Collapse eventKey="0">
																			<Card.Body>

																			</Card.Body>
																		</Accordion.Collapse>
																	</Card>
																)}
														</Accordion>
													</div>
												</div>
											</div>
										</Tab>
									</Tabs>

								</div >

							</div >
							{/* /.content */}
							< br />
							<Modal
								show={this.state.modalShowEditarOrientando}
								onHide={() => this.handlerCloseModalEditarOrientando()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered>
								<Form onSubmit={this.atualizarOrientando}>
									<Modal.Header closeButton>
										<h4 className='titulo'><FaUserGraduate /> Anexar arquivo de tese ou dissertação</h4>
									</Modal.Header>
									<Modal.Body>
										<p className='text-danger'>Você precisa anexar o seu arquivo de tese ou dissertação para prosseguirmos com processo de banca!</p>

										<div className="form-group mt-2">
											<label>Anexo:</label>
											<input
												type="file"
												className="form-control form-control-sm"
												id="comprovante"
												placeholder="Assinatura"
												accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
									text/plain, application/pdf"
												onChange={(e) => this.setState({ arquivoTeseOuDissertacao: e.target.files[0] })}
											/>
										</div>

										<div class="form-group">
											<label>Tipo:</label>
											<select class="form-control" id="selectTipoDocumento"
												onChange={e => this.setState({ idTipoDocumento: e.target.value })}
											>
												<option value="0">Selecione</option>
												{this.state.arrayTipoDeDocumentos.length > 0 ?
													this.state.arrayTipoDeDocumentos.map(tipo => (
														<option value={tipo.id}>{tipo.nome}</option>
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
								show={this.state.modalShowEditarOrientacao}
								onHide={() => this.handlerCloseModalEditarOrientacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='xl'
								centered>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> Detalhes da orientação</h4>
								</Modal.Header>
								<Modal.Body>
									<h5><FaFileAlt /> Anexados da orientação</h5>
									<p className='text-danger'>Atenção: arquivos anexados pelo orientador</p>
									<hr />

									<div className='row overflow-auto' style={{ maxHeight: "300px" }}>
										{arrayAnexosDaOrientacao.length > 0 ? (
											arrayAnexosDaOrientacao.map((anexo, index) => (
												<div className='col-sm-4'>
													<Card key={anexo.id} className="zoom text-center">
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
								</Modal.Body>

								<Modal.Footer>

								</Modal.Footer>

							</Modal>


							<Modal
								show={this.state.modalShowEditarMeusAnexos}
								onHide={() => this.handlerCloseModalEditarMeusAnexos()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'
								centered
							>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> Meus anexos</h4>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={this.cadastrarAnexoDoOrientando}>
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

										<div className="form-group mb-3">
											<label for="anexo">Anexar arquivo</label>
											<input type="file" className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
										</div>

										<p id='progresso' className='text-center'></p>

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
											<button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
										</div>
									</Form>

									<hr />

									<div className='row overflow-auto' style={{ maxHeight: "300px" }}>
										{arrayAnexosDoOrientando.length > 0 ? (
											arrayAnexosDoOrientando.map((anexo, index) => (
												<div className='col-sm-6'>
													<Card key={anexo.id} className="zoom text-center">
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
								</Modal.Body>

								<Modal.Footer>

								</Modal.Footer>
							</Modal>

							<Modal
								show={this.state.modalShowSolicitacao}
								onHide={() => this.handlerCloseModalSolicitacao()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size={this.state.id_solicitacao !== 0 && this.state.idTipo === 2 ?
									`md` : `lg`}
								centered>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaUserGraduate /> {this.state.id_solicitacao === 0 ?
										`Solicitar ${this.state.idTipo === 1 ? `diploma` : `ficha catalográfica`}` :
										`Detalhes da solicitação de ${this.state.idTipo === 1 ? `diploma` : `ficha catalográfica`}`}</h4>
								</Modal.Header>
								<Form onSubmit={this.cadastrarEAtualizarSolicitacao}>
									<Modal.Body>
										{this.state.id_solicitacao === 0 ? (
											<div className='container'>
												<div className="row mt-3 mb-2">
													<div className="col-sm-6">
														<div class="form-group">
															<label for="selectTipoDeSolicitacao">Tipo da solitação:</label>
															<select class="form-control form-control-sm" id="selectTipoDeSolicitacao" value={this.state.idTipo}
																onChange={e => this.setState({ idTipo: parseInt(e.target.value) })}>
																<option value="0">Selecionar</option>
																{arrayTiposDesolicitacao.length > 0 ? (
																	arrayTiposDesolicitacao.map(item =>
																		parseInt(item.id) <= 2 ? (<option value={item.id}>{item.nome}</option>) : "")
																) : (
																	<option value="0">Nenhum resultado encontrado</option>
																)}
															</select>
														</div>
													</div>
													<div className="col-sm-6">
														<div className="form-group mb-3">
															<label for="anexo">Anexar arquivo</label>
															<input type="file" accept='application/pdf' className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
														</div>
													</div>
												</div>

												<div class="progress mb-2">
													<div id='progresso' class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
												</div>

												{this.state.idTipo === 1 ? (

													<div className="container mt-2" style={{ overflowY: "scroll", height: "300px" }}>
														<div className="row ">
															<div className="col-sm-4">
																<div className="form-group">
																	<label htmlFor="cep">CEP:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="cep"
																		onChange={(e) =>
																			consultaCep(e.target.value).then(result => this.setState({
																				cep: result.cep,
																				bairro: result.bairro,
																				endereco: result.logradouro,
																				cidade: result.localidade,
																				uf: result.uf,
																			}))
																		}
																	/>
																</div>
															</div>

															<div className="col-sm-8">
																<div className="form-group">
																	<label htmlFor="endereco">Endereço:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="endereco"
																		onChange={(e) =>
																			this.setState({ endereco: e.target.value })
																		}
																		value={this.state.endereco}
																	/>
																</div>
															</div>
														</div>

														<div className="row">
															<div className="col-sm-2">
																<div className="form-group">
																	<label htmlFor="numero">Número:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="numero"
																		onChange={(e) => this.setState({ numero: e.target.value })}
																		value={this.state.numero}
																	/>
																</div>
															</div>

															<div className="col-sm-4">
																<div className="form-group">
																	<label htmlFor="bairro">Bairro:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="endereco"
																		onChange={(e) =>
																			this.setState({ bairro: e.target.value })
																		}
																		value={this.state.bairro}
																	/>
																</div>
															</div>
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="cidade">Cidade:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="cidade"
																		onChange={(e) => this.setState({ numero: e.target.value })}
																		value={this.state.cidade}
																	/>
																</div>
															</div>
														</div>

														<div className="row">
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="uf">UF:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="uf"
																		onChange={(e) =>
																			this.setState({ uf: e.target.value })
																		}
																		value={this.state.uf}
																	/>
																</div>
															</div>
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="numero">Telefone:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="telefone"
																		placeholder=""
																		onChange={(e) => handleTelefone(e.target.value).then(result => this.setState({ telefone: result }))}
																		value={this.state.telefone}
																	/>
																</div>
															</div>
														</div>

														<div className="row">
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="numero">RG:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="rg"
																		placeholder=""
																		onChange={(e) => handleRg(e.target.value).then(result => this.setState({ rg: result }))}
																		value={this.state.rg}
																		maxLength={9}
																	/>
																</div>
															</div>
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="numero">CPF:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="cpf"
																		placeholder=""
																		onChange={(e) => handleCpf(e.target.value).then(result => this.setState({ cpf: result }))}
																		value={this.state.cpf}
																	/>
																</div>
															</div>
														</div>

														<div className="row">
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="numero">Nacionalidade:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="naturalidade"
																		placeholder=""
																		onChange={(e) => this.setState({ nacionalidade: e.target.value })}
																		value={this.state.nacionalidade}
																	/>
																</div>
															</div>

															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="numero">Naturalidade:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="naturalidade"
																		placeholder=""
																		onChange={(e) => this.setState({ naturalidade: e.target.value })}
																		value={this.state.naturalidade}
																	/>
																</div>
															</div>
														</div>

														<div className="row">
															<div className="col-sm-6">
																<div className="form-group">
																	<label for="dataHoraPrevista">Data de nascimento:</label>
																	<input class="form-control form-control-sm" type="date" id="dt_nascimento" name="start"
																		onChange={e => this.setState({ dt_nascimento: e.target.value })}
																		value={this.state.dt_nascimento}
																	/>
																</div>
															</div>
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="numero">Estado civil:</label>
																	<input
																		type="text"
																		className="form-control form-control-sm"
																		id="naturalidade"
																		placeholder=""
																		onChange={(e) => this.setState({ estado_civil: e.target.value })}
																		value={this.state.estado_civil}
																	/>
																</div>
															</div>
														</div>
													</div>
												) : ("")}
												{this.state.idTipo === 1 ? (
													<pre className="container mt-3" style={{ overflowY: "scroll", height: "200px" }}>
														<h6>Documentos que devem ser incluídos no processo pelo solicitante:</h6>
														<ul class="list-group">
															<li class="list-group-item text-dark">Identidade (legível)</li>
															<li class="list-group-item text-dark">CPF (legível)</li>
															<li class="list-group-item text-dark">Cópia do titulo de eleitor e comprovante de quitação eleitoral (última eleição)</li>
															<li class="list-group-item text-dark">Certificado de Reservista (para homens)</li>
															<li class="list-group-item text-dark">Diploma de Graduação (Legível)</li>
															<li class="list-group-item text-dark">Diploma de Pós-Graduação (Legível, quando for o caso)</li>
															<li class="list-group-item text-dark">Declaração de inexistência de débitos na Biblioteca Central</li>
															<li class="list-group-item text-dark"> Procuração pública (quando for o caso)</li>
														</ul>
														<p className='text-danger'>Atenção: anexar em um único arquivo em PDF, a documentação acima!</p>
													</pre>
												) : ("")}
											</div>
										) : (
											this.state.idTipo === 1 ?
												(<div className="container">
													<div className="row mt-2">
														<div className="col-sm-2">
															<div className="form-group">
																<label htmlFor="cep">CEP:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="cep"
																	onChange={(e) =>
																		consultaCep(e.target.value).then(result => this.setState({
																			cep: result.cep,
																			bairro: result.bairro,
																			endereco: result.logradouro,
																			cidade: result.localidade,
																			uf: result.uf,
																		}))
																	}
																/>
															</div>
														</div>

														<div className="col-sm-5">
															<div className="form-group">
																<label htmlFor="endereco">Endereço:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="endereco"
																	onChange={(e) =>
																		this.setState({ endereco: e.target.value })
																	}
																	value={this.state.endereco}
																/>
															</div>
														</div>

														<div className="col-sm-2">
															<div className="form-group">
																<label htmlFor="numero">Número:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="numero"
																	onChange={(e) => this.setState({ numero: e.target.value })}
																	value={this.state.numero}
																/>
															</div>
														</div>

														<div className="col-sm-3">
															<div className="form-group">
																<label htmlFor="bairro">Bairro:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="endereco"
																	onChange={(e) =>
																		this.setState({ bairro: e.target.value })
																	}
																	value={this.state.bairro}
																/>
															</div>
														</div>
													</div>

													<div className="row">
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="cidade">Cidade:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="cidade"
																	onChange={(e) => this.setState({ numero: e.target.value })}
																	value={this.state.cidade}
																/>
															</div>
														</div>

														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="uf">UF:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="uf"
																	onChange={(e) =>
																		this.setState({ uf: e.target.value })
																	}
																	value={this.state.uf}
																/>
															</div>
														</div>
													</div>

													<div className="row">
														<div className="col-sm-4">
															<div className="form-group">
																<label htmlFor="numero">Telefone:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="telefone"
																	placeholder=""
																	onChange={(e) => handleTelefone(e.target.value).then(result => this.setState({ telefone: result }))}
																	value={this.state.telefone}
																/>
															</div>
														</div>

														<div className="col-sm-4">
															<div className="form-group">
																<label htmlFor="numero">RG:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="rg"
																	placeholder=""
																	onChange={(e) => handleRg(e.target.value).then(result => this.setState({ rg: result }))}
																	value={this.state.rg}
																	maxLength={9}
																/>
															</div>
														</div>
														<div className="col-sm-4">
															<div className="form-group">
																<label htmlFor="numero">CPF:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="cpf"
																	placeholder=""
																	onChange={(e) => handleCpf(e.target.value).then(result => this.setState({ cpf: result }))}
																	value={this.state.cpf}
																/>
															</div>
														</div>
													</div>

													<div className="row">
														<div className="col-sm-4">
															<div className="form-group">
																<label htmlFor="numero">Nacionalidade:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="naturalidade"
																	placeholder=""
																	onChange={(e) => this.setState({ nacionalidade: e.target.value })}
																	value={this.state.nacionalidade}
																/>
															</div>
														</div>

														<div className="col-sm-4">
															<div className="form-group">
																<label htmlFor="numero">Naturalidade:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="naturalidade"
																	placeholder=""
																	onChange={(e) => this.setState({ naturalidade: e.target.value })}
																	value={this.state.naturalidade}
																/>
															</div>
														</div>

														<div className="col-sm-4">
															<div className="form-group">
																<label for="dataHoraPrevista">Data de nascimento:</label>
																<input class="form-control" type="date" id="dt_nascimento" name="start"
																	onChange={e => this.setState({ dt_nascimento: e.target.value })}
																	value={this.state.dt_nascimento}
																/>
															</div>
														</div>
													</div>

													<div className="row">
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="numero">Estado civil:</label>
																<input
																	type="text"
																	className="form-control form-control-sm"
																	id="naturalidade"
																	placeholder=""
																	onChange={(e) => this.setState({ estado_civil: e.target.value })}
																	value={this.state.estado_civil}
																/>
															</div>
														</div>

														<div className="col-sm-6">
															<div class="form-check">
																<input class="form-check-input" type="checkbox" checked={this.state.enviarArquivoNovamente} id="defaultCheck1" onChange={this.alteraEnviarArquivoNovamente} />
																<label class="form-check-label" for="defaultCheck1">
																	Marcar este item caso deseje enviar um novo arquivo!
																</label>
															</div>

														</div>
													</div>

													{this.state.enviarArquivoNovamente ? (
														<div className='container'>
															<div className="form-group mb-3">
																<label for="anexo">Anexar arquivo</label>
																<input type="file" accept='application/pdf' className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
															</div>

															<div class="progress mb-2">
																<div id='progresso' class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
															</div>
														</div>
													) : ''}
												</div>) : (
													<div className='container'>
														<div class="form-check">
															<input class="form-check-input" type="checkbox" checked={this.state.enviarArquivoNovamente} id="defaultCheck1" onChange={this.alteraEnviarArquivoNovamente} />
															<label class="form-check-label" for="defaultCheck1">
																Marcar este item caso deseje enviar um novo arquivo!
															</label>
														</div>
														{this.state.enviarArquivoNovamente ? (
															<div className='container'>
																<div className="form-group mb-3">
																	<label for="anexo">Anexar arquivo</label>
																	<input type="file" accept='application/pdf' className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
																</div>

																<div class="progress mb-2">
																	<div id='progresso' class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
																</div>
															</div>
														) : ''}
													</div>
												)
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
									</Modal.Body>

									<Modal.Footer>
										<div className='d-flex justify-content-center mt-3'>
											<button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
										</div>
									</Modal.Footer>

								</Form>
							</Modal >
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

