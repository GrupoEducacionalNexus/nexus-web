import React, { Component } from 'react';
import api from '../../services/api';
import { CertificadoPosGraduacao } from '../../components/CertificadoPosGraduacao';
import { getParamUrlString } from '../../services/getParamUrlString';

export default class LoginNexus extends Component {
    constructor(props) {
        super();
        this.state = {
            codigo_validacao: 0,
            success: '',
            error: '',
            nome_completo: '',
            curso: '',
            data_emissaoDoDiploma: '',
            numero_livro: 0,
            numero_pagina: 0,
            numero_registro: 0,
            data_local: ''
        }
    }

    componentDidMount() {
        this.dadosDoCertificado();
    }

    dadosDoCertificado = async () => {
        const codigo_validacao = getParamUrlString("codigo_validacao");
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
                if (data.resultados.length > 0) {
                    this.setState({
                        nome_completo: data.resultados[0].nome,
                        curso: data.resultados[0].curso,
                        data_emissaoDoDiploma: data.resultados[0].data_emissaoDoDiploma,
                        numero_livro: data.resultados[0].numero_livro,
                        numero_pagina: data.resultados[0].numero_pagina,
                        numero_registro: data.resultados[0].numero_registro,
                        data_local: data.resultados[0].data_local
                    })
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

    render() {
        return (
            <div className='container'>
                <CertificadoPosGraduacao
                    nome_completo={this.state.nome_completo}
                    curso={this.state.curso}
                    data_emissaoDoDiploma={this.state.data_emissaoDoDiploma}
                    numero_livro={this.state.numero_livro}
                    numero_pagina={this.state.numero_pagina}
                    numero_registro={this.state.numero_registro}
                    data_local={this.state.data_local}
                />
            </div>
        )
    }
}