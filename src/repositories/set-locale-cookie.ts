import { cookies } from "next/headers";
import { localeCookieName } from "~/helpers/cookie";
import { Locale } from "~/models/locale";

export async function setLocaleCookie({locale}:{locale: Locale}) {
  const cookieStore = cookies();

  cookieStore.set(localeCookieName, locale, { httpOnly: true });
}
