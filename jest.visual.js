module.exports = {
  preset: "ts-jest",
  testMatch: ["**/storyshots/*.test.ts"],
  globalSetup: "<rootDir>/.jest/visualGlobalSetup.js",
  globalTeardown: "<rootDir>/.jest/visualGlobalTeardown.js",
  setupFilesAfterEnv: ["<rootDir>/.jest/visualSetupAfterEnv.js"],
  globals: {
    "ts-jest": {
      tsConfig: {
        ...require("./tsconfig.json").compilerOptions,
        jsx: "react",
      },
    },
  },
};


