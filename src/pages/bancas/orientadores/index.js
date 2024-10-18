import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AdminNavbar from '../../../components/Navbar';
import MainContent from '../../../components/MainContent';
import { getToken } from '../../../services/auth';
import { listaDeLinhasDePesquisas } from '../../../services/getListaDeLinhasDePesquisas';
import Menu from '../../../components/Menu';
import backgroundImage from '../../../assets/sistema_chamados.png';
import UserContext from '../../../UserContext';
import { MenuFlutuante } from './MenuFlutuante';
import StatisticsTabsPanel from './StatisticsTabPanel';
import {
	listaDeOrientandos,
	listaDeTiposDeBanca,
	listaDeBancas,
	buscaInformacoesDoOrientador,
	atualizarBanca,
	listaDeMembrosExternos,
	listaDeMembrosInternos, // Adicionado aqui
} from './apiServices';
import ModalAtualizarBanca from './ModalAtualizarBanca';
import api from '../../../services/api';
import { listaDeAreasConcentracao } from '../../../services/getListaDeAreasConcentracao';
import { listaDeOrientadores } from '../../../services/getListaDeOrientadores';

class Index extends Component {
	static contextType = UserContext;

	constructor(props) {
		super(props);

		this.state = {
			modalShowAtualizarBanca: false,
			bancaSelecionada: null,
			array_orientandos: [],
			array_tiposBanca: [],
			array_bancasQ: [],
			array_bancasD: [],
			idAreaConcentracao: 0,
			arraySelectedMembrosInternos: [],
			arraySelectedMembrosExternos: [],
			arrayLinhasDePesquisas: [],
			arrayAreaConcentracao: [],
			arrayMembrosInternos: [], // Adicionado aqui
			arrayMembrosExternos: [], // Adicionado aqui
			success: '',
			error: '',
		};
	}

	componentDidMount() {
		Promise.all([
			this.loadInformacoesDoOrientador(),
			this.loadOrientandos(),
			this.loadBancas(1),
			this.loadBancas(2),
			this.loadTiposDeBanca(),
		]).catch((error) => {
			console.error('Erro ao carregar dados iniciais: ', error);
			this.setState({ error: 'Falha ao carregar dados iniciais' });
		});
	}

	// Função para carregar membros internos (orientadores)
	loadMembrosInternos = async () => {
		try {
			const membrosInternos = await listaDeMembrosInternos(getToken());
			const filteredMembrosInternos = membrosInternos.filter(
				(item) => item.id_usuario !== this.context.user.id
			);
			const arrayMembrosInternos = filteredMembrosInternos.map((item) => ({
				value: item.id_usuario,
				label: item.nome,
			}));
			this.setState({ arrayMembrosInternos });
		} catch (error) {
			console.error('Erro ao carregar membros internos: ', error);
			this.setState({ error: 'Falha ao carregar membros internos' });
		}
	};

	// Função para carregar membros externos
	loadMembrosExternos = async () => {
		try {
			const membrosExternos = await listaDeMembrosExternos(getToken());
			const arrayMembrosExternos = membrosExternos.map((item) => ({
				value: item.id_usuario,
				label: item.nome,
			}));
			this.setState({ arrayMembrosExternos });
		} catch (error) {
			console.error('Erro ao carregar membros externos: ', error);
			this.setState({ error: 'Falha ao carregar membros externos' });
		}
	};

	handlerMostrarModalAtualizarBanca = (banca) => {
		// Define o estado para abrir o modal e definir a banca selecionada
		this.setState({
			modalShowAtualizarBanca: true,  // Abre o modal
			bancaSelecionada: banca,        // Define a banca selecionada
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
		this.listaDeMembrosDaBanca(banca.id);

		// Carregar áreas de concentração e linhas de pesquisa
		listaDeAreasConcentracao().then(result => this.setState({ arrayAreaConcentracao: result }));
		listaDeLinhasDePesquisas(this.state.idAreaConcentracao).then(result => this.setState({ arrayLinhasDePesquisas: result }));

		// Carregar membros internos
		listaDeOrientadores(0).then(result => {
			let arrayMembrosInternos = [];
			if (result.length > 0) {
				result.forEach(item => {
					if (item.id_usuario !== this.context.user.id) {
						arrayMembrosInternos.push({ value: item.id_usuario, label: item.nome });
					}
				});
				this.setState({ arrayMembrosInternos });
			}
		});

		// Carregar membros externos
		listaDeMembrosExternos().then(result => {
			let arrayMembrosExternos = [];
			if (result.length > 0) {
				result.forEach(item => {
					arrayMembrosExternos.push({ value: item.id_usuario, label: item.nome });
				});
				this.setState({ arrayMembrosExternos });
			}
		});
	};

	// Função para fechar o modal de atualizar banca
	handlerFecharModalAtualizarBanca = () => {
		this.setState({
			modalShowAtualizarBanca: false,
			bancaSelecionada: null,
		});
	};

	// Função para carregar os dados do orientador
	loadInformacoesDoOrientador = async () => {
		try {
			const orientadorData = await buscaInformacoesDoOrientador(getToken());
			if (orientadorData && orientadorData.length > 0) {
				const idAreaConcentracao = orientadorData[0].id_areaConcentracao;
				this.setState({ idAreaConcentracao });
				const linhasDePesquisasData = await listaDeLinhasDePesquisas(idAreaConcentracao);
				this.setState({ arrayLinhasDePesquisas: linhasDePesquisasData });
			}
		} catch (error) {
			console.error('Erro ao carregar informações do orientador: ', error);
			this.setState({ error: 'Falha ao carregar informações do orientador' });
		}
	};

	// Função para carregar orientandos
	loadOrientandos = async (nome = '', idLinhaPesquisa = 0, idFaseProcesso = 0) => {
		try {
			const orientandosData = await listaDeOrientandos(getToken(), this.context.user.id, nome, idLinhaPesquisa, idFaseProcesso);
			this.setState({ array_orientandos: orientandosData });
		} catch (error) {
			console.error('Erro ao carregar orientandos: ', error);
			this.setState({ error: 'Falha ao carregar orientandos' });
		}
	};

	// Função para carregar bancas
	loadBancas = async (id_tipoBanca) => {
		try {
			const bancasData = await listaDeBancas(getToken(), this.context.user.id, id_tipoBanca);
			if (id_tipoBanca === 1) {
				this.setState({ array_bancasQ: bancasData });
			} else if (id_tipoBanca === 2) {
				this.setState({ array_bancasD: bancasData });
			}
		} catch (error) {
			console.error('Erro ao carregar bancas: ', error);
			this.setState({ error: 'Falha ao carregar bancas' });
		}
	};

	// Função para carregar tipos de banca
	loadTiposDeBanca = async () => {
		try {
			const tiposBancaData = await listaDeTiposDeBanca(getToken());
			this.setState({ array_tiposBanca: tiposBancaData });
		} catch (error) {
			console.error('Erro ao carregar tipos de banca: ', error);
			this.setState({ error: 'Falha ao carregar tipos de banca' });
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
				const { arraySelectedMembrosInternos, arraySelectedMembrosExternos } = this.state;
				data.resultados.forEach(membro => {
					if (membro.id_tipo === 2) {
						arraySelectedMembrosInternos.push({ value: membro.id, label: membro.nome });
					} else if (membro.id_tipo === 3) {
						arraySelectedMembrosExternos.push({ value: membro.id, label: membro.nome });
					}
				});

				this.setState({
					arraySelectedMembrosInternos,
					arraySelectedMembrosExternos
				});
			}
		} catch (error) {
			console.error('Erro ao carregar membros da banca:', error);
		}
	};


	render() {
		const {
			array_orientandos,
			array_tiposBanca,
			array_bancasQ,
			array_bancasD,
			modalShowAtualizarBanca,
			bancaSelecionada,
			idAreaConcentracao,
			arrayLinhasDePesquisas,
			arrayMembrosInternos,
			arrayMembrosExternos,
			success,
			error,
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
						<AdminNavbar id_usuario={this.state.id_usuario} />
					</Col>
				</Row>
				<Row>
					<Col xs={12} id="main">
						<MainContent>
							<MenuFlutuante />
							<StatisticsTabsPanel
								array_orientandos={array_orientandos}
								array_bancasQ={array_bancasQ}
								array_bancasD={array_bancasD}
								array_tiposBanca={array_tiposBanca}
								handlerShowModalAtualizarBanca={this.handlerMostrarModalAtualizarBanca}
							/>

							{modalShowAtualizarBanca && (
								<ModalAtualizarBanca
									show={modalShowAtualizarBanca}
									onHide={this.handlerFecharModalAtualizarBanca}
									array_orientandos={array_orientandos}
									array_tiposBanca={array_tiposBanca}
									arrayAreaConcentracao={this.state.arrayAreaConcentracao}
									arrayLinhasDePesquisas={arrayLinhasDePesquisas}
									arrayMembrosInternos={arrayMembrosInternos}
									arrayMembrosExternos={arrayMembrosExternos}
									bancaSelecionada={bancaSelecionada}
									success={success}
									error={error}
								/>
							)}
						</MainContent>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Index;
