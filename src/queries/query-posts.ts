import "server-only";

import { resolveRequestedLocale } from "~/helpers/header";
import { type Post } from "~/models/post";
import { findPosts } from "~/repositories/find-posts";

export async function queryPosts(): Promise<Post[]> {
  const locale = resolveRequestedLocale();
  const posts = await findPosts({ locale, includeDrafts: false });

  return posts;
}
