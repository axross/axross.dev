import "server-only";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies, headers } from "next/headers";
import { availableLocales, fallbackLocale } from "~/helpers/locale";
import { type Locale } from "~/models/locale";

function getLocaleFromAcceptLanguage(): Locale | null {
  const headerStore = headers();
  const acceptLanguage = headerStore.get("accept-language");

  const requestedLocales = new Negotiator({
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion
    headers: { "accept-language": acceptLanguage! },
  }).languages();

  const matchedLocale = matchLocale(
    requestedLocales,
    availableLocales,
    "fl_BK",
  );

  if (matchedLocale === "fl_BK") {
    return null;
  }

  return matchedLocale as Locale;
}

const localeCookieName = "locale";

function getLocaleFromCookie(): Locale | null {
  const cookieStore = cookies();
  const value = cookieStore.get(localeCookieName)?.value;

  if (value !== undefined && availableLocales.includes(value as never)) {
    return value as Locale;
  }

  return null;
}

function resolveRequestedLocale(): Locale {
  return (
    getLocaleFromCookie() ?? getLocaleFromAcceptLanguage() ?? fallbackLocale
  );
}

function setLocaleCookie({ locale }: { locale: Locale }): void {
  const cookieStore = cookies();

  cookieStore.set(localeCookieName, locale, { httpOnly: true });
}

export {
  getLocaleFromCookie,
  getLocaleFromAcceptLanguage,
  resolveRequestedLocale,
  setLocaleCookie,
};
