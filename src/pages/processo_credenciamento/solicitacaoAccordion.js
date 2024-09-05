import React from 'react';
import {
    Accordion,
    Button,
    Card,
    Col,
    Modal,
    Row,
    Form
} from 'react-bootstrap';
import {
    FaCalendarWeek,
    FaFileExport,
    FaFolderOpen,
    FaRegCheckSquare,
    FaRegSave,
    FaUsers
} from 'react-icons/fa';
import { handleCpf } from '../../services/mascaraCpf';
import { handleTelefone } from '../../services/mascaraTelefone';
import { alfabeto } from '../../services/alfabeto'; // Importe a função ou variável alfabeto

const SolicitacaoAccordion = ({
    state,
    setModalShowCadastrarAnexo,
    handleFileInputChange,
    cadastrarDocumentoDoCredenciamento,
    setState,
    arrayChecklistCredenciamento
}) => (
    <>
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header as={Card.Header} >
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
                                        onChange={(e) => setState(prev => ({ ...prev, nome: e.target.value }))}
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
                                        onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
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
                                        onChange={(e) => handleTelefone(e.target.value).then(result => setState(prev => ({ ...prev, telefone: result })))}
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
                                        onChange={(e) => handleCpf(e.target.value).then(result => setState(prev => ({ ...prev, cpf: result })))}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group controlId="cnpj">
                                    <Form.Label>CNPJ:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="INFORME O SEU CNPJ"
                                        value={state.cnpj}
                                        onChange={(e) => setState(prev => ({ ...prev, cnpj: e.target.value }))}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <Form.Group controlId="razao_social">
                                    <Form.Label>Razão Social:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="INFORME A RAZÃO SOCIAL"
                                        value={state.razao_social}
                                        onChange={(e) => setState(prev => ({ ...prev, razao_social: e.target.value }))}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group controlId="nome_fantasia">
                                    <Form.Label>Nome Fantasia:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="INFORME O NOME FANTASIA"
                                        value={state.nome_fantasia}
                                        onChange={(e) => setState(prev => ({ ...prev, nome_fantasia: e.target.value }))}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group controlId="status">
                                    <Form.Label>Status da Solicitação:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={state.status}
                                        onChange={(e) => setState(prev => ({ ...prev, status: e.target.value }))}
                                    >
                                        {state.arrayStatus.length > 0 ? (
                                            state.arrayStatus.map((item) =>
                                                (item.id === 5 || item.id === 6 || item.id === 7) && (
                                                    <option key={item.id} value={item.id}>
                                                        {item.nome}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value="0">Nenhum resultado encontrado</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header as={Card.Header}>
                    <FaRegCheckSquare /> Checklist do credenciamento
                </Accordion.Header>
                <Accordion.Body>
                    <div style={{
                        height: '350px',
                        overflowY: 'scroll',
                        padding: '30px'
                    }}>
                        <Row>
                            {arrayChecklistCredenciamento.length > 0 ? (
                                arrayChecklistCredenciamento.map((checklistCredenciamento, index) => (
                                    <Col sm={4} key={checklistCredenciamento.id_checklist}>
                                        <Card
                                            className="text-center font-weight-bold zoom"
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                                height: '200px',
                                                border: '1px solid #000233'
                                            }}
                                        >
                                            <Card.Header>
                                                {alfabeto()[index]} - {checklistCredenciamento.nome}
                                            </Card.Header>
                                            <Card.Body>
                                                <Button
                                                    onClick={() => setModalShowCadastrarAnexo(checklistCredenciamento)}
                                                >
                                                    <FaFolderOpen /> Instruções e anexos
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col>Nenhum checklist encontrado</Col>
                            )}
                        </Row>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

        {/* Modal para Anexar Documentos */}
        <Modal
            show={state.modalShowCadastrarAnexo}
            onHide={() => setModalShowCadastrarAnexo(false)}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <FaCalendarWeek /> Anexos do {state.itemDochecklist}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <h4><FaFileExport /> Enviar um novo anexo</h4>
                        <Form onSubmit={cadastrarDocumentoDoCredenciamento}>
                            <Form.Group controlId="anexo" className="mb-3">
                                <Form.Label>Anexar arquivo</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleFileInputChange}
                                />
                            </Form.Group>
                            <Button type="submit" className="float-right">
                                <FaRegSave /> Salvar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </>
);

export default SolicitacaoAccordion;
