import React from 'react';
import styled from 'styled-components';
import backgroud_carta_aprovacao from '../assets/backgroud_carta_aprovacao.png';


export const CartaDeAprovacao = (props) => {
  return (
    <Container>
      <p>IVY ENBER CHRISTIAN UNIVERSITY</p>

      <p>CENTRO DE CIÊNCIAS HUMANAS</p>

      <p>PROGRAMA DE PÓS-GRAUDAÇÃO INTERNACIONAL EM {props.idAreaConcentracao === 1 ? `EDUCAÇÃO` : `TEOLOGIA`}</p>

      <p>{props.nome}</p>

      <strong>{props.titulo_teseOuDissertacao}</strong>

      <p>O presente trabalho em nível de mestrado foi avaliado e aprovado por banca
      examinadora composta pelos seguintes membros: </p>

      <img className="img-fluid" src={props.assinatura_presidente} />
      <hr />
      <span>{props.presidente}</span>
      <p>ADVISOR PRESIDENT</p>

      <img className="img-fluid" src={props.assinatura_membroInterno} />
      <hr />
      <span>{props.membro_interno}</span>
      <p>INTERNAL MEMBER</p>

      <img className="img-fluid" src={props.assinatura_membroExterno} />
      <hr />
      <span>{props.membro_externo}</span>
      <p >EXTERNAL MEMBER</p>

      <p>Versão final do trabalho que foi aprovado no dia {props.dtFolhaAprovacaoFormatada}. </p>
    </Container>
  );
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
  margin: 0 auto;
	padding: 40px;
  height: 297mm;
  text-align: center;

	background: url("${backgroud_carta_aprovacao}");
	background-repeat: no-repeat;  
 	background-position: center;
 	background-size: cover;

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
