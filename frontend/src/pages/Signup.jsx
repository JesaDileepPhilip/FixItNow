import React, { useState } from 'react';
import { Building2, Eye, EyeOff } from 'lucide-react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, tokenStorage, userStorage } from '../services/api';

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
      <div className="login-form-container">
        <div className="login-header">
          <Building2 className="header-icon" />
          <h1>Create Account</h1>
          <p>Join FixItNow – Build safer cities</p>
        </div>

        {!useEmail ? (
          <div className="login-form" style={{ gap: '1rem' }}>
            <button type="button" className="login-btn" onClick={() => console.log('Google SignUp')}>
              Continue with Google
            </button>
            <p style={{ color: '#fff', textAlign: 'center', fontSize: '0.9rem' }}>or</p>
            <button type="button" className="login-btn" onClick={() => setUseEmail(true)}>
              Continue with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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

            {error && (
              <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
                {error}
              </div>
            )}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>
        )}

        <p className="signup-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
