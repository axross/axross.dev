import * as acceptLanguageParser from "accept-language-parser";
import { AVAILABLE_LOCALES, FALLBACK_LOCALE } from "../constants/locale";

export function getLocaleFromQuery(query: Record<string, any>): string | null {
  if (AVAILABLE_LOCALES.includes(query.hl)) {
    return query.hl;
  }

  return null;
}

export function getLocaleFromQueryWithFallback(
  query: Record<string, any>
): string {
  return getLocaleFromQuery(query) ?? FALLBACK_LOCALE;
}

export function getBestMatchedLocaleFromLanguageRange(
  languageRange: string
): string | null {
  return acceptLanguageParser.pick(AVAILABLE_LOCALES, languageRange, {
    loose: true,
  });
}

export function getBestMatchedLocaleOrFallbackFromLanguageRange(
  languageRange: string
): string {
  return (
    getBestMatchedLocaleFromLanguageRange(languageRange) ?? FALLBACK_LOCALE
  );
}
