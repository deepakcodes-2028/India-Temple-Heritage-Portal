import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes, FaUserShield } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/images/logo.png" alt="India Temple Heritage Logo" className="navbar-logo-img" />
          <span className="navbar-brand-text">Temple<span>Yatra</span></span>
          <span className="logo-badge">Heritage</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-menu-wrapper ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
                onClick={closeMenu}
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/temples"
                className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
                onClick={closeMenu}
              >
                Temples
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/circuits"
                className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
                onClick={closeMenu}
              >
                Circuits
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/festivals"
                className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
                onClick={closeMenu}
              >
                Festivals
              </NavLink>
            </li>

            <li className="nav-item theme-toggle-item">
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label="Toggle Dark / Light Theme"
                title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </li>

            {isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/admin"
                    className="nav-links admin-nav-link"
                    onClick={closeMenu}
                  >
                    <FaUserShield className="admin-icon" />
                    <span>Admin Panel</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-btn logout-btn">
                    Logout ({user?.name?.split(' ')[0] || 'Admin'})
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

