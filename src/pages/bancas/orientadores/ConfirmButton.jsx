// ConfirmButton.js
import React from 'react';

const ConfirmButton = ({ onClick, children }) => (
  <button className="btn btn-outline-success" onClick={onClick}>
    {children}
  </button>
);

export default ConfirmButton;
