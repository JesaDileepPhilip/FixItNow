import React from 'react';
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
          <a href="#" className="navbar-item active">
            <i className="icon-home"></i>
            <span>Home</span>
          </a>
          <a href="#" className="navbar-item">
            <i className="icon-report"></i>
            <span>Report Issue</span>
          </a>
          <a href="#" className="navbar-item">
            <i className="icon-dashboard"></i>
            <span>Public Dashboard</span>
          </a>
          <a href="#" className="navbar-item">
            <i className="icon-logout"></i>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;