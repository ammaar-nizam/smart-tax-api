const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/create", feedbackController.createFeedback);
router.get("/", feedbackController.getAllPendingFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.patch("/:id", feedbackController.updateFeedbackById);
router.delete("/:id", feedbackController.deleteFeedbackById);

module.exports = router;