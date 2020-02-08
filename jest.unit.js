module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: {
        ...require("./tsconfig.json").compilerOptions,
        jsx: "react",
      },
    },
  },
};
 