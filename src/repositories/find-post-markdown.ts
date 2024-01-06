import "server-only";

import { Client, isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { getConfig } from "~/helpers/config";
import { type Locale } from "~/models/locale";
import { type Post } from "~/models/post";

export async function findPostMarkdown({
  slug,
  locale,
}: {
  slug: Post["slug"];
  locale: Locale;
}): Promise<string | null> {
  const config = getConfig();
  const notion = new Client({ auth: config.notion.integrationSecret });

  const response = await notion.databases.query({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    database_id: config.notion.databaseId,
    sorts: [
      {
        property: "Last edited at",
        direction: "descending",
      },
    ],
    filter: {
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
    },
  });

  let firstResult = null;

  for (const result of response.results) {
    if (isFullPage(result)) {
      firstResult = result;
    }
  }

  if (firstResult === null) {
    return null;
  }

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const blocks = await n2m.pageToMarkdown(firstResult.id);
  const parsedResult = n2m.toMarkdownString(blocks);

  return parsedResult.parent;
}
