import "server-only";

import { isAfter } from "date-fns";
import { availableLocales } from "~/helpers/locale";
import { type Locale } from "~/models/locale";
import { type Post } from "~/models/post";
import { findPosts } from "~/repositories/find-posts";

async function queryAllPostsRegardlessLocale(): Promise<Post[]> {
  const postsByLocale: Partial<Record<Locale, Post[]>> = {};

  await Promise.all(
    availableLocales.map(async (locale) => {
      const posts = await findPosts({ locale, includeDrafts: false });

      postsByLocale[locale] = posts;
    }),
  );

  const postsBySlug: Record<Post["slug"], Post> = {};

  for (const posts of Object.values(postsByLocale)) {
    for (const post of posts) {
      postsBySlug[post.slug] ??= post;

      if (isAfter(post.createdAt, postsBySlug[post.slug].createdAt)) {
        postsBySlug[post.slug].createdAt = post.createdAt;
      }

      if (isAfter(post.lastEditedAt, postsBySlug[post.slug].lastEditedAt)) {
        postsBySlug[post.slug].lastEditedAt = post.lastEditedAt;
      }
    }
  }

  return Object.values(postsBySlug);
}

export { queryAllPostsRegardlessLocale };
