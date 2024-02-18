import { type JSX } from "react";
import {
  SelectContent,
  SelectIcon,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "~/components/select";
import { availableLocales } from "~/helpers/locale";
import { getTranslation } from "~/helpers/translation.server";
import { LocaleSelectItem } from "./locale-select-item";
import { LocaleSelect } from "./locale-select.server";

async function LocaleSwitcher(): Promise<JSX.Element> {
  const { t } = await getTranslation();

  return (
    <LocaleSelect>
      <SelectTrigger>
        <SelectValue placeholder={t("Language")} />

        <SelectIcon />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent>
          <SelectScrollUpButton />

          <SelectViewport>
            {availableLocales.map((locale) => {
              return <LocaleSelectItem locale={locale} key={locale} />;
            })}
          </SelectViewport>

          <SelectScrollDownButton />
        </SelectContent>
      </SelectPortal>
    </LocaleSelect>
  );
}

export { LocaleSwitcher };
