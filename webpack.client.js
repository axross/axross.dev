const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");
const CdnPlugin = require("webpack-cdn-plugin");

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
              configFile: path.resolve(__dirname, "./client/tsconfig.json"),
              transpileOnly: true,
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
      favicon: path.resolve(__dirname, './dist/client/favicon.png'),
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
            navigator.serviceWorker.register("/sw.js")
              .then(reg => console.log("Service Worker is registered!", reg))
              .catch(err => console.error(err));
          }
        </script>
      `,
    }),
    new CdnPlugin({
      modules: [
        {
          name: "contentful",
          var: "contentful",
          path: "dist/contentful.browser.min.js",
        },
        {
          name: "intl-messageformat",
          var: "IntlMessageFormat",
          path: "dist/umd/intl-messageformat.min.js",
        },
        {
          name: "react",
          var: "React",
          path: "umd/react.production.min.js",
        },
        {
          name: "react-dom",
          var: "ReactDOM",
          path: "umd/react-dom.production.min.js",
        },
        {
          name: "react-markdown",
          var: "ReactMarkdown",
          path: "umd/react-markdown.js",
        },
        {
          name: "react-router-dom",
          var: "ReactRouterDOM",
          path: "umd/react-router-dom.min.js",
        },
      ]
    }),
    new EnvironmentPlugin(['URL', 'CONTENTFUL_SPACE', 'CONTENTFUL_ACCESS_TOKEN']),
  ],
  devtool: process.env.NODE_ENV === "development" ? "eval" : "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, './dist/client'),
    historyApiFallback: true,
  },
};