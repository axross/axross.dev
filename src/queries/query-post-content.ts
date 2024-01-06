import "server-only";

import { Locale } from "~/models/locale";
import { Post } from "~/models/post";
import { getPostContent } from "~/repositories/get-post-content";
import { getRequestedLocale } from "~/repositories/get-requested-locale";

export type GetPostContent = (params: { slug: Post["slug"]; locale: Locale }) => Promise<string>;

export async function queryPostContent({ slug }: { slug: Post["slug"]; }): Promise<string> {
  const locale = getRequestedLocale();
  const markdown = await getPostContent({ slug, locale });

  console.log(JSON.stringify(markdown));

  return markdown;
}
