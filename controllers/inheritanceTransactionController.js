const prisma = require("../config/prismaConfig");

// Create a InheritanceTransaction
function createInheritanceTransaction(req, res) {
  const inheritanceTransaction = {
    propertyAddress: req.body.propertyAddress,
    type: req.body.type,
    consideration: req.body.consideration,
    effectiveDate: req.body.effectiveDate,
    decendentName: req.body.decendentName,
    decendentNIC: req.body.decendentNIC,
    beneficiaryId: req.body.beneficiaryId,
  };

  prisma.inheritanceTransaction
      .findUnique({
        where: {
          nic: req.body.nic,
        },
      })
      .then((data) => {
        if (data) {
          res.status(409).json({
            message:
              "An inheritanceTransaction already exists.",
          });
        } else {
          prisma.inheritanceTransaction
            .create({ data: inheritanceTransaction })
            .then((createdInheritanceTransaction) => {
              res.status(201).json({
                message: "InheritanceTransaction created successfully.",
                inheritanceTransaction: createdInheritanceTransaction,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error creating the inheritanceTransaction.",
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

// Get inheritanceTransaction by Id
function getInheritanceTransactionById(req, res) {
  prisma.inheritanceTransaction
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "InheritanceTransaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the inheritanceTransaction.",
        error: err,
      });
    });
}

// Get all inheritanceTransactions
function getAllInheritanceTransactions(req, res) {
  prisma.inheritanceTransaction
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all inheritanceTransactions.",
        error: err,
      });
    });
}

// Update inheritanceTransaction by Id
function updateInheritanceTransactionById(req, res) {
  prisma.inheritanceTransaction
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        propertyAddress: req.body.propertyAddress,
        type: req.body.type,
        consideration: req.body.consideration,
        effectiveDate: req.body.effectiveDate,
        decendentName: req.body.decendentName,
        decendentNIC: req.body.decendentNIC,
        beneficiaryId: req.body.beneficiaryId,
      },
    })
    .then((updatedInheritanceTransaction) => {
      if (updatedInheritanceTransaction) {
        res.status(200).json({
          message: "InheritanceTransaction updated successfully.",
          inheritanceTransaction: updatedInheritanceTransaction,
        });
      } else {
        res.status(404).json({
          message: "InheritanceTransaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the inheritanceTransaction.",
        error: err,
      });
    });
}

// Delete inheritanceTransaction by Id
function deleteInheritanceTransactionById(req, res) {
  prisma.inheritanceTransaction
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "InheritanceTransaction deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "InheritanceTransaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the inheritanceTransaction.",
        error: err,
      });
    });
}
// Get inheritance transaction by property address and decedent NIC
function getInheritanceTransactionId(req, res) {
  const propertyAddress = req.query.propertyAddress;
  const decedentNIC = req.query.decedentNIC;

  prisma.inheritanceTransaction
    .findFirst({
      where: {
        AND: [{ propertyAddress: propertyAddress }, { decedentNIC: decedentNIC }],
      },
    })
    .then((inheritanceTransaction) => {
      if (inheritanceTransaction) {
        res.status(200).json({
          inheritanceTransactionId: inheritanceTransaction.id,
        });
      } else {
        res.status(404).json({
          message: "Inheritance transaction not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the inheritance transaction",
        error: err,
      });
    });
}

module.exports = {
  createInheritanceTransaction,
  getInheritanceTransactionById,
  getAllInheritanceTransactions,
  updateInheritanceTransactionById,
  deleteInheritanceTransactionById,
  getInheritanceTransactionId
};
