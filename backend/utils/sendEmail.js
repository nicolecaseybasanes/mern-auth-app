// Sends OTP via Brevo's HTTP API (port 443).
// Used because many networks + Render free tier block outbound SMTP.

const sendOtpEmail = async (to, otp) => {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: {
        name: 'MERN Auth',
        email: process.env.EMAIL_USER
      },
      to: [{ email: to }],
      subject: 'Your OTP Code',
      htmlContent: `
        <h2>Your OTP Code</h2>
        <p>Your code is: <strong style="font-size:24px">${otp}</strong></p>
        <p>This code expires in 10 minutes.</p>
      `
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo send failed (${response.status}): ${body}`);
  }
};

module.exports = sendOtpEmail;