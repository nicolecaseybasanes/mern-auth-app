import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = ({ onSuccess, switchToLogin }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      });
      onSuccess(res.data.email);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <div className="tabs">
        <button className="tab" type="button" onClick={switchToLogin}>
          Login
        </button>
        <button className="tab active" type="button">Register</button>
      </div>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
        />
        <button className="submit" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;