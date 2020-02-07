import NextHead from "next/head";
import * as React from "react";
import { MY_JOB_TITLE, MY_NAME, MY_SOCIAL_MEDIA_LINKS } from "../../constant/data";
import { PROFILE_IMAGE_PATH } from "../../constant/staticFilePaths";
import BlogPost from "../../entities/BlogPost";
import useLocale from "../../hooks/useLocale";
import useCanonicalURL from "./useCanonicalURL";
import useTranslation from "../../hooks/useTranslation";

interface Props {
  blogPost?: BlogPost | null;
  blogPostLoading?: boolean;
}

export default function Head({ blogPost, blogPostLoading }: Props) {
  const { availableLocales, currentLocale } = useLocale();
  const canonicalURL = useCanonicalURL();
  const websiteTitle = useTranslation("WEBSITE_TITLE");
  const titleLoading = useTranslation("WEBSITE_TITLE_BLOG_POST_LOADING");
  const titleNotFound = useTranslation("WEBSITE_TITLE_BLOG_POST_NOT_FOUND");
  const title = useTranslation("WEBSITE_TITLE_BLOG_POST", { title: blogPost?.title });
  const profileImageURL = new URL(PROFILE_IMAGE_PATH, canonicalURL.origin);

  if (blogPostLoading) {
    return (
      <NextHead>
        <title>
          {titleLoading}
        </title>
      </NextHead>
    );
  }

  if (!blogPost) {
    return (
      <NextHead>
        <title>
          {titleNotFound}
        </title>
      </NextHead>
    );
  }

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={blogPost.summary} key="description" />
      <link rel="canonical" href={canonicalURL.href} key="canonical" />

      {availableLocales
        .filter(locale => locale !== currentLocale)
        .map(locale => {
          const url = new URL(canonicalURL.href);
          url.searchParams.set("hl", currentLocale);

          return ( 
            <link
              rel="alternate"
              hrefLang={locale}
              href={url.href}
              key={`alternate:${locale}`}
            />
          );
        })
      }

      {(() => {
        const feedURL = new URL("/posts/feed.xml", canonicalURL.origin);
        feedURL.searchParams.set("hl", currentLocale);

        return (
          <link
            rel="alternate"
            type="application/atom+xml"
            title={`Blog post Atom feed (${currentLocale})`}
            href={feedURL.href}
            key={`atomFeed:${currentLocale}`}
          />
        );
      })()}

      <script type="application/ld+json" key="linked-data">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogBlogPosting",
          url: canonicalURL.href,
          name: blogPost.title,
          headline: blogPost.title,
          description: blogPost.summary,
          thumbnailUrl: profileImageURL,
          image: profileImageURL,
          myself: {
            "@type": "Person",
            name: MY_NAME,
            image: profileImageURL,
            jobTitle: MY_JOB_TITLE,
            sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
          },
          copyrightHolder: {
            "@type": "Person",
            name: MY_NAME,
            image: profileImageURL,
            jobTitle: MY_JOB_TITLE,
            sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
          },
          copyrightYear: `${new Date().getFullYear}`,
          dateCreated: blogPost.createdAt.toISOString(),
          datePublished: blogPost.createdAt.toISOString(),
          dateModified: blogPost.lastModifiedAt.toISOString(),
          mainEntityOfPage: canonicalURL.href
        })}
      </script>

      <meta property="og:url" content={canonicalURL.href} key="og:url" />
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
        content={websiteTitle}
        key="og:site_name"
      />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:image"
        content={profileImageURL.href}
        key="og:image"
      />
    </NextHead>
  );
}