import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, tokenStorage, userStorage } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
   
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API error:', error);
     
    } finally {
      // Clear stored tokens and user data
      tokenStorage.clearTokens();
      userStorage.clearUser();
      
      // Navigate to login page
      navigate('/login');
    }
  };

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
          <button onClick={handleLogout} className="navbar-item logout-btn">
            <i className="icon-logout"></i>
            <span>Logout</span>
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
