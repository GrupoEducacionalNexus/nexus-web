import React from 'react';
import styled from 'styled-components';
import backgroud from '../assets/backgroud_carta_aprovacao.png';
import RODAPE1 from '../assets/rodape1.png';
import RODAPE2 from '../assets/rodape2.png';
import RODAPE3 from '../assets/rodape3.png';
import RODAPE4 from '../assets/rodape4.png';
import cabecalho_timbrado from '../assets/logo_ata.jpg';
import fundo_trimbrado from '../assets/background_ata5.png';

export const FolhaDeAprovacao = (props) => {
  return (
    <Container>
      <img style={{ width: '100%' }} src={cabecalho_timbrado} />
      <h4 className='font-weight-bold mb-3' style={{ marginTop: "50px" }}>FOLHA DE APROVAÇÃO</h4>
      <span>IVY ENBER CHRISTIAN UNIVERSITY</span>
      <span>CENTRO DE CIÊNCIAS HUMANAS</span>

      {props.id_curso === 1 ? ` Mestrado no Programa de Pós Graduação em Ciências da Educação`.toUpperCase() : ``}
      {props.id_curso === 2 ? ` Doutorado no Programa de Doutorado em Ciências da Educação`.toUpperCase() : ``}
      {props.id_curso === 3 ? ` Programa de Mestrado em TEOLOGIA`.toUpperCase() : ``}
      {props.id_curso === 4 ? ` Programa de Doutorado em TEOLOGIA`.toUpperCase() : ``}

      <p className='mt-5'>{props.nome}</p>

      <strong className='mt-3'>{props.titulo}</strong>

      <p className='mt-5 mb-4'>O presente trabalho em nível de
        {props.id_curso === 1 ? ` mestrado ` : ``}
        {props.id_curso === 2 ? ` doutorado ` : ``}
        {props.id_curso === 3 ? ` mestrado ` : ``}
        {props.id_curso === 4 ? ` doutorado ` : ``} foi avaliado e aprovado por banca
        examinadora composta pelos seguintes membros: </p>

      {props.arrayMembrosDaDeclaracaoDeParticipacao.length > 0 ?
        props.arrayMembrosDaDeclaracaoDeParticipacao.map(membro => (
          <div>
            <img className="img-fluid" style={{ width: "200px", display: 'block', margin: '0 auto' }} src={membro.assinatura} />
            <hr />
            <p className="text-center">{membro.nome.toLocaleUpperCase()}</p>
            {/* <p className="text-center">{membro.nome.slice(membro.nome.indexOf('-') + 1, membro.nome.length).toLocaleUpperCase()}</p> */}
          </div>
        ))
        : (<li></li>)
      }

      <p>Versão final do trabalho que foi aprovado no dia {props.dtFolhaAprovacaoFormatada}. </p>
      <div className="row" style={{ marginTop: "150px" }}>
        <div className="col-sm-6 pt-3">
          <p style={{ fontSize: "8pt" }}>Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047
            Section 1005.06 (1)(f). Florida Comission for independent Education</p>
        </div>
        <div className="col-sm-6 d-flex justify-content-center pt-3">
          <img style={{ width: '50px', height: '50px' }} src={RODAPE1} />
          <img style={{ width: '50px', height: '50px' }} src={RODAPE2} />
          <img style={{ width: '50px', height: '50px' }} src={RODAPE3} />
          <img style={{ width: '120px', height: '40px' }} src={RODAPE4} />
        </div>
      </div>
      <p className='text-center mt-3 pt-3' style={{ fontSize: "9pt" }}>7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710</p>
    </Container>
  );
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
  margin: 0 auto;
  text-align: center;
  margin: 30px;

	background: url("${fundo_trimbrado}");
	background-repeat: no-repeat;  
 	background-position: center;
 	background-size: 400px 400px;

  hr {
    width: 50%;
    border: none;
    height: 1px;
    /* Set the hr color */
    color: #333;  /* old IE */
    background-color: #333;  /* Modern Browsers */
    margin-top: 0px;
  }

  img {
    width: 200px;
    margin: 0 auto;
  }

`;
