const MAX_AGE = 60 * 60;
const STALE_WHILE_REVALIDATE = 60 * 60 * 24;

module.exports = (phase) => {
  return {
    reactStrictMode: true,
    serverRuntimeConfig: {
      rootPath: __dirname,
    },
    publicRuntimeConfig: {},

    rewrites: async () => [
      {
        source: "/index.json",
        destination: "/api/index.json",
      },
      {
        source: "/posts/feed.xml",
        destination: "/api/posts/feed.xml",
      },
      {
        source: "/posts/:slug.json",
        destination: "/api/posts/[slug].json?slug=:slug",
      },
    ],
    headers: async () => [
      {
        source: "/",
        headers: [
          {
            key: "cache-control",
            value: `max-age=${MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}, public`,
          },
        ],
      },
      {
        source: "/index.json",
        headers: [
          {
            key: "cache-control",
            value: `max-age=${MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}, public`,
          },
        ],
      },
      {
        source: "/posts/:slug",
        headers: [
          {
            key: "cache-control",
            value: `max-age=${MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}, public`,
          },
        ],
      },
      {
        source: "/posts/:slug.json",
        headers: [
          {
            key: "cache-control",
            value: `max-age=${MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}, public`,
          },
        ],
      },
    ],
    images: {
      domains: [
        "images.ctfassets.net",
        "octodex.github.com",
        "media.graphcms.com",
      ],
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
