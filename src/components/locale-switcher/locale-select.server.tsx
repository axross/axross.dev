import "server-only";

import { type ComponentPropsWithoutRef, type JSX } from "react";
import { resolveRequestedLocale } from "~/helpers/header";
import { LocaleSelect as ClientLocaleSelect } from "./locale-select.client";

function LocaleSelect({
  children,
  ...props
}: Omit<
  ComponentPropsWithoutRef<typeof ClientLocaleSelect>,
  "defaultValue"
>): JSX.Element {
  const selectedLocale = resolveRequestedLocale();

  return (
    <ClientLocaleSelect value={selectedLocale} {...props}>
      {children}
    </ClientLocaleSelect>
  );
}

export { LocaleSelect };
