import { Entry, ContentfulClientApi } from "contentful";
import BlogPost from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";
import { ContentfulLocaleRepository } from "./LocaleRepository";

export default interface BlogPostRepository {
  getAll(): Promise<Map<LocaleString, BlogPost[]>>;

  getAllByLocale(locale: LocaleString): Promise<BlogPost[]>;

  getById(blogPostId: string): Promise<Map<LocaleString, BlogPost>>;
}

export class ContentfulBlogPostRepository implements BlogPostRepository {
  constructor(contentful: ContentfulClientApi) {
    this.contentful = contentful;
  }

  private contentful: ContentfulClientApi;

  async getAll(): Promise<Map<LocaleString, BlogPost[]>> {
    const [entries, defaultLocale] = await Promise.all([
      await this.contentful.getEntries<any>({
        content_type: "blogPost",
        locale: "*"
      }),
      new ContentfulLocaleRepository(this.contentful).getDefaultOne()
    ]);

    const blogPosts = new Map<LocaleString, BlogPost[]>();

    for (const entryItem of entries.items) {
      const locales = Object.keys(entryItem.fields.isAvailable).filter(
        locale => entryItem.fields.isAvailable[locale]
      );

      for (const locale of locales) {
        if (!blogPosts.has(locale)) {
          blogPosts.set(locale, []);
        }

        blogPosts
          .get(locale)!
          .push(
            ContentfulBlogPostRepository.parseEntryItemIntoBlogPost(
              entryItem,
              locale,
              defaultLocale
            )
          );
      }
    }

    return blogPosts;
  }

  async getAllByLocale(locale: LocaleString): Promise<BlogPost[]> {
    const [entries, defaultLocale] = await Promise.all([
      this.contentful.getEntries<any>({
        content_type: "blogPost",
        order: "-sys.createdAt",
        locale: "*"
      }),
      new ContentfulLocaleRepository(this.contentful).getDefaultOne()
    ]);

    return entries.items
      .filter(entryItem => entryItem.fields.isAvailable[locale])
      .map(entryItem =>
        ContentfulBlogPostRepository.parseEntryItemIntoBlogPost(
          entryItem,
          locale,
          defaultLocale
        )
      );
  }

  async getById(blogPostId: string): Promise<Map<LocaleString, BlogPost>> {
    const [entries, defaultLocale] = await Promise.all([
      this.contentful.getEntries<any>({
        content_type: "blogPost",
        locale: "*",
        limit: 1,
        "fields.slug": blogPostId
      }),
      new ContentfulLocaleRepository(this.contentful).getDefaultOne()
    ]);

    if (entries.items.length !== 1) {
      return new Map();
    }

    const entryItem = entries.items[0];
    const locales = Object.keys(entryItem.fields.isAvailable);
    const availableLocales = locales.filter(
      locale => entryItem.fields.isAvailable[locale]
    );
    const blogPosts = new Map<LocaleString, BlogPost>();

    for (const locale of availableLocales) {
      blogPosts.set(
        locale,
        ContentfulBlogPostRepository.parseEntryItemIntoBlogPost(
          entryItem,
          locale,
          defaultLocale
        )
      );
    }

    return blogPosts;
  }

  private static parseEntryItemIntoBlogPost(
    entryItem: Entry<any>,
    locale: LocaleString,
    defaultLocale: LocaleString
  ): BlogPost {
    return {
      id: entryItem.fields.slug[defaultLocale],
      createdAt: new Date(entryItem.sys.createdAt),
      lastModifiedAt: new Date(entryItem.sys.updatedAt),
      title: entryItem.fields.title[locale],
      summary: entryItem.fields.summary[locale],
      body: entryItem.fields.body[locale]
    };
  }
}
