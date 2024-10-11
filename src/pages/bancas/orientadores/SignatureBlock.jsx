// SignatureBlock.js
import React from 'react';
import ASSINATURA_ALCIMAR from '../../../assets/assinatura.png';
import ASSINATURA_JOSUE from '../../../assets/assinatura_josue.png'

const SignatureBlock = ({ isEnglish }) => (
  <div className="row d-flex justify-content-center mt-2 mb-2">
    <div className="col-lg-6 col-lg-offset-6 text-center">
      <div className="ml-auto">
        <img
          style={{ display: 'block', margin: '0 auto' }}
          src={ASSINATURA_ALCIMAR}
          alt="Assinatura Alcimar"
        />
        <hr className="hr" />
        <p>
          Ivy Enber Christian University
          <br />
          Alcimar José da Silva
          <br />
          {isEnglish ? 'President' : 'Presidente'}
        </p>
        <img
          style={{ width: '100px', height: '100px', display: 'block', margin: '0 auto' }}
          src={ASSINATURA_JOSUE}
          alt="Assinatura Josué"
        />
        <hr className="hr" />
        <p>
          Ivy Enber Christian University
          <br />
          Josué Claudio Dantas
          <br />
          {isEnglish ? 'Chancellor' : 'Reitor'}
        </p>
      </div>
    </div>
  </div>
);

export default SignatureBlock;
