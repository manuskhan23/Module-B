import React from 'react';
import '../styles/components.css';

export const Checkbox = React.forwardRef(({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  required = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`checkbox-group ${className}`}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="checkbox-input"
        {...props}
      />
      {label && (
        <label className="checkbox-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
