import { APIGatewayProxyCallback, APIGatewayProxyEvent } from "aws-lambda";
import * as xmljs from "xml-js";
import { MY_NAME } from "../common/constant/data";
import { getAllBlogPostsByLocale } from "../common/repositories/blogPostRepository";
import { getAllAvailableLocales } from "../common/repositories/localeRepository";

export default function handler(
  event: APIGatewayProxyEvent,
  _: any,
  callback: APIGatewayProxyCallback
): void {
  const { httpMethod, path, queryStringParameters } = event;

  if (httpMethod !== "GET") {
    callback(null, { statusCode: 404, body: "" });

    return;
  }

  const currentLocale = queryStringParameters?.hl ?? null;

  getAllAvailableLocales().then(availableLocales => {
    if (currentLocale === null || !availableLocales.includes(currentLocale)) {
      callback(null, { statusCode: 404, body: "" });

      return;
    }

    getAllBlogPostsByLocale(currentLocale).then(blogPosts => {
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
              _text: `${new URL("/", process.env.DEPLOY_PRIME_URL)}`
            },
            title: {
              _text: `Blog posts in axross.dev`
            },
            updated: {
              _text: blogPosts[0].lastModifiedAt.toISOString()
            },
            author: {
              name: {
                _text: MY_NAME
              },
              uri: {
                _text: `${new URL("/", process.env.DEPLOY_PRIME_URL)}`
              }
            },
            link: [
              {
                _attributes: {
                  rel: "self",
                  href: `${new URL(path, process.env.DEPLOY_PRIME_URL)}`
                }
              },
              ...availableLocales
                .filter(locale => locale !== currentLocale)
                .map(locale => {
                  const alternativeURL = new URL(path, process.env.DEPLOY_PRIME_URL);

                  alternativeURL.searchParams.set("hl", locale);

                  return {
                    _attributes: {
                      rel: "alternate",
                      hreflang: locale,
                      href: `${alternativeURL}`
                    }
                  };
                })
            ],
            entry: blogPosts.map(blogPost => ({
              id: {
                _text: (() => {
                  const url = new URL(path, process.env.DEPLOY_PRIME_URL);

                  url.pathname = `/posts/${blogPost.id}`;
                  url.searchParams.set("hl", currentLocale);

                  return `${url}`;
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
                  _text: MY_NAME
                },
                uri: {
                  _text: `${new URL("/", process.env.DEPLOY_PRIME_URL)}`
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

      callback(null, {
        statusCode: 200,
        headers: {
          "content-type": "application/xml"
        },
        body: `${xml}\n`
      });
    });
  });
}
