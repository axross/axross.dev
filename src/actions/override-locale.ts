import { revalidatePath } from "next/cache";
import { Locale } from "~/models/locale";
import { setLocaleCookie } from "~/repositories/set-locale-cookie";

export async function overrideLocale({locale}:{locale: Locale}) {
  setLocaleCookie({ locale });

  revalidatePath("/");
}
