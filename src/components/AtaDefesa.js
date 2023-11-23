import React from 'react';
import styled from 'styled-components';
import HEADER_ATA from '../assets/logo_ata.jpg';
import BACKGROUND_ATA from '../assets/background_ata5.png';
import RODAPE1 from '../assets/rodape1.png';
import RODAPE2 from '../assets/rodape2.png';
import RODAPE3 from '../assets/rodape3.png';
import RODAPE4 from '../assets/rodape4.png';

export const AtaDefesa = (props) => {
  return (
    <Container>
      <img style={{ width: '100%' }} src={HEADER_ATA} />
      <p className='font-weight-bold p-4 text-justify'>
        ATA DA DEFESA PÚBLICA
        {props.id_curso === 1 ? ` DA DISSERTAÇÃO` : ``}
        {props.id_curso === 2 ? ` DE TESE` : ``}
        {props.id_curso === 3 ? ` DA DISSERTAÇÃO` : ``}
        {props.id_curso === 4 ? ` DE TESE` : ``} DE {props.nome.toUpperCase().trim()},
        {props.id_curso === 1 ? ` Mestrado no Programa de Pós Graduação em Ciências da Educação`.toUpperCase() : ``}
        {props.id_curso === 2 ? ` Doutorado no Programa de Doutorado em Ciências da Educação`.toUpperCase() : ``}
        {props.id_curso === 3 ? ` Programa de Mestrado em TEOLOGIA`.toUpperCase() : ``}
        {props.id_curso === 4 ? ` Programa de Doutorado em TEOLOGIA`.toUpperCase() : ``}, DA IVY ENBER CHRISTIAN UNIVERSITY.
      </p>

      <p className='text-justify p-4'>
        {props.data_horaPrevista}, no(a) Sala de bancas examinadoras e
        sincronicamente via ferramentas de comunicação a distância, realizou-se a defesa
        {props.id_curso === 1 ? ` DA DISSERTAÇÃO ` : ``}
        {props.id_curso === 2 ? ` DE TESE ` : ``}
        {props.id_curso === 3 ? ` DA DISSERTAÇÃO ` : ``}
        {props.id_curso === 4 ? ` DE TESE ` : ``}
        de {props.nome.toUpperCase().trim() + ""},intitulada <b>{props.titulo.toUpperCase()}</b>. A Comissão Examinadora foi constituida
        pelos seguintes membros: {" "}

        {props.arrayMembrosDaAtaDeDefesa.map((item, index) => index === props.arrayMembrosDaAtaDeDefesa.length - 2 ? item.nome + " e " : index === props.arrayMembrosDaAtaDeDefesa.length - 1 ? item.nome : item.nome + ", ")}.
        Após a exposição pelo(a)
        {props.id_curso === 1 ? ` mestrando(a) ` : ``}
        {props.id_curso === 2 ? ` doutorando(a) ` : ``}
        {props.id_curso === 3 ? ` mestrando(a) ` : ``}
        {props.id_curso === 4 ? ` doutorando(a) ` : ``} e arguição pelos membros da Comissão Examinadora que participaram do ato, de
        forma presencial e/ou virtual, a discente recebeu o conceito final: <b>{props.status_ata.toUpperCase()}</b> . Nada mais havendo, foi lavrada a presente ata, que após lida e {props.status_ata.toLowerCase()},
        foi assinada pelo(a) Presidente(a) da Comissão Examinadora.
      </p>

      {props.arrayMembrosDaAtaDeDefesa.map(item => (
        <div class="row d-flex justify-content-center mt-2 mb-2">
          <div class="col-lg-6 col-lg-offset-6 text-center">
            <div className="ml-auto">
              <img style={{ display: "block", margin: "0 auto" }} src={item.assinatura} />
              <hr className='hr' />
              <p>{item.nome}<br />{item.tipo}</p>
            </div>
          </div>
        </div>
      ))}



      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-sm-6 p-5">
          <p style={{ fontSize: "8pt" }}>Register at the Secretoy of State of Florida - USA P19000042160 - EIN# 38-4120047
            Section 1005.06 (1)(f). Florida Comission for independent Education</p>
        </div>
        <div className="col-sm-6 d-flex justify-content-center p-5">
          <img style={{ width: '50px', height: '50px' }} src={RODAPE1} />
          <img style={{ width: '50px', height: '50px' }} src={RODAPE2} />
          <img style={{ width: '50px', height: '50px' }} src={RODAPE3} />
          <img style={{ width: '120px', height: '40px' }} src={RODAPE4} />
        </div>
      </div>
      <p className='text-center mt-3' style={{ fontSize: "9pt" }}>7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710</p>
    </Container>
  );
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
  margin: 0 auto;

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
