const prisma = require("../config/prismaConfig");
const nodemailer = require("nodemailer");

// Initialize nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Registering a feedback
async function createFeedback(req, res) {
  const feedbackData = {
    name: req.body.name,
    email: req.body.email,
    feedback: req.body.feedback,
    rating: req.body.rating,
  };

  try {
    const createdFeedback = await prisma.feedback.create({
      data: feedbackData,
    });

    res.status(201).json({
      message: "Feedback created successfully.",
      feedback: createdFeedback,
    });

    // Sending email asynchronously
    sendFeedbackEmail(createdFeedback).catch((error) => {
      console.error("Error sending feedback:", error);
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

// Function to send feedback email
async function sendFeedbackEmail(feedback) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `A new feedback from ${feedback.name}`,
    text: `${feedback.feedback}\n\nRating: ${feedback.rating}\n\nYou can contact the person who gave the feedback on ${feedback.email}.`,
  };

  await transporter.sendMail(mailOptions);
}

// Get all feedbacks where status is PENDING
function getAllPendingFeedbacks(req, res) {
    prisma.feedback
      .findMany({
        where: {
          status: "PENDING"
        }
      })
      .then((feedbacks) => {
        res.status(200).json(feedbacks);
      })
      .catch((error) => {
        console.error("Error fetching pending feedbacks:", error);
        res.status(500).json({
          message: "Internal server error",
          error: error,
        });
      });
  }
  

// Get feedback by ID
function getFeedbackById(req, res) {
  const { id } = req.params;

  prisma.feedback
    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .then((feedback) => {
      if (feedback) {
        res.status(200).json(feedback);
      } else {
        res.status(404).json({
          message: "Feedback not found",
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching feedback:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
}

// Update feedback by ID
function updateFeedbackById(req, res) {
    const { id } = req.params;
    const { response, status } = req.body;
  
    prisma.feedback
      .update({
        where: {
          id: parseInt(id),
        },
        data: {
          response: response,
          status: status,
        },
      })
      .then((updatedFeedback) => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: updatedFeedback.email, // Use feedback.email from updated data
          subject: `Feedback response from ${process.env.APPLICATION_NAME}`, // Add application name
          text: `Your feedback has been responded to:\n\nResponse: ${response}`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending feedback response email:", error);
            res.status(500).json({ message: "Failed to send response email." });
          } else {
            res.status(200).json({
              message: "Feedback updated successfully. Response email sent.",
              feedback: updatedFeedback,
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error updating feedback:", error);
        res.status(500).json({
          message: "Internal server error",
          error: error,
        });
      });
  }
  

// Delete feedback by ID
function deleteFeedbackById(req, res) {
  const { id } = req.params;

  prisma.feedback
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      console.error("Error deleting feedback:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
}

module.exports = {
  createFeedback,
  getAllPendingFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
};
