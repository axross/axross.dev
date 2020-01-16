const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = {
  entry: "./client/client.tsx",
  output: {
    path: path.resolve(__dirname, './dist/client'),
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
              configFile: path.resolve(__dirname, "./tsconfig.json"),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
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
      favicon: path.resolve(__dirname, './assets/favicon.png'),
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
    contentBase: path.resolve(__dirname, './dist/client'),
    historyApiFallback: true,
  },
};