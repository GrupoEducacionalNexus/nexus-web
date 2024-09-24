// src/components/Checklist.js
import React from 'react';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import { FaCheckSquare, FaFolderOpen } from 'react-icons/fa';

const Checklist = ({ arrayChecklistCredenciamento, handlerShowModalCadastrarAnexo }) => {
  return (
    <Accordion.Item eventKey="1">
      <Card.Header>
        <Accordion.Item eventKey="0" as={Button} variant="link">
          <FaCheckSquare /> Checklist do credenciamento
        </Accordion.Item>
      </Card.Header>
      <Accordion.Body>
        <Row>
          {arrayChecklistCredenciamento.length > 0 ? (
            arrayChecklistCredenciamento.map((checklistCredenciamento, index) => (
              <Col sm={4} key={checklistCredenciamento.id_checklist}>
                <Card className="text-center font-weight-bold zoom" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', height: '200px', border: '1px solid #000233' }}>
                  <Card.Header>{String.fromCharCode(97 + index)} - {checklistCredenciamento.nome}</Card.Header>
                  <Card.Body>
                    <Button onClick={() => handlerShowModalCadastrarAnexo(checklistCredenciamento)}>
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
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Checklist;
