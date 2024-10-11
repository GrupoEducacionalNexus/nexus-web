// FormSelect.js
import React from 'react';

const FormSelect = ({
    label,
    id,
    value,
    onChange,
    options,
    disabled = false,
}) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select
            className="form-control form-control-sm"
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
        >
            {options}
        </select>
    </div>
);

export default FormSelect;
