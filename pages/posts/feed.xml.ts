import { NextPageContext } from "next";
import * as xmljs from "xml-js";
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "../../constant/locale";
import { getAllBlogPosts } from "../../repositories/blogPostRepository";
import { getMyself } from "../../repositories/personRepository";
import getLocale from "../../utility/getLocale";

function SitemapXml() {
  return null;
}

SitemapXml.getInitialProps = async ({
  res,
  query
}: NextPageContext): Promise<any> => {
  const locale = getLocale(query);
  const [myself, blogPosts] = await Promise.all([
    getMyself({ locale }),
    getAllBlogPosts({ locale })
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
          _text: origin + "/"
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
            _text: origin + "/"
          }
        },
        link: AVAILABLE_LOCALES.map(l =>
          l === locale
            ? {
                _attributes: {
                  rel: "self",
                  href:
                    origin +
                    "/posts/feed.xml" +
                    (l === DEFAULT_LOCALE ? "" : `?hl=${l}`)
                }
              }
            : {
                _attributes: {
                  rel: "alternate",
                  hreflang: l,
                  href:
                    origin +
                    "/posts/feed.xml" +
                    (l === DEFAULT_LOCALE ? "" : `?hl=${l}`)
                }
              }
        ),
        entry: blogPosts.map(blogPost => ({
          id: {
            _text:
              origin +
              "/posts/" +
              blogPost.id +
              (locale === DEFAULT_LOCALE ? "" : `?hl=${locale}`)
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
              _text: origin + "/"
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

  res!.setHeader("content-type", "application/xml");
  res!.write(xml);
  res!.end();

  return;
};

export default SitemapXml;
