exports.contactAdminTemplate = (submission) => {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Phone:</strong> ${submission.phone}</p>
    <p><strong>Submitted At:</strong> ${submission.createdAt}</p>
  `;
};

exports.confirmationTemplate = (submission) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Thank you for reaching out to God’s Invasion Outreach 🙏</h2>

    <p>Dear ${submission.name},</p>
    <p>We have received your message and truly appreciate your interest
        in partnering with us. Our team will review your submission and
        get back to you shortly. Here’s a copy of your submission:</p>
    <ul>
      <li><strong>Name:</strong> ${submission.name}</li>
      <li><strong>Email:</strong> ${submission.email}</li>
      <li><strong>Phone:</strong> ${submission.phone}</li>
    </ul>
    <p>
        If your matter is urgent, please reply directly to this email.
      </p>

      <hr>

      <p>
        Warm regards,<br>
        <strong>God’s Invasion Outreach Team</strong><br>
        Empowering lives through faith, outreach, and service.
      </p>
    </div>
  `;
};