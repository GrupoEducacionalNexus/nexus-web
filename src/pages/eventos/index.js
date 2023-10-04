import { FaRegSave, FaCalendarWeek, FaBoxes, FaPlus } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { getToken } from '../../services/auth';
import Modal from 'react-bootstrap/Modal';
import { Certificado } from '../../components/Certificado';
import moment from 'moment/moment';
import { uploadFile } from '../../services/uploadFile';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Menu from '../../components/Menu';
import Perfil from '../../components/Perfil';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import FloatingMenu from '../../components/FloatingMenu';
import backgroundImage from '../../assets/sistema_chamados.png';

export default class Index extends Component {
	constructor(props) {
		super();

		this.state = {
			modalShowCadastrarAnexo: false,
			modalShowEditarEvento: false,
			modalShowEditarCertificado: false,
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
			id_grupoTrabalho: 0
		};
	}

	componentDidMount() {
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
		this.setState({ id_evento: evento.id, temaEvento: evento.tema, id_usuario: evento.id_usuario, id_grupoTrabalho: evento.id_grupoTrabalho });
		this.listaDeAnexos(evento.id_usuario, evento.id_grupoTrabalho);
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
			const { arquivo, nomeArquivo, id_evento, coautor, id_grupoTrabalho } = this.state;


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
					nome: nomeArquivo, link: JSON.parse(localStorage.getItem('@link')), id_evento, coautor, id_grupoTrabalho
				})
			});

			const data = await response.json();
			console.log(data);

			if (data.status === 200) {
				this.setState({ success: data.msg });
				this.listaDeAnexos(this.state.id_usuario, this.state.id_grupoTrabalho);
			}

			if (data.status === 400) {
				this.setState({ error: data.msg });

			}
		} catch (error) {
			console.log(error);
		}
	}

	listaDeAnexos = async (id_usuario, id_grupoTrabalho) => {
		try {
			const response = await fetch(`${api.baseURL}/membros/${id_usuario}/anexos?id_grupoTrabalho=${id_grupoTrabalho}`,
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
		const data_horaAtual = this.state.data_horaAtual;

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
							<div className='container'>
								<h4 className='text-light mb-5'><FaBoxes /> Meus eventos</h4>
								<div className='row'>
									{eventos.length > 0 ? (
										eventos.map(evento => (
											<div className='col-sm-4'>
												<Card style={{ minHeight: "350px", backgroundColor: "rgba(255, 255, 255, 0.3)", color: "#ffffff" }} className='zoom'>
													<Card.Body>
														<Card.Title style={{ fontWeight: "bold", marginBottom: '10px' }}>{evento.tema.toUpperCase()}</Card.Title>
														<Card.Text style={{ fontSize: "15px" }}>
															Grupo de trabalho: {evento.grupo_trabalho !== undefined ? (evento.grupo_trabalho.toUpperCase()) : (<span>Você não está participando de nenhum grupo de trabalho!</span>)}
														</Card.Text>
														<Card.Text>Data de inicio: {evento.dataEventoInicial}</Card.Text>
														<Card.Text>Data de término: {evento.dataEventoFinal}</Card.Text>
														<div className='container text-center'>
															<button className='button mb-2' onClick={() => this.handlerShowModalEditarCertificado(evento)}>Visualizar certificado</button>
															<button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(evento)}>Anexar o trabalho completo</button>
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
								size='lg'>

								<Modal.Header closeButton>
									<h4 className='titulo'><FaCalendarWeek /> Anexos do evento - {this.state.temaEvento.toUpperCase()}</h4>
								</Modal.Header>
								<Modal.Body >
									<div className='container'>
										{/* <UploadImageToS3WithNativeSdk path="enber/eventos/anexos/" /> */}
										<Form onSubmit={this.cadastrarAnexo}>
											{moment(`${data_horaAtual.getFullYear()}-${parseInt(data_horaAtual.getMonth()) < 9 ? "0" + (parseInt(data_horaAtual.getMonth() + 1)) : parseInt(data_horaAtual.getMonth() + 1)}-${data_horaAtual.getDate()}`)
												< moment("2023-05-31") ||
												moment(`${data_horaAtual.getFullYear()}-${parseInt(data_horaAtual.getMonth()) < 9 ? "0" + (parseInt(data_horaAtual.getMonth() + 1)) : parseInt(data_horaAtual.getMonth() + 1)}-${data_horaAtual.getDate()}`)
													.isBetween('2023-05-12', '2023-07-31')
												? (
													<div className='container'>
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

														<p id='progresso' className='progresso text-center'></p>

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

														<div className='row'>
															<div className='col-sm-12 text-right'>
																<button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
															</div>
														</div>
													</div>
												) : (
													<p className='font-weight-bold text-danger text-center'>Você não pode enviar nenhum arquivo</p>
												)

											}
										</Form>
									</div>
									<hr />
									<h4>Anexos</h4>
									<hr />
									<div className="table-responsive table-sm text-center">
										<table className="table table-bordered table-hover">
											<thead>
												<tr>
													<th scope="col">Titulo do documento</th>
													<th>link</th>
													<th>Coautor</th>
												</tr>
											</thead>
											<tbody>
												{anexos.length > 0 ? (
													anexos.map(anexo => (
														<tr key={anexo.id} title="Clique aqui para obter mais informações sobre o anexo">
															<td>{anexo.nome}</td>
															<td><a href={anexo.link}>Arquivo</a></td>
															<td>{anexo.coautor}</td>
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
										<div className="text-center font-weight-bold mt-3 mb-5">
											Total de Registros: {anexos.length}
										</div>
									}
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



