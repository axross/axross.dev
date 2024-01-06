import "server-only";

import { type Post } from "~/models/post";
import { findPost } from "~/repositories/find-post";
import { getRequestedLocale } from "~/repositories/get-requested-locale";

export async function queryPost({
  slug,
}: {
  slug: Post["slug"];
}): Promise<Post | null> {
  const locale = getRequestedLocale();
  const post = await findPost({ slug, locale, includeDrafts: false });

  return post;
}
