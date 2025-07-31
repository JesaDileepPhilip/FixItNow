import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';
import { Camera, BarChart, TrendingUp } from 'lucide-react'; 

const Home = () => {
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate('/report'); 
  };

  const handleDashboardClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-tagline">
              Spot it. Report it. Fix it.
            </div>

            <h1 className="hero-title">
              Fix Your City,<br />
              <span className="gradient-text">One Report at a Time</span>
            </h1>

            <p className="hero-description">
              Report city infrastructure issues in real-time. Snap a photo, share your location, and
              watch as your community improves together.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleReportClick}>
                <Camera className="icon" /> 
                Report an Issue
              </button>
              <button className="btn-secondary" onClick={handleDashboardClick}>
                <BarChart className="icon" /> 
                View Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon blue-bg">
              <Camera className="icon-large" /> 
            </div>
            <h3 className="feature-title">Quick Reporting</h3>
          </div>

          <div className="feature-card">
            <div className="feature-icon green-bg">
              <TrendingUp className="icon-large" /> 
            </div>
            <h3 className="feature-title">Real-time Tracking</h3>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple-bg">
              <BarChart className="icon-large" /> 
            </div>
            <h3 className="feature-title">Community Impact</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
