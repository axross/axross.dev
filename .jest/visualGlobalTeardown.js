const { teardown: teardownDevServer } = require('jest-dev-server');

module.exports = async () => {
  await teardownDevServer()
};
