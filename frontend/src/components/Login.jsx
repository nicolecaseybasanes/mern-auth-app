import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = ({ onSuccess, switchToRegister }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(form);
      onSuccess(res.data.email);
    } catch (err) {
      const data = err.response?.data;
      if (data?.requiresOtp) {
        onSuccess(data.email);
      } else {
        setError(data?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <div className="tabs">
        <button className="tab active" type="button">Login</button>
        <button className="tab" type="button" onClick={switchToRegister}>
          Register
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
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
        <button className="submit" type="submit" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;