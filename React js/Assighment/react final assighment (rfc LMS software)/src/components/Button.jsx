import React from 'react';
import '../styles/components.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const IconButton = ({ 
  icon: Icon, 
  onClick, 
  title,
  size = 'md',
  variant = 'ghost',
  ...props 
}) => {
  return (
    <button
      className={`icon-btn icon-btn-${size} icon-btn-${variant}`}
      onClick={onClick}
      title={title}
      {...props}
    >
      <Icon />
    </button>
  );
};
