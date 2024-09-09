import React from 'react';
import { Accordion, Form, Row, Col } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';
import { handleCpf } from '../../services/mascaraCpf';
import { handleTelefone } from '../../services/mascaraTelefone';

const SolicitacaoInfo = ({ state, setState }) => {
    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <FaUsers /> Informações da solicitação
            </Accordion.Header>
            <Accordion.Body>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="nome">
                                <Form.Label>Nome completo:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="INFORME O SEU NOME"
                                    value={state.nome}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, nome: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="INFORME O SEU E-MAIL"
                                    value={state.email}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, email: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>
                            <Form.Group controlId="telefone">
                                <Form.Label>Telefone:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="INFORME O SEU TELEFONE"
                                    value={state.telefone}
                                    onChange={(e) => handleTelefone(e.target.value).then((result) => setState((prevState) => ({ ...prevState, telefone: result })))}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group controlId="cpf">
                                <Form.Label>CPF:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="INFORME O SEU CPF"
                                    value={state.cpf}
                                    onChange={(e) => handleCpf(e.target.value).then((result) => setState((prevState) => ({ ...prevState, cpf: result })))}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group controlId="senha">
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="INFORME A SUA SENHA"
                                    value={state.senha}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, senha: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="confirmarSenha">
                                <Form.Label>Confirmar Senha:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="CONFIRME A SUA SENHA"
                                    value={state.confirmarSenha}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, confirmarSenha: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="cnpj">
                                <Form.Label>CNPJ:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="INFORME O CNPJ"
                                    value={state.cnpj}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, cnpj: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="razao_social">
                                <Form.Label>Razão Social:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="INFORME A RAZÃO SOCIAL"
                                    value={state.razao_social}
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="nome_fantasia">
                                <Form.Label>Nome Fantasia:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="INFORME O NOME FANTASIA"
                                    value={state.nome_fantasia}
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="estado">
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={state.id_estado || 0}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, id_estado: e.target.value }))}
                                >
                                    <option value="0">Selecione o Estado</option>
                                    {state.arrayEstados && state.arrayEstados.length > 0 ? (
                                        state.arrayEstados.map((estado) => (
                                            <option key={estado.id} value={estado.id}>
                                                {estado.nome}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="0">Nenhum estado encontrado</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col sm={6}>
                            <Form.Group controlId="cidade">
                                <Form.Label>Cidade:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={state.cidade}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, cidade: e.target.value }))}
                                >
                                    <option value="0">Selecione a Cidade</option>
                                    {state.arrayCidades && state.arrayCidades.length > 0 ? (
                                        state.arrayCidades.map((cidade) => (
                                            <option key={cidade} value={cidade}>
                                                {cidade}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="0">Nenhuma cidade encontrada</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <Form.Group controlId="status">
                                <Form.Label>Status da Solicitação:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={state.status}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, status: e.target.value }))}
                                >
                                    <option value="0">Selecione o Status</option>
                                    {state.arrayStatus && state.arrayStatus.length > 0 ? (
                                        state.arrayStatus.map((status) => (
                                            <option key={status.id} value={status.id}>
                                                {status.nome}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="0">Nenhum status encontrado</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default SolicitacaoInfo;
