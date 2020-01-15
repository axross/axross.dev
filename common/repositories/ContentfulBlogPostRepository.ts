import { ContentfulClientApi, EntryCollection } from "contentful";
import BlogPost from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";
import BlogPostRepository from "./BlogPostRepository";

export default class ContentfulBlogPostRepository implements BlogPostRepository {
  constructor(contentful: ContentfulClientApi) {
    this.contentful = contentful;
  }

  private contentful: ContentfulClientApi;

  async getAllByLocale(locale: LocaleString): Promise<BlogPost[]> {
    const entries = await this.contentful.getEntries<any>({
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
  }

  async getByIdAndLocale(blogPostId: string, locale: LocaleString): Promise<BlogPost> {
    let entries: EntryCollection<any>;
    
    try {
      entries = await this.contentful.getEntries<any>({
        content_type: "blogPost",
        limit: 1,
        locale,
        "fields.slug": blogPostId,
        "fields.isAvailable": true,
      });
    } catch (_) {
      throw new Error(`the request for (id: ${blogPostId}, locale: ${locale}) has failed.`);
    }

    if (entries.items.length === 0) {
      throw new Error(`the blog post (id: ${blogPostId}, locale: ${locale}) is not found.`);
    }

    return {
      id: entries.items[0].fields.slug,
      createdAt: new Date(entries.items[0].sys.createdAt),
      lastModifiedAt: new Date(entries.items[0].sys.updatedAt),
      title: entries.items[0].fields.title,
      summary: entries.items[0].fields.summary,
      body: entries.items[0].fields.body,
    };
  }
}
