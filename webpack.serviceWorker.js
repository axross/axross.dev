const path = require("path");
const { EnvironmentPlugin } = require("webpack");

module.exports = {
  entry: "./serviceWorker/serviceWorker.ts",
  output: {
    path: path.resolve(__dirname, './dist/client'),
    filename: "sw.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "./serviceWorker/tsconfig.json"),

              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin(['URL', 'CONTENTFUL_SPACE', 'CONTENTFUL_ACCESS_TOKEN']),
  ],
};