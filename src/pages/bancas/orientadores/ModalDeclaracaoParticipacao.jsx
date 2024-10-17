// ModalDeclaracaoParticipacao.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import DocumentContainer from './DocumentContainer';
import DocumentHeader from './DocumentHeader';
import MemberList from './MemberList';
import SignatureBlock from './SignatureBlock';
import DocumentFooter from './DocumentFooter';

const ModalDeclaracaoParticipacao = ({
  show,
  onHide,
  membro = '',
  documentoEmIngles = false,
  sexo = '',
  data_horaPrevistaEnUs = '',
  data_horaPrevistaPtBr = '',
  getMemberRoleEnglish = () => '',
  getMemberRolePortuguese = () => '',
  getCourseTypeEnglish = () => '',
  getCourseTypePortuguese = () => '',
  getBancaTypeEnglish = () => '',
  getBancaTypePortuguese = () => '',
  getProgramNameEnglish = () => '',
  getProgramNamePortuguese = () => '',
  orientando = '',
  title = '',
  curso = '',
  titulo_banca = '',
  arrayMembrosDaDeclaracaoDeParticipacao = [],
  dataDeclaracaoEnUs = '',
  codigo_validacao = '',
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
        <h4 className="titulo">
          <FaUserGraduate /> Declaração de {membro}
        </h4>
      </Modal.Header>
      <Modal.Body>
        <div id="declaracao">
          <DocumentContainer>
            <DocumentHeader />
            <div style={{ padding: '50px' }}>
              <h4 className="text-center font-weight-bold mb-3">
                {documentoEmIngles ? 'CERTIFICATE OF PARTICIPATION' : 'DECLARAÇÃO DE PARTICIPAÇÃO'}
              </h4>

              {documentoEmIngles ? (
                <p className="text-justify p-4">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We hereby certify that{' '}
                  {sexo === 'M' ? 'Prof. Dr. ' : 'Prof(a). Dr(a). '}
                  <b>{membro.toUpperCase()}</b> participated on {data_horaPrevistaEnUs}, as an{' '}
                  {getMemberRoleEnglish(membro)} of the Examination Committee for the {getCourseTypeEnglish()}{' '}
                  {getBancaTypeEnglish()} of <b>{orientando.toUpperCase()}</b>, a regular student in the Graduate{' '}
                  <strong>{getProgramNameEnglish()}</strong>, titled <b>{title.toUpperCase()}</b>. The Examination
                  Committee was composed of the following members:
                </p>
              ) : (
                <p className="text-justify p-4">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atestamos que {sexo === 'M' ? 'o ' : 'a '}
                  {sexo === 'M' ? 'Prof. Dr. ' : 'Prof(a). Dr(a). '}
                  <b>{membro.toUpperCase()}</b>, participou em {data_horaPrevistaPtBr}, como{' '}
                  {getMemberRolePortuguese(membro)} da Comissão Examinadora da {getBancaTypePortuguese()}{' '}
                  {getCourseTypePortuguese()} de <b>{orientando.toUpperCase()}</b>, discente regular do{' '}
                  {getProgramNamePortuguese()}, Curso de {curso ? curso.split(' ', 1)[0] : ''}, cujo trabalho se
                  intitula <b>{titulo_banca.toUpperCase()}</b>. A Comissão Examinadora foi constituída pelos seguintes
                  membros:
                </p>
              )}

              {/* Lista de Membros */}
              <MemberList
                membros={arrayMembrosDaDeclaracaoDeParticipacao}
                isEnglish={documentoEmIngles}
              />

              <p className={documentoEmIngles ? 'text-right p-3' : 'mt-2 text-right p-4'}>
                {documentoEmIngles ? dataDeclaracaoEnUs : `Orlando, ${data_horaPrevistaPtBr}`}
              </p>

              <SignatureBlock isEnglish={documentoEmIngles} />

              <div className="row">
                <div className="col-sm-6">
                  <p className="text-center" style={{ fontSize: '8pt' }}>
                    {documentoEmIngles
                      ? `Proof Control Code: ${codigo_validacao}`
                      : `Código de controle do comprovante: ${codigo_validacao}`}
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="text-center" style={{ fontSize: '8pt' }}>
                    {documentoEmIngles
                      ? 'The authenticity of this certificate can be verified at https://www.gestorgruponexus.com.br/validacao'
                      : 'A autenticidade desta declaração poderá ser confirmada no endereço https://www.gestorgruponexus.com.br/validacao'}
                  </p>
                </div>
              </div>

              <DocumentFooter />
            </div>
          </DocumentContainer>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => print('declaracao')}>Imprimir</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeclaracaoParticipacao;
