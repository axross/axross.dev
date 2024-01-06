interface Config {
  notion: {
    integrationSecret: string;
    databaseId: string;
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
  return {
    notion: {
      integrationSecret: resolveEnvironmentVariable(
        "NOTION_INTEGRATION_SECRET"
      ),
      databaseId: resolveEnvironmentVariable("NOTION_DATABASE_ID"),
    },
  };
}
