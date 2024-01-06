import "server-only";

import { Client, isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { getConfig } from "~/helpers/config";
import { GetPostContent } from "~/queries/query-post-content";

export const getPostContent: GetPostContent = async ({ slug, locale }) => {
  const config = getConfig();
  const notion = new Client({ auth: config.notion.integrationSecret });

  const response = await notion.databases.query({
    database_id: "0efa41babf23439b8cb961b95744d2f8",
    "sorts": [
      {
        "property": "Last edited at",
        "direction": "descending"
      }
    ],
    "filter": {
      "and": [
        {
          "property": "Slug",
          "rich_text": { "equals": slug
          }
        },
        {
          "property": "Locale",
          "select": { "equals": locale
          }
        }
      ]
    }
  });

  let firstResult = null;

  for (const result of response.results) {
    if (isFullPage(result)) {
      firstResult = result;
    }
  }

  if (firstResult === null) {
    throw new Error();
  }

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const blocks = await n2m.pageToMarkdown(firstResult.id);
  const parsedResult = n2m.toMarkdownString(blocks);
  
  return parsedResult.parent;
}
