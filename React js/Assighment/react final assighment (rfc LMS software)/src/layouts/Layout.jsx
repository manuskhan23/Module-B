import React from 'react';
import { Sidebar } from './Sidebar';
import '../styles/layout.css';

export const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};
