import "server-only";

import { resolveRequestedLocale } from "~/helpers/header";
import { type Locale } from "~/models/locale";
import { type Post } from "~/models/post";
import { findPosts } from "~/repositories/find-posts";

export async function queryPosts({ locale }: { locale?: Locale } = {}): Promise<
  Post[]
> {
  const requestedLocale = locale ?? resolveRequestedLocale();
  const posts = await findPosts({
    locale: requestedLocale,
    includeDrafts: false,
  });

  return posts;
}
