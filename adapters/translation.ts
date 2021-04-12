import type { IntlConfig } from "@formatjs/intl";

export type Dictionary = IntlConfig["messages"];

export async function fetchTranslationDictionary(
  locale: string
): Promise<Dictionary> {
  const response = await await fetch(
    `https://cdn.simplelocalize.io/${process.env.NEXT_PUBLIC_SIMPLE_LOCALIZE_TOKEN}/_latest/${locale}`
  );
  const json = await response.json();

  // TODO:
  // handle errors
  return json;
}
