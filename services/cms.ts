import { GraphQLClient, gql } from "graphql-request";
import {
  generateMarkdown,
  generateTableOfContents,
  parseMarkdown,
} from "./markdown-processing";

export async function getIndexPageJson({
  locale,
  previewToken,
}: {
  locale: string;
  previewToken?: string;
}): Promise<{
  title: string;
  description: string;
  coverImageUrl: string;
  tableOfContents: { id: string; level: number; text: string }[];
  body: string;
}> {
  const data = await getGraphQLClient({ previewToken }).request(
    gql`
      query($locale: Locale!) {
        indexPages(locales: [$locale, en_US]) {
          title
          description
          coverImage {
            url
          }
          body
        }
      }
    `,
    { locale: locale.replace("-", "_") }
  );

  if (data.indexPages.length !== 1) {
    throw new Error("Index page was not found.");
  }

  const ast = await parseMarkdown(data.indexPages[0].body);

  return {
    title: data.indexPages[0].title,
    description: data.indexPages[0].description,
    coverImageUrl: data.indexPages[0].coverImage.url,
    tableOfContents: generateTableOfContents(ast),
    body: generateMarkdown(ast),
  };
}

export async function getPostJson({
  slug,
  locale,
  previewToken,
}: {
  slug: string;
  locale: string;
  previewToken?: string;
}): Promise<{
  slug: string;
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
  firstPublishedAt: string;
  lastPublishedAt: string;
  author: { name: string; avatarUrl: string };
  tableOfContents: { id: string; level: number; text: string }[];
  body: string;
} | null> {
  const data = await getGraphQLClient({ previewToken }).request(
    gql`
      query($slug: String, $locale: Locale!) {
        posts(
          where: { slug: $slug, isAvailable: true }
          orderBy: firstPublishedAt_DESC
          locales: [$locale, en_US]
        ) {
          slug
          title
          excerpt
          coverImage {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          body
          tags
          firstPublishedAt
          lastModifiedAt
        }
      }
    `,
    { slug, locale: locale.replace("-", "_") }
  );

  if (data.posts.length !== 1) {
    return null;
  }

  const ast = await parseMarkdown(data.posts[0].body);

  return {
    slug: data.posts[0].slug,
    title: data.posts[0].title,
    description: data.posts[0].excerpt,
    coverImageUrl: data.posts[0].coverImage.url,
    tags: data.posts[0].tags,
    firstPublishedAt: new Date(data.posts[0].firstPublishedAt).toISOString(),
    lastPublishedAt: new Date(data.posts[0].lastModifiedAt).toISOString(),
    author: {
      name: data.posts[0].author.name,
      avatarUrl: data.posts[0].author.avatar.url,
    },
    tableOfContents: generateTableOfContents(ast),
    body: generateMarkdown(ast),
  };
}

export async function getPostEntryListJson({
  locale,
  previewToken,
}: {
  locale: string;
  previewToken?: string;
}): Promise<
  {
    slug: string;
    title: string;
    description: string;
    coverImageUrl: string;
    tags: string[];
    firstPublishedAt: string;
    lastPublishedAt: string;
    author: { name: string; avatarUrl: string };
  }[]
> {
  const data = await getGraphQLClient({ previewToken }).request(
    gql`
      query($locale: Locale!) {
        posts(
          where: { isAvailable: true }
          orderBy: firstPublishedAt_DESC
          locales: [$locale, en_US]
        ) {
          slug
          title
          excerpt
          coverImage {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          tags
          firstPublishedAt
          lastModifiedAt
        }
      }
    `,
    { locale: locale.replace("-", "_") }
  );

  return data.posts.map((item: any) => ({
    slug: item.slug,
    title: item.title,
    description: item.excerpt,
    coverImageUrl: item.coverImage.url,
    tags: item.tags,
    firstPublishedAt: new Date(item.firstPublishedAt).toISOString(),
    lastPublishedAt: new Date(item.lastModifiedAt).toISOString(),
    author: {
      name: item.author.name,
      avatarUrl: item.author.avatar.url,
    },
  }));
}

function getGraphQLClient({
  previewToken,
}: {
  previewToken?: string;
}): GraphQLClient {
  return new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
    headers: previewToken
      ? {
          authorization: `Bearer ${previewToken}`,
        }
      : undefined,
  });
}
