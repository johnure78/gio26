const nodemailer = require("nodemailer");

// Create transporter with IPv4 forced
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4, // ⭐ CRITICAL: Force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  logger: true
});

// Async verification - log but don't crash
const verifyEmail = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email server ready - SMTP connection verified');
  } catch (error) {
    console.error('❌ Email verification failed:', error.message);
    console.error('Error code:', error.code, 'Syscall:', error.syscall);
    // Don't exit - let it retry on actual send
  }
};

// Run after short delay to ensure env vars loaded
setTimeout(verifyEmail, 1000);

module.exports = transporter;