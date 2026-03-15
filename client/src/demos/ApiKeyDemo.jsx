import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Eye, EyeOff, Code, CheckCircle, XCircle, Copy, Check, KeyRound } from 'lucide-react';
import './DemoPage.css';

const ApiKeyDemo = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [authMode, setAuthMode] = useState('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch('http://localhost:5000/api/api-key/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setApiKey(data.apiKey);
        setResponse(data);
      } else {
        setError(data.message || data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProtectedRequest = async () => {
    const key = apiKey.trim();
    if (!key) {
      setError('Enter your API key first (get one via Register above).');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/api-key/protected', {
        headers: { 'X-API-Key': key }
      });
      const data = await res.json();
      if (res.ok) {
        setResponse(prev => (prev ? { ...prev, protected: data } : { protected: data }));
      } else {
        setError(data.message || data.error || 'Invalid API key');
      }
    } catch (err) {
      setError('Request failed: ' + err.message);
    } finally {
      setLoading(false);
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
            <div className="demo-icon apikey-icon">
              <KeyRound size={40} />
            </div>
            <div>
              <h1 className="demo-title">API Key Authentication</h1>
              <p className="demo-subtitle">Header-Based • Server-to-Server • Simple</p>
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
            <div className="demo-main">
              {activeTab === 'learn' && (
                <div className="learn-section">
                  <div className="content-card">
                    <h2>What is API Key Auth?</h2>
                    <p>
                      The client sends a secret key (usually in a header like <code>X-API-Key</code>). 
                      The server checks the key against stored keys and identifies the client. 
                      No username/password per request – just one long-lived key.
                    </p>
                  </div>
                  <div className="content-card">
                    <h2>How It Works</h2>
                    <div className="flow-diagram">
                      <div className="flow-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h3>Get a Key</h3>
                          <p>Register or generate an API key (shown once)</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h3>Send in Header</h3>
                          <p>X-API-Key: sk-your-secret-key</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h3>Server Validates</h3>
                          <p>Looks up key (hash) and attaches user to request</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pros-cons-grid">
                    <div className="content-card pros-card">
                      <h2><CheckCircle size={24} /> Advantages</h2>
                      <ul>
                        <li>✅ Simple to use and implement</li>
                        <li>✅ Good for server-to-server and scripts</li>
                        <li>✅ Easy to revoke (delete the key)</li>
                        <li>✅ No cookies or sessions</li>
                      </ul>
                    </div>
                    <div className="content-card cons-card">
                      <h2><XCircle size={24} /> Disadvantages</h2>
                      <ul>
                        <li>❌ Key can leak if not stored securely</li>
                        <li>❌ No built-in expiry (you must implement)</li>
                        <li>❌ One key per client/app – rotation needed</li>
                      </ul>
                    </div>
                  </div>
                  <div className="content-card code-example-card">
                    <h2><Code size={24} /> Example Request</h2>
                    <pre className="code-block">
{`fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': 'sk-your-secret-key'
  }
});`}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="demo-section">
                  <div className="content-card">
                    <h2>Try API Key Auth</h2>
                    <p>Register to get an API key, then call the protected route with it.</p>
                  </div>
                  <div className="demo-form-card">
                    <div className="auth-mode-tabs">
                      <button
                        type="button"
                        className={authMode === 'register' ? 'auth-tab active' : 'auth-tab'}
                        onClick={() => { setAuthMode('register'); setError(null); }}
                      >
                        Get API Key
                      </button>
                      <button
                        type="button"
                        className={authMode === 'use' ? 'auth-tab active' : 'auth-tab'}
                        onClick={() => { setAuthMode('use'); setError(null); }}
                      >
                        Use Key
                      </button>
                    </div>

                    {authMode === 'register' && (
                      <>
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
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
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
                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={handleRegister}
                          disabled={loading || !name || !email || !password}
                          className="btn-primary btn-large"
                        >
                          {loading ? <><span className="spinner"></span> Creating key...</> : <><Play size={20} /> Get API Key</>}
                        </button>
                        {response?.apiKey && (
                          <div className="alert alert-success" style={{ marginTop: '1rem' }}>
                            <CheckCircle size={20} />
                            <span>Key created! Copy it below and switch to &quot;Use Key&quot; to call the API.</span>
                          </div>
                        )}
                      </>
                    )}

                    {authMode === 'use' && (
                      <>
                        <div className="form-group">
                          <label>API Key</label>
                          <div className="password-input-wrapper">
                            <input
                              type={showKey ? 'text' : 'password'}
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              placeholder="sk-lab-..."
                              className="form-input"
                            />
                            <button type="button" className="password-toggle" onClick={() => setShowKey(!showKey)}>
                              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={handleProtectedRequest}
                          disabled={loading || !apiKey.trim()}
                          className="btn-primary btn-large"
                        >
                          {loading ? <><span className="spinner"></span> Calling API...</> : <><Play size={20} /> Call Protected Route</>}
                        </button>
                        <div className="demo-hint">
                          💡 Get a key from &quot;Get API Key&quot; tab first. Same account (email) can only have one key in this demo.
                        </div>
                      </>
                    )}
                  </div>

                  {error && (
                    <div className="alert alert-error">
                      <XCircle size={20} />
                      <span>{error}</span>
                    </div>
                  )}

                  {response?.protected && (
                    <div className="content-card response-card">
                      <h3>Protected Response</h3>
                      <pre className="response-block">{JSON.stringify(response.protected, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'inspect' && (
                <div className="inspect-section">
                  <div className="content-card">
                    <h2>Request Inspector</h2>
                    <p>API key is sent in the <code>X-API-Key</code> header. Never put it in the URL.</p>
                  </div>
                  {apiKey ? (
                    <div className="content-card decoded-card">
                      <h3>Header</h3>
                      <pre className="decoded-block">
                        X-API-Key: {showKey ? apiKey : apiKey.substring(0, 12) + '...'}
                      </pre>
                      <button className="btn-copy" onClick={() => copyToClipboard(apiKey)}>
                        {copied ? <Check size={16} /> : <Copy size={16} />} Copy key
                      </button>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>Get an API key in the Try It tab first.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="demo-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <Code size={20} />
                  <h3>Live Request Monitor</h3>
                </div>
                <div className="request-details">
                  <h4>Endpoint</h4>
                  <pre className="endpoint-block">
                    {authMode === 'register' ? 'POST /api/api-key/register' : 'GET /api/api-key/protected'}
                  </pre>
                  {authMode === 'register' ? (
                    <h4>Request Body</h4>
                  ) : (
                    <h4>Request Header</h4>
                  )}
                  <pre className="request-block">
                    {authMode === 'register'
                      ? JSON.stringify({ name: name || '(required)', email: email || '(required)', password: password ? '••••••••' : '(required)' }, null, 2)
                      : `X-API-Key: ${apiKey ? apiKey.substring(0, 12) + '...' : '(your key)'}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyDemo;
