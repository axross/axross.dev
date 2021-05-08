import { Octokit } from "@octokit/core";
import matter from "gray-matter";
import {
  generateMarkdown,
  generateTableOfContents,
  parseMarkdown,
} from "./markdown-processing";

const owner = process.env.GITHUB_CONTENT_REPO!.split("/")[0]!;
const repo = process.env.GITHUB_CONTENT_REPO!.split("/")[1]!;
const postPathRegexp = /^posts\/([a-z-]+)\/([a-z]{2}-[a-z]{2}).md$/;

async function getDefaultBranchName(): Promise<string> {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  try {
    const {
      data: { default_branch },
    } = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: "axross",
      repo: "posts",
    });

    return default_branch;
  } catch (error) {
    console.error("send the error to sentry");

    throw new Error();
  }
}

export async function getAllPosts({
  locale: requestedLocale,
}: {
  locale?: string;
}): Promise<
  {
    slug: string;
    title: string;
    description: string;
    coverImageUrl: string;
    tags: string[];
    firstPublishedAt: string;
    lastPublishedAt: string;
    tableOfContents: { id: string; level: number; text: string }[];
    body: string;
  }[]
> {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const defaultBranch = await getDefaultBranchName();
  const {
    data: { tree },
  } = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner,
    repo,
    tree_sha: defaultBranch,
    recursive: "true",
  });

  return await Promise.all(
    tree
      .filter((node) => {
        if (node.type !== "blob") {
          return false;
        }

        const match = node.path!.match(postPathRegexp);

        if (!match) {
          return false;
        }

        if (match[2]! !== requestedLocale) {
          return false;
        }

        return true;
      })
      .map(async (node) => {
        const match = node.path!.match(postPathRegexp);
        const slug = match![1]!;
        const locale = match![2]!;

        return (await getPost({ slug, locale }))!;
      })
  );
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
  const defaultBranch = await getDefaultBranchName();
  const response = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/posts/${slug}/${locale}.md`
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
