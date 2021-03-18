const baseJestConfig = require("./jest.config");

module.exports = {
  ...baseJestConfig,
  testRegex: "e2e/.+\\.spec.ts$",
  testTimeout: 30000,
};
