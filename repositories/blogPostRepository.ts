import BlogPost, { BlogPostId } from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";
import { parseMultiLocaleContentfulEntryToBlogPost } from "../parsers/blogPost";
import contentful, { createContentfulPreview } from "./contentful";

export async function getAllBlogPosts({
  locale
}: {
  locale: LocaleString;
}): Promise<BlogPost[]> {
  const entries = await contentful.getEntries<any>({
    content_type: "blogPost",
    order: "-sys.createdAt",
    locale: "*"
  });

  const blogPosts = entries.items
    .filter(item => item.fields.title[locale])
    .map(item => parseMultiLocaleContentfulEntryToBlogPost(item, locale));

  return blogPosts;
}

export async function getAllBlogPostsInAllLocale(): Promise<
  [BlogPost, LocaleString][]
> {
  const entries = await contentful.getEntries<any>({
    content_type: "blogPost",
    order: "-sys.createdAt",
    locale: "*"
  });

  const blogPosts: [BlogPost, LocaleString][] = [];

  for (const item of entries.items) {
    const availableLocales = Object.keys(item.fields.title).filter(
      locale => item.fields.title[locale].length >= 1
    );

    for (const locale of availableLocales) {
      blogPosts.push([
        parseMultiLocaleContentfulEntryToBlogPost(item, locale),
        locale
      ]);
    }
  }

  return blogPosts;
}

export async function getBlogPostById(
  blogPostId: BlogPostId,
  {
    locale,
    previewAccessToken
  }: { locale: LocaleString; previewAccessToken?: string }
): Promise<[BlogPost | null, LocaleString[]]> {
  const _contentful = previewAccessToken
    ? createContentfulPreview(previewAccessToken)
    : contentful;

  const entries = await _contentful.getEntries<any>({
    content_type: "blogPost",
    locale: "*",
    limit: 1,
    "fields.slug": blogPostId
  });

  if (entries.items.length !== 1) {
    return [null, []];
  }

  const blogPost = entries.items[0].fields.title[locale]
    ? parseMultiLocaleContentfulEntryToBlogPost(entries.items[0], locale)
    : null;
  const availableLocales = Object.keys(entries.items[0].fields.title);

  return [blogPost, availableLocales];
}
