// src/pages/login/index.js
import React, { useState, useContext } from 'react';
import { Container, Form, Img } from './styles';
import LogoAdmin from '../../assets/logo_nexus_e_enber.png';
import api from '../../services/api';
import { setToken, setRole, setNome } from '../../services/auth';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handlerLogin = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            setError("Por favor, preencher todos os campos.");
            return;
        }

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

                setUser(userData);

                // Redirecionamento baseado na permissão
                switch (data.permissao) {
                    case "ADMIN":
                        navigate("/administrador");
                        break;
                    case "SECRETARIA":
                        navigate("/secretaria");
                        break;
                    case "POLO":
                        navigate("/provas");
                        break;
                    case "EVENTOS":
                        navigate("/eventos");
                        break;
                    case "ORIENTADORES":
                        navigate("/bancas/orientadores");
                        break;
                    case "ORIENTANDOS":
                        navigate("/bancas/orientandos");
                        break;
                    case "COORDENADOR":
                        navigate("/bancas/coordenadores");
                        break;
                    case "DIRETOR":
                        navigate("/bancas/diretor");
                        break;
                    case "GRUPO DE TRABALHO":
                        navigate("/eventos/enber/grupo_trabalho");
                        break;
                    case "CHAMADOS":
                        navigate("/chamados");
                        break;
                    case "CONVENIOS":
                        navigate("/convenios");
                        break;
                    case "PROFESSOR":
                        navigate("/correcao_redacao");
                        break;
                    case "ALUNOS":
                        navigate("/alunos");
                        break;
                    case "GESTOR DE INSTITUICAO":
                        navigate("/processo_credenciamento");
                        break;
                    default:
                        navigate("/");
                        break;
                }
            } else if (data.status === 400) {
                navigate("/");
                setError(data.msg);
            }
        } catch (error) {
            console.log(error);
            setError("Ocorreu um erro ao realizar o login.");
        }
    }

    return (
        <Container>
            <img src={LogoAdmin} style={{ display: "block", margin: "0 auto", width: "200px" }} className="mt-3 mb-3" alt="Logo Nexus" />
            <h1 className='titulo'>Gestor Grupo Nexus</h1>
            <Form onSubmit={handlerLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">EMAIL:</label>
                    <input
                        className="form-control form-control-sm"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nome">SENHA:</label>
                    <input
                        className="form-control form-control-sm"
                        type="password"
                        placeholder="Senha"
                        name="senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                </div>

                {error && <div className="alert alert-danger text-center mt-2" role="alert">{error}</div>}

                <button className="button btn-block mt-4" type="submit">Entrar</button>
            </Form>
        </Container>
    )
}

export default Login;
