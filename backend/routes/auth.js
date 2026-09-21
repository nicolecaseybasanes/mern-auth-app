const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendOtpEmail = require('../utils/sendEmail');
const { authLimiter, otpLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Helper: generate a 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Helper: attach fresh OTP to a user and email it
const issueOtp = async (user) => {
  const otp = generateOtp();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await user.save();
  await sendOtpEmail(user.email, otp);
};

// ---------- REGISTER ----------
// Creates the account (unverified) and immediately emails an OTP.
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    // If user exists but is unverified, allow re-registration by
    // re-sending a fresh OTP (so they aren't stuck).
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ message: 'Email already registered. Please login.' });
    }

    const hashed = await bcrypt.hash(password, 12);

    if (!user) {
      user = await User.create({
        name,
        email,
        password: hashed,
        isVerified: false
      });
    } else {
      // Existing but unverified — update their info
      user.name = name;
      user.password = hashed;
    }

    await issueOtp(user);

    res.status(201).json({
      message: 'Account created. OTP sent to your email.',
      email: user.email,
      requiresOtp: true
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- LOGIN ----------
// Verifies email + password. If not verified yet, sends an OTP and
// tells the frontend to redirect to the OTP screen.
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    // If email isn't verified yet, force them through OTP
    if (!user.isVerified) {
      await issueOtp(user);
      return res.status(403).json({
        message: 'Email not verified. A new OTP has been sent.',
        email: user.email,
        requiresOtp: true
      });
    }

    // Verified → send OTP for 2FA-style login
    await issueOtp(user);
    res.json({ message: 'OTP sent to your email', email: user.email });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- RESEND OTP ----------
router.post('/resend-otp', otpLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await issueOtp(user);
    res.json({ message: 'OTP resent to your email' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- VERIFY OTP ----------
// Works for BOTH registration-verification and login-2FA.
router.post('/verify-otp', authLimiter, async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark verified (first time) and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      name: user.name,
      message: 'Verified successfully'
    });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- ME (protected) ----------
const authMiddleware = require('../middleware/authMiddleware');
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password -otp');
  res.json(user);
});

module.exports = router;