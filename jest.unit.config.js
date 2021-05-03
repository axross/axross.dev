const baseJestConfig = require("./jest.config");

module.exports = {
  ...baseJestConfig,
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/!(e2e)/**/?(*.)+(spec).ts?(x)"],
  collectCoverageFrom: [
    "<rootDir>/!(.storybook|e2e|pages)**/*.ts?(x)",
    "!**/*.stories.ts?(x)",
    "!**/node_modules/**",
  ],
  globalSetup: "<rootDir>/test-setup/unit-global-setup.js",
  setupFilesAfterEnv: ["<rootDir>/test-setup/unit-setup-after-env.js"],
};
