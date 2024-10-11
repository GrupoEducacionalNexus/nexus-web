// FormInput.js
import React from 'react';

const FormInput = ({
    label,
    id,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    disabled = false,
    min,
}) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            className="form-control form-control-sm"
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            min={min}
        />
    </div>
);

export default FormInput;
