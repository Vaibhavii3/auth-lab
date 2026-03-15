import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Eye, EyeOff, Code, CheckCircle, XCircle, Copy, Check, Cookie } from 'lucide-react';
import './DemoPage.css';

const SessionDemo = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setRegisterSuccess(false);
    try {
      const res = await fetch('http://localhost:5000/api/jwt/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setRegisterSuccess(true);
        setAuthMode('login');
      } else {
        setError(data.message || data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:5000/api/session/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
        // Session cookie name is set in server (authlab.sid)
        const cookies = document.cookie.split(';');
        const sessionCookie = cookies.find(c => c.trim().startsWith('authlab.sid='));
        if (sessionCookie) {
          setSessionData({
            cookie: sessionCookie.split('=')[1]?.trim() || '',
            message: 'Session created successfully'
          });
        } else {
          setSessionData({ cookie: '(httpOnly - not visible to JS)', message: 'Session created successfully' });
        }
      } else {
        setError(data.message || data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProtectedRequest = async () => {
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/session/protected', {
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setResponse(prev => ({ ...prev, protected: data }));
      } else {
        setError(data.message || data.error || 'Not authenticated');
      }
    } catch (err) {
      setError('Failed to access protected route: ' + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/session/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setResponse(null);
      setSessionData(null);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Logout failed: ' + err.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'demo', label: '🧪 Try It' },
    { id: 'inspect', label: '🔍 Inspect' }
  ];

  return (
    <div className="demo-page">
      <div className="demo-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Methods</span>
          </Link>
          
          <div className="demo-title-section">
            <div className="demo-icon session-icon">
              <span>🍪</span>
            </div>
            <div>
              <h1 className="demo-title">Session Authentication</h1>
              <p className="demo-subtitle">Stateful • Secure • Server-Controlled</p>
            </div>
          </div>

          <div className="demo-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="demo-content">
        <div className="container">
          <div className="demo-grid">
            {/* Left Column */}
            <div className="demo-main">
              {activeTab === 'learn' && (
                <div className="learn-section">
                  <div className="content-card">
                    <h2>What are Sessions?</h2>
                    <p>
                      Session-based authentication stores user state on the server and sends a 
                      session identifier to the client via a secure cookie. The server maintains 
                      all session data, giving you full control over user sessions.
                    </p>
                  </div>

                  <div className="content-card">
                    <h2>How It Works</h2>
                    <div className="flow-diagram">
                      <div className="flow-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h3>User Login</h3>
                          <p>Client sends credentials</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h3>Server Validates</h3>
                          <p>Checks credentials against database</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h3>Create Session</h3>
                          <p>Server stores session data with unique ID</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                          <h3>Send Cookie</h3>
                          <p>Session ID sent as httpOnly cookie</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">5</div>
                        <div className="step-content">
                          <h3>Browser Stores</h3>
                          <p>Cookie automatically sent with requests</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">6</div>
                        <div className="step-content">
                          <h3>Server Validates</h3>
                          <p>Looks up session data by ID</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pros-cons-grid">
                    <div className="content-card pros-card">
                      <h2>
                        <CheckCircle size={24} />
                        Advantages
                      </h2>
                      <ul>
                        <li>✅ Easy to revoke sessions</li>
                        <li>✅ Server has full control</li>
                        <li>✅ Small cookie size</li>
                        <li>✅ Most secure option</li>
                        <li>✅ httpOnly cookies prevent XSS</li>
                        <li>✅ Perfect for traditional web apps</li>
                      </ul>
                    </div>

                    <div className="content-card cons-card">
                      <h2>
                        <XCircle size={24} />
                        Disadvantages
                      </h2>
                      <ul>
                        <li>❌ Requires server storage</li>
                        <li>❌ Scaling complexity (sticky sessions)</li>
                        <li>❌ CORS can be challenging</li>
                        <li>❌ Not ideal for mobile apps</li>
                        <li>❌ Server memory/database overhead</li>
                        <li>❌ Session cleanup required</li>
                      </ul>
                    </div>
                  </div>

                  <div className="content-card">
                    <h2>Session Storage Options</h2>
                    <div className="storage-options">
                      <div className="storage-option">
                        <h3>💾 Memory Store</h3>
                        <p><strong>Pros:</strong> Fast, simple for development</p>
                        <p><strong>Cons:</strong> Lost on restart, not scalable</p>
                        <p><strong>Use:</strong> Development only</p>
                      </div>
                      <div className="storage-option">
                        <h3>🗄️ Redis</h3>
                        <p><strong>Pros:</strong> Fast, scalable, persistent</p>
                        <p><strong>Cons:</strong> Additional service needed</p>
                        <p><strong>Use:</strong> Production (recommended)</p>
                      </div>
                      <div className="storage-option">
                        <h3>🗃️ Database</h3>
                        <p><strong>Pros:</strong> Persistent, queryable</p>
                        <p><strong>Cons:</strong> Slower than Redis</p>
                        <p><strong>Use:</strong> When already using DB</p>
                      </div>
                    </div>
                  </div>

                  <div className="content-card code-example-card">
                    <h2>
                      <Code size={24} />
                      Backend Implementation
                    </h2>
                    <pre className="code-block">
{`const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// Configure session middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        // HTTPS only
    httpOnly: true,      // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict'   // CSRF protection
  }
}));

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user || !await user.comparePassword(password)) {
    return res.status(401).json({ error: 'Invalid' });
  }
  
  // Create session
  req.session.userId = user.id;
  req.session.email = user.email;
  
  res.json({ message: 'Login successful' });
});

// Protected route
app.get('/protected', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  res.json({ 
    message: 'Access granted',
    user: req.session.email 
  });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.json({ message: 'Logged out' });
});`}
                    </pre>
                  </div>

                  <div className="content-card">
                    <h2>Cookie Security Flags</h2>
                    <div className="security-flags">
                      <div className="flag-item">
                        <h3>httpOnly</h3>
                        <p>Prevents JavaScript access to cookie (XSS protection)</p>
                      </div>
                      <div className="flag-item">
                        <h3>secure</h3>
                        <p>Only sent over HTTPS connections</p>
                      </div>
                      <div className="flag-item">
                        <h3>sameSite</h3>
                        <p>Prevents CSRF attacks (strict/lax/none)</p>
                      </div>
                      <div className="flag-item">
                        <h3>maxAge</h3>
                        <p>Sets cookie expiration time</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="demo-section">
                  <div className="content-card">
                    <h2>Try Session Authentication</h2>
                    <p>Register first, then login to create a server-side session</p>
                  </div>

                  {registerSuccess && (
                    <div className="alert alert-success">
                      <CheckCircle size={20} />
                      <span>Account created! Now login below.</span>
                    </div>
                  )}

                  {!response ? (
                    <div className="demo-form-card">
                      <div className="auth-mode-tabs">
                        <button
                          type="button"
                          className={authMode === 'register' ? 'auth-tab active' : 'auth-tab'}
                          onClick={() => { setAuthMode('register'); setError(null); setRegisterSuccess(false); }}
                        >
                          Register
                        </button>
                        <button
                          type="button"
                          className={authMode === 'login' ? 'auth-tab active' : 'auth-tab'}
                          onClick={() => { setAuthMode('login'); setError(null); }}
                        >
                          Login
                        </button>
                      </div>

                      {authMode === 'register' && (
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="form-input"
                          />
                        </div>
                      )}

                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="demo@authlab.com"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Password</label>
                        <div className="password-input-wrapper">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="form-input"
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {authMode === 'register' ? (
                        <button
                          onClick={handleRegister}
                          disabled={loading || !name || !email || !password}
                          className="btn-primary btn-large"
                        >
                          {loading ? (
                            <>
                              <span className="spinner"></span>
                              Creating account...
                            </>
                          ) : (
                            <>
                              <Play size={20} />
                              Register
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={handleLogin}
                          disabled={loading || !email || !password}
                          className="btn-primary btn-large"
                        >
                          {loading ? (
                            <>
                              <span className="spinner"></span>
                              Creating Session...
                            </>
                          ) : (
                            <>
                              <Play size={20} />
                              Login with Session
                            </>
                          )}
                        </button>
                      )}

                      <div className="demo-hint">
                        {authMode === 'login'
                          ? '💡 First time? Switch to Register tab above to create an account.'
                          : '💡 Same account works for JWT and Basic Auth demos too.'}
                      </div>
                    </div>
                  ) : (
                    <div className="session-active">
                      <div className="alert alert-success">
                        <CheckCircle size={20} />
                        <span>Session active! You're logged in.</span>
                      </div>

                      <div className="content-card session-info-card">
                        <h3>
                          <Cookie size={24} />
                          Active Session
                        </h3>
                        <div className="session-details">
                          <div className="detail-row">
                            <span>User:</span>
                            <span>{response.user?.email}</span>
                          </div>
                          <div className="detail-row">
                            <span>Session ID:</span>
                            <span className="session-id">
                              {sessionData?.cookie?.substring(0, 20)}...
                            </span>
                          </div>
                          <div className="detail-row">
                            <span>Storage:</span>
                            <span>Server-side</span>
                          </div>
                        </div>
                      </div>

                      <div className="content-card">
                        <h3>Test Protected Route</h3>
                        <p>Your session cookie will be automatically sent with the request:</p>
                        <button
                          onClick={handleProtectedRequest}
                          className="btn-secondary"
                        >
                          <Play size={18} />
                          Access Protected Route
                        </button>
                      </div>

                      {response.protected && (
                        <div className="content-card response-card">
                          <h3>Protected Resource Response</h3>
                          <pre className="response-block">
                            {JSON.stringify(response.protected, null, 2)}
                          </pre>
                        </div>
                      )}

                      <div className="content-card">
                        <h3>End Session</h3>
                        <p>Destroy the session on the server and clear the cookie:</p>
                        <button
                          onClick={handleLogout}
                          className="btn-danger"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-error">
                      <XCircle size={20} />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'inspect' && (
                <div className="inspect-section">
                  <div className="content-card">
                    <h2>Session Inspector</h2>
                    <p>Examine your session cookie and server-side data</p>
                  </div>

                  {sessionData ? (
                    <>
                      <div className="content-card decoded-card">
                        <h3>Session Cookie</h3>
                        <p className="decoded-desc">Secure, httpOnly cookie sent to browser</p>
                        <div className="token-display">
                          <pre className="token-text">authlab.sid={sessionData.cookie}</pre>
                          <button
                            className="btn-copy"
                            onClick={() => copyToClipboard(sessionData.cookie)}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="content-card decoded-card">
                        <h3>Cookie Attributes</h3>
                        <div className="cookie-attributes">
                          <div className="attribute-row">
                            <span className="attr-name">httpOnly:</span>
                            <span className="attr-value">true ✅</span>
                            <span className="attr-desc">JavaScript cannot access</span>
                          </div>
                          <div className="attribute-row">
                            <span className="attr-name">secure:</span>
                            <span className="attr-value">true ✅</span>
                            <span className="attr-desc">HTTPS only</span>
                          </div>
                          <div className="attribute-row">
                            <span className="attr-name">sameSite:</span>
                            <span className="attr-value">strict ✅</span>
                            <span className="attr-desc">CSRF protection</span>
                          </div>
                          <div className="attribute-row">
                            <span className="attr-name">maxAge:</span>
                            <span className="attr-value">24 hours</span>
                            <span className="attr-desc">Auto-expires</span>
                          </div>
                        </div>
                      </div>

                      <div className="content-card decoded-card">
                        <h3>Server-Side Session Data</h3>
                        <p className="decoded-desc">Stored on server (not in cookie)</p>
                        <pre className="decoded-block">
{`{
  "userId": "${response.user?.id}",
  "email": "${response.user?.email}",
  "createdAt": "${new Date().toISOString()}",
  "expiresAt": "${new Date(Date.now() + 24*60*60*1000).toISOString()}"
}`}
                        </pre>
                      </div>

                      <div className="content-card security-info">
                        <h3>🔒 Security Benefits</h3>
                        <ul>
                          <li>✅ Cookie cannot be read by JavaScript (httpOnly)</li>
                          <li>✅ Only sent over secure HTTPS connections</li>
                          <li>✅ Protected against CSRF attacks (sameSite)</li>
                          <li>✅ User data stored server-side (not in cookie)</li>
                          <li>✅ Session can be revoked instantly</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">🔍</div>
                      <h3>No Active Session</h3>
                      <p>Go to the "Try It" tab and login to create a session</p>
                      <button
                        onClick={() => setActiveTab('demo')}
                        className="btn-primary"
                      >
                        Go to Demo
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="demo-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <Code size={20} />
                  <h3>Live Request Monitor</h3>
                </div>

                <div className="request-details">
                  <h4>Endpoint</h4>
                  <pre className="endpoint-block">
                    {authMode === 'register' ? 'POST /api/jwt/register' : 'POST /api/session/login'}
                  </pre>

                  {authMode === 'register' ? (
                    <>
                      <h4>Request Body</h4>
                      <pre className="request-block">
                        {JSON.stringify({
                          name: name || '(required)',
                          email: email || '(required)',
                          password: password ? '••••••••' : '(required)'
                        }, null, 2)}
                      </pre>
                    </>
                  ) : (
                    <>
                      <h4>Request Body</h4>
                      <pre className="request-block">
                        {JSON.stringify({
                          email: email || '(required)',
                          password: password ? '••••••••' : '(required)'
                        }, null, 2)}
                      </pre>
                      <h4>Request Headers</h4>
                      <pre className="request-block">
{`Content-Type: application/json
Cookie: authlab.sid=... (sent after login)`}
                      </pre>
                    </>
                  )}

                  {response && (
                    <>
                      <h4>Response Headers</h4>
                      <pre className="headers-block">
{`Set-Cookie: authlab.sid=...;
  HttpOnly; SameSite=Lax
Content-Type: application/json`}
                      </pre>

                      <h4>Status Code</h4>
                      <div className="status-badge success">200 OK</div>
                    </>
                  )}
                </div>
              </div>

              <div className="sidebar-card security-tips">
                <h3>🔒 Security Tips</h3>
                <ul>
                  <li>✅ Use Redis for production sessions</li>
                  <li>✅ Set httpOnly and secure flags</li>
                  <li>✅ Implement session timeout</li>
                  <li>✅ Clean up expired sessions</li>
                  <li>⚠️ Be careful with CORS settings</li>
                  <li>⚠️ Use sticky sessions for load balancing</li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>💡 Best Practices</h3>
                <ul className="use-cases-list">
                  <li>
                    <strong>Session Timeout:</strong>
                    <span>Expire inactive sessions after 30 minutes</span>
                  </li>
                  <li>
                    <strong>Regenerate ID:</strong>
                    <span>After login to prevent fixation attacks</span>
                  </li>
                  <li>
                    <strong>Cleanup:</strong>
                    <span>Remove expired sessions regularly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDemo;