import React, { useState } from 'react';
import { Building2, Eye, EyeOff, Shield, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.css';
import { authAPI, tokenStorage, userStorage } from '../services/api';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [roleSelected, setRoleSelected] = useState(null); // 'user' or 'authority'
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;

      if (roleSelected === 'user') {
        response = await authAPI.userLogin({ username: email, password });
        tokenStorage.setTokens(response.access_token, response.refresh_token);
        userStorage.setUser(response.user);
      } else if (roleSelected === 'authority') {
        response = await authAPI.authorityLogin({ name: email, password });
        userStorage.setUser(response.authority);
      }

      console.log('Login successful:', response);

      if (roleSelected === 'user') {
        navigate('/');
      } else {
        navigate('/authority');
      }

    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setRoleSelected(role);
    setShowModal(false);
    navigate(`/login/${role.toLowerCase()}`);
  };

  return (
    <div className="login-container">
      {showModal ? (
        <div className="modal-split">
          <div className="left-info">
            <h1 className="project-title">FixItNow</h1>
            <p className="project-tagline">Building safer cities together</p>
            <p className="project-desc">
              FixItNow is a civic issue reporting platform that bridges the gap between citizens and municipal authorities.
              Report problems like infrastructure damage, sanitation issues, or utility disruptions — and we’ll fix them.
            </p>
          </div>

          <div className="right-modal">
            <div className="role-selection-wrapper">
              <Building2 className="header-icon" />
              <h2>Select Your Role</h2>
              <div className="role-cards">
                <div className="role-card" onClick={() => handleRoleSelect('user')}>
                  <User className="role-card-icon" />
                  User
                </div>
                <div className="role-card" onClick={() => handleRoleSelect('authority')}>
                  <Shield className="role-card-icon" />
                  Authority
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-form-container">
          <div className="login-header">
            <div className="login-icon">
              <Building2 className="icon" />
            </div>
            <h1 className="login-title">Welcome {roleSelected === 'authority' ? 'Authority' : 'Public'}</h1>
            <p className="login-subtitle">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">User ID</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your user ID"
                required
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            {error && (
              <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {roleSelected === 'user' && (
            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
