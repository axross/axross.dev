"use server";

import { revalidatePath } from "next/cache";
import { setLocaleCookie } from "~/helpers/header";
import { type Locale } from "~/models/locale";

function overrideLocale({ locale }: { locale: Locale }): Promise<void> {
  setLocaleCookie({ locale });

  revalidatePath("/");

  return Promise.resolve();
}

export { overrideLocale };
