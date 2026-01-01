import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/fases', label: 'Fases XP', icon: '🔄' },
    { path: '/iteraciones', label: 'Iteraciones', icon: '🔁' },
    { path: '/calendario', label: 'Calendario', icon: '📅' },
    { path: '/artefactos', label: 'Artefactos', icon: '📄' }
  ];

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <span className="navbar-logo">⚡</span>
            <h1 className="navbar-title">XP Dashboard</h1>
          </div>
          <ul className="navbar-menu">
            {navItems.map(item => (
              <li key={item.path} className="navbar-item">
                <Link
                  to={item.path}
                  className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="navbar-icon">{item.icon}</span>
                  <span className="navbar-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <p>XP Dashboard - Extreme Programming Framework © 2025</p>
      </footer>
    </div>
  );
};

export default Layout;
