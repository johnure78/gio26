const express = require("express");
const router = express.Router();

const { submitForm } = require("../controllers/contactController");
const { validateContact } = require("../middleware/validator");

router.post("/", validateContact, submitForm);

module.exports = router;

router.get("/", (req, res) => {
  res.send("Contact API is working 🚀");
});