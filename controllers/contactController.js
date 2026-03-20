const Submission = require("../models/Submission");
const transporter = require("../config/email");

// Templates (fallback if files missing)
const contactAdminTemplate = (data) => `
  <h2>New Contact Form</h2>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
  <p><strong>Message:</strong> ${data.message}</p>
`;

const confirmationTemplate = (data) => `
  <h2>Hi ${data.name},</h2>
  <p>We received your message and will reply soon.</p>
  <p><strong>Your message:</strong></p>
  <p>${data.message}</p>
`;

exports.submitForm = async (req, res) => {
  console.log("📨 Incoming request:", req.body);
  
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Save to database
    const submission = new Submission({ name, email, phone, message });
    await submission.save();
    console.log("✅ Saved to database");

    // Check transporter
    if (!transporter || typeof transporter.sendMail !== 'function') {
      throw new Error("Email transporter not ready");
    }

    // Send to admin (CRITICAL - must work)
    console.log("📤 Sending admin email...");
    const adminResult = await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`,
      html: contactAdminTemplate(submission),
    });
    console.log("✅ Admin email sent:", adminResult.messageId);

    // Send confirmation to user (OPTIONAL - don't fail if this breaks)
    try {
      await transporter.sendMail({
        from: `"Gods Invasion Outreach" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "We received your message",
        text: `Hi ${name},\n\nThanks for contacting us! We'll reply soon.\n\nYour message:\n${message}`,
        html: confirmationTemplate(submission),
      });
      console.log("✅ User confirmation sent");
    } catch (confirmErr) {
      console.log("⚠️ Confirmation failed (non-critical):", confirmErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
      emailId: adminResult.messageId
    });
    
  } catch (error) {
    console.error("❌ submitForm error:", error);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message
    });
  }
};