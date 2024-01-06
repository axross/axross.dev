import "server-only";

import { isFullPage } from "@notionhq/client";
import { Client } from "@notionhq/client";
import { getConfig } from "~/helpers/config";
import { parsePostNotionPage } from "~/helpers/notion";
import { Post } from "~/models/post";
import { GetPosts } from "~/queries/query-posts";

export const getPosts: GetPosts = async ({ locale, includeDrafts }) => {
  const config = getConfig();
  const notion = new Client({ auth: config.notion.integrationSecret });

  const filter = includeDrafts ? {
    "property": "Locale",
          "select": { "equals": locale }
  } : {
    "and": [
      {
        "property": "Status",
        "status": { "equals": "Published" }
      },
      {
        "property": "Locale",
        "select": { "equals": locale }
      }
    ]
  }
  const response = await notion.databases.query({
    database_id: config.notion.databaseId,
    "sorts": [
      {
        "property": "Created at",
        "direction": "descending"
      }
    ],
    filter,
  });

  const posts: Post[] = [];

  for (const result of response.results) {
    if (isFullPage(result)) {
      posts.push(parsePostNotionPage(result));
    }
  }

  return posts;
}
