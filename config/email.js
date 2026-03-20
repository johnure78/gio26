const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // SSL port (more reliable)
  secure: true, // SSL
  family: 4, // Force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true, // ⭐ Enable debug logs
  logger: true  // ⭐ Enable logger
});

// Verify immediately with better error logging
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error ❌', error.message);
    console.error('Full error:', error);
  } else {
    console.log('Email server ready ✅');
  }
});

module.exports = transporter;