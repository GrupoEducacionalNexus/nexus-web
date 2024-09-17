import React, { Component } from 'react';
import { Container, Form, Img } from './styles';
import LogoAdmin from '../../assets/logo_nexus_e_enber.png';
import api from '../../services/api';
import { setToken, setRole, setNome } from '../../services/auth';
import UserContext from '../../UserContext';

export default class Login extends Component {

    static contextType = UserContext;

    constructor(props) {
        super();
        this.state = {
            id: 0,
            email: '',
            senha: '',
            error: ''
        }
    }


    handlerLogin = async e => {
        e.preventDefault()

        const { email, senha } = this.state;

        if (!email || !senha) {
            this.setState({ error: "Por favor, preencher todos os campos." });
        } else {
            try {
                const response = await fetch(`${api.baseURL}/login`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
                });

                const data = await response.json();

                // if (data.status === 200) {
                //     setToken(data.token);
                //     setRole(data.id_permissao);
                //     setNome(data.nome);


                //     const userData =
                //     {
                //         auth: data.auth,
                //         id: data.id,
                //         nome: data.nome,
                //         email: data.email,
                //         id_permissao: data.id_permissao,
                //         id_setor: data.id_setor
                //     }
                //     this.context.setUser(userData);
                //     //console.log(data);

                //     if (data.permissao === "ADMIN") {
                //         this.props.history.push("/administrador");
                //     }

                //     if (data.permissao === "SECRETARIA") {
                //         this.props.history.push("/secretaria");
                //     }

                //     if (data.permissao === "POLO") {
                //         this.props.history.push("/provas");
                //     }

                //     if (data.permissao === "EVENTOS") {
                //         this.props.history.push("/eventos");
                //     }

                //     if (data.permissao === "ORIENTADORES") {
                //         this.props.history.push("/bancas/orientadores");
                //     }

                //     if (data.permissao === "ORIENTANDOS") {
                //         this.props.history.push("/bancas/orientandos");
                //     }

                //     if (data.permissao === "COORDENADOR") {
                //         this.props.history.push("/bancas/coordenadores");
                //     }

                //     if (data.permissao === "DIRETOR") {
                //         this.props.history.push("/bancas/diretor");
                //     }

                //     if (data.permissao === "GRUPO DE TRABALHO") {
                //         this.props.history.push("/eventos/enber/grupo_trabalho");
                //     }

                //     if (data.permissao === "CHAMADOS") {
                //         this.props.history.push("/chamados");
                //     }

                //     if (data.permissao === "CONVENIOS") {
                //         this.props.history.push("/convenios");
                //     }

                //     if (data.permissao === "PROFESSOR") {
                //         this.props.history.push("/correcao_redacao");
                //     }

                //     if (data.permissao === "ALUNOS") {
                //         this.props.history.push("/alunos");
                //     }

                //     if (data.permissao === "GESTOR DE INSTITUICAO") {
                //         this.props.history.push("/processo_credenciamento");
                //     }

                // }
                if (data.status === 200) {
                    setToken(data.token);
                    setRole(data.id_permissao);
                    setNome(data.nome);

                    const userData = {
                        auth: data.auth,
                        id: data.id,
                        nome: data.nome,
                        email: data.email,
                        id_permissao: data.id_permissao,
                        id_setor: data.id_setor
                    };

                    // Armazenando o usuário no localStorage para manter o estado entre atualizações de página
                    localStorage.setItem('user', JSON.stringify(userData));

                    // Atualizando o contexto do usuário
                    this.context.setUser(userData);

                    // Navegando para a página correta com base na permissão
                    switch (data.permissao) {
                        case "ADMIN":
                            this.props.history.push("/administrador");
                            break;
                        case "SECRETARIA":
                            this.props.history.push("/secretaria");
                            break;
                        case "POLO":
                            this.props.history.push("/provas");
                            break;
                        case "EVENTOS":
                            this.props.history.push("/eventos");
                            break;
                        case "ORIENTADORES":
                            this.props.history.push("/bancas/orientadores");
                            break;
                        case "ORIENTANDOS":
                            this.props.history.push("/bancas/orientandos");
                            break;
                        case "COORDENADOR":
                            this.props.history.push("/bancas/coordenadores");
                            break;
                        case "DIRETOR":
                            this.props.history.push("/bancas/diretor");
                            break;
                        case "GRUPO DE TRABALHO":
                            this.props.history.push("/eventos/enber/grupo_trabalho");
                            break;
                        case "CHAMADOS":
                            this.props.history.push("/chamados");
                            break;
                        case "CONVENIOS":
                            this.props.history.push("/convenios");
                            break;
                        case "PROFESSOR":
                            this.props.history.push("/correcao_redacao");
                            break;
                        case "ALUNOS":
                            this.props.history.push("/alunos");
                            break;
                        case "GESTOR DE INSTITUICAO":
                            this.props.history.push("/processo_credenciamento");
                            break;
                        default:
                            this.props.history.push("/");
                            break;
                    }
                }


                if (data.status === 400) {
                    this.props.history.push("/");
                    this.setState({ error: data.msg })
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        return (
            <Container>
                <img src={LogoAdmin} style={{ display: "block", margin: "0 auto", width: "200px" }} className="mt-3 mb-3" />
                <h1 className='titulo'>Gestor Grupo Nexus</h1>
                <Form onSubmit={this.handlerLogin}>
                    <div class="form-group mb-3">
                        <label htmlFor="email">EMAIL:</label>
                        <input className="form-control form-control-sm" type="email" placeholder="Email" name="email"
                            onChange={e => this.setState({ email: e.target.value })} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="nome">SENHA:</label>
                        <input className="form-control form-control-sm" type="password" placeholder="Senha" name="senha"
                            onChange={e => this.setState({ senha: e.target.value })} />
                    </div>

                    {this.state.error && <div className="alert alert-danger text-center mt-2" role="alert">{this.state.error}</div>}

                    <button className="button btn-block mt-4" type="submit">Entrar</button>
                </Form>
            </Container>
        )
    }
}