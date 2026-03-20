const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple send function
const sendMail = async ({ from, to, subject, text, html, replyTo }) => {
  return await resend.emails.send({
    from: from || process.env.FROM_EMAIL || 'onboarding@resend.dev',
    to: to,
    subject: subject,
    text: text,
    html: html,
    reply_to: replyTo
  });
};

console.log('📧 Resend email configured');

module.exports = { sendMail };