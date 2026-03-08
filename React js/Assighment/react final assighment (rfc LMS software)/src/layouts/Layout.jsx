import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import '../styles/layout.css';

export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`app-layout ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="main-content">
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
