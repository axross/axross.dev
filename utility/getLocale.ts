import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  FALLBACK_LOCALES_PER_LANGUAGE
} from "../constant/locale";
import LocaleString from "../entities/LocaleString";

function getLocale(query: any) {
  return sanitizeLocale(query.hl);
}

function sanitizeLocale(value?: string): LocaleString {
  if (value) {
    if (AVAILABLE_LOCALES.includes(value)) {
      return value;
    }

    const language = value.split("-")[0];
    const locale = FALLBACK_LOCALES_PER_LANGUAGE[language];

    if (locale && AVAILABLE_LOCALES.includes(locale)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export default getLocale;
