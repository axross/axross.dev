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
import BlogPost from "../entities/BlogPost";
import LocaleContext from "../contexts/LocaleContext";
import RepositoryContext from "../contexts/RepositoryContext";
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from "../dictionary";
import IndexPage from "../pages/IndexPage";

export default function IndexRoute(_: RouteChildrenProps) {
  const { currentLocale } = React.useContext(LocaleContext);
  const { bioRepository, blogPostRepository, websitePurposeRepository } = React.useContext(
    RepositoryContext
  );
  const [[bio, isBioLoading], setBio] = React.useState<
    [string | null, boolean]
  >([null, true]);
  const [[blogPosts, isBlogPostsLoading], setBlogPosts] = React.useState<
    [BlogPost[], boolean]
  >([[], true]);
  const [[websitePurpose, isWebsitePurposeLoading], setWebsitePurpose] = React.useState<[string | null, boolean]>([null, true]);

  React.useEffect(() => window.scrollTo(0, 0), []);

  React.useEffect(() => {
    setBio([null, true]);
    setBlogPosts([[], true]);
    setWebsitePurpose([null, true]);

    bioRepository.getByLocale(currentLocale).then(bio => setBio([bio, false]));
    blogPostRepository
      .getAllByLocale(currentLocale)
      .then(blogPosts => setBlogPosts([blogPosts, false]));
    websitePurposeRepository
      .getByLocale(currentLocale)
      .then(websitePurpose => setWebsitePurpose([websitePurpose, false]));
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
        websitePurpose={websitePurpose}
        websitePurposeLoading={isWebsitePurposeLoading}
      />
    </>
  );
}

function AnalyticsPageView() {
  const { pathname } = useLocation();
  const { currentLocale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    // Google Analytics is not loaded if the device is offline
    if (typeof (window as any).ga === "undefined") return;

    (window as any).ga("set", "page", `${pathname}?${new URLSearchParams({ hl: currentLocale })}`);
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
  const canonicalURL = `${pathname}?${new URLSearchParams({ hl: currentLocale })}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
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
        content={profileImage}
        key="og:image"
      />

      {/* json linking data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          url: canonicalURL,
          name: MY_NAME,
          image: profileImage,
          jobTitle: MY_JOB_TITLE,
          sameAs: MY_SOCIAL_MEDIA_LINKS.map(({ url }) => `${url}`)
        })}
      </script>
    </Helmet>
  );
}
