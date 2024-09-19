import { FaCalendarWeek, FaCheckSquare, FaClipboardList, FaDochub, FaFilter, FaListAlt, FaPlus, FaRegCreditCard, FaRegFolderOpen, FaRegSave, FaSchool, FaSearch, FaSpinner, FaUserEdit, FaUserGraduate, FaUserTie, FaUsers, FaWpforms } from 'react-icons/fa';
import React, { Component } from 'react';
import api from '../../services/api';
import { getToken } from '../../services/auth';
import backgroundImage from '../../assets/sistema_chamados.png';
import { Tab } from 'bootstrap';
import { Card, Col, Container, Modal, Row, Tabs } from 'react-bootstrap';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import FloatingMenu from '../../components/FloatingMenu';
import styled from 'styled-components';
import { handleTelefone } from '../../services/mascaraTelefone';
import { handleCpf } from '../../services/mascaraCpf';
import { listaDeStatus } from '../../services/getListaDeStatus';
import { listaDochecklistDoCredenciamento } from '../../services/getListaDochecklistDoCredenciamento';
import Plot from 'react-plotly.js';


export default class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      successAtualizarCredenciamento: '',
      errorAtualizarCredenciamento: '',
      successAvaliacaoDoAnexo: '',
      errorAvaliacaoDoAnexo: '',
      successChecklistGeral: '',
      errorChecklistGeral: '',
      successChecklistDoEstado: '',
      errorChecklistDoEstado: '',
      successInstrucao: '',
      errorInstrucao: '',

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
      arrayChecklistCredenciamentoDoEstado: [],
      arrayInstrucoesDoChecklist: [],
      arrayCredenciamentoXanexosDoChecklist: [],
      modalShowCadastrarInstituicao: false,
      modalShowCredenciamento: false,
      modalShowVisualizarDocumentacao: false,
      modalShowAvaliacaoDoAnexoDoCredenciamento: false,
      modalShowChecklistDoEstado: false,
      modalShowCadastrarItemDoChecklist: false,
      modalShowCadastrarInstrucaoDoChecklist: false,
      modalShowDashboard: false,
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
      arrayAnexosDoCredenciamento: [],

      //Dados do cocumento do credenciamento
      id_documento_credenciamento: 0,
      observacao: 0,

      //Dados do item do checklist
      descricao: '',
      id_checklist: 0,
      arrayChecklistXestado: [],

      //Dados da instrução do checklist
      id_instrucao: 0,
      descricao_instrucao: '',

      item_checklist: '',
      idAberturaTurma: 0,

      arrayQuantidadeSolicitacoesPorEstado: [],
      layoutQuantidadeSolicitacoesPorEstado: {},
      arrayPercentualStatusSolicitacoes: [],
      layoutPercentualStatusSolicitacoes: {},
      arrayQuantidadeSolicitacoesDasInstituicoesPorEstado: [],
      layoutQuantidadeSolicitacoesDasInstituicoesPorEstado: {},
      arraySolicitacoesDeAberturaDeTurmaMensal: [],
      layoutSolicitacoesDeAberturaDeTurmaMensal: {},
      totInstituicoesQueEnviaramDocDoCredenciamento: 0
    }
  }

  componentDidMount() {
    this.listaDeAberturaDeTurmas(getToken(), `${parseInt(this.state.dataAtual.getMonth()) + 1 <= 9 ? `${this.state.dataAtual.getFullYear()}-0${this.state.dataAtual.getMonth() + 1}-${parseInt(this.state.dataAtual.getDate()) <= 9 ? `0${this.state.dataAtual.getDate()}` : this.state.dataAtual.getDate()}` :
      `${this.state.dataAtual.getFullYear()}-${this.state.dataAtual.getMonth() + 1}-${parseInt(this.state.dataAtual.getDate()) <= 9 ? `0${this.state.dataAtual.getDate()}` : this.state.dataAtual.getDate()}`}`);
    this.listaDeAberturaDeTurmas(getToken());
    this.listaDeEstados();
    listaDeStatus(getToken()).then(result => result.length > 0 ?
      this.setState({ arrayStatus: result }) : this.setState({ arrayStatus: [] }));
  }

  setModalShowCredenciamento(valor) {
    this.setState({ modalShowCredenciamento: valor, success: '', error: '' });
  }

  handlerShowModalCredenciamento(estado) {
    this.setModalShowCredenciamento(true);
    this.setState({ estado: estado.nome });
    this.listaDeCredenciamentoPorEstado(getToken(), estado.id);
    // listaDochecklistDoCredenciamento(getToken()).then(result => this.setState({ arrayChecklistCredenciamento: result }));
  }

  handlerCloseModalCredenciamento() {
    this.setModalShowCredenciamento(false);
  };

  setModalShowVisualizarDocumentacao(valor) {
    this.setState({ modalShowVisualizarDocumentacao: valor, success: '', error: '' });
  }

  handlerShowModalVisualizarDocumentacao(credenciamento) {
    this.setModalShowVisualizarDocumentacao(true);

    this.setState({
      //Dados do gestor
      id_usuario: credenciamento.id_usuario,
      id_credenciamento: credenciamento.id_credenciamento,
      nome: credenciamento.gestor,
      email: credenciamento.email,
      telefone: credenciamento.telefone,
      cpf: credenciamento.cpf_cnpj,
      senha: credenciamento.senha,
      confirmarSenha: credenciamento.senha,

      //Dados da instituição
      cnpj: credenciamento.cnpj,
      razao_social: credenciamento.razao_social,
      nome_fantasia: credenciamento.nome_fantasia,
      id_instituicao: credenciamento.nome,
      senha: credenciamento.senha,
      confirmarSenha: credenciamento.senha,
      status: credenciamento.id_status
    });

    //listaDeStatus(getToken()).then(result => this.setState({ arrayStatus: result }));

    this.listaDoChecklistDoEstado(getToken(), credenciamento.id_estado);
    this.listaDeAnexosCredenciamento(getToken(), credenciamento.id_credenciamento);

  }

  handlerCloseModalVisualizarDocumentacao() {
    this.setModalShowVisualizarDocumentacao(false);
    this.setState({ successAtualizarCredenciamento: '', errorAtualizarCredenciamento: '' });
  };

  setModalShowAvaliacaoDoAnexoDoCredenciamento(valor) {
    this.setState({ modalShowAvaliacaoDoAnexoDoCredenciamento: valor, success: '', error: '' });
  }

  handlerShowModalAvaliacaoDoAnexoDoCredenciamento(documento) {
    console.log(documento)
    this.setModalShowAvaliacaoDoAnexoDoCredenciamento(true);
    this.setState({
      id_documento_credenciamento: documento.id_documento_credenciamento,
      id_status: documento.id_status,
      observacao: documento.observacao,
      item_checklist: documento.item_checklist
    })
  }

  handlerCloseModalAvaliacaoDoAnexoDoCredenciamento() {
    this.setModalShowAvaliacaoDoAnexoDoCredenciamento(false);
    this.setState({ successAvaliacaoDoAnexo: '', errorAvaliacaoDoAnexo: '' });
  };

  setModalShowChecklistDoEstado(valor) {
    this.setState({ modalShowChecklistDoEstado: valor, success: '', error: '' });
  }

  handlerShowModalChecklistDoEstado(estado) {
    this.setModalShowChecklistDoEstado(true);
    this.setState({ id_estado: estado.id, estado: estado.nome });
    listaDochecklistDoCredenciamento(getToken()).then(result => this.setState({ arrayChecklistCredenciamento: result }));
    this.listaDoChecklistDoEstado(getToken(), estado.id);
  }

  handlerCloseModalChecklistDoEstado() {
    this.setModalShowChecklistDoEstado(false);
    this.setState({
      successChecklistGeral: '',
      errorChecklistGeral: '',
      successChecklistDoEstado: '',
      errorChecklistDoEstado: '',
    });
  };

  setModalShowDashboard(valor) {
    this.setState({ modalShowDashboard: valor, success: '', error: '' });
  }

  handlerShowModalDashboard() {
    this.setModalShowDashboard(true);
    this.quantidadeDeSolicitacoesDeAberturaDeTurmaPorEstado(getToken());
    this.percentualDoStatusDasSolicitacoesDeAberturaDeTurma(getToken());
    this.solicitacoesDeAberturaDeTurmaMensal(getToken(), 0);
  }

  handlerCloseModalDashboard() {
    this.setModalShowDashboard(false);

  };

  setModalShowCadastrarItemDoChecklist(valor) {
    this.setState({ modalShowCadastrarItemDoChecklist: valor, success: '', error: '' });
  }

  handlerShowModalCadastrarItemDoChecklist(item_checklist = null) {
    this.setModalShowCadastrarItemDoChecklist(true);
    this.listaDeInstrucoesDoChecklist(getToken(), item_checklist.id);
    if (item_checklist !== null) {
      this.setState({
        id_checklist: item_checklist.id, descricao: item_checklist.nome
      });
      return;
    }

    this.setState({
      descricao: ""
    });
  }

  handlerCloseModalCadastrarItemDoChecklist() {
    this.setModalShowCadastrarItemDoChecklist(false);
    this.setState({
      successChecklistGeral: '',
      errorChecklistGeral: ''
    });
  };

  setModalShowCadastrarInstrucaoDoChecklist(valor) {
    this.setState({ modalShowCadastrarInstrucaoDoChecklist: valor });
  }

  handlerShowModalCadastrarInstrucaoDoChecklist(item_checklist = null) {
    this.setModalShowCadastrarInstrucaoDoChecklist(true);
    if (item_checklist !== null) {
      this.setState({
        id_checklist: item_checklist.id, descricao: item_checklist.nome
      });
      return;
    }

    this.setState({
      descricao_instrucao: ""
    });
  }

  handlerCloseModalCadastrarInstrucaoDoChecklist() {
    this.setModalShowCadastrarInstrucaoDoChecklist(false);
  };

  listaDeAberturaDeTurmas = async (token, dataAtual = "", cnpj = "", nome_fantasia = "", data_solicitacao = "", estado = "") => {
    try {
      const response = await fetch(`${api.baseURL}/abertura_turma?dataAtual=${dataAtual}&cnpj=${cnpj}&nome_fantasia=${nome_fantasia}&data_solicitacao=${data_solicitacao}&estado=${estado}`,
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

        if (dataAtual !== "") {
          this.setState({ arrayAberturaDeTurmasDoDia: data.resultados });
          return;
        }

        this.setState({ arrayAberturaDeTurmas: data.resultados });

      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeEstados = async () => {
    try {
      const response = await fetch(`${api.baseURL}/estados`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ arrayEstados: data.resultados });
      }

    } catch (error) {
      console.log(error)
    }

  }

  quantidadeDeSolicitacoesDeAberturaDeTurmaPorEstado = async (token) => {
    try {
      const response = await fetch(`${api.baseURL}/abertura_turma/quantidade_solicitacoes`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });

      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        this.setState({
          layoutQuantidadeSolicitacoesPorEstado: {
            title: 'Aberturas de turma por estado em 2023',
            xaxis: { title: 'Estado' },
            yaxis: { title: 'Quantidade de solicitações' },
            width: 600
          },
          arrayQuantidadeSolicitacoesPorEstado: [
            {
              x: data.resultados[0],
              y: data.resultados[1],
              type: 'bar',
              marker: { color: 'blue' },
            },
          ]
        });
      }

    } catch (error) {
      console.log(error)
    }

  }

  percentualDoStatusDasSolicitacoesDeAberturaDeTurma = async (token) => {
    try {
      const response = await fetch(`${api.baseURL}/abertura_turma/percentual_solicitacoes`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });

      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        this.setState({
          arrayPercentualStatusSolicitacoes: [
            {
              labels: data.resultados[0],
              values: data.resultados[1],
              type: 'pie',
            },
          ],

          layoutPercentualStatusSolicitacoes: {
            title: 'Status das solicitações de abertura de turma',
            width: 600
          }
        });
      }

    } catch (error) {
      console.log(error)
    }

  }

  quantidadeDeSolicitacoesDeAberturaDeTurmaDasInstituicoesPorEstado = async (token, estado) => {
    try {
      const response = await fetch(`${api.baseURL}/abertura_turma/quantidade_solicitacoes_instituicoes?estado=${estado}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });

      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        this.setState({
          layoutQuantidadeSolicitacoesDasInstituicoesPorEstado: {
            title: 'Aberturas de turma por instituições em 2023',
            xaxis: { title: 'Instituições' },
            yaxis: { title: 'Quantidade de solicitações' },
            width: 600
          },
          arrayQuantidadeSolicitacoesDasInstituicoesPorEstado: [
            {
              x: data.resultados[0],
              y: data.resultados[1],
              type: 'bar',
              marker: { color: 'blue' },
            },
          ]
        });
      }

    } catch (error) {
      console.log(error)
    }
  }

  solicitacoesDeAberturaDeTurmaMensal = async (token, ano) => {
    try {
      const response = await fetch(`${api.baseURL}/abertura_turma/solicitacao_mensal?ano=${ano}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });

      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        this.setState({
          layoutSolicitacoesDeAberturaDeTurmaMensal: {
            title: 'Aberturas de turma mensal',
            xaxis: { title: 'Meses' },
            yaxis: { title: 'Quantidade de solicitações' },
            width: 600
          },
          arraySolicitacoesDeAberturaDeTurmaMensal: [
            {
              x: data.resultados[0],
              y: data.resultados[1],
              type: 'bar',
              marker: { color: 'blue' },
            },
          ]
        });
      }

    } catch (error) {
      console.log(error)
    }
  }

  listaDeCredenciamentoPorEstado = async (token, idEstado) => {
    try {
      const response = await fetch(`${api.baseURL}/estados/${idEstado}/credenciamento`,
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
        this.setState({ arrayCredenciamento: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeAnexosCredenciamento = async (token, id_credenciamento) => {
    try {
      const response = await fetch(`${api.baseURL}/credenciamento/${id_credenciamento}/documento_credenciamento`,
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

        this.setState({ arrayAnexosDoCredenciamento: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  atualizarCredenciamento = async (e) => {
    e.preventDefault();
    try {
      const {
        id_usuario, nome, email, telefone,
        cpf, senha, confirmarSenha,
        cnpj, razao_social, status,
        nome_fantasia, id_credenciamento
      } = this.state;

      if (!nome || !email || !telefone || !cpf ||
        !cnpj || !razao_social || !nome_fantasia) {
        this.setState({ error: "Por favor, preencher todos os campos." });
        return
      }


      if (senha.localeCompare(confirmarSenha) === -1) {
        this.setState({ error: 'Por favor, informe senhas iguais!' });
        return;
      }

      const response = await fetch(`${api.baseURL}/credenciamento/${id_credenciamento}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken(),
        },
        body: JSON.stringify({
          id_usuario, nome, email, telefone,
          cpf, senha, id_credenciamento, cnpj,
          razao_social, nome_fantasia, status
        })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ successAtualizarCredenciamento: data.msg, errorAtualizarCredenciamento: "" });
      }

      if (data.status === 400) {
        this.setState({ errorAtualizarCredenciamento: data.msg, successAtualizarCredenciamento: "" });
      }
    } catch (error) {
      console.log(error)
    }
  }

  avaliarDocumentoDoCredenciamento = async (e) => {
    e.preventDefault();
    try {
      const { id_documento_credenciamento, id_status, observacao, email, item_checklist } = this.state;

      if (!id_status) {
        this.setState({ error: "Por favor, preencher todos os campos." });
        return
      }

      const response = await fetch(`${api.baseURL}/documento_credenciamento/${id_documento_credenciamento}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken(),
        },
        body: JSON.stringify({
          id_documento_credenciamento,
          id_status,
          observacao,
          email,
          item_checklist
        })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ successAvaliacaoDoAnexo: data.msg, errorAvaliacaoDoAnexo: "" });
        this.listaDeAnexosCredenciamento(getToken(), this.state.id_credenciamento);
      }

      if (data.status === 400) {
        this.setState({ errorAvaliacaoDoAnexo: data.msg, successAvaliacaoDoAnexo: "" });
      }
    } catch (error) {
      console.log(error)
    }
  }

  adicionarItemDoChecklistDoEstado = async (id_checklist, id_estado) => {
    this.setState({ successChecklistDoEstado: '', errorChecklistDoEstado: '' });
    try {
      const response = await fetch(`${api.baseURL}/checklist_credenciamentoxestado`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken()
        },
        body: JSON.stringify({
          id_checklist, id_estado
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ successChecklistDoEstado: data.msg });
        this.listaDoChecklistDoEstado(getToken(), id_estado);
      }

      if (data.status === 400) {
        this.setState({ errorChecklistDoEstado: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }

  removerItemDoChecklistDoEstado = async (id, id_checklist, id_estado) => {
    this.setState({ successChecklistDoEstado: '', errorChecklistDoEstado: '' });
    try {
      const response = await fetch(`${api.baseURL}/checklist_credenciamentoxestado/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken()
        },
        body: JSON.stringify({
          id_checklist, id_estado
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ successChecklistDoEstado: data.msg });
        this.listaDoChecklistDoEstado(getToken(), id_estado);
      }

      if (data.status === 400) {
        this.setState({ errorChecklistDoEstado: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }

  cadastrarEAtualizarItemDoChecklistGeral = async (e) => {
    e.preventDefault();
    this.setState({ successChecklistGeral: '', errorChecklistGeral: '' });
    try {
      const { id_checklist, descricao } = this.state;

      if (!descricao) {
        this.setState({ errorChecklistGeral: 'Por favor, preencher o campo de descrição' });
        return;
      }

      const url = id_checklist === 0 ? `${api.baseURL}/checklist_credenciamento` : `${api.baseURL}/checklist_credenciamento/${id_checklist}`;

      const response = await fetch(`${url}`, {
        method: id_checklist === 0 ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken(),
        },
        body: JSON.stringify({ descricao })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ successChecklistGeral: data.msg });
        listaDochecklistDoCredenciamento(getToken()).then(result => this.setState({ arrayChecklistCredenciamento: result }));
      }

      if (data.status === 400) {
        this.setState({ errorChecklistGeral: data.msg });

      }
    } catch (error) {
      console.log(error);
    }
  }

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
      if (data.status === 200) {
        this.setState({ arrayChecklistCredenciamentoDoEstado: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  cadastrarEAtualizarInstrucaoDoChecklist = async (e) => {
    e.preventDefault();
    this.setState({ successInstrucao: '', errorInstrucao: '' });
    try {
      const { id_checklist, id_instrucao, descricao_instrucao } = this.state;

      if (!descricao_instrucao) {
        this.setState({ errorInstrucao: 'Por favor, preencher o campo de descrição' });
        return;
      }

      const url = id_instrucao === 0 ? `${api.baseURL}/checklist_credenciamentoxinstrucoes` : `${api.baseURL}/checklist_credenciamentoxinstrucoes/${id_instrucao}`;

      const response = await fetch(`${url}`, {
        method: id_instrucao === 0 ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken(),
        },
        body: JSON.stringify({ id_checklist, descricao_instrucao })
      });

      const data = await response.json();


      if (data.status === 200) {
        this.setState({ successInstrucao: data.msg });
        this.listaDeInstrucoesDoChecklist(getToken(), id_checklist);
      }

      if (data.status === 400) {
        this.setState({ errorInstrucao: data.msg });

      }
    } catch (error) {
      console.log(error);
    }
  }

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

  removerInstrucaoDoChecklist = async (id, id_checklist) => {
    this.setState({ successInstrucao: '', errorInstrucao: '' });
    try {
      const response = await fetch(`${api.baseURL}/checklist_credenciamentoxinstrucoes/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken()
        },
        body: JSON.stringify({
          id_checklist
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ successInstrucao: data.msg });
        this.listaDeInstrucoesDoChecklist(getToken(), id_checklist);
      }

      if (data.status === 400) {
        this.setState({ errorInstrucao: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }


  alterarStatusDeAberturaDeTurma = async (idAberturaTurma, idStatus, email_solicitante,
    razao_social, nome_fantasia, telefone, observacao, cnpj) => {
    try {
      const response = await fetch(`${api.baseURL}/abertura_turma/${idAberturaTurma}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getToken()
        },
        body: JSON.stringify({
          idStatus, email_solicitante,
          razao_social, nome_fantasia,
          telefone, observacao, cnpj
        })
      });

      const data = await response.json();

      if (data.status === 200) {
        this.listaDeAberturaDeTurmas(getToken(), `${parseInt(this.state.dataAtual.getMonth()) + 1 <= 9 ? `${this.state.dataAtual.getFullYear()}-0${this.state.dataAtual.getMonth() + 1}-${parseInt(this.state.dataAtual.getDate()) <= 9 ? `0${this.state.dataAtual.getDate()}` : this.state.dataAtual.getDate()}` :
          `${this.state.dataAtual.getFullYear()}-${this.state.dataAtual.getMonth() + 1}-${parseInt(this.state.dataAtual.getDate()) <= 9 ? `0${this.state.dataAtual.getDate()}` : this.state.dataAtual.getDate()}`}`);
        this.listaDeAberturaDeTurmas(getToken());
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  }



  render() {
    const arrayAberturaDeTurmasDoDia = this.state.arrayAberturaDeTurmasDoDia;
    const arrayAberturaDeTurmas = this.state.arrayAberturaDeTurmas;
    const arrayEstados = this.state.arrayEstados;
    const arrayCredenciamento = this.state.arrayCredenciamento;
    const arrayAnexosDoCredenciamento = this.state.arrayAnexosDoCredenciamento;
    const arrayChecklistCredenciamento = this.state.arrayChecklistCredenciamento;
    const arrayChecklistCredenciamentoDoEstado = this.state.arrayChecklistCredenciamentoDoEstado;
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
              <FloatingMenu>
                <ul className="dropdown-menu">
                  <li>
                    <a onClick={() => this.handlerShowModalDashboard()}><FaPlus /> Dashboard</a>
                  </li>
                  <li>
                    <a onClick={() => this.handlerShowModalCadastrarInstituicao()}><FaPlus /> Adicionar estado</a>
                  </li>
                  <li>
                    <a onClick={() => this.handlerShowModalFiltrarChamado()}><FaPlus /> Adicionar instituição</a>
                  </li>
                </ul>
              </FloatingMenu>

              <div className='container-fluid mb-5'>
                <Tabs
                  defaultActiveKey="aberturaTurmasDiario"
                  id="justify-tab-example"
                  className="justify-content-center mb-3"
                  variant='pills'>
                  <Tab eventKey="aberturaTurmasDiario" title="Abertura de turmas do dia">
                    {/* <h4 className='text-light'><FaUserEdit /> Abertura de turmas</h4> */}
                    <div class="table-responsive table-sm">
                      <div class="table-wrapper">
                        <table class="table text-center table-hover mb-5 table-light" style={{ fontSize: "10pt" }}>
                          <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                            <tr>
                              <th scope="col">CNPJ</th>
                              <th scope="col">Nome fantasia</th>
                              <th scope="col">Razão social</th>
                              <th scope="col">Telefone</th>
                              <th scope="col">Observação</th>
                              <th scope="col">Metodologia</th>
                              <th scope="col">Curso</th>
                              <th scope="col">Data da solicitação</th>
                              <th scope="col">Estado</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {arrayAberturaDeTurmasDoDia.length > 0 ? (
                              arrayAberturaDeTurmasDoDia.map((abertura_turma, index) => (
                                <tr key={index} className={parseInt(abertura_turma.id_status) === 2 ? `table-success` : parseInt(abertura_turma.id_status) === 10 ? `table-danger` : ``}>
                                  <td>{abertura_turma.cnpj}</td>
                                  <td>{abertura_turma.nome_fantasia}</td>
                                  <td>{abertura_turma.razao_social}</td>
                                  <td>{abertura_turma.telefone}</td>
                                  <td>{abertura_turma.observacao}</td>
                                  <td>{abertura_turma.metodologia !== null ? abertura_turma.metodologia : "-"}</td>
                                  <td>{abertura_turma.curso !== null ? abertura_turma.curso : "-"}</td>
                                  <td>{abertura_turma.dataHoraCriacao}</td>
                                  <td>{abertura_turma.estado}</td>
                                  <td>
                                    <select class="form-control form-control-sm" id="status"
                                      value={abertura_turma.id_status}
                                      onChange={e => this.alterarStatusDeAberturaDeTurma(abertura_turma.id_abertura_turma, e.target.value, abertura_turma.email_solicitante,
                                        abertura_turma.razao_social, abertura_turma.nome_fantasia,
                                        abertura_turma.telefone, abertura_turma.observacao, abertura_turma.cnpj)}
                                      style={{ width: "200px" }}>
                                      <option value="0">Selecionar</option>
                                      {this.state.arrayStatus.length > 0 ? (
                                        this.state.arrayStatus.map(item =>
                                          parseInt(item.id) === 1 || parseInt(item.id) === 2 || parseInt(item.id) === 10 ? (<option value={item.id}>{item.nome}</option>) : "")
                                      ) : (
                                        <option value="0">Nenhum resultado encontrado</option>
                                      )}
                                    </select>
                                  </td>
                                </tr>
                              ))
                            ) : (<tr>
                              <td colSpan="12">Nenhum resultado encontrado</td>
                            </tr>)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tab>

                  <Tab eventKey="profile" title="Abertura de turmas gerais">
                    <div className='container'>
                      <div className='row justify-content-center text-light'>
                        <div className='col-md-3 mb-2'>
                          <div className="form-group">
                            <label for="staticEmail2">CNPJ</label>
                            <input class="form-control form-control-sm" type="text" id="cnpj" name="start" placeholder='CNPJ'
                              onChange={e => this.setState({ cnpj: e.target.value.trim() })}
                            />
                          </div>
                        </div>
                        <div className='col-md-3 mb-2'>
                          <div className="form-group">
                            <label for="staticEmail2">Nome fantasia</label>
                            <input class="form-control form-control-sm" type="text" id="nome_fanstasia" name="start" placeholder='Nome fantasia'
                              onChange={e => this.setState({ nome_fantasia: e.target.value.trim() })}
                            />
                          </div>
                        </div>
                        <div className='col-md-3 mb-2'>
                          <div className="form-group">
                            <label for="staticEmail2">Data de solicitação</label>
                            <input class="form-control form-control-sm" type="date" id="data_diario" name="start"
                              min="2022-01" value={this.state.data_solicitacao}
                              onChange={e => this.setState({ data_solicitacao: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className='col-md-3 mb-2'>
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
                      </div>
                    </div>

                    <div class="row d-flex justify-content-center mt-4 mb-4">
                      <div class="col-lg-12 col-lg-offset-6 text-center">
                        <div className="ml-auto">
                          <button className='btn btn-sm btn-outline-light mr-2' onClick={() => this.listaDeAberturaDeTurmas(getToken(), "", this.state.cnpj !== "" ? this.state.cnpj : "", this.state.nome_fantasia !== "" ? this.state.nome_fantasia : "", this.state.data_solicitacao !== "" ? this.state.data_solicitacao : "", this.state.id_estado !== "" ? this.state.id_estado : "")}>Buscar <FaSearch /> </button>
                          <button className='btn btn-sm btn-outline-light mr-2' onClick={() => this.listaDeAberturaDeTurmas(getToken(), ``)}><FaFilter /> Limpar filtro</button>
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive table-sm mb-5 container">
                      <div class="table-wrapper">
                        <table class="table text-center table-hover mb-5 table-light">
                          <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                            <tr>
                              <th scope="col">CNPJ</th>
                              <th scope="col">Nome fantasia</th>
                              <th scope="col">Razão social</th>
                              <th scope="col">Metodologia</th>
                              <th scope="col">Curso</th>
                              <th scope="col">Data de solicitação</th>
                              <th scope="col">Estado</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {arrayAberturaDeTurmas.length > 0 ? (
                              arrayAberturaDeTurmas.map((abertura_turma, index) => (
                                <tr key={index} className={parseInt(abertura_turma.id_status) === 2 ? `table-success` : parseInt(abertura_turma.id_status) === 10 ? `table-danger` : ``}>
                                  <td>{abertura_turma.cnpj}</td>
                                  <td>{abertura_turma.nome_fantasia}</td>
                                  <td>{abertura_turma.razao_social}</td>
                                  <td>{abertura_turma.metodologia !== null ? abertura_turma.metodologia : "-"}</td>
                                  <td>{abertura_turma.curso !== null ? abertura_turma.curso : "-"}</td>
                                  <td>{abertura_turma.dataHoraCriacao}</td>
                                  <td>{abertura_turma.estado}</td>
                                  <td><select class="form-control form-control-sm" id="status"
                                    value={abertura_turma.id_status}
                                    onChange={e => this.alterarStatusDeAberturaDeTurma(abertura_turma.id_abertura_turma, e.target.value, abertura_turma.email_solicitante,
                                      abertura_turma.razao_social, abertura_turma.nome_fantasia,
                                      abertura_turma.telefone, abertura_turma.observacao, abertura_turma.cnpj)}
                                    style={{ width: "150px" }}>
                                    <option value="0">Selecionar</option>
                                    {this.state.arrayStatus.length > 0 ? (
                                      this.state.arrayStatus.map(item =>
                                        parseInt(item.id) === 1 || parseInt(item.id) === 2 || parseInt(item.id) === 10 ? (<option value={item.id}>{item.nome}</option>) : "")
                                    ) : (
                                      <option value="0">Nenhum resultado encontrado</option>
                                    )}
                                  </select>
                                  </td>
                                </tr>
                              ))
                            ) : (<tr>
                              <td colSpan="12">Nenhum resultado encontrado</td>
                            </tr>)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="credenciamento" title="Credenciamento">
                    <div className='container' style={{ height: "500px", overflowY: "scroll", padding: "10px" }}>
                      <div className="row">
                        {arrayEstados.length > 0 ? (
                          arrayEstados.map(estado => (
                            <div className="col-sm-3">
                              <Card key={estado.id} className="text-light text-center font-weight-bold zoom" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                                <Card.Header>{estado.sigla}</Card.Header>
                                <Card.Body>
                                  <button className='btn btn-sm btn-dark w-100' onClick={() => this.handlerShowModalCredenciamento(estado)} title="Clique aqui para obter mais informações sobre o credenciamento">Credenciamento</button>
                                  <button className='btn btn-sm btn-dark w-100 mt-2' onClick={() => this.handlerShowModalChecklistDoEstado(estado)} title="Clique aqui para obter mais informações sobre a documentação">Checklist</button>
                                </Card.Body>
                              </Card>
                            </div>
                          ))
                        ) : ("")}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>

              <Modal
                show={this.state.modalShowVisualizarDocumentacao}
                onHide={() => this.handlerCloseModalVisualizarDocumentacao()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                className='modal-fullscreen'>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter" className='text-center'>
                    <FaCalendarWeek /> Detalhes do credenciamento
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.atualizarCredenciamento}>
                    <div className="row">
                      <div className="col-sm-5" style={{ maxHeight: "500px", overflowY: "scroll", padding: "10px" }}>
                        <h4 className='titulo text-center'><FaUserTie /> Dados do gestor</h4>
                        <hr />
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
                          <div className="col-sm-6">
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
                          <div className="col-sm-6">
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
                                onChange={(e) =>
                                  this.setState({ confirmarSenha: e.target.value })
                                }
                                value={this.state.confirmarSenha}
                              />
                            </div>
                          </div>
                        </div>

                        <h4 className='titulo text-center'><FaSchool /> Dados da instituição</h4>
                        <hr />
                        <div className='row'>
                          <div className='col-sm-6'>
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
                          <div className='col-sm-6'>
                            <div class="form-group">
                              <label for="selectStatus">Status da Solicitação:</label>
                              <select class="form-control form-control-sm" id="selectStatus"
                                value={this.state.status}
                                onChange={e => this.setState({ status: e.target.value })}>
                                {this.state.arrayStatus.length > 0 ? (
                                  this.state.arrayStatus.map(item =>
                                    item.id === 5 || item.id === 6 || item.id === 7 ?
                                      (<option key={item.id} value={item.id}>{item.nome} </option>) : "")
                                ) : (
                                  <option value="0">Nenhum resultado encontrado</option>
                                )}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="razao_social">Razão Social:*</label>
                          <input className="form-control form-control-sm" type="text" name="razao_social" id="razao_social"
                            value={this.state.razao_social}
                            autocomplete="off"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="nome_fantasia">Nome Fantasia:*</label>
                          <input className="form-control form-control-sm" type="text" name="nome_fantasia" id="nome_fantasia"
                            value={this.state.nome_fantasia}
                            autocomplete="off" />
                        </div>

                        <div className="row mt-2">
                          <div className="col-sm-12">
                            {this.state.successAtualizarCredenciamento && (
                              <div
                                className="alert alert-success text-center"
                                role="alert"
                              >
                                {this.state.successAtualizarCredenciamento}
                              </div>
                            )}
                            {this.state.errorAtualizarCredenciamento && (
                              <div
                                className="alert alert-danger text-center"
                                role="alert"
                              >
                                {this.state.errorAtualizarCredenciamento}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                          <button className='button' type='submit'>Atualizar</button>
                        </div>
                      </div>

                      <div className="col-sm-7">
                        <div className='container' style={{ maxHeight: "400px", overflowY: "scroll", padding: "10px" }}>
                          <h4><FaDochub /> Anexos do checklist</h4>
                          <hr />
                          <div class="table-responsive table-sm">
                            <div class="table-wrapper">
                              <table class="table text-center table-hover table-light">
                                <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                                  <tr>
                                    <th scope="col">Item do checklist</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Anexo</th>
                                    <th scope="col">Observação</th>
                                    <th scope="col">Data do envio</th>
                                    <th scope="col">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {arrayAnexosDoCredenciamento.length > 0 ? (
                                    arrayAnexosDoCredenciamento.map((documento, index) => (
                                      <tr className={documento.id_status === 4 ? 'table-danger' : documento.id_status === 3 ? 'table-success' : ''}>
                                        <td>{documento.item_checklist}</td>
                                        <td>{documento.status}</td>
                                        <td><a href={documento.anexo}>visualizar</a></td>
                                        <td>{parseInt(documento.observacao) !== 0 ? documento.observacao : ``}</td>
                                        <td>{documento.dataHoraCriacao}</td>
                                        <td><button className='button' onClick={() => this.handlerShowModalAvaliacaoDoAnexoDoCredenciamento(documento)}>Avaliar</button></td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="12">Nenhum solicitacão encontrado</td>
                                    </tr>)}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <h4><FaDochub />Checklist da documentação enviada</h4>
                        <hr />
                        <div className="row" style={{ maxHeight: "400px", overflowY: "scroll", padding: "10px" }}>
                          {arrayChecklistCredenciamentoDoEstado.length > 0 ? (
                            arrayChecklistCredenciamentoDoEstado.map(item => {
                              const item_checklist = arrayAnexosDoCredenciamento.find(doc => doc.id_checklist === item.id_checklist && doc.id_status === 3);
                              return (
                                <div className="col-sm-4">
                                  <div className="form-group">
                                    <div className="form-check">
                                      <input className="form-check-input" type="checkbox" checked={item_checklist !== undefined} id="item_checklist" />
                                      <label className="form-check-label" for="gridCheck">
                                        {item.nome}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          ) : ("")}
                        </div>
                      </div>
                    </div>
                  </Form>


                </Modal.Body>
              </Modal>

              <Modal
                show={this.state.modalShowCredenciamento}
                onHide={() => this.handlerCloseModalCredenciamento()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                className='modal-fullscreen'>

                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter" className='text-center'>
                    <FaCalendarWeek /> Processo de credenciamento do estado - {this.state.estado}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row d-flex justify-content-center text-center" style={{ marginBottom: "10px", color: "#000233" }}>
                    <div className="col-sm-2 mb-3">
                      <FaSchool style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                      <h5 style={{ fontSize: "15px" }}>Total de Instituições</h5>
                      <h6>{arrayCredenciamento.length}</h6>
                    </div>
                  </div>
                  <h4 className=''><FaUserEdit /> Instituições</h4>
                  <hr />
                  <div class="table-responsive-sm mb-5">
                    <div class="table-wrapper">
                      <table class="table text-center table-hover mb-5 table-light">
                        <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                          <tr>
                            <th scope="col">CNPJ</th>
                            <th scope="col">Razão social</th>
                            <th scope="col">Status</th>
                            <th scope="col">Qtd. de documentos enviada</th>
                            {/* <th scope="col">Protocolado</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {arrayCredenciamento.length > 0 ? (
                            arrayCredenciamento.map((credenciamento, index) => (
                              <tr>
                                <td>{credenciamento.cnpj}</td>
                                <td>{credenciamento.nome_fantasia}</td>
                                <td>{credenciamento.status}</td>
                                <td>Foram enviados {credenciamento.qtdDocEnviados} de um total de {credenciamento.totDocDoEstado}</td>

                                <td><button className='btn btn-sm btn-outline-primary' onClick={() => this.handlerShowModalVisualizarDocumentacao(credenciamento)}>Documentação</button></td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="12">Nenhum resultado encontrado</td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
              </Modal>

              <Modal
                show={this.state.modalShowAvaliacaoDoAnexoDoCredenciamento}
                onHide={() => this.handlerCloseModalAvaliacaoDoAnexoDoCredenciamento()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size='md'>

                <Modal.Header closeButton>
                  <h4 className='titulo'><FaCalendarWeek /> Avaliação</h4>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.avaliarDocumentoDoCredenciamento}>
                    <div class="form-group">
                      <label for="selectStatus">Status:</label>
                      <select class="form-control form-control-sm" id="selectStatus"
                        value={this.state.id_status}
                        onChange={e => this.setState({ id_status: e.target.value })}>
                        {this.state.arrayStatus.length > 0 ? (
                          this.state.arrayStatus.map(item =>
                            item.id === 3 || item.id === 4 || item.id === 8 ?
                              (<option value={item.id}>{item.nome}</option>) : "")
                        ) : (
                          <option value="0">Nenhum resultado encontrado</option>
                        )}
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Observação:</label>
                      <textarea class="form-control form-control-sm" id="observacao" rows="3"
                        onChange={(e) =>
                          this.setState({ observacao: e.target.value })
                        }
                        value={this.state.observacao}></textarea>
                    </div>

                    <div className="row mt-2">
                      <div className="col-sm-12">
                        {this.state.successAvaliacaoDoAnexo && (
                          <div
                            className="alert alert-success text-center"
                            role="alert"
                          >
                            {this.state.successAvaliacaoDoAnexo}
                          </div>
                        )}
                        {this.state.errorAvaliacaoDoAnexo && (
                          <div
                            className="alert alert-danger text-center"
                            role="alert"
                          >
                            {this.state.errorAvaliacaoDoAnexo}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='float-right'>
                      <button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>

              <Modal
                show={this.state.modalShowChecklistDoEstado}
                onHide={() => this.handlerCloseModalChecklistDoEstado()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                className='modal-fullscreen'>

                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter" className='text-center'>
                    <FaCalendarWeek /> Checklist do estado - {this.state.estado}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='row'>
                        <div className='col-sm-9'>
                          <h4 className='titulo'><FaCalendarWeek /> Checklist geral</h4>
                        </div>
                        <div className='col-sm-3'>
                          <button className='button' onClick={() => this.handlerShowModalCadastrarItemDoChecklist()}><FaRegSave /> Adicionar</button>
                        </div>
                      </div>
                      <hr />
                      <div class="table-responsive-sm mb-5" style={{ maxHeight: "500px", overflowY: "scroll" }}>
                        <div class="table-wrapper">
                          <table class="table table-hover mb-5 table-light text-center">
                            <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                              <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Associar</th>
                                <th scope="col">Ação</th>
                              </tr>
                            </thead>
                            <tbody>
                              {arrayChecklistCredenciamento.length > 0 ? (
                                arrayChecklistCredenciamento.map(item_checklist => (
                                  <tr>
                                    <td>{item_checklist.nome}</td>
                                    <td>
                                      <button className='button' onClick={() => this.adicionarItemDoChecklistDoEstado(parseInt(item_checklist.id), this.state.id_estado)}> Associar</button>
                                    </td>
                                    <td><button className='button' onClick={() => this.handlerShowModalCadastrarItemDoChecklist(item_checklist)}> Atualizar</button></td>
                                  </tr>
                                ))
                              ) : ("")}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-6 border-left'>
                      <h4 className='titulo'><FaCalendarWeek /> Checklist do estado</h4>
                      <hr />
                      <div className="row mt-2">
                        <div className="col-sm-12">
                          {this.state.successChecklistDoEstado && (
                            <div
                              className="alert alert-success text-center"
                              role="alert"
                            >
                              {this.state.successChecklistDoEstado}
                            </div>
                          )}
                          {this.state.errorChecklistDoEstado && (
                            <div
                              className="alert alert-danger text-center"
                              role="alert"
                            >
                              {this.state.errorChecklistDoEstado}
                            </div>
                          )}
                        </div>
                      </div>

                      <div class="table-responsive-sm mb-5" style={{ maxHeight: "500px", overflowY: "scroll" }}>
                        <div class="table-wrapper">
                          <table class="table table-hover mb-5 table-light text-center">
                            <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                              <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Ação</th>
                              </tr>
                            </thead>
                            <tbody>
                              {arrayChecklistCredenciamentoDoEstado.length > 0 ? (
                                arrayChecklistCredenciamentoDoEstado.map(item_checklist => (
                                  <tr>
                                    <td>{item_checklist.nome}</td>
                                    <td><button className='btn btn-sm btn-outline-danger' onClick={() => this.removerItemDoChecklistDoEstado(item_checklist.id, parseInt(item_checklist.id_checklist), this.state.id_estado)}> Excluir</button></td>
                                  </tr>
                                ))
                              ) : (<tr>
                                <td colSpan="12">Nenhum item adicionado a lista</td>
                              </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>

              <Modal
                show={this.state.modalShowCadastrarItemDoChecklist}
                onHide={() => this.handlerCloseModalCadastrarItemDoChecklist()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size='lg'
                centered>

                <Modal.Header closeButton>
                  <h4 className='titulo'><FaCalendarWeek /> {this.state.id_checklist === 0 ? `Adicionar` : `Atualizar`}  item do checklist </h4>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.cadastrarEAtualizarItemDoChecklistGeral}>
                    <div className='container'>
                      <div class="form-group">
                        <label for="descricao">Descrição:</label>
                        <textarea class="form-control form-control-sm" id="descricao" rows="3"
                          onChange={(e) => this.setState({ descricao: e.target.value })}
                          value={this.state.descricao}></textarea>
                      </div>

                      <div className="row mt-2">
                        <div className="col-sm-12">
                          {this.state.successChecklistGeral && (
                            <div
                              className="alert alert-success text-center"
                              role="alert">
                              {this.state.successChecklistGeral}
                            </div>
                          )}
                          {this.state.errorChecklistGeral && (
                            <div
                              className="alert alert-danger text-center"
                              role="alert"
                            >
                              {this.state.errorChecklistGeral}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='float-right'>
                        <button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
                      </div>
                    </div>
                  </Form>

                  {this.state.id_checklist !== 0 ? (
                    <div className='container' style={{ marginTop: `100px` }}>
                      <div className='row'>
                        <div className='col-auto mr-auto'>
                          <h4 className='titulo'><FaClipboardList /> Instruções</h4>
                        </div>
                        <div className='col-auto'>
                          <button className='button' onClick={() => this.handlerShowModalCadastrarInstrucaoDoChecklist()}> Adicionar</button>
                        </div>
                      </div>

                      <div class="table-responsive-sm mb-5" style={{ maxHeight: "500px", overflowY: "scroll" }}>
                        <div class="table-wrapper">
                          <table class="table table-hover mb-5 table-light">
                            <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ffffff', color: 'rgb(0, 2, 51)' }}>
                              <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Ação</th>
                              </tr>
                            </thead>
                            <tbody>
                              {arrayInstrucoesDoChecklist.length > 0 ? (
                                arrayInstrucoesDoChecklist.map(instrucao => (
                                  <tr>
                                    <td>{instrucao.descricao}</td>
                                    <td><button className='btn btn-sm btn-outline-danger' onClick={() => this.removerInstrucaoDoChecklist(instrucao.id, parseInt(instrucao.id_checklist))}> Excluir</button></td>
                                  </tr>
                                ))
                              ) : (<tr>
                                <td colSpan="12">Nenhum item adicionado a lista</td>
                              </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : ("")}
                </Modal.Body>
              </Modal>

              <Modal
                show={this.state.modalShowCadastrarInstrucaoDoChecklist}
                onHide={() => this.handlerCloseModalCadastrarInstrucaoDoChecklist()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size='md'
                centered>

                <Modal.Header closeButton>
                  <h4 className='titulo'><FaCalendarWeek /> {this.state.id_instrucao === 0 ? `Adicionar` : `Atualizar`}  instrução do checklist </h4>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.cadastrarEAtualizarInstrucaoDoChecklist}>
                    <div class="form-group">
                      <label for="descricao">Descrição:</label>
                      <textarea class="form-control form-control-sm" id="descricao" rows="3"
                        onChange={(e) => this.setState({ descricao_instrucao: e.target.value })}
                        value={this.state.descricao_instrucao}></textarea>
                    </div>

                    <div className="row mt-2">
                      <div className="col-sm-12">
                        {this.state.successInstrucao && (
                          <div
                            className="alert alert-success text-center"
                            role="alert">
                            {this.state.successInstrucao}
                          </div>
                        )}
                        {this.state.errorInstrucao && (
                          <div
                            className="alert alert-danger text-center"
                            role="alert"
                          >
                            {this.state.errorInstrucao}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='float-right'>
                      <button id='btnCadastrarAnexo' className='button'><FaRegSave /> Salvar</button>
                    </div>
                  </Form>

                </Modal.Body>
              </Modal>


              <Modal
                show={this.state.modalShowDashboard}
                onHide={() => this.handlerCloseModalDashboard()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                className='modal-fullscreen'>

                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter" className='text-center'>
                    <FaCalendarWeek /> Dashboard
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className='row justify-content-center text-center mb-2 '>
                    <div className='col-md-3 mb-2 border mr-2 p-3'>
                      <FaUsers style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                      <h5 className='titulo'>Total de abertura de turmas do dia</h5>
                      <h6>{arrayAberturaDeTurmasDoDia.length}</h6>
                    </div>
                    <div className='col-md-3 mb-2 border p-3'>
                      <FaClipboardList style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                      <h5 className='titulo'>Total de abertura de turmas</h5>
                      <h6>{arrayAberturaDeTurmas.length}</h6>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-6'>
                      <Plot data={this.state.arrayQuantidadeSolicitacoesPorEstado}
                        layout={this.state.layoutQuantidadeSolicitacoesPorEstado} />
                    </div>
                    <div className='col-sm-6'>
                      <Plot data={this.state.arrayPercentualStatusSolicitacoes} layout={this.state.layoutPercentualStatusSolicitacoes} />
                    </div>
                  </div>

                  <div className='row mt-3'>
                    <div className='col-sm-6'>
                      <div class="form-group">
                        <label htmlFor="selectEstado">Estado:</label>
                        <select className="form-control form-control-sm" id="selectEstado"
                          onChange={e => this.quantidadeDeSolicitacoesDeAberturaDeTurmaDasInstituicoesPorEstado(getToken(), e.target.value)}>
                          <option value={0}>Selecione um estado</option>
                          {arrayEstados.length > 0 ?
                            arrayEstados.map(item => (
                              <option value={item.id}>{item.nome}</option>
                            ))
                            : (<option value="">Nenhum resultado foi encontrado</option>)}
                        </select>
                      </div>
                      <Plot data={this.state.arrayQuantidadeSolicitacoesDasInstituicoesPorEstado}
                        layout={this.state.layoutQuantidadeSolicitacoesDasInstituicoesPorEstado} />
                    </div>

                    <div className='col-sm-6'>
                      <label htmlFor="ano">Selecione um ano:</label>
                      <select className="form-control form-control-sm" id="ano" name="ano" onChange={e => this.solicitacoesDeAberturaDeTurmaMensal(getToken(), e.target.value)}>
                        <option value="0">0</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                      </select>
                      <Plot data={this.state.arraySolicitacoesDeAberturaDeTurmaMensal}
                        layout={this.state.layoutSolicitacoesDeAberturaDeTurmaMensal} />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </MainContent>
          </Col>
        </Row>
      </Container >
    );
  }
}

export const Form = styled.form`
	.titulo {
	  color: #000233;
}`;