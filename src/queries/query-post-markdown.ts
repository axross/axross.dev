import "server-only";

import { resolveRequestedLocale } from "~/helpers/header";
import { getMarkdownFromNotionPage } from "~/helpers/notion";
import { type Post } from "~/models/post";
import { findPost } from "~/repositories/find-post";

export async function queryPostMarkdown({
  slug,
  fallback,
}: {
  slug: Post["slug"];
  fallback?: boolean;
}): Promise<string | null> {
  const locale = resolveRequestedLocale();
  const post = await findPost({ slug, locale, fallback });

  if (post === null) {
    return null;
  }

  return getMarkdownFromNotionPage({ pageId: post.id });
}
