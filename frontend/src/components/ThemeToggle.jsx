import React from 'react';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button
      className="theme-switch"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      type="button"
    >
      <span className="theme-switch__track">
        <span className="theme-switch__icon theme-switch__icon--sun">☀️</span>
        <span className="theme-switch__icon theme-switch__icon--moon">🌙</span>
        <span className="theme-switch__thumb">
          <span className="theme-switch__thumb-icon">
            {darkMode ? '🌙' : '☀️'}
          </span>
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;