import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Key, Cookie, Zap, Lock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import './AuthLab.css';

const AuthLab = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const authMethods = [
    {
      id: 'basic',
      name: 'Basic Auth',
      icon: Shield,
      color: 'amber',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      description: 'Encode credentials in Base64 and send with each request header',
      difficulty: 'Beginner',
      security: '⭐⭐',
      useCase: 'Simple APIs, Internal Tools',
      link: '/demo/basic',
      pros: ['Simple to implement', 'No server storage', 'Stateless'],
      cons: ['Credentials in every request', 'No encryption by default', 'Hard to revoke'],
      emoji: '🔑'
    },
    {
      id: 'jwt',
      name: 'JWT Tokens',
      icon: Key,
      color: 'cyan',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      description: 'Sign JSON payloads cryptographically for stateless authentication',
      difficulty: 'Intermediate',
      security: '⭐⭐⭐⭐',
      useCase: 'SPAs, Mobile Apps, Microservices',
      link: '/demo/jwt',
      pros: ['Stateless & scalable', 'Cross-domain support', 'Self-contained'],
      cons: ['Token size overhead', 'Hard to revoke', 'XSS vulnerability'],
      emoji: '🎫'
    },
    {
      id: 'session',
      name: 'Session Cookies',
      icon: Cookie,
      color: 'emerald',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      description: 'Store session state server-side and reference via secure cookies',
      difficulty: 'Intermediate',
      security: '⭐⭐⭐⭐⭐',
      useCase: 'Traditional Web Apps, E-commerce',
      link: '/demo/session',
      pros: ['Easy to revoke', 'Server controls state', 'Smaller cookies'],
      cons: ['Requires server storage', 'Scaling complexity', 'CORS challenges'],
      emoji: '🍪'
    }
  ];

  const features = [
    { icon: Zap, text: 'Live demos with real API calls', color: 'amber' },
    { icon: Lock, text: 'See security in action', color: 'cyan' },
    { icon: Key, text: 'Inspect tokens & cookies', color: 'emerald' }
  ];

  return (
    <div className="auth-lab">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Interactive Learning Platform</span>
            </div>
            
            <h1 className="hero-title">
              Master Authentication
              <span className="title-highlight"> by Building</span>
            </h1>
            
            <p className="hero-description">
              Hands-on demos of Basic Auth, JWT, and Session-based authentication.
              See the requests, inspect the tokens, understand the trade-offs.
            </p>

            <div className="hero-features">
              {features.map((feature, idx) => (
                <div key={idx} className={`feature-pill feature-${feature.color}`}>
                  <feature.icon size={16} />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="hero-cta">
              <a href="#methods" className="btn-primary">
                Explore Methods
                <ArrowRight size={18} />
              </a>
              <a href="https://github.com/vaibhavii3/auth-lab" 
                 className="btn-secondary"
                 target="_blank"
                 rel="noopener noreferrer">
                View Source
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="code-window">
              <div className="window-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="window-title">auth-demo.js</span>
              </div>
              <div className="window-content">
                <pre className="code-block">
{`// Choose your auth strategy
const authenticate = async () => {
  const strategies = {
    basic: encodeCredentials(),
    jwt: generateToken(),
    session: createSession()
  };
  
  return strategies[method];
};

// Live demo below ↓`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Methods Section */}
      <section id="methods" className="methods-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Path</h2>
            <p className="section-subtitle">
              Each method has different use cases, security levels, and trade-offs.
              Click any card to try the interactive demo.
            </p>
          </div>

          <div className="methods-grid">
            {authMethods.map((method) => (
              <Link
                key={method.id}
                to={method.link}
                className={`method-card method-card-${method.color}`}
                onMouseEnter={() => setHoveredCard(method.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-glow" style={{ background: method.gradient }}></div>
                
                <div className="card-header">
                  <div className="card-icon" style={{ background: method.gradient }}>
                    <method.icon size={28} />
                  </div>
                  <div>
                    <h3 className="card-title">{method.name}</h3>
                    <span className="card-emoji">{method.emoji}</span>
                  </div>
                </div>

                <p className="card-description">{method.description}</p>

                <div className="card-meta">
                  <div className="meta-row">
                    <span className="meta-label">Difficulty:</span>
                    <span className="meta-value">{method.difficulty}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Security:</span>
                    <span className="meta-value">{method.security}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Best for:</span>
                    <span className="meta-value">{method.useCase}</span>
                  </div>
                </div>

                <div className="card-lists">
                  <div className="pros-cons">
                    <div className="pros">
                      <h4><CheckCircle size={14} /> Pros</h4>
                      <ul>
                        {method.pros.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cons">
                      <h4><XCircle size={14} /> Cons</h4>
                      <ul>
                        {method.cons.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="card-cta">
                    Try Interactive Demo
                    <ArrowRight size={16} className="cta-arrow" />
                  </span>
                </div>

                {hoveredCard === method.id && (
                  <div className="card-particles">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`
                      }}></div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Feature Comparison</h2>
            <p className="section-subtitle">
              Quick reference to help you choose the right authentication method
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="th-basic">
                    <Shield size={18} />
                    Basic Auth
                  </th>
                  <th className="th-jwt">
                    <Key size={18} />
                    JWT
                  </th>
                  <th className="th-session">
                    <Cookie size={18} />
                    Session
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">Storage Location</td>
                  <td>Headers (per request)</td>
                  <td>Client (localStorage/cookie)</td>
                  <td>Server (database/memory)</td>
                </tr>
                <tr>
                  <td className="feature-name">Scalability</td>
                  <td>⭐⭐</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐</td>
                </tr>
                <tr>
                  <td className="feature-name">Security Level</td>
                  <td>⭐⭐</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td className="feature-name">Implementation</td>
                  <td>Very Simple</td>
                  <td>Medium</td>
                  <td>Medium</td>
                </tr>
                <tr>
                  <td className="feature-name">Cross-Domain</td>
                  <td>✅ Yes</td>
                  <td>✅ Yes</td>
                  <td>⚠️ CORS Issues</td>
                </tr>
                <tr>
                  <td className="feature-name">Token Revocation</td>
                  <td>N/A</td>
                  <td>❌ Difficult</td>
                  <td>✅ Easy</td>
                </tr>
                <tr>
                  <td className="feature-name">Mobile Apps</td>
                  <td>✅ Good</td>
                  <td>✅ Best</td>
                  <td>⚠️ Challenging</td>
                </tr>
                <tr>
                  <td className="feature-name">Server Load</td>
                  <td>Low</td>
                  <td>Very Low</td>
                  <td>Medium-High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Learning?</h2>
            <p>Pick an authentication method above and dive into the interactive demo</p>
            <div className="cta-buttons">
              <Link to="/demo/basic" className="cta-btn cta-btn-amber">
                <Shield size={20} />
                Try Basic Auth
              </Link>
              <Link to="/demo/jwt" className="cta-btn cta-btn-cyan">
                <Key size={20} />
                Try JWT
              </Link>
              <Link to="/demo/session" className="cta-btn cta-btn-emerald">
                <Cookie size={20} />
                Try Sessions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthLab;