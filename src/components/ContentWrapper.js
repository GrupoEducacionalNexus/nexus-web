import React from 'react';

const ContentWrapper = ({ children, ...props }) => {
  return (
    <div className="content-wrapper" {...props}>
      {children}
    </div>
  );
}

export default ContentWrapper;