require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/database");
const adminRoutes = require('./routes/adminroutes');
const authRoutes = require("./routes/authRoutes");

const transporter = require('./config/email');

const contactRoutes = require("./routes/contact");

const app = express();


// Connect DB
connectDB();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

//cors
app.use(cors({origin:"*"}));

app.use('/api/admin', adminRoutes);

app.use("/api/auth", authRoutes);


// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Contact API
app.use("/api/contact", contactRoutes);

// Serve frontend SPA
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next(); // skip API routes
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ⭐ FORCE LOAD EMAIL CONFIG WITH ERROR HANDLING
let transporter;
try {
  const emailConfig = require('./config/email');
  transporter = emailConfig.transporter || emailConfig;
  console.log('Email module loaded ✅');
} catch (err) {
  console.error('Failed to load email config ❌', err.message);
}
// Test route

app.get("/", (req, res) => {
  res.send("🚀 GIO Contact Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
