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
} from './apiServices';

class Index extends Component {
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

            array_orientandos: [],
            array_tiposBanca: [],
            array_bancasQ: [],
            array_bancasD: [],
            array_cursos: [],
            array_status: [],
            arrayLinhasDePesquisas: [],
            arrayAreaConcentracao: [],
            arrayOrientacao: [],
            arrayMembrosDaDeclaracaoDeParticipacao: [],
            array_declaracoes: [],
            arrayAnexosDaOrientacao: [],
            arrayAnexosDoOrientando: [],
            arrayMembrosInternos: [],
            arrayMembrosExternos: [],
            arraySelectedMembrosInternos: [],
            arraySelectedMembrosExternos: [],
            arraySelectedMembrosDaBanca: [],

            id_usuario: 0,
            id_orientador: '',
            id_banca: 0,
            id_tipoBanca: '',
            id_orientando: 0,
            id_curso: '',
            idLinhaPesquisa: '',
            idAreaConcentracao: '',
            id_membroInterno: '',
            id_membroExterno: '',
            id_statusAta: '',
            id_ata: '',
            id_fichaAvaliacao: '',
            id_orientacao: 0,
            id_membroDeclaracao: 0,
            idFolhaDeAprovacao: 0,
            idDeclaracaoDeOrientacao: 0,

            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            informacoes_adicionais: '',
            fase_processo: '',
            dataHoraInicialFaseProcesso: '',
            dataHoraFinalFaseProcesso: '',
            dataHoraConclusao: '',
            data_horaPrevista: '',
            data_horaPrevistaAta: '',
            dataFichaAvaliacaoPtBr: '',
            dataAprovacao: '',
            dataDeOrientacao: '',
            titulo: '',
            title: '',
            resumo: '',
            palavra_chave: '',
            status_ata: '',
            titulo_teseOuDissertacao: '',
            quant_pag: 0,
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
            link: '',
            observacao: '',
            nomeArquivo: '',
            anexo: '',
            membro: '',
            titulo_banca: '',
            codigo_validacao: 0,
            dataHoraCriacao: '',
            orientando: '',
            curso: '',
            dataDeclaracaoEnUs: '',
            dataDeclaracaoPtBr: '',
            data_horaPrevistaEnUs: '',
            data_horaPrevistaPtBr: '',
            sexo: '',
            tipo_banca: '',
            presidente: '',
            membro_externo: '',
            membro_interno: '',
            dataFormatAmericano: '',
            dtCadAta: '',
            assinatura_membroInterno: '',
            assinatura_presidente: '',
            assinatura_membroExterno: '',
            dtFolhaAprovacaoFormatada: '',
            link_ata: '',
            areaConcentracao: '',
            linha_pesquisa: '',
            orientador: '',
            documentoEmIngles: false,
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

    loadOrientandos = async (nome = '', idLinhaPesquisa = 0, idFaseProcesso = 0) => {
        try {
            const orientandosData = await listaDeOrientandos(getToken(), this.context.user.id, nome, idLinhaPesquisa, idFaseProcesso);
            this.setState({ array_orientandos: orientandosData });
        } catch (error) {
            console.error('Erro ao carregar orientandos: ', error);
            this.setState({ error: 'Falha ao carregar orientandos' });
        }
    };

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

    loadTiposDeBanca = async () => {
        try {
            const tiposBancaData = await listaDeTiposDeBanca(getToken());
            this.setState({ array_tiposBanca: tiposBancaData });
        } catch (error) {
            console.error('Erro ao carregar tipos de banca: ', error);
            this.setState({ error: 'Falha ao carregar tipos de banca' });
        }
    };

    render() {
        const {
            array_orientandos,
            array_tiposBanca,
            error,
        } = this.state;

        if (error) {
            return <div>Erro: {error}</div>;
        }

        if (!array_orientandos.length || !array_tiposBanca.length) {
            return <div>Carregando...</div>;
        }

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
                        <AdminNavbar id_usuario={this.state.id_usuario} listaDeChamados={this.listaDeChamados} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} id="main">
                        <MainContent>
                            <MenuFlutuante handlerShowModalCadastrarBanca={this.handlerShowModalCadastrarBanca} />
                            <StatisticsTabsPanel
                                array_orientandos={this.state.array_orientandos}
                                array_bancasQ={this.state.array_bancasQ}
                                array_bancasD={this.state.array_bancasD}
                                array_tiposBanca={this.state.array_tiposBanca}
                            />
                        </MainContent>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Index;
