"use server";

import { withServerActionInstrumentation } from "@sentry/nextjs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { setLocaleCookie } from "~/helpers/header";
import { type Locale } from "~/models/locale";

async function overrideLocale({ locale }: { locale: Locale }): Promise<void> {
  const formData = new FormData();
  formData.append("locale", locale);

  return withServerActionInstrumentation(
    "overrideLocale",
    {
      formData,
      headers: headers(),
      recordResponse: true,
    },
    (): Promise<void> => {
      setLocaleCookie({ locale });

      revalidatePath("/");

      return Promise.resolve();
    },
  );
}

export { overrideLocale };
