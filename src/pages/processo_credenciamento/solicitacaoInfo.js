// src/components/SolicitacaoInfo.js
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const SolicitacaoInfo = ({ solicitacaoInfo }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Informações da Solicitação</Accordion.Header>
          <Accordion.Body>
            <p><strong>Nome do Gestor:</strong> {solicitacaoInfo.gestor}</p>
            <p><strong>Email:</strong> {solicitacaoInfo.email}</p>
            <p><strong>Telefone:</strong> {solicitacaoInfo.telefone}</p>
            <p><strong>CPF/CNPJ:</strong> {solicitacaoInfo.cpf_cnpj}</p>
            <p><strong>Razão Social:</strong> {solicitacaoInfo.razao_social}</p>
            <p><strong>Nome Fantasia:</strong> {solicitacaoInfo.nome_fantasia}</p>
            <p><strong>Status da Solicitação:</strong> 
              <span style={{ color: 'green' }}>{solicitacaoInfo.status}</span>
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Card>
    </Accordion>
  );
};

export default SolicitacaoInfo;
