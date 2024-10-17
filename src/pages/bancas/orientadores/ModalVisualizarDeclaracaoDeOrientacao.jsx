import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import RODAPE1 from './../../../assets/rodape1.png';
import RODAPE2 from './../../../assets/rodape2.png';
import RODAPE3 from './../../../assets/rodape3.png';
import RODAPE4 from './../../../assets/rodape4.png';
import BACKGROUND_ENBER from './../../../assets/background_enber.png';
import Logo_ATA from './../../../assets/logo_ata.jpg';
import ASSINATURA_JOSUE from './../../../assets/assinatura_josue.png';

const ModalVisualizarDeclaracaoDeOrientacao = ({
  show,
  onHide,
  documentoEmIngles,
  orientador,
  orientando,
  curso,
  id_curso,
  titulo,
  title,
  dataDeclaracaoEnUs,
  dataDeclaracaoPtBr,
  sexo,
  codigo_validacao,
  print
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
        <h4 className="titulo mb-3">
          <FaUserGraduate /> Declaração de orientação
        </h4>
      </Modal.Header>
      <Modal.Body>
        <div
          id="declaracao_participacao"
          className="container"
          style={{
            background: `url(${BACKGROUND_ENBER})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '600px 600px',
          }}
        >
          {documentoEmIngles ? (
            <div className="container">
              <img style={{ minWidth: '100%', marginBottom: '10px' }} src={Logo_ATA} />
              <div style={{ padding: '50px' }}>
                <h4 className="text-center font-weight-bold mb-3">Guidance statement</h4>
                <p
                  style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12pt', textAlign: 'justify' }}
                  className="p-3"
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We hereby declare that {sexo === 'M' ? ' Prof. Dr. ' : ' Prof(a). Dr(a). '}
                  <b>{orientador}</b> from the
                  {id_curso === 1 || id_curso === 2 ? ' Postgraduate Program in Educational Sciences' : ''}
                  {id_curso === 3 || id_curso === 4 ? ' Postgraduate Program in Theology' : ''} supervised the
                  {id_curso === 1 || id_curso === 2 ? ' Dissertation ' : ' Thesis '}
                  of {orientando}, a regular student of the
                  {id_curso === 1 || id_curso === 2 ? ' Postgraduate Program in Educational Sciences' : ''}
                  {id_curso === 3 || id_curso === 4 ? ' Postgraduate Program in Theology' : ''}, in the Master's course
                  titled: <b>{title.toUpperCase()}</b>.
                </p>

                <p className="text-right p-3">Orlando, {dataDeclaracaoEnUs}</p>

                <div className="row d-flex justify-content-center mt-2 mb-2">
                  <div className="col-lg-6 col-lg-offset-6 text-center">
                    <div className="ml-auto">
                      <img
                        style={{ display: 'block', margin: '0 auto' }}
                        src="https://gestor-administrativo.s3.amazonaws.com/enber/assinaturas/Alcimar.png"
                      />
                      <p className="border-top border-dark">
                        Ivy Enber Christian University
                        <br />
                        Alcimar José da Silva
                        <br />
                        President
                      </p>
                      <img
                        style={{ width: '100px', height: '100px', display: 'block', margin: '0 auto' }}
                        src={ASSINATURA_JOSUE}
                      />
                      <p className="border-top border-dark">
                        Ivy Enber Christian University
                        <br />
                        Josué Claudio Dantas
                        <br />
                        Chancellor
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-center">Proof Control Code: {codigo_validacao}</p>
                <p className="text-center" style={{ marginTop: '100px' }}>
                  The authenticity of this statement can be confirmed at https://www.gestorgruponexus.com.br/validacao
                </p>
                <div className="row" style={{ marginTop: '80px' }}>
                  <div className="col-sm-6">
                    <p style={{ fontSize: '8pt' }}>
                      Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047 Section 1005.06
                      (1)(f). Florida Comission for independent Education
                    </p>
                  </div>
                  <div className="col-sm-6 d-flex justify-content-center">
                    <img style={{ width: '50px', height: '50px' }} src={RODAPE1} />
                    <img style={{ width: '50px', height: '50px' }} src={RODAPE2} />
                    <img style={{ width: '50px', height: '50px' }} src={RODAPE3} />
                    <img style={{ width: '120px', height: '40px' }} src={RODAPE4} />
                  </div>
                </div>
                <p className="text-center mt-3" style={{ fontSize: '9pt' }}>
                  7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710
                </p>
              </div>
            </div>
          ) : (
            <div className="container">
              <img style={{ minWidth: '100%', marginBottom: '10px' }} src={Logo_ATA} />
              <div style={{ padding: '50px' }}>
                <h4 className="text-center font-weight-bold mb-3">DECLARAÇÃO DE ORIENTAÇÃO</h4>
                <p style={{ fontSize: '12pt', textAlign: 'justify' }} className="p-3">
                  &nbsp;&nbsp;&nbsp;&nbsp;Declaramos que a {sexo === 'M' ? ' Prof. Dr. ' : ' Prof(a). Dr(a). '}
                  <b>{orientador + ' '}</b> do(a)
                  {id_curso === 1 || id_curso === 2 ? ' Programa de Pós Graduação em Ciências da Educação' : ''}
                  {id_curso === 3 || id_curso === 4 ? ' Programa de Pós Graduação em Teologia' : ''}, realizou a
                  orientação
                  {id_curso === 1 || id_curso === 3 ? ' da dissertação ' : ' de tese '}
                  de {orientando.toLocaleUpperCase()}, discente regular do
                  {id_curso === 1 || id_curso === 2 ? ' Programa de Pós Graduação em Ciências da Educação' : ''}
                  {id_curso === 3 || id_curso === 4 ? ' Programa de Pós Graduação em Teologia' : ''}, no curso de
                  {curso.split(' ', 1)[0] + ' '} cujo trabalho se intitula: <b>{titulo}</b>
                </p>
                <p className="mt-3 mb-3 text-right p-3">Orlando, {dataDeclaracaoPtBr}</p>
                <div className="row d-flex justify-content-center mt-2 mb-2">
                  <div className="col-lg-6 col-lg-offset-6 text-center">
                    <div className="ml-auto">
                      <img
                        style={{ display: 'block', margin: '0 auto' }}
                        src="https://gestor-administrativo.s3.amazonaws.com/enber/assinaturas/Alcimar.png"
                      />
                      <hr className="hr" />
                      <p>
                        Ivy Enber Christian University
                        <br />
                        Alcimar José da Silva
                        <br />
                        Presidente
                      </p>
                      <img
                        style={{ width: '100px', height: '100px', display: 'block', margin: '0 auto' }}
                        src={ASSINATURA_JOSUE}
                      />
                      <hr className="hr" />
                      <p>
                        Ivy Enber Christian University
                        <br />
                        Josué Claudio Dantas
                        <br />
                        Reitor
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-center" style={{ marginTop: '100px' }}>
                  Código de controle do comprovante: {codigo_validacao}
                </p>
                <p className="text-center">
                  A autenticidade desta declaração poderá ser confirmada no endereço
                  https://www.gestorgruponexus.com.br/validacao
                </p>
                <div className="row" style={{ marginTop: '80px' }}>
                  <div className="col-sm-6">
                    <p style={{ fontSize: '8pt' }}>
                      Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047 Section 1005.06
                      (1)(f). Florida Comission for independent Education
                    </p>
                  </div>
                  <div className="col-sm-6 d-flex justify-content-center">
                    <img style={{ width: '50px', height: '50px' }} src={RODAPE1} />
                    <img style={{ width: '50px', height: '50px' }} src={RODAPE2} />
                    <img style={{ width: '50px', height: '50px' }} src={RODAPE3} />
                    <img style={{ width: '120px', height: '40px' }} src={RODAPE4} />
                  </div>
                </div>
                <p className="text-center mt-3" style={{ fontSize: '9pt' }}>
                  7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="button" onClick={() => print('declaracao_participacao')}>
          Imprimir
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalVisualizarDeclaracaoDeOrientacao;
         