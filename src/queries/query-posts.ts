import "server-only";

import { type Post } from "~/models/post";
import { findPosts } from "~/repositories/find-posts";
import { getRequestedLocale } from "~/repositories/get-requested-locale";

export async function queryPosts(): Promise<Post[]> {
  const locale = getRequestedLocale();
  const posts = await findPosts({ locale, includeDrafts: false });

  return posts;
}
