import React, { Component } from 'react';
import { Container, Form, Img } from './styles';
import LogoAdmin from '../../assets/logo_nexus.png';
import api from '../../services/api';
import { handleTelefone } from '../../services/mascaraTelefone';
import { FaListAlt, FaSchool, FaUserTie } from 'react-icons/fa';
import { handleCpf } from '../../services/mascaraCpf';
import EstadosCidadesJson from '../../services/estados-cidades.json';

export default class Index extends Component {
    constructor(props) {
        super();
        this.state = {

            //Dados do gestor
            nome: '',
            email: '',
            telefone: '',
            cpf: '',
            senha: '',
            confirmarSenha: '',

            //Dados da instituição
            cnpj: '',
            razao_social: '',
            nome_fantasia: '',
            id_instituicao: 0,
            id_estado: 0,
            cidade: '',

            display: "none",
            success: '',
            error: '',
            arrayEstados: [],
            arrayCidades: []
        }
    }

    componentDidMount() {
        this.listaDeEstados();
    }

    mascaraCnpj = (e) => {
        if (e.target.value.length === 14 || e.target.value.length === 18) {
            this.consultaCnpj(e, e.target.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"));
            return;
        }

        this.setState({ cnpj: e.target.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"), display: "none", razao_social: "", nome_fantasia: "", error: "" });
        document.getElementById('link').style.display = "none";
    }

    consultaCnpj = async (e, cnpj) => {
        e.preventDefault();
        this.setState({ success: "", error: "", cnpj });

        try {
            const response = await fetch(`${api.baseURL}/instituicoes?cnpj=${cnpj}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.status === 200) {
                if (data.resultados.length > 0) {
                    this.setState({ razao_social: data.resultados[0].razao_social, nome_fantasia: data.resultados[0].nome_fantasia, id_instituicao: data.resultados[0].id_instituicao, display: "" });
                    document.getElementById('link').style.display = "none";
                    return;
                }
                this.setState({ error: 'CNPJ NÃO ENCONTRADO, POR FAVOR ENTRE EM CONTATO COM O SETOR DE CONVÊNIOS ATRAVÉS DA CENTRAL DE ATENDIMENTO', nome_fantasia: "", razao_social: "", display: "none" });
                document.getElementById('link').style.display = "block";
            }

            if (data.status === 400) {
                this.setState({ error: data.msg })
            }
        } catch (error) {
            console.log(error)
        }

    }

    solicitarCredenciamento = async e => {
        e.preventDefault();
        try {
            const {
                nome, email, telefone,
                cpf, senha, confirmarSenha,
                cnpj, razao_social, nome_fantasia,
                id_instituicao, id_estado, cidade
            } = this.state;

            if (!nome || !email || !telefone || !cpf ||
                !cnpj || !razao_social || !nome_fantasia ||
                !id_estado || !cidade) {
                this.setState({ error: "Por favor, preencher todos os campos." });
                return
            }


            if (senha.localeCompare(confirmarSenha) === -1) {
                this.setState({ error: 'Por favor, informe senhas iguais!' });
                return;
            }

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

            if (data.status === 200) {
                this.setState({ success: data.msg, error: "" });
            }

            if (data.status === 400) {
                this.setState({ error: data.msg, success: "" });
            }
        } catch (error) {
            console.log(error)
        }

    }

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
                this.setState({ arrayEstados: data.resultados });
            }

            if (data.status === 400) {
                this.setState({ error: data.msg })
            }
        } catch (error) {
            console.log(error)
        }
    }

    buscarCidades = (estado) => {
        const id_estado = estado.split(",")[0];
        const sigla = estado.split(",")[1];
        const estadosCidades = EstadosCidadesJson.estados;
        for (let index = 0; index < estadosCidades.length; index++) {
            if (estadosCidades[index].sigla === sigla) {
                this.setState({ id_estado, arrayCidades: estadosCidades[index].cidades })
            }
        }
    }

    render() {
        const arrayEstados = this.state.arrayEstados;
        const arrayCidades = this.state.arrayCidades;

        return (
            <Container>
                {/* <Navbar /> */}
                <img src={LogoAdmin} className="mt-5 mb-4" />
                <Form onSubmit={this.solicitarCredenciamento} >
                    <h4 style={{ color: "#000233", fontWeight: "bold" }} className='text-center'><FaListAlt /> CREDENCIAMENTO</h4>
                    <hr />
                    <div className="row">
                        <div className="col-sm-6">
                            <h4 className='text-center' style={{ color: "#000233" }}><FaUserTie /> Dados do gestor</h4>
                            <hr />
                            <div className="form-group">
                                <label htmlFor="nome">Nome completo:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="nome"
                                    placeholder="INFORME O SEU NOME"
                                    onChange={(e) =>
                                        this.setState({ nome: e.target.value })
                                    }
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="INFORME O SEU E-MAIL">E-mail:</label>
                                <input className="form-control form-control-sm" type="email" placeholder="INFORME O SEU E-MAIL" name="email" id="email"
                                    onChange={e => this.setState({ email: e.target.value })} autocomplete="off" />
                            </div>

                            <div class="form-group">
                                <label htmlFor="telefone">Telefone:</label>
                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    placeholder="INFORME O SEU TELEFONE"
                                    name="telefone"
                                    id='telefone'
                                    onChange={(e) => handleTelefone(e.target.value)
                                        .then(result => { this.setState({ telefone: result }) })}
                                    value={this.state.telefone}
                                    autocomplete="off"
                                />
                            </div>

                            <div class="form-group">
                                <label htmlFor="cpf">CPF:</label>
                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    placeholder="INFORME O SEU CPF"
                                    name="Cpf"
                                    id='Cpf'
                                    onChange={(e) => handleCpf(e.target.value).then(result => this.setState({ cpf: result }))}
                                    value={this.state.cpf}
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="senha">Senha</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm"
                                            id="senha"
                                            placeholder="Informe sua senha"
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
                                            className="form-control form-control-sm"
                                            id="repetir_senha"
                                            placeholder="Informe sua senha novamente"
                                            onChange={(e) =>
                                                this.setState({ confirmarSenha: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <h4 className='text-center' style={{ color: "#000233" }}><FaSchool /> Dados da instituição</h4>
                            <hr />
                            <div class="form-group">
                                <label htmlFor="telefone">CNPJ:*</label>
                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    placeholder="INFORME O SEU CNPJ"
                                    name="cnpj"
                                    id="cnpj"
                                    value={this.state.cnpj}
                                    onChange={(e) => this.mascaraCnpj(e)}
                                    maxlength="18"
                                    autocomplete="off"

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="INFORME O SEU NOME">Razão Social:*</label>
                                <input className="form-control form-control-sm" type="text" name="nome" id="nome"
                                    value={this.state.razao_social}
                                    autocomplete="off"
                                    disabled={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="INFORME O SEU NOME">Nome Fantasia:*</label>
                                <input className="form-control form-control-sm" type="text" name="nome" id="nome"
                                    value={this.state.nome_fantasia}
                                    autocomplete="off"
                                    disabled={true} />
                            </div>


                            <div class="form-group">
                                <label htmlFor="selectEstado">Estado:</label>
                                <select className="form-control form-control-sm" id="selectEstado"
                                    onChange={e => this.buscarCidades(e.target.value)}>
                                    <option value={0}>Selecione um estado</option>
                                    {arrayEstados.length > 0 ?
                                        arrayEstados.map(item => (
                                            <option value={[item.id, item.sigla]}>{item.nome}</option>
                                        ))
                                        : (<option value="">Nenhum resultado foi encontrado</option>)}
                                </select>
                            </div>

                            <div class="form-group">
                                <label htmlFor="selectEstado">Cidade:</label>
                                <select className="form-control form-control-sm" id="selectEstado"
                                    onChange={e => this.setState({ cidade: e.target.value })}>
                                    <option value={0}>Selecione um estado</option>
                                    {arrayCidades.length > 0 ?
                                        arrayCidades.map(item => (
                                            <option value={[item]}>{item}</option>
                                        ))
                                        : (<option value="">Nenhum resultado foi encontrado</option>)}
                                </select>
                            </div>
                        </div>

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
                                    className="msg-error alert alert-danger text-center"
                                    role="alert"
                                >
                                    {this.state.error}
                                </div>
                            )}
                        </div>
                    </div>
                    {this.state.display !== "none" && (<button class="button btn-block mt-4" type="submit">Solicitar</button>)}
                </Form>
            </Container>
        )
    }
}