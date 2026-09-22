import ThemeToggle from './components/ThemeToggle';
import React, { useEffect, useState } from 'react';
import './App.css';
import SkeletonLoader from './components/SkeletonLoader';
import Login from './components/Login';
import Register from './components/Register';
import OtpVerify from './components/OtpVerify';
import Dashboard from './components/Dashboard';

function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('login'); // login | register | otp | dashboard
  const [pendingEmail, setPendingEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode on mount + whenever it changes
  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Skeleton on first load
  useEffect(() => {
    const t = setTimeout(() => {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('name');
      if (token && name) {
        setUserName(name);
        setView('dashboard');
      }
      setLoading(false);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUserName('');
    setView('login');
  };

  const toggleTheme = () => setDarkMode((d) => !d);

  if (loading) return <SkeletonLoader />;

  return (
    <div className="app">
      {view !== 'dashboard' && (
        <div className="auth-container">
          <div className="theme-switch-wrapper">
             <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          </div>

          {view === 'login' && (
            <Login
              onSuccess={(email) => {
                setPendingEmail(email);
                setView('otp');
              }}
              switchToRegister={() => setView('register')}
            />
          )}

          {view === 'register' && (
            <Register
              onSuccess={(email) => {
                setPendingEmail(email);
                setView('otp');
              }}
              switchToLogin={() => setView('login')}
            />
          )}

          {view === 'otp' && (
            <OtpVerify
              email={pendingEmail}
              onSuccess={(name) => {
                setUserName(name);
                setView('dashboard');
              }}
              onBack={() => setView('login')}
            />
          )}
        </div>
      )}

      {view === 'dashboard' && (
        <Dashboard
          userName={userName}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}

export default App;