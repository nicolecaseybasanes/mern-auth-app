require('dotenv').config();
console.log('MONGO_URI =', process.env.MONGO_URI);
console.log('All env keys =', Object.keys(process.env).filter(k => !k.startsWith('npm_')));
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  })
);

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));