const prisma = require("../config/prismaConfig");

// Create a InheritanceReturn
function createInheritanceReturn(req, res) {
  const inheritanceReturn = {
    type: req.body.type,
    taxDue: req.body.taxDue,
    submitDate: req.body.submitDate,
    deadlineDate: req.body.deadlineDate,
    status: req.body.status,
    transactionId: req.body.transactionId,
    agentId: req.body.agentId,
  };

  prisma.inheritanceReturn
    .create({ data: inheritanceReturn })
    .then((createdInheritanceReturn) => {
      res.status(201).json({
        message: "Inheritance return created successfully.",
        inheritanceReturn: createdInheritanceReturn,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating the inheritance return.",
        error: err,
      });
    });
}

// Get inheritanceReturn by Id
function getInheritanceReturnById(req, res) {
  prisma.inheritanceReturn
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Inheritance return not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the inheritance return.",
        error: err,
      });
    });
}

function getInheritanceTaxReturnsFiled(req, res) {
  prisma.inheritanceReturn
    .findMany({ where: { status: "FILED" } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "No InheritanceTax Returns found with status 'Filed'.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving InheritanceTax Returns with status 'Filed'.",
        error: err,
      });
    });
}

function getInheritanceTaxReturnsPaid(req, res) {
  prisma.inheritanceReturn
    .findMany({ where: { status: "PAID" } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "No InheritanceTax Returns found with status 'Paid'.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving InheritanceTax Returns with status 'Paid'.",
        error: err,
      });
    });
}

// Get all inheritanceReturns
function getAllInheritanceReturns(req, res) {
  prisma.inheritanceReturn
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all inheritanceReturns.",
        error: err,
      });
    });
}

// Update inheritanceReturn by Id
function updateInheritanceReturnById(req, res) {
  prisma.inheritanceReturn
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
    .then((updatedInheritanceReturn) => {
      if (updatedInheritanceReturn) {
        res.status(200).json({
          message: "Inheritance return updated successfully.",
          inheritanceReturn: updatedInheritanceReturn,
        });
      } else {
        res.status(404).json({
          message: "Inheritance return not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the inheritance return.",
        error: err,
      });
    });
}

// Delete inheritanceReturn by Id
function deleteInheritanceReturnById(req, res) {
  prisma.inheritanceReturn
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Inheritance return deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Inheritance return not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the inheritance return.",
        error: err,
      });
    });
}

module.exports = {
  createInheritanceReturn,
  getInheritanceReturnById,
  getInheritanceTaxReturnsFiled,
  getInheritanceTaxReturnsPaid,
  getAllInheritanceReturns,
  updateInheritanceReturnById,
  deleteInheritanceReturnById,
};
