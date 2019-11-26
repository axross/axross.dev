import IntlMessageFormat from "intl-messageformat";
import NextHead from "next/head";
import * as React from "react";
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "../../constant/locale";
import useAvailableLocales from "../hooks/useAvailableLocales";
import useCurrentLocale from "../hooks/useCurrentLocale";
import useMyself from "../hooks/useMyself";
import useSelfUrl from "../hooks/useSelfUrl";
import useTranslation from "../hooks/useTranslation";

interface Props {
  type: string;
  canonicalUrl: URL;
  title: string;
  description: string;
  imageUrl?: string;
  linkingData: Record<string, any>;
}

export default function Head({
  type,
  canonicalUrl,
  title,
  description,
  imageUrl,
  linkingData
}: Props) {
  const url = useSelfUrl();
  const translation = useTranslation();
  const availableLocales = useAvailableLocales();
  const currentLocale = useCurrentLocale();
  const myself = useMyself();
  const alternativeLocales = availableLocales.filter(
    locale => locale !== currentLocale
  );

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonicalUrl.href} key="canonical" />
      {alternativeLocales.map(locale => (
        <link
          rel="alternate"
          hrefLang={locale}
          href={buildUrlWithLocale(canonicalUrl, locale).href}
          key={`alternate:${locale}`}
        />
      ))}

      {/* feed */}
      {AVAILABLE_LOCALES.map(locale => (
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`Blog post Atom feed (${locale})`}
          href={
            url.origin +
            "/posts/feed.xml" +
            (locale === DEFAULT_LOCALE ? "" : `?hl=${locale}`)
          }
          key={`atomFeed:${locale}`}
        />
      ))}

      {/* open graph */}
      <meta property="og:url" content={canonicalUrl.href} key="og:url" />
      <meta property="og:type" content={type} key="og:type" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:locale" content={currentLocale} key="og:locale" />
      {alternativeLocales.map(locale => (
        <meta
          property="og:locale:alternate"
          content={locale}
          key={`og:locale:${locale}`}
        />
      ))}
      <meta
        property="og:site_name"
        content={new IntlMessageFormat(translation["website.title"]).format({
          screenName: myself.screenName,
          name: myself.name
        })}
        key="og:site_name"
      />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:image"
        content={imageUrl || url.origin + "/static/profile.jpg"}
        key="og:image"
      />

      {/* json linking data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(linkingData)
        }}
      />
    </NextHead>
  );
}

function buildUrlWithLocale(url: URL, locale: string) {
  const _url = new URL(url.href);

  if (locale === "en-US") {
    _url.searchParams.delete("hl");
  } else {
    _url.searchParams.set("hl", locale);
  }

  return _url;
}
