import { FaRegSave, FaCalendarWeek, FaBoxes, FaPlus, FaUserFriends, FaHandsHelping, FaRegUser } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { getToken } from '../../services/auth';
import Modal from 'react-bootstrap/Modal';
import { Certificado } from '../../components/Certificado';
import moment from 'moment/moment';
import { uploadFile } from '../../services/uploadFile';
import { Accordion, Card, Col, Container, Nav, Navbar, Row, Tab, Tabs } from 'react-bootstrap';
import Perfil from '../../components/Perfil';
import MainContent from '../../components/MainContent';
import logo from '../../assets/enber.png';
import UserContext from '../../UserContext';

export default class Index extends Component {
	static contextType = UserContext;
	constructor(props) {
		super();

		this.state = {
			modalShowCadastrarAnexo: false,
			modalShowEditarEvento: false,
			modalShowEditarCertificado: false,
			modalShowVisualizarAnexo: false,
			keyTab: 'Checklist',
			success: '',
			error: '',
			successUpload: '',
			errorUpload: '',

			//Dados do evento
			temaEvento: '',
			dataEventoInicial: '',
			dataEventoFinal: '',
			arrayEventos: [],
			arrayAnexos: [],
			id_evento: 0,
			arrayMembrosDoEvento: [],
			arrayCodigosDeValidacao: [],

			//Dados do membro
			id_usuario: 0,
			cpfMembro: '',
			nomeMembro: '',
			codigo_validacao: '',
			dataHoraEvento: '',
			tipo_membro: '',
			grupo_trabalho: '',

			//Anexo
			arquivo: null,
			nomeArquivo: "",
			id_usuario: 0,
			data_horaAtual: new Date(),
			coautor: "",
			link: "",
			id_gt: 0
		};
	}

	componentDidMount() {
		const userContext = this.context;
		this.setState({
			nomeMembro: userContext.user.nome,
			id_usuario: userContext.user.id

		});
		this.listaDeEventos(getToken());
	}

	setModalShowEditarEvento(valor) {
		this.setState({ modalShowEditarEvento: valor, success: '', error: '', arquivoDeMembros: [], arrayMembrosDoEvento: [] });
	}

	handlerShowModalEditarEvento(evento) {
		this.setState({ id_evento: evento.id, temaEvento: evento.tema });
		this.setModalShowEditarEvento(true);
		this.listaDeMembrosPorEvento(getToken(), evento.id);
	}

	handlerCloseModalEditarEvento() {
		this.setModalShowEditarEvento(false);
	};

	setModalShowCadastrarAnexo(valor) {
		this.setState({ modalShowCadastrarAnexo: valor, error: '' });
	}

	handlerShowModalCadastrarAnexo(evento) {
		this.setModalShowCadastrarAnexo(true);
		console.log(evento);
		this.setState({ id_gt: evento.id_gt, grupo_trabalho: evento.gt });
		this.listaDeAnexos(this.state.id_usuario, evento.id_gt);
	}

	handlerCloseModalCadastrarAnexo() {
		this.setModalShowCadastrarAnexo(false);
		this.setState({ id_evento: "", temaEvento: "", nomeArquivo: "", arquivo: null, coautor: "", success: '', error: '' });
	};

	setModalShowEditarCertificado(valor) {
		this.setState({ modalShowEditarCertificado: valor, success: '', error: '' });
	}

	handlerShowModalEditarCertificado(membro) {
		console.log(membro);
		this.setModalShowEditarCertificado(true);
		this.setState({
			cpfMembro: membro.cpf, nomeMembro: membro.nome_completo, codigo_validacao: membro.codigo_validacao, temaEvento: membro.tema, dataEventoInicial: membro.dataEventoInicial,
			dataEventoFinal: membro.dataEventoFinal, carga_horaria: membro.carga_horaria, tipo_membro: membro.tipo_membro, grupo_trabalho: membro.grupo_trabalho
		});
	}

	handlerCloseModalEditarCertificado() {
		this.setModalShowEditarCertificado(false);
	};

	setModalShowVisualizarAnexo(valor) {
		this.setState({ modalShowVisualizarAnexo: valor, error: "" });
	}

	handlerShowModalVisualizarAnexo(anexo) {
		console.log(anexo);
		this.setModalShowVisualizarAnexo(true);
		this.setState({ titulo: anexo.titulo, id_anexo: anexo.id, link: `https://docs.google.com/gview?url=${anexo.link}&embedded=true` });
	}

	handlerCloseModalVisualizarAnexo() {
		this.setModalShowVisualizarAnexo(false);
		this.setState({ id_anexo: 0, link: `` });
	}


	listaDeEventos = async (token) => {
		try {
			const response = await fetch(
				`${api.baseURL}/membros/${token}/eventos`,
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
				if (data.resultados.length > 0) {
					this.setState({ arrayEventos: data.resultados });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};


	cadastrarAnexo = async (e) => {
		e.preventDefault();
		this.setState({ success: '', error: '' });
		try {
			const { arquivo, nomeArquivo, coautor, id_gt, id_usuario } = this.state;


			if (!nomeArquivo || !arquivo) {
				this.setState({ error: 'Por favor, preencher todos os campos!' });
				return;
			}

			const response = await fetch(`${api.baseURL}/anexos`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': getToken(),
				},
				body: JSON.stringify({
					titulo: nomeArquivo, link: JSON.parse(localStorage.getItem('@link')), coautor, id_gt
				})
			});

			const data = await response.json();
			console.log(data);

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeAnexos(id_usuario, id_gt);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });

			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeAnexos = async (id_usuario, id_gt) => {
		try {
			const response = await fetch(`${api.baseURL}/membros/${id_usuario}/anexos?id_gt=${id_gt}`,
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
			//console.log(data)
			if (data.status === 200) {
				this.setState({ arrayAnexos: data.resultados });
			}
		} catch (error) {
			console.log(error);
		}
	};

	onChangeFileInput = (e) => {
		uploadFile(e, `enber/eventos/anexos/`);
		this.setState({ arquivo: e });
	}

	print = (id) => {
		//console.log('print');  
		let printContents = document.getElementById(id).innerHTML;
		document.body.innerHTML = printContents;
		window.print();
		window.location.reload();
	}

	render() {
		const eventos = this.state.arrayEventos;
		const anexos = this.state.arrayAnexos;

		return (
			<Container fluid style={{
				padding: "0",
				backgroundColor: "#f5f5dc",
				minHeight: "100vh"
			}}>
				<Navbar style={{ backgroundColor: "#000233" }}>
					<Container>
						<Navbar.Brand href="#home">
							<img id="logo" src={logo} style={{ width: "60px" }} />
						</Navbar.Brand>
						<Nav className="ml-auto">
							<Nav.Link>
								<Perfil className="btn btn-sm btn-outline-light" />
							</Nav.Link>

						</Nav>
					</Container>
				</Navbar>
				<Row className='mb-5'>
					<Col xs={12} >
						<MainContent>
							<div className='container mb-3'>
								<h3 className='font-weight-bold mb-3 border-bottom' style={{ fontSize: "12pt", color: "#000233" }}><FaRegUser /> {this.state.nomeMembro.trim()}, seja bem-vindo ao sistema de eventos da enber!</h3>
								<p><FaHandsHelping /> Em caso de dúvidas acesse o <a href='https://api.whatsapp.com/send/?phone=13213009710&text&app_absent=0' target="_blank">link</a></p>
								<div className='row'>
									{eventos.length > 0 ? (
										eventos.map(evento => (
											<div className='col-sm-12'>
												<Card style={{ maxHeight: "380px", overflowY: 'auto' }} className='zoom mt-2'>
													<Card.Body>
														<Card.Title style={{ fontWeight: "bold", marginBottom: '10px' }}>{evento.tema !== null ? evento.tema.toUpperCase() : ``}</Card.Title>
														<Card.Text>Data de inicio: {evento.dataEventoInicial}</Card.Text>
														<Card.Text>Data de término: {evento.dataEventoFinal}</Card.Text>
														<Accordion defaultActiveKey="0">
															{
																evento.grupos_trabalho.split("/").slice(0, -1).map((gt, index) => (
																	<Accordion.Item eventKey={index}>
																		<Accordion.Header style={{ fontSize: "12pt", textAlign: "left" }}><FaUserFriends /> {gt.startsWith(',') ? gt.substring(1) : gt} {parseInt(evento.tipo_gt.split(",")[index]) === 2 ? (
																			` - submeter artigos`
																		) : (
																			` - Ouvinte`
																		)}</Accordion.Header>
																		<Accordion.Body>
																			{parseInt(evento.tipo_gt.split(",")[index]) === 2 ? (
																				<Container>
																					<p className='text-dark mb-2'>Você está participando desse grupo de trabalho para submeter artigos.</p>
																					<a href={evento.links.split(",")[index]} target='_blank' >Link do grupo de trabalho</a>
																					<div className='d-flex justify-content-center mt-2'>
																						<button className='button' onClick={() =>
																							this.handlerShowModalCadastrarAnexo({
																								gt: gt.startsWith('/,') ? gt.substring(1) : gt,
																								id_gt: evento.id_grupo_trabalho.split(",")[index]
																							})}>
																							Submeter Artigo
																						</button>
																					</div>
																				</Container>
																			) : (
																				<Container>
																					<p className='text-dark mb-2'>Você está participando desse grupo de trabalho como ouvinte</p>
																					<a href={evento.links.split(",")[index]} target='_blank' className='mb-2'>Link do grupo de trabalho</a>
																				</Container>
																			)}
																		</Accordion.Body>
																	</Accordion.Item>
																))
															}
														</Accordion>
														{/* <Tabs
															defaultActiveKey={0}
															id="justify-tab-example"
															className="mb-3"
															justify
															variant='pills'>
															{
																evento.grupos_trabalho.split("/").slice(0, -1).map((gt, index) => (
																	<Tab eventKey={index} title={gt.startsWith(',') ? gt.substring(1) : gt} >
																		{parseInt(evento.tipo_gt.split(",")[index]) === 2 ? (
																			<Container>
																				<p className='text-dark mb-2'>Você está participando desse grupo de trabalho para submeter artigos.</p>
																				<a href={evento.links.split(",")[index]} target='_blank' >Link do grupo de trabalho</a>
																				<div className='d-flex justify-content-center mt-2'>
																					<button className='button' onClick={() =>
																						this.handlerShowModalCadastrarAnexo({
																							gt: gt.startsWith('/,') ? gt.substring(1) : gt,
																							id_gt: evento.id_grupo_trabalho.split(",")[index]
																						})}>
																						Submeter Artigo
																					</button>
																				</div>
																			</Container>
																		) : (
																			<Container>
																				<p className='text-dark mb-2'>Você está participando desse grupo de trabalho como ouvinte</p>
																				<a href={evento.links.split(",")[index]} target='_blank' className='mb-2'>Link do grupo de trabalho</a>
																			</Container>
																		)}
																	</Tab>
																))
															}
														</Tabs> */}
														{/* <Accordion defaultActiveKey="0">
															{
																evento.grupos_trabalho.split("/").slice(0, -1).map((gt, index) => (
																	<Accordion.Item eventKey={index}>
																		<Accordion.Header style={{ fontSize: "14pt" }}><FaUserFriends /> {gt.startsWith(',') ? gt.substring(1) : gt}</Accordion.Header>
																		<Accordion.Body>
																			{parseInt(evento.tipo_gt.split(",")[index]) === 2 ? (
																				<Container>
																					<p className='text-dark mb-2'>Você está participando desse grupo de trabalho para submeter artigos.</p>
																					<a href={evento.links.split(",")[index]} target='_blank' >Link do grupo de trabalho</a>
																					<div className='d-flex justify-content-center mt-2'>
																						<button className='button' onClick={() =>
																							this.handlerShowModalCadastrarAnexo({
																								gt: gt.startsWith('/,') ? gt.substring(1) : gt,
																								id_gt: evento.id_grupo_trabalho.split(",")[index]
																							})}>
																							Submeter Artigo
																						</button>
																					</div>
																				</Container>
																			) : (
																				<Container>
																					<p className='text-dark mb-2'>Você está participando desse grupo de trabalho como ouvinte</p>
																					<a href={evento.links.split(",")[index]} target='_blank' className='mb-2'>Link do grupo de trabalho</a>
																				</Container>
																			)}
																		</Accordion.Body>
																	</Accordion.Item>
																))
															}
														</Accordion> */}

														<div className='container text-center'>
															{/* <button className='button mb-2' onClick={() => this.handlerShowModalEditarCertificado(evento)}>Visualizar certificado</button> */}
															{/* <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(evento)}>Anexar o trabalho completo</button> */}
														</div>
													</Card.Body>
												</Card>
											</div>
										))
									) : (<Card style={{ width: '18rem' }}>
										<Card.Body>
											<Card.Subtitle className="mb-2 text-muted">Nenhum evento encontrado</Card.Subtitle>
										</Card.Body>
									</Card>)}
								</div>
							</div>

							<Modal
								show={this.state.modalShowEditarCertificado}
								onHide={() => this.handlerCloseModalEditarCertificado()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								className='modal-fullscreen'>
								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek /> Certificados</h4>
								</Modal.Header>
								<Modal.Body className='text-center'>
									{this.state.tipo_membro === 1 ? (
										<div className='container'>
											<h4>Apresentador</h4>
											<hr />
											<div id='certificado_apresentador'>
												<Certificado
													nomeMembro={this.state.nomeMembro}
													cpfMembro={this.state.cpfMembro}
													temaEvento={this.state.temaEvento}
													dataEventoInicial={this.state.dataEventoInicial}
													dataEventoFinal={this.state.dataEventoFinal}
													cargaHoraria={this.state.carga_horaria}
													codigo_validacao={this.state.codigo_validacao}
													grupo_trabalho={this.state.grupo_trabalho}
													tipo_membro={1}
												/>
											</div>

											<button className="button mt-2 mb-3" onClick={() => this.print('certificado_apresentador')} > Imprimir</button>

											<h4>Participante</h4>
											<hr />
											<div id='certificado_ouvinte'>
												<Certificado
													nomeMembro={this.state.nomeMembro}
													cpfMembro={this.state.cpfMembro}
													temaEvento={this.state.temaEvento}
													dataEventoInicial={this.state.dataEventoInicial}
													dataEventoFinal={this.state.dataEventoFinal}
													cargaHoraria={this.state.carga_horaria}
													codigo_validacao={this.state.codigo_validacao}
													tipo_membro={2}
												/>
											</div>

											<button className='button mt-2' onClick={() => this.print('certificado_ouvinte')} > Imprimir</button>
										</div>
									) : (<div className='container'>
										<h4>Participante</h4>
										<hr />
										<div id='certificado_ouvinte'>
											<Certificado
												nomeMembro={this.state.nomeMembro}
												cpfMembro={this.state.cpfMembro}
												temaEvento={this.state.temaEvento}
												dataEventoInicial={this.state.dataEventoInicial}
												dataEventoFinal={this.state.dataEventoFinal}
												cargaHoraria={this.state.carga_horaria}
												codigo_validacao={this.state.codigo_validacao}
												tipo_membro={2}
											/>
										</div>

										<button className='button mt-2' onClick={() => this.print('certificado_ouvinte')} > Imprimir</button>
									</div>)}


								</Modal.Body>

							</Modal>

							<Modal
								show={this.state.modalShowCadastrarAnexo}
								onHide={() => this.handlerCloseModalCadastrarAnexo()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size='md'>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek /> Anexos do {this.state.grupo_trabalho}</h4>
								</Modal.Header>
								<Modal.Body >

									<Form onSubmit={this.cadastrarAnexo}>
										<div className="form-group">
											<label htmlFor="nome">Titulo do documento:</label>
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

										<div className="form-group">
											<label htmlFor="nome">Coautor:</label>
											<input
												type="text"
												className="form-control form-control-sm"
												id="coautor"
												placeholder="Informe o nome do coautor"
												onChange={(e) =>
													this.setState({ coautor: e.target.value })
												}
												value={this.state.coautor}
											/>
										</div>

										<div className="form-group">
											<label>Anexo:</label>
											<input
												type="file"
												className="form-control form-control-sm"
												id="documento"
												placeholder="Documento"
												accept="application/msword, text/plain, application/pdf"
												onChange={(e) => this.onChangeFileInput(e.target.files[0])}
											/>
										</div>

										<div class="progress">
											<div id='progresso' className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
										</div>

										<div className="row mt-2">
											<div className="col-sm-12">
												{this.state.success && (
													<div
														className="alert alert-success text-center"
														role="alert">
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

									<h4>Anexos</h4>
									<hr />
									<div className="table-responsive table-sm text-center" style={{ height: "200px", overflowY: "scroll" }}>
										<div class="table-wrapper">
											<table className="table table-bordered table-hover">
												<thead>
													<tr>
														<th scope="col">Titulo do documento</th>
														<th>Coautor</th>
														<th>Status</th>
														<th>Ações</th>
													</tr>
												</thead>
												<tbody >
													{anexos.length > 0 ? (
														anexos.map(anexo => (
															<tr key={anexo.id} title="Clique aqui para obter mais informações sobre o anexo">
																<td>{anexo.titulo}</td>
																<td>{anexo.coautor}</td>
																<td>{anexo.status}</td>
																<td><button className="button w-100" onClick={() => this.handlerShowModalVisualizarAnexo(anexo)}>Visualizar</button></td>
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
									</div>
									{
										<div className="text-center font-weight-bold">
											Total de Registros: {anexos.length}
										</div>
									}
								</Modal.Body>
							</Modal>

							<Modal
								show={this.state.modalShowVisualizarAnexo}
								onHide={() => this.handlerCloseModalVisualizarAnexo()}
								aria-labelledby="contained-modal-title-vcenter"
								backdrop="static"
								size="lg"
								centered>
								<Modal.Header closeButton>
									<h4 className="titulo">
										<FaCalendarWeek /> Visualizar anexo - {this.state.titulo}
										{this.state.nome_membro}
									</h4>
								</Modal.Header>
								<Modal.Body>
									<iframe src={this.state.link} style={{ width: "100%", height: "350px", marginBottom: "50px" }} frameborder="0"></iframe>
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
}`;



