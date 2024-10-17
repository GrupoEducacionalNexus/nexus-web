import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaCalendarWeek } from 'react-icons/fa';
import Logo_ATA from './../../../assets/logo_ata.jpg';

const ModalVisualizarCertificadoDeAprovacao = ({
  show,
  onHide,
  titulo,
  nome,
  orientador,
  arrayMembrosDaDeclaracaoDeParticipacao
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <h4 className='titulo'>
          <FaCalendarWeek /> Certificado de Aprovação
        </h4>
      </Modal.Header>
      <Modal.Body>
        <div id='certificado_aprovacao'>
          <div className='container'>
            <img style={{ minWidth: '100%', marginBottom: '10px' }} src={Logo_ATA} alt="Logo ATA" />
            <h4 className='font-weight-bold text-center mt-3 mb-5 p-3'>CERTIFICADO DE APROVAÇÃO</h4>

            <p className='mt-3 p-3'>TÍTULO DA TESE: {titulo}</p>
            <p className='font-weight-bold p-3'>AUTORA: {nome}</p>
            {/* <p className='font-weight-bold p-3'>ORIENTADOR(A): {orientador}</p> */}

            {/* <p className='p-3'>Aprovada como parte das exigências para obtenção do Título de Doutora em Ciências Sociais, pela Comissão Examinadora:</p> */}

            {arrayMembrosDaDeclaracaoDeParticipacao.length > 0 ? (
              arrayMembrosDaDeclaracaoDeParticipacao.map((membro, index) => (
                <div key={index}>
                  <img className="img-fluid" style={{ width: "220px", display: 'block', margin: '0 auto' }} src={membro.assinatura} alt={`Assinatura de ${membro.nome}`} />
                  <hr />
                  <p className="text-center">{membro.nome.toLocaleUpperCase()}</p>
                </div>
              ))
            ) : (
              ""
            )}
            <h6 className='text-rodape p-3'>7350 FUTURES DRIVE, ORLANDO, FL 32819 WWW.ENBERUNIVERSITY.COM TEL : +1 321-300-9710</h6>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalVisualizarCertificadoDeAprovacao;