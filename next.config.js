const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  return {
    reactStrictMode: true,
    serverRuntimeConfig: {},
    publicRuntimeConfig: {
      locales: ["en-us", "ja-jp"],
      defaultLocale: "en-us",
    },
    rewrites: async () => [
      {
        source: "/:locale/posts/feed.xml",
        destination: "/api/:locale/posts/feed.xml",
      },
    ],
    images: {
      domains: ["user-images.githubusercontent.com"],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      traverse(config.module.rules);

      config.module.rules.push({
        test: /(?!_app)\.tsx?$/,
        exclude: /node_modules/,
        use: [
          defaultLoaders.babel,
          {
            loader: "@linaria/webpack4-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
              extension: ".linaria.module.css",
            },
          },
        ],
      });

      config.module.rules.push({
        test: /_app\.tsx?$/,
        exclude: /node_modules/,
        use: [
          defaultLoaders.babel,
          {
            loader: "@linaria/webpack4-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
              extension: ".css",
            },
          },
        ],
      });

      return config;
    },
  };
};

function traverse(rules) {
  for (let rule of rules) {
    if (typeof rule.loader === "string" && rule.loader.includes("css-loader")) {
      if (
        rule.options &&
        rule.options.modules &&
        typeof rule.options.modules.getLocalIdent === "function"
      ) {
        const nextGetLocalIdent = rule.options.modules.getLocalIdent;

        rule.options.modules.getLocalIdent = (
          context,
          _,
          exportName,
          options
        ) => {
          if (context.resourcePath.includes(".linaria.module.css")) {
            return exportName;
          }

          return nextGetLocalIdent(context, _, exportName, options);
        };
      }
    }

    if (typeof rule.use === "object") {
      traverse(Array.isArray(rule.use) ? rule.use : [rule.use]);
    }

    if (Array.isArray(rule.oneOf)) {
      traverse(rule.oneOf);
    }
  }
}
