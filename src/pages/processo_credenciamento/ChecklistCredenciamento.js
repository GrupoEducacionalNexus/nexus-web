import React from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';

const ChecklistCredenciamento = ({ checklists, handleShowModal }) => {
  return (
    <Accordion defaultActiveKey="1">
      <Card>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Checklist do Credenciamento</Accordion.Header>
        <Accordion.Body>
          <Row>
              {checklists.length > 0 ? (
              checklists.map((checklist, index) => (
                <Col sm={4} key={index}>
                  <Card className="text-center font-weight-bold">
                    <Card.Header>{index + 1} - {checklist.nome}</Card.Header>
                    <Card.Body>
                      <Button
                        className="button"
                        onClick={() => handleShowModal(checklist)}>
                        Ver Anexos e Instruções
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
      </Card>
    </Accordion>
  );
};

export default ChecklistCredenciamento;
