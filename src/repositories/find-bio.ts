import "server-only";

import { Client, isFullPage } from "@notionhq/client";
import { getConfig } from "~/helpers/config";
import { parseBioNotionPage } from "~/helpers/notion";
import { type Bio } from "~/models/bio";
import { type Locale } from "~/models/locale";

export async function findBio({
  locale,
  fallback = false,
}: {
  locale: Locale;
  fallback?: boolean;
}): Promise<Bio | null> {
  const config = getConfig();
  const notion = new Client({ auth: config.notion.integrationSecret });

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers, no-undef-init
  let filter: Parameters<typeof notion.databases.query>[0]["filter"] =
    undefined;

  if (!fallback) {
    filter = {
      property: "Locale",
      select: { equals: locale },
    };
  }

  const response = await notion.databases.query({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    database_id: config.notion.bioDatabaseId,
    filter,
  });

  let exactMatch: Bio | null = null;
  let fallbackMatch: Bio | null = null;

  for (const result of response.results) {
    if (isFullPage(result)) {
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let bio: Bio;

      try {
        bio = parseBioNotionPage(result);
      } catch {
        continue;
      }

      if (bio.locale === locale) {
        exactMatch ??= bio;
      }

      if (fallback) {
        fallbackMatch ??= bio;
      }
    }
  }

  return exactMatch ?? fallbackMatch;
}
