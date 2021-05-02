const baseJestConfig = require("./jest.config");

module.exports = {
  ...baseJestConfig,
  testMatch: ["<rootDir>/e2e/?(*.)+(spec).ts?(x)"],
  testTimeout: 30000,
  globalSetup: "<rootDir>/test-setup/e2e-global-setup.js",
  setupFilesAfterEnv: ["<rootDir>/test-setup/e2e-setup-after-env.js"],
};
