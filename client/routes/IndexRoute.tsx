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
import { getAllBlogPostsByLocale } from "../../common/repositories/blogPostRepository";
import { getBioByLocale } from "../../common/repositories/bioRepository";
import LocaleContext from "../contexts/LocaleContext";
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from "../dictionary";
import IndexPage from "../pages/IndexPage";

export default function IndexRoute(_: RouteChildrenProps) {
  const { currentLocale } = React.useContext(LocaleContext);
  const [[bio, isBioLoading], setBio] = React.useState<
    [string | null, boolean]
  >([null, true]);
  const [[blogPosts, isBlogPostsLoading], setBlogPosts] = React.useState<
    [BlogPost[], boolean]
  >([[], true]);

  React.useEffect(() => window.scrollTo(0, 0), []);

  React.useEffect(() => {
    setBio([null, true]);
    setBlogPosts([[], true]);

    getBioByLocale(currentLocale).then(bio => setBio([bio, false]));
    getAllBlogPostsByLocale(currentLocale).then(blogPosts =>
      setBlogPosts([blogPosts, false])
    );
  }, [currentLocale]);

  return (
    <>
      <AnalyticsPageView />

      <Meta />

      <IndexPage
        bio={bio}
        blogPosts={blogPosts}
        bioLoading={isBioLoading}
        blogPostsLoading={isBlogPostsLoading}
      />
    </>
  );
}

function AnalyticsPageView() {
  const { pathname } = useLocation();
  const { currentLocale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    const url = new URL(pathname, process.env.URL);
    url.searchParams.set("hl", currentLocale);

    (window as any).ga("set", "location", `${url}`);
    (window as any).ga(
      "set",
      "title",
      new IntlMessageFormat(WEBSITE_TITLE[currentLocale]).format({
        name: MY_NAME
      })
    );
    (window as any).ga("send", "pageview");
  }, [currentLocale]);

  return null;
}

function Meta() {
  const { pathname } = useLocation();
  const { availableLocales, currentLocale } = React.useContext(LocaleContext);

  const title = new IntlMessageFormat(WEBSITE_TITLE[currentLocale]).format({
    name: MY_NAME
  });
  const description = new IntlMessageFormat(
    WEBSITE_DESCRIPTION[currentLocale]
  ).format({ name: MY_NAME });
  const canonicalURL = new URL(pathname, process.env.URL);

  canonicalURL.searchParams.set("hl", currentLocale);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
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
      <meta property="og:site_name" content={title} key="og:site_name" />
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
          "@type": "Person",
          url: `${new URL(pathname, process.env.URL)}`,
          name: MY_NAME,
          image: `${new URL("/profile.jpg", process.env.URL)}`,
          jobTitle: MY_JOB_TITLE,
          sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
        })}
      </script>
    </Helmet>
  );
}
