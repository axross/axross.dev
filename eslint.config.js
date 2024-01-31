const globals = require("globals");

module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
        Navigation: true,
      },
    },
  },
  ...require("@axross/eslint-config"),
];
