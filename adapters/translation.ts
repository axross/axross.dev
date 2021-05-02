import type { IntlConfig } from "@formatjs/intl";
import { toUtsKebabCaseLocale } from "../helpers/localization";

export type Dictionary = IntlConfig["messages"];

export async function fetchTranslationDictionary(
  locale: string
): Promise<Dictionary> {
  const response = await fetch(
    `https://cdn.simplelocalize.io/${
      process.env.NEXT_PUBLIC_SIMPLE_LOCALIZE_TOKEN
    }/_latest/${toUtsKebabCaseLocale(locale)}`
  );
  const json = await response.json();

  // TODO:
  // handle errors
  return json;
}
