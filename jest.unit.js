module.exports = {
  preset: "ts-jest",
  testMatch: ["**/src/*/**/*.test.ts?(x)"],
  globals: {
    "ts-jest": {
      tsConfig: {
        ...require("./tsconfig.json").compilerOptions,
        jsx: "react",
      },
    },
  },
};
 