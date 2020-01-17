const fs = require("fs");
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = [
  {
    entry: "./client/client.tsx",
    output: {
      path: path.resolve(__dirname, 'dist/client'),
      filename: "[name].js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: path.resolve(__dirname, "client/tsconfig.json"),
                compilerOptions: { sourceMap: true },
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|png)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "assets",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: require('html-webpack-template'),
        title: "Loading...",
        mobile: true,
        appMountId: "app",
        googleAnalytics: {
          trackingId: "UA-79252294-3",
          pageViewOnLoad: false,
        },
        headHtmlSnippet: `
          <style>
            html {
              background-color: #ffffff;
            }

            @media (prefers-color-scheme: dark) {
              html {
                background-color: #11181f;
              }
            }
          </style>

          <script defer>
            if (typeof navigator.serviceWorker !== "undefined") {
              navigator.serviceWorker.register("/sw.js");
            }
          </script>
        `,
      }),
      new EnvironmentPlugin(['CONTENTFUL_SPACE', 'CONTENTFUL_ACCESS_TOKEN']),
    ],
    devtool: process.env.NODE_ENV === "development" ? "eval" : "source-map",
    optimization: {
      minimize: process.env.NODE_ENV !== "development",
      splitChunks: {
        chunks: 'async',
      }
    },
    devServer: {
      writeToDisk: (filePath) => {
        if (/dist\/functions\/[a-zA-Z0-9\-_]+\.js$/.test(filePath)) return true;
        if (filePath.endsWith("dist/client/sw.js")) return true;

        return false;
      },
    },
  },
  {
    entry: "./serviceWorker/serviceWorker.ts",
    output: {
      path: path.resolve(__dirname, 'dist/client'),
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
                configFile: path.resolve(__dirname, "serviceWorker/tsconfig.json"),
  
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
  },
  {
    target: "node",
    entry: fs.readdirSync(path.resolve(__dirname, "functions"))
      .filter(file => path.extname(file) === ".ts")
      .reduce((obj, file) => ({ ...obj, [path.basename(file, path.extname(file))]: `./functions/${file}` }), {}),
    output: {
      path: path.resolve(__dirname, "dist/functions"),
      filename: "[name].js",
      library: "handler",
      libraryExport: "handler",
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
                configFile: path.resolve(__dirname, "tsconfig.json"),
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
  }
];
