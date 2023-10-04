import { FaCalendarWeek, FaCheckSquare, FaClipboardList, FaDochub, FaFileAlt, FaFileExport, FaFilter, FaFolderOpen, FaListAlt, FaPlus, FaRegFolderOpen, FaRegSave, FaSchool, FaSearch, FaSpinner, FaUserEdit, FaUserTie, FaUsers, FaWpforms } from 'react-icons/fa';
import React, { Component } from 'react';
import api from '../../services/api';
import { getToken } from '../../services/auth';
import backgroundImage from '../../assets/sistema_chamados.png';
import { Tab } from 'bootstrap';
import { Accordion, Button, Card, Col, Container, Modal, Row, Spinner, Tabs } from 'react-bootstrap';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import styled from 'styled-components';
import { handleTelefone } from '../../services/mascaraTelefone';
import { handleCpf } from '../../services/mascaraCpf';
import { listaDeStatus } from '../../services/getListaDeStatus';
import UserContext from '../../UserContext';
import { uploadFile } from '../../services/uploadFile';
import { alfabeto } from '../../services/alfabeto';

export default class Index extends Component {
  static contextType = UserContext;
  constructor(props) {
    super();
    this.state = {
      success: '',
      error: '',
      arrayAberturaDeTurmasDoDia: [],
      arrayAberturaDeTurmas: [],
      arrayCredenciamento: [],
      dataAtual: new Date(),

      data_solicitacao: '',
      arrayEstados: [],
      arrayCidades: [],
      arrayStatus: [],
      arrayChecklistCredenciamento: [],
      modalShowCadastrarInstituicao: false,
      modalShowCredenciamento: false,
      modalShowVisualizarDocumentacao: false,
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
      arrayDocumentosDoCredenciamento: [],
      arrayInstrucoesDoChecklist: [],
      itemDochecklist: "",

      alfabeto: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    }
  }

  componentDidMount() {
    const userContext = this.context;
    this.buscaSolicitacaoDeCredenciamento(getToken(), userContext.user.id_setor);
    listaDeStatus(getToken()).then(result => this.setState({ arrayStatus: result }));
    // listaDochecklistDoCredenciamento(getToken()).then(result => this.setState({ arrayChecklistCredenciamento: result }));
  }

  setModalShowCadastrarAnexo(valor) {
    this.setState({ modalShowCadastrarAnexo: valor, error: '' });
  }

  handlerShowModalCadastrarAnexo(checklistCredenciamento) {
    this.setModalShowCadastrarAnexo(true);
    this.setState({ id_checklist_credenciamento: checklistCredenciamento.id_checklist, itemDochecklist: checklistCredenciamento.nome });
    this.listaDeInstrucoesDoChecklist(getToken(), checklistCredenciamento.id_checklist);
    this.listaDedocumentosDoCredenciamento(getToken(), checklistCredenciamento.id_checklist, this.state.id_credenciamento);
  }

  handlerCloseModalCadastrarAnexo() {
    this.setModalShowCadastrarAnexo(false);
    this.setState({ success: '', error: '' });
  }

  buscaSolicitacaoDeCredenciamento = async (token, idUsuario) => {
    try {
      const response = await fetch(`${api.baseURL}/usuarios/${idUsuario}/credenciamento`,
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
        this.listaDoChecklistDoEstado(getToken(), data.resultados[0].id_estado);
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDochecklistDoCredenciamento = async (token) => {
    try {
      const response = await fetch(`${api.baseURL}/checklist_credenciamento`,
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
        this.setState({ arrayChecklistCredenciamento: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDoChecklistDoEstado = async (token, idEstado) => {
    try {
      const response = await fetch(`${api.baseURL}/estados/${idEstado}/checklist_credenciamento`,
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
      console.log(data.resultados);
      if (data.status === 200) {
        this.setState({ arrayChecklistCredenciamento: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
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

      const response = await fetch(`${api.baseURL}/documento_credenciamento`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken(),
        },
        body: JSON.stringify({
          id_credenciamento,
          id_usuario,
          id_checklist_credenciamento,
          anexo: JSON.parse(localStorage.getItem('@link')),
          status: 8,
          cnpj,
          razao_social
        })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ success: data.msg });
        this.listaDedocumentosDoCredenciamento(getToken(), id_checklist_credenciamento, id_credenciamento);
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });

      }
    } catch (error) {
      console.log(error);
    }
  }

  listaDedocumentosDoCredenciamento = async (token, id_checklist_credenciamento, id_credenciamento) => {
    try {
      const response = await fetch(`${api.baseURL}/checklist_credenciamento/${id_checklist_credenciamento}/documento_credenciamento?id_credenciamento=${id_credenciamento}`,
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
        this.setState({ arrayDocumentosDoCredenciamento: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeInstrucoesDoChecklist = async (token, id_checklist) => {
    try {
      const response = await fetch(`${api.baseURL}/checklist_credenciamento/${id_checklist}/instrucoes`,
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
        this.setState({ arrayInstrucoesDoChecklist: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const arrayChecklistCredenciamento = this.state.arrayChecklistCredenciamento;
    const arrayDocumentosDoCredenciamento = this.state.arrayDocumentosDoCredenciamento;
    const arrayInstrucoesDoChecklist = this.state.arrayInstrucoesDoChecklist;

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
              <div className='container'>
                <Accordion>
                  <Card style={{ backgroundColor: "#000233" }}>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "#ffffff" }}>
                        <FaUsers /> Informações da solicitação
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>

                        <Card className='h-100'>

                          <Card.Body>
                            <div className="row">
                              <div className="col-sm-6">
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
                                    value={this.state.nome}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="INFORME O SEU E-MAIL">E-mail:</label>
                                  <input className="form-control form-control-sm" type="email" placeholder="INFORME O SEU E-MAIL" name="email" id="email"
                                    onChange={e => this.setState({ email: e.target.value })} autocomplete="off"
                                    value={this.state.email} />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-sm-4">
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
                              </div>
                              <div className="col-sm-4">
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
                              </div>

                              <div className="col-sm-4">
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
                              </div>
                            </div>

                            <div className='row'>
                              <div className='col-sm-4'>
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
                              </div>
                              <div className='col-sm-8'>
                                <div className="form-group">
                                  <label htmlFor="razao_social">Razão Social:*</label>
                                  <input className="form-control form-control-sm" type="text" name="razao_social" id="razao_social"
                                    value={this.state.razao_social}
                                    autocomplete="off"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className='row'>
                              <div className='col-sm-8'>
                                <div className="form-group">
                                  <label htmlFor="nome_fantasia">Nome Fantasia:*</label>
                                  <input className="form-control form-control-sm" type="text" name="nome_fantasia" id="nome_fantasia"
                                    value={this.state.nome_fantasia}
                                    autocomplete="off" />
                                </div>
                              </div>
                              <div className='col-sm-4'>
                                <div class="form-group">
                                  <label for="selectStatus">Status da Solicitação:</label>
                                  <select class="form-control form-control-sm" id="selectStatus"
                                    value={this.state.status}
                                    onChange={e => this.setState({ status: e.target.value })}>
                                    {this.state.arrayStatus.length > 0 ? (
                                      this.state.arrayStatus.map(item =>
                                        item.id === 5 || item.id === 6 || item.id === 7 ?
                                          (<option value={item.id}>{item.nome}</option>) : "")
                                    ) : (
                                      <option value="0">Nenhum resultado encontrado</option>
                                    )}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                <Accordion >
                  <Card style={{ backgroundColor: "#000233" }}>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "#ffffff" }}>
                        <FaCheckSquare /> Checkist do credenciamento
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>

                        <div style={{ height: "600px", overflowY: "scroll", padding: "30px" }}>
                          <div className="row">
                            {arrayChecklistCredenciamento.length > 0 ? (
                              arrayChecklistCredenciamento.map((checklistCredenciamento, index) => (
                                <div className="col-sm-4">
                                  <Card key={checklistCredenciamento.id_checklist} className="text-light text-center font-weight-bold zoom" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", height: "200px" }}>
                                    <Card.Header style={{height: "60px"}}>{alfabeto()[index]} - {checklistCredenciamento.nome}</Card.Header>
                                    <Card.Body>
                                      
                                      <div className='d-flex justify-content-center mt-3'>
                                        <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}><FaFolderOpen/> Instruções e anexos</button>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </div>
                              ))
                            ) : ("")}
                          </div>
                        </div>
                        {/* <div class="table-responsive-sm mb-5">
                          <div class="table-wrapper">
                            <table class="table table-hover mb-5 table-light text-center">
                              <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                                <tr>
                                  <th scope="col">Item</th>
                                  <th scope="col">Ação</th>
                                </tr>
                              </thead>
                              <tbody>
                                {arrayChecklistCredenciamento.length > 0 ? (
                                  arrayChecklistCredenciamento.map(checklistCredenciamento => (
                                    <tr>
                                      <td>{checklistCredenciamento.nome}</td>
                                      <td> <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button></td>
                                    </tr>
                                  ))
                                ) : (<tr>
                                  <td colSpan="12">Nenhuma instrução adicionada</td>
                                </tr>)}
                              </tbody>
                            </table>
                          </div>
                        </div> */}
                        {/* 
                        {arrayChecklistCredenciamento.length > 0 ? (
                          arrayChecklistCredenciamento.map((checklistCredenciamento, index) => (
                            checklistCredenciamento.id_checklist >= 15 && checklistCredenciamento.id_checklist <= 20 ?
                              ("") :
                              (<Accordion className='mt-2'>
                                <Card>
                                  <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "#000233" }}>
                                      <FaRegFolderOpen /> {checklistCredenciamento.nome}
                                    </Accordion.Toggle>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey="0">
                                    <Card.Body>

                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>) &&
                                checklistCredenciamento.id_checklist >= 21 && checklistCredenciamento.id_checklist <= 25 ?
                                ("") : (
                                  <Accordion className='mt-2'>
                                    <Card>
                                      <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "#000233" }}>
                                          <FaRegFolderOpen /> {checklistCredenciamento.nome}
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                          {checklistCredenciamento.id_checklist === 1 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">Informa que a unidade possui capacidade financeira suficiente
                                                  para manutenção do estabelecimento e do(s) curso(s) supracitado(s),
                                                  bem como capacidade técnico- administrativa para manter arquivos e
                                                  registros dos documentos escolares regularmente expedidos.</li>
                                                <li className="list-group-item text-dark">Declaração Redigida e Assinada Pelo Contador</li>
                                                <li className="list-group-item text-dark">Modelo do documento</li>
                                              </ul>

                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 2 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">Assinada por Engenheiro ou arquiteto Habilitado Pelo Crea ou CAU</li>
                                                <li className="list-group-item text-dark">O Laudo Técnico de Acessibilidade, também conhecido como Laudo para Portadores de Deficiências,
                                                  visa demonstrar que a empresa gerencia adequadamente o ambiente de trabalho,especificamente
                                                  com relação às adequações  necessárias para acessibilidade das pessoas portadoras de
                                                  deficiência e/ou com mobilidade reduzida.</li>
                                                <li className="list-group-item text-dark">Os profissionais que podem emitir esse documento são os engenheiros ou arquitetos</li>
                                              </ul>

                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 3 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">É o desenho de uma construção que específica o posicionamento e
                                                  tamanho de cada ambiente em uma área.</li>
                                                <li className="list-group-item text-dark">O profissional responsável arquiteto.</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 4 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <p>O Contrato Social é a certidão de nascimento da empresa. Nele que irão
                                                constar todos os dados básicos do negócio, como: quem são os sócios, qual o endereço da sede, quais os deveres de
                                                cada sócio com o empreendimento e qual o ramo de atuação, entre várias outras coisas!</p>

                                              <h6 className='font-weight-bold'>Os tipos de Contrato Social</h6>
                                              <p> O contrato social tem variações de formato, dependendo da natureza jurídica da empresa.
                                                É que cada tipo de empresa tem uma versão do contrato social. Vamos à elas:</p>

                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark"><b>Contrato Social da Sociedade Limitada – LTDA - </b>
                                                  Na verdade, contrato social é o nome da certidão de nascimento de uma sociedade limitada.
                                                  Ele leva em consideração as regras deste regime, podendo ser alterado,
                                                  se necessário. Isso é importante caso a sua empresa esteja definindo as atividades ainda ou precise de
                                                  constante atualização do ramo de atuação.
                                                </li>
                                                <li className="list-group-item text-dark"><b>Contrato Social do EI – Empresário Individual - </b>
                                                  O contrato social do Empresário Individual chama-se Requerimento de Empresário, e nada mais é do que um formulário estabelecido pelo Governo Federal, para ser utilizado como um substituto do Contrato Social
                                                  nas empresas que forem abertas na modalidade de Empresário Individual. O Requerimento tem uma desvantagem, não podendo ser alterado – nada de cláusulas extras e alterações.
                                                  É um formato mais recomendado para empresas que possuem uma atividade já estabelecida no mercado,
                                                  sem previsões de mudanças a médio prazo pelo menos.
                                                </li>
                                                <li className="list-group-item text-dark"><b>Contrato Social para EIRELI - </b>
                                                  Já o contrato social para empresas EIRELI chama-se Ato Constitutivo e serve aos mesmos propósitos dos já citados Contrato Social e Requerimento de Empresário.
                                                  Neste documento será possível incluir cláusulas extras e adequá-lo para o melhor uso da empresa. A sua diferença em
                                                  relação ao contrato social está nas cláusulas padrões, que são alteradas para se adequar a legislação da EIRELI.
                                                </li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 5 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">Esse documento pode ser emitido através do site da Receita Federal</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 6 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">Um contrato de aluguel estabelecimento</li>
                                                <li className="list-group-item text-dark">Esse documento pode ser emitido através do site da Receita Federal</li>
                                                <li className="list-group-item text-dark">Esse documento pode ser emitido através do site da Receita Federal</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 7 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">Breve histórico desde a fundação, informando as modalidades oferecidas e os tipos de cursos. Com fotos e descrição detalhadas das
                                                  instalações físicas e tecnológicas</li>
                                                <li className="list-group-item text-dark">Em papel timbrado.</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 8 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">É um documento que autoriza a empresa exercer as suas atividades em determinados
                                                  locais de acordo com as normas estabelecidas.</li>
                                                <li className="list-group-item text-dark">Ele é concedido pela Prefeitura</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 9 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  O documento emitido pelo Corpo de Bombeiros do seu estado ou município, assegurando que foram cumpridas todas as condições de segurança contra incêndio e pânico, após uma vistoria
                                                  realizada para garantir a efetivação das normas previstas na legislação.
                                                </li>
                                                <li className="list-group-item text-dark">OBS: Caso a sua região não tenha corpo de bombeiro é necessário solicitar na cidade vizinha.</li>
                                                <li className="list-group-item text-dark">Como é um local de trabalho e está dentro das especificações de uso coletivo essa
                                                  documentação não é dispensado para MEI, é de caráter obrigatório
                                                </li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 10 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">Foto da biblioteca física (Não enviar em JPG/ Renomear em PDF)</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 11 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  Foto das salas de aula, coordenação, banheiros etc..
                                                </li>
                                                <li className="list-group-item text-dark">Não enviar em JPG/ Renomear em PDF</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 12 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  Foto do laboratório de Informática.
                                                </li>
                                                <li className="list-group-item text-dark">Não enviar em JPG/ Renomear em PDF</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 13 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  (Não enviar em JPG/ Renomear em PDF)
                                                </li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 14 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  Declaração de idoneidade moral, documento que determinada a formalidade e responsabilidade quanto a um histórico de vida idôneo
                                                </li>
                                                <li className="list-group-item text-dark">Esse documento pode ser emitido através do site do tribunal de justiça do estado <a target='blank' href='https://www.tjdft.jus.br'>tjdft</a></li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 15 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  Declaração de idoneidade moral, documento que determinada a formalidade e responsabilidade quanto a um histórico de vida idôneo
                                                </li>
                                                <li className="list-group-item text-dark">Esse documento pode ser emitido através do site do tribunal de justiça do estado <a href='https://www.tjdft.jus.br'>tjdft</a></li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}

                                          {checklistCredenciamento.id_checklist === 26 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  É um documento emitido pela autoridade sanitária do município (Vigilância Sanitária) após
                                                  vistoria e análise das condições sanitárias dos estabelecimentos município.
                                                </li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 27 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  Esse documento pode ser emitido através do site da Receita Federal -
                                                  <a target='blank' href='http://servicos.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_solicitacao.asp'> QSA</a>
                                                </li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 28 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  Comprovantes de endereço do proprietário
                                                </li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>
                                          ) : ("")}

                                          {checklistCredenciamento.id_checklist === 29 ? (
                                            <div className='container'>
                                              <h5><FaWpforms /> Instruções</h5>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item text-dark">
                                                  É o documento específico para demonstrar as experiências profissionais para o mercado de trabalho, ou seja,
                                                  resumo de toda a trajetória profissional da pessoa.
                                                </li>
                                                <li className="list-group-item text-dark">Enviar de todos da equipe sócio administrativa</li>
                                              </ul>
                                              <div className='d-flex justify-content-center mt-2'>
                                                <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                              </div>
                                            </div>) : ("")}
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>)
                          ))
                        ) : ("")}

                        <Accordion className='mt-2'>
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "#000233" }}>
                                <FaRegFolderOpen /> Quadro da Equipe Sócio Administrativa.
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                {arrayChecklistCredenciamento.length > 0 ? (
                                  arrayChecklistCredenciamento.map((checklistCredenciamento, index) => (
                                    checklistCredenciamento.id_checklist >= 17 && checklistCredenciamento.id_checklist <= 20 ?
                                      (<Accordion className='mt-2'>
                                        <Card>
                                          <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "#000233" }}>
                                              <FaRegFolderOpen /> {checklistCredenciamento.nome}
                                            </Accordion.Toggle>
                                          </Card.Header>
                                          <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                              {checklistCredenciamento.id_checklist === 17 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      Documentação necessária: Diploma de Pedagogia ou Especialização em Gestão Escolar
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}

                                              {checklistCredenciamento.id_checklist === 18 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      Diploma de Licenciatura em Português ou Matemática
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}

                                              {checklistCredenciamento.id_checklist === 19 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      Diploma de Curso Técnico ou áreas afins
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}

                                              {checklistCredenciamento.id_checklist === 20 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      Diploma de Curso Técnico em Secretariado
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}
                                            </Card.Body>
                                          </Accordion.Collapse>
                                        </Card>
                                      </Accordion>) : ("")
                                  ))
                                ) : (<tr>
                                  <td colSpan="12">Nenhum resultado encontrado</td>
                                </tr>)}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>

                        <Accordion className='mt-2'>
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "#000233" }}>
                                11- <FaRegFolderOpen /> Certidão
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                {arrayChecklistCredenciamento.length > 0 ? (
                                  arrayChecklistCredenciamento.map((checklistCredenciamento, index) => (
                                    checklistCredenciamento.id >= 21 && checklistCredenciamento.id <= 25 ?
                                      (<Accordion className='mt-2'>
                                        <Card>
                                          <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "#000233" }}>
                                              <FaRegFolderOpen /> {checklistCredenciamento.nome}
                                            </Accordion.Toggle>
                                          </Card.Header>
                                          <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                              {checklistCredenciamento.id === 21 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      Para a consulta da CND pessoa física, basta acessar o portal da receita e informar o seu CPF.
                                                      Caso não haja pendências, será gerada a certidão negativa. Para a consulta da CND à pessoa jurídica, basta acessar o portal da receita e informar o seu CNPJ.
                                                      Caso não haja pendências, será gerada a certidão negativa
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}
                                              {checklistCredenciamento.id_checklist === 22 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      Em caso de CND relativa a débitos e tributos vinculados ao estado ou município,
                                                      o contribuinte deve acessar o site da Secretaria de Fazenda do Estado e o site da Prefeitura.
                                                      Para emitir a certidão, basta informar o número do CNPJ e em segundos a terá detalhada à disposição
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}

                                              {checklistCredenciamento.id_checklist === 23 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      Em caso de CND relativa a débitos e tributos vinculados ao estado ou município, o contribuinte deve acessar o site da Secretaria de Fazenda do Estado e o site da Prefeitura. Para emitir a certidão, basta informar o número do CNPJ e em segundos a terá detalhada
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}

                                              {checklistCredenciamento.id_checklist === 24 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      Acesse o site Consulta Regularidade do Empregador clicando aqui e preencha com o CNPJ da sua empresa.
                                                      É só clicar em consultar que irá aparecer as informações da sua empresa e a informação se ela está regular com o FGTS
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}

                                              {checklistCredenciamento._checklist === 25 ? (
                                                <div className='container'>
                                                  <h5><FaWpforms /> Instruções</h5>
                                                  <ul className="list-group list-group-flush">
                                                    <li className="list-group-item text-dark">
                                                      O usuário precisará ir até o site da Previdência Social, descer a barra de rolagem e no canto esquerdo da página
                                                      clicar no link do Certificado de Regularidade Previdenciária. Depois,
                                                      ele será encaminhado para uma nova página e deverá informar o nome do ente federativo.
                                                    </li>
                                                  </ul>
                                                  <div className='d-flex justify-content-center mt-2'>
                                                    <button className='button' onClick={() => this.handlerShowModalCadastrarAnexo(checklistCredenciamento)}> Adicionar anexo</button>
                                                  </div>
                                                </div>) : ("")}
                                            </Card.Body>
                                          </Accordion.Collapse>
                                        </Card>
                                      </Accordion>) : ("")
                                  ))
                                ) : (<tr>
                                  <td colSpan="12">Nenhum resultado encontrado</td>
                                </tr>)}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion> */}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>

              <Modal
                show={this.state.modalShowCadastrarAnexo}
                onHide={() => this.handlerCloseModalCadastrarAnexo()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size='xl'>

                <Modal.Header closeButton>
                  <h4 className='titulo'><FaCalendarWeek /> Anexos do {this.state.itemDochecklist}</h4>
                </Modal.Header>
                <Modal.Body>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-auto mr-auto'>
                            <h4 className='titulo'><FaClipboardList /> Instruções</h4>
                          </div>
                        </div>
                        <div class="table-responsive-sm mb-5">
                          <div class="table-wrapper">
                            <table class="table table-hover mb-5 table-light">
                              <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                                <tr>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {arrayInstrucoesDoChecklist.length > 0 ? (
                                  arrayInstrucoesDoChecklist.map(instrucao => (
                                    <tr>
                                      <td>{instrucao.descricao}</td>
                                    </tr>
                                  ))
                                ) : (<tr>
                                  <td colSpan="12">Nenhum instrução adicionada</td>
                                </tr>)}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <h4><FaFileExport /> Enviar um novo anexo</h4>
                      <p className='text-danger'>Os documentos enviados serão avaliados pelo setor de convênios</p>
                      <Form onSubmit={this.cadastrarDocumentoDoCredenciamento}>
                        <div className='container'>
                          <div className="form-group mb-3">
                            <label for="anexo">Anexar arquivo</label>
                            <input type="file" className="form-control form-control-sm" id="anexo" onChange={(e) => this.onChangeFileInput(e.target.files[0])} />
                          </div>

                          <div class="progress">
                            <div id='progresso' className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                          </div>
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
                        <div className='float-right'>
                          <button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
                        </div>
                      </Form>

                      <hr />
                      <h4><FaFileAlt/> Anexos</h4>
                      <hr />

                      <div className="table-responsive table-sm text-center">
                        <div className="table-responsive table-sm">
                          <div class="table-wrapper">
                            <table className="table table-bordered table-hover text-center table-light" style={{ maxHeight: "300px", overflowY: "scroll" }}>
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col" >Anexo</th>
                                  <th scope="col" >Status</th>
                                  <th scope="col" >Observação</th>
                                  <th scope="col" >Data do envio</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "300px", overflowY: "scroll" }}>
                                {arrayDocumentosDoCredenciamento.length > 0 ? (
                                  arrayDocumentosDoCredenciamento.map((anexo, index) => (
                                    <tr className={anexo.id_status === 4 ? 'table-danger' : anexo.id_status === 3 ? 'table-success' : ''}>
                                      <td><a href={anexo.anexo}>Visualizar</a></td>
                                      <td>{anexo.status}</td>
                                      <td>{parseInt(anexo.observacao) !== 0 ? anexo.observacao : ``}</td>
                                      <td>{anexo.dataHoraCriacao}</td>
                                    </tr>
                                  ))
                                ) : (<tr className="text-center">
                                  <td colSpan="15">
                                    Nenhum anexo enviado
                                  </td>
                                </tr>)}
                              </tbody>
                            </table>
                          </div>
                        </div>
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

export const Form = styled.form`
	.titulo {
	  color: #000233;
}`;