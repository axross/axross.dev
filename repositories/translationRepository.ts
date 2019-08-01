import LocaleString from "../entities/LocaleString";

const locale_cache = new Map();

async function getTranslation(
  locale: LocaleString
): Promise<Record<string, string>> {
    
  if (typeof window !== "undefined" && locale_cache.has(locale)) {
    return locale_cache.get(locale)
  } 
   
  if (typeof window !== "undefined") {
    const response = await fetch(`/static/translation/${locale}.json`);
    const json = await response.json();
    locale_cache.set(locale, json)
    return json;
  }

  if (typeof process !== "undefined") {
    const json = require(`../static/translation/${locale}.json`);

    return json;
  }

  throw new Error("it's unsupported running context.");
}

export default getTranslation;
