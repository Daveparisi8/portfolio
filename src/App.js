import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header'
import MainContent from './Components/MainContent/MainContent'
import AdminDashboard from './Components/Admin/AdminDashboard';


function App() {
  const [viewMode, setViewMode] = useState(null);
  const [gateStep, setGateStep] = useState('mode');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (viewMode !== 'portfolio-review') {
      return;
    }

    fetch('/api/analytics/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ mode: 'portfolio-review' }),
    }).catch(() => {
      // Tracking should not block user flow.
    });
  }, [viewMode]);

  const trackLinkClick = (linkId, label, url) => {
    fetch('/api/analytics/link-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ linkId, label, url }),
    }).catch(() => {
      // Tracking should not block user flow.
    });
  };

  const handleModeSelect = (mode) => {
    if (mode === 'administrator') {
      setGateStep('admin-auth');
      return;
    }

    setViewMode('portfolio-review');
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: emailInput.trim(),
          password: passwordInput,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.json().catch(() => null);
        setAuthError(responseBody?.message || 'Invalid administrator credentials. Please try again.');
        return;
      }

      setViewMode('administrator');
    } catch {
      setAuthError('Authentication service is unavailable. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleBackToModeSelection = () => {
    setGateStep('mode');
    setEmailInput('');
    setPasswordInput('');
    setAuthError('');
    setIsAuthenticating(false);
  };

  return (
    <div className="app-root">
      {!viewMode && (
        <div className="mode-gate" role="dialog" aria-modal="true" aria-labelledby={gateStep === 'mode' ? 'mode-gate-title' : 'admin-login-title'}>
          <div className="mode-gate-card">
            {gateStep === 'mode' && (
              <>
                <p className="mode-gate-eyebrow">Choose Viewing Mode</p>
                <h2 id="mode-gate-title">How would you like to view this site?</h2>
                <p className="mode-gate-copy">
                  Select a mode to continue. This selection resets every visit.
                </p>
                <div className="mode-gate-actions">
                  <button className="mode-gate-button" onClick={() => handleModeSelect('portfolio-review')}>
                    Portfolio Review
                  </button>
                  <button className="mode-gate-button admin" onClick={() => handleModeSelect('administrator')}>
                    Administrator
                  </button>
                </div>
              </>
            )}

            {gateStep === 'admin-auth' && (
              <>
                <p className="mode-gate-eyebrow">Administrator Login</p>
                <h2 id="admin-login-title">Enter administrator credentials</h2>
                <p className="mode-gate-copy">Sign in to continue with administrator view.</p>

                <form className="admin-login-form" onSubmit={handleAdminLogin}>
                  <label htmlFor="admin-email">Login</label>
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    value={emailInput}
                    onChange={(event) => setEmailInput(event.target.value)}
                    required
                  />

                  <label htmlFor="admin-password">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    value={passwordInput}
                    onChange={(event) => setPasswordInput(event.target.value)}
                    required
                  />

                  {authError && <p className="admin-auth-error">{authError}</p>}

                  <div className="mode-gate-actions">
                    <button type="submit" className="mode-gate-button admin" disabled={isAuthenticating}>
                      {isAuthenticating ? 'Authenticating...' : 'Login as Administrator'}
                    </button>
                    <button type="button" className="mode-gate-button" onClick={handleBackToModeSelection} disabled={isAuthenticating}>
                      Back
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {viewMode === 'portfolio-review' && (
        <div className="fade-in">
          <Header viewMode={viewMode} onTrackLinkClick={trackLinkClick} />
          <MainContent viewMode={viewMode} onTrackLinkClick={trackLinkClick} />
        </div>
      )}

      {viewMode === 'administrator' && <AdminDashboard />}
    </div>
  );
}

export default App;
