import IntlMessageFormat from "intl-messageformat";
import { NextPageContext } from "next";
import Error from "next/error";
import Head from "next/head";
import * as React from "react";
import BlogPost, { BlogPostJSON } from "../../entities/BlogPost";
import Person from "../../entities/Person";
import { getBlogPostsById } from "../../repositories/blogPostRepository";
import { getMyselfbyLocale } from "../../repositories/personRepository";
import BlogPostPage from "../../views/pages/BlogPostPage";
import { GlobalPageProps } from "../_app";

interface Props {
  blogPostJSON: BlogPostJSON | null;
  myself: Person;
}

export default class extends React.Component<Props & GlobalPageProps, null> {
  render() {
    const {
      blogPostJSON,
      myself,
      url,
      availableLocales,
      currentLocale,
      translation
    } = this.props;

    if (!blogPostJSON) {
      return <Error statusCode={404} />;
    }

    const blogPost = BlogPost.fromJSON(blogPostJSON);
    const title = new IntlMessageFormat(
      translation["website.title_blog_post"]
    ).format({
      title: blogPost.title,
      name: myself.name,
      screenName: myself.screenName
    });

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content={blogPost.summary}
            key="description"
          />
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
                  href={alternateURL.href}
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
          <meta property="og:type" content="article" key="og:type" />
          <meta
            property="og:description"
            content={blogPost.summary}
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
              "@type": "BlogBlogPosting",
              url: url,
              name: blogPost.title,
              headline: blogPost.title,
              description: blogPost.summary,
              thumbnailUrl: url.origin + "/static/profile.jpg",
              image: url.origin + "/static/profile.jpg",
              myself: {
                "@type": "Person",
                name: myself.name,
                image: url.origin + "/static/profile.jpg",
                jobTitle: myself.jobTitle,
                sameAs: myself.socialLinks.map(({ url }) => url)
              },
              copyrightHolder: {
                "@type": "Person",
                name: myself.name,
                image: url.origin + "/static/profile.jpg",
                jobTitle: myself.jobTitle,
                sameAs: myself.socialLinks.map(({ url }) => url)
              },
              copyrightYear: "2019",
              dateCreated: blogPost.createdAt.toISOString(),
              datePublished: blogPost.createdAt.toISOString(),
              dateModified: blogPost.lastModifiedAt.toISOString(),
              mainEntityOfPage: url.href
            })}
          </script>
        </Head>

        <BlogPostPage myself={myself} blogPost={blogPost} />
      </>
    );
  }

  static async getInitialProps(
    context: NextPageContext,
    { currentLocale }: GlobalPageProps
  ): Promise<Props & Partial<GlobalPageProps>> {
    const [blogPosts, myself] = await Promise.all([
      getBlogPostsById(context.query.blogPostId as string, {
        previewAccessToken: context.query.preview as string
      }),
      getMyselfbyLocale(currentLocale)
    ]);

    const blogPost = blogPosts.get(currentLocale)!;

    return {
      availableLocales: Array.from(blogPosts.keys()),
      blogPostJSON: blogPost?.toJSON() ?? null,
      myself
    };
  }
}
