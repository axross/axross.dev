import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteChildrenProps, useLocation } from "react-router-dom";
import {
  MY_JOB_TITLE,
  MY_NAME,
  MY_SOCIAL_MEDIA_LINKS
} from "../../common/constant/data";
import BlogPost from "../../common/entities/BlogPost";
import LocaleContext from "../contexts/LocaleContext";
import RepositoryContext from "../contexts/RepositoryContext";
import {
  WEBSITE_TITLE,
  WEBSITE_TITLE_BLOG_POST,
  WEBSITE_TITLE_BLOG_POST_NOT_FOUND
} from "../dictionary";
import BlogPostPage from "../pages/BlogPostPage";

export default function BlogPostRoute({
  match
}: RouteChildrenProps<{ id: string }>) {
  const { currentLocale } = React.useContext(LocaleContext);
  const { blogPostRepository } = React.useContext(RepositoryContext);
  const [[blogPost, isBlogPostLoading], setBlogPost] = React.useState<
    [BlogPost | null, boolean]
  >([null, true]);

  React.useEffect(() => window.scrollTo(0, 0), [match!.params.id]);

  React.useEffect(() => {
    setBlogPost([null, true]);

    blogPostRepository
      .getById(match!.params.id)
      .then(blogPosts =>
        setBlogPost([blogPosts.get(currentLocale) ?? null, false])
      );
  }, [match!.params.id, currentLocale]);

  return (
    <>
      <AnalyticsPageView
        blogPost={blogPost}
        blogPostLoading={isBlogPostLoading}
      />

      <Meta blogPost={blogPost} blogPostLoading={isBlogPostLoading} />

      <BlogPostPage blogPost={blogPost} blogPostLoading={isBlogPostLoading} />
    </>
  );
}

function AnalyticsPageView({
  blogPost,
  blogPostLoading
}: {
  blogPost: BlogPost | null;
  blogPostLoading: boolean;
}) {
  const { pathname } = useLocation();
  const { currentLocale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    if (blogPostLoading) return;

    const url = new URL(pathname, process.env.URL);
    url.searchParams.set("hl", currentLocale);

    (window as any).ga("set", "location", `${url}`);

    if (blogPost) {
      (window as any).ga(
        "set",
        "title",
        new IntlMessageFormat(WEBSITE_TITLE_BLOG_POST[currentLocale]).format({
          title: blogPost.title,
          name: MY_NAME
        })
      );
    } else {
      (window as any).ga(
        "set",
        "title",
        new IntlMessageFormat(
          WEBSITE_TITLE_BLOG_POST_NOT_FOUND[currentLocale]
        ).format()
      );
    }

    (window as any).ga("send", "pageview");
  }, [currentLocale, blogPost, blogPostLoading]);

  return null;
}

function Meta({
  blogPost,
  blogPostLoading
}: {
  blogPost: BlogPost | null;
  blogPostLoading: boolean;
}) {
  const { pathname } = useLocation();
  const { availableLocales, currentLocale } = React.useContext(LocaleContext);

  if (blogPostLoading) {
    return (
      <Helmet>
        <title>Loading a blog post...</title>
      </Helmet>
    );
  }

  if (!blogPost) {
    return (
      <Helmet>
        <title>
          {new IntlMessageFormat(
            WEBSITE_TITLE_BLOG_POST_NOT_FOUND[currentLocale]
          ).format()}
        </title>
      </Helmet>
    );
  }

  const canonicalURL = new URL(pathname, process.env.URL);

  canonicalURL.searchParams.set("hl", currentLocale);

  const profileImageURL = new URL("/profile.jpg", process.env.URL);

  const title = new IntlMessageFormat(
    WEBSITE_TITLE_BLOG_POST[currentLocale]
  ).format({
    title: blogPost.title,
    name: MY_NAME
  });

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={blogPost.summary} key="description" />
      <link rel="canonical" href={`${canonicalURL}`} key="canonical" />

      {availableLocales
        .filter(locale => locale !== currentLocale)
        .map(locale => {
          const alternateURL = new URL(pathname, process.env.URL);

          alternateURL.searchParams.set("hl", locale);

          return (
            <link
              rel="alternate"
              hrefLang={locale}
              href={`${alternateURL}`}
              key={`alternate:${locale}`}
            />
          );
        })}

      {availableLocales
        .filter(locale => locale !== currentLocale)
        .map(locale => {
          const url = new URL("/posts/feed.xml", process.env.URL);

          url.searchParams.set("hl", locale);

          return (
            <link
              rel="alternate"
              type="application/atom+xml"
              title={`Blog post Atom feed (${locale})`}
              href={`${url}`}
              key={`atomFeed:${locale}`}
            />
          );
        })}

      {/* open graph */}
      <meta property="og:url" content={`${canonicalURL}`} key="og:url" />
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
        content={new IntlMessageFormat(WEBSITE_TITLE[currentLocale]).format({
          name: MY_NAME
        })}
        key="og:site_name"
      />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:image"
        content={`${new URL("/profile.jpg", process.env.URL)}`}
        key="og:image"
      />

      {/* json linking data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogBlogPosting",
          url: `${canonicalURL}`,
          name: blogPost.title,
          headline: blogPost.title,
          description: blogPost.summary,
          thumbnailUrl: `${profileImageURL}`,
          image: `${profileImageURL}`,
          myself: {
            "@type": "Person",
            name: MY_NAME,
            image: `${profileImageURL}`,
            jobTitle: MY_JOB_TITLE,
            sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
          },
          copyrightHolder: {
            "@type": "Person",
            name: MY_NAME,
            image: `${profileImageURL}`,
            jobTitle: MY_JOB_TITLE,
            sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
          },
          copyrightYear: `${new Date().getFullYear}`,
          dateCreated: blogPost.createdAt.toISOString(),
          datePublished: blogPost.createdAt.toISOString(),
          dateModified: blogPost.lastModifiedAt.toISOString(),
          mainEntityOfPage: `${canonicalURL}`
        })}
      </script>
    </Helmet>
  );
}
