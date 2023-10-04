import { FaHouseDamage } from 'react-icons/fa';
import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../../../services/api';
import Logo from '../../../../assets/logo_nexus2.png';
import { listaDeEventos } from '../../../../services/getListaDeEventos';
import { getToken } from '../../../../services/auth';

export default class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      success: '',
      error: '',

      //Informações do usuário
      nome: '',
      email: '',
      cpf_cnpj: '',
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      complemento: '',
      id_evento: 0,
      array_eventos: [],
      arquivo: null,
      descricaoDoArquivo: '',
      url: ''
    }
  }

  componentDidMount() {
    listaDeEventos(getToken()).then(result => this.setState({ array_eventos: result }));
  }

  cadastrarMembro = async (e) => {
    e.preventDefault();
    this.setState({ success: '', error: '' });

    const nome = this.state.nome;
    const email = this.state.email;
    const cpf_cnpj = this.state.cpf_cnpj;
    const id_permissao = 4;
    const id_evento = this.state.id_evento;

    if (!nome || !email || !cpf_cnpj || !id_evento) {
      this.setState({ error: 'Por favor, preencher todos os campos.' });
    } else {
      try {
        const response = await fetch(`${api.baseURL}/membros`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            cpf_cnpj,
            email,
            id_permissao,
            id_evento,
            faco_parte: 0,
            codigo_validacao: 0
          })

        });

        const data = await response.json();
        console.log(data)

        if (data.status === 200) {
          this.setState({ success: data.msg });
        }

        if (data.status === 400) {
          this.setState({ error: data.msg });
        }
      } catch (error) {
        this.setState({ error: 'Ocorreu um erro' });
      }
    }
  };

  handlerInformacoes = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const responseJson = await response.json();

        this.setState({
          cep: responseJson.cep,
          bairro: responseJson.bairro,
          logradouro: responseJson.logradouro,
          cidade: responseJson.localidade,
          estado: responseJson.uf,
        });
        console.log(responseJson)
      } catch (error) {
        console.log(error);
      }
      return;
    }
  }

  render() {
    const array_eventos = this.state.array_eventos;

    return (
      <Container>
        <Form onSubmit={this.cadastrarMembro}>
          <img src={Logo} style={{ display: 'block', margin: '0 auto' }} />
          <h3 id='titulo'> Eventos</h3>

          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Digite seu nome"
              onChange={(e) =>
                this.setState({ nome: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Informe o seu email"
              onChange={(e) =>
                this.setState({ email: e.target.value })
              }
            />
          </div>

          <div class="form-group">
            <label htmlFor="select_Usuario">CPF:</label>
            <input
              className="form-control"
              type="number"
              placeholder="Cpf"
              name="cep"
              id='cep'
              onChange={(e) => this.setState({ cpf_cnpj: e.target.value })}
            />
          </div>

          <div class="form-group">
            <label htmlFor="selectEvento">Evento:</label>
            <select class="form-control" id="selectEvento"
              onChange={e => this.setState({ id_evento: e.target.value })}>
              <option value={0}>Selecione uma opção</option>
              {array_eventos.length > 0 ?
                array_eventos.map(evento => (
                  <option value={evento.id}>{evento.tema}</option>
                ))
                : (<option>0</option>)}
            </select>
          </div>

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

          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <button className="button" type="submit">
                Cadastrar
              </button>
            </div>
          </div>


        </Form>
      </Container >
    );
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #000233;
  height: 100vh;

  #titulo {
    font-family: 'Heavitas', sans-serif;
    font-weight: bold;  
    margin-top: 20px; 
    color: #F9CC00;
    text-align: center; 
    text-transform: uppercase;
    margin-bottom: 35px;
  }
  
}`;

const Form = styled.form`
  width: 500px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 15px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 8px 8px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-top: 200px;
  margin-bottom: 200px;
  
  .button {
    background-color: #000233;
    border: 1px solid #000233;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 16px;
    padding: 4px 90px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #000233;
  }

  .button:hover {
    background-color: #ffffff;
    color: #000233;
  }

  .button:active {
    position: relative;
    top: 1px;
  }

  .button:focus {
    outline-style: none;
  }

  .btn-disable {
    cursor: not-allowed;
    pointer-events: none;
    color: #c0c0c0;
    background-color: #ffffff;
  }

  @media only screen and (min-width: 320px) and (max-width: 725px) {
    width: 340px;
    img {
      width: 300px;
    }
  }
`;
