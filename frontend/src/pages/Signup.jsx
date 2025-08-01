import React, { useState } from 'react';
import { Building2, Eye, EyeOff } from 'lucide-react';
import './login.css';
import { authAPI, tokenStorage, userStorage } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [useEmail, setUseEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.userSignup({ email, password, username });
      
      console.log('Signup successful:', response);
      
      // Store tokens and user data if available
      if (response.access_token) {
        tokenStorage.setTokens(response.access_token, response.refresh_token);
        userStorage.setUser(response.user);
        navigate('/dashboard');
      } else {
        // If no tokens, user needs to login
        alert(response.message || 'Please log in to continue.');
        navigate('/login');
      }
      
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-icon">
            <Building2 className="icon" />
          </div>
          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">Join FixItNow – Build safer cities</p>
        </div>

        {!useEmail ? (
          <div className="login-form" style={{ gap: '1rem' }}>
            <button type="button" className="submit-btn" onClick={() => console.log('Google SignUp')}>
              Continue with Google
            </button>
            <p style={{ color: '#19394f', textAlign: 'center', fontSize: '0.9rem' }}>or</p>
            <button type="button" className="submit-btn" onClick={() => setUseEmail(true)}>
              Continue with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                  placeholder="Create a password"
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

            {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>
        )}

        <p className="signup-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
