import "server-only";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies, headers } from "next/headers";
import { localeCookieName } from "~/helpers/cookie";
import { availableLocales, fallbackLocale } from "~/helpers/locale";
import { type Locale } from "~/models/locale";

export function getRequestedLocale(): Locale {
  const cookieStore = cookies();
  let locale = cookieStore.get(localeCookieName)?.value ?? null;

  const headerStore = headers();

  if (locale === null && headerStore.has("accept-language")) {
    const acceptLanguage = headerStore.get("accept-language");

    const requestedLocales = new Negotiator({
      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion
      headers: { "accept-language": acceptLanguage! },
    }).languages();
    locale = matchLocale(requestedLocales, availableLocales, fallbackLocale);
  }

  return locale as Locale;
}
