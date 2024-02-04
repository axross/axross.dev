interface Config {
  urlOrigin: string;
  notion: {
    integrationSecret: string;
    bioDatabaseId: string;
    postDatabaseId: string;
  };
  googleAnalytics: {
    measurementId: string;
  };
  image: {
    secret: string;
  };
}

function resolveEnvironmentVariable(key: string): string {
  // eslint-disable-next-line no-undef
  const value = process.env[key];

  if (value === undefined || value.trim().length === 0) {
    throw new Error(`An environment variable ${key} is not set.`);
  }

  return value;
}

export function getConfig(): Config {
  let urlOrigin = `http://localhost:${process.env.PORT ?? "3000"}`;

  if (process.env.VERCEL_URL !== undefined) {
    urlOrigin = `https://${process.env.VERCEL_URL}`;
  }

  return {
    urlOrigin,
    notion: {
      integrationSecret: resolveEnvironmentVariable(
        "NOTION_INTEGRATION_SECRET"
      ),
      bioDatabaseId: resolveEnvironmentVariable("NOTION_BIO_DATABASE_ID"),
      postDatabaseId: resolveEnvironmentVariable("NOTION_POST_DATABASE_ID"),
    },
    googleAnalytics: {
      measurementId: resolveEnvironmentVariable(
        "GOOGLE_ANALYTICS_MEASUREMENT_ID"
      ),
    },
    image: {
      secret: resolveEnvironmentVariable("IMAGE_SECRET"),
    },
  };
}
