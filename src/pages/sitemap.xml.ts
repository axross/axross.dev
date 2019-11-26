import { NextPageContext } from "next";
import * as xmljs from "xml-js";
import { DEFAULT_LOCALE, AVAILABLE_LOCALES } from "../constant/locale";
import { getAllBlogPostsInAllLocale } from "../repositories/blogPostRepository";
import getOrigin from '../utility/getOrigin';

export default function SitemapXml() {
  return null;
}

SitemapXml.getInitialProps = async ({ req, res }: NextPageContext): Promise<any> => {
  const origin = getOrigin(req);
  const blogPostAndLocales = await getAllBlogPostsInAllLocale();
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
          ...AVAILABLE_LOCALES.map(locale => ({
            loc: {
              _text: escape(
                `${origin}/${locale === DEFAULT_LOCALE ? "" : `?hl=${locale}`}`
              )
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
          })),
          ...blogPostAndLocales.map(([blogPost, locale], i) => ({
            loc: {
              _text: escape(
                `${origin}/posts/${blogPost.id}${
                  locale === DEFAULT_LOCALE ? "" : `?hl=${locale}`
                }`
              )
            },
            lastmod: {
              _text: blogPost.lastModifiedAt.toISOString()
            },
            changefreq: {
              _text: i < 3 ? "daily" : "weekly"
            },
            priority: {
              _text: 0.5
            }
          }))
        ]
      }
    },
    { compact: true }
  );

  res!.setHeader("content-type", "application/xml");
  res!.write(xml);
  res!.end();

  return;
};

function escape(string: string): string {
  return string
    .replace("&", "&amp")
    .replace("'", "&apos")
    .replace('"', "&quot")
    .replace(">", "&gt")
    .replace("<", "&lt");
}
