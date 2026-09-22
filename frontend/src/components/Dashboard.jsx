import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = ({ userName, onLogout, darkMode, toggleTheme }) => (
  <div className="dashboard">
    <Sidebar
      onLogout={onLogout}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    />
    <main className="main-content">
      <h1>Hello, {userName}</h1>
      <div className="gif-container">
        <img
          src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
          alt="Welcome"
          className="welcome-gif"
        />
      </div>
    </main>
  </div>
);

export default Dashboard;