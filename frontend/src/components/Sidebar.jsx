import React from 'react';

const Sidebar = ({ onLogout, darkMode, toggleTheme }) => (
  <aside className="sidebar">
    <h3>Menu</h3>
    <ul>
      <li>Dashboard</li>
      <li>Profile</li>
      <li>Settings</li>
    </ul>
    <button
      className="logout-btn"
      onClick={toggleTheme}
      style={{ marginBottom: 10 }}
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
    <button className="logout-btn" onClick={onLogout}>Logout</button>
  </aside>
);

export default Sidebar;