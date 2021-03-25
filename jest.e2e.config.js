const baseJestConfig = require("./jest.config");

module.exports = {
  ...baseJestConfig,
  globalSetup: "<rootDir>/e2e-global-setup.js",
  testMatch: ["<rootDir>/e2e/?(*.)+(spec).ts?(x)"],
  testTimeout: 30000,
};
