import React from 'react';
import {
    Accordion,
    Card,
    Button,
    Modal,
    Form
} from 'react-bootstrap';
import {
    FaCalendarWeek,
    FaClipboardList,
    FaFileExport,
    FaFolderOpen,
    FaRegSave,
    FaUsers
} from 'react-icons/fa';
import { handleCpf } from '../../services/mascaraCpf';
import { handleTelefone } from '../../services/mascaraTelefone';

const SolicitacaoAccordion = ({
    state,
    setModalShowCadastrarAnexo,
    handleFileInputChange,
    cadastrarDocumentoDoCredenciamento,
    setState
}) => (
    <>
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Button as={Button} variant="link" eventKey="0">
                        <FaUsers /> Informações da solicitação
                    </Accordion.Button>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div className="row">
                            <div className="col-sm-6">
                                <Form.Group controlId="nome">
                                    <Form.Label>Nome completo:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="INFORME O SEU NOME"
                                        value={state.nome}
                                        onChange={(e) => setState(prev => ({ ...prev, nome: e.target.value }))}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-sm-6">
                                <Form.Group controlId="email">
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="INFORME O SEU E-MAIL"
                                        value={state.email}
                                        onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-4">
                                <Form.Group controlId="telefone">
                                    <Form.Label>Telefone:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="INFORME O SEU TELEFONE"
                                        value={state.telefone}
                                        onChange={(e) => handleTelefone(e.target.value)
                                            .then(result => setState(prev => ({ ...prev, telefone: result })))}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-sm-4">
                                <Form.Group controlId="cpf">
                                    <Form.Label>CPF:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="INFORME O SEU CPF"
                                        value={state.cpf}
                                        onChange={(e) => handleCpf(e.target.value)
                                            .then(result => setState(prev => ({ ...prev, cpf: result })))}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-sm-4">
                                <Form.Group controlId="cnpj">
                                    <Form.Label>CNPJ:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="INFORME O SEU CNPJ"
                                        value={state.cnpj}
                                        onChange={(e) => setState(prev => ({ ...prev, cnpj: e.target.value }))}
                                        maxLength="18"
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-sm-4'>
                                <Form.Group controlId="cnpj">
                                    <Form.Label>CNPJ:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="INFORME O SEU CNPJ"
                                        value={state.cnpj}
                                        onChange={(e) => setState(prev => ({ ...prev, cnpj: e.target.value }))}
                                        maxLength="18"
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-sm-8'>
                                <Form.Group controlId="razao_social">
                                    <Form.Label>Razão Social:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={state.razao_social}
                                        onChange={(e) => setState(prev => ({ ...prev, razao_social: e.target.value }))}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-sm-8'>
                                <Form.Group controlId="nome_fantasia">
                                    <Form.Label>Nome Fantasia:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={state.nome_fantasia}
                                        onChange={(e) => setState(prev => ({ ...prev, nome_fantasia: e.target.value }))}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-sm-4'>
                                <Form.Group controlId="selectStatus">
                                    <Form.Label>Status da Solicitação:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={state.status}
                                        onChange={e => setState(prev => ({ ...prev, status: e.target.value }))}
                                    >
                                        {state.arrayStatus.length > 0 ? (
                                            state.arrayStatus.map(item =>
                                                item.id === 5 || item.id === 6 || item.id === 7 ?
                                                    (<option key={item.id} value={item.id}>{item.nome}</option>) : null)
                                        ) : (
                                            <option value="0">Nenhum resultado encontrado</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
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
                <h4 className='titulo'><FaCalendarWeek /> Anexos do {state.itemDochecklist}</h4>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-sm-6'>
                        <h4><FaFileExport /> Enviar um novo anexo</h4>
                        <Form onSubmit={cadastrarDocumentoDoCredenciamento}>
                            <div className='container'>
                                <Form.Group controlId="anexo" className="mb-3">
                                    <Form.Label>Anexar arquivo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        className="form-control form-control-sm"
                                        onChange={handleFileInputChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className='float-right'>
                                <Button type="submit" className='button'><FaRegSave /> Salvar</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
);

export default SolicitacaoAccordion;
