import React, { useState } from 'react';
import { Building2, Eye, EyeOff, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import './login.css';
import { useNavigate, useLocation } from 'react-router-dom';
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
        // Store tokens and user data
        tokenStorage.setTokens(response.access_token, response.refresh_token);
        userStorage.setUser(response.user);
      } else if (roleSelected === 'authority') {
        response = await authAPI.authorityLogin({ name: email, password });
        // For authority, we'll store session data differently
        userStorage.setUser(response.authority);
      }

      console.log('Login successful:', response);
      
      // Navigate based on role
      if (roleSelected === 'user') {
        navigate('/'); // Navigate to landing page for public users
      } else {
        navigate('/authority'); // Navigate to authority page
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
        <div className="login-wrapper">
          <div className="info-box animate-left">
            <div className="login-header-alt">
              <Building2 className="icon" />
              <h1 className="login-title">FixItNow</h1>
              <p className="login-subtitle">Building safer cities together</p>
            </div>
            <div className="login-description">
              <p>FixItNow connects citizens with authorities for prompt urban issue resolution.</p>
              <p>Common issues you can report include:</p>
              <ul>
                <li>Potholes and road damage</li>
                <li>Streetlight outages</li>
                <li>Sewage blockages or overflows</li>
                <li>Water supply issues</li>
                <li>Garbage mismanagement</li>
                <li>Public safety and sanitation concerns</li>
              </ul>
            </div>
          </div>

          <div className="selection-box animate-right">
            <p className="role-title">Log in as:</p>
            <div className="role-selection">
              <button onClick={() => handleRoleSelect('user')} className="role-btn">
              <User className="role-icon" />
              User
            </button>
            <button onClick={() => handleRoleSelect('authority')} className="role-btn">
              <Shield className="role-icon" />
              Authority
            </button>

            </div>
          </div>
        </div>
      ) : (
        <div className="login-box">
          <div className="login-header">
            <div className="login-icon">
              <Building2 className="icon" />
            </div>
            <h1 className="login-title">Welcome {roleSelected === 'Authority' ? 'Authority' : 'Public'}</h1>
            <p className="login-subtitle">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <div className="password-wrapper">
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

            <div className="options-row">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {roleSelected !== 'Authority' && (
            <p className="signup-link">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </p>
          )}

        </div>
      )}
    </div>
  );
}

export default Login;
