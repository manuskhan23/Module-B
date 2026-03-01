import React, { useState } from 'react';
import dayjs from 'dayjs';
import '../styles/components.css';

export const DatePicker = React.forwardRef(({
  label,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  ...props
}, ref) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type="date"
        className={`form-input ${error ? 'is-invalid' : ''}`}
        value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        {...props}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';
