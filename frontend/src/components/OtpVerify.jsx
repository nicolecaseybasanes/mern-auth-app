import React, { useState } from 'react';
import { verifyOtp, resendOtp } from '../services/api';

const OtpVerify = ({ email, onSuccess, onBack }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      onSuccess(res.data.name);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setInfo('');
    setError('');
    try {
      await resendOtp({ email });
      setInfo('A new OTP has been sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not resend OTP');
    }
  };

  return (
    <div className="auth-box">
      <h2 style={{ textAlign: 'center', marginBottom: 12, color: 'var(--text)' }}>
        Verify Your Email
      </h2>
      <p className="subtext">
        We sent a 6-digit code to <strong>{email}</strong>.
        Check your inbox (and spam folder).
      </p>
      {error && <p className="error">{error}</p>}
      {info && <p className="info">{info}</p>}
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          maxLength={6}
          required
          style={{ textAlign: 'center', letterSpacing: '8px', fontSize: 18 }}
        />
        <button className="submit" type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify & Continue'}
        </button>
      </form>
      <p className="link" onClick={handleResend}>Resend OTP</p>
      <p className="link" onClick={onBack}>← Back</p>
    </div>
  );
};

export default OtpVerify;