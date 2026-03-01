import React from 'react';
import '../styles/components.css';

export const Input = React.forwardRef(({
  label,
  error,
  disabled = false,
  required = false,
  size = 'md',
  type = 'text',
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`form-group form-group-${size}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`form-input ${error ? 'is-invalid' : ''} ${className}`}
        disabled={disabled}
        {...props}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
