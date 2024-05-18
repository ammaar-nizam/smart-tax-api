const Validator = require("fastest-validator");

// Define a schema to validate the user input (Agent)
const schemaForAgent = {
  agentName: {
    type: "string",
    optional: false,
    max: "100",
    message: {
      optional: "Name cannot be empty",
      max: "Name cannot exceed 100 characters.",
    },
  },
  businessRegistrationNumber: {
    type: "string",
    optional: false,
    message: {
      optional: "NIC cannot be empty",
      pattern: "NIC must be either 9 digits followed by a V or 12 digits.",
    },
  },
  agentAddress: {
    type: "string",
    optional: false,
    message: {
      optional: "Address cannot be empty",
    },
  },
  agentTelephone: {
    type: "string",
    optional: false,
    pattern: /^\d{9,10}$/,
    message: {
      optional: "Mobile cannot be empty",
      pattern: "Mobile must have 9 or 10 digits.",
    },
  },
  agentEmail: {
    type: "string",
    optional: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: {
      optional: "Email cannot be empty",
      pattern: "Email format is not valid.",
    },
  },
  agentUsername: {
    type: "string",
    optional: false,
    max: "20",
    message: {
      optional: "Username cannot be empty",
      max: "Username cannot exceed 20 characters.",
    },
  },
  agentPassword: {
    type: "string",
    optional: false,
    message: {
      optional: "Password cannot be empty",
    },
  },
};

// Define a schema to validate the user input (Beneficiary)
const schemaForBeneficiary = {
  nic: {
    type: "string",
    optional: false,
    pattern: /^(?:\d{12}|\d{9}[Vv])$/,
    message: {
      optional: "NIC cannot be empty",
      pattern: "NIC must be either 9 digits followed by a V or 12 digits.",
    },
  },
  beneficiaryName: {
    type: "string",
    optional: false,
    max: "100",
    pattern: /^[A-Za-z\s]+$/,
    message: {
      optional: "Name cannot be empty",
      max: "Name cannot exceed 100 characters.",
      pattern: "Name must not have digits or special characters.",
    },
  },
  beneficiaryAddress: {
    type: "string",
    optional: false,
    message: {
      optional: "Address cannot be empty",
    },
  },
  dob: {
    type: "date",
    optional: false,
    message: {
      optional: "Date of birth cannot be empty",
    },
  },
  isFirstProperty: {
    type: "boolean",
    optional: false,
    message: {
      optional: "isFirstProperty cannot be empty",
    },
  },
  isSriLankanResident: {
    type: "boolean",
    optional: false,
    message: {
      optional: "isSriLankanResident cannot be empty",
    },
  },
  isCompany: {
    type: "boolean",
    optional: false,
    message: {
      optional: "isCompany cannot be empty",
    },
  },
  agentId: {
    type: "int",
    optional: false,
    message: {
      optional: "Agent ID cannot be empty",
    },
  },
};

// Define a schema to validate the user input (Purchaser)
const schemaForPurchaser = {
    nic: {
      type: "string",
      optional: false,
      pattern: /^(?:\d{12}|\d{9}[Vv])$/,
      message: {
        optional: "NIC cannot be empty",
        pattern: "NIC must be either 9 digits followed by a V or 12 digits.",
      },
    },
    purchaserName: {
      type: "string",
      optional: false,
      max: "100",
      pattern: /^[A-Za-z\s]+$/,
      message: {
        optional: "Name cannot be empty",
        max: "Name cannot exceed 100 characters.",
        pattern: "Name must not have digits or special characters.",
      },
    },
    purchaserAddress: {
      type: "string",
      optional: false,
      message: {
        optional: "Address cannot be empty",
      },
    },
    dob: {
      type: "string", // Change type to string
      optional: false,
      pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
      message: {
          optional: "Date of birth cannot be empty",
          pattern: "Date of birth must be in the format YYYY-MM-DDTHH:MM:SS.sssZ",
      },
  },
    isFirstProperty: {
      type: "boolean",
      optional: false,
      message: {
        optional: "isFirstProperty cannot be empty",
      },
    },
    isSriLankanResident: {
      type: "boolean",
      optional: false,
      message: {
        optional: "isSriLankanResident cannot be empty",
      },
    },
    isCompany: {
      type: "boolean",
      optional: false,
      message: {
        optional: "isCompany cannot be empty",
      },
    },
    agentId: {
      type: "number",
      integer: true,
      optional: false,
      message: {
        optional: "Agent ID cannot be empty",
        integer: "Agent ID must be an integer",
      },
    },
  };

// Define a schema to validate the user input (Receiver)
const schemaForReceiver = {
    nic: {
      type: "string",
      optional: false,
      pattern: /^(?:\d{12}|\d{9}[Vv])$/,
      message: {
        optional: "NIC cannot be empty",
        pattern: "NIC must be either 9 digits followed by a V or 12 digits.",
      },
    },
    receiverName: {
      type: "string",
      optional: false,
      max: "100",
      pattern: /^[A-Za-z\s]+$/,
      message: {
        optional: "Name cannot be empty",
        max: "Name cannot exceed 100 characters.",
        pattern: "Name must not have digits or special characters.",
      },
    },
    receiverAddress: {
      type: "string",
      optional: false,
      message: {
        optional: "Address cannot be empty",
      },
    },
    dob: {
      type: "date",
      optional: false,
      message: {
        optional: "Date of birth cannot be empty",
      },
    },
    isFirstProperty: {
      type: "boolean",
      optional: false,
      message: {
        optional: "isFirstProperty cannot be empty",
      },
    },
    isSriLankanResident: {
      type: "boolean",
      optional: false,
      message: {
        optional: "isSriLankanResident cannot be empty",
      },
    },
    isCompany: {
      type: "boolean",
      optional: false,
      message: {
        optional: "isCompany cannot be empty",
      },
    },
    agentId: {
      type: "int",
      optional: false,
      message: {
        optional: "Agent ID cannot be empty",
      },
    },
  };

const validator = new Validator();

module.exports = {
  validator,
  schemaForAgent,
  schemaForBeneficiary,
  schemaForPurchaser,
  schemaForReceiver
};
