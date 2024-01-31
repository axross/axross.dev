import "server-only";

import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";
import {
  Callout,
  CalloutDescription,
  CalloutTitle,
} from "~/components/callout";
import { resolveRequestedLocale } from "~/helpers/header";
import { type Locale } from "~/models/locale";

const LocaleNotFoundCallout = forwardRef<
  ElementRef<typeof Callout>,
  Omit<ComponentPropsWithRef<typeof Callout>, "intent"> & {
    readonly locale: Locale;
  }
>(({ locale, ...props }, ref) => {
  const requestedLocale = resolveRequestedLocale();

  if (locale === requestedLocale) {
    return null;
  }

  return (
    <Callout intent="danger" ref={ref} {...props}>
      <CalloutTitle>{"Only Japanese is available!"}</CalloutTitle>

      <CalloutDescription>
        <div>
          {
            "This article isn't yet translated in English. Now this page is displaying in Japanese."
          }
        </div>
      </CalloutDescription>
    </Callout>
  );
});

LocaleNotFoundCallout.displayName = "LocaleNotFoundCallout";

export { LocaleNotFoundCallout };
