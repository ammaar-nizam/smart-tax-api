const prisma = require("../config/prismaConfig");

// Create a EDT Return
function createEDTReturn(req, res) {
  const edtReturn = {
    type: req.body.type,
    taxDue: req.body.taxDue,
    submitDate: req.body.submitDate,
    deadlineDate: req.body.deadlineDate,
    status: req.body.status,
    transactionId: req.body.transactionId,
    agentId: req.body.agentId,
  };

  prisma.eDTReturn
    .create({ data: edtReturn })
    .then((createdEDTReturn) => {
      res.status(201).json({
        message: "EDT Return created successfully.",
        edtReturn: createdEDTReturn,
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Error creating the EDT Return.",
        error: err,
      });
    });
}

// Get edtReturn by Id
function getEDTReturnById(req, res) {
  prisma.eDTReturn
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "EDT Return not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the EDT Return.",
        error: err,
      });
    });
}

// Get all EDT Returns
function getAllEDTReturns(req, res) {
  prisma.eDTReturn
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all EDT Returns.",
        error: err,
      });
    });
}

// Update EDT Return by Id
function updateEDTReturnById(req, res) {
  prisma.eDTReturn
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        type: req.body.type,
        taxDue: req.body.taxDue,
        submitDate: req.body.submitDate,
        deadlineDate: req.body.deadlineDate,
        status: req.body.status,
        transactionId: req.body.transactionId,
        agentId: req.body.agentId,
      },
    })
    .then((updatedEDTReturn) => {
      if (updatedEDTReturn) {
        res.status(200).json({
          message: "EDTReturn updated successfully.",
          edtReturn: updatedEDTReturn,
        });
      } else {
        res.status(404).json({
          message: "EDTReturn not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the EDT Return.",
        error: err,
      });
    });
}

// Delete EDT Return by Id
function deleteEDTReturnById(req, res) {
  prisma.eDTReturn
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "EDTReturn deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "EDTReturn not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the EDT Return.",
        error: err,
      });
    });
}

module.exports = {
  createEDTReturn,
  getEDTReturnById,
  getAllEDTReturns,
  updateEDTReturnById,
  deleteEDTReturnById,
};
