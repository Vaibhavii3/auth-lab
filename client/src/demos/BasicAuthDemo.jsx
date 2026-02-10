import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Eye, EyeOff, Code, CheckCircle, XCircle, Copy, Check } from 'lucide-react';
import './DemoPage.css';

const BasicAuthDemo = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const credentials = btoa(`${username}:${password}`);
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/basic/protected', {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });

      const data = await res.json();
      
      if (res.ok) {
        setResponse({
          ...data,
          encodedCredentials: credentials,
          decodedCredentials: `${username}:${password}`
        });
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
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
    { id: 'learn', label: '📚 Learn', emoji: '📚' },
    { id: 'demo', label: '🧪 Try It', emoji: '🧪' },
    { id: 'inspect', label: '🔍 Inspect', emoji: '🔍' }
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
            <div className="demo-icon basic-icon">
              <span>🔑</span>
            </div>
            <div>
              <h1 className="demo-title">Basic Authentication</h1>
              <p className="demo-subtitle">Simple • Header-Based • Stateless</p>
            </div>
          </div>

          <div className="demo-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-emoji">{tab.emoji}</span>
                <span className="tab-label">{tab.label}</span>
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
                    <h2>What is Basic Auth?</h2>
                    <p>
                      Basic Authentication is the simplest HTTP authentication scheme. It sends 
                      credentials (username and password) encoded in Base64 with each request 
                      in the Authorization header.
                    </p>
                  </div>

                  <div className="content-card">
                    <h2>How It Works</h2>
                    <div className="flow-diagram">
                      <div className="flow-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h3>Client Prepares</h3>
                          <p>Combines username:password</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h3>Base64 Encode</h3>
                          <p>Encodes credentials to Base64</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h3>Add Header</h3>
                          <p>Authorization: Basic [encoded]</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                          <h3>Server Decodes</h3>
                          <p>Extracts and validates credentials</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">5</div>
                        <div className="step-content">
                          <h3>Grant Access</h3>
                          <p>Returns requested resource</p>
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
                        <li>✅ Extremely simple to implement</li>
                        <li>✅ No server-side state needed</li>
                        <li>✅ Widely supported by all browsers</li>
                        <li>✅ No cookies or sessions required</li>
                        <li>✅ Works with any HTTP client</li>
                        <li>✅ Good for simple APIs</li>
                      </ul>
                    </div>

                    <div className="content-card cons-card">
                      <h2>
                        <XCircle size={24} />
                        Disadvantages
                      </h2>
                      <ul>
                        <li>❌ Credentials sent with EVERY request</li>
                        <li>❌ No encryption (only Base64 encoding)</li>
                        <li>❌ HTTPS is mandatory</li>
                        <li>❌ No logout mechanism</li>
                        <li>❌ Can't revoke access easily</li>
                        <li>❌ Browser prompts can be intrusive</li>
                      </ul>
                    </div>
                  </div>

                  <div className="content-card">
                    <h2>Encoding Example</h2>
                    <div className="encoding-demo">
                      <div className="encoding-step">
                        <h3>1. Original Credentials</h3>
                        <pre>username:password</pre>
                      </div>
                      <div className="encoding-arrow">→</div>
                      <div className="encoding-step">
                        <h3>2. Base64 Encode</h3>
                        <pre>dXNlcm5hbWU6cGFzc3dvcmQ=</pre>
                      </div>
                      <div className="encoding-arrow">→</div>
                      <div className="encoding-step">
                        <h3>3. Add to Header</h3>
                        <pre>Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=</pre>
                      </div>
                    </div>
                    <p className="encoding-note">
                      ⚠️ Base64 is NOT encryption! It's just encoding. Anyone can decode it.
                      This is why HTTPS is essential.
                    </p>
                  </div>

                  <div className="content-card code-example-card">
                    <h2>
                      <Code size={24} />
                      Backend Implementation
                    </h2>
                    <pre className="code-block">
{`const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ 
      error: 'Missing credentials' 
    });
  }
  
  // Extract and decode credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer
    .from(base64Credentials, 'base64')
    .toString('ascii');
  const [username, password] = credentials.split(':');
  
  // Validate credentials
  const user = users.find(u => 
    u.username === username && 
    u.password === password
  );
  
  if (!user) {
    return res.status(401).json({ 
      error: 'Invalid credentials' 
    });
  }
  
  req.user = user;
  next();
};`}
                    </pre>
                  </div>

                  <div className="content-card code-example-card">
                    <h2>Frontend Implementation</h2>
                    <pre className="code-block">
{`// Encode credentials
const username = 'demo';
const password = 'password123';
const credentials = btoa(\`\${username}:\${password}\`);

// Make request
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Basic \${credentials}\`
  }
})
.then(res => res.json())
.then(data => console.log(data));`}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="demo-section">
                  <div className="content-card">
                    <h2>Try Basic Authentication</h2>
                    <p>Enter credentials to see how they're encoded and sent to the server</p>
                  </div>

                  <div className="demo-form-card">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="demo"
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
                      disabled={loading || !username || !password}
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
                          Authenticate
                        </>
                      )}
                    </button>

                    <div className="demo-hint">
                      💡 Test credentials: <code>demo</code> / <code>password123</code>
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
                        <span>Authentication successful!</span>
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
                          {JSON.stringify({
                            message: response.message,
                            user: response.user
                          }, null, 2)}
                        </pre>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'inspect' && (
                <div className="inspect-section">
                  <div className="content-card">
                    <h2>Credentials Inspector</h2>
                    <p>See how your credentials are encoded in Base64</p>
                  </div>

                  {response ? (
                    <>
                      <div className="content-card decoded-card">
                        <h3>Original Credentials</h3>
                        <p className="decoded-desc">Plain text username and password</p>
                        <pre className="decoded-block">
                          {response.decodedCredentials}
                        </pre>
                      </div>

                      <div className="encoding-flow">
                        <div className="flow-arrow-down">↓</div>
                        <p className="flow-label">Base64 Encoding</p>
                      </div>

                      <div className="content-card decoded-card">
                        <h3>Encoded Credentials</h3>
                        <p className="decoded-desc">Base64 representation</p>
                        <div className="token-display">
                          <pre className="token-text">{response.encodedCredentials}</pre>
                          <button
                            className="btn-copy"
                            onClick={() => copyToClipboard(response.encodedCredentials)}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="encoding-flow">
                        <div className="flow-arrow-down">↓</div>
                        <p className="flow-label">Add to Authorization Header</p>
                      </div>

                      <div className="content-card decoded-card">
                        <h3>Complete Header</h3>
                        <p className="decoded-desc">As sent to the server</p>
                        <pre className="decoded-block">
                          Authorization: Basic {response.encodedCredentials}
                        </pre>
                      </div>

                      <div className="content-card security-warning">
                        <h3>⚠️ Security Notice</h3>
                        <p>
                          Base64 encoding is NOT encryption. Anyone intercepting this request 
                          can easily decode these credentials. That's why Basic Auth should 
                          ONLY be used over HTTPS.
                        </p>
                        <div className="warning-demo">
                          <h4>Try it yourself in browser console:</h4>
                          <pre>
                            atob('{response.encodedCredentials}')
                            // Returns: "{response.decodedCredentials}"
                          </pre>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">🔍</div>
                      <h3>No Data Yet</h3>
                      <p>Go to the "Try It" tab and authenticate to see the encoding</p>
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
                    GET /api/auth/basic/protected
                  </pre>

                  <h4>Request Headers</h4>
                  <pre className="request-block">
{username && password ? `Authorization: Basic ${btoa(`${username}:${password}`)}` : 'Authorization: Basic [credentials]'}
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
                  <li>✅ ALWAYS use HTTPS (never HTTP)</li>
                  <li>✅ Good for simple internal APIs</li>
                  <li>✅ Use for server-to-server auth</li>
                  <li>❌ Not recommended for user-facing apps</li>
                  <li>❌ Avoid for sensitive data</li>
                  <li>⚠️ Consider rate limiting</li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>💡 Use Cases</h3>
                <ul className="use-cases-list">
                  <li>
                    <strong>✅ Good for:</strong>
                    <span>Internal tools, Development APIs, Simple integrations</span>
                  </li>
                  <li>
                    <strong>❌ Avoid for:</strong>
                    <span>Public websites, Mobile apps, High-security needs</span>
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

export default BasicAuthDemo;