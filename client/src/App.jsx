import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Terminal, Github, BookOpen } from 'lucide-react';
import AuthLab from './AuthLab';
import BasicAuthDemo from './demos/BasicAuthDemo';
import JWTDemo from './demos/JWTDemo';
import SessionDemo from './demos/SessionDemo';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isDemoPage = location.pathname.startsWith('/demo/');

  return (
    <div className="app">
      <div className="cyber-grid"></div>
      <div className="cyber-glow"></div>
      
      {!isDemoPage && (
        <header className="header">
          <div className="container">
            <Link to="/" className="logo-link">
              <div className="logo">
                <Terminal className="logo-icon" />
                <div>
                  <h1 className="logo-text">
                    <span className="logo-bracket">&lt;</span>
                    AUTH-LAB
                    <span className="logo-bracket">/&gt;</span>
                  </h1>
                  <p className="logo-subtitle">// interactive auth playground</p>
                </div>
              </div>
            </Link>
            
            <nav className="nav">
              <a
                href="https://github.com/vaibhavii3/auth-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <Github size={18} />
                <span>Source</span>
              </a>
              <a
                href="#"
                className="nav-link"
              >
                <BookOpen size={18} />
                <span>Docs</span>
              </a>
            </nav>
          </div>
        </header>
      )}
      
      <main className="main">
        <Routes>
          <Route path="/" element={<AuthLab />} />
          <Route path="/demo/basic" element={<BasicAuthDemo />} />
          <Route path="/demo/jwt" element={<JWTDemo />} />
          <Route path="/demo/session" element={<SessionDemo />} />
        </Routes>
      </main>
      
      {!isDemoPage && (
        <footer className="footer">
          <div className="container">
            <p>&copy; 2026 Auth-Lab. Built for learning.</p>
            <p className="footer-accent">// Explore authentication methods interactively</p>
          </div>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;