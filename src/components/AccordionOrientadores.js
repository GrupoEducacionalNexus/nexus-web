import React, { useState } from 'react';
import { getToken } from '../services/auth';
import { FaUserGraduate } from 'react-icons/fa';

const Accordion = ({ children, idOrientador, total, orientador, listaDeOrientandosDoOrientador }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    listaDeOrientandosDoOrientador(getToken(), idOrientador);
  };

  return (
    <div className="accordion-custom">
      <div className="accordion-header-custom" onClick={toggleAccordion}>
        <h5 className='font-weight-bold'><FaUserGraduate/> {orientador}</h5>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <p className='text-center font-weight-bold'>Total de orientandos - {total}</p>
          <div className='container'>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;