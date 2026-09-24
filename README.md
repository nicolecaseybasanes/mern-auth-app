# Auth App

A full-stack authentication application built with the **MERN stack** (MongoDB, Express, React, Node.js) for a school purposes activity. Features OTP email verification, JWT authentication, neumorphic UI, and dark mode.

**Live Demo:** [https://basanes-act-auth-app.vercel.app](https://basanes-act-auth-app.vercel.app)

---

## Features

- **User Registration** with OTP email verification
- **Login with 2FA** — OTP sent to Gmail on every login
- **JWT Authentication**
- **Password hashing** with bcrypt (12 rounds)
- **OTP delivery** via Brevo HTTP API (works on all networks)
- **Rate limiting** on auth endpoints to prevent brute force
- **Skeleton loading** for a smooth first-load experience
- **Dark mode** with persisted user preference
- **Neumorphic UI design** — soft shadows, pill-shaped inputs



---

##  Tech Stack

### Frontend
- **React** (Create React App)
- **Axios** for API calls
- **CSS Variables** for theming

### Backend
- **Node.js** + **Express**
- **MongoDB Atlas** + **Mongoose**
- **JWT** for session tokens
- **bcryptjs** for password hashing
- **express-rate-limit** for abuse prevention
- **Brevo HTTP API** for OTP delivery

### Deployment
- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Render](https://render.com)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Email:** [Brevo](https://www.brevo.com)

---

---

## User Flow

### Registration

1. User fills Name + Email + Password
2. Backend creates account with `isVerified: false`
3. OTP email sent via Brevo
4. User enters OTP → `isVerified: true` → JWT token issued
5. Auto-login → Dashboard

### Login

1. User enters Email + Password
2. Backend verifies credentials
3. If not verified → forces OTP re-verification
4. If verified → sends fresh OTP (2FA)
5. User enters OTP → JWT token → Dashboard

---

## Security Features

- **Password hashing** — bcrypt with 12 salt rounds
- **JWT tokens** — 7-day expiry
- **Rate limiting** — 10 auth attempts per 15 min per IP
- **OTP expiry** — 10 minutes per code
- **OTP resend limit** — 5 per hour per IP
- **CORS** — only allows requests from configured frontend URL
- **Email verification** — required before login

---



##  Author

**Nicole Casey Basanes**
- GitHub: [@nicolecaseybasanes](https://github.com/nicolecaseybasanes)
- Live App: [basanes-act-auth-app.vercel.app](https://basanes-act-auth-app.vercel.app)
