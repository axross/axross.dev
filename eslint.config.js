const globals = require("globals");

module.exports = [
  {
    ignores: [".vercel/*"],
  },
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
