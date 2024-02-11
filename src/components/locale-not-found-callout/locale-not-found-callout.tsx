import "server-only";

import { type ComponentPropsWithRef, type JSX } from "react";
import {
  Callout,
  CalloutDescription,
  CalloutTitle,
} from "~/components/callout";
import { resolveRequestedLocale } from "~/helpers/header";
import { type TFunction } from "~/helpers/translation";
import { getTranslation } from "~/helpers/translation.server";
import { type Locale } from "~/models/locale";

function localeToLanguage({
  locale,
  t,
}: {
  locale: Locale;
  t: TFunction;
}): string {
  if (locale === "en-US") {
    return t("English");
  }

  if (locale === "ja-JP") {
    return t("Japanese");
  }

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`${locale} isn't supported in this function.`);
}

async function LocaleNotFoundCallout({
  locale,
  ...props
}: Omit<ComponentPropsWithRef<typeof Callout>, "intent"> & {
  readonly locale: Locale;
}): Promise<JSX.Element | null> {
  const requestedLocale = resolveRequestedLocale();

  if (locale === requestedLocale) {
    return null;
  }

  const { t } = await getTranslation("common");

  return (
    <Callout intent="danger" {...props}>
      <CalloutTitle>
        {t("Only {{language}} is available!", {
          language: localeToLanguage({ locale, t }),
        })}
      </CalloutTitle>

      <CalloutDescription>
        <div>
          {t(
            "This article isn't yet translated in English. Now this page is displaying in {{lang}}.",
            {
              requested: localeToLanguage({ locale: requestedLocale, t }),
              available: localeToLanguage({ locale, t }),
            },
          )}
        </div>
      </CalloutDescription>
    </Callout>
  );
}

export { LocaleNotFoundCallout };
