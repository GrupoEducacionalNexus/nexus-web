// SuccessErrorMessage.js
import React from 'react';

const SuccessErrorMessage = ({ success, error }) => (
  <div className="row mt-2">
    <div className="col-sm-12">
      {success && (
        <div className="alert alert-success text-center" role="alert">
          {success}
        </div>
      )}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
    </div>
  </div>
);

export default SuccessErrorMessage;
