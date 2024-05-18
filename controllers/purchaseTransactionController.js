const prisma = require("../config/prismaConfig");

// Create a Purchase Transaction
function createPurchaseTransaction(req, res) {
  const purchaseTransaction = {
    propertyAddress: req.body.propertyAddress,
    type: req.body.type,
    consideration: req.body.consideration,
    effectiveDate: req.body.effectiveDate,
    vendorName: req.body.vendorName,
    vendorNIC: req.body.vendorNIC,
    vendorAgentName: req.body.vendorAgentName,
    vendorAgentAddress: req.body.vendorAgentAddress,
    purchaserId: req.body.purchaserId,
  };

  prisma.purchaseTransaction
    .findFirst({
      where: {
        AND: [
          { propertyAddress: req.body.propertyAddress },
          { effectiveDate: req.body.effectiveDate },
        ],
      },
    })
    .then((data) => {
      if (data) {
        res.status(409).json({
          message: "A transaction already exists.",
        });
      } else {
        prisma.purchaseTransaction
          .create({ data: purchaseTransaction })
          .then((createdPurchaseTransaction) => {
            res.status(201).json({
              message: "Transaction created successfully.",
              purchaseTransaction: createdPurchaseTransaction,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Error creating the transaction.",
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Unexpected error occured.",
        error: err,
      });
    });
}

// Get purchaseTransaction by Id
function getPurchaseTransactionById(req, res) {
  prisma.purchaseTransaction
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Purchase transaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the purchase transaction.",
        error: err,
      });
    });
}

// Get all purchase transactions
function getAllPurchaseTransactions(req, res) {
  prisma.purchaseTransaction
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all transactions.",
        error: err,
      });
    });
}

// Update purchaseTransaction by Id
function updatePurchaseTransactionById(req, res) {
  prisma.purchaseTransaction
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        propertyAddress: req.body.propertyAddress,
        type: req.body.type,
        consideration: req.body.consideration,
        effectiveDate: req.body.effectiveDate,
        vendorName: req.body.vendorName,
        vendorNIC: req.body.vendorNIC,
        vendorAgentName: req.body.vendorAgentName,
        vendorAgentAddress: req.body.vendorAgentAddress,
        purchaserId: req.body.purchaserId,
      },
    })
    .then((updatedPurchaseTransaction) => {
      if (updatedPurchaseTransaction) {
        res.status(200).json({
          message: "Purchase transaction updated successfully.",
          purchaseTransaction: updatedPurchaseTransaction,
        });
      } else {
        res.status(404).json({
          message: "Purchase transaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the purchase transaction.",
        error: err,
      });
    });
}

// Delete purchaseTransaction by Id
function deletePurchaseTransactionById(req, res) {
  prisma.purchaseTransaction
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Purchase transaction deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Purchase transaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the purchase transaction.",
        error: err,
      });
    });
}

// Get purchase transaction by property address and vendor NIC
function getPurchaseTransactionId(req, res) {
  const propertyAddress = req.query.propertyAddress;
  const vendorNIC = req.query.vendorNIC;

  prisma.purchaseTransaction
    .findFirst({
      where: {
        AND: [{ propertyAddress: propertyAddress }, { vendorNIC: vendorNIC }],
      },
    })
    .then((purchaseTransaction) => {
      if (purchaseTransaction) {
        res.status(200).json({
          purchaseTransactionId: purchaseTransaction.id,
        });
      } else {
        res.status(404).json({
          message: "Purchase transaction not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the purchase transaction",
        error: err,
      });
    });
}

module.exports = {
  createPurchaseTransaction,
  getPurchaseTransactionById,
  getAllPurchaseTransactions,
  updatePurchaseTransactionById,
  deletePurchaseTransactionById,
  getPurchaseTransactionId,
};
