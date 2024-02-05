import React, { Component } from 'react';
import { Container, Form, Img } from './styles';
import LogoAdmin from '../../assets/logo_nexus.png';
import api from '../../services/api';
import { handleTelefone } from '../../services/mascaraTelefone';

export default class Index extends Component {
    constructor(props) {
        super();
        this.state = {
            cnpj: '',
            razao_social: '',
            nome_fantasia: '',
            email: '',
            telefone: '',
            tipo_turma: '',
            observacao: "",
            id_instituicao: 0,
            display: "none",
            success: '',
            error: '',
            arrayEstados: [],
            id_estado: 0
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

    solicitarAberturaDeTurma = async e => {
        e.preventDefault();

        const { cnpj,
            razao_social,
            nome_fantasia,
            email, telefone,
            observacao, id_instituicao, id_estado, tipo_turma } = this.state;

        if (!cnpj || !razao_social || !nome_fantasia || !email || !telefone || !id_estado || !tipo_turma) {
            this.setState({ error: "Por favor, preencher todos os campos." });
        } else {
            try {
                const response = await fetch(`${api.baseURL}/abertura_turma`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cnpj,
                        razao_social,
                        nome_fantasia,
                        id_instituicao,
                        id_estado,
                        email,
                        telefone,
                        tipo_turma,
                        observacao,
                        metodologia: '',
                        curso: ''
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
    }

    listaDeEstados = async () => {
        try {
            const response = await fetch(`${api.baseURL}/estados`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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

    render() {
        const arrayEstados = this.state.arrayEstados;
        return (
            <Container>
                {/* <Navbar /> */}
                <img src={LogoAdmin} className="mt-5 mb-4" />
                <Form onSubmit={this.solicitarAberturaDeTurma} >
                    <h4 style={{ color: "#000233", fontWeight: "bold" }} className='text-center'>ABERTURA DE TURMA</h4>
                    <hr />
                    <div className="row">
                        <div className="col-sm-6">
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
                                    onChange={e => this.setState({ id_estado: e.target.value })}>
                                    <option value={0}>Selecione um estado</option>
                                    {arrayEstados.length > 0 ?
                                        arrayEstados.map(item => (
                                            <option value={item.id}>{item.nome}</option>
                                        ))
                                        : (<option value="">Nenhum resultado foi encontrado</option>)}
                                </select>
                            </div>
                        </div>


                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="INFORME O SEU E-MAIL">E-mail do polo:</label>
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
                                <label htmlFor="selectTurma">Tipo de turma:</label>
                                <select className="form-control form-control-sm" id="selectTurma"
                                    onChange={e => this.setState({ tipo_turma: e.target.value })}>
                                    <option value={0}>Selecione um tipo de turma</option>
                                    <option value={1}>Turma de certificação de ensino fundamental</option>
                                    <option value={2}>Turma de certificação de ensino médio</option>
                                    <option value={3}>Turma de certificação de ensino fundamental e médio</option>
                                </select>
                            </div>


                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Observação</label>
                                <textarea class="form-control" id="observacao" rows="3"
                                    onChange={(e) =>
                                        this.setState({ observacao: e.target.value })
                                    }
                                ></textarea>
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

                    <a id='link' target="_blank" href="https://wa.me/message/6S643PBOYBDVD1">CLIQUE AQUI PARA FALAR COM A CENTRAL DE ATENDIMENTO</a>

                    {this.state.display !== "none" && (<button class="button btn-block mt-4" type="submit">Solicitar</button>)}
                </Form>
            </Container>
        )
    }
}