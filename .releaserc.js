module.exports = {
  branches: [
    { name: "stable" },
    { name: "next", channel: "next", prerelease: true },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    [
      "@semantic-release/exec",
      {
        successCmd:
          "echo ::set-output name=RELEASE_VERSION::${nextRelease.version}",
      },
    ],
  ],
};
