import { APIGatewayProxyCallback, APIGatewayProxyEvent } from "aws-lambda";
import * as xmljs from "xml-js";
import { getAllBlogPosts } from "../common/repositories/blogPostRepository";
import { getAllAvailableLocales } from "../common/repositories/localeRepository";

function handler(
  event: APIGatewayProxyEvent,
  _: any,
  callback: APIGatewayProxyCallback
): void {
  const { httpMethod } = event;

  if (httpMethod !== "GET") {
    callback(null, { statusCode: 404, body: "" });

    return;
  }

  Promise.all([getAllAvailableLocales(), getAllBlogPosts()]).then(
    ([availableLocales, blogPosts]) => {
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
              })),
              ...Array.from(blogPosts.entries()).reduce(
                (entries, [locale, _blogPosts]) => {
                  for (const blogPost of _blogPosts) {
                    const url = new URL("/", process.env.URL);

                    url.pathname = `/posts/${blogPost.id}`;
                    url.searchParams.set("hl", locale);

                    entries.push({
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

                  return entries;
                },
                [] as any[]
              )
            ]
          }
        },
        { compact: true }
      );

      callback(null, {
        statusCode: 200,
        headers: {
          "content-type": "application/xml"
        },
        body: `${xml}\n`
      });
    }
  );
}

module.exports.handler = handler;
