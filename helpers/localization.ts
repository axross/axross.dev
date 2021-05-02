import getConfig from "next/config";

export function getLocales(): string[] {
  const config = getConfig();

  return config.publicRuntimeConfig.locales;
}

export function getDefaultLocale(): string {
  const config = getConfig();

  return config.publicRuntimeConfig.defaultLocale;
}

export function toUtsKebabCaseLocale(locale: string): string {
  const match = /^([a-z]{2})([-_]([a-z]{2}))?$/i.exec(locale);

  if (!match) {
    throw new Error(
      `Invalid locale string. "${locale}" is not valid locale string.`
    );
  }

  return `${match[1]!.toLowerCase()}${
    match[3] ? `-${match[3].toUpperCase()}` : ""
  }`;
}

export function toUtsSnakeCaseLocale(locale: string): string {
  return toUtsKebabCaseLocale(locale).replace("-", "_");
}
