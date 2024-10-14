// FormField.js
import React from 'react';

const FormField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  options,
  rows,
  isSelect,
  isTextarea,
  additionalProps,
}) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    {isSelect ? (
      <select
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        {...additionalProps}
      >
        {options}
      </select>
    ) : isTextarea ? (
      <textarea
        className="form-control"
        id={id}
        rows={rows || 3}
        value={value}
        onChange={onChange}
        {...additionalProps}
      ></textarea>
    ) : (
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...additionalProps}
      />
    )}
  </div>
);

export default FormField;
