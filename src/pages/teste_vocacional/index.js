import { FaChartPie, FaQuestion, FaReadme, FaUserPlus } from 'react-icons/fa';
import React, { Component } from 'react';
import { Container, Form, FormContainer } from './styles';
import LogoAdmin from '../../assets/logo_nexus.png';
import api from '../../services/api';
import { handleTelefone } from '../../services/mascaraTelefone';

export default class Index extends Component {
    constructor(props) {
        super();
        this.state = {
            nome: '',
            email: '',
            telefone: '',
            dt_nascimento: '',
            id_vinculoInstitucional: 0,
            success: '',
            error: '',
            numberSection: 0,
            numberQuestion: 0,
            arrayPerguntas: [],
            arrayResposta: [],
            arrayResultados: [],
            array_vinculoInstitucional: [],
            exibirResult: false,
            desabilitaBotaoResult: false,
            barra_progresso: 0
        }
    }

    componentDidMount() {
        this.listaPerguntas();
        this.listaDeVinculoInstitucional();
    }

    listaPerguntas = async () => {
        try {
            const response = await fetch(`${api.baseURL}/perguntas`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log(data);
            if (data.status === 200) {
                this.setState({ arrayPerguntas: data.resultados });
            }
        } catch (error) {
            console.log(error);
        }
    };


    handleClickSection() {
        const { nome, email, telefone, dt_nascimento, id_vinculoInstitucional } = this.state;
        if (!nome || !email || !telefone || !dt_nascimento || !id_vinculoInstitucional) {
            this.setState({ error: "Por favor, preecher o formulário com as informações acima!" });
            return;
        }
        this.setState({ numberSection: this.state.numberSection += 1, error: "" });
    }

    handleClickProximaPergunta() {
        if (this.state.numberQuestion <= this.state.arrayPerguntas.length) {
            let arrayCheckedPerguntas = document.getElementsByClassName('optRadioPergunta');
            for (let i = 0; i < arrayCheckedPerguntas.length; i++) {
                if (arrayCheckedPerguntas[i].checked) {
                    this.setState({
                        numberQuestion: this.state.numberQuestion += 1,
                        barra_progresso: parseInt((this.state.numberQuestion / this.state.arrayPerguntas.length) * 100)
                    });
                    arrayCheckedPerguntas[i].checked = false;
                    this.setState({ error: "" });
                    return
                }
                this.setState({ error: "Por favor, informe sim ou não!" });
            };
        }
    }

    guardaResposta = (resposta) => {
        let arrayResposta = this.state.arrayResposta;
        let indexPergunta = arrayResposta.findIndex(item => item.pergunta_id === resposta.pergunta_id);
        if (indexPergunta > -1) {
            arrayResposta.splice(indexPergunta, 1, resposta);
            this.setState({ arrayResposta: arrayResposta });
            return
        }
        arrayResposta.push(resposta);
        this.setState({ arrayResposta: arrayResposta });
    }

    refazerTeste = () => {
        this.setState({ numberQuestion: 0, arrayResposta: [], arrayResultados: [], numberSection: 2, exibirResult: false, desabilitaBotaoResult: false, error: "" });
    }

    cadastrarRespostasEObterResultado = async (e) => {
        e.preventDefault();
        this.setState({ success: '', error: '' });

        const { nome, email, telefone, dt_nascimento, id_vinculoInstitucional, arrayResposta } = this.state;
        try {
            const response = await fetch(`${api.baseURL}/respostas`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ arrayResposta, dadosUsuario: { nome, email, telefone, dt_nascimento, id_vinculoInstitucional } })
            });

            const data = await response.json();

            if (data.status === 200) {
                const resultadoFinal = [];

                if (data.resultados[0].pontuacaoPorHab === 0 && data.resultados[1].pontuacaoPorHab === 0) {
                    this.setState({ error: "Sugiro que você refaça o teste e responda as perguntas para que a pontuação possa ser gerada com mais precisão. Obrigado!", arrayResultados: [], exibirResult: false, desabilitaBotaoResult: true });
                    return;
                }
                resultadoFinal.push(data.resultados[0], data.resultados[1]);

                this.setState({ arrayResultados: resultadoFinal, exibirResult: true, desabilitaBotaoResult: true });
            }

            if (data.status === 400) {
                this.setState({ error: data.msg });
            }
        } catch (error) {
            this.setState({ error: 'Ocorreu um erro' });
        }
    }

    listaDeVinculoInstitucional = async () => {
        try {
            const response = await fetch(
                `${api.baseURL}/vinculo_institucional`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                }
            );

            const data = await response.json();
            if (data.status === 200) {
                this.setState({ array_vinculoInstitucional: data.resultados });
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const perguntas = this.state.arrayPerguntas;
        const resultados = this.state.arrayResultados;
        const array_vinculoInstitucional = this.state.array_vinculoInstitucional;

        return (
            <Container>
                {/* <Navbar /> */}
                <img src={LogoAdmin} className="logo mt-5 mb-4" />
                <FormContainer>
                    {this.state.numberSection === 0 && (
                        <div className="row">
                            <div className="col-12">
                                <h4 className='titulo mb-3'><FaUserPlus /> Teste vocacional</h4>
                                <div className='row'>
                                    <div className='col-sm-7'>
                                        <div className="form-group">
                                            <label htmlFor="INFORME O SEU NOME">Nome e sobrenone:</label>
                                            <input className="form-control form-control-sm" type="text" placeholder="INFORME O SEU NOME" name="nome" id="nome"
                                                onChange={e => this.setState({ nome: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className='col-sm-5'>
                                        <div className="form-group">
                                            <label htmlFor="INFORME O SEU E-MAIL">E-mail:</label>
                                            <input className="form-control form-control-sm" type="email" placeholder="INFORME O SEU E-MAIL" name="email" id="email"
                                                onChange={e => this.setState({ email: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-sm-6'>
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
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className="form-group">
                                            <label for="dt_nascimento">Data de nascimento:</label>
                                            <input class="form-control form-control-sm" type="date" id="dt_nascimento" name="dt_nascimento" value={this.state.dt_nascimento}
                                                min="2022-01"
                                                onChange={e => this.setState({ dt_nascimento: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label htmlFor="vinculo_institucional">Vinculo institucional:</label>
                                    <select class="form-control form-control-sm" id="vinculo_institucional"
                                        onChange={e => this.setState({ id_vinculoInstitucional: e.target.value })}>
                                        <option value="">{"Selecione uma opção".toLocaleUpperCase()}</option>
                                        {array_vinculoInstitucional.length > 0 ?
                                            array_vinculoInstitucional.map(vinculo_institucional => (
                                                <option value={vinculo_institucional.id}>{vinculo_institucional.nome}</option>
                                            ))
                                            : (<option>0</option>)}
                                    </select>
                                </div>

                                <hr />
                                {this.state.success && (
                                    <div class="alert alert-success text-center" role="alert">
                                        {this.state.success}
                                    </div>
                                )}
                                {this.state.error && (
                                    <div className="alert alert-danger text-center" role="alert">
                                        {this.state.error}
                                    </div>
                                )}

                                <div className='d-flex justify-content-center'>
                                    <button className="button" onClick={() => this.handleClickSection()}>Avançar</button>
                                </div>

                            </div>
                        </div>
                    )}

                    {this.state.numberSection === 1 && (
                        <div className="row">
                            <div className="col-12">
                                <FaQuestion style={{ width: "200px", height: "40px", display: "block", margin: "0 auto 15px" }} />
                                <p style={{ textAlign: 'justify' }}>O teste vocacional ajuda as pessoas a descobrir suas habilidades e interesses em diferentes carreiras,
                                    oferecendo informações para tomada de decisões informadas sobre a escolha profissional.
                                    Ele envolve perguntas e atividades para identificar as características e aptidões do indivíduo.</p>
                                <div className='d-flex justify-content-center'>
                                    <button className="button" onClick={() => this.handleClickSection()}>Iniciar questionário</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {this.state.numberSection === 2 && (
                        perguntas.length > 0 && perguntas.length > this.state.numberQuestion ? (
                            <div className="row">
                                <div className="col-12 text-center">
                                    <div className='d-flex justify-content-center'>
                                        {this.state.barra_progresso !== 0 ? (<div className="progress w-50">
                                            <div className="progress-bar" style={{ width: `${`${this.state.barra_progresso}%`}` }}>{this.state.barra_progresso}%</div>
                                        </div>) : (<div className="progress w-50">
                                            <div className="progress-bar" style={{ width: `0%`} }>0%</div>
                                        </div>)}
                                    </div>

                                    <p className='mt-3'>{perguntas[this.state.numberQuestion].descricao}</p>
                                    <div className='d-flex justify-content-center'>
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input type="radio" class="form-check-input optRadioPergunta" name="optradio" onClick={() => this.guardaResposta
                                                    ({
                                                        pergunta_id: perguntas[this.state.numberQuestion].id,
                                                        resposta: 1
                                                    })} />SIM
                                            </label>
                                        </div>
                                        <div class="form-check ml-2">
                                            <label class="form-check-label">
                                                <input type="radio" class="form-check-input optRadioPergunta" name="optradio" onClick={() => this.guardaResposta
                                                    ({
                                                        pergunta_id: perguntas[this.state.numberQuestion].id,
                                                        resposta: 0
                                                    })} />NÃO
                                            </label>
                                        </div>
                                    </div>
                                    <hr />
                                    {this.state.success && (
                                        <div class="alert alert-success text-center" role="alert">
                                            {this.state.success}
                                        </div>
                                    )}
                                    {this.state.error && (
                                        <div className="alert alert-danger text-center" role="alert">
                                            {this.state.error}
                                        </div>
                                    )}
                                    <div className='d-flex justify-content-center'>
                                        <button className="button" onClick={() => this.handleClickProximaPergunta()}>Avançar</button>
                                    </div>
                                </div>
                            </div>
                        ) : (<div className="row">
                            <div className="col-12">
                                <FaReadme style={{ width: "200px", height: "40px", display: "block", margin: "0 auto 15px" }} />
                                <p style={{ textAlign: 'justify' }}>O teste vocacional foi finalizado com sucesso, clique no botão abaixo para obter o resultado</p>

                                {/* d-flex justify-content-center p-3 */}
                                <div className='row text-center'>
                                    <div className='col-sm-6'>
                                        <Form onSubmit={this.cadastrarRespostasEObterResultado}>
                                            <button type='submit' className="button" disabled={this.state.desabilitaBotaoResult}>Obter resultado</button>
                                        </Form>
                                    </div>
                                    <div className='col-sm-6'>
                                        <button className="button" onClick={() => this.refazerTeste()}>Refazer o teste</button>
                                    </div>
                                </div>

                                {this.state.error && (
                                    <div className="alert alert-danger text-center mt-3" role="alert">
                                        {this.state.error}
                                    </div>
                                )}

                                {this.state.exibirResult && (
                                    <div className='container mt-5'>
                                        <h4 className='titulo mb-3'><FaChartPie /> Resultado</h4>
                                        <div class="table-responsive">
                                            <table class="table table-sm text-center table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Habilidade</th>
                                                        <th>Pontuação</th>
                                                        <th>Áreas de atuação</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {resultados.length > 0 ? (
                                                        resultados.map((item, index) => (
                                                            <tr>
                                                                <td>{item.habilidade}</td>
                                                                <td>{item.pontuacaoPorHab}</td>
                                                                <td>{item.areas_atuacao}</td>
                                                            </tr>
                                                        ))
                                                    ) : ("")}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>)
                    )}
                </FormContainer>
            </Container>
        )
    }
}