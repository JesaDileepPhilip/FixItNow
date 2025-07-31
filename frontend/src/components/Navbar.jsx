import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">F</div>
          <span className="brand-text">FixItNow</span>
        </div>

        <div className="navbar-menu">
          <Link to="/" className="navbar-item active">
            <i className="icon-home"></i>
            <span>Home</span>
          </Link>
          <Link to="/report" className="navbar-item">
            <i className="icon-report"></i>
            <span>Report Issue</span>
          </Link>
          <Link to="/dashboard" className="navbar-item">
            <i className="icon-dashboard"></i>
            <span>Public Dashboard</span>
          </Link>
          <Link to="/logout" className="navbar-item">
            <i className="icon-logout"></i>
            <span>Logout</span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
