import React from 'react';
import styled from 'styled-components';
import frente from '../assets/modelo_diploma_frente.png';
import verso from '../assets/MODELO_DIPLOMA_UNEED_(1)[1][1]_pages-to-jpg-0002.png';
import assinatura from '../assets/assinatura.png';
import qrcodePosGraducao from '../assets/qrcodePosGraducao.png';
import logoEnber from '../assets/logo_menor.png';

export const CertificadoPosGraduacao = (props) => {
  return (
    <Container>
      <div className='container' id='frente'>
        <p className='paragrafo-nome'>{props.nome_completo}</p>
        <p className='subtitulo'>The postgraduate in</p>
        <p className='paragrafo-curso'>{props.curso}</p>
      </div>
      <br />
      <div className='container' id='verso'>
        <div className='row'>
          <div className='col-sm-6 p-5'>
            <p style={{ fontSize: "14px" }}>To whom it may concer,</p>
            <p style={{ fontSize: "14px" }}>As President of this of Ivy Enber Christian University, I certify
              that the document is authentic.</p>

            <div className='text-center'>
              <img src={assinatura} /><br />
              <span style={{borderTop: "1px solid black"}}>Alcimar José Silva</span><br />
              <span style={{ fontSize: "16px", fontFamily: "Calibri", marginTop: "10px" }}>President of Ivy Enber Christian University</span>

              <p className='mt-5'>VALIDATOR CODE</p>
              <img src={qrcodePosGraducao} />
              <p style={{ fontSize: "10px", marginTop: "15px" }}>Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047</p>
              <p style={{ fontSize: "10px" }}>Section 1005.06 (1)(f). Florida Comission for independent Education</p>
            </div>
          </div>
          <div className='col-sm-6 p-5'>
            <div className='container border border-dark text-center p-3'>
              <img src={logoEnber} style={{width: "200px", marginBottom: "10px"}}/>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>DEPARTMENT OF DIPLOMA REGISTRATION <br /> IVY ENBER CHRISTIAN UNIVERSITY</p>
              <p>Course: {props.curso}</p>
              <p>Date: {props.data_emissaoDoDiploma} N°Book: {props.numero_livro} N°Page: {props.numero_pagina} N° in Record: {props.numero_registro}</p>
              <p>Orlando, Flórida/USA, {props.data_local}.</p>
            </div>

            <p className='mt-5' style={{ fontSize: "14px" }}>We are authorized by the Commission for Independent Education (CIE) of the Florida
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
	padding: 50px;

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
    min-height: 580px;
  }

  #verso {
    align-items: center;
	  justify-content: center;
    border: 1px solid black;
    background: url("${verso}");
	  background-repeat: no-repeat;  
 	  background-position: 0% 0%;
 	  background-size: 100% 100%;
    min-height: 580px;
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
`;
