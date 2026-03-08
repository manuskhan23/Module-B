import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLogOut, FiSettings, FiChevronDown, FiMenu } from 'react-icons/fi';
import '../styles/navbar.css';

export const Navbar = ({ onMenuToggle }) => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    {isMobile && (
                        <button className="mobile-menu-btn" onClick={onMenuToggle} title="Menu">
                            <FiMenu />
                        </button>
                    )}
                    <h2 className="navbar-title">LMS Portal</h2>
                </div>
                <div className="navbar-right">
                    <div className="profile-container" ref={dropdownRef}>
                        <div
                            className={`user-profile ${showDropdown ? 'active' : ''}`}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="user-info">
                                <span className="user-name">{user?.displayName || user?.email?.split('@')[0]}</span>
                            </div>
                            <div className="profile-img-wrapper">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="navbar-profile-img" />
                                ) : (
                                    <div
                                        className="navbar-profile-placeholder"
                                        style={{
                                            background: `linear-gradient(135deg, var(--primary), #4F46E5)`,
                                            color: 'white',
                                            fontSize: '24px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {showDropdown && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <p className="dropdown-user">{user?.displayName || 'User'}</p>
                                </div>
                                <div className="dropdown-divider"></div>
                                <Link
                                    style={{ textDecoration: 'none', color: 'black' }}
                                    to="/settings"
                                    className="dropdown-item"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    <FiSettings className="dropdown-icon" />
                                    <span>Settings</span>
                                </Link>
                                <button onClick={handleLogout} className="dropdown-item logout">
                                    <FiLogOut className="dropdown-icon" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
