const { setup: setupDevServer } = require('jest-dev-server');

module.exports = async () => {
  await setupDevServer({
    command: `npm run serve-storybook -- --ci --quiet --port 6006`,
    launchTimeout: 60000,
    port: 6006,
  });
}
