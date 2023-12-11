import {
  FaBoxes,
  FaCalendarWeek,
  FaClipboardList,
  FaHandsHelping,
  FaPlus,
  FaRegUser,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import React, { Component } from "react";
import styled from "styled-components";
import api from "../../../../services/api";
import Logo from "../../../../assets/enber.png";
import { getToken } from "../../../../services/auth";
import backgroundImage from "../../../../assets/sistema_chamados.png";
import Modal from "react-bootstrap/Modal";
import { Accordion, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Menu from "../../../../components/Menu";
import AdminNavbar from "../../../../components/Navbar";
import MainContent from "../../../../components/MainContent";
import FloatingMenu from "../../../../components/FloatingMenu";
import Perfil from "../../../../components/Perfil";
import logo from "../../../../assets/enber.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuLateral from "../../../../components/MenuLateral";

export default class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      success: "",
      error: "",
      array_membros: [],
      array_anexos: [],
      grupo_tabalho: 0,
      modalShowVisualizarAnexo: false,
      nome_membro: "",
      totTrabalhosSubmetidos: 0,
    };
  }

  componentDidMount() {
    this.grupoDeTrabalho(getToken());
  }

  setModalShowVisualizarAnexo(valor) {
    this.setState({ modalShowVisualizarAnexo: valor, error: "" });
  }

  handlerShowModalVisualizarAnexo(membro) {
    this.setModalShowVisualizarAnexo(true);
    this.setState({ nome_membro: membro.nome });
    this.listaDeAnexos(membro.id_usuario, membro.id_grupoTrabalho);
  }

  handlerCloseModalVisualizarAnexo() {
    this.setModalShowVisualizarAnexo(false);
  }

  grupoDeTrabalho = async (token) => {
    try {
      const response = await fetch(
        `${api.baseURL}/lider_gt/${token}/grupo_trabalho`,
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
        this.listaDeMembrosDoGrupoDeTrabalho(
          data.resultados[0].id_grupoTrabalho
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeMembrosDoGrupoDeTrabalho = async (id_grupoTrabalho) => {
    try {
      const response = await fetch(
        `${api.baseURL}/grupos_trabalho/${id_grupoTrabalho}/membros`,
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
        this.setState({
          array_membros: data.resultados,
          totTrabalhosSubmetidos: data.resultados[0].totTrabalhosSubmetidos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  listaDeAnexos = async (id_usuario, id_grupoTrabalho) => {
    try {
      const response = await fetch(
        `${api.baseURL}/membros/${id_usuario}/anexos?id_grupoTrabalho=${id_grupoTrabalho}`,
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

  render() {
    const membros = this.state.array_membros;
    const anexos = this.state.array_anexos;

    return (
      <Container
        fluid
        style={{
          backgroundColor: "#f5f5dc",
          height: "100vh",
          padding: "0px",
        }}
      >
        <Navbar style={{ backgroundColor: "#000233" }}>
          <Container>
            <Navbar.Brand href="#home">
              <img id="logo" src={logo} style={{ width: "60px" }} />
            </Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link>
                <Perfil />
              </Nav.Link>
              <Nav.Link>
                <MenuLateral placement={"start"} />
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Row>
          <Col xs={12}>
            <MainContent>
              <div className="container mb-3">
                <h3
                  className="font-weight-bold mb-3 border-bottom"
                  style={{ color: "#000233" }}
                >
                  <FaRegUser /> Fulano, seja bem-vindo
                  ao sistema de eventos da enber!
                </h3>
                <p>
                  <FaHandsHelping /> Em caso de dúvidas acesse o{" "}
                  <a
                    href="https://api.whatsapp.com/send/?phone=13213009710&text&app_absent=0"
                    target="_blank"
                  >
                    link
                  </a>
                </p>
              </div>
              <div className="row justify-content-center text-center text-light mb-2 mt-5">
                <div className="col-sm-3 mb-2">
                  <FaUsers
                    style={{
                      width: "30px",
                      height: "30px",
                      marginBottom: "10px",
                      color: "#000233",
                    }}
                  />
                  <h5 className="titulo">Total de membros</h5>
                  <h6>{membros.length}</h6>
                </div>

                <div className="col-sm-3 mb-3">
                  <FaClipboardList
                    style={{
                      width: "30px",
                      height: "30px",
                      marginBottom: "10px",
                      color: "#000233",
                    }}
                  />
                  <h5 className="titulo">Total de trabalhos submetidos</h5>
                  <h6>{this.state.totTrabalhosSubmetidos}</h6>
                </div>
              </div>

              <Container>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      Inscritos que já submeteram os trabalhos
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="container mb-4">
                        <div class="table-responsive table-sm">
                          <div class="table-wrapper">
                            <table class="table table-light text-center  mb-5">
                              <thead
                                style={{
                                  position: "sticky",
                                  top: 0,
                                  zIndex: 1,
                                  backgroundColor: "#ffffff",
                                  color: "rgb(0, 2, 51)",
                                }}
                              >
                                <tr>
                                  <th scope="col">Nome</th>
                                  <th scope="col">E-mail</th>
                                  <th scope="col">Grupo de trabalho</th>
                                  <th scope="col">Ações</th>
                                </tr>
                              </thead>
                              <tbody>
                                {membros.length > 0
                                  ? membros.map((membro, index) => (
                                      <tr key={index}>
                                        <td>{membro.nome}</td>
                                        <td>{membro.email}</td>
                                        <td>{membro.grupo_trabalho}</td>
                                        <td>
                                          <button
                                            className="button"
                                            onClick={() =>
                                              this.handlerShowModalVisualizarAnexo(
                                                membro
                                              )
                                            }
                                          >
                                            Visualizar anexos
                                          </button>
                                        </td>
                                      </tr>
                                    ))
                                  : ""}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      Inscritos que ainda não submeteram o trabalho
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="container mb-4">
                        <div class="table-responsive table-sm">
                          <div class="table-wrapper">
                            <table class="table table-light text-center  mb-5">
                              <thead
                                style={{
                                  position: "sticky",
                                  top: 0,
                                  zIndex: 1,
                                  backgroundColor: "#ffffff",
                                  color: "rgb(0, 2, 51)",
                                }}
                              >
                                <tr>
                                  <th scope="col">Nome</th>
                                  <th scope="col">E-mail</th>
                                  <th scope="col">Grupo de trabalho</th>
                                </tr>
                              </thead>
                              <tbody>
                                {membros.length > 0
                                  ? membros.map((membro, index) => (
                                      <tr key={index}>
                                        <td>{membro.nome}</td>
                                        <td>{membro.email}</td>
                                        <td>{membro.grupo_trabalho}</td>
                                      </tr>
                                    ))
                                  : ""}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Container>

              {/* <div className="container mb-4">
                <div class="table-responsive table-sm">
                  <div class="table-wrapper">
                    <table class="table table-light text-center  mb-5">
                      <thead
                        style={{
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                          backgroundColor: "#ffffff",
                          color: "rgb(0, 2, 51)",
                        }}
                      >
                        <tr>
                          <th scope="col">Nome</th>
                          <th scope="col">E-mail</th>
                          <th scope="col">Grupo de trabalho</th>
                          <th scope="col">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {membros.length > 0
                          ? membros.map((membro, index) => (
                              <tr key={index}>
                                <td>{membro.nome}</td>
                                <td>{membro.email}</td>
                                <td>{membro.grupo_trabalho}</td>
                                <td>
                                  <button
                                    className="button"
                                    onClick={() =>
                                      this.handlerShowModalVisualizarAnexo(
                                        membro
                                      )
                                    }
                                  >
                                    Visualizar anexos
                                  </button>
                                </td>
                              </tr>
                            ))
                          : ""}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div> */}

              <Modal
                show={this.state.modalShowVisualizarAnexo}
                onHide={() => this.handlerCloseModalVisualizarAnexo()}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                size="md"
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
                  <div className="table-responsive table-sm text-center">
                    <table className="table table-bordered table-hover custom-table">
                      <thead>
                        <tr>
                          <th scope="col">Titulo do documento</th>
                          <th>link</th>
                          <th>Coautor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {anexos.length > 0 ? (
                          anexos.map((anexo) => (
                            <tr
                              key={anexo.id}
                              title="Clique aqui para obter mais informações sobre o anexo"
                            >
                              <td>{anexo.nome}</td>
                              <td>
                                <a href={anexo.link}>Arquivo</a>
                              </td>
                              <td>{anexo.coautor}</td>
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
            </MainContent>
          </Col>
        </Row>
      </Container>
    );
  }
}
