import getConfig from "next/config";

export function getLocales(): string[] {
  const config = getConfig();

  return config.publicRuntimeConfig.locales;
}

export function getDefaultLocale(): string {
  const config = getConfig();

  return config.publicRuntimeConfig.defaultLocale;
}
