import AcceptLanguage from "accept-language";
import * as Contentful from "contentful";
import NextApp, { AppProps, AppContext } from "next/app";
import * as React from "react";
import { AVAILABLE_LOCALES } from "../constant/locale";
import LocaleString from "../entities/LocaleString";
import { LocaleContext } from "../hooks/useLocale";
import { RepositoryContext } from "../hooks/useRepository";
import { URLContext } from "../hooks/useURL";
import { createGetBio } from "../repositories/bio/contentful/getBio";
import { createGetAllBlogPosts } from "../repositories/blogPost/contentful/getAllBlogPosts";
import { createGetBlogPost } from "../repositories/blogPost/contentful/getBlogPost";
import getWebpageSummary from "../repositories/webpageSummary/api/getWebpageSummary";
import { createGetWebsitePurpose } from "../repositories/websitePurpose/contentful/getWebsitePurpose";

export default function App({ Component, pageProps, router }: AppProps) {
  const url = new URL(router.asPath, process.env.ORIGIN);
  const contentful = React.useMemo(() => Contentful.createClient({
    host: url.searchParams.has("preview")
      ? "preview.contentful.com"
      : undefined,
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: url.searchParams.has("preview")
      ? url.searchParams.get("preview")!
      : process.env.CONTENTFUL_ACCESS_TOKEN!,
  }), []);
  const repositories = {
    getAllBlogPosts: createGetAllBlogPosts(contentful),
    getBio: createGetBio(contentful),
    getBlogPost: createGetBlogPost(contentful),
    getWebpageSummary,
    getWebsitePurpose: createGetWebsitePurpose(contentful),
  };
  const currentLocale = url.searchParams.get("hl")!;

  return (
    <URLContext.Provider value={url}>
      <RepositoryContext.Provider value={repositories}>
        <LocaleContext.Provider value={{
          availableLocales: AVAILABLE_LOCALES,
          currentLocale: currentLocale,
          isLoading: false,
        }}>
          <Component {...pageProps} />
        </LocaleContext.Provider>
      </RepositoryContext.Provider>
    </URLContext.Provider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const { ctx: { query, asPath, req, res } } = context;

  if (req && res && !LOCALE_COERCION_EXCLUDES.includes(asPath!.split("?")[0])) {
    const localeByQuery = query.hl?.toString() ?? null;
    let normalizedLocale: LocaleString | null = null;

    if (localeByQuery !== null && AVAILABLE_LOCALES.includes(localeByQuery)) {
      normalizedLocale = localeByQuery;
    }

    if (normalizedLocale === null) {
      const acceptLanguage = AcceptLanguage.create();
      acceptLanguage.languages(AVAILABLE_LOCALES);
      normalizedLocale = acceptLanguage.get(req.headers["accept-language"]);
    }

    if (localeByQuery !== normalizedLocale) {
      const url = new URL(asPath!, process.env.ORIGIN);
      url.searchParams.set("hl", normalizedLocale!);

      res.statusCode = 303;
      res.setHeader("location", url.href.substring(url.origin.length));
      res.end();

      return {};
    }
  }

  const appProps = await NextApp.getInitialProps(context);

  return { ...appProps };
};

const LOCALE_COERCION_EXCLUDES = [
  "/robots.txt",
  "/sitemap.xml",
];
