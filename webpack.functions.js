const fs = require("fs");
const path = require("path");

module.exports = {
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
  node: {
    process: false,
  },
};
