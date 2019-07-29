import NextHead from "next/head";
import * as React from "react";
import Person from "../../../entities/Person";
import useAvailableLocales from "../../hooks/useAvailableLocales";
import useCurrentLocale from "../../hooks/useCurrentLocale";
import useSelfUrl from "../../hooks/useSelfUrl";
import useTranslation from "../../hooks/useTranslation";
import GlobalStyle from "./GlobalStyle";
import GoogleAnalytics from "./GoogleAnalytics";

interface Props {
  person: Person;
  type: string;
  canonicalUrl: URL;
  title: string;
  description: string;
  imageUrl?: string;
  linkingData: Record<string, any>;
}

function Head({
  person,
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
  const alternativeLocales = availableLocales.filter(
    locale => locale !== currentLocale
  );

  return (
    <>
      <NextHead>
        <meta
          name="viewport"
          content="width=device-width,height=device-height"
        />

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
          content={translation["website.title"](person)}
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

        <GoogleAnalytics />
      </NextHead>

      <GlobalStyle />
    </>
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

export default Head;
