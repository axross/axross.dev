import { type MetadataRoute } from "next";
import { getConfig } from "~/helpers/config";

function robots(): MetadataRoute.Robots {
  const config = getConfig();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.website.urlOrigin}/sitemap.xml`,
  };
}

export default robots;
