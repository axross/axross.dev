const { compilerOptions } = require("./tsconfig.json");
const babelConfig = require("./.babelrc.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: {
        ...compilerOptions,
        jsx: "react",
      },
      babelConfig: babelConfig,
    },
  },
};
