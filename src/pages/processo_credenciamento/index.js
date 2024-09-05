import React, { Component } from 'react';
import {
  FaUsers,
  FaCheckSquare,
  FaFolderOpen,
  FaFileAlt,
} from 'react-icons/fa';
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
import backgroundImage from '../../assets/sistema_chamados.png';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import UserContext from '../../UserContext';
import { getToken } from '../../services/auth';
import { handleTelefone } from '../../services/mascaraTelefone';
import { handleCpf } from '../../services/mascaraCpf';
import { listaDeStatus } from '../../services/getListaDeStatus';
import { uploadFile } from '../../services/uploadFile';
import api from '../../services/api';
import { alfabeto } from '../../services/alfabeto';

export default class Index extends Component {
  static contextType = UserContext;

  constructor(props) {
    super();
    this.state = {
      success: '',
      error: '',
      arrayStatus: [],
      arrayChecklistCredenciamento: [],
      arrayDocumentosDoCredenciamento: [],
      arrayInstrucoesDoChecklist: [],
      modalShowCadastrarAnexo: false,
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      cnpj: '',
      razao_social: '',
      nome_fantasia: '',
      status: '',
      arquivo: null, // Arquivo inicializado como nulo
      id_checklist_credenciamento: 0,
      itemDochecklist: '',
    };
  }

  componentDidMount() {
    this.listaDeStatus();
  }

  listaDeStatus = async () => {
    try {
      const result = await listaDeStatus(getToken());
      this.setState({ arrayStatus: result });
    } catch (error) {
      console.log(error);
    }
  };

  setModalShowCadastrarAnexo = (value) => {
    this.setState({ modalShowCadastrarAnexo: value, error: '' });
  };

  handlerShowModalCadastrarAnexo = (checklistCredenciamento) => {
    if (!checklistCredenciamento) return;
    this.setModalShowCadastrarAnexo(true);
    this.setState({
      id_checklist_credenciamento: checklistCredenciamento.id_checklist,
      itemDochecklist: checklistCredenciamento.nome,
    });
    // Call any other needed functions here.
  };

  handlerCloseModalCadastrarAnexo = () => {
    this.setModalShowCadastrarAnexo(false);
    this.setState({ success: '', error: '' });
  };

  onChangeFileInput = (e) => {
    const file = e.target.files[0]; // Captura o primeiro arquivo
    this.setState({ arquivo: file });
  };

  cadastrarDocumentoDoCredenciamento = async (e) => {
    e.preventDefault();
    const { cnpj, razao_social, id_checklist_credenciamento, arquivo } = this.state;

    if (!arquivo) {
      this.setState({ error: 'Por favor, preencher o campo de anexo!' });
      return;
    }

    try {
      const uploadResponse = uploadFile(arquivo, `nexus/credenciamento/`);
      const fileLink = uploadResponse.link;

      const response = await fetch(`${api.baseURL}/documento_credenciamento`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken(),
        },
        body: JSON.stringify({
          id_checklist_credenciamento,
          anexo: fileLink, // Usando o link retornado pelo upload
          status: 8,
          cnpj,
          razao_social,
        }),
      });

      const data = await response.json();
      if (data.status === 200) {
        this.setState({ success: data.msg });
        // Atualize a lista de documentos após o envio
      } else {
        this.setState({ error: data.msg });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: 'Erro ao realizar upload do arquivo.' });
    }
  };

  render() {
    const { arrayChecklistCredenciamento, arrayDocumentosDoCredenciamento, arrayInstrucoesDoChecklist } = this.state;

    return (
      <Container fluid style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <Menu />
        <Row>
          <Col xs={12}>
            <AdminNavbar id_usuario={this.state.id_usuario} />
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
                                <Card.Header>{alfabeto()[index]} - {checklistCredenciamento.nome}</Card.Header>
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
