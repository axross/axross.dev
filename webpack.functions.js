const fs = require("fs");
const path = require("path");

module.exports = {
  target: "node",
  entry: fs.readdirSync(path.resolve(__dirname, "./functions")).reduce((obj, file) => ({ ...obj, [path.basename(file, path.extname(file))]: `./functions/${file}` }), {}),
  output: {
    path: path.resolve(__dirname, "./dist/functions"),
    filename: "[name].js",
    library: "handler",
    libraryExport: "default",
    libraryTarget: "commonjs",
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
              configFile: path.resolve(__dirname, "./functions/tsconfig.json"),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
