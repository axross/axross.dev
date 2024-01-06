import "server-only";

import { Client, isFullPage } from "@notionhq/client";
import { getConfig } from "~/helpers/config";
import { parsePostNotionPage } from "~/helpers/notion";
import { type Locale } from "~/models/locale";
import { type Post } from "~/models/post";

export async function findPost({
  slug,
  locale,
  includeDrafts,
}: {
  slug: Post["slug"];
  locale: Locale;
  includeDrafts: boolean;
}): Promise<Post | null> {
  const config = getConfig();
  const notion = new Client({ auth: config.notion.integrationSecret });

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const filter: Parameters<typeof notion.databases.query>[0]["filter"] = {
    and: [
      {
        property: "Slug",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        rich_text: { equals: slug },
      },
      {
        property: "Locale",
        select: { equals: locale },
      },
    ],
  };

  if (!includeDrafts) {
    filter.and.unshift({
      property: "Status",
      status: {
        equals: "Published",
      },
    });
  }

  const response = await notion.databases.query({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    database_id: config.notion.databaseId,
    sorts: [
      {
        property: "Created at",
        direction: "descending",
      },
    ],
    filter,
  });

  for (const result of response.results) {
    if (isFullPage(result)) {
      return parsePostNotionPage(result);
    }
  }

  return null;
}
