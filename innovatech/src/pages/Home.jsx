import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to FixItNow</h1>
          <p>Your one-stop solution for reporting and tracking civic issues in your community.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Report an Issue</button>
            <button className="btn-secondary">View Dashboard</button>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>1. Report</h3>
              <p>Easily report civic issues in your area with photos and descriptions.</p>
            </div>
            <div className="feature-card">
              <h3>2. Track</h3>
              <p>Monitor the progress of your reported issues in real-time.</p>
            </div>
            <div className="feature-card">
              <h3>3. Resolve</h3>
              <p>Authorities work to resolve issues and update the community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
