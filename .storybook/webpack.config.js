const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.extensions = [...new Set([...config.resolve.extensions, ".ts", ".tsx"])];

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, "tsconfig.json"),
          },
      },
    ],
  });

  return config;
};
