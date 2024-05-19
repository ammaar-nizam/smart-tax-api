const prisma = require("../config/prismaConfig");

// Create a Beneficiary
function createBeneficiary(req, res) {
  const beneficiary = {
    nic: req.body.nic,
    beneficiaryName: req.body.beneficiaryName,
    beneficiaryAddress: req.body.beneficiaryAddress,
    dob: req.body.dob,
    isFirstProperty: req.body.isFirstProperty,
    isSriLankanResident: req.body.isSriLankanResident,
    isCompany: req.body.isCompany,
    agentId: req.body.agentId,
  };

  prisma.beneficiary
  .findUnique({
    where: {
      nic: req.body.nic,
    },
  })
  .then((data) => {
    if (data) {
      res.status(409).json({
        message: "An beneficiary already exists with the same NIC.",
      });
    } else {
      prisma.beneficiary
        .create({ data: beneficiary })
        .then((createdBeneficiary) => {
          res.status(201).json({
            message: "Beneficiary created successfully.",
            beneficiary: createdBeneficiary,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error creating the beneficiary.",
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

// Get beneficiary by Id
function getBeneficiaryById(req, res) {
  prisma.beneficiary
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Beneficiary not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the beneficiary.",
        error: err,
      });
    });
}

// Get beneficiary by name
function getBeneficiaryByName(req, res) {
  const beneficiaryName = req.query.beneficiaryName;
  prisma.beneficiary
    .findMany({ where: { beneficiaryName: { contains: beneficiaryName } } })
    .then((beneficiarys) => {
      if (beneficiarys) {
        res.status(200).json(beneficiarys);
      } else {
        res.status(404).json({
          message: "Beneficiary not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the beneficiary",
        error: err,
      });
    });
}

// Get all beneficiarys
function getAllBeneficiaries(req, res) {
  prisma.beneficiary
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all beneficiarys.",
        error: err,
      });
    });
}

// Update beneficiary by Id
function updateBeneficiaryById(req, res) {
  prisma.beneficiary
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        nic: req.body.nic,
        beneficiaryName: req.body.beneficiaryName,
        beneficiaryAddress: req.body.beneficiaryAddress,
        dob: req.body.dob,
        isFirstProperty: req.body.isFirstProperty,
        isSriLankanResident: req.body.isSriLankanResident,
        isCompany: req.body.isCompany,
        agentId: req.body.agentId,
      },
    })
    .then((updatedBeneficiary) => {
      if (updatedBeneficiary) {
        res.status(200).json({
          message: "Beneficiary updated successfully.",
          beneficiary: updatedBeneficiary,
        });
      } else {
        res.status(404).json({
          message: "Beneficiary not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the beneficiary.",
        error: err,
      });
    });
}

// Delete beneficiary by Id
function deleteBeneficiaryById(req, res) {
  prisma.beneficiary
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Beneficiary deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Beneficiary not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the beneficiary.",
        error: err,
      });
    });
}

module.exports = {
  createBeneficiary,
  getBeneficiaryById,
  getBeneficiaryByName,
  getAllBeneficiaries,
  updateBeneficiaryById,
  deleteBeneficiaryById,
};
