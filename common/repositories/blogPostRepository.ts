import { Entry } from "contentful";
import BlogPost, { BlogPostId } from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";
import contentful, { createContentfulPreview } from "./contentful";
import { getDefaultLocale } from "./localeRepository";

export async function getAllBlogPosts(): Promise<
  Map<LocaleString, BlogPost[]>
> {
  const [entries, defaultLocale] = await Promise.all([
    await contentful.getEntries<any>({
      content_type: "blogPost",
      locale: "*"
    }),
    getDefaultLocale({ contentful })
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
        .push(parseEntryItemIntoBlogPost(entryItem, locale, defaultLocale));
    }
  }

  return blogPosts;
}

export async function getAllBlogPostsByLocale(
  locale: LocaleString,
  { previewAccessToken }: { previewAccessToken?: string } = {}
): Promise<BlogPost[]> {
  const _contentful = previewAccessToken
    ? createContentfulPreview(previewAccessToken)
    : contentful;
  const [entries, defaultLocale] = await Promise.all([
    _contentful.getEntries<any>({
      content_type: "blogPost",
      order: "-sys.createdAt",
      locale: "*"
    }),
    getDefaultLocale({ contentful })
  ]);

  return entries.items
    .filter(entryItem => entryItem.fields.isAvailable[locale])
    .map(entryItem =>
      parseEntryItemIntoBlogPost(entryItem, locale, defaultLocale)
    );
}

export async function getBlogPostsById(
  blogPostId: BlogPostId,
  { previewAccessToken }: { previewAccessToken?: string } = {}
): Promise<Map<LocaleString, BlogPost>> {
  const _contentful = previewAccessToken
    ? createContentfulPreview(previewAccessToken)
    : contentful;
  const [entries, defaultLocale] = await Promise.all([
    _contentful.getEntries<any>({
      content_type: "blogPost",
      locale: "*",
      limit: 1,
      "fields.slug": blogPostId
    }),
    getDefaultLocale({ contentful })
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
      parseEntryItemIntoBlogPost(entryItem, locale, defaultLocale)
    );
  }

  return blogPosts;
}

function parseEntryItemIntoBlogPost(
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
