import React from 'react';

const MainContent = ({children}) => {
  return (
    <div style={{ paddingTop: '60px' }}>
      {children}
    </div>
  );
};

export default MainContent;
