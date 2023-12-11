import React from 'react';
import styled from 'styled-components';
import frente from '../assets/frente-modelo-diploma-posgraduacao.png';
import verso from '../assets/verso-modelo-diploma-posgraduacao.png';
import assinatura_alcimar from '../assets/assinatura.png';
import assinatura_ozemar from '../assets/assinatura_de_ozemar.png';

import qrcodePosGraducao from '../assets/qrcodePosGraducao.png';
import logoEnber from '../assets/logo_menor.png';
import RODAPE1 from '../assets/rodape1.png';
import RODAPE2 from '../assets/rodape2.png';
import RODAPE3 from '../assets/rodape3.png';
import RODAPE4 from '../assets/rodape4.png';
import QRCode from 'qrcode.react';

export const CertificadoPosGraduacao = (props) => {
  return (
    <Container>
      <div className='container p-5 text-center' id='frente'>
        <p style={{ color: "#6061df", marginTop: "155px" }}>Know everyone through this instrument, that the Academic Council of Ivy Enber Christian University, by the virtue
          of the authority in them vested hereby confers and certify</p>
        <h4 style={{ color: "#6061df", fontWeight: 'bold' }}>{props.nome_completo}</h4>
        <p className='subtitulo' style={{ color: "#6061df" }}>The postgraduate in</p>
        <h4 style={{ color: "#6061df", fontWeight: 'bold' }}>{props.curso}</h4>

        <p className='subtitulo' style={{ color: "#6061df" }}>with all rights, honors and privileges thereto appertaining,
          given under the seal of the Ivy Enber Christian University, Florida,
          this {props.data_local}.</p>

        <div className='row'>
          <div className='col-md-6 p-3'>
            <img style={{ width: '100px', height: '40px' }} src={assinatura_ozemar} />
            <p style={{ borderTop: "1px solid black" }}>Ozemar Da Silva Araújo Director</p>
          </div>
          <div className='col-md-6 p-3'>
            <p style={{ borderTop: "1px solid black", marginTop: "40px" }}>Graduate</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 p-3">
            <p style={{ fontSize: "8pt" }}>Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047
              Section 1005.06 (1)(f). Florida Comission for independent Education</p>
          </div>
          <div className="col-sm-6 d-flex justify-content-center p-3">
            <img style={{ width: '50px', height: '50px' }} src={RODAPE1} />
            <img style={{ width: '50px', height: '50px' }} src={RODAPE2} />
            <img style={{ width: '50px', height: '50px' }} src={RODAPE3} />
            <img style={{ width: '120px', height: '40px' }} src={RODAPE4} />
          </div>
        </div>
      </div>
      <br />
      <div className='container' id='verso'>
        <div className='row'>
          <div className='col-sm-6 p-5'>
            <p style={{ fontSize: "14px" }}>To whom it may concer,</p>
            <p style={{ fontSize: "14px" }}>As President of this of Ivy Enber Christian University, I certify
              that the document is authentic.</p>

            <div className='text-center'>
              <img src={assinatura_alcimar} /><br />
              <span style={{ borderTop: "1px solid black" }}>Alcimar José Silva</span><br />
              <span style={{ fontSize: "16px", fontFamily: "Calibri", marginTop: "10px" }}>President of Ivy Enber Christian University</span>

              <p className='mt-5'>VALIDATOR CODE</p>
              <QRCode value={props.linkDoCertificado} />
              <p style={{ fontSize: "10px", marginTop: "15px" }}>Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047</p>
              <p style={{ fontSize: "10px" }}>Section 1005.06 (1)(f). Florida Comission for independent Education</p>
            </div>
          </div>
          <div className='col-sm-6 p-3'>
            <div className='border border-dark text-center p-3'>
              <img src={logoEnber} style={{ width: "200px", marginBottom: "10px" }} />
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>DEPARTMENT OF DIPLOMA REGISTRATION <br /> IVY ENBER CHRISTIAN UNIVERSITY</p>
              <p>Course: {props.curso}</p>
              <p>Date: {props.data_emissaoDoDiploma} N°Book: {props.numero_livro} N°Page: {props.numero_pagina} N° in Record: {props.numero_registro}</p>
              <p>Orlando, Flórida/USA, {props.data_local}.</p>
            </div>

            <p className='mt-5' style={{ fontSize: "14px", textAlign: "" }}>We are authorized by the Commission for Independent Education (CIE) of the Florida
              Department of Education (FDE) to award Associate, Bachelor's, Master's, and Doctoral
              degrees, as set forth in Section 1005.06(1), Statutes of Florida in accordance with religious
              institutions.</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 100px;

  #frente {
    display: flex;
	  align-items: center;
	  justify-content: center;
	  flex-direction: column;
    margin: auto;
    border: 1px solid black;
    background: url("${frente}");
	  background-repeat: no-repeat;  
 	  background-position: 0% 0%;
 	  background-size: 100% 100%;
    min-height: 550px;
  }

  #verso {
    align-items: center;
	  justify-content: center;
    border: 1px solid black;
    background: url("${verso}");
	  background-repeat: no-repeat;  
 	  background-position: 0% 0%;
 	  background-size: 100% 100%;
    min-height: 550px;
  }

  .paragrafo-nome {
    margin-top: 12px;
    color: #1C1C8E;
    font-size: 15pt;
    font-weight: bold;
  }

  .paragrafo-curso {
    color: #1C1C8E;
    font-size: 15pt;
    font-weight: bold;
  }

  .subtitulo {
    color: #1C1C8E;
    font-size: 10pt;
  }

  .texto-azul {
    text-color: #6061df;
  }
`;
