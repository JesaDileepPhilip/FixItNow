import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>FixItNow</h2>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/report" className="navbar-link">Report Issue</a>
          </li>
          <li className="navbar-item">
            <a href="/dashboard" className="navbar-link">Dashboard</a>
          </li>
          <li className="navbar-item">
            <a href="/login" className="navbar-link">Login</a>
          </li>
          <li className="navbar-item">
            <a href="/signup" className="navbar-link">Sign Up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
