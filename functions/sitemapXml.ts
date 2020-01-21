import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as Contentful from 'contentful';
import * as xmljs from "xml-js";
import ContentfulBlogPostApi from "../common/repositories/ContentfulBlogPostApi";
import ContentfulLocaleApi from "../common/repositories/ContentfulLocaleApi";

export async function handler({ httpMethod }: APIGatewayProxyEvent, _: any): Promise<APIGatewayProxyResult> {
  if (httpMethod !== "GET") {
    return { statusCode: 404, body: "" };
  }

  const contentful = Contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
  });
  const localeApi = new ContentfulLocaleApi(contentful);
  const blogPostApi = new ContentfulBlogPostApi(contentful);

  const availableLocales = await localeApi.getAllAvailableOnes();

  const topPages = availableLocales.map(locale => ({
    loc: {
      _text: (() => {
        const url = new URL("/", process.env.URL);

        url.pathname = "/";
        url.searchParams.set("hl", locale);

        return escape(`${url}`);
      })()
    },
    lastmod: {
      _text: new Date().toISOString()
    },
    changefreq: {
      _text: "monthly"
    },
    priority: {
      _text: 0.5
    }
  }));

  const blogPostPages = [];

  for (const locale of availableLocales) {
    const blogPosts = await blogPostApi.getAllByLocale(locale);

    for (const blogPost of blogPosts) {
      const url = new URL("/", process.env.URL);

      url.pathname = `/posts/${blogPost.id}`;
      url.searchParams.set("hl", locale);

      blogPostPages.push({
        loc: {
          _text: escape(`${url}`)
        },
        lastmod: {
          _text: blogPost.lastModifiedAt.toISOString()
        },
        changefreq: {
          _text: "weekly"
        },
        priority: {
          _text: 0.5
        }
      });
    }
  }
  
  const xml = xmljs.js2xml(
    {
      _declaration: {
        _attributes: {
          version: "1.0",
          encoding: "utf-8"
        }
      },
      urlset: {
        _attributes: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
        },
        url: [
          ...topPages,
          ...blogPostPages,
        ]
      }
    },
    { compact: true }
  );

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/xml"
    },
    body: `${xml}\n`
  };
}

function escape(string: string): string {
  return string
    .replace("&", "&amp")
    .replace("'", "&apos")
    .replace('"', "&quot")
    .replace(">", "&gt")
    .replace("<", "&lt");
}
