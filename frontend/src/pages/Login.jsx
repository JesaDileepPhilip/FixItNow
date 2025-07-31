import React, { useState } from 'react';
import { Building2, Eye, EyeOff, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [roleSelected, setRoleSelected] = useState(null); // 'user' or 'authority'
  const [showModal, setShowModal] = useState(true);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe, roleSelected });
    // Redirect based on role: e.g.
    // if (roleSelected === 'user') navigate("/dashboard")
    // else navigate("/authority")
  };

  return (
    <div className="login-container">
      {showModal ? (
        <div className="login-box">
          <div className="login-header">
            <div className="login-icon">
              <Building2 className="icon" />
            </div>
            <h1 className="login-title">FixItNow</h1>
            <p className="login-subtitle">Building safer cities together</p>
          </div>

          <p className="role-title">Log in as:</p>
          <div className="role-selection">
            <button onClick={() => { setRoleSelected('Public'); setShowModal(false); }} className="role-btn">
              <User className="role-icon" />
              User
            </button>
            <button onClick={() => { setRoleSelected('Authority'); setShowModal(false); }} className="role-btn">
              <Shield className="role-icon" />
              Authority
            </button>
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
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your user ID"
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

            <button type="submit" className="submit-btn">Login</button>
          </form>

          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
