import { FaCalendarWeek, FaCloudUploadAlt, FaDochub, FaCloudDownloadAlt } from 'react-icons/fa';
import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import api from '../../services/api';
import { logout } from '../../services/auth';
import Modal from 'react-bootstrap/Modal';
import Logo from '../../assets/enber.png';
import Backgroud_enber from '../../assets/background_enber.jpg';
import { listaDeOrientadores } from '../../services/getListaDeOrientadores';
import { listaTipoDeDocumentos } from '../../services/getListaTipoDeDocumentos';
import { listaDeLinhasDePesquisas } from '../../services/getListaDeLinhasDePesquisas';
import { listaDeAreasConcentracao } from '../bancas/apiServices';

export default class Index extends Component {
	constructor(props) {
		super();

		this.state = {
			modalShowCadastrarTeseOuDissertacao: false,
			keyTab: 'Checklist',
			success: '',
			error: '',
			successUpload: '',
			errorUpload: '',

			//Dados da tese ou dissertação
			autor: '',
			titulo: '',
			tituloEmOutroIdioma: '',
			idOrientador: '',
			idTipoDocumento: '',
			dataDefesa: '',
			resumo: '',
			idioma: '',
			idLinhaPesquisa: '',
			arquivo: null,
			descricaoDoArquivo: '',
			url: '',
			disabled: false,
			idAreaConcentracao: '',
			spinner: false,

			arrayTipoDeDocumentos: [],
			arrayOrientadores: [],
			arrayTesesEDissertacoes: [],
			arrayLinhasDePesquisas: [],
			arrayAreaConcentracao: []
		};
	}

	componentDidMount() {
		this.listaDeTesesEDissertacoes();
	}

	setModalShowCadastrarTeseOuDissertacao(valor) {
		this.setState({ modalShowCadastrarTeseOuDissertacao: valor, success: '', error: '', successUpload: '', errorUpload: '', disabled: false });
	}

	handlerShowModalCadastrarTeseOuDissertacao() {
		this.setModalShowCadastrarTeseOuDissertacao(true);
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
		listaDeOrientadores().then(result => this.setState({ arrayOrientadores: result }));
		listaTipoDeDocumentos().then(result => this.setState({ arrayTipoDeDocumentos: result }));
	}

	handlerCloseModalCadastrarTeseOuDissertacao() {
		this.setModalShowCadastrarTeseOuDissertacao(false);
	};

	importarArquivo = async (e) => {
		e.preventDefault();

		this.setState({ success: '', error: '', spinner: true });
		const arquivo = this.state.arquivo;
		const autor = this.state.autor;
		const titulo = this.state.titulo;
		const tituloEmOutroIdioma = this.state.tituloEmOutroIdioma;
		const idOrientador = this.state.idOrientador;
		const idTipoDocumento = this.state.idTipoDocumento;
		const dataDefesa = this.state.dataDefesa;
		const resumo = this.state.resumo;
		const idioma = this.state.idioma;
		const idAreaConcentracao = this.state.idAreaConcentracao;
		const idLinhaPesquisa = this.state.idLinhaPesquisa;
		const descricaoDoArquivo = this.state.descricaoDoArquivo;

		if (arquivo === null) {
			this.setState({ errorUpload: "O arquivo não foi anexado!", spinner: false });
			return;
		}

		if (arquivo.type !== "application/pdf") {
			this.setState({ errorUpload: "O formato do arquivo anexado é inválido!", spinner: false });
			return;
		}

		if (!titulo || !tituloEmOutroIdioma || !idOrientador || !idTipoDocumento || !dataDefesa ||
			!resumo || !idioma || !idAreaConcentracao || !idLinhaPesquisa || !descricaoDoArquivo) {
			this.setState({ error: 'Por favor, preencher todos os campos.', spinner: false });
		} else {
			let formData = new FormData();
			formData.append('file', arquivo);
			formData.append('autor', autor);
			formData.append('titulo', titulo);
			formData.append('tituloEmOutroIdioma', tituloEmOutroIdioma);
			formData.append('idOrientador', idOrientador);
			formData.append('idTipoDocumento', idTipoDocumento);
			formData.append('dataDefesa', dataDefesa);
			formData.append('resumo', resumo);
			formData.append('idioma', idioma);
			formData.append('idAreaConcentracao', idAreaConcentracao);
			formData.append('idLinhaPesquisa', idLinhaPesquisa);
			formData.append('descricaoDoArquivo', descricaoDoArquivo);

			try {
				const response = await fetch(`${api.baseURL}/documentos`, {
					method: 'POST',
					body: formData,
				});

				const data = await response.json();

				if (data.status === 200) {
					this.setState({ success: data.msg });
					this.listaDeTesesEDissertacoes();
				}

				if (data.status === 400) {
					this.setState({ error: data.msg });
				}

				this.setState({ spinner: false });
			} catch (error) {
				this.setState({ error: 'Ocorreu um erro' });
			}
		}
	}

	listaDeTesesEDissertacoes = async () => {
		try {
			const response = await fetch(`${api.baseURL}/documentos`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
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

	render() {
		const tesesEDissertacoes = this.state.arrayTesesEDissertacoes;
		const areas_concentracao = this.state.arrayAreaConcentracao;
		const linhasDePesquisas = this.state.arrayLinhasDePesquisas;
		return (
			<Container>
				<div className="content-wrapper">
					{/* Content Header (Page header) */}
					<div className="content-header">

					</div>
					{/* /.content-header */}
					{/* Main content */}
					<div className="content mt-2">

						<img src={Logo} className="mb-3" style={{ display: 'block', margin: '0px auto' }} />
						<h1 style={{ color: '#ffffff', textAlign: 'center', fontSize: '20pt', marginBottom: '20px' }}>Enber University - Repositório Institucional</h1>

						<p style={{ color: '#ffffff', textAlign: 'center' }}>Para enviar o seu arquivo de tese ou dissertação, clique no botão abaixo</p>
						<div className="row text-center">
							<div className="col-sm-12">
								<button className='btn btn-sm btn-outline-light' onClick={() => this.handlerShowModalCadastrarTeseOuDissertacao()}><FaCloudUploadAlt /> Enviar Tese ou Dissertação</button>
							</div>
						</div>

						<div className='container mt-4'>
							<div className="jumbotron bg-light">
								<div className='row'>
									<div className='col-sm-12'>
										<h3><FaDochub /> Arquivos publicados</h3>
									</div>
								</div>

								<p className="lead text-justify">O repositório institucional, tem o intuito de oferecer um acervo completo de documentos com informações relevantes sobre as áreas de educação e teologia.</p>
								<hr className="my-4" />

								<div className='row'>
									{tesesEDissertacoes.length > 0 ? (
										tesesEDissertacoes.map(documento => (
											<div className='col-sm-3 mb-3'>
												<div className="card h-100" key={documento.id} title="Clique aqui para obter mais informações sobre o documento">
													<div className="card-header bg-header">
														<FaDochub /> Titulo: {documento.titulo}
													</div>
													<div class="card-body">
														<p className='card-text'><span className='font-weight-bold'>Linha de pesquisa:</span> {documento.linha_pesquisa}</p>
														<p className='card-text'><span className='font-weight-bold'>Tipo:</span> {documento.tipo_documento}</p>
														<p className='card-text'><span className='font-weight-bold'>Autor:</span> {documento.autor}</p>
														<a href={`${documento.url}`} class="link-primary"><FaCloudDownloadAlt/> Download</a>
													</div>
												</div>
											</div>
										))
									) : (

										<div className="card">
											<div className="card-body">
												<h5 className="card-title">Nenhum registro encontrado</h5>
											</div>
										</div>
									)}

								</div>
							</div>
						</div>

						{/* /.container-fluid */}
					</div>
					{/* /.content */}
					<br />
				</div>

				<Modal
					show={this.state.modalShowCadastrarTeseOuDissertacao}
					onHide={() => this.handlerCloseModalCadastrarTeseOuDissertacao()}
					aria-labelledby="contained-modal-title-vcenter"
					backdrop="static"
					size='xl'
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							<FaCalendarWeek /> Informações do documento
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.importarArquivo}>
							<div className='container'>
								<div className="row d-flex justify-content-center text-center">
									<div className="col-lg-4 col-lg-offset-4">

										<p className='text-danger'>Atenção: O arquivo deve conter o nome do aluno, mês e ano. Exemplo: LucasAlvesDaSilva-11-2022</p>
										<label>Importar arquivo de tese ou dissertação:*</label>
										<div className="form-group">
											<input
												type="file"
												className="form-control form-control-sm"
												id="arquivoDissertacaoOuTese"
												placeholder="Arquivo de dissertação ou tese"
												accept="application/pdf"
												onChange={(e) =>
													this.setState({ arquivo: e.target.files[0], disabled: true })
												}
												disabled={this.state.disabled}
											/>
										</div>

										<hr />

										<div className="row">
											<div className="col-sm-12">
												{this.state.successUpload && (
													<div
														className="alert alert-success text-center"
														role="alert"
													>
														{this.state.successUpload}
													</div>
												)}
												{this.state.errorUpload && (
													<div
														className="alert alert-danger text-center"
														role="alert"
													>
														{this.state.errorUpload}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-md-6">

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
												disabled={this.state.disabled === true ? false : true}
											/>
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
												disabled={this.state.disabled === true ? false : true}
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
												disabled={this.state.disabled === true ? false : true}
											/>
										</div>


										<div className="form-group">
											<label htmlFor="nome">Orientador:*</label>
											<select class="form-control" id="selectOrientador"
												onChange={e => this.setState({ idOrientador: e.target.value })}
												disabled={this.state.disabled === true ? false : true}
											>
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
												min="2022-01" value={this.state.mesEAnoCiclo}
												onChange={e => this.setState({ dataDefesa: e.target.value })}
												disabled={this.state.disabled === true ? false : true}
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
												disabled={this.state.disabled === true ? false : true}
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
												disabled={this.state.disabled === true ? false : true}
											/>
										</div>

										<div class="form-group">
											<label>Tipo:*{this.state.idTipoDocumento}</label>
											<select class="form-control" id="selectTipoDocumento"
												onChange={e => this.setState({ idTipoDocumento: e.target.value })}
												disabled={this.state.disabled === true ? false : true}
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

										<div className="form-group">
											<label>Área de concentração:*</label>
											<select class="form-control" id="selectAreaConcentracao"
												onChange={e => 
													listaDeLinhasDePesquisas(e.target.value)
													.then(result => this.setState({ arrayLinhasDePesquisas: result }))
													.then(this.setState({idAreaConcentracao: e.target.value}))
												}
												disabled={this.state.disabled === true ? false : true}>
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
												onChange={e => this.setState({ idLinhaPesquisa: e.target.value })}
												disabled={this.state.disabled === true ? false : true}>
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
												disabled={this.state.disabled === true ? false : true}
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
										{this.state.spinner ? (<Spinner animation="border" role="status"></Spinner>) : (<button className='btn btn-sm btn-outline-primary'>Salvar</button>)}
									</div>
								</div>

							</div>
						</Form>
					</Modal.Body>
					<Modal.Footer>
					</Modal.Footer>
				</Modal>
			</Container >
		);
	}
}

export const Container = styled.div`
	width: 100%;
	height: 100vh;
	

	.titulo {
		color: #000233;
	}

	.content-wrapper {
		background: url("${Backgroud_enber}");
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.bg-header {
		background-color: #000233;
		color: #f1f1f1;
	}
`;

export const Form = styled.form`
	.titulo {
	color: #000233;
  }
`;
