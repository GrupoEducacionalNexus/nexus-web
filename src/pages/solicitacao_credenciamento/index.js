// src/pages/solicitacao_credenciamento/index.js
import React, { Component } from 'react';
import { Container, Form as StyledForm } from './styles';
import LogoAdmin from '../../assets/logo_nexus.png';
import api from '../../services/api';
import { handleTelefone } from '../../services/mascaraTelefone';
import { FaListAlt } from 'react-icons/fa';
import { handleCpf } from '../../services/mascaraCpf';
import EstadosCidadesJson from '../../services/estados-cidades.json';
import DadosGestor from './DadosGestor';
import DadosInstituicao from './DadosInstituicao';
import MensagemFeedback from './MensagemFeedback';
import Spinner from '../../components/Spinner/Spinner'; // Importando o spinner personalizado

export default class SolicitacaoCredenciamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Dados do Gestor
            nome: '',
            email: '',
            telefone: '',
            cpf: '',
            senha: '',
            confirmarSenha: '',

            // Dados da Instituição
            cnpj: '',
            razao_social: '',
            nome_fantasia: '',
            id_instituicao: 0,
            id_estado: '',
            cidade: '',

            // Controle de UI
            displaySolicitar: false,
            success: '',
            error: '',
            isLoading: false, // Novo estado para loading
            arrayEstados: [],
            arrayCidades: []
        };
    }

    componentDidMount() {
        this.listaDeEstados();
    }

    /**
     * Função para aplicar a máscara no CNPJ e chamar a consulta
     * @param {Object} e Evento de mudança do input
     */
    mascaraCnpj = (e) => {
        const valor = e.target.value.replace(/\D/g, '');
        let formattedCnpj = '';

        if (valor.length === 14) {
            // Aplica a máscara somente quando o CNPJ tem 14 dígitos
            formattedCnpj = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

            this.setState({
                cnpj: formattedCnpj,
                razao_social: "",
                nome_fantasia: "",
                error: "",
                displaySolicitar: false
            });

            // Chamar a consulta com o CNPJ formatado
            this.consultaCnpj(formattedCnpj);
        } else {
            // Atualiza o estado com o valor parcial sem chamar a consulta
            this.setState({
                cnpj: e.target.value, // Armazena o valor com máscara parcial
                razao_social: "",
                nome_fantasia: "",
                error: "",
                displaySolicitar: false
            });
        }
    }

    /**
     * Função para consultar o CNPJ no backend
     * @param {string} cnpj CNPJ com máscara
     */
    consultaCnpj = async (cnpj) => {
        console.log("Consultando CNPJ:", cnpj); // Para depuração
        try {
            const response = await fetch(`${api.baseURL}/instituicoes?cnpj=${encodeURIComponent(cnpj)}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log("Resposta da busca de CNPJ:", data); // Para depuração

            if (data.status === 200) {
                if (data.resultados.length > 0) {
                    const instituicao = data.resultados[0];
                    this.setState({
                        razao_social: instituicao.razao_social,
                        nome_fantasia: instituicao.nome_fantasia,
                        id_instituicao: instituicao.id_instituicao,
                        displaySolicitar: true,
                        error: '',
                        isLoading: false // Assegurar que o loading está falso
                    });
                } else {
                    this.setState({
                        error: 'CNPJ NÃO ENCONTRADO, POR FAVOR ENTRE EM CONTATO COM O SETOR DE CONVÊNIOS ATRAVÉS DA CENTRAL DE ATENDIMENTO',
                        razao_social: "",
                        nome_fantasia: "",
                        displaySolicitar: false,
                        isLoading: false // Assegurar que o loading está falso
                    });
                }
            } else {
                this.setState({
                    error: data.msg || 'Erro na consulta de CNPJ.',
                    displaySolicitar: false,
                    isLoading: false // Assegurar que o loading está falso
                });
            }
        } catch (error) {
            console.error("Erro na consulta de CNPJ:", error);
            this.setState({
                error: "Erro ao consultar CNPJ.",
                displaySolicitar: false,
                isLoading: false // Assegurar que o loading está falso
            });
        }
    }

    /**
     * Função para solicitar o credenciamento
     * @param {Object} e Evento de submissão do formulário
     */
    solicitarCredenciamento = async (e) => {
        e.preventDefault();
        this.setState({ success: '', error: '', isLoading: true }); // Iniciar o loading

        const {
            nome, email, telefone,
            cpf, senha, confirmarSenha,
            cnpj, razao_social, nome_fantasia,
            id_instituicao, id_estado, cidade
        } = this.state;

        // Validação dos campos
        if (!nome || !email || !telefone || !cpf || !cnpj || !razao_social || !nome_fantasia || !id_estado || !cidade) {
            this.setState({ error: "Por favor, preencher todos os campos.", isLoading: false });
            return;
        }

        if (senha !== confirmarSenha) {
            this.setState({ error: 'Por favor, informe senhas iguais!', isLoading: false });
            return;
        }

        try {
            const response = await fetch(`${api.baseURL}/credenciamento`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome, email, telefone,
                    cpf, senha, cnpj,
                    razao_social, nome_fantasia,
                    id_instituicao, id_estado, cidade
                })
            });

            const data = await response.json();
            console.log("Resposta da solicitação de credenciamento:", data); // Para depuração

            if (data.status === 200) {
                this.setState({ success: data.msg, error: "", isLoading: false });
                // Opcional: Redirecionar ou limpar o formulário após sucesso
                this.limparFormulario();
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1500);
            } else if (data.status === 400) {
                this.setState({ error: data.msg || 'Erro ao solicitar credenciamento.', success: "", isLoading: false });
            } else {
                this.setState({ error: data.msg || 'Erro inesperado.', success: "", isLoading: false });
            }
        } catch (error) {
            console.error("Erro ao solicitar credenciamento:", error);
            this.setState({ error: "Ocorreu um erro ao solicitar credenciamento.", isLoading: false });
        }
    }

    /**
     * Função para limpar o formulário após submissão bem-sucedida
     */
    limparFormulario = () => {
        this.setState({
            nome: '',
            email: '',
            telefone: '',
            cpf: '',
            senha: '',
            confirmarSenha: '',
            cnpj: '',
            razao_social: '',
            nome_fantasia: '',
            id_instituicao: 0,
            id_estado: '',
            cidade: '',
            displaySolicitar: false,
            isLoading: false, // Assegurar que o loading está falso
            arrayCidades: []
        });
    }

    /**
     * Função para listar os estados disponíveis
     */
    listaDeEstados = async () => {
        try {
            const response = await fetch(`${api.baseURL}/estados`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.status === 200) {
                this.setState({ arrayEstados: data.resultados }, () => {
                    console.log('arrayEstados:', this.state.arrayEstados); // Verifique os estados carregados
                });
            } else {
                this.setState({ error: data.msg || "Erro ao listar estados." });
            }
        } catch (error) {
            console.error("Erro ao listar estados:", error);
            this.setState({ error: "Ocorreu um erro ao listar estados." });
        }
    }

    /**
     * Função para buscar as cidades com base no estado selecionado
     * @param {number} id_estado ID do estado selecionado
     */
    buscarCidades = (id_estado) => {
        console.log('buscarCidades - id_estado:', id_estado); // Log do ID do estado
        console.log('EstadosCidadesJson:', EstadosCidadesJson); // Log do JSON completo

        // Verifique se 'estados' existe no JSON
        if (!EstadosCidadesJson.estados) {
            console.error('Estrutura do estados-cidades.json está incorreta. A chave "estados" está faltando.');
            this.setState({
                arrayCidades: [],
                cidade: ''
            });
            return;
        }

        // Procura o estado pelo ID
        const estadoEncontrado = EstadosCidadesJson.estados.find(est => Number(est.id) === Number(id_estado));
        console.log('estadoEncontrado:', estadoEncontrado); // Log do estado encontrado

        if (estadoEncontrado) {
            console.log('Cidades encontradas:', estadoEncontrado.cidades); // Log das cidades
            this.setState({
                arrayCidades: estadoEncontrado.cidades,
                cidade: '' // Resetar a cidade selecionada
            });
        } else {
            console.warn(`Estado com ID ${id_estado} não encontrado no estados-cidades.json.`);
            this.setState({
                arrayCidades: [],
                cidade: ''
            });
        }
    }

    /**
     * Função para lidar com as mudanças nos inputs
     * @param {Object} e Evento de mudança do input
     */
    handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'estado') {
            const id_estado = parseInt(value, 10);
            this.setState({ id_estado }, () => {
                this.buscarCidades(id_estado);
            });
        } else if (name === 'telefone') {
            // Aplica a máscara de telefone
            handleTelefone(value).then(maskedTelefone => {
                this.setState({ telefone: maskedTelefone });
            });
        } else if (name === 'cpf') {
            // Aplica a máscara de CPF
            handleCpf(value).then(maskedCpf => {
                this.setState({ cpf: maskedCpf });
            });
        } else if (name === 'cnpj') {
            // Chama a função de máscara de CNPJ
            this.mascaraCnpj(e);
        } else {
            this.setState({ [name]: value });
        }
    };

    render() {
        const {
            arrayEstados,
            arrayCidades,
            cidade,
            displaySolicitar,
            success,
            error,
            razao_social,
            nome_fantasia,
            cnpj,
            nome,
            email,
            telefone,
            cpf,
            senha,
            confirmarSenha,
            isLoading // Adicionando o estado de loading
        } = this.state;

        return (
            <Container>
                <img src={LogoAdmin} alt="Logo Nexus" className="mt-5 mb-4" />
                <StyledForm onSubmit={this.solicitarCredenciamento}>
                    <h4 style={{ color: "#000233", fontWeight: "bold" }} className='text-center'>
                        <FaListAlt /> CREDENCIAMENTO
                    </h4>
                    <hr />
                    <div className="row">
                        {/* Dados do Gestor */}
                        <DadosGestor
                            nome={nome}
                            email={email}
                            telefone={telefone}
                            cpf={cpf}
                            senha={senha}
                            confirmarSenha={confirmarSenha}
                            onChange={this.handleInputChange}
                        />

                        {/* Dados da Instituição */}
                        <DadosInstituicao
                            cnpj={cnpj}
                            razao_social={razao_social}
                            nome_fantasia={nome_fantasia}
                            id_estado={this.state.id_estado}
                            cidade={cidade}
                            arrayEstados={arrayEstados}
                            arrayCidades={arrayCidades}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* Mensagens de Sucesso e Erro */}
                    <MensagemFeedback success={success} error={error} />

                    {/* Botão de Enviar com Spinner Personalizado */}
                    {displaySolicitar && (
                        <button
                            className="button btn-block mt-4"
                            type="submit"
                            disabled={isLoading}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isLoading && <Spinner />}
                            {isLoading ? 'Processando...' : 'Solicitar'}
                        </button>
                    )}
                </StyledForm>
            </Container>
        );
    }
}

export const Form = StyledForm;
