import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar, Accordion, Card, Modal } from 'react-bootstrap';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import { uploadFile } from '../../services/uploadFile';
import UserContext from '../../UserContext';
import {
  buscaSolicitacaoDeCredenciamento,
  listaDedocumentosDoCredenciamentoApi,
  listaDoChecklistDoEstado,
  listaDeInstrucoesDoChecklistApi,
} from '../../services/credenciamento/credenciamentoService';
import { FaFileAlt } from 'react-icons/fa';
import { getToken } from '../../services/auth';

class Index extends Component {
  static contextType = UserContext;

  constructor(props) {
    super();
    this.state = {
      id_credenciamento: 0,
      arquivo: null,
      progressoUpload: 0,
      arrayDocumentosDoCredenciamento: [],
      arrayChecklistCredenciamento: [],
      arrayInstrucoesDoChecklist: [],
      id_checklist_credenciamento: 0,
      success: '',
      error: '',
      modalShowCadastrarAnexo: false,
      itemDochecklist: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const userContext = this.context;
    const idUsuario = userContext.user.id;

    try {
      const credenciamentoData = await buscaSolicitacaoDeCredenciamento(idUsuario);
      if (credenciamentoData && credenciamentoData.resultados && credenciamentoData.resultados[0]) {
        const credenciamento = credenciamentoData.resultados[0];
        this.setState({
          id_credenciamento: credenciamento.id_credenciamento,
        });
        this.listaDedocumentosDoCredenciamento(credenciamento.id_credenciamento);
        this.listaDoChecklistDoEstado(credenciamento.id_estado);
      }
    } catch (error) {
      console.error('Erro ao buscar credenciamento:', error);
    }
  };

  // Corrigido para receber ambos os parâmetros
  listaDedocumentosDoCredenciamento = async (id_credenciamento, id_checklist_credenciamento = null) => {
    try {
      const response = await listaDedocumentosDoCredenciamentoApi(id_checklist_credenciamento, id_credenciamento);
      console.log('Documentos recebidos:', response);

      if (response.status === 200) {
        this.setState({ arrayDocumentosDoCredenciamento: response.resultados });
      } else {
        console.error('Erro ao carregar documentos:', response.msg);
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  };

  listaDoChecklistDoEstado = async (id_estado) => {
    try {
      const checklist = await listaDoChecklistDoEstado(id_estado);
      this.setState({ arrayChecklistCredenciamento: checklist });
    } catch (error) {
      console.error('Erro ao listar checklist de credenciamento:', error);
    }
  };

  onChangeFileInput = (e) => {
    this.setState({ arquivo: e.target.files[0] });
  };

  cadastrarDocumentoDoCredenciamento = async (e) => {
    e.preventDefault();

    const { arquivo, id_credenciamento } = this.state;
    if (!arquivo) {
      this.setState({ error: 'Por favor, selecione um arquivo para anexar.' });
      return;
    }

    try {
      await uploadFile(arquivo, `nexus/credenciamento/`, this.onProgress);
      this.listaDedocumentosDoCredenciamento(id_credenciamento);
      this.setState({ success: 'Arquivo enviado com sucesso!', progressoUpload: 0 });
    } catch (error) {
      this.setState({ error: 'Erro ao enviar documento. Tente novamente.', progressoUpload: 0 });
      console.error('Erro ao enviar documento:', error);
    }
  };

  onProgress = (percentCompleted) => {
    this.setState({ progressoUpload: percentCompleted });
  };

  handlerShowModalCadastrarAnexo = (checklistCredenciamento) => {
    if (!checklistCredenciamento) return;
    this.setState({
      modalShowCadastrarAnexo: true,
      itemDochecklist: checklistCredenciamento.nome,
      id_checklist_credenciamento: checklistCredenciamento.id_checklist,
    });
    this.listaDeInstrucoesDoChecklist(checklistCredenciamento.id_checklist);
    this.listaDedocumentosDoCredenciamento(this.state.id_credenciamento, checklistCredenciamento.id_checklist);
  };

  handlerCloseModalCadastrarAnexo = () => {
    this.setState({ modalShowCadastrarAnexo: false });
  };

  listaDeInstrucoesDoChecklist = async (id_checklist) => {
    try {
      const instrucoes = await listaDeInstrucoesDoChecklistApi(id_checklist);
      this.setState({ arrayInstrucoesDoChecklist: instrucoes });
    } catch (error) {
      console.error('Erro ao listar instruções do checklist:', error);
    }
  };

  render() {
    const {
      progressoUpload,
      arrayDocumentosDoCredenciamento,
      arrayChecklistCredenciamento,
      arrayInstrucoesDoChecklist,
      success,
      error,
      modalShowCadastrarAnexo,
      itemDochecklist,
    } = this.state;

    return (
      <Container fluid style={{ padding: '0px', minHeight: '100vh' }}>
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
                <Card>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Informações da Solicitação</Accordion.Header>
                    <Accordion.Body>
                      {/* Detalhes da solicitação aqui */}
                    </Accordion.Body>
                  </Accordion.Item>
                </Card>

                <Card>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Checklist do Credenciamento</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ height: '350px', overflowY: 'scroll', padding: '30px' }}>
                        <Row>
                          {arrayChecklistCredenciamento.length > 0 ? (
                            arrayChecklistCredenciamento.map((checklistCredenciamento, index) => (
                              <Col sm={4} key={checklistCredenciamento.id_checklist}>
                                <Card className="text-center font-weight-bold zoom" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', height: '200px', border: '1px solid #000233' }}>
                                  <Card.Header style={{ height: '60px' }}>{index + 1} - {checklistCredenciamento.nome}</Card.Header>
                                  <Card.Body>
                                    <Button onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}>
                                      Anexos e Instruções
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
                </Card>
              </Accordion>

              <Modal show={modalShowCadastrarAnexo} onHide={this.handlerCloseModalCadastrarAnexo} size="lg" centered>
                <Modal.Header closeButton>
                  <Modal.Title>Anexos do {itemDochecklist}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="col-sm-6">
                      <h4>Instruções</h4>
                      <ul>
                        {arrayInstrucoesDoChecklist.length > 0 ? (
                          arrayInstrucoesDoChecklist.map((instrucao, index) => (
                            <li key={index}>{instrucao.descricao}</li>
                          ))
                        ) : (
                          <li>Nenhuma instrução encontrada.</li>
                        )}
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <h4>Anexar um novo documento</h4>
                      <Form onSubmit={this.cadastrarDocumentoDoCredenciamento}>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label>Escolha um arquivo</Form.Label>
                          <Form.Control type="file" onChange={this.onChangeFileInput} />
                        </Form.Group>
                        {progressoUpload > 0 && (
                          <ProgressBar now={progressoUpload} label={`${progressoUpload}%`} />
                        )}
                        <Button variant="primary" type="submit">Salvar</Button>
                      </Form>
                      {success && <div className="alert alert-success mt-3">{success}</div>}
                      {error && <div className="alert alert-danger mt-3">{error}</div>}

                      <hr />
                      <h4>Anexos já enviados</h4>
                      <div className="table-responsive table-sm">
                        <table className="table table-bordered table-hover text-center table-light">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Anexo</th>
                              <th scope="col">Status</th>
                              <th scope="col">Observação</th>
                              <th scope="col">Data do envio</th>
                            </tr>
                          </thead>
                          <tbody>
                            {arrayDocumentosDoCredenciamento.length > 0 ? (
                              arrayDocumentosDoCredenciamento.map((anexo, index) => (
                                <tr key={index} className={anexo.id_status === 4 ? 'table-danger' : anexo.id_status === 3 ? 'table-success' : ''}>
                                  <td><a href={anexo.anexo} target="_blank" rel="noopener noreferrer">Visualizar</a></td>
                                  <td>{anexo.status}</td>
                                  <td>{anexo.observacao || ''}</td>
                                  <td>{anexo.dataHoraCriacao}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4">Nenhum documento encontrado</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
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

export default Index;
