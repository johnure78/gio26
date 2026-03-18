const express = require('express');
const router = express.Router();

const protect = require("../middleware/auth");
const {
  getSubmissions,
  deleteSubmission
} = require("../controllers/adminController");

const adminController = require('../controllers/adminController');

// Optional: add auth middleware later
router.get("/submissions", protect, getSubmissions);
router.delete("/submissions/:id", protect, deleteSubmission);
module.exports = router;