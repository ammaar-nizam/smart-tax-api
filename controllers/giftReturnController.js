const prisma = require("../config/prismaConfig");

// Create a GiftReturn
function createGiftReturn(req, res) {
  const giftReturn = {
    type: req.body.type,
    taxDue: req.body.taxDue,
    submitDate: req.body.submitDate,
    deadlineDate: req.body.deadlineDate,
    status: req.body.status,
    transactionId: req.body.transactionId,
    agentId: req.body.agentId,
  };

  prisma.giftReturn
      .findUnique({
        where: {
          nic: req.body.nic,
        },
      })
      .then((data) => {
        if (data) {
          res.status(409).json({
            message: "An giftReturn already exists with the same NIC.",
          });
        } else {
          prisma.giftReturn
            .create({ data: giftReturn })
            .then((createdGiftReturn) => {
              res.status(201).json({
                message: "GiftReturn created successfully.",
                giftReturn: createdGiftReturn,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error creating the giftReturn.",
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

// Get giftReturn by Id
function getGiftReturnById(req, res) {
  prisma.giftReturn
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Gift Return not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the Gift Return.",
        error: err,
      });
    });
}

// Get all giftReturns
function getAllGiftReturns(req, res) {
  prisma.giftReturn
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all Gift Returns.",
        error: err,
      });
    });
}

// Update giftReturn by Id
function updateGiftReturnById(req, res) {
  prisma.giftReturn
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
    .then((updatedGiftReturn) => {
      if (updatedGiftReturn) {
        res.status(200).json({
          message: "Gift return updated successfully.",
          giftReturn: updatedGiftReturn,
        });
      } else {
        res.status(404).json({
          message: "Gift return not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the gift return.",
        error: err,
      });
    });
}

// Delete giftReturn by Id
function deleteGiftReturnById(req, res) {
  prisma.giftReturn
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Gift return deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Gift return not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the giftReturn.",
        error: err,
      });
    });
}

module.exports = {
  createGiftReturn,
  getGiftReturnById,
  getAllGiftReturns,
  updateGiftReturnById,
  deleteGiftReturnById,
};
