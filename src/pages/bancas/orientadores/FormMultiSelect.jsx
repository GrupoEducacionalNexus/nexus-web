// FormMultiSelect.js
import React from 'react';
import Select from 'react-select';

const FormMultiSelect = ({ label, options, value, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={options}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default FormMultiSelect;
