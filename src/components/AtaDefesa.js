import React from 'react';
import styled from 'styled-components';
import HEADER_ATA from '../assets/logo_ata.jpg';
import BACKGROUND_ATA from '../assets/background_ata5.png';
import FOOTER_ATA from '../assets/footer_ata.png';

export const AtaDefesa = (props) => {
  return (
    <Container>
      <img style={{ width: '100%', margin: '0 auto'}} src={HEADER_ATA} />
      <p className='paragrafo-principal'>
        The following certificate is submitted for <span className='font-weight-bold'>{props.nome}</span>, student of the <strong>
          {props.id_curso === 1 ? `Masters Program in EDUCATION SCIENCES` : ``}
          {props.id_curso === 2 ? `Doctoral Program in EDUCATIONAL SCIENCES` : ``}
          {props.id_curso === 3 ? `Master's Program in THEOLOGY` : ``}
          {props.id_curso === 4 ? `Doctoral Program in THEOLOGY` : ``}</strong>, who presented the defense of the thesis
        {` ${props.titulo_teseOuDissertacao}`}, on {props.dataFormatAmericano} .
        Thesis defense committee Composition: BANK MEMBERS: PRESIDENT: {props.presidente},
        INTERNAL MEMBER: {props.membro_interno}, EXTERNAL MEMBER: {props.membro_externo}. After the defense was
        completed, the candidate was duly {parseInt(props.id_statusAta) === 3 ? `APPROVED` : `REPROVED`} by the Defense Committee.</p>
      <p className='subtitulo'>Orlando-FL, {props.dtCadAta}.</p>

      <div className="text-center">
        <img className="img-fluid" src={props.assinatura_presidente} />
        <hr/>
        <span>{props.presidente}</span>
        <p>ADVISOR PRESIDENT</p>

        <img className="img-fluid" src={props.assinatura_membroInterno} />
        <hr/>
        <span>{props.membro_interno}</span>
        <p>INTERNAL MEMBER</p>

        <img className="img-fluid" src={props.assinatura_membroExterno} />
        <hr/>
        <span>{props.membro_externo}</span>
        <p>EXTERNAL MEMBER</p>

        <img style={{marginTop: "100px"}} src={FOOTER_ATA} />

        <h6 className='text-rodape'>7350 FUTURES DRIVE,ORLANDO,FL 32819 WWW.ENBERUNIVERSITY.COM TEL : +1 321-300-9710</h6>
      </div>
    </Container>
  );
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
  margin: 0 auto;
	padding: 40px;

  background: url("${BACKGROUND_ATA}");
	background-repeat: no-repeat;  
 	background-position: center;
 	background-size: 400px 400px;

  .paragrafo-principal {
    text-align: justify;
    margin-top: 30px;
    font-family: "Calibri";
    font-size: 12pt;
    padding: 50px 20px 5px 20px;
  }

  .subtitulo {
    margin-top: 2px;
    font-size: 15px;
    font-family: Calibri;
    text-align: right;
    padding: 50px 20px 5px 20px;
  }

  .assinatura {
    border-bottom: 1px solid black;
  }

  .text-rodape{
    margin-top: 30px; 
    font-size: 10px; 
    fontFamily: Calibri;
  }

  .codigo-validacao {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 14px; 
    font-family: Calibri;
  }

  hr {
    width: 50%;
    border: none;
    height: 1px;
    /* Set the hr color */
    color: #333;  /* old IE */
    background-color: #333;  /* Modern Browsers */
    margin-top: 0px;
  }

`;
