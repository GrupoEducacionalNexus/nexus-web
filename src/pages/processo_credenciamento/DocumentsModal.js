// src/pages/processo_credenciamento/DocumentsModal.js

import React, { useState } from 'react';
import { Modal, Table, Form, ProgressBar, Button, Alert, Spinner } from 'react-bootstrap';

const DocumentsModal = ({ show, onHide, documentos, instrucoes, onFileChange, onSubmitFile, progressoUpload, loading }) => {
    const [alertaArquivoDuplicado, setAlertaArquivoDuplicado] = useState(false);

    // Verifica se o último documento enviado tem status que permite novo envio
    const ultimoDocumento = documentos?.length > 0 ? documentos[documentos.length - 1] : null;

    // IDs de status que permitem novo envio
    const statusPermitidosParaReenvio = [4, 11, 12, 13];

    // Permitir reenvio apenas se o status estiver nos permitidos
    const permiteNovoEnvio = !ultimoDocumento || statusPermitidosParaReenvio.includes(ultimoDocumento.id_status);

    // Função para verificar se o arquivo com o mesmo nome já foi enviado
    const handleFileChange = (e) => {
        const arquivoSelecionado = e.target.files[0];
        const nomeArquivoSelecionado = arquivoSelecionado?.name;

        // Verificar se algum dos documentos anexados tem o mesmo nome de arquivo
        const arquivoDuplicado = documentos.some(doc => {
            const nomeArquivoAnexado = doc.anexo.split('/').pop(); // Extrai apenas o nome do arquivo da URL
            return nomeArquivoAnexado === nomeArquivoSelecionado;
        });

        if (arquivoDuplicado) {
            setAlertaArquivoDuplicado(true);
        } else {
            setAlertaArquivoDuplicado(false);
            onFileChange(e);  // Passa o arquivo para a função de controle principal
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Anexos e Instruções</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-sm-6">
                        <h4>Instruções</h4>
                        <ul>
                            {instrucoes.length > 0 ? (
                                instrucoes.map((instrucao, index) => <li key={index}>{instrucao.descricao}</li>)
                            ) : (
                                <li>Nenhuma instrução encontrada.</li>
                            )}
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <h4>Anexar um novo documento</h4>
                        {!permiteNovoEnvio ? (
                            <Alert variant="warning">
                                Você já enviou um documento. Aguarde o setor de convênios revisar o documento enviado.
                            </Alert>
                        ) : (
                            <>
                                <Form onSubmit={onSubmitFile}>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Escolha um arquivo</Form.Label>
                                        <Form.Control type="file" onChange={handleFileChange} disabled={loading} />
                                    </Form.Group>
                                    {progressoUpload > 0 && <ProgressBar now={progressoUpload} label={`${progressoUpload}%`} />}
                                    <Button className='button' type="submit" disabled={alertaArquivoDuplicado || loading}>
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                /> Enviando...
                                            </>
                                        ) : (
                                            'Salvar'
                                        )}
                                    </Button>
                                </Form>
                                {alertaArquivoDuplicado && (
                                    <Alert variant="danger" className="mt-3">
                                        Este arquivo já foi enviado. Selecione um arquivo diferente.
                                    </Alert>
                                )}
                            </>
                        )}

                        <hr />
                        <h4>Anexos Enviados</h4>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Anexo</th>
                                    <th>Status</th>
                                    <th>Observação</th>
                                    <th>Data do envio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentos?.length > 0 ? (
                                    documentos.map((anexo, index) => (
                                        <tr key={index}>
                                            <td><a href={anexo.anexo} target="_blank" rel="noopener noreferrer">Visualizar</a></td>
                                            <td>{anexo.status}</td>
                                            <td>{anexo.observacao || ''}</td>
                                            <td>{anexo.dataHoraCriacao}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Nenhum documento encontrado</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DocumentsModal;
