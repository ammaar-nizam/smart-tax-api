const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaConfig");
const emailController = require("./emailController");
const { validator, schemaForAgent } = require("../utils/validation");

// Registering an agent
function registerAgent(req, res) {
  const agent = {
    agentName: req.body.agentName,
    businessRegistrationNumber: req.body.businessRegistrationNumber,
    agentAddress: req.body.agentAddress,
    agentTelephone: req.body.agentTelephone,
    agentEmail: req.body.agentEmail,
    agentUsername: req.body.agentUsername,
    agentPassword: CryptoJS.AES.encrypt(
      req.body.agentPassword,
      process.env.PASSWORD_SECRET_KEY
    ).toString(),
  };

  it;
  // Validate user input
  const validationResponse = validator.validate(agent, schemaForAgent);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "Validation failed.",
      errors: validationResponse,
    });
  } else {
    prisma.agent
      .findUnique({
        where: {
          businessRegistrationNumber: req.body.businessRegistrationNumber,
        },
      })
      .then((data) => {
        if (data) {
          res.status(409).json({
            message:
              "An agent already exists with the same business registration number.",
          });
        } else {
          prisma.agent
            .create({ data: agent })
            .then((createdAgent) => {
              res.status(201).json({
                message: "Agent created successfully.",
                agent: createdAgent,
              });
              emailController.sendRegistrationConfirmationEmail(
                createdAgent.agentUsername
              );
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error creating the agent.",
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Unexpected error occured.",
          error: err,
        });
      });
  }
}

// Logging in as an agent
function loginAsAgent(req, res) {
  prisma.agent
    .findUnique({ where: { agentUsername: req.body.agentUsername } })
    .then((currentAgent) => {
      if (currentAgent === null) {
        res.status(401).json({
          message: "Incorrect username.",
        });
      } else {
        const hashedPassword = CryptoJS.AES.decrypt(
          currentAgent.agentPassword,
          process.env.PASSWORD_SECRET_KEY
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.agentPassword &&
          res.status(401).json("Incorrect password.");

        const accessToken = jwt.sign(
          {
            id: currentAgent.id,
            agentName: currentAgent.agentName,
            agentEmail: currentAgent.agentEmail,
            agentAddress: currentAgent.agentAddress,
            agentUsername: currentAgent.agentUsername,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30m" },
          function (err, accessToken) {
            res.status(200).json({
              message: "Authentication successful and logged in as an agent.",
              accessToken: accessToken,
            });
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error logging in as agent.",
        error: err,
      });
    });
}

// LOG OUT
function logoutAsAgent(req, res) {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
}

// Get agent by Id
function getAgentById(req, res) {
  prisma.agent
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Agent not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the agent.",
        error: err,
      });
    });
}

// Get agent by name
function getAgentByName(req, res) {
  const agentName = req.query.agentName;
  prisma.agent
    .findMany({ where: { agentName: { contains: agentName } } })
    .then((agents) => {
      if (agents) {
        res.status(200).json(agents);
      } else {
        res.status(404).json({
          message: "Agent not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the agent",
        error: err,
      });
    });
}

// Get all agents
function getAllAgents(req, res) {
  prisma.agent
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all agents.",
        error: err,
      });
    });
}

// Update agent by Id
function updateAgentById(req, res) {
  prisma.agent
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        agentName: req.body.agentName,
        businessRegistrationNumber: req.body.businessRegistrationNumber,
        agentAddress: req.body.agentAddress,
        agentTelephone: req.body.agentTelephone,
        agentEmail: req.body.agentEmail,
        agentUsername: req.body.agentUsername,
        agentPassword: CryptoJS.AES.encrypt(
          req.body.agentPassword,
          process.env.PASSWORD_SECRET_KEY
        ).toString(),
      },
    })
    .then((updatedAgent) => {
      if (updatedAgent) {
        res.status(200).json({
          message: "Agent updated successfully.",
          agent: updatedAgent,
        });
      } else {
        res.status(404).json({
          message: "Agent not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the agent.",
        error: err,
      });
    });
}

// Delete agent by Id
function deleteAgentById(req, res) {
  prisma.agent
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Agent deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Agent not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the agent.",
        error: err,
      });
    });
}

module.exports = {
  registerAgent,
  loginAsAgent,
  logoutAsAgent,
  getAgentById,
  getAgentByName,
  getAllAgents,
  updateAgentById,
  deleteAgentById,
};
