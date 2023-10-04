import { FaCalendarWeek, FaClipboardList, FaFilter, FaLayerGroup, FaRegEdit, FaSearch, FaSpinner, FaUserEdit, FaUsers } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { getToken } from '../../services/auth';
import Modal from 'react-bootstrap/Modal';
import { Tab } from 'bootstrap';
import { Button, Col, Container, FormControl, InputGroup, Nav, Navbar, Row, Tabs } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Card } from 'react-bootstrap';
import { uploadFile } from '../../services/uploadFile';
import BackgroundAprova from '../../assets/prancheta.png';
import Menu from '../../components/Menu';
import Perfil from '../../components/Perfil';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import FloatingMenu from '../../components/FloatingMenu';
import backgroundImage from '../../assets/sistema_chamados.png';

export default class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      modalShowEnviarRedacao: false,
      modalShowHistorico: false,
      arrayTemasMesAtual: [],
      arrayHistorico: [],
      arrayRedacoes: [],
      data_horaAtual: new Date(),
      success: '',
      error: '',

      //Tema
      id_tema: 0,
      tema: "",
      texto_base: "",
      id_aluno: 0,
      totRedacoesDoTema: 0,

      //Aluno
      nomeDoAluno: ""
    }
  }

  componentDidMount() {
    this.listaDeTemas(getToken(), (parseInt(this.state.data_horaAtual.getMonth() + 1)))
    this.listaDeTemas(getToken());
  }

  setModalShowEnviarRedacao(valor) {
    this.setState({ modalShowEnviarRedacao: valor });
  }

  handlerShowModalEnviarRedacao(tema) {
    this.setModalShowEnviarRedacao(true);
    localStorage.removeItem("@link");
    this.setState({
      id_tema: tema.id, tema: tema.nome, id_aluno: tema.id_aluno,
      totRedacoesDoTema: tema.totRedacoesDoTema, nomeDoAluno: tema.nomeDoAluno
    });
    this.listaDeRedacoes(getToken(), tema.id_aluno, tema.id);
  }

  handlerCloseModalEnviarRedacao() {
    this.setModalShowEnviarRedacao(false);
    this.setState({
      totRedacoesDoTema: 0, arrayRedacoes: [], success: '', error: ''
    })
  };

  setModalShowHistorio(valor) {
    this.setState({ modalShowHistorico: valor });
  }

  handlerShowModalHistorio(tema) {
    this.setModalShowHistorio(true);
    this.setState({
      id_tema: tema.id, tema: tema.nome, texto_base: tema.texto_base,
      id_aluno: tema.id_aluno, totRedacoesDoTema: tema.totRedacoesDoTema
    });
    this.listaDeRedacoes(getToken(), tema.id_aluno, tema.id);
  }

  handlerCloseModalHistorio() {
    this.setModalShowHistorio(false);
    this.setState({
      success: '', error: ''
    })
  };

  listaDeTemas = async (token, mesAtual = "") => {
    try {
      const response = await fetch(`${api.baseURL}/alunos/${token}/temas?mesAtual=${mesAtual}`,
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
      //console.log(data);
      if (data.status === 200) {
        mesAtual !== "" ? this.setState({ arrayTemasMesAtual: data.resultados }) : this.setState({ arrayHistorico: data.resultados })
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeRedacoes = async (token, id_aluno, id_tema) => {
    try {
      const response = await fetch(`${api.baseURL}/alunos/${token}/redacoes?id_aluno=${id_aluno}&id_tema=${id_tema}`,
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
        if (data.resultados.length > 0) {
          this.setState({ arrayRedacoes: data.resultados });
          return;
        }
        this.setState({ totRedacoesDoTema: 0 });

      }
    } catch (error) {
      console.log(error);
    }
  };

  enviarRedacao = async (e) => {
    e.preventDefault();
    this.setState({ success: "", error: "" });

    try {
      const { nomeDoAluno, id_tema, id_aluno, tema } = this.state;

      if (!JSON.parse(localStorage.getItem('@link'))) {
        this.setState({ error: 'Por favor, preencher todos os campos!' });
        return;
      }

      const response = await fetch(`${api.baseURL}/redacoes`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken()
        },
        body: JSON.stringify({
          nomeDoAluno,
          id_tema: id_tema,
          link_envio: JSON.parse(localStorage.getItem('@link')),
          id_aluno,
          tema
        })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ success: data.msg });
        this.listaDeTemas(getToken(), (parseInt(this.state.data_horaAtual.getMonth() + 1)))
        this.listaDeRedacoes(getToken(), id_aluno, id_tema);
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const arrayTemasMesAtual = this.state.arrayTemasMesAtual;
    const arrayHistorico = this.state.arrayHistorico;
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
                  {/* <li>
                    <a onClick={() => this.handlerShowModalCadastrarInstituicao()}><FaPlus /> Adicionar estado</a>
                  </li>
                  <li>
                    <a onClick={() => this.handlerShowModalFiltrarChamado()}><FaPlus /> Adicionar instituição</a>
                  </li> */}
                </ul>
              </FloatingMenu>
            <div className='container'>
              <Tabs
                defaultActiveKey="temasDoMes"
                id="justify-tab-example"
                variant='pills'
                className="justify-content-center mb-3">
                <Tab eventKey="temasDoMes" title="Temas do mês">
                  <h4 className='text-light'><FaUserEdit /> Temas</h4>
                  <hr />
                  <Accordion>
                    <div className='row'>
                      {arrayTemasMesAtual.length > 0 ?
                        arrayTemasMesAtual.map((tema, index) => (
                          <div className='col-sm-4'>
                            <Card style={{ backgroundColor: tema.corrigido === 1 ? `#98fb98` : `` }} className='zoom'>
                              <Accordion.Toggle as={Card.Header} eventKey={tema.id}>
                                <h5 style={{ fontSize: '14pt', fontWeight: 'bold' }}><FaLayerGroup />  {tema.nome}<br /></h5>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey={tema.id}>
                                <Card.Body className='text-center'>
                                  <Card.Text>
                                    Texto base: <a href={tema.texto_base}>Baixar</a><br />
                                    Data de registro: {tema.dataCriacao}
                                  </Card.Text>
                                  <button className="button" onClick={() => this.handlerShowModalEnviarRedacao(tema)}>Enviar redação e visualizar correções</button>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </div>
                        )) : (
                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                              <h5><FaLayerGroup /> Nenhum resultado encontrado</h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>

                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        )}
                    </div>
                  </Accordion>
                </Tab>

                <Tab eventKey="historico" title="Histórico">
                  <h4 className='text-light'><FaUserEdit /> Histórico</h4>
                  <hr />
                  <Accordion>
                    <div className='row'>
                      {arrayHistorico.length > 0 ?
                        arrayHistorico.map((tema, index) => (
                          <div className='col-sm-4'>
                            <Card key={index} style={{ backgroundColor: tema.corrigido === 1 ? `#98fb98` : `` }} className='zoom'>
                              <Accordion.Toggle as={Card.Header} eventKey={tema.id} bg={`red`}>
                                <h5 style={{ fontSize: '14pt', fontWeight: 'bold' }}><FaLayerGroup />  {tema.nome}<br /></h5>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey={tema.id}>
                                <Card.Body className='text-center'>
                                  <Card.Text>
                                    Texto base: <a href={tema.texto_base}>Baixar</a><br />
                                    Data de registro: {tema.dataCriacao}
                                  </Card.Text>
                                  <button className="button" onClick={() => this.handlerShowModalHistorio(tema)}>Detalhes</button>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </div>
                        )) : (
                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                              <h5><FaLayerGroup /> Nenhum resultado encontrado</h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>

                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        )}
                    </div>
                  </Accordion>
                </Tab>
              </Tabs>

              <Modal
                show={this.state.modalShowEnviarRedacao}
                onHide={() => this.handlerCloseModalEnviarRedacao()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size='md'
                centered>
                <Form onSubmit={this.enviarRedacao}>
                  <Modal.Header closeButton>
                    <h4 className='titulo'><FaCalendarWeek /> Enviar redação sobre o tema: <b>{this.state.tema.toLowerCase()}</b></h4>
                  </Modal.Header>
                  <Modal.Body>
                    <p className='text-danger text-center font-weight-bold'>
                      {this.state.totRedacoesDoTema === 0 ? `*Você tem duas tentativas para enviar a sua redação!` : ``}
                      {this.state.totRedacoesDoTema === 1 ? `*Você tem uma tentativa para enviar a sua redação!` : ``}
                    </p>

                    {this.state.totRedacoesDoTema < 2 ? (
                      <div className='container'>
                        <div className="form-group mb-3">
                          <label for="anexo">Anexar arquivo</label>
                          <input type="file" accept="image/png,application/pdf" className="form-control form-control-sm" id="anexo"
                            onChange={(e) => uploadFile(e.target.files[0])} />
                        </div>

                        <div class="progress">
                          <div id='progresso' class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                        </div>
                      </div>
                    ) : (<p className='text-danger text-center font-weight-bold'>Você atingiu o número máximo de envios para esse tema.</p>)}

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

                    <hr />

                    <h4 className='lead'>Envios</h4>

                    <div class="table-responsive-sm">
                      <table class="table table-sm text-center">
                        <thead>
                          <tr>
                            <th scope="col">Link</th>
                            <th scope="col">Nota</th>
                            <th scope="col">Corrigido</th>
                          </tr>
                        </thead>
                        <tbody>
                          {arrayRedacoes.length > 0 ? (
                            arrayRedacoes.map((redacao, index) => (
                              <tr key={index} className={redacao.corrigido === "Sim" ? `table-success` : ``}>
                                <td><a href={redacao.link_envio}>Link</a></td>
                                <td>{redacao.nota === null ? `Não definida` : redacao.nota}</td>
                                <td>{redacao.corrigido === null || redacao.corrigido === `Não` ? `Não` : redacao.corrigido}</td>
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
                  </Modal.Body>
                  <Modal.Footer>
                    {this.state.totRedacoesDoTema < 2 ? (<button id='btnCadastrarAnexo' className='button' >Confirmar</button>) : (``)}
                  </Modal.Footer>
                </Form>
              </Modal>

              <Modal
                show={this.state.modalShowHistorico}
                onHide={() => this.handlerCloseModalHistorio()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size='md'
                centered>
                <Modal.Header closeButton>
                  <h4 className='titulo'><FaCalendarWeek />Detalhes do tema: <b>{this.state.tema.toLowerCase()}</b></h4>
                </Modal.Header>
                <Modal.Body>
                  <h4 className='lead'>Envios</h4>

                  <div class="table-responsive-sm">
                    <table class="table table-sm text-center">
                      <thead>
                        <tr>
                          <th scope="col">Link</th>
                          <th scope="col">Nota</th>
                          <th scope="col">Corrigido</th>
                        </tr>
                      </thead>
                      <tbody>
                        {arrayRedacoes.length > 0 ? (
                          arrayRedacoes.map((redacao, index) => (
                            <tr key={index} className={redacao.corrigido === "Sim" ? `table-success` : ``}>
                              <td><a href={redacao.link_envio}>Link</a></td>
                              <td>{redacao.nota === null ? `Não definida` : redacao.nota}</td>
                              <td>{redacao.corrigido === null || redacao.corrigido === `Não` ? `Não` : redacao.corrigido}</td>
                            </tr>
                          ))
                        ) : (<tr className="text-center">
                          <td colSpan="10">
                            Nenhum envio realizado
                          </td>
                        </tr>)}
                      </tbody>
                    </table>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
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
   	}

	@media only screen and (min-width: 320px) and (max-width: 725px) {
		.button {
			display: block;
			width: 100%;
		}
	}
`;
