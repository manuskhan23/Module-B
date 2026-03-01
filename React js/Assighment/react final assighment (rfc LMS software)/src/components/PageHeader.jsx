import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/components.css';

export const PageHeader = ({ 
  title, 
  subtitle, 
  onBack,
  actions 
}) => {
  return (
    <div className="page-header">
      <div className="header-content">
        <div className="header-text">
          {onBack && (
            <button className="back-btn" onClick={onBack}>
              <FiArrowLeft />
            </button>
          )}
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
        {actions && (
          <div className="header-actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
