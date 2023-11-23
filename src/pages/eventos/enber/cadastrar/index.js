import { FaHouseDamage, FaUserEdit } from "react-icons/fa";
import React, { Component } from "react";
import styled from "styled-components";
import api from "../../../../services/api";
import Logo from "../../../../assets/enber.png";
import { listaDeEventos } from "../../../../services/getListaDeEventos";
import { getToken } from "../../../../services/auth";
import BackgroundEnber from "../../../../assets/background_blue.jpeg";
import { handleCpf } from "../../../../services/mascaraCpf";
import EstadosCidadesJson from "../../../../services/estados-cidades.json";

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
      vinculo_institucional: "",
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
      array_vinculoInstitucional: [],
      comoSoube: "",
      arrayEstados: [],
      arrayCidades: [],
      id_estado: 0,
      instituicao_estado: "",
    };
  }

  componentDidMount() {
    listaDeEventos(getToken()).then((result) =>
      this.setState({ array_eventos: result })
    );
    this.listaDeVinculoInstitucional();
    this.listaDeEstados();
    this.listaDeGruposDeTrabalho(10);
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

    const nome = this.state.nome;
    const email = this.state.email;
    // const cpf_cnpj = this.state.cpf_cnpj;
    const telefone = this.state.telefone;
    const vinculo_institucional = this.state.vinculo_institucional;
    const id_permissao = 4;
    const id_evento = 10;
    const tipo_membro = this.state.tipo_membro;
    const id_grupo_trabalho = this.state.id_grupo_trabalho;
    const comoSoube = this.state.comoSoube;
    const id_estado = this.state.id_estado;
    const cidade = this.state.cidade;
    const instituicao_empresa = this.state.instituicao_empresa;
    const grau_escolaridade = this.state.grau_escolaridade;
    const participacao = this.state.participacao;

    if (
      !nome ||
      !email ||
      !telefone ||
      !id_estado ||
      !cidade ||
      !grau_escolaridade ||
      !id_grupo_trabalho ||
      !participacao
    ) {
      this.setState({ error: "Por favor, preencher todos os campos." });
    } else {
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
            instituicao_empresa,
            vinculo_institucional,
            grau_escolaridade,
            id_grupo_trabalho,
            participacao,
            comoSoube,
            cpf_cnpj: 0,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 200) {
          this.setState({ success: data.msg });
        }

        if (data.status === 400) {
          this.setState({ error: data.msg });
        }
      } catch (error) {
        this.setState({ error: "Ocorreu um erro" });
      }
    }
  };

  // handlerInformacoes = async (cep) => {
  //   if (cep.length === 8) {
  //     try {
  //       const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       const responseJson = await response.json();

  //       this.setState({
  //         cep: responseJson.cep,
  //         bairro: responseJson.bairro,
  //         logradouro: responseJson.logradouro,
  //         cidade: responseJson.localidade,
  //         estado: responseJson.uf,
  //       });
  //       console.log(responseJson)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     return;
  //   }
  // }

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
      console.log(data);
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

  listaDeVinculoInstitucional = async () => {
    try {
      const response = await fetch(`${api.baseURL}/vinculo_institucional`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status === 200) {
        this.setState({ array_vinculoInstitucional: data.resultados });
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

  render() {
    const array_eventos = this.state.array_eventos;
    const arrayGruposTrabalho = this.state.arrayGruposTrabalho;
    const array_vinculoInstitucional = this.state.array_vinculoInstitucional;
    const arrayEstados = this.state.arrayEstados;
    const arrayCidades = this.state.arrayCidades;
    return (
      <Container>
        <Form onSubmit={this.cadastrarMembro}>
          <div className="row">
            <div className="col-sm-4">
              <div
                style={{
                  height: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={Logo} style={{ width: "90px" }} />
                <h3 id="titulo"> Eventos</h3>
              </div>
            </div>

            <div className="col-sm-8">
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
              <div class="form-group">
                <label htmlFor="selectEstado">Estado:</label>
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

              <div class="form-group">
                <label htmlFor="selectEstado">Cidade:</label>
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

              {/* <div class="form-group">
                    <label htmlFor="cpf">CPF:</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="INFORME O SEU CPF"
                      name="Cpf"
                      id='Cpf'
                      onChange={(e) => handleCpf(e.target.value).then(result => this.setState({cpf_cnpj: result}))}
                      value={this.state.cpf_cnpj}
                    />
                  </div> */}

              <div class="form-group">
                <label htmlFor="selectEstado">Grau de Escolaridade:</label>
                <select
                  className="form-control form-control-sm"
                  id="grau_escolaridade"
                  onChange={(e) =>
                    this.setState({ grau_escolaridade: e.target.value })
                  }
                >
                  <option value={0}>Selecione seu grau de escolaridade</option>
                  <option value={1}>Médio Incompleto</option>
                  <option value={2}>Médio Completo</option>
                  <option value={3}>Superior</option>
                  <option value={4}>Mestrado</option>
                  <option value={5}>Doutorado</option>
                </select>
              </div>

              {arrayGruposTrabalho.length > 0 ? (<div class="form-group">
                    <label htmlFor="selectGrupoDeTrabalho">Grupo:</label>
                    <select class="form-control form-control-sm" id="selectGrupoDeTrabalho"
                      onChange={e => this.setState({ id_grupo_trabalho: parseInt(e.target.value) })}>
                      <option value={0}>{"Selecione uma opção".toLocaleUpperCase()}</option>
                      {arrayGruposTrabalho.length > 0 ?
                        arrayGruposTrabalho.map(grupo => (
                          <option value={grupo.id}>{grupo.nome}</option>
                        ))
                        : (<option>0</option>)}
                    </select>
                  </div>
                  ) : ("")}

              <div class="form-group">
                <label htmlFor="selectEstado">Participação:</label>
                <select
                  className="form-control form-control-sm"
                  id="participacao"
                  onChange={(e) =>
                    this.setState({ participacao: e.target.value })
                  }
                >
                  <option value={0}>Selecione sua participação</option>
                  <option value={1}>Ouvinte</option>
                  <option value={2}>Irei submeter artigos</option>
                </select>
              </div>

              {/* <div class="form-group">
                    <label htmlFor="selectEvento">EVENTO:</label>
                    <select class="form-control form-control-sm" id="selectEvento"
                      onChange={(e) => this.listaDeGruposDeTrabalho(e.target.value)}>
                      <option value={0}>{"Selecione uma opção".toLocaleUpperCase()}</option>
                      {array_eventos.length > 0 ?
                        array_eventos.map(evento => (
                          <option value={evento.id}>{evento.tema.toUpperCase()}</option>
                        ))
                        : (<option>0</option>)}
                    </select>
                  </div>

                  

                  <div class="form-group">
                    <label htmlFor="selectEvento">TIPO DE MEMBRO:</label>
                    <select class="form-control form-control-sm" id="selectEvento"
                      onChange={e => this.setState({ tipo_membro: e.target.value })}>
                      <option value={0}>{"Selecione uma opção".toLocaleUpperCase()}</option>
                      <option value={1}>Participante com submissão de trabalho</option>
                      <option value={2}>Ouvinte sem submissão de trabalho</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="inputComoSoube">{"Como soube do evento?".toLocaleUpperCase()}</label>
                    <textarea class="form-control" rows="2" id="comment"
                      onChange={e => this.setState({ comoSoube: e.target.value })}></textarea>
                        </div>*/}

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
  max-width: 920px;
  background: rgba(255, 255, 255, 0.06);
  padding: 30px;
  margin-top: 15px;
  margin-bottom: 20px;
  color: #ffffff;

  @media only screen and (min-width: 320px) and (max-width: 725px) {
    width: 400px;
    background: none;
  }
`;
