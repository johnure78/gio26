const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // 🔧 ADD THESE SETTINGS FOR RAILWAY COMPATIBILITY:
  tls: {
    rejectUnauthorized: false,  // Bypass SSL certificate issues
    ciphers: 'SSLv3'
  },
  connectionTimeout: 10000,     // 10 seconds (prevents hanging)
  greetingTimeout: 10000,
  socketTimeout: 10000
});

// Verify connection on startup (catches errors early)
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error ❌', error);
  } else {
    console.log('Email server ready ✅');
  }
});