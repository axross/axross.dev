const path = require("path");

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
              configFile: path.resolve(__dirname, "./tsconfig.json"),

              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};