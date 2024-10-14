// DocumentContainer.js
import React from 'react';
import BACKGROUND_ENBER from '../../../assets/background_enber.png';

const DocumentContainer = ({ children }) => {
  const containerStyle = {
    background: `url(${BACKGROUND_ENBER})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '600px 600px',
  };

  return (
    <div className="container" style={containerStyle}>
      {children}
    </div>
  );
};

export default DocumentContainer;
