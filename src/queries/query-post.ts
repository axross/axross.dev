import "server-only";

import { resolveRequestedLocale } from "~/helpers/header";
import { type Post } from "~/models/post";
import { findPost } from "~/repositories/find-post";

export async function queryPost({
  slug,
  fallback,
}: {
  slug: Post["slug"];
  fallback?: boolean;
}): Promise<Post | null> {
  const locale = resolveRequestedLocale();
  const post = await findPost({ slug, locale, fallback });

  return post;
}
