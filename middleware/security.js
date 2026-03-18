const helmet = require("helmet");
const cors = require("cors");

module.exports = [
  helmet(),
  cors({
    origin: "*", // Restrict in production
  }),
];