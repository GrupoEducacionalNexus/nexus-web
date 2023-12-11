import { FaHouseDamage, FaUserEdit } from "react-icons/fa";
import React, { Component } from "react";
import styled from "styled-components";
import api from "../../../../services/api";
import { listaDeEventos } from "../../../../services/getListaDeEventos";
import { getToken } from "../../../../services/auth";
import BackgroundEnber from "../../../../assets/background_enberlogo.jpeg";
import EstadosCidadesJson from "../../../../services/estados-cidades.json";
import { Col, Row, Table } from "react-bootstrap";

export default class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      success: "",
      error: "",

      //Informações do usuário
      nome: "",
      email: "",
      cpf_cnpj: "",
      telefone: "",
      grau_escolaridade: "",
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      complemento: "",
      id_evento: 0,
      array_eventos: [],
      arquivo: null,
      descricaoDoArquivo: "",
      url: "",
      tipo_membro: 0,
      arrayGruposTrabalho: [],
      id_grupo_trabalho: 0,
      arrayGrauEscolaridade: [],
      comoSoube: "",
      arrayEstados: [],
      arrayCidades: [],
      id_estado: 0,
      instituicao_estado: "",
      ouvinteGrupo1: false,
      submeterGrupo1: false,
      ouvinteGrupo2: false,
      submeterGrupo2: false,
      ouvinteGrupo3: false,
      submeterGrupo3: false,
      ouvinteGrupo4: false,
      submeterGrupo4: false,
      ouvinteGrupo5: false,
      submeterGrupo5: false,
      arrayGruposDeTrabalhosSelecionados: [],
      curso_formacao: "",
      instituicao_origem: "",
      contSubmeterTrab: 1
    };
  }

  componentDidMount() {
    listaDeEventos(getToken()).then((result) =>
      this.setState({ array_eventos: result })
    );
    this.listaDeGrauDeEscolaridade();
    this.listaDeEstados();
    this.listaDeGruposDeTrabalho(11);
  }

  uuid = () => {
    return (
      Date.now().toString().substring(16, 20) +
      Math.random().toString().substring(10)
    );
  };

  cadastrarMembro = async (e) => {
    e.preventDefault();
    this.setState({ success: "", error: "" });

    const {
      nome, email, telefone, grau_escolaridade,
      id_permissao, id_evento, tipo_membro,
      id_estado, cidade,
      ouvinteGrupo1, submeterGrupo1,
      ouvinteGrupo2, submeterGrupo2,
      ouvinteGrupo3, submeterGrupo3,
      ouvinteGrupo4, submeterGrupo4,
      ouvinteGrupo5, submeterGrupo5,
      arrayGruposDeTrabalhosSelecionados,
      curso_formacao, instituicao_origem
    } = this.state;

    if (!nome || !email ||
      !telefone || !id_estado ||
      !cidade || !grau_escolaridade || 
      !curso_formacao || !instituicao_origem) {
      this.setState({ error: "Por favor, preencher todos os campos." });
      return;
    }

    if (!ouvinteGrupo1 && !submeterGrupo1
      && !ouvinteGrupo2 && !submeterGrupo2
      && !ouvinteGrupo3 && !submeterGrupo3
      && !ouvinteGrupo4 && !submeterGrupo4
      && !ouvinteGrupo5 && !submeterGrupo5) {
      this.setState({ error: "Selecione um grupo de trabalho." });
      return;
    }

    try {
      const response = await fetch(`${api.baseURL}/membros`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          telefone,
          email,
          id_permissao,
          id_evento,
          codigo_validacao: this.uuid(),
          tipo_membro,
          id_estado,
          cidade,
          grau_escolaridade,
          arrayGruposDeTrabalhosSelecionados,
          curso_formacao,
          instituicao_origem
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ success: data.msg });
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });
      }
    } catch (error) {
      this.setState({ error: "Ocorreu um erro" });
    }
  };

  listaDeGruposDeTrabalho = async (id_evento) => {
    try {
      this.setState({ id_evento });
      console.log(id_evento);

      const response = await fetch(
        `${api.baseURL}/eventos/${id_evento}/grupos_trabalho`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === 200) {
        if (data.resultados.length > 0) {
          this.setState({ arrayGruposTrabalho: data.resultados });
          return;
        }
        this.setState({ arrayGruposTrabalho: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeGrauDeEscolaridade = async () => {
    try {
      const response = await fetch(`${api.baseURL}/grau_escolaridade`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status === 200) {
        this.setState({ arrayGrauEscolaridade: data.resultados });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleTelefone = (e) => {
    let str = e.replace(/[^0-9]/g, "").slice(0, 11);
    this.setState({
      telefone: str.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1)$2-$3"),
    });
  };

  buscarCidades = (estado) => {
    const id_estado = estado.split(",")[0];
    const sigla = estado.split(",")[1];
    const estadosCidades = EstadosCidadesJson.estados;
    for (let index = 0; index < estadosCidades.length; index++) {
      if (estadosCidades[index].sigla === sigla) {
        this.setState({
          id_estado,
          estado: sigla,
          arrayCidades: estadosCidades[index].cidades,
        });
      }
    }
  };

  listaDeEstados = async () => {
    try {
      const response = await fetch(`${api.baseURL}/estados`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status === 200) {
        this.setState({ arrayEstados: data.resultados });
      }

      if (data.status === 400) {
        this.setState({ error: data.msg });
      }
    } catch (error) {
      console.log(error);
    }
  };

  selecionarGrupoTrabalho = (grupoTrabalho) => {
    const { id, tipo } = grupoTrabalho;
    const { arrayGruposTrabalho } = this.state;
    let contSubmeterTrab = this.state.contSubmeterTrab;
   
    arrayGruposTrabalho.map(gt => {
      if (id === gt.id) {
        tipo === 1 ? this.setState({ ouvinteGrupo1: true }) : this.setState({ submeterGrupo1: true });
      }

      if (id === gt.id) {
        tipo === 1 ? this.setState({ ouvinteGrupo2: true }) : this.setState({ submeterGrupo2: true });
      }

      if (id === gt.id) {
        tipo === 1 ? this.setState({ ouvinteGrupo3: true }) : this.setState({ submeterGrupo3: true });
      }

      if (id === gt.id) {
        tipo === 1 ? this.setState({ ouvinteGrupo4: true }) : this.setState({ submeterGrupo4: true });
      }

      if (id === gt.id) {
        tipo === 1 ? this.setState({ ouvinteGrupo5: true }) : this.setState({ submeterGrupo5: true });
      }

      if (id === gt.id) {
        tipo === 1 ? this.setState({ ouvinteGrupo5: true }) : this.setState({ submeterGrupo5: true });
      }
    });

    const arrayGtSelecionados = this.state.arrayGruposDeTrabalhosSelecionados;

    arrayGtSelecionados.map(gt => {
      if(gt.tipo === 2) {
        this.setState({contSubmeterTrab: contSubmeterTrab += 1});
        document.getElementById(`checkbox_sub_trabalho_${id}`)
      }
    });

    console.log(contSubmeterTrab);

    if(contSubmeterTrab > 2) {
      alert("Você pode selecionar até dois grupos de trabalho para submeter trabalho!");
      return;
    }

    const indice = arrayGtSelecionados.findIndex(item => item.id === id && item.tipo === tipo);
    if (indice === -1) {
      arrayGtSelecionados.splice(arrayGtSelecionados.length, 0, { id, tipo });
      console.log(arrayGtSelecionados);
      this.setState({ arrayGruposDeTrabalhosSelecionados: arrayGtSelecionados });
      return;
    }
    arrayGtSelecionados.splice(indice, 1);
    this.setState({ arrayGruposDeTrabalhosSelecionados: arrayGtSelecionados });
    console.log(arrayGtSelecionados);
  }

  render() {
    const arrayGruposTrabalho = this.state.arrayGruposTrabalho;
    const arrayGrauEscolaridade = this.state.arrayGrauEscolaridade;
    const arrayEstados = this.state.arrayEstados;
    const arrayCidades = this.state.arrayCidades;
    return (
      <Container>
        <Form onSubmit={this.cadastrarMembro}>
          <div className="col">
            <div className="row-sm-4">
              <div
                style={{
                  height: "140px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                {/* <img src={Logo} style={{ width: "90px" }} /> */}
                <h5 id="titulo">II CONGRESSO INTERNACIONAL IVY ENBER CHRISTIAN UNIVERSITY</h5>
              </div>
            </div>

            <div className="row-sm-8">
              <h4 className="text-center mb-4">
                <FaUserEdit /> INSCRIÇÃO
              </h4>

              <div className="form-group">
                <label htmlFor="nome">NOME:</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="nome"
                  placeholder="INFORME O SEU NOME"
                  onChange={(e) => this.setState({ nome: e.target.value })}
                />
              </div>
              <div className="row">
                <div className="col-sm-7">
                  <div className="form-group">
                    <label htmlFor="email">EMAIL:</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="email"
                      placeholder="INFORME O SEU E-MAIL"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-sm-5">
                  <div class="form-group">
                    <label htmlFor="telefone">TELEFONE:</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="TELEFONE"
                      name="telefone"
                      id="telefone"
                      onChange={(e) => this.handleTelefone(e.target.value)}
                      value={this.state.telefone}
                    />
                  </div>
                </div>
              </div>
              <Row>
                <Col>
                  <div class="form-group">
                    <label htmlFor="selectEstado">ESTADO:</label>
                    <select
                      className="form-control form-control-sm"
                      id="selectEstado"
                      onChange={(e) => this.buscarCidades(e.target.value)}
                    >
                      <option value={0}>Selecione um estado</option>
                      {arrayEstados.length > 0 ? (
                        arrayEstados.map((item) => (
                          <option value={[item.id, item.sigla]}>{item.nome}</option>
                        ))
                      ) : (
                        <option value="">Nenhum resultado foi encontrado</option>
                      )}
                    </select>
                  </div>
                </Col>
                <Col>
                  <div class="form-group">
                    <label htmlFor="selectEstado">CIDADE:</label>
                    <select
                      className="form-control form-control-sm"
                      id="selectEstado"
                      onChange={(e) => this.setState({ cidade: e.target.value })}
                    >
                      <option value={0}>Selecione uma cidade</option>
                      {arrayCidades.length > 0 ? (
                        arrayCidades.map((item) => (
                          <option value={[item]}>{item}</option>
                        ))
                      ) : (
                        <option value="">Nenhum resultado foi encontrado</option>
                      )}
                    </select>
                  </div>
                </Col>
              </Row>

              <div class="form-group">
                <label htmlFor="selectEstado">GRAU DE ESCOLARIDADE:</label>
                <select
                  className="form-control form-control-sm"
                  id="grau_escolaridade"
                  onChange={(e) =>
                    this.setState({ grau_escolaridade: e.target.value })
                  }>
                  <option value={0}>Selecione seu grau de escolaridade</option>
                  {arrayGrauEscolaridade.length > 0 ? (
                    arrayGrauEscolaridade.map(grau_escolaridade => (
                      <option value={grau_escolaridade.nome}>{grau_escolaridade.nome}</option>
                    ))
                  ) : ("")}
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">CURSO DE FORMAÇÃO:</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                  onChange={e => this.setState({ curso_formacao: e.target.value })}></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">INSTITUIÇÃO DE ORIGEM:</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                  onChange={e => this.setState({ instituicao_origem: e.target.value })}></textarea>
              </div>

              <Table striped bordered size="sm" className="text-center">
                <thead>
                  <tr>
                    <th>Grupo de Trabalho</th>
                    <th>Ouvinte</th>
                    <th>Irei Submeter Artigos</th>
                  </tr>
                </thead>
                <tbody>
                  {arrayGruposTrabalho.length > 0 ?
                    arrayGruposTrabalho.map(grupo => (
                      <tr>
                        <td>{grupo.nome}</td>
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={1} id="checkbox_ouvinte" onChange={(e) => this.selecionarGrupoTrabalho({ id: grupo.id, tipo: parseInt(e.target.value) })} />
                          </div>
                        </td>
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={2} id={`checkbox_sub_trabalho_${grupo.id}`} onChange={(e) => this.selecionarGrupoTrabalho({ id: grupo.id, tipo: parseInt(e.target.value) })} />
                          </div>
                        </td>
                      </tr>
                    ))
                    : (<tr>
                      <td>Nenhum Grupo de Trabalho Encontrado</td>
                      <td>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                      </td>
                      <td>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </Table>

              <div className="row">
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

              <div className="d-flex justify-content-center">
                <button className="button" type="submit">
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('${BackgroundEnber}');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;

  #titulo {
    font-family: 'Heavitas', sans-serif;
    font-weight: bold;  
    color: #ffffff;
    text-align: center; 
    text-transform: uppercase;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  
}`;

const Form = styled.form`
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  margin-top: 15px;
  margin-bottom: 20px;
  color: #ffffff;

  @media only screen and (min-width: 320px) and (max-width: 725px) {
    width: 410px;
    background: none;
  }
`;
