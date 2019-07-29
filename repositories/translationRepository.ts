import LocaleString from "../entities/LocaleString";

async function getTranslation(
  locale: LocaleString
): Promise<Record<string, string>> {
  if (typeof window !== "undefined") {
    const response = await fetch(`/static/translation/${locale}.json`);
    const json = await response.json();

    return json;
  }

  if (typeof process !== "undefined") {
    const json = require(`../static/translation/${locale}.json`);

    return json;
  }

  throw new Error("it's unsupported running context.");
}

export default getTranslation;
