import { FaCalendarWeek, FaClipboardList, FaFilter, FaPlus, FaRegEdit, FaSearch, FaSpinner, FaUserEdit, FaUsers } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { getToken } from '../../services/auth';
import Modal from 'react-bootstrap/Modal';

import { Tab } from 'bootstrap';
import { Col, Container, Row, Spinner, Tabs } from 'react-bootstrap';
import { uploadFile } from '../../services/uploadFile';
import Menu from '../../components/Menu';
import backgroundImage from '../../assets/sistema_chamados.png';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import FloatingMenu from '../../components/FloatingMenu';


export default class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      modalShowCadastrarEAtualizarAluno: false,
      modalShowCadastrarEAtualizarTema: false,
      modalShowAtualizarRedacao: false,
      success: '',
      error: '',

      //Tema
      id_tema: 0,
      tema: "",
      arrayTemas: [],
      arrayPlanos: [],
      arrayAlunos: [],
      arrayRedacoes: [],

      //Aluno
      id_usuario: 0,
      id_aluno: 0,
      nome: "",
      email: "",
      id_plano: "",
      senha: "",
      confirmarSenha: '',

      //Redação
      id_redacao: 0,
      nota: 0,
      corrigido: false,
      link_recebimento: "",
      emailDoAluno: ""

    }
  }

  componentDidMount() {
    this.listaDeTemas(getToken());
    this.listaDePlanos(getToken());
    this.listaDeAlunos(getToken());
    this.listaDeRedacoes(getToken());
  }

  setModalShowCadastrarEAtualizarTema(valor) {
    this.setState({ modalShowCadastrarEAtualizarTema: valor });
  }

  handlerShowModalCadastrarEAtualizarTema(tema = null) {
    this.setModalShowCadastrarEAtualizarTema(true);
    localStorage.removeItem("@link");

    if (tema !== null) {
      this.setState({
        id_tema: tema.id,
        tema: tema.nome
      });
      return
    }

    this.setState({
      id_tema: 0,
      tema: ""
    });
  }

  handlerCloseModalCadastrarEAtualizarTema() {
    this.setModalShowCadastrarEAtualizarTema(false);
    this.setState({
      success: '', error: ''
    })
  };

  setModalShowAtualizarRedacao(valor) {
    this.setState({ modalShowAtualizarRedacao: valor });
  }

  handlerShowModalAtualizarRedacao(redacao) {
    this.setModalShowAtualizarRedacao(true);
    localStorage.removeItem("@link");
    this.setState({
      id_redacao: redacao.id,
      tema: redacao.tema,
      nota: redacao.nota,
      corrigido: redacao.corrigido,
      link_recebimento: redacao.link_recebimento,
      nome: redacao.aluno,
      emailDoAluno: redacao.emailDoAluno
    });
  }

  handlerCloseModalAtualizarRedacao() {
    this.setModalShowAtualizarRedacao(false);
    this.setState({
      success: '', error: ''
    })
  };

  setModalShowCadastrarEAtualizarAluno(valor) {
    this.setState({ modalShowCadastrarEAtualizarAluno: valor });
  }

  handlerShowModalCadastrarEAtualizarAluno(aluno = null) {
    this.setModalShowCadastrarEAtualizarAluno(true);

    if (aluno !== null) {
      this.setState({
        id_usuario: aluno.id_usuario,
        id_aluno: aluno.id_aluno,
        nome: aluno.nome,
        email: aluno.email,
        senha: aluno.senha,
        confirmarSenha: aluno.senha,
        id_plano: aluno.id_plano
      });
      return
    }

    this.setState({
      id_aluno: 0,
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      id_plano: 0
    });
  }

  handlerCloseModalCadastrarEAtualizarAluno() {
    this.setModalShowCadastrarEAtualizarAluno(false);
    this.setState({
      success: '', error: ''
    })
  };

  listaDeTemas = async (token) => {
    try {
      const response = await fetch(`${api.baseURL}/temas`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        this.setState({ arrayTemas: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDePlanos = async (token) => {
    try {
      const response = await fetch(`${api.baseURL}/planos`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        this.setState({ arrayPlanos: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeAlunos = async (token) => {
    try {
      const response = await fetch(`${api.baseURL}/tipo_aluno/${2}/alunos`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        this.setState({ arrayAlunos: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  cadastrarEatualizarTema = async (e) => {
    e.preventDefault();
    this.setState({ success: "", error: "" });

    try {
      const { id_tema, tema } = this.state;

      if (!tema || !JSON.parse(localStorage.getItem('@link')) && (id_tema === 0)) {
        this.setState({ error: 'Por favor, preencher todos os campos!' });
        return;
      }

      if (!tema && (id_tema !== 0)) {
        this.setState({ error: 'Por favor, preencher todos os campos!' });
        return;
      }

      const url = id_tema === 0 ? `${api.baseURL}/temas` : `${api.baseURL}/temas/${id_tema}`

      const response = await fetch(url, {
        method: id_tema === 0 ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken()
        },
        body: JSON.stringify({
          nome: tema,
          texto_base: localStorage.getItem('@link')
        })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ success: data.msg });
        this.listaDeTemas(getToken());
        this.listaDeAlunos(getToken());
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }

  cadastrarEatualizarAluno = async (e) => {
    e.preventDefault();
    this.setState({ success: "", error: "" });

    try {
      const { id_usuario, id_aluno, nome, email, senha, confirmarSenha, id_plano } = this.state;

      if (!nome || !email || !senha || !confirmarSenha || !id_plano) {
        this.setState({ error: 'Por favor, preencher todos os campos!' });
        return;
      }

      if (senha.localeCompare(confirmarSenha) === -1) {
        this.setState({ error: 'Por favor, informe senhas iguais!' });
        return;
      }

      const url = id_aluno === 0 ? `${api.baseURL}/alunos` : `${api.baseURL}/alunos/${id_aluno}`;

      const response = await fetch(url, {
        method: id_aluno === 0 ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken()
        },
        body: JSON.stringify(id_aluno === 0 ? {
          nome, email, senha, id_plano, tipoAluno: 2
        } : {
          id_usuario, id_aluno, nome, email, senha, id_plano, tipoAluno: 2
        })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ success: data.msg });
        this.listaDeAlunos(getToken());
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }

  listaDeRedacoes = async (token) => {
    try {
      const response = await fetch(`${api.baseURL}/redacoes`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        this.setState({ arrayRedacoes: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  atualizarRedacao = async (e) => {
    e.preventDefault();
    this.setState({ success: "", error: "" });

    try {
      const { id_redacao, nota, corrigido, emailDoAluno, tema, nome } = this.state;

      if (parseInt(nota) < 1 || parseInt(nota) > 1000) {
        this.setState({ error: 'Informe uma nota maior que zero e menor ou igual a mil' });
        return;
      }

      if (!nota, !corrigido, !JSON.parse(localStorage.getItem('@link'))) {
        this.setState({ error: 'Por favor, preencher todos os campos!' });
        return;
      }

      const response = await fetch(`${api.baseURL}/redacoes/${id_redacao}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken()
        },
        body: JSON.stringify({
          link_recebimento: JSON.parse(localStorage.getItem('@link')),
          corrigido: corrigido ? "Sim" : "Não",
          nota,
          emailDoAluno,
          tema,
          nome
        })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ success: data.msg });
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }

  validarNotaDaRedacao(e) {
    if (!parseInt(e) > 0 && parseInt(e) <= 1000) {
      this.setState({ error: "A nota maior que zero e menor ou igual a 1000" });
    }
  }

  render() {
    const arrayTemas = this.state.arrayTemas;
    const arrayPlanos = this.state.arrayPlanos;
    const arrayAlunos = this.state.arrayAlunos;
    const arrayRedacoes = this.state.arrayRedacoes;

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
              <FloatingMenu>
                <ul className="dropdown-menu">
                  <li>
                    <a onClick={() => this.handlerShowModalCadastrarEAtualizarAluno()}><FaPlus /> Cadastrar aluno</a>
                  </li>
                  <li>
                    <a onClick={() => this.handlerShowModalCadastrarEAtualizarTema()}><FaPlus /> Cadastrar tema</a>
                  </li>
                  {/*<li>
										<a onClick={() => this.handlerShowModalFiltrarChamado()}><FaPlus /> Filtrar chamado</a>
									</li>
									<li>
										<a onClick={() => this.handlerShowModalCadastrarTipoChamado()}><FaPlus /> Tipos de chamado</a>
									</li>

									{this.context.user.id_permissao.includes(14) ? (
										<li>
											<a onClick={() => this.handlerShowModalVisualizarSetores()}><FaPlus /> Diretoria</a>
										</li>
									) : ("")} */}

                </ul>
              </FloatingMenu>
              <div className='container'>
                <Tabs
                  defaultActiveKey="alunos"
                  id="justify-tab-example"
                  variant='pills'
                  className="justify-content-center mb-3">
                  <Tab eventKey="alunos" title="Alunos">
                    <div className='row'>
                      <div className='col-sm-12'>
                        <h4 className='text-light'><FaUserEdit /> Alunos</h4>
                      </div>
                    </div>
                    <hr />
                    <div class="table-responsive-sm">
                      <div class="table-wrapper">
                        <table class="table text-center table-sm table-hover mb-5 bg-light">
                          <thead>
                            <tr>
                              <th scope="col">Nome</th>
                              <th scope="col">E-mail</th>
                              <th scope="col">Plano</th>
                              <th scope="col">Temas</th>
                              <th scope="col">Data/Hora de criação</th>
                              <th scope="col">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {arrayAlunos.length > 0 ? (
                              arrayAlunos.map((aluno, index) => (
                                <tr key={aluno.id} >
                                  <td >{aluno.nome}</td>
                                  <td >{aluno.email}</td>
                                  <td >{aluno.plano}</td>
                                  <td style={{ display: "block", overflowY: "scroll", height: "80px" }}>{aluno.temas}</td>
                                  <td>{aluno.dataHoraCriacao}</td>
                                  <td><button className='button' onClick={() => this.handlerShowModalCadastrarEAtualizarAluno(aluno)}><FaRegEdit /> Atualizar </button></td>
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
                    </div>
                  </Tab>
                  <Tab eventKey="temas" title="Temas">
                    <div className='row mb-3'>
                      <div className='col-sm-12'>
                        <h4 className='text-light'><FaUserEdit /> Temas</h4>
                      </div>
                    </div>
                    <div class="table-responsive-sm">
                      <div class="table-wrapper">
                        <table class="table text-center table-sm table-hover mb-5 bg-light">
                          <thead>
                            <tr>
                              <th scope="col">Nome</th>
                              <th scope="col">Texto base</th>
                              <th scope="col">Data/hora de criação</th>
                              <th scope="col">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {arrayTemas.length > 0 ? (
                              arrayTemas.map((tema, index) => (
                                <tr key={tema.id} >
                                  <td >{tema.nome}</td>
                                  <td><a href={tema.texto_base}>Anexo</a></td>
                                  <td>{tema.dataHoraCriacao}</td>
                                  <td><button className='button' onClick={() => this.handlerShowModalCadastrarEAtualizarTema(tema)}><FaRegEdit /> Atualizar </button></td>
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
                    </div>
                  </Tab>
                  <Tab eventKey="redacoes" title="Redações">
                    <h4 className='text-light'><FaUserEdit /> Redações para correção</h4>
                    <hr />
                    <div class="table-responsive-sm">
                      <div class="table-wrapper">
                        <table class="table table-sm text-center table-hover bg-light">
                          <thead>
                            <tr>
                              <th scope="col">Aluno</th>
                              <th scope="col">Tema</th>
                              <th scope="col">Anexo do envio</th>
                              <th scope="col">Nota</th>
                              <th scope="col">Corrigido</th>
                              <th scope="col">Data/hora do registro</th>
                              <th scope="col">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {arrayRedacoes.length > 0 ? (
                              arrayRedacoes.map((redacao, index) => (
                                <tr key={index} className={redacao.corrigido !== null ? `table-success` : ``}>
                                  <td>{redacao.aluno}</td>
                                  <td>{redacao.tema}</td>
                                  <td><a href={redacao.link_envio}>Visualizar</a></td>
                                  <td>{redacao.nota === null ? `Não definida` : redacao.nota}</td>
                                  <td>{redacao.corrigido === null || redacao.corrigido === `Não` ? `Não` : redacao.corrigido}</td>
                                  <td>{redacao.dataHoraCriacao}</td>
                                  <td><button className='button' onClick={() => this.handlerShowModalAtualizarRedacao(redacao)}><FaRegEdit /> Atualizar </button></td>
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
                    </div>
                  </Tab>
                </Tabs>

                <Modal
                  show={this.state.modalShowCadastrarEAtualizarTema}
                  onHide={() => this.handlerCloseModalCadastrarEAtualizarTema()}
                  aria-labelledby="contained-modal-title-vcenter"
                  backdrop="static"
                  size='md'
                  centered>
                  <Form onSubmit={this.cadastrarEatualizarTema}>
                    <Modal.Header closeButton>
                      <h4 className='titulo'><FaCalendarWeek /> {this.state.id_tema === 0 ? `Cadastrar` : `Atualizar`} tema</h4>
                    </Modal.Header>
                    <Modal.Body>
                      <div class="form-group">
                        <label for="exampleFormControlTextarea1">Tema:</label>
                        <textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
                          onChange={(e) =>
                            this.setState({ tema: e.target.value })
                          }
                          value={this.state.tema}></textarea>
                      </div>

                      <div className="form-group mb-3">
                        <label for="anexo">Anexar texto base: </label>
                        <input type="file" accept="application/pdf" className="form-control form-control-sm" id="anexo_correcao"
                          onChange={(e) => uploadFile(e.target.files[0])} />
                      </div>

                      <div class="progress">
                        <div id='progresso' class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
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
                    </Modal.Body>
                    <Modal.Footer>
                      <button id='btnCadastrarAnexo' className='button' >Confirmar</button>
                    </Modal.Footer>
                  </Form>
                </Modal>

                <Modal
                  show={this.state.modalShowCadastrarEAtualizarAluno}
                  onHide={() => this.handlerCloseModalCadastrarEAtualizarAluno()}
                  aria-labelledby="contained-modal-title-vcenter"
                  backdrop="static"
                  size='md'
                  centered>
                  <Form onSubmit={this.cadastrarEatualizarAluno}>
                    <Modal.Header closeButton>
                      <h4 className='titulo'><FaCalendarWeek /> Cadastrar aluno</h4>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="nome"
                          placeholder="Digite seu nome completo"
                          autoComplete='off'
                          onChange={(e) =>
                            this.setState({ nome: e.target.value })
                          }
                          value={this.state.nome}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          id="email"
                          placeholder="Informe o seu email"
                          autoComplete='off'
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          value={this.state.email}
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
                              autoComplete='off'
                              onChange={(e) =>
                                this.setState({ senha: e.target.value })
                              }
                              value={this.state.senha}
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
                              autoComplete='off'
                              onChange={(e) =>
                                this.setState({ confirmarSenha: e.target.value })
                              }
                              value={this.state.confirmarSenha}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Plano:*</label>
                        <select class="form-control form-control-sm" id="selectPlano" value={this.state.id_plano}
                          onChange={e => this.setState({ id_plano: e.target.value })}>
                          <option value="0">Selecione</option>
                          {arrayPlanos.length > 0 ?
                            arrayPlanos.map(plano => (
                              <option value={plano.id}>{plano.nome}</option>
                            ))
                            : (<option value="0">Nenhum resultado encontrado</option>)}
                        </select>
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
                    </Modal.Body>
                    <Modal.Footer>
                      <button className='button'>Confirmar</button>
                    </Modal.Footer>
                  </Form>
                </Modal>

                <Modal
                  show={this.state.modalShowAtualizarRedacao}
                  onHide={() => this.handlerCloseModalAtualizarRedacao()}
                  aria-labelledby="contained-modal-title-vcenter"
                  backdrop="static"
                  size='md'
                  centered>
                  <Form onSubmit={this.atualizarRedacao}>
                    <Modal.Header closeButton>
                      <h4 className='titulo'><FaCalendarWeek /> Correção da redação com o tema: <b>{this.state.tema.toLowerCase()}</b></h4>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div class="form-group">
                            <label htmlFor="cpf">Nota:</label>
                            <input
                              className="form-control form-control-sm"
                              type="number"
                              placeholder="Informe uma nota de 0 a 10"
                              name="nota"
                              id='nota'
                              onChange={e => this.setState({ nota: e.target.value })}
                              value={this.state.nota}
                            />
                          </div>
                        </div>

                        <div className='col-sm-6'>
                          <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="corrigido" checked={this.state.corrigido}
                              onChange={() => this.setState({ corrigido: !this.state.corrigido })} />
                            <label class="form-check-label" for="corrigido">Marca a redação como corrigida</label>
                          </div>
                        </div>
                      </div>

                      {this.state.link_recebimento !== null ? (
                        <a href={this.state.link_recebimento} className='mb-3'>Anexo de correção</a>
                      ) : ("")}

                      <hr />

                      <div className="form-group mb-3">
                        <label for="anexo">Anexar correção</label>
                        <input type="file" accept="image/png,application/pdf" className="form-control form-control-sm" id="anexo_correcao"
                          onChange={(e) => uploadFile(e.target.files[0], `aprova/correcoes/`)} />
                      </div>

                      <div class="progress">
                        <div id='progresso' class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
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
                    </Modal.Body>
                    <Modal.Footer>
                      <button id='btnCadastrarAnexo' className='button'>Atualizar</button>
                    </Modal.Footer>
                  </Form>
                </Modal>
                {/* /.container-fluid */}
              </div>
              {/* /.content */}
              <br />
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