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

// ⭐ Load email config ONCE (self-initializes)
const transporter = require("./config/email");

// Debug routes
app.get("/api/debug", (req, res) => {
  res.json({
    emailLoaded: !!transporter,
    hasSendMail: transporter && typeof transporter.sendMail === 'function',
    env: {
      EMAIL_USER: process.env.EMAIL_USER ? "✅" : "❌",
      EMAIL_PASS: process.env.EMAIL_PASS ? "✅" : "❌",
      RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? "✅" : "❌"
    }
  });
});

app.get("/api/test-email", async (req, res) => {
  if (!transporter || !transporter.verify) {
    return res.status(500).json({ error: "Transporter not ready" });
  }
  try {
    await transporter.verify();
    res.json({ status: "Email OK" });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      code: err.code,
      address: err.address,
      port: err.port
    });
  }
});

// Routes
app.use('/api/admin', adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// SPA fallback
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check
app.get("/", (req, res) => {
  res.send("🚀 GIO Backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));