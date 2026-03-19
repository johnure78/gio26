const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure:false,
   // You can also use Outlook, Yahoo, or SMTP
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // App password (NOT your Gmail login)
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Email configuration error ❌", error);
  } else {
    console.log("Email transporter ready ✅");
  }
});

module.exports = transporter;