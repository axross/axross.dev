"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
} from "~/components/select";
import { type Locale } from "~/models/locale";
import { CountryFlag } from "./country-flag";
import css from "./locale-select-item.module.css";

const LocaleSelectItem = forwardRef<
  ElementRef<typeof SelectItem>,
  Omit<ComponentPropsWithoutRef<typeof SelectItem>, "value"> & {
    readonly locale: Locale;
  }
>(({ locale, ...props }, ref) => {
  let flag = null;
  let label = null;

  if (locale === "en-US") {
    flag = <CountryFlag country="america" className={css.flag} />;
    label = "English";
  }

  if (locale === "ja-JP") {
    flag = <CountryFlag country="japan" className={css.flag} />;
    label = "日本語";
  }

  return (
    <SelectItem value={locale} ref={ref} {...props}>
      <SelectItemIndicator />

      <SelectItemText>
        <div className={css.text}>
          {flag}

          {label}
        </div>
      </SelectItemText>
    </SelectItem>
  );
});

LocaleSelectItem.displayName = "LocaleSelectItem";

export { LocaleSelectItem };
