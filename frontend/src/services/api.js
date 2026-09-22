import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

export const registerUser = (data) => API.post('/api/auth/register', data);
export const loginUser = (data) => API.post('/api/auth/login', data);
export const verifyOtp = (data) => API.post('/api/auth/verify-otp', data);
export const resendOtp = (data) => API.post('/api/auth/resend-otp', data);

export default API;