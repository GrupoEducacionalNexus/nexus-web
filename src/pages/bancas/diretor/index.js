import { FaUserGraduate, FaLayerGroup, FaRegSave, FaPencilAlt, FaShieldAlt, FaWpforms, FaBookReader, FaBookMedical, FaRegEdit } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../../services/api';
import { getToken, logout } from '../../../services/auth';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Card } from 'react-bootstrap';
import Menu from '../../../components/Menu';

export default class Index extends Component {
	constructor(props) {
		super();

		this.state = {
			modalShowEditarOrientando: false,
			keyTab: 'Checklist',
			success: '',
			error: '',

			//Banca
			array_orientandosE: [],
			array_orientandosT: [],
			id_usuario: 0,
			array_tiposBanca: [],
			id_tipoBanca: '',
			tipo_banca: '',
			data_horaPrevista: '',
			confirmar: 0,
			data_HoraPrevistaDeDefesa: '',
			data_HoraPagTaxaDeApostilamento: '',
			array_bancasQE: [],
			array_bancasDE: [],
			array_bancasQT: [],
			array_bancasDT: [],
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
			arrayOrientacao: [],
		};
	}

	componentDidMount() {
		this.listaDeOrientandos(getToken(), 1);
		this.listaDeOrientandos(getToken(), 2);
		this.listaDeBancas(getToken(), 1, 1);
		this.listaDeBancas(getToken(), 2, 1);
		this.listaDeBancas(getToken(), 1, 2);
		this.listaDeBancas(getToken(), 2, 2);
	}

	setModalShowEditarOrientando(valor) {
		this.setState({ modalShowEditarOrientando: valor, success: '', error: '' });
	}

	handlerShowModalEditarOrientando(orientando) {
		console.log(orientando);
		this.setModalShowEditarOrientando(true);
		this.listaDeOrientacao(getToken(), orientando.id_usuario);

	}

	handlerCloseModalEditarOrientando() {
		this.setModalShowEditarOrientando(false);
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

	listaDeOrientandos = async (token, id_areaConcentracao) => {
		try {
			const response = await fetch(
				`${api.baseURL}/orientandos?id_areaConcentracao=${id_areaConcentracao}`,
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
				if (data.resultados.length > 0) {
					data.id_areaConcentracao === 1 ? this.setState({ array_orientandosE: data.resultados }) :
						this.setState({ array_orientandosT: data.resultados });
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


	render() {
		const array_orientandosE = this.state.array_orientandosE;
		const array_orientandosT = this.state.array_orientandosT;
		const tiposDeBanca = this.state.array_tiposBanca;
		const array_bancasQE = this.state.array_bancasQE;
		const array_bancasDE = this.state.array_bancasDE;
		const array_bancasQT = this.state.array_bancasQT;
		const array_bancasDT = this.state.array_bancasDT;
		const arrayOrientacao = this.state.arrayOrientacao;

		return (
			<Container>
				<Menu/>
				<div className="content-wrapper">
					{/* Content Header (Page header) */}
					<div className="content-header">
						
					</div>
					{/* /.content-header */}
					{/* Main content */}
					<div className="content">
						<Tabs
							variant="pills"
							defaultActiveKey="orientandos"
							transition={false}
							id="panel-admin"
							className="justify-content-center">

							<Tab
								eventKey="orientandos"
								title="Orientandos"
								style={{ marginTop: '20px' }}

							>
								<div className='container'>
									<div className='row'>
										<div className='col-sm-12'>
											<h1 style={{ color: '#000233', fontSize: '20pt' }}><FaUserGraduate /> Orientandos</h1>
										</div>
									</div>

									<hr />

									<Accordion>
										<Card>
											<Accordion.Toggle as={Card.Header} eventKey="0">
												<h3><FaUserGraduate /> Educação</h3>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<div className="table-responsive">
														<table className="table text-center table-bordered table-striped table-hover bg-white">
															<thead className="thead-light">
																<tr>
																	<th scope="col">Orientando</th>
																	<th>Orientador</th>
																	<th>Curso</th>
																	<th>Fase do processo</th>
																	<th>Data/hora inicial do processo</th>
																	<th>Data/hora final do processo</th>
																	<th>Data/hora de conclusão</th>
																	<th>Ações</th>
																</tr>
															</thead>
															<tbody>
																{array_orientandosE.length > 0 ? (
																	array_orientandosE.map(orientando => (
																		<tr key={orientando.id} title="Clique aqui para obter mais informações sobre o orientando">
																			<td>{orientando.nome}</td>
																			<td>{orientando.orientador}</td>
																			<td>{orientando.curso}</td>
																			<td>{orientando.fase_processo}</td>
																			<td>{orientando.dataHoraInicialFaseProcessoTb}</td>
																			<td>{orientando.dataHoraFinalFaseProcessoTb}</td>
																			<td>{orientando.dataHoraConclusaoTb}</td>
																			<td><button className='button' onClick={() => this.handlerShowModalEditarOrientando(orientando)}>Orientações</button></td>
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
														<div className="text-center text-white font-weight-bold mt-3 mb-5">
															Total de Registros: {array_orientandosE.length}
														</div>
													}
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									</Accordion>

									<Accordion>
										<Card>
											<Accordion.Toggle as={Card.Header} eventKey="0">
												<h3><FaUserGraduate /> Teologia</h3>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<div className="table-responsive">
														<table className="table text-center table-bordered table-striped table-hover bg-white">
															<thead className="thead-light">
																<tr>
																	<th scope="col">Orientando</th>
																	<th>Orientador</th>
																	<th>Curso</th>
																	<th>Fase do processo</th>
																	<th>Data/hora inicial do processo</th>
																	<th>Data/hora final do processo</th>
																	<th>Data/hora de conclusão</th>
																	<th>Ações</th>
																</tr>
															</thead>
															<tbody>
																{array_orientandosT.length > 0 ? (
																	array_orientandosT.map(orientando => (
																		<tr key={orientando.id} title="Clique aqui para obter mais informações sobre o orientando">
																			<td>{orientando.nome}</td>
																			<td>{orientando.orientador}</td>
																			<td>{orientando.curso}</td>
																			<td>{orientando.fase_processo}</td>
																			<td>{orientando.dataHoraInicialFaseProcessoTb}</td>
																			<td>{orientando.dataHoraFinalFaseProcessoTb}</td>
																			<td>{orientando.dataHoraConclusaoTb}</td>
																			<td><button className='button' onClick={() => this.handlerShowModalEditarOrientando(orientando)}>Orientações</button></td>
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
														<div className="text-center text-white font-weight-bold mt-3 mb-5">
															Total de Registros: {array_bancasDT.length}
														</div>
													}
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									</Accordion>

								</div>
							</Tab>

							<Tab
								eventKey="bancas"
								title="Bancas"
								style={{ marginTop: '30px' }}>

								<div className='container'>
									<div className='row'>
										<div className='col-sm-6'>
											<h1 style={{ color: '#000233', fontSize: '20pt' }}><FaLayerGroup /> Bancas</h1>
										</div>
									</div>
									<hr />
									<h4 className='text-center'><FaBookReader /> Educação</h4>
									<Accordion>
										<Card>
											<Accordion.Toggle as={Card.Header} eventKey="0">
												<h3><FaUserGraduate /> Qualificação </h3>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<div className="table-responsive">
														<table className="table text-center table-bordered table-hover table-scroll">
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
																	{/* <th>Taxa de qualificação</th>
																	<th>Confirmação de pagamento</th>
																	<th>Observação</th> */}
																	{/* <th>Status</th> */}
																	<th>Ações</th>
																</tr>
															</thead>
															<tbody>
																{array_bancasQE.length > 0 ?
																	array_bancasQE.map(banca => (
																		<tr key={banca.id} className={banca.status === 1 ? "table-warning" : banca.status === 2 ? "table-success" : ""} title="Clique aqui para obter mais informações sobre a banca">
																			<td>{banca.orientador}</td>
																			<td>{banca.orientando}</td>
																			<td>{banca.curso}</td>
																			<td>{banca.fase_processo}</td>
																			<td>{banca.dataHoraInicialFaseProcessoTb}</td>
																			<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																			<td>{banca.dataHoraConclusaoTb}</td>
																			<td>{banca.data_horaPrevista}</td>
																			{/* <td>{banca.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
																			<td>{banca.data_pagamento}</td>
																			<td>{banca.observacao}</td> */}
																			{/* <td>{banca.status === 1 ? `Aguardando` : banca.status === 2 ? `Confirmado` : ``}</td> */}
																			<td><button className='button' onClick={() => this.handlerShowModalEditarBanca(banca)}><FaWpforms /> Detalhes</button></td>
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
												<h3><FaUserGraduate /> Defesa</h3>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="1">
												<Card.Body>
													<div className="table-responsive ">
														<table className="table table-sm text-center table-bordered table-hover table-scroll">
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
																	{/* <th>Taxa de apostilamento</th>
																	<th>Data e hora de confirmação de pagamento</th>
																	<th>Observação</th>
																	<th>Status</th> */}
																	<th>Ações</th>
																</tr>
															</thead>
															<tbody>
																{array_bancasDE.length > 0 ?
																	array_bancasDE.map(banca => (
																		<tr key={banca.id} className={banca.status === 1 ? "table-warning" : banca.status === 2 ? "table-success" : ""} title="Clique aqui para obter mais informações sobre a banca">
																			<td>{banca.orientador}</td>
																			<td>{banca.orientando}</td>
																			<td>{banca.curso}</td>
																			<td>{banca.fase_processo}</td>
																			<td>{banca.dataHoraInicialFaseProcessoTb}</td>
																			<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																			<td>{banca.dataHoraConclusaoTb}</td>
																			<td>{banca.data_horaPrevista}</td>
																			{/* <td>{banca.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
																			<td>{banca.data_pagamento}</td>
																			<td>{banca.observacao}</td>
																			<td>{banca.status === 1 ? `Aguardando` : banca.status === 2 ? `Confirmado` : ``}</td> */}
																			<td><button className='button' onClick={() => this.handlerShowModalEditarBanca(banca)}><FaWpforms /> Detalhes</button></td>
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
													{
														<div className="text-center font-weight-bold mt-3 mb-5">
															Total de Registros: {array_bancasDE.length}
														</div>
													}
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									</Accordion>

									<hr />

									<h4 className='text-center'><FaBookMedical /> Teologia</h4>
									<Accordion>
										<Card>
											<Accordion.Toggle as={Card.Header} eventKey="0">
												<h3><FaUserGraduate /> Qualificação </h3>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<div className="table-responsive">
														<table className="table text-center table-bordered table-hover table-scroll">
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
																	{/* <th>Taxa de qualificação</th>
																	<th>Confirmação de pagamento</th>
																	<th>Observação</th>
																	<th>Status</th> */}
																	<th>Ações</th>
																</tr>
															</thead>
															<tbody>
																{array_bancasQT.length > 0 ?
																	array_bancasQT.map(banca => (
																		<tr key={banca.id} className={banca.status === 1 ? "table-warning" : banca.status === 2 ? "table-success" : ""} title="Clique aqui para obter mais informações sobre a banca">
																			<td>{banca.orientador}</td>
																			<td>{banca.orientando}</td>
																			<td>{banca.curso}</td>
																			<td>{banca.fase_processo}</td>
																			<td>{banca.dataHoraInicialFaseProcessoTb}</td>
																			<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																			<td>{banca.dataHoraConclusaoTb}</td>
																			<td>{banca.data_horaPrevista}</td>
																			{/* <td>{banca.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
																			<td>{banca.data_pagamento}</td>
																			<td>{banca.observacao}</td>
																			<td>{banca.status === 1 ? `Aguardando` : banca.status === 2 ? `Confirmado` : ``}</td> */}
																			<td><button className='button' onClick={() => this.handlerShowModalEditarBanca(banca)}><FaWpforms /> Detalhes</button></td>
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
														<table className="table table-sm text-center table-bordered table-hover table-scroll">
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
																	{/* <th>Taxa de apostilamento</th>
																	<th>Data e hora de confirmação de pagamento</th>
																	<th>Observação</th>
																	<th>Status</th> */}
																	<th>Ações</th>
																</tr>
															</thead>
															<tbody>
																{array_bancasDT.length > 0 ?
																	array_bancasDT.map(banca => (
																		<tr key={banca.id} className={banca.status === 1 ? "table-warning" : banca.status === 2 ? "table-success" : ""} title="Clique aqui para obter mais informações sobre a banca">
																			<td>{banca.orientador}</td>
																			<td>{banca.orientando}</td>
																			<td>{banca.curso}</td>
																			<td>{banca.fase_processo}</td>
																			<td>{banca.dataHoraInicialFaseProcessoTb}</td>
																			<td>{banca.dataHoraFinalFaseProcessoTb}</td>
																			<td>{banca.dataHoraConclusaoTb}</td>
																			<td>{banca.data_horaPrevista}</td>
																			{/* <td>{banca.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
																			<td>{banca.data_pagamento}</td>
																			<td>{banca.observacao}</td>
																			<td>{banca.status === 1 ? `Aguardando` : banca.status === 2 ? `Confirmado` : ``}</td> */}
																			<td><button className='button' onClick={() => this.handlerShowModalEditarBanca(banca)}><FaWpforms /> Detalhes</button></td>
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
							</Tab>
						</Tabs>

					</div >
					{/* /.content */}
					< br />
				</div >

				<Modal
					show={this.state.modalShowEditarOrientando}
					onHide={() => this.handlerCloseModalEditarOrientando()}
					aria-labelledby="contained-modal-title-vcenter"
					backdrop="static"
					size='lg'
					centered
				>
					<Modal.Header closeButton>
						<h4 className='titulo'><FaUserGraduate /> Orientações</h4>
					</Modal.Header>
					<Modal.Body>
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
			</Container >
		);
	}
}

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  .titulo {
	color: #f1f1f1;
  }

  .nav-pills {
	margin-top: 80px;
  }

  @media only screen and (min-width: 320px) and (max-width: 725px) {
			
	text-align: center;

	.button {
		display: block;
		width: 100%;
	}

	.titulo {
		text-align: center;
		color: #000233;
	}

	#logo {
		margin-top: 20px;
		width: 50px;
	}
}
`;

export const Form = styled.form`
	.titulo {
	color: #000233;
  }
`;



