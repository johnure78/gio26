const Submission = require('../models/Submission'); // your Mongo model

// GET all submissions
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json({ status: 'success', submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch submissions' });
  }
};

exports.deleteSubmission = async (req, res) => {
  await Submission.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted" });
};