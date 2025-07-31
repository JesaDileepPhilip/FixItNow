import React from 'react';
import Navbar from '../components/Navbar'; // Adjust path if needed
import './Home.css';

const Home = () => {
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
              <button className="btn-primary">
                <i className="icon-camera"></i>
                Report an Issue
              </button>
              <button className="btn-secondary">
                <i className="icon-chart"></i>
                View Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon blue-bg">
              <i className="icon-camera-large"></i>
            </div>
            <h3 className="feature-title">Quick Reporting</h3>
          </div>

          <div className="feature-card">
            <div className="feature-icon green-bg">
              <i className="icon-chart-large"></i>
            </div>
            <h3 className="feature-title">Real-time Tracking</h3>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple-bg">
              <i className="icon-community-large"></i>
            </div>
            <h3 className="feature-title">Community Impact</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;