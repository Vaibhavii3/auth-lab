import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Eye, EyeOff, Code, CheckCircle, XCircle, Copy, Check } from 'lucide-react';
import './DemoPage.css';

const JWTDemo = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/jwt/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (res.ok) {
        setResponse(data);
        localStorage.setItem('jwt_token', data.token);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProtectedRequest = async () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setError('No token found. Please login first.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/jwt/protected', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setResponse({ ...response, protected: data });
    } catch (err) {
      setError('Failed to access protected route: ' + err.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const decodeJWT = (token) => {
    try {
      const parts = token.split('.');
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      return { header, payload, signature: parts[2] };
    } catch {
      return null;
    }
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
            <div className="demo-icon jwt-icon">
              <span>🎫</span>
            </div>
            <div>
              <h1 className="demo-title">JWT Authentication</h1>
              <p className="demo-subtitle">JSON Web Tokens • Stateless • Scalable</p>
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
            {/* Left Column - Main Content */}
            <div className="demo-main">
              {activeTab === 'learn' && (
                <div className="learn-section">
                  <div className="content-card">
                    <h2>What is JWT?</h2>
                    <p>
                      JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims 
                      to be transferred between two parties. They're self-contained, meaning they 
                      carry all the information needed to verify the user's identity.
                    </p>
                  </div>

                  <div className="content-card">
                    <h2>How It Works</h2>
                    <div className="flow-diagram">
                      <div className="flow-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h3>User Login</h3>
                          <p>Client sends credentials to server</p>
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
                          <h3>Generate JWT</h3>
                          <p>Server creates and signs token</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                          <h3>Client Stores</h3>
                          <p>Token saved in localStorage/cookie</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">5</div>
                        <div className="step-content">
                          <h3>Subsequent Requests</h3>
                          <p>Client sends token in Authorization header</p>
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
                        <li>✅ Stateless - no server storage needed</li>
                        <li>✅ Highly scalable across servers</li>
                        <li>✅ Works across different domains (CORS-friendly)</li>
                        <li>✅ Perfect for mobile apps and SPAs</li>
                        <li>✅ Self-contained - carries user info</li>
                        <li>✅ Industry standard (OAuth 2.0)</li>
                      </ul>
                    </div>

                    <div className="content-card cons-card">
                      <h2>
                        <XCircle size={24} />
                        Disadvantages
                      </h2>
                      <ul>
                        <li>❌ Cannot revoke tokens easily</li>
                        <li>❌ Larger request size vs cookies</li>
                        <li>❌ Token stored on client (XSS risk)</li>
                        <li>❌ Expiration must be handled</li>
                        <li>❌ Sensitive data exposure if not careful</li>
                        <li>❌ More complex than Basic Auth</li>
                      </ul>
                    </div>
                  </div>

                  <div className="content-card">
                    <h2>Token Structure</h2>
                    <p>A JWT consists of three parts separated by dots:</p>
                    <div className="token-structure">
                      <div className="token-part header-part">
                        <h3>Header</h3>
                        <pre>{JSON.stringify({
                          "alg": "HS256",
                          "typ": "JWT"
                        }, null, 2)}</pre>
                        <p>Algorithm and token type</p>
                      </div>
                      <div className="token-part payload-part">
                        <h3>Payload</h3>
                        <pre>{JSON.stringify({
                          "userId": "123",
                          "email": "user@example.com",
                          "exp": 1735689600
                        }, null, 2)}</pre>
                        <p>Claims and user data</p>
                      </div>
                      <div className="token-part signature-part">
                        <h3>Signature</h3>
                        <pre>HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)</pre>
                        <p>Cryptographic signature</p>
                      </div>
                    </div>
                  </div>

                  <div className="implementation-grid">
                    <div className="content-card code-example-card">
                      <h2>
                        <Code size={24} />
                        Backend Implementation
                      </h2>
                      <pre className="code-block">
{`const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`}
                      </pre>
                    </div>

                    <div className="content-card code-example-card">
                      <h2>Frontend Implementation</h2>
                      <pre className="code-block">
{`// Login and store token
const login = async (email, password) => {
  const res = await fetch('/api/auth/jwt/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const { token } = await res.json();
  localStorage.setItem('jwt_token', token);
};

// Use token in requests
const fetchProtected = async () => {
  const token = localStorage.getItem('jwt_token');
  
  const res = await fetch('/api/protected', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
  
  return res.json();
};`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="demo-section">
                  <div className="content-card">
                    <h2>Try JWT Authentication</h2>
                    <p>Enter credentials to receive a JWT token and see it in action</p>
                  </div>

                  <div className="demo-form-card">
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

                    <button
                      onClick={handleLogin}
                      disabled={loading || !email || !password}
                      className="btn-primary btn-large"
                    >
                      {loading ? (
                        <>
                          <span className="spinner"></span>
                          Authenticating...
                        </>
                      ) : (
                        <>
                          <Play size={20} />
                          Login with JWT
                        </>
                      )}
                    </button>

                    <div className="demo-hint">
                      💡 Test credentials: <code>demo@authlab.com</code> / <code>password123</code>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-error">
                      <XCircle size={20} />
                      <span>{error}</span>
                    </div>
                  )}

                  {response && (
                    <>
                      <div className="alert alert-success">
                        <CheckCircle size={20} />
                        <span>Authentication successful! Token generated.</span>
                      </div>

                      <div className="content-card response-card">
                        <div className="card-header-row">
                          <h3>Server Response</h3>
                          <button
                            className="btn-icon"
                            onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                          >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                          </button>
                        </div>
                        <pre className="response-block">
                          {JSON.stringify(response, null, 2)}
                        </pre>
                      </div>

                      <div className="content-card">
                        <h3>Test Protected Route</h3>
                        <p>Now that you have a token, try accessing a protected resource:</p>
                        <button
                          onClick={handleProtectedRequest}
                          className="btn-secondary"
                        >
                          <Play size={18} />
                          Access Protected Route
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'inspect' && (
                <div className="inspect-section">
                  <div className="content-card">
                    <h2>Token Inspector</h2>
                    <p>Decode and examine your JWT token structure</p>
                  </div>

                  {response?.token ? (
                    <>
                      <div className="content-card token-display-card">
                        <div className="card-header-row">
                          <h3>Your Token</h3>
                          <button
                            className="btn-toggle"
                            onClick={() => setShowToken(!showToken)}
                          >
                            {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
                            {showToken ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        {showToken && (
                          <div className="token-display">
                            <pre className="token-text">{response.token}</pre>
                            <button
                              className="btn-copy"
                              onClick={() => copyToClipboard(response.token)}
                            >
                              {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                          </div>
                        )}
                      </div>

                      {(() => {
                        const decoded = decodeJWT(response.token);
                        if (!decoded) return null;

                        return (
                          <div className="decoded-sections">
                            <div className="content-card decoded-card header-decoded">
                              <h3>Header</h3>
                              <p className="decoded-desc">Algorithm and token type</p>
                              <pre className="decoded-block">
                                {JSON.stringify(decoded.header, null, 2)}
                              </pre>
                            </div>

                            <div className="content-card decoded-card payload-decoded">
                              <h3>Payload</h3>
                              <p className="decoded-desc">User data and claims</p>
                              <pre className="decoded-block">
                                {JSON.stringify(decoded.payload, null, 2)}
                              </pre>
                              <div className="payload-details">
                                {decoded.payload.exp && (
                                  <div className="detail-row">
                                    <span>Expires:</span>
                                    <span>{new Date(decoded.payload.exp * 1000).toLocaleString()}</span>
                                  </div>
                                )}
                                {decoded.payload.iat && (
                                  <div className="detail-row">
                                    <span>Issued:</span>
                                    <span>{new Date(decoded.payload.iat * 1000).toLocaleString()}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="content-card decoded-card signature-decoded">
                              <h3>Signature</h3>
                              <p className="decoded-desc">Cryptographic verification</p>
                              <pre className="signature-block">
                                {decoded.signature}
                              </pre>
                              <p className="signature-note">
                                ⚠️ This signature is verified server-side using the secret key
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">🔍</div>
                      <h3>No Token Yet</h3>
                      <p>Go to the "Try It" tab and login to generate a token</p>
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

            {/* Right Column - Request Inspector */}
            <div className="demo-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <Code size={20} />
                  <h3>Live Request Monitor</h3>
                </div>

                <div className="request-details">
                  <h4>Endpoint</h4>
                  <pre className="endpoint-block">
                    POST /api/auth/jwt/login
                  </pre>

                  <h4>Request Body</h4>
                  <pre className="request-block">
                    {JSON.stringify({ email, password: password ? '••••••••' : '' }, null, 2)}
                  </pre>

                  {response && (
                    <>
                      <h4>Response Headers</h4>
                      <pre className="headers-block">
{`Content-Type: application/json
X-Powered-By: Express`}
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
                  <li>✅ Always use HTTPS in production</li>
                  <li>✅ Set appropriate token expiration</li>
                  <li>✅ Store tokens securely (httpOnly cookies preferred)</li>
                  <li>❌ Never store sensitive data in payload</li>
                  <li>❌ Don't use weak secrets</li>
                  <li>⚠️ Implement token refresh mechanism</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JWTDemo;