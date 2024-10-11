// FormTextarea.js
import React from 'react';

const FormTextarea = ({
    label,
    id,
    rows = 3,
    placeholder = '',
    value,
    onChange,
}) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <textarea
            className="form-control form-control-sm"
            id={id}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        ></textarea>
    </div>
);

export default FormTextarea;
