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
