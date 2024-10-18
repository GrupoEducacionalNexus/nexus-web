import React from 'react';
import { Container, Accordion, Spinner } from 'react-bootstrap';
import { FaLayerGroup } from 'react-icons/fa';

function BancaList({ titulo, icone, bancas, campoStatus, renderButtons }) {
  return (
    <div className='col-sm-6'>
      <h4 className='text-center lead font-weight-bold'>{icone} {titulo}</h4>
      <Container style={{ maxHeight: "400px", overflowY: 'scroll', textAlign: 'center' }}>
        <Accordion>
          {bancas.length > 0 ? (
            bancas.map(banca => (
              <Accordion key={banca.id} defaultActiveKey="0" flush style={{ backgroundColor: banca[campoStatus] === "FINALIZADA" ? "#00ff87" : "" }}>
                <Accordion.Item eventKey={banca.id} style={{ backgroundColor: '#ffffff', marginBottom: '5px' }}>
                  <Accordion.Header>
                    <h5><FaLayerGroup /> {banca.orientando_nome ? banca.orientando_nome.toUpperCase() : ""} - {banca[campoStatus]}</h5>
                    <h6 className="list-group-item">Curso: {banca.curso}</h6>
                    <h6 className="list-group-item">Data e hora prevista: {banca.dataHoraPrevistaFormatada}</h6>
                  </Accordion.Header>
                  <Accordion.Body style={{ overflowY: "scroll", height: "350px" }}>
                    <div className='d-flex flex-column'>
                      {renderButtons(banca)}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden"></span>
            </Spinner>
          )}
        </Accordion>
      </Container>
    </div>
  );
}

export default BancaList;
