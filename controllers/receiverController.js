const prisma = require("../config/prismaConfig");
const { validator, schemaForReceiver } = require("../utils/validation");

// Create a Receiver
function createReceiver(req, res) {
  const receiver = {
    nic: req.body.nic,
    receiverName: req.body.receiverName,
    receiverAddress: req.body.receiverAddress,
    dob: req.body.dob,
    isFirstProperty: req.body.isFirstProperty,
    isSriLankanResident: req.body.isSriLankanResident,
    isCompany: req.body.isCompany,
    agentId: req.body.agentId,
  };

  prisma.receiver
      .findUnique({
        where: {
          nic: req.body.nic,
        },
      })
      .then((data) => {
        if (data) {
          res.status(409).json({
            message: "An receiver already exists with the same NIC.",
          });
        } else {
          prisma.receiver
            .create({ data: receiver })
            .then((createdReceiver) => {
              res.status(201).json({
                message: "Receiver created successfully.",
                receiver: createdReceiver,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error creating the receiver.",
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

// Get receiver by Id
function getReceiverById(req, res) {
  prisma.receiver
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Receiver not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the receiver.",
        error: err,
      });
    });
}

// Get receiver by name
function getReceiverByName(req, res) {
  const receiverName = req.query.receiverName;
  prisma.receiver
    .findMany({ where: { receiverName: { contains: receiverName } } })
    .then((receivers) => {
      if (receivers) {
        res.status(200).json(receivers);
      } else {
        res.status(404).json({
          message: "Receiver not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the receiver",
        error: err,
      });
    });
}

// Get all receivers
function getAllReceivers(req, res) {
  prisma.receiver
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all receivers.",
        error: err,
      });
    });
}

// Update receiver by Id
function updateReceiverById(req, res) {
  prisma.receiver
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        nic: req.body.nic,
        receiverName: req.body.receiverName,
        receiverAddress: req.body.receiverAddress,
        dob: req.body.dob,
        isFirstProperty: req.body.isFirstProperty,
        isSriLankanResident: req.body.isSriLankanResident,
        isCompany: req.body.isCompany,
        agentId: req.body.agentId,
      },
    })
    .then((updatedReceiver) => {
      if (updatedReceiver) {
        res.status(200).json({
          message: "Receiver updated successfully.",
          receiver: updatedReceiver,
        });
      } else {
        res.status(404).json({
          message: "Receiver not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the receiver.",
        error: err,
      });
    });
}

// Delete receiver by Id
function deleteReceiverById(req, res) {
  prisma.receiver
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Receiver deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Receiver not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the receiver.",
        error: err,
      });
    });
}

module.exports = {
  createReceiver,
  getReceiverById,
  getReceiverByName,
  getAllReceivers,
  updateReceiverById,
  deleteReceiverById,
};
