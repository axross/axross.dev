const { loadEnvConfig } = require("@next/env");

module.exports = async () => {
  const projectDir = process.cwd();

  loadEnvConfig(projectDir);
};
