import IntlMessageFormat from "intl-messageformat";
import { NextPageContext } from "next";
import Head from "next/head";
import * as React from "react";
import BlogPost, { BlogPostJSON } from "../entities/BlogPost";
import Person from "../entities/Person";
import { getAllBlogPostsByLocale } from "../repositories/blogPostRepository";
import { getMyselfbyLocale } from "../repositories/personRepository";
import IndexPage from "../views/pages/IndexPage";
import { GlobalPageProps } from "./_app";

interface Props {
  blogPostsJSON: BlogPostJSON[];
  myself: Person;
}

export default class extends React.Component<Props & GlobalPageProps, null> {
  render() {
    const {
      blogPostsJSON,
      myself,
      url,
      availableLocales,
      currentLocale,
      translation
    } = this.props;
    const blogPosts = blogPostsJSON.map(json => BlogPost.fromJSON(json));
    const title = new IntlMessageFormat(translation["website.title"]).format({
      name: myself.name,
      screenName: myself.screenName
    });
    const description = new IntlMessageFormat(
      translation["website.description"]
    ).format({ name: myself.name, screenName: myself.screenName });

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} key="description" />
          <link rel="canonical" href={url.href} key="canonical" />

          {availableLocales
            .filter(locale => locale !== currentLocale)
            .map(locale => {
              const alternateURL = new URL(url.href);

              alternateURL.searchParams.set("hl", locale);

              return (
                <link
                  rel="alternate"
                  hrefLang={locale}
                  href={url.href}
                  key={`alternate:${locale}`}
                />
              );
            })}

          {availableLocales
            .filter(locale => locale !== currentLocale)
            .map(locale => {
              const feedURL = new URL(url.href);

              feedURL.pathname = "/posts/feed.xml";

              return (
                <link
                  rel="alternate"
                  type="application/atom+xml"
                  title={`Blog post Atom feed (${locale})`}
                  href={feedURL.href}
                  key={`atomFeed:${locale}`}
                />
              );
            })}

          {/* open graph */}
          <meta property="og:url" content={url.href} key="og:url" />
          <meta property="og:type" content="profile" key="og:type" />
          <meta
            property="og:description"
            content={description}
            key="og:description"
          />
          <meta property="og:locale" content={currentLocale} key="og:locale" />
          {availableLocales
            .filter(locale => locale !== currentLocale)
            .map(locale => (
              <meta
                property="og:locale:alternate"
                content={locale}
                key={`og:locale:${locale}`}
              />
            ))}
          <meta
            property="og:site_name"
            content={new IntlMessageFormat(translation["website.title"]).format(
              {
                screenName: myself.screenName,
                name: myself.name
              }
            )}
            key="og:site_name"
          />
          <meta property="og:title" content={title} key="og:title" />
          <meta
            property="og:image"
            content={(() => {
              const imageURL = new URL(url.href);

              imageURL.pathname = "/static/profile.jpg";

              return imageURL.href;
            })()}
            key="og:image"
          />

          {/* json linking data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              url: url,
              name: myself.name,
              image: (() => {
                const imageURL = new URL(url.href);

                imageURL.pathname = "/static/profile.jpg";

                return imageURL;
              })(),
              jobTitle: myself.jobTitle,
              sameAs: myself.socialLinks.map(({ url }) => url)
            })}
          </script>
        </Head>

        <IndexPage myself={myself} blogPosts={blogPosts} />
      </>
    );
  }

  static async getInitialProps(
    _: NextPageContext,
    { currentLocale }: GlobalPageProps
  ): Promise<Props & Partial<GlobalPageProps>> {
    const [blogPosts, myself] = await Promise.all([
      getAllBlogPostsByLocale(currentLocale),
      getMyselfbyLocale(currentLocale)
    ]);

    return {
      blogPostsJSON: blogPosts.map(blogPost => blogPost.toJSON()),
      myself
    };
  }
}
