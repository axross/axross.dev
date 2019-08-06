import LocaleString from "../entities/LocaleString";

const localeCache = new Map();

async function getTranslation(
  locale: LocaleString
): Promise<Record<string, string>> {
    
  if (typeof window !== "undefined") {
    
    if (localeCache.has(locale)) {
        return localeCache.get(locale)
    }
    
    const response = await fetch(`/static/translation/${locale}.json`);
    const json = await response.json();
    localeCache.set(locale, json)
    return json;
  }

  if (typeof process !== "undefined") {
    const json = require(`../static/translation/${locale}.json`);

    return json;
  }

  throw new Error("it's unsupported running context.");
}

export default getTranslation;
