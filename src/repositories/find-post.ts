import "server-only";

import { Client, isFullPage } from "@notionhq/client";
import { getConfig } from "~/helpers/config";
import { parsePostNotionPage } from "~/helpers/notion";
import { type Locale } from "~/models/locale";
import { type Post } from "~/models/post";

export async function findPost({
  slug,
  locale,
  fallback = false,
  includeDrafts = false,
}: {
  slug: Post["slug"];
  locale: Locale;
  fallback?: boolean;
  includeDrafts?: boolean;
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
    ],
  };

  if (!fallback) {
    filter.and.unshift({
      property: "Locale",
      select: { equals: locale },
    });
  }

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
    database_id: config.notion.postDatabaseId,
    sorts: [
      {
        property: "Created at",
        direction: "descending",
      },
    ],
    filter,
  });

  let exactMatch: Post | null = null;
  let fallbackMatch: Post | null = null;

  for (const result of response.results) {
    if (isFullPage(result)) {
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let post: Post;

      try {
        post = parsePostNotionPage(result);
      } catch {
        continue;
      }

      if (post.locale === locale) {
        exactMatch ??= post;
      }

      if (fallback) {
        fallbackMatch ??= post;
      }
    }
  }

  return exactMatch ?? fallbackMatch;
}
