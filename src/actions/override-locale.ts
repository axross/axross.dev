import { revalidatePath } from "next/cache";
import { type Locale } from "~/models/locale";
import { setLocaleCookie } from "~/repositories/set-locale-cookie";

export function overrideLocale({ locale }: { locale: Locale }): void {
  setLocaleCookie({ locale });

  revalidatePath("/");
}
