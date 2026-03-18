const Submission = require("../models/Submission");
const transporter = require("../config/email");
const { contactAdminTemplate, confirmationTemplate } = require("../utils/emailTemplates");

exports.submitForm = async (req, res) => {
    console.log("Incoming request body:", req.body);
  try {
    const { name, email, phone, message } = req.body;

    // Save to database
    const submission = new Submission({ name, email, phone, message });
    await submission.save();

    // Send email to admin
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Your email
      subject: "New Contact Form Submission",
      html: contactAdminTemplate(submission),
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Gods invasion outreach team" <${process.env.EMAIL_USER}>`,
      to: submission.email,
      subject: "We received your message",
      html: confirmationTemplate(submission),
    });

    res.status(200).json({
      success: true,
      message: "Form submitted successfully and emails sent!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while sending emails",
    });
  }
};