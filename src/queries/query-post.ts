import "server-only";

import { Locale } from "~/models/locale";
import { Post } from "~/models/post";
import { getPost } from "~/repositories/get-post";
import { getRequestedLocale } from "~/repositories/get-requested-locale";

export type GetPost = (params: { slug: Post["slug"], locale: Locale, includeDrafts: boolean }) => Promise<Post>

export async function queryPost({ slug }: { slug: Post["slug"]; }): Promise<Post> {
  const locale = getRequestedLocale();
  const post = await getPost({ slug, locale, includeDrafts: false });

  return post;
}
