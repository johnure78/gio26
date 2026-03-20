require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/database");
const adminRoutes = require('./routes/adminroutes');
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contact");

const app = express();

// Connect DB
connectDB();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({ origin: "*" }));

// ⭐ ADD: Import email config and verify (minimal addition)
let transporter;
try {
  const emailModule = require("./config/email");
  transporter = emailModule.transporter || emailModule;
  
  console.log("📧 Loading email configuration...");
  
  // Verify email config on startup
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Email verification FAILED:", error.message);
    } else {
      console.log("✅ Email server ready - SMTP connection verified");
    }
  });
} catch (err) {
  console.error("❌ Failed to load email config:", err.message);
}

// Routes
app.use('/api/admin', adminRoutes);
app.use("/api/auth", authRoutes);

// ⭐ ADD: Debug routes to check email status (minimal addition)
app.get("/api/debug", (req, res) => {
  res.json({
    emailConfigured: !!transporter,
    envVars: {
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PORT: process.env.EMAIL_PORT,
      EMAIL_USER: process.env.EMAIL_USER ? "✅ Set" : "❌ Missing",
      EMAIL_PASS: process.env.EMAIL_PASS ? "✅ Set" : "❌ Missing",
      RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? "✅ Set" : "❌ Missing"
    }
  });
});

app.get("/api/test-email", async (req, res) => {
  if (!transporter) {
    return res.status(500).json({ error: "Transporter not loaded" });
  }
  try {
    await transporter.verify();
    res.json({ status: "Email OK", message: "SMTP connection verified" });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      code: err.code,
      command: err.command 
    });
  }
});

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Contact API
app.use("/api/contact", contactRoutes);

// Serve frontend SPA
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Test route
app.get("/", (req, res) => {
  res.send("🚀 GIO Contact Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);