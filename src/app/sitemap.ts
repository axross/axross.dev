import { type MetadataRoute } from "next";
import { getConfig } from "~/helpers/config";
import { queryAllPostsRegardlessLocale } from "~/queries/query-all-posts-regardless-locale";

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = getConfig();
  const posts = await queryAllPostsRegardlessLocale();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${config.website.urlOrigin}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  for (const post of posts) {
    entries.push({
      url: `${config.website.urlOrigin}/posts/${post.slug}`,
      lastModified: post.lastEditedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  return entries;
}

export default sitemap;
