module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRunner: "jest-circus/runner",
  globals: {
    "ts-jest": {
      tsConfig: {
        ...require("./tsconfig.json").compilerOptions,
        jsx: "react",
      },
    },
  },
};
