const assert = require("assert");
const {
  registerAgent,
  loginAsAgent,
} = require("../controllers/agentController");

describe("Agent Controller Tests", function () {

  // TEST CASES FOR AGENT REGISTER FUNCTION
  describe("registerAgent", function () {
    it("should return a 400 status code if validation fails", function () {
      const req = {
        // Invalid Data
        body: {
          agentName: "Muve Colombo",
          businessRegistrationNumber: 778069,
          agentAddress: "No. 341, Kotte Road, Nugegoda",
          agentTelephone: "0113629706",
          agentEmail: "ammaar.nizam@outlook.com",
          agentUsername: "muvec900",
          agentPassword: "muvec900",
        },
      };

      const res = {
        status: function (statusCode) {
          assert.strictEqual(statusCode, 400, "Status code should be 400");
          return this;
        },
        json: function (data) {},
      };

      registerAgent(req, res);
    });

    it("should return a 409 status code if agent already exists", function () {
      const req = {
        // Valid Data
        body: {
          agentName: "Muve Colombo",
          businessRegistrationNumber: "778069",
          agentAddress: "No. 341, Kotte Road, Nugegoda",
          agentTelephone: "0113629706",
          agentEmail: "ammaar.nizam@outlook.com",
          agentUsername: "muvec900",
          agentPassword: "muvec900",
        },
      };

      const res = {
        status: function (statusCode) {
          assert.strictEqual(statusCode, 409, "Status code should be 409");
          return this;
        },
        json: function (data) {},
      };

      registerAgent(req, res);
    });

    it("should return a 201 status code if agent is created successfully", function () {
      const req = {
        // Valid Data
        body: {
          agentName: "Muve Colombo",
          businessRegistrationNumber: "778069",
          agentAddress: "No. 341, Kotte Road, Nugegoda",
          agentTelephone: "0113629706",
          agentEmail: "ammaar.nizam@outlook.com",
          agentUsername: "muvec900",
          agentPassword: "muvec900",
        },
      };

      const res = {
        status: function (statusCode) {
          assert.strictEqual(statusCode, 201, "Status code should be 201");
          return this;
        },
        json: function (data) {},
      };

      registerAgent(req, res);
    });
  });

  // TEST CASES FOR AGENT LOGIN FUNCTION
  describe("loginAsAgent", function () {
    it("should return a 401 status code if username is incorrect", function () {
      const req = {
        body: {
          agentUsername: "invalidUsername",
          agentPassword: "validPassword",
        },
      };

      const res = {
        status: function (statusCode) {
          assert.strictEqual(statusCode, 401, "Status code should be 401");
          return this;
        },
        json: function (data) {
          assert.strictEqual(
            data.message,
            "Incorrect username.",
            'Message should be "Incorrect username."'
          );
        },
      };

      loginAsAgent(req, res);
    });

    it("should return a 401 status code if password is incorrect", function () {
      const req = {
        body: {
          agentUsername: "validUsername",
          agentPassword: "invalidPassword",
        },
      };

      const res = {
        status: function (statusCode) {
          assert.strictEqual(statusCode, 401, "Status code should be 401");
          return this;
        },
        json: function (data) {
          assert.strictEqual(
            data.message,
            "Incorrect password.",
            'Message should be "Incorrect password."'
          );
        },
      };

      loginAsAgent(req, res);
    });

    it("should return a 200 status code if authentication is successful", function () {
      const req = {
        body: {
          agentUsername: "validUsername",
          agentPassword: "validPassword",
        },
      };

      const res = {
        status: function (statusCode) {
          assert.strictEqual(statusCode, 200, "Status code should be 200");
          return this;
        },
        json: function (data) {
          assert.strictEqual(
            data.message,
            "Authentication successful and logged in as an agent.",
            'Message should be "Authentication successful and logged in as an agent."'
          );
          assert(data.accessToken, "Access token should be present");
        },
      };

      loginAsAgent(req, res);
    });
  });
});
