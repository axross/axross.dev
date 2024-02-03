const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withSentryConfig(
  nextConfig,
  {
    // for all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    // for all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);
