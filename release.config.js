module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    [
      "@semantic-release/exec",
      {
        publishCmd:
          "npx --package vercel vercel deploy --token=${process.env.VERCEL_TOKEN} --meta VERSION=${nextRelease.version} --env NEXT_PUBLIC_VERSION=${nextRelease.version} --build-env NEXT_PUBLIC_VERSION=${nextRelease.version} --prod --confirm --no-clipboard",
      },
    ],
  ],
};
