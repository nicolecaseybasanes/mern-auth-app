const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
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