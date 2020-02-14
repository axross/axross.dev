import { ContentfulClientApi } from "contentful";
import GetAllBlogPosts from "../GetAllBlogPosts";

export function createGetAllBlogPosts(contentful: ContentfulClientApi): GetAllBlogPosts {
  return async ({ locale }) => {
    const entries = await contentful.getEntries<any>({
      content_type: "blogPost",
      order: "-sys.createdAt",
      locale,
      "fields.isAvailable": true,
    });
  
    return entries.items
      .map(item => ({
        id: item.fields.slug,
        createdAt: new Date(item.sys.createdAt),
        lastModifiedAt: new Date(item.sys.updatedAt),
        title: item.fields.title,
        summary: item.fields.summary,
        body: item.fields.body,
      }));
  };
}
