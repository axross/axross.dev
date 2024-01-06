import { cookies } from "next/headers";
import { localeCookieName } from "~/helpers/cookie";
import { type Locale } from "~/models/locale";

export function setLocaleCookie({ locale }: { locale: Locale }): void {
  const cookieStore = cookies();

  cookieStore.set(localeCookieName, locale, { httpOnly: true });
}
