import * as Contentful from "contentful";
import { NextPageContext } from "next";
import * as xmljs from "xml-js";
import { MY_NAME } from "../../constant/data";
import { AVAILABLE_LOCALES } from "../../constant/locale";
import { createGetAllBlogPosts } from "../../repositories/blogPost/contentful/getAllBlogPosts";
import { SELF_URL } from "../../constant/general";

export default function FeedXml() {
  return null;
}

FeedXml.getInitialProps = async ({ req, res }: NextPageContext) => {
  if (!req || !res) {
    throw new Error();
  }

  if (req.method !== "GET") {
    res.statusCode = 404;
    res.end();

    return;
  }

  const currentLocale =
    new URL(req.url!, SELF_URL.origin).searchParams.get("hl") ?? null;
  const contentful = Contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });
  const getAllBlogPosts = createGetAllBlogPosts(contentful);

  if (currentLocale === null || !AVAILABLE_LOCALES.includes(currentLocale)) {
    res.statusCode = 404;
    res.end();

    return;
  }

  const websiteURL = new URL("/", SELF_URL.origin);
  websiteURL.searchParams.set("hl", currentLocale);

  const blogPosts = await getAllBlogPosts({ locale: currentLocale });

  const xml = xmljs.js2xml(
    {
      _declaration: {
        _attributes: {
          version: "1.0",
          encoding: "utf-8",
        },
      },
      feed: {
        _attributes: {
          xmlns: "http://www.w3.org/2005/Atom",
        },
        id: {
          _text: websiteURL.href,
        },
        title: {
          _text: `Blog posts in axross.dev`,
        },
        updated: {
          _text: blogPosts[0].lastModifiedAt.toISOString(),
        },
        author: {
          name: {
            _text: MY_NAME,
          },
          uri: {
            _text: websiteURL.href,
          },
        },
        link: [
          {
            _attributes: {
              rel: "self",
              href: `${new URL(req.url!, SELF_URL.origin)}`,
            },
          },
          ...AVAILABLE_LOCALES.filter((locale) => locale !== currentLocale).map(
            (locale) => {
              const alternativeURL = new URL(req.url!, SELF_URL.origin);

              alternativeURL.searchParams.set("hl", locale);

              return {
                _attributes: {
                  rel: "alternate",
                  hreflang: locale,
                  href: `${alternativeURL}`,
                },
              };
            }
          ),
        ],
        entry: blogPosts.map((blogPost) => ({
          id: {
            _text: (() => {
              const url = new URL(req.url!, SELF_URL.origin);

              url.pathname = `/posts/${blogPost.id}`;
              url.searchParams.set("hl", currentLocale);

              return `${url}`;
            })(),
          },
          title: {
            _text: blogPost.title,
          },
          updated: {
            _text: blogPost.lastModifiedAt.toISOString(),
          },
          author: {
            name: {
              _text: MY_NAME,
            },
            uri: {
              _text: `${websiteURL}`,
            },
          },
          summary: {
            _text: blogPost.summary,
          },
        })),
      },
    },
    { compact: true }
  );

  res.statusCode = 200;
  res.setHeader("content-type", "application/xml");
  res.end(`${xml}\n`);
};
