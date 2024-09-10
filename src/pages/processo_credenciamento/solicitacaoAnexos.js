import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap';
import Menu from '../../components/Menu';
import AdminNavbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import { uploadFile } from '../../services/uploadFile';
import UserContext from '../../UserContext';
import { buscaSolicitacaoDeCredenciamento, listaDedocumentosDoCredenciamentoApi } from '../../services/credenciamento/credenciamentoService';

class Index extends Component {
    static contextType = UserContext;

    constructor(props) {
        super();
        this.state = {
            id_credenciamento: 0,
            arquivo: null,
            progressoUpload: 0,
            arrayDocumentosDoCredenciamento: [],
            success: '',
            error: '',
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
                this.setState({ id_credenciamento: credenciamento.id_credenciamento });
                this.listaDedocumentosDoCredenciamento(credenciamento.id_credenciamento);
            }
        } catch (error) {
            console.error('Erro ao buscar credenciamento:', error);
        }
    };

    listaDedocumentosDoCredenciamento = async (id_checklist_credenciamento, id_credenciamento) => {
        try {
            const token = getToken();
            const response = await fetch(`${api.baseURL}/checklist_credenciamento/${id_checklist_credenciamento}/documento_credenciamento?id_credenciamento=${id_credenciamento}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            });
    
            const data = await response.json();
            if (data.status === 200) {
                this.setState({ arrayDocumentosDoCredenciamento: data.resultados });
            } else {
                console.error('Erro ao carregar documentos:', data.msg);
            }
        } catch (error) {
            console.error('Erro ao buscar documentos:', error);
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

            // Após o upload, atualiza a lista de documentos anexados
            this.listaDedocumentosDoCredenciamento(id_credenciamento);
            this.setState({ success: 'Arquivo enviado com sucesso!' });
        } catch (error) {
            this.setState({ error: 'Erro ao enviar documento. Tente novamente.' });
            console.error('Erro ao enviar documento:', error);
        }
    };

    onProgress = (percentCompleted) => {
        this.setState({ progressoUpload: percentCompleted });
    };

    render() {
        const { progressoUpload, arrayDocumentosDoCredenciamento, success, error } = this.state;

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
                            <Form onSubmit={this.cadastrarDocumentoDoCredenciamento}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Anexar arquivo</Form.Label>
                                    <Form.Control type="file" onChange={this.onChangeFileInput} />
                                </Form.Group>
                                {progressoUpload > 0 && (
                                    <ProgressBar now={progressoUpload} label={`${progressoUpload}%`} />
                                )}
                                <Button id="btnCadastrarAnexo" variant="primary" type="submit">
                                    Salvar
                                </Button>
                            </Form>

                            {success && <div className="alert alert-success mt-3">{success}</div>}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}

                            <hr />
                            <h4>Anexos já enviados</h4>
                            <ul>
                                {arrayDocumentosDoCredenciamento.length > 0 ? (
                                    arrayDocumentosDoCredenciamento.map((documento, index) => (
                                        <li key={index}>
                                            <a href={documento.anexo} target="_blank" rel="noopener noreferrer">Visualizar Anexo</a>
                                            <span> - Status: {documento.status}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li>Nenhum anexo enviado.</li>
                                )}
                            </ul>
                        </MainContent>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Index;
