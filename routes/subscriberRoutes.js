const express = require("express");
const router = express.Router();
const subscriberController = require("../controllers/subscriberController");
router.get("/subscribers", subscriberController.getSubscribers);
router.post("/subscribe", subscriberController.subscribe);
router.delete("/subscribers/:id", subscriberController.deleteSubscriber);
module.exports = router;