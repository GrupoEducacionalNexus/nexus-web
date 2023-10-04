import React, { useState } from 'react';
import { getToken } from '../services/auth';
import { FaFilter } from 'react-icons/fa';

const Accordion = ({ children, id_setor, setor, listaDeChamados }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    listaDeChamados(id_setor, 4);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{setor}</h3>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9656;</span>
      </div>
      {isOpen && (
        <div className="accordion-content" style={{ maxHeight: "500px", overflowY: "scroll", overflowX: 'hidden' }}>
          <div className='container'>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;