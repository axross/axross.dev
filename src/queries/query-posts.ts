import "server-only";

import { Locale } from "~/models/locale";
import { Post } from "~/models/post";
import { getPosts } from "~/repositories/get-posts";
import { getRequestedLocale } from "~/repositories/get-requested-locale";

export type GetPosts = (params: { locale: Locale, includeDrafts: boolean }) => Promise<Post[]>;

export async function queryPosts(): Promise<Post[]> {
  const locale = getRequestedLocale();
  const posts = await getPosts({ locale, includeDrafts: false });

  return posts;
}
