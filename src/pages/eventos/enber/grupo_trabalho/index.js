import {
  FaAngleDown,
  FaBoxes,
  FaCalendarWeek,
  FaClipboardList,
  FaHandsHelping,
  FaPlus,
  FaRegSave,
  FaRegUser,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import React, { Component } from "react";
import api from "../../../../services/api";
import { getToken } from "../../../../services/auth";
import Modal from "react-bootstrap/Modal";
import { Accordion, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import MainContent from "../../../../components/MainContent";
import Perfil from "../../../../components/Perfil";
import logo from "../../../../assets/enber.png";
import UserContext from "../../../../UserContext";
import { listaDeStatus } from '../../../../services/getListaDeStatus';
import { uploadFile } from "../../../../services/uploadFile";

export default class Index extends Component {
  static contextType = UserContext;
  constructor(props) {
    super();
    this.state = {
      success: "",
      error: "",
      arrayMembrosComSubmissao: [],
      arrayMembrosSemSubmissao: [],
      array_anexos: [],
      grupo_tabalho: 0,
      modalShowVisualizarAnexo: false,
      modalShowAvaliarAnexo: false,
      nomeMembro: "",
      totTrabalhosSubmetidos: 0,
      nomeGt: "",
      qtdTrabEnviados: 0,
      arrayStatus: [],
      id_status: 0,
      observacao: "",
      titulo: "",
      link_anexo: "",
      arquivo: null,
      id_anexo: 0
    }
  }

  componentDidMount() {
    const userContext = this.context;
    this.setState({
      nomeMembro: userContext.user.nome
    });
    this.grupoDeTrabalho(getToken(), userContext.user.id);
  }

  setModalShowVisualizarAnexo(valor) {
    this.setState({ modalShowVisualizarAnexo: valor, error: "" });
  }

  handlerShowModalVisualizarAnexo(membro) {
    this.setModalShowVisualizarAnexo(true);
    this.setState({ nome_membro: membro.nome, titulo: membro.titulo });
    this.listaDeAnexos(membro.id_usuario, membro.id_gt);
  }

  handlerCloseModalVisualizarAnexo() {
    this.setModalShowVisualizarAnexo(false);
  }

  setModalShowAvaliarAnexo(valor) {
    this.setState({ modalShowAvaliarAnexo: valor, error: "" });
  }

  handlerShowModalAvaliarAnexo(anexo) {
    console.log(anexo);
    this.setModalShowAvaliarAnexo(true);
    this.setState({ id_anexo: anexo.id, link_anexo: `https://docs.google.com/gview?url=${anexo.link}&embedded=true` });
    listaDeStatus(getToken()).then(result => result.length > 0 ?
      this.setState({ arrayStatus: result }) : this.setState({ arrayStatus: [] }));
  }

  handlerCloseModalAvaliarAnexo() {
    this.setModalShowAvaliarAnexo(false);
  }

  grupoDeTrabalho = async (token, id_usuario) => {
    try {
      const response = await fetch(
        `${api.baseURL}/lider_gt/${id_usuario}/grupo_trabalho`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        this.setState({ nomeGt: data.resultados[0].nome });
        this.listaDeMembrosDoGrupoDeTrabalho(data.resultados[0].id_grupoTrabalho, 1);
        this.listaDeMembrosDoGrupoDeTrabalho(data.resultados[0].id_grupoTrabalho, 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeMembrosDoGrupoDeTrabalho = async (id_grupoTrabalho, submissao) => {
    try {
      const response = await fetch(
        `${api.baseURL}/grupos_trabalho/${id_grupoTrabalho}/membros?submissao=${submissao}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": getToken(),
          },
        }
      );

      const data = await response.json();

      if (data.status === 200) {
        if (submissao) {
          this.setState({
            qtdTrabEnviados: data.resultados[0].qtdTrabEnviados,
            arrayMembrosComSubmissao: data.resultados
          });
          return;
        }
        this.setState({ arrayMembrosSemSubmissao: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeAnexos = async (id_usuario, id_gt) => {
    try {
      const response = await fetch(
        `${api.baseURL}/membros/${id_usuario}/anexos?id_gt=${id_gt}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": getToken(),
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        this.setState({ array_anexos: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onChangeFileInput = (e) => {
    uploadFile(e, `enber/eventos/anexos/`);
    this.setState({ arquivo: e });
  }

  avaliarAnexo = async (e) => {
    e.preventDefault();
    this.setState({ success: '', error: '' });
    try {
      const { arquivo, id_status, id_anexo, observacao } = this.state;

      if (!arquivo) {
        this.setState({ error: 'Por favor, preencher todos os campos!' });
        return;
      }

      const response = await fetch(`${api.baseURL}/anexos/${id_anexo}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken(),
        },
        body: JSON.stringify({
          id_status, anexo_resposta: JSON.parse(localStorage.getItem('@link')), observacao
        })
      });

      const data = await response.json();
      console.log(data);

      if (data.status === 200) {
        this.setState({ success: data.msg });
        //this.listaDeAnexos(id_usuario, id_gt);
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });

      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const arrayMembrosComSubmissao = this.state.arrayMembrosComSubmissao;
    const arrayMembrosSemSubmissao = this.state.arrayMembrosSemSubmissao;
    const anexos = this.state.array_anexos;

    return (
      <Container
        fluid
        style={{
          backgroundColor: "#f5f5dc",
          minHeight: "100vh",
          padding: "0px"
        }}
      >
        <Navbar style={{ backgroundColor: "#000233" }}>
          <Container>
            <Navbar.Brand href="#home">
              <img id="logo" src={logo} style={{ width: "60px" }} />
            </Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link>
                <Perfil className={`btn btn-sm btn-outline-light`} />
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Row>
          <Col xs={12}>
            <MainContent>

              <Container>
                <Row>
                  <Col>

                    <h5
                      className="font-weight-bold border-bottom"
                      style={{ color: "#000233" }}
                    >
                      <FaRegUser /> {this.state.nomeMembro}, seja bem-vindo
                      ao sistema de eventos da enber!
                    </h5>
                    <h6 className="font-weight-bold">Grupo de Trabalho Responsável: {this.state.nomeGt}</h6>
                    <p>
                      <FaHandsHelping /> Em caso de dúvidas acesse o{" "}
                      <a
                        href="https://api.whatsapp.com/send/?phone=13213009710&text&app_absent=0"
                        target="_blank"
                      >
                        link
                      </a>
                    </p>

                  </Col>
                  <Col>
                    <div className="row justify-content-center text-center text-light">
                      <div className="col-sm-6">
                        <FaUsers
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "#000233",
                          }}
                        />
                        <h6 style={{ color: "#000233" }}>Total de membros</h6>
                        <h6 style={{ color: "#000233" }}>{arrayMembrosComSubmissao.length + arrayMembrosSemSubmissao.length}</h6>
                      </div>

                      <div className="col-sm-6">
                        <FaClipboardList
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "#000233",
                          }}
                        />
                        <h6 style={{ color: "#000233" }}>Total de trabalhos submetidos</h6>
                        <h6 style={{ color: "#000233" }}>{this.state.qtdTrabEnviados}</h6>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>

              <Container className="mb-5">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header style={{ fontSize: '15pt' }}>
                      <FaUsers
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "#000233",
                        }}
                      />Inscritos que já submeteram os trabalhos - Total: {arrayMembrosComSubmissao.length}<br />
                      <FaAngleDown />
                    </Accordion.Header>
                    <Accordion.Body >

                      <div class="table-responsive table-sm">
                        <div class="table-wrapper">
                          <table class="table table-light text-center">
                            <thead
                              style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                backgroundColor: "#ffffff",
                                color: "rgb(0, 2, 51)",
                              }}>
                              <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                              {arrayMembrosComSubmissao.length > 0
                                ? arrayMembrosComSubmissao.map((membro, index) => (
                                  <tr key={index}>
                                    <td>{membro.nome}</td>
                                    <td>{membro.email}</td>
                                    <td>{membro.tipo}</td>
                                    <td>
                                      <button
                                        className="button"
                                        onClick={() =>
                                          this.handlerShowModalVisualizarAnexo(
                                            membro
                                          )}>
                                        Anexos
                                      </button>
                                    </td>
                                  </tr>
                                ))
                                : ""}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header style={{ fontSize: '15pt' }}>
                      <FaUsers
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "#000233",
                        }}
                      />Inscritos que ainda não submeteram o trabalho - Total: {arrayMembrosSemSubmissao.length}
                      <br />
                      <FaAngleDown />
                    </Accordion.Header>
                    <Accordion.Body>
                      <div class="table-responsive table-sm">
                        <div class="table-wrapper">
                          <table class="table table-light text-center">
                            <thead
                              style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                backgroundColor: "#ffffff",
                                color: "rgb(0, 2, 51)",
                              }}>
                              <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Tipo</th>
                              </tr>
                            </thead>
                            <tbody>
                              {arrayMembrosSemSubmissao.length > 0
                                ? arrayMembrosSemSubmissao.map((membro, index) => (
                                  <tr key={index}>
                                    <td>{membro.nome}</td>
                                    <td>{membro.email}</td>
                                    <td>{membro.tipo}</td>
                                  </tr>
                                ))
                                : ""}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>
              </Container>

              <Modal
                show={this.state.modalShowVisualizarAnexo}
                onHide={() => this.handlerCloseModalVisualizarAnexo()}

                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size="lg"
              >
                <Modal.Header closeButton>
                  <h4 className="titulo">
                    <FaCalendarWeek /> Anexos do evento -{" "}
                    {this.state.nome_membro}
                  </h4>
                </Modal.Header>
                <Modal.Body>

                  <h4>Anexos</h4>
                  <hr />
                  <div className="table-responsive table-sm text-center" style={{ maxHeight: "300px", overflowY: 'auto' }}>
                    <table className="table table-bordered table-hover custom-table">
                      <thead>
                        <tr>
                          <th scope="col">Titulo do documento</th>
                          <th>Coautor</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {anexos.length > 0 ? (
                          anexos.map((anexo) => (
                            <tr
                              key={anexo.id}
                              title="Clique aqui para obter mais informações sobre o anexo">
                              <td>{anexo.titulo}</td>
                              <td>{anexo.coautor}</td>
                              <td><button className="button w-100" onClick={() => this.handlerShowModalAvaliarAnexo(anexo)}>Avaliar</button></td>
                            </tr>
                          ))
                        ) : (
                          <tr className="text-center">
                            <td colSpan="10">Nenhum evento encontrado</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {
                    <div className="text-center font-weight-bold mt-3 mb-5">
                      Total de Registros: {anexos.length}
                    </div>
                  }
                </Modal.Body>
              </Modal>

              <Modal
                show={this.state.modalShowAvaliarAnexo}
                onHide={() => this.handlerCloseModalAvaliarAnexo()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size="lg"
                centered
              >
                <Modal.Header closeButton>
                  <h4 className="titulo">
                    <FaCalendarWeek /> Avaliar anexo - {this.state.titulo}
                    {this.state.nome_membro}
                  </h4>
                </Modal.Header>
                <Modal.Body>
                  <iframe src={this.state.link_anexo} style={{ width: "100%", height: "350px", marginBottom: "50px" }} frameborder="0"></iframe>
                  <Form onSubmit={this.avaliarAnexo}>
                    <Row>
                      <Col>
                        <label>Status:</label>
                        <select class="form-control form-control-sm" id="status"
                          value={this.state.id_status}
                          onChange={e => this.setState({ id_status: e.target.value })}>
                          <option value="0">Selecionar</option>
                          {this.state.arrayStatus.length > 0 ? (
                            this.state.arrayStatus.map(item =>
                              parseInt(item.id) === 3 || parseInt(item.id) === 4 ? (<option value={item.id}>{item.nome}</option>) : "")
                          ) : (
                            <option value="0">Nenhum resultado encontrado</option>
                          )}
                        </select>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Anexo:</label>
                          <input
                            type="file"
                            className="form-control form-control-sm"
                            id="documento"
                            placeholder="Documento"
                            accept="application/msword, text/plain, application/pdf"
                            onChange={(e) => this.onChangeFileInput(e.target.files[0])}
                          />
                        </div>
                        <div class="progress">
                          <div id='progresso' className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                        </div>
                      </Col>
                    </Row>

                    <div class="mt-2 mb-3">
                      <label for="exampleFormControlTextarea1" class="form-label">Observação: </label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => this.setState({observacao: e.target.value})}></textarea>
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

                    <div className='d-flex justify-content-center mt-2'>
                      <button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
                    </div>

                  </Form>
                </Modal.Body>
              </Modal>
            </MainContent>
          </Col>
        </Row>
      </Container>
    );
  }
}
