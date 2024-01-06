import "server-only";

import { type Post } from "~/models/post";
import { findPostMarkdown } from "~/repositories/find-post-markdown";
import { getRequestedLocale } from "~/repositories/get-requested-locale";

export async function queryPostMarkdown({
  slug,
}: {
  slug: Post["slug"];
}): Promise<string | null> {
  const locale = getRequestedLocale();
  const markdown = await findPostMarkdown({ slug, locale });

  return markdown;
}
