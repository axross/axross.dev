import { NextPageContext } from "next";
import * as React from "react";
import * as xmljs from "xml-js";
import { getAllBlogPosts } from "../repositories/blogPostRepository";
import { getAllAvailableLocales } from "../repositories/localeRepository";
import getURL from "../utility/getURL";

export default class extends React.Component {
  render() {
    return null;
  }

  static async getInitialProps(context: NextPageContext): Promise<any> {
    const availableLocales = await getAllAvailableLocales();
    const blogPosts = await getAllBlogPosts();

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
            ...availableLocales.map(locale => ({
              loc: {
                _text: (() => {
                  const url = getURL(context);

                  url.pathname = "/";
                  url.searchParams.set("hl", locale);

                  return escape(url.href);
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
            })),
            ...Array.from(blogPosts.entries()).reduce<Record<string, any>[]>(
              (entries, [locale, _blogPosts]) => {
                for (const blogPost of _blogPosts) {
                  const url = getURL(context);

                  url.pathname = `/posts/${blogPost.id}`;
                  url.searchParams.set("hl", locale);

                  entries.push({
                    loc: {
                      _text: escape(url.href)
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

                return entries;
              },
              []
            )
          ]
        }
      },
      { compact: true }
    );

    context.res?.setHeader("content-type", "application/xml");
    context.res?.write(xml);
    context.res?.end();

    return;
  }
}

function escape(string: string): string {
  return string
    .replace("&", "&amp")
    .replace("'", "&apos")
    .replace('"', "&quot")
    .replace(">", "&gt")
    .replace("<", "&lt");
}
