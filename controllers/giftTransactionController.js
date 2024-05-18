const prisma = require("../config/prismaConfig");

// Create a GiftTransaction
function createGiftTransaction(req, res) {
  const giftTransaction = {
    propertyAddress: req.body.propertyAddress,
    type: req.body.type,
    consideration: req.body.consideration,
    effectiveDate: req.body.effectiveDate,
    giverName: req.body.giverName,
    giverNIC: req.body.giverNIC,
    receiverId: req.body.receiverId,
  };

  // Validate user input
  const validationResponse = validator.validate(giftTransaction, schemaForGiftTransaction);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "Validation failed.",
      errors: validationResponse,
    });
  } else {
    prisma.giftTransaction
      .findUnique({
        where: {
          nic: req.body.nic,
        },
      })
      .then((data) => {
        if (data) {
          res.status(409).json({
            message: "A gift transaction already exists.",
          });
        } else {
          prisma.giftTransaction
            .create({ data: giftTransaction })
            .then((createdGiftTransaction) => {
              res.status(201).json({
                message: "Gift transaction created successfully.",
                giftTransaction: createdGiftTransaction,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error creating the gift transaction.",
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

// Get giftTransaction by Id
function getGiftTransactionById(req, res) {
  prisma.giftTransaction
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "GiftTransaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the giftTransaction.",
        error: err,
      });
    });
}

// Get all giftTransactions
function getAllGiftTransactions(req, res) {
  prisma.giftTransaction
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Error retrieving all giftTransactions.",
        error: err,
      });
    });
}

// Update giftTransaction by Id
function updateGiftTransactionById(req, res) {
  prisma.giftTransaction
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        propertyAddress: req.body.propertyAddress,
    type: req.body.type,
    consideration: req.body.consideration,
    effectiveDate: req.body.effectiveDate,
    giverName: req.body.giverName,
    giverNIC: req.body.giverNIC,
    receiverId: req.body.receiverId,
      },
    })
    .then((updatedGiftTransaction) => {
      if (updatedGiftTransaction) {
        res.status(200).json({
          message: "Gift transaction updated successfully.",
          giftTransaction: updatedGiftTransaction,
        });
      } else {
        res.status(404).json({
          message: "Gift transaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the gift transaction.",
        error: err,
      });
    });
}

// Delete giftTransaction by Id
function deleteGiftTransactionById(req, res) {
  prisma.giftTransaction
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Gift transaction deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Gift transaction not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the gift transaction.",
        error: err,
      });
    });
}

// Get gift transaction by property address and giver NIC
function getGiftTransactionId(req, res) {
  const propertyAddress = req.query.propertyAddress;
  const giverNIC = req.query.giverNIC;

  prisma.giftTransaction
    .findFirst({
      where: {
        AND: [{ propertyAddress: propertyAddress }, { giverNIC: giverNIC }],
      },
    })
    .then((giftTransaction) => {
      if (giftTransaction) {
        res.status(200).json({
          giftTransactionId: giftTransaction.id,
        });
      } else {
        res.status(404).json({
          message: "Gift transaction not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the gift transaction",
        error: err,
      });
    });
}

module.exports = {
  createGiftTransaction,
  getGiftTransactionById,
  getAllGiftTransactions,
  updateGiftTransactionById,
  deleteGiftTransactionById,
  getGiftTransactionId
};
