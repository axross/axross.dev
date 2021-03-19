const baseJestConfig = require("./jest.config");

module.exports = {
  ...baseJestConfig,
  globalSetup: "<rootDir>/e2e-global-setup.js",
  testRegex: "e2e/.+\\.spec.ts$",
  testTimeout: 30000,
};
