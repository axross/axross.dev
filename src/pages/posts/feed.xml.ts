import { NextPageContext } from "next";
import * as React from "react";
import * as xmljs from "xml-js";
import { getAllBlogPostsByLocale } from "../../repositories/blogPostRepository";
import { getMyselfbyLocale } from "../../repositories/personRepository";
import getURL from "../../utility/getURL";
import { GlobalPageProps } from "../_app";

export default class extends React.Component<{}, null> {
  render() {
    return null;
  }

  static async getInitialProps(
    context: NextPageContext,
    { availableLocales, currentLocale, url }: GlobalPageProps
  ): Promise<any> {
    const [myself, blogPosts] = await Promise.all([
      getMyselfbyLocale(currentLocale),
      getAllBlogPostsByLocale(currentLocale)
    ]);
    const xml = xmljs.js2xml(
      {
        _declaration: {
          _attributes: {
            version: "1.0",
            encoding: "utf-8"
          }
        },
        feed: {
          _attributes: {
            xmlns: "http://www.w3.org/2005/Atom"
          },
          id: {
            _text: (() => {
              const homeURL = new URL(url.href);

              homeURL.pathname = "/";

              return homeURL.href;
            })()
          },
          title: {
            _text: `Blog posts in axross.dev`
          },
          updated: {
            _text: blogPosts[0].lastModifiedAt.toISOString()
          },
          author: {
            name: {
              _text: myself.name
            },
            uri: {
              _text: (() => {
                const homeURL = new URL(url.href);

                homeURL.pathname = "/";

                return homeURL.href;
              })()
            }
          },
          link: [
            {
              _attributes: {
                rel: "self",
                href: getURL(context).href
              }
            },
            ...availableLocales
              .filter(locale => locale !== currentLocale)
              .map(locale => {
                const alternativeURL = new URL(url.href);

                alternativeURL.searchParams.set("hl", locale);

                return {
                  _attributes: {
                    rel: "alternate",
                    hreflang: locale,
                    href: alternativeURL.href
                  }
                };
              })
          ],
          entry: blogPosts.map(blogPost => ({
            id: {
              _text: (() => {
                const url = getURL(context);

                url.pathname = `/posts/${blogPost.id}`;
                url.searchParams.set("hl", currentLocale);

                return url.href;
              })()
            },
            title: {
              _text: blogPost.title
            },
            updated: {
              _text: blogPost.lastModifiedAt.toISOString()
            },
            author: {
              name: {
                _text: myself.name
              },
              uri: {
                _text: (() => {
                  const url = getURL(context);

                  url.pathname = "/";

                  return url;
                })()
              }
            },
            summary: {
              _text: blogPost.summary
            }
          }))
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
