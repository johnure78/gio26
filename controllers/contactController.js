const Submission = require("../models/Submission");
const { sendMail } = require("../config/email");

exports.submitForm = async (req, res) => {
  console.log("📨 Form submitted:", req.body);
  
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Save to database
    const submission = new Submission({ name, email, phone, message });
    await submission.save();
    console.log("✅ Saved to DB");

    // Send to admin (YOU)
    const adminResult = await sendMail({
      from: `"Website Contact" <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`
    });
    console.log("✅ Admin email sent:", adminResult.id);

    // Send confirmation to user
    try {
      await sendMail({
        from: `"Gods Invasion Outreach" <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: email,
        subject: "We received your message",
        text: `Hi ${name},\n\nThanks for contacting us! We'll reply soon.\n\nYour message:\n${message}`
      });
      console.log("✅ User confirmation sent");
    } catch (e) {
      console.log("⚠️ Confirmation failed:", e.message);
    }

    res.json({ success: true, message: "Sent!", emailId: adminResult.id });
    
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};