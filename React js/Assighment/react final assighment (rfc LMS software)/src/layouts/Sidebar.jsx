import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiBook, FiAward, FiDollarSign, FiCalendar, FiFileText, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import '../styles/sidebar.css';

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    {
      label: 'Students',
      icon: FiUsers,
      subItems: [
        { path: '/students/add', label: 'Student Registration' },
        { path: '/students', label: 'Student List' },
      ]
    },
    {
      label: 'Teachers',
      icon: FiUsers,
      subItems: [
        { path: '/teachers/add', label: 'Teacher Registration' },
        { path: '/teachers', label: 'Teacher List' },
      ]
    },
    {
      label: 'Classes',
      icon: FiBook,
      subItems: [
        { path: '/classes/add', label: 'Class Registration' },
        { path: '/classes', label: 'Class List' },
      ]
    },
    {
      label: 'Subjects',
      icon: FiBook,
      subItems: [
        { path: '/subjects/add', label: 'Subject Registration' },
        { path: '/subjects', label: 'Subject List' },
      ]
    },
    {
      label: 'Syllabus',
      icon: FiBook,
      subItems: [
        { path: '/syllabus/add', label: 'Syllabus Registration' },
        { path: '/syllabus', label: 'Syllabus List' },
      ]
    },
    {
      label: 'Fees',
      icon: FiDollarSign,
      subItems: [
        { path: '/fees', label: 'Fee Structure' },
        { path: '/fees/submission', label: 'Fee Submission' },
        { path: '/fees/voucher', label: 'Fee Voucher' },
      ]
    },
    {
      label: 'Exams',
      icon: FiCalendar,
      subItems: [
        { path: '/exams', label: 'Exam Schedule' },
        { path: '/exams/results', label: 'Exam Results' },
      ]
    },
    {
      label: 'School',
      icon: FiAward,
      subItems: [
        { path: '/school', label: 'School List' },
        { path: '/school/add', label: 'School Registration' },
      ]
    },
    {
      label: 'Admission',
      icon: FiFileText,
      subItems: [
        { path: '/admission', label: 'Admission Form' },
      ]
    },
  ];

  const toggleMenu = (label) => {
    setExpandedMenus(prev => ({
      [label]: !prev[label]
    }));
  };

  const isActive = (path) => location.pathname === path;
  const isMenuExpanded = (label) => expandedMenus[label];

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
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = isMenuExpanded(item.label);

          if (hasSubItems) {
            return (
              <div key={item.label} className="menu-group">
                <div
                  className={`nav-item dropdown-toggle ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleMenu(item.label)}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  <div className="chevron-container">
                    {isExpanded ? <FiChevronDown className="chevron" /> : <FiChevronRight className="chevron" />}
                  </div>
                </div>
                <div className={`sub-menu-container ${isExpanded && isOpen ? 'expanded' : ''}`}>
                  <div className="sub-menu">
                    {item.subItems.map(subItem => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`sub-nav-item ${isActive(subItem.path) ? 'active' : ''}`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              title={item.label}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
