import { ContentfulClientApi, EntryCollection } from "contentful";
import GetBlogPost from "../GetBlogPost";

export function createGetBlogPost(
  contentful: ContentfulClientApi
): GetBlogPost {
  return async ({ id, locale }) => {
    let entries: EntryCollection<any>;

    try {
      entries = await contentful.getEntries<any>({
        content_type: "blogPost",
        limit: 1,
        locale,
        "fields.slug": id,
        "fields.isAvailable": true,
      });
    } catch (err) {
      throw new Error(
        `the request for (id: ${id}, locale: ${locale}) has failed.`
      );
    }

    if (entries.items.length === 0) {
      throw new Error(
        `the blog post (id: ${id}, locale: ${locale}) is not found.`
      );
    }

    return {
      id: entries.items[0].fields.slug,
      createdAt: new Date(entries.items[0].sys.createdAt),
      lastModifiedAt: new Date(entries.items[0].sys.updatedAt),
      title: entries.items[0].fields.title,
      summary: entries.items[0].fields.summary,
      body: entries.items[0].fields.body,
    };
  };
}
