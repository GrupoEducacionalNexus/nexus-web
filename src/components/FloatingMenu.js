import React, { useState, useRef, useEffect } from 'react';

const FloatingMenu = ({children}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  // Detectar cliques fora do dropdown para fechá-lo
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="floating-menu" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Ações
      </button>
      {showDropdown && (
        children
      )}
    </div>
  );
};

export default FloatingMenu;
