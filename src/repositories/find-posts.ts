import "server-only";

import { Client, isFullPage } from "@notionhq/client";
import { getConfig } from "~/helpers/config";
import { parsePostNotionPage } from "~/helpers/notion";
import { type Locale } from "~/models/locale";
import { type Post } from "~/models/post";

export async function findPosts({
  locale,
  includeDrafts,
}: {
  locale: Locale;
  includeDrafts: boolean;
}): Promise<Post[]> {
  const config = getConfig();
  const notion = new Client({ auth: config.notion.integrationSecret });

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  let filter: Parameters<typeof notion.databases.query>[0]["filter"] = {
    and: [
      {
        property: "Status",
        status: { equals: "Published" },
      },
      {
        property: "Locale",
        select: { equals: locale },
      },
    ],
  };

  if (includeDrafts) {
    filter = {
      property: "Locale",
      select: { equals: locale },
    };
  }

  const response = await notion.databases.query({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    database_id: config.notion.postDatabaseId,
    sorts: [
      {
        property: "Last edited at (override)",
        direction: "descending",
      },
      {
        property: "Last edited at",
        direction: "descending",
      },
    ],
    filter,
  });

  const posts: Post[] = [];

  for (const result of response.results) {
    if (isFullPage(result)) {
      try {
        posts.push(parsePostNotionPage(result));
      } catch {
        // do nothing;
      }
    }
  }

  return posts;
}
