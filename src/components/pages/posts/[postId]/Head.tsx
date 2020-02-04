import NextHead from "next/head";
import * as React from "react";
import IntlMessageFormat from "intl-messageformat";
import { MY_JOB_TITLE, MY_NAME, MY_SOCIAL_MEDIA_LINKS } from "../../../../constant/data";
import { PROFILE_IMAGE_PATH } from "../../../../constant/staticFilePaths";
import LocaleContext from "../../../../contexts/LocaleContext";
import { WEBSITE_TITLE, WEBSITE_TITLE_BLOG_POST_NOT_FOUND } from "../../../../dictionary";
import BlogPost from "../../../../entities/BlogPost";
import useCanonicalURL from "./useCanonicalURL";

interface Props {
  blogPost: BlogPost | null;
  blogPostLoading?: boolean;
}

export default function Head({ blogPost, blogPostLoading }: Props) {
  const { availableLocales, currentLocale } = React.useContext(LocaleContext);
  const canonicalURL = useCanonicalURL();
  const profileImageURL = new URL(PROFILE_IMAGE_PATH, process.env.ORIGIN);

  if (blogPostLoading) {
    return (
      <NextHead>
        <title>Loading a blog post...</title>
      </NextHead>
    );
  }

  if (!blogPost) {
    return (
      <NextHead>
        <title>
          {new IntlMessageFormat(
            WEBSITE_TITLE_BLOG_POST_NOT_FOUND[currentLocale]
          ).format()}
        </title>
      </NextHead>
    );
  }

  const title = new IntlMessageFormat(WEBSITE_TITLE[currentLocale]).format({
    name: MY_NAME
  });

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
        const url = new URL("/posts/feed.xml", process.env.ORIGIN);
        url.searchParams.set("hl", currentLocale);

        return (
          <link
            rel="alternate"
            type="application/atom+xml"
            title={`Blog post Atom feed (${currentLocale})`}
            href={url.href}
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
        content={new IntlMessageFormat(WEBSITE_TITLE[currentLocale]).format({
          name: MY_NAME
        })}
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