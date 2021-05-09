import matter from "gray-matter";
import {
  generateMarkdown,
  generateTableOfContents,
  parseMarkdown,
} from "./markdown-processing";

const owner = process.env.GITHUB_CONTENT_REPO!.split("/")[0]!;
const repo = process.env.GITHUB_CONTENT_REPO!.split("/")[1]!;
const ref = process.env.GITHUB_CONTENT_REF;

export async function getAllPosts({
  locale,
}: {
  locale: string;
}): Promise<
  {
    slug: string;
    title: string;
    lastPublishedAt: string;
  }[]
> {
  const response = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${locale}.json`
  );

  if (response.status !== 200) {
    return [];
  }

  const posts = await response.json();

  return posts.map((post: any) => ({ ...post, slug: post.id }));
}

export async function getPost({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}): Promise<{
  slug: string;
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
  firstPublishedAt: string;
  lastPublishedAt: string;
  tableOfContents: { id: string; level: number; text: string }[];
  body: string;
} | null> {
  const response = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/posts/${slug}/${locale}.md`
  );

  if (response.status !== 200) {
    return null;
  }

  const text = await response.text();
  const { data: meta, content: markdown } = matter(text);
  const ast = await parseMarkdown(markdown);

  return {
    slug,
    title: meta.title,
    description: meta.description,
    coverImageUrl: meta.cover_image_url,
    tags: meta.tags,
    firstPublishedAt: meta.first_published_at,
    lastPublishedAt: meta.last_published_at,
    tableOfContents: generateTableOfContents(ast),
    body: generateMarkdown(ast),
  };
}
