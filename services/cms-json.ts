import cheerio from "cheerio";
import GithubSlugger from "github-slugger";
import { GraphQLClient, gql } from "graphql-request";
import { imageSize } from "image-size";
import * as directiveExtension from "mdast-util-directive";
import directiveSyntax from "micromark-extension-directive";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import unified, { Transformer } from "unified";
import type { Node, Parent } from "unist";
import visit from "unist-util-visit";

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
} | null> {
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
    return null;
  }

  const processor = unified()
    .data("micromarkExtensions", [directiveSyntax()])
    .data("fromMarkdownExtensions", [directiveExtension.fromMarkdown])
    .data("toMarkdownExtensions", [directiveExtension.toMarkdown])
    .use(remarkParse)
    .use(convertImageFigure)
    .use(completeImageFigureDimension)
    .use(convertEmbed)
    .use(resolveEmbed)
    .use(resolveWebpageEmbed)
    .use(remarkStringify);
  const body = (await processor.process(data.indexPages[0].body)).toString();

  const githubSlugger = new GithubSlugger();
  const tableOfContents = [];

  for (const line of body.split("\n")) {
    const match = line.match(/^(#{1,6}) (.+)$/);

    if (match && match[1] && match[2]) {
      const level = match[1]!.length;
      const text = match[2]!;
      const id = githubSlugger.slug(text);

      tableOfContents.push({ id, level, text });
    }
  }

  return {
    title: data.indexPages[0].title,
    description: data.indexPages[0].description,
    coverImageUrl: data.indexPages[0].coverImage.url,
    tableOfContents,
    body,
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

  const processor = unified()
    .data("micromarkExtensions", [directiveSyntax()])
    .data("fromMarkdownExtensions", [directiveExtension.fromMarkdown])
    .data("toMarkdownExtensions", [directiveExtension.toMarkdown])
    .use(remarkParse)
    .use(convertImageFigure)
    .use(completeImageFigureDimension)
    .use(convertEmbed)
    .use(resolveEmbed)
    .use(resolveWebpageEmbed)
    .use(remarkStringify);
  const body = (await processor.process(data.posts[0].body)).toString();

  const githubSlugger = new GithubSlugger();
  const tableOfContents = [];

  for (const line of body.split("\n")) {
    const match = line.match(/^(#{1,6}) (.+)$/);

    if (match && match[1] && match[2]) {
      const level = match[1]!.length;
      const text = match[2]!;
      const id = githubSlugger.slug(text);

      tableOfContents.push({ id, level, text });
    }
  }

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
    tableOfContents,
    body,
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

function convertImageFigure() {
  const transformer: Transformer = async (tree) => {
    const targetParagraphs: Parameters<visit.Visitor<Parent>>[] = [];

    visit(tree, "paragraph", (node: Parent, index, parent) => {
      if (node.children.length !== 1) {
        return;
      }

      if (node.children[0]!.type !== "image") {
        return;
      }

      targetParagraphs.push([node, index, parent]);
    });

    await Promise.all(
      targetParagraphs.map(async ([node, index, parent]) => {
        const imageNode = node.children[0]!;

        parent!.children.splice(index, 1, {
          type: "leafDirective",
          name: "image-figure",
          attributes: {
            src: imageNode.url,
            caption: imageNode.alt,
          },
        });
      })
    );
  };

  return transformer;
}

function completeImageFigureDimension() {
  const transformer: Transformer = async (tree) => {
    const imageFigureNodes: Node[] = [];

    visit(tree, { type: "leafDirective", name: "image-figure" }, (node) => {
      imageFigureNodes.push(node);
    });

    await Promise.all(
      imageFigureNodes.map(async (node) => {
        const attributes = node.attributes as any;

        if (
          (attributes as any).width !== undefined &&
          (attributes as any).height !== undefined
        ) {
          return;
        }

        const response = await fetch(attributes.src as string);
        const { width, height } = imageSize(await (response as any).buffer());

        (attributes as any).width = width;
        (attributes as any).height = height;
      })
    );
  };

  return transformer;
}

function convertEmbed() {
  const transformer: Transformer = async (tree) => {
    const targetParagraphs: Parameters<visit.Visitor<Parent>>[] = [];

    visit(tree, "paragraph", (node: Parent, index, parent) => {
      if (node.children.length !== 1) {
        return;
      }

      if (node.children[0]!.type !== "link") {
        return;
      }

      targetParagraphs.push([node, index, parent]);
    });

    await Promise.all(
      targetParagraphs.map(async ([node, index, parent]) => {
        const linkNode = node.children[0]!;

        parent!.children.splice(index, 1, {
          type: "leafDirective",
          name: "embed",
          attributes: {
            href: linkNode.url,
            title: linkNode.title,
          },
        });
      })
    );
  };

  return transformer;
}

function resolveEmbed() {
  const transformer: Transformer = async (tree) => {
    visit(tree, { type: "leafDirective", name: "embed" }, (node) => {
      node.name = "webpage-embed";
    });
  };

  return transformer;
}

function resolveWebpageEmbed() {
  const transformer: Transformer = async (tree) => {
    const webpageEmbedNodes: Node[] = [];

    visit(tree, { type: "leafDirective", name: "webpage-embed" }, (node) => {
      webpageEmbedNodes.push(node);
    });

    await Promise.all(
      webpageEmbedNodes.map(async (node) => {
        const attributes = node.attributes as any;
        const url = attributes.href as string;

        if (
          (attributes as any).width !== undefined &&
          (attributes as any).height !== undefined
        ) {
          return;
        }

        try {
          const response = await fetch(url, {
            headers: { "user-agent": "facebookexternalhit/1.1" },
          });

          if (response.status < 200 || response.status >= 300) {
            throw new Error(`${url} responded ${response.status}.`);
          }

          if (!response.headers.get("content-type")?.includes("text/html")) {
            throw new Error(
              `${url} responded ${response.headers.get("content-type")}.`
            );
          }

          const $ = cheerio.load(await response.text());

          let ogpUrl = $("meta[property='og:url']").attr("content");
          const ogpTitle = $("meta[property='og:title']").attr("content");
          const ogpDescription = $("meta[property='og:description']").attr(
            "content"
          );
          const ogpImageUrl = $("meta[property='og:image']").attr("content");
          const documentTitle = $("title").text();
          const documentDescription = $("meta[name='description']").attr(
            "content"
          );

          const title = ogpTitle ?? documentTitle ?? null;
          const description = ogpDescription ?? documentDescription ?? null;

          if (title === null) {
            throw new Error(
              `${url} responded a HTML that doesn't have the document title.`
            );
          }

          attributes.href = ogpUrl;
          attributes.title = title;
          attributes.description = description;
          attributes.imageSrc = ogpImageUrl;
        } catch (err) {
          attributes.title = "Unknown Webpage";
          attributes.description = "";
        }
      })
    );
  };

  return transformer;
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
