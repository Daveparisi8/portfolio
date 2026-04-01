import React, { useState } from 'react';
import './LoginForm.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
const PORTFOLIO_LOGIN_CREDENTIALS = {
  username: 'portfolio_guest',
  password: 'portfolio_access',
};

const LoginForm = ({ onAuthSuccess, onAuthEvent }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const executeAuthRequest = async (endpoint, payload) => {
    setIsLoading(true);
    setStatusMessage('');
    setIsError(false);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const success = Boolean(data.success);
      const action = endpoint === '/auth/login' ? 'login' : 'register';

      setIsError(!success);
      setStatusMessage(data.message || 'Unexpected server response.');

      if (onAuthEvent) {
        onAuthEvent({
          success,
          action,
          message: data.message || 'Unexpected server response.',
        });
      }

      if (success && action === 'login' && onAuthSuccess) {
        onAuthSuccess(payload.username);
      }

      if (success && endpoint === '/auth/register') {
        setPin('');
      }
    } catch (error) {
      setIsError(true);
      setStatusMessage('Could not reach backend. Start backend API with: py main.py serve (from backend folder).');
      if (onAuthEvent) {
        onAuthEvent({
          success: false,
          action: endpoint === '/auth/login' ? 'login' : 'register',
          message: 'Could not reach backend. Start backend API with: py main.py serve (from backend folder).',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    executeAuthRequest('/auth/login', { username, password });
  };

  const handleRegister = () => {
    executeAuthRequest('/auth/register', { username, password, pin });
  };

  const handlePortfolioLogin = () => {
    executeAuthRequest('/auth/login', PORTFOLIO_LOGIN_CREDENTIALS);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-brand-panel">
          <p className="login-eyebrow">TermiDex Access</p>
          <h2>TermiDex Login</h2>
          <p className="login-subtitle">
            Sign in to explore your game library, review encounter data, and browse Pokemon details in one place.
          </p>
          <div className="login-feature-list">
            <p>Browse official game entries</p>
            <p>Check routes, methods, and encounters</p>
            <p>Review movesets, stats, and profiles</p>
          </div>
        </div>

        <div className="login-fields-panel">
          <div className="login-field-group">
            <label className="login-label" htmlFor="termidex-username">Username</label>
            <input
              id="termidex-username"
              type="text"
              placeholder="Enter username"
              className="login-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="login-field-group">
            <label className="login-label" htmlFor="termidex-password">Password</label>
            <div className="password-wrapper">
              <input
                id="termidex-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="login-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="show-password-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="login-field-group">
            <label className="login-label" htmlFor="termidex-pin">PIN for registration</label>
            <input
              id="termidex-pin"
              type="text"
              placeholder="4-digit PIN"
              className="login-input"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              maxLength={4}
            />
            <p className="login-help-text">Required only when creating a new account.</p>
          </div>

          <div className="login-action-row">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Working...' : 'Log In'}
            </button>
            <button type="button" className="login-button secondary" onClick={handleRegister} disabled={isLoading}>
              Create Account
            </button>
          </div>
          <button
            type="button"
            className="login-button portfolio"
            onClick={handlePortfolioLogin}
            disabled={isLoading}
          >
            (Portfolio Login)
          </button>

          {statusMessage && (
            <p className={`login-message ${isError ? 'error' : 'success'}`}>
              {statusMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
