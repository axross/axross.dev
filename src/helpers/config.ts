interface Config {
  notion: {
    integrationSecret: string;
    databaseId: string;
  };
}

function resolveEnvVar(key: string): string {
  const value = process.env[key];

  if (value === undefined || value.trim().length === 0) {
    throw new Error(`An environment variable ${key} is not set.`);
  }

  return value;
}

export function getConfig(): Config {
  return {
    notion: {
      integrationSecret: resolveEnvVar("NOTION_INTEGRATION_SECRET"),
      databaseId: resolveEnvVar("NOTION_DATABASE_ID"),
    },
  };
}
