// DocumentContainer.js
import React from 'react';
import BACKGROUND_ENBER from '../../../assets/background_enber.png';

const DocumentContainer = ({ children }) => (
  <div
    className="container"
    style={{
      background: `url(${BACKGROUND_ENBER}) no-repeat center`,
      backgroundSize: '600px 600px',
    }}
  >
    {children}
  </div>
);

export default DocumentContainer;
