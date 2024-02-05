import React, { Component } from 'react';
import { Container, Form, Img } from './styles';
import LogoAdmin from '../../assets/enber.png';
import api from '../../services/api';
import { getToken } from '../../services/auth';

export default class Index extends Component {
    constructor(props) {
        super();
        this.state = {
            codigo_validacao: 0,
            success: '',
            error: ''
        }
    }

    verificarCertificado = async e => {
        e.preventDefault()
        this.setState({ success: "", error: ""});

        const { codigo_validacao } = this.state;

        if (!codigo_validacao) {
            this.setState({ error: "Por favor, preencher todos os campos." });
        } else {
            try {

                const response = await fetch(`${api.baseURL}/certificados/${codigo_validacao}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                if (data.status === 200) {
                    
                    console.log(data.resultados)

                    if(data.msg === 1) {
                        this.setState({ success: "O seu certificado é válido." });
                    } else {
                        this.setState({ error: "O seu código não é válido." });
                    }
                }

                if (data.status === 400) {
                    this.props.history.push("/validacao");
                    this.setState({ error: data.msg })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        return (
            <Container>
                {/* <Navbar /> */}
                <img src={LogoAdmin} className="mb-5" />
                <Form onSubmit={this.verificarCertificado}>
                    <div className="row">
                        <div className="col-12">
            
                            <h4 style={{ color: "#000233", fontWeight: "bold" }} className='text-center'>Validação de certificado</h4>
                            <hr />
                            <p style={{ color: "#ff0000" }}>*Atenção, informe o código de validação do seu certificado.</p>
                            <div class="form-group">
                                <input className="form-control" type="numbert" placeholder="Código de validação" name="codigo_validacao"
                                    onChange={e => this.setState({ codigo_validacao: e.target.value })} autocomplete="off"/>
                            </div>
                        </div>
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

                    <button class="button btn-block mt-4" type="submit">Verificar</button>

                </Form>
            </Container>
        )
    }
}