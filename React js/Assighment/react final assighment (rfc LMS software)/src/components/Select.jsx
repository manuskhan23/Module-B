import React from 'react';
import '../styles/components.css';

export const Select = React.forwardRef(({
  label,
  options = [],
  error,
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  className = '',
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
      <select
        ref={ref}
        className={`form-select ${error ? 'is-invalid' : ''} ${className}`}
        disabled={disabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
