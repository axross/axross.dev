import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as Contentful from 'contentful';
import * as xmljs from "xml-js";
import { MY_NAME } from "../common/constant/data";
import ContentfulBlogPostRepository from "../common/repositories/ContentfulBlogPostRepository";
import ContentfulLocaleRepository from "../common/repositories/ContentfulLocaleRepository";

export async function handler({ httpMethod, path, queryStringParameters }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (httpMethod !== "GET") {
    return { statusCode: 404, body: "" };
  }

  const currentLocale = queryStringParameters?.hl ?? null;
  const contentful = Contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
  });
  const localeRepository = new ContentfulLocaleRepository(contentful);
  const blogPostRepository = new ContentfulBlogPostRepository(contentful);

  const availableLocales = await localeRepository.getAllAvailableOnes();

  if (currentLocale === null || !availableLocales.includes(currentLocale)) {
    return { statusCode: 404, body: "" };
  }

  const websiteURL = new URL("/", process.env.URL);
  websiteURL.searchParams.set("hl", currentLocale);

  const blogPosts = await blogPostRepository.getAllByLocale(currentLocale);

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
          _text: `${websiteURL}`
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
            _text: `${websiteURL}`
          }
        },
        link: [
          {
            _attributes: {
              rel: "self",
              href: `${new URL(path, process.env.URL)}`
            }
          },
          ...availableLocales
            .filter(locale => locale !== currentLocale)
            .map(locale => {
              const alternativeURL = new URL(path, process.env.URL);

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
              const url = new URL(path, process.env.URL);

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
              _text: `${websiteURL}`
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

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/xml"
    },
    body: `${xml}\n`
  };
}
