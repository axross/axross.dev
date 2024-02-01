"use client";

import { type ComponentPropsWithoutRef, type JSX, useCallback } from "react";
import { overrideLocale } from "~/actions/override-locale";
import { Select } from "~/components/select";
import { type Locale } from "~/models/locale";

function LocaleSelect({
  onValueChange,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Select> & {
  readonly defaultValue?: Locale;
}): JSX.Element {
  const onSelectValueChange = useCallback(
    (value: string) => {
      if (onValueChange !== undefined) {
        onValueChange(value);
      }

      void overrideLocale({ locale: value as Locale });
    },
    [onValueChange]
  );

  return (
    <Select onValueChange={onSelectValueChange} {...props}>
      {children}
    </Select>
  );
}

LocaleSelect.displayName = "LocaleSelect";

export { LocaleSelect };
