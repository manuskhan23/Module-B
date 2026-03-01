import React from 'react';
import '../styles/components.css';

export const RadioButton = React.forwardRef(({
  label,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`radio-group ${className}`}>
      <input
        ref={ref}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="radio-input"
        {...props}
      />
      {label && <label className="radio-label">{label}</label>}
    </div>
  );
});

RadioButton.displayName = 'RadioButton';
