import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiBook, FiAward, FiDollarSign, FiCalendar, FiFileText } from 'react-icons/fi';
import '../styles/sidebar.css';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/students', label: 'Students', icon: FiUsers },
    { path: '/teachers', label: 'Teachers', icon: FiUsers },
    { path: '/classes', label: 'Classes', icon: FiBook },
    { path: '/subjects', label: 'Subjects', icon: FiBook },
    { path: '/syllabus', label: 'Syllabus', icon: FiBook },
    { path: '/fees', label: 'Fees', icon: FiDollarSign },
    { path: '/exams', label: 'Exams', icon: FiCalendar },
    { path: '/admission', label: 'Admission', icon: FiFileText },
    { path: '/school', label: 'School', icon: FiAward },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2 className="logo">LMS</h2>
        <button 
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              title={item.label}
            >
              <Icon className="nav-icon" />
              {isOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
