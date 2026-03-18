const express = require('express');
const router = express.Router();


const {
  getSubmissions,
  deleteSubmission
} = require("../controllers/adminController");

const { loginAdmin } = require('../controllers/authController');

const protect = require("../middleware/auth");
// Optional: add auth middleware later
router.post("/login", loginAdmin);

router.get("/submissions", protect, getSubmissions);

router.delete("/submissions/:id", protect, deleteSubmission);

module.exports = router;