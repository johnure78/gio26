const nodemailer = require("nodemailer");
const dns = require("dns");

// Force IPv4 for all DNS lookups in this process
dns.setDefaultResultOrder('ipv4first');

const transporter = nodemailer.createTransport({
  host: "142.250.102.108", // Gmail SMTP IPv4 address (forces IPv4)
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Needed when using IP instead of hostname
    servername: 'smtp.gmail.com' // Required for certificate validation
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Email error ❌', error);
  } else {
    console.log('Email ready ✅');
  }
});

module.exports = transporter;