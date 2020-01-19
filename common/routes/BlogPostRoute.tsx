import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteChildrenProps, useLocation } from "react-router-dom";
import profileImage from "../../assets/profile.jpg";
import {
  MY_JOB_TITLE,
  MY_NAME,
  MY_SOCIAL_MEDIA_LINKS
} from "../constant/data";
import LocaleContext from "../contexts/LocaleContext";
import {
  WEBSITE_TITLE,
  WEBSITE_TITLE_BLOG_POST,
  WEBSITE_TITLE_BLOG_POST_NOT_FOUND
} from "../dictionary";
import BlogPost from "../entities/BlogPost";
import BlogPostPage from "../pages/BlogPostPage";
import useBlogPost from "./BlogPostRoute/useBlogPost";

export default function BlogPostRoute({ match }: RouteChildrenProps<{ id: string }>) { 
  const blogPostId = match!.params.id;
  const [blogPost, isBlogPostLoading] = useBlogPost(blogPostId);

  sendAnalyticsPageView(blogPost, isBlogPostLoading);

  return (
    <>
      <Meta blogPost={blogPost} blogPostLoading={isBlogPostLoading} />

      <BlogPostPage blogPost={blogPost} blogPostLoading={isBlogPostLoading} />
    </>
  );
}

function sendAnalyticsPageView(blogPost: BlogPost | null, blogPostLoading: boolean): void {
  const { pathname } = useLocation();
  const { currentLocale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    if (blogPostLoading) return;

    // Google Analytics is not loaded if the device is offline
    if (typeof (window as any).ga === "undefined") return;

    (window as any).ga("set", "page", `${pathname}?${new URLSearchParams({ hl: currentLocale })}`);

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

  const canonicalURL = `${pathname}?${new URLSearchParams({ hl: currentLocale })}`;

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
      <link rel="canonical" href={canonicalURL} key="canonical" />

      {availableLocales
        .filter(locale => locale !== currentLocale)
        .map(locale => (
          <link
            rel="alternate"
            hrefLang={locale}
            href={`${pathname}?${new URLSearchParams({ hl: locale })}`}
            key={`alternate:${locale}`}
          />
        ))
      }

      {availableLocales
        .filter(locale => locale !== currentLocale)
        .map(locale => (
          <link
            rel="alternate"
            type="application/atom+xml"
            title={`Blog post Atom feed (${locale})`}
            href={`/posts/feed.xml?${new URLSearchParams({ hl: locale })}`}
            key={`atomFeed:${locale}`}
          />
        ))
      }

      {/* open graph */}
      <meta property="og:url" content={canonicalURL} key="og:url" />
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
        content={profileImage}
        key="og:image"
      />

      {/* json linking data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogBlogPosting",
          url: canonicalURL,
          name: blogPost.title,
          headline: blogPost.title,
          description: blogPost.summary,
          thumbnailUrl: profileImage,
          image: profileImage,
          myself: {
            "@type": "Person",
            name: MY_NAME,
            image: profileImage,
            jobTitle: MY_JOB_TITLE,
            sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
          },
          copyrightHolder: {
            "@type": "Person",
            name: MY_NAME,
            image: profileImage,
            jobTitle: MY_JOB_TITLE,
            sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
          },
          copyrightYear: `${new Date().getFullYear}`,
          dateCreated: blogPost.createdAt.toISOString(),
          datePublished: blogPost.createdAt.toISOString(),
          dateModified: blogPost.lastModifiedAt.toISOString(),
          mainEntityOfPage: canonicalURL
        })}
      </script>
    </Helmet>
  );
}
