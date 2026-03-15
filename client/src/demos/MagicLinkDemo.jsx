import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Mail, Code, CheckCircle, XCircle, Copy, Check, Link2 } from 'lucide-react';
import './DemoPage.css';

const API = 'http://localhost:5000';

const MagicLinkDemo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');

  const [activeTab, setActiveTab] = useState('learn');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Verify flow: user landed with ?token=xxx
  const [verifyStatus, setVerifyStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [verifyUser, setVerifyUser] = useState(null);
  const [verifyError, setVerifyError] = useState(null);

  useEffect(() => {
    if (!tokenFromUrl) return;
    setVerifyStatus('loading');
    setVerifyError(null);
    fetch(`${API}/api/magic-link/verify?token=${encodeURIComponent(tokenFromUrl)}`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVerifyStatus('success');
          setVerifyUser(data.user);
          setSearchParams({}); // clear ?token= from URL
        } else {
          setVerifyStatus('error');
          setVerifyError(data.message || 'Verification failed');
        }
      })
      .catch((err) => {
        setVerifyStatus('error');
        setVerifyError(err.message || 'Network error');
      });
  }, [tokenFromUrl, setSearchParams]);

  const handleSendLink = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch(`${API}/api/magic-link/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setResponse(data);
      } else {
        setError(data.message || data.error || 'Failed to send link');
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
    { id: 'learn', label: '📚 Learn' },
    { id: 'demo', label: '🧪 Try It' },
    { id: 'inspect', label: '🔍 Inspect' }
  ];

  // User landed with magic link – show verifying / success / error
  if (tokenFromUrl || verifyStatus) {
    return (
      <div className="demo-page">
        <div className="demo-header">
          <div className="container">
            <Link to="/" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Methods</span>
            </Link>
            <div className="demo-title-section">
              <div className="demo-icon magiclink-icon">
                <Link2 size={40} />
              </div>
              <div>
                <h1 className="demo-title">Magic Link</h1>
                <p className="demo-subtitle">Verifying your link…</p>
              </div>
            </div>
          </div>
        </div>
        <div className="demo-content">
          <div className="container">
            <div className="demo-main" style={{ maxWidth: '600px', margin: '0 auto' }}>
              {verifyStatus === 'loading' && (
                <div className="content-card">
                  <p style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <span className="spinner" style={{ display: 'inline-block', marginRight: '0.5rem' }} />
                    Verifying your magic link…
                  </p>
                </div>
              )}
              {verifyStatus === 'success' && (
                <div className="content-card">
                  <div className="alert alert-success">
                    <CheckCircle size={20} />
                    <span>You’re logged in with Magic Link!</span>
                  </div>
                  <p><strong>Email:</strong> {verifyUser?.email}</p>
                  <p><strong>Name:</strong> {verifyUser?.name}</p>
                  <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Your session is active. You can use the Session demo to access protected routes or logout.
                  </p>
                  <Link to="/demo/magic-link" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                    Back to Magic Link demo
                  </Link>
                </div>
              )}
              {verifyStatus === 'error' && (
                <div className="content-card">
                  <div className="alert alert-error">
                    <XCircle size={20} />
                    <span>{verifyError}</span>
                  </div>
                  <Link to="/demo/magic-link" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                    Try again
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-page">
      <div className="demo-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Methods</span>
          </Link>
          <div className="demo-title-section">
            <div className="demo-icon magiclink-icon">
              <Link2 size={40} />
            </div>
            <div>
              <h1 className="demo-title">Magic Link</h1>
              <p className="demo-subtitle">Passwordless • Email link • One-time</p>
            </div>
          </div>
          <div className="demo-tabs">
            {tabs.map((tab) => (
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
                    <h2>What is Magic Link?</h2>
                    <p>
                      Magic Link is <strong>passwordless</strong> login. You enter your email, the server sends you a
                      one-time link. Click the link and you’re logged in—no password to remember or type.
                    </p>
                  </div>
                  <div className="content-card">
                    <h2>How it works</h2>
                    <div className="flow-diagram">
                      <div className="flow-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h3>Enter email</h3>
                          <p>User submits their email address</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h3>Server creates token</h3>
                          <p>Random token stored with expiry (e.g. 15 min)</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h3>Link sent (or shown in demo)</h3>
                          <p>In production: email. Here: link shown on screen</p>
                        </div>
                      </div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                          <h3>User clicks link</h3>
                          <p>Backend verifies token, creates session, deletes token</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pros-cons-grid">
                    <div className="content-card pros-card">
                      <h2><CheckCircle size={24} /> Pros</h2>
                      <ul>
                        <li>No password to remember or leak</li>
                        <li>One-time use and short-lived</li>
                        <li>Simple UX: click and you’re in</li>
                      </ul>
                    </div>
                    <div className="content-card cons-card">
                      <h2><XCircle size={24} /> Cons</h2>
                      <ul>
                        <li>Depends on email access</li>
                        <li>Need email sending in production</li>
                        <li>Link can be forwarded (until used)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="demo-section">
                  <div className="content-card">
                    <h2>Try Magic Link</h2>
                    <p>Enter your email. You’ll get a link to click—no email is actually sent in this demo; the link appears below.</p>
                  </div>
                  <div className="demo-form-card">
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
                    <button
                      onClick={handleSendLink}
                      disabled={loading || !email}
                      className="btn-primary btn-large"
                    >
                      {loading ? (
                        <>
                          <span className="spinner"></span>
                          Creating link…
                        </>
                      ) : (
                        <>
                          <Mail size={20} />
                          Send magic link
                        </>
                      )}
                    </button>
                  </div>
                  {error && (
                    <div className="alert alert-error">
                      <XCircle size={20} />
                      <span>{error}</span>
                    </div>
                  )}
                  {response?.link && (
                    <div className="content-card response-card">
                      <div className="alert alert-success">
                        <CheckCircle size={20} />
                        <span>{response.message}</span>
                      </div>
                      <h3>Your magic link</h3>
                      <p style={{ marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                        Click to log in (or copy and open in this tab). Expires in {response.expiresIn} minutes.
                      </p>
                      <div className="token-display" style={{ marginBottom: '1rem' }}>
                        <pre className="token-text" style={{ wordBreak: 'break-all' }}>{response.link}</pre>
                        <button className="btn-copy" onClick={() => copyToClipboard(response.link)}>
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                      <a
                        href={response.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ display: 'inline-flex' }}
                      >
                        <Link2 size={18} />
                        Open magic link
                      </a>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'inspect' && (
                <div className="inspect-section">
                  <div className="content-card">
                    <h2>Inspect the link</h2>
                    <p>The magic link contains a one-time token in the URL. The server stores a hash of the token and the email; it never sends the raw token in an email in production—only the full URL.</p>
                  </div>
                  {response?.link ? (
                    <div className="content-card decoded-card">
                      <h3>Link structure</h3>
                      <pre className="decoded-block" style={{ wordBreak: 'break-all' }}>
                        {response.link}
                      </pre>
                      <p className="decoded-desc">
                        <code>?token=</code> is the one-time secret. Backend verifies it, then deletes it.
                      </p>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>Send a magic link in the Try It tab first.</p>
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
                  <pre className="endpoint-block">POST /api/magic-link/send</pre>
                  <h4>Request Body</h4>
                  <pre className="request-block">
                    {JSON.stringify({ email: email || '(required)' }, null, 2)}
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

export default MagicLinkDemo;
