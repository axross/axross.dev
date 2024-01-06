import "server-only";

import { isFullPage } from "@notionhq/client";
import { Client } from "@notionhq/client";
import { getConfig } from "~/helpers/config";
import { parsePostNotionPage } from "~/helpers/notion";
import { GetPost } from "~/queries/query-post";

export const getPost: GetPost = async ({ slug, locale, includeDrafts }) => {
  const config = getConfig();
  const notion = new Client({ auth: config.notion.integrationSecret });

  const filter = includeDrafts ? {
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
  } : {
    "and": [
      {
        "property": "Status",
        "status": {
          "equals": "Published"
        }
      },
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
  };
  const response = await notion.databases.query({
    database_id: config.notion.databaseId,
    "sorts": [
      {
        "property": "Created at",
        "direction": "descending"
      }
    ],
    filter
  });

  for (const result of response.results) {
    if (isFullPage(result)) {
      return parsePostNotionPage(result);
    }
  }

  throw new Error();
}
