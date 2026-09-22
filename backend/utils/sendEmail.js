const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 2525,
  secure: false,       // STARTTLS (not implicit SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 10000, // 10s
  greetingTimeout: 10000,
  socketTimeout: 10000
});

const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your OTP Code',
    html: `
      <h2>Your OTP Code</h2>
      <p>Your code is: <strong style="font-size:24px">${otp}</strong></p>
      <p>This code expires in 10 minutes.</p>
    `
  });
};

module.exports = sendOtpEmail;