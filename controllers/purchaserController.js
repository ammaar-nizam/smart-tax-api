const prisma = require("../config/prismaConfig");
const { validator, schemaForPurchaser } = require("../utils/validation");

// Create a Purchaser
function createPurchaser(req, res) {
  const purchaser = {
    nic: req.body.purchaserNIC,
    purchaserName: req.body.purchaserName,
    purchaserAddress: req.body.purchaserAddress,
    dob: req.body.dob,
    isFirstProperty: req.body.isFirstProperty,
    isSriLankanResident: req.body.isSriLankanResident,
    isCompany: req.body.isCompany,
    agentId: req.body.agentId,
  };

  // Validate user input
  const validationResponse = validator.validate(purchaser, schemaForPurchaser);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "Validation failed.",
      errors: validationResponse,
    });
  } else {
    prisma.purchaser
      .findUnique({
        where: {
          nic: req.body.purchaserNIC,
        },
      })
      .then((data) => {
        if (data) {
          res.status(409).json({
            message: "A purchaser already exists with the same NIC.",
          });
        } else {
          prisma.purchaser
            .create({ data: purchaser })
            .then((createdPurchaser) => {
              res.status(201).json({
                message: "Purchaser created successfully.",
                purchaser: createdPurchaser,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error creating the purchaser.",
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

// Get purchaser by Id
function getPurchaserById(req, res) {
  prisma.purchaser
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Purchaser not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the purchaser.",
        error: err,
      });
    });
}

// GETTING PURCHASER ID BY NIC
function getPurchaserIdByNIC(req, res) {
  const nic = req.query.purchaserNIC;
  prisma.purchaser
    .findUnique({
      select: {
        id: true,
      },
      where: {
        nic: nic,
      },
    })
    .then((purchaserId) => {
      if (purchaserId) {
        res.status(200).json(purchaserId);
      } else {
        res.status(404).json({
          message: "Purchaser not found by NIC",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the purchaser ID",
        error: err,
      });
    });
}

// Get purchaser by name
function getPurchaserByName(req, res) {
  const purchaserName = req.query.purchaserName;
  prisma.purchaser
    .findMany({ where: { purchaserName: { contains: purchaserName } } })
    .then((purchasers) => {
      if (purchasers) {
        res.status(200).json(purchasers);
      } else {
        res.status(404).json({
          message: "Purchaser not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the purchaser",
        error: err,
      });
    });
}

// Get all purchasers
function getAllPurchasers(req, res) {
  prisma.purchaser
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all purchasers.",
        error: err,
      });
    });
}

// Update purchaser by Id
function updatePurchaserById(req, res) {
  prisma.purchaser
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        nic: req.body.nic,
        purchaserName: req.body.purchaserName,
        purchaserAddress: req.body.purchaserAddress,
        dob: req.body.dob,
        isFirstProperty: req.body.isFirstProperty,
        isSriLankanResident: req.body.isSriLankanResident,
        isCompany: req.body.isCompany,
        agentId: req.body.agentId,
      },
    })
    .then((updatedPurchaser) => {
      if (updatedPurchaser) {
        res.status(200).json({
          message: "Purchaser updated successfully.",
          purchaser: updatedPurchaser,
        });
      } else {
        res.status(404).json({
          message: "Purchaser not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the purchaser.",
        error: err,
      });
    });
}

// Delete purchaser by Id
function deletePurchaserById(req, res) {
  prisma.purchaser
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Purchaser deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Purchaser not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the purchaser.",
        error: err,
      });
    });
}

module.exports = {
  createPurchaser,
  getPurchaserIdByNIC,
  getPurchaserById,
  getPurchaserByName,
  getAllPurchasers,
  updatePurchaserById,
  deletePurchaserById,
};
