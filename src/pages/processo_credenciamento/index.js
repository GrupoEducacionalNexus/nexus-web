import React, { Component } from 'react';
import UserContext from '../../UserContext';
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Form
} from 'react-bootstrap';
import styled from 'styled-components';
import { getToken } from '../../services/auth';
import { handleTelefone } from '../../services/mascaraTelefone';
import { listaDeStatus } from '../../services/getListaDeStatus';
import { handleCpf } from '../../services/mascaraCpf';
import { uploadFile } from '../../services/uploadFile';
import {
  buscaSolicitacaoDeCredenciamentoApi,
  cadastrarDocumentoDoCredenciamentoApi,
  listaDochecklistDoCredenciamentoApi,
  listaDoChecklistDoEstado,
  listaDeInstrucoesDoChecklistApi,
  listaDedocumentosDoCredenciamentoApi
} from '../../services/credenciamento/credenciamentoService';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import {
  FaCheckSquare,
  FaFileAlt,
  FaFolderOpen,
  FaUsers,
} from 'react-icons/fa';
import backgroundImage from '../../assets/sistema_chamados.png';

export default class Index extends Component {
  static contextType = UserContext;
  constructor(props) {
    super();
    this.state = {
      success: '',
      error: '',
      arrayCredenciamento: [],
      dataAtual: new Date(),
      data_solicitacao: '',
      arrayEstados: [],
      arrayCidades: [],
      arrayStatus: [],
      arrayChecklistCredenciamento: [],
      arrayDocumentosDoCredenciamento: [],
      arrayInstrucoesDoChecklist: [],
      modalShowCadastrarAnexo: false,
      estado: '',

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
      status: '',
      arquivo: '',
      id_credenciamento: 0,
      id_checklist_credenciamento: 0,
      itemDochecklist: "",
    }
  }

  componentDidMount() {
    const userContext = this.context;
    this.buscaSolicitacaoDeCredenciamento(userContext.user.id);
    listaDeStatus(getToken()).then(result => this.setState({ arrayStatus: result }));
    this.listaDochecklistDoCredenciamento(
      result => this.setState({ arrayChecklistCredenciamento: result }));
  }

  setModalShowCadastrarAnexo = (valor) => {
    this.setState({ modalShowCadastrarAnexo: valor, error: '' });
  };

  handlerShowModalCadastrarAnexo = (checklistCredenciamento) => {
    if (!checklistCredenciamento) return;
    this.setModalShowCadastrarAnexo(true);
    this.setState({
      id_checklist_credenciamento: checklistCredenciamento.id_checklist,
      itemDochecklist: checklistCredenciamento.nome,
    });
    this.listaDeInstrucoesDoChecklist(
      checklistCredenciamento.id_checklist
    );
    this.listaDedocumentosDoCredenciamento(
      checklistCredenciamento.id_checklist,
      this.state.id_credenciamento
    );
  }

  handlerCloseModalCadastrarAnexo = () => {
    this.setModalShowCadastrarAnexo(false);
    this.setState({ success: '', error: '' });
  }

  buscaSolicitacaoDeCredenciamento = async (idUsuario) => {
    const data = await buscaSolicitacaoDeCredenciamentoApi(idUsuario);
    try {
      if (data.status === 200) {
        this.setState({
          //Dados do gestor
          id_usuario: data.resultados[0].id_usuario,
          id_credenciamento: data.resultados[0].id_credenciamento,
          nome: data.resultados[0].gestor,
          email: data.resultados[0].email,
          telefone: data.resultados[0].telefone,
          cpf: data.resultados[0].cpf_cnpj,
          senha: data.resultados[0].senha,
          confirmarSenha: data.resultados[0].senha,

          //Dados da instituição
          cnpj: data.resultados[0].cnpj,
          razao_social: data.resultados[0].razao_social,
          nome_fantasia: data.resultados[0].nome_fantasia,
          id_instituicao: data.resultados[0].nome,
          senha: data.resultados[0].senha,
          confirmarSenha: data.resultados[0].senha,
          status: data.resultados[0].id_status,
          id_credenciamento: data.resultados[0].id_credenciamento
        });
        this.listaDoChecklistDoEstado(data.resultados[0].id_estado);
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDochecklistDoCredenciamento = async (token) => {
    await listaDochecklistDoCredenciamentoApi(token).then(
      result => this.setState({ arrayChecklistCredenciamento: result }));
  };

  listaDoChecklistDoEstado = async (idEstado) => {
    await listaDoChecklistDoEstado(idEstado).then(
      result => this.setState({ arrayChecklistCredenciamento: result }));
  };

  onChangeFileInput = (e) => {
    console.log(e);
    uploadFile(e, `nexus/credenciamento/`);
    this.setState({ arquivo: e });
  }

  cadastrarDocumentoDoCredenciamento = async (e) => {
    e.preventDefault();
    this.setState({ success: '', error: '' });
    try {
      const { cnpj, razao_social, id_usuario, id_credenciamento, arquivo, id_checklist_credenciamento } = this.state;

      if (!arquivo) {
        this.setState({ error: 'Por favor, preencher o campo de anexo!' });
        return;
      }

      const response = await cadastrarDocumentoDoCredenciamentoApi({
        id_credenciamento,
        id_usuario,
        id_checklist_credenciamento,
        anexo: JSON.parse(localStorage.getItem('@link')),
        status: 8,
        cnpj,
        razao_social
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ success: data.msg });
        this.listaDedocumentosDoCredenciamentoApi(getToken(), id_checklist_credenciamento, id_credenciamento);
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });

      }
    } catch (error) {
      console.log(error);
    }
  }

  listaDedocumentosDoCredenciamento = async (token, id_checklist_credenciamento, id_credenciamento) => {
    await listaDedocumentosDoCredenciamentoApi(token, id_checklist_credenciamento, id_credenciamento).then(
      result => this.setState({ arrayDocumentosDoCredenciamento: result })
    )
  }

  listaDeInstrucoesDoChecklist = async (id_checklist) => {
    await listaDeInstrucoesDoChecklistApi(id_checklist).then(
      result => this.setState({ arrayInstrucoesDoChecklist: result })
    )
  }

  // listaDedocumentosDoCredenciamento = async (token, id_checklist_credenciamento, id_credenciamento) => {
  //   try {
  //     const response = await fetch(`${api.baseURL}/checklist_credenciamento/${id_checklist_credenciamento}/documento_credenciamento?id_credenciamento=${id_credenciamento}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'x-access-token': token
  //         }
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.status === 200) {
  //       this.setState({ arrayDocumentosDoCredenciamento: data.resultados });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // listaDeInstrucoesDoChecklist = async (token, id_checklist) => {
  //   try {
  //     const response = await fetch(`${api.baseURL}/checklist_credenciamento/${id_checklist}/instrucoes`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'x-access-token': token
  //         }
  //       }
  //     );

  //     const data = await response.json();
  //     console.log(data);
  //     if (data.status === 200) {
  //       this.setState({ arrayInstrucoesDoChecklist: data.resultados });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render() {
    const { arrayChecklistCredenciamento, arrayDocumentosDoCredenciamento, arrayInstrucoesDoChecklist } = this.state;

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
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <FaUsers /> Informações da solicitação
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Row>
                        <Col sm={6}>
                          <Form.Group controlId="nome">
                            <Form.Label>Nome completo:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="INFORME O SEU NOME"
                              value={this.state.nome}
                              onChange={(e) => this.setState({ nome: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group controlId="email">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="INFORME O SEU E-MAIL"
                              value={this.state.email}
                              onChange={(e) => this.setState({ email: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={4}>
                          <Form.Group controlId="telefone">
                            <Form.Label>Telefone:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="INFORME O SEU TELEFONE"
                              value={this.state.telefone}
                              onChange={(e) => handleTelefone(e.target.value).then((result) => this.setState({ telefone: result }))}
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={4}>
                          <Form.Group controlId="cpf">
                            <Form.Label>CPF:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="INFORME O SEU CPF"
                              value={this.state.cpf}
                              onChange={(e) => handleCpf(e.target.value).then((result) => this.setState({ cpf: result }))}
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={4}>
                          <Form.Group controlId="cnpj">
                            <Form.Label>CNPJ:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="INFORME O SEU CNPJ"
                              value={this.state.cnpj}
                              onChange={(e) => this.setState({ cnpj: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <FaCheckSquare /> Checklist do credenciamento
                  </Accordion.Header>
                  <Accordion.Body>
                    <div style={{ height: '350px', overflowY: 'scroll', padding: '30px' }}>
                      <Row>
                        {arrayChecklistCredenciamento.length > 0 ? (
                          arrayChecklistCredenciamento.map((checklistCredenciamento, index) => (
                            <Col sm={4} key={checklistCredenciamento.id_checklist}>
                              <Card className="text-center font-weight-bold zoom" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', height: '200px', border: '1px solid #000233' }}>
                                <Card.Header>{index + 1} - {checklistCredenciamento.nome}</Card.Header>
                                <Card.Body>
                                  <Button onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}>
                                    <FaFolderOpen /> Instruções e anexos
                                  </Button>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))
                        ) : (
                          <Col>Nenhum checklist encontrado</Col>
                        )}
                      </Row>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Modal
                show={this.state.modalShowCadastrarAnexo}
                onHide={this.handlerCloseModalCadastrarAnexo}
                size="lg"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Anexos do {this.state.itemDochecklist}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.cadastrarDocumentoDoCredenciamento}>
                    <Form.Group controlId="formFile">
                      <Form.Label>Anexar arquivo</Form.Label>
                      <Form.Control type="file" onChange={this.onChangeFileInput} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Enviar
                    </Button>
                  </Form>
                  <hr />
                  <h4><FaFileAlt /> Anexos</h4>
                  <div className="table-responsive table-sm">
                    <table className="table table-bordered table-hover text-center table-light">
                      <thead className="thead-light">
                        <tr>
                          <th>Anexo</th>
                          <th>Status</th>
                          <th>Observação</th>
                          <th>Data do envio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {arrayDocumentosDoCredenciamento.length > 0 ? (
                          arrayDocumentosDoCredenciamento.map((anexo, index) => (
                            <tr key={index} className={anexo.id_status === 4 ? 'table-danger' : anexo.id_status === 3 ? 'table-success' : ''}>
                              <td><a href={anexo.anexo}>Visualizar</a></td>
                              <td>{anexo.status}</td>
                              <td>{anexo.observacao}</td>
                              <td>{anexo.dataHoraCriacao}</td>
                            </tr>
                          ))
                        ) : (
                          <tr className="text-center">
                            <td colSpan="4">Nenhum anexo enviado</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Modal.Body>
              </Modal>
            </MainContent>
          </Col>
        </Row>
      </Container>
    );
  }
}

export const FormStyled = styled.form`
	.titulo {
	  color: #000233;
  }
`;
