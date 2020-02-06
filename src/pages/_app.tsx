import AcceptLanguage from "accept-language";
import * as Contentful from "contentful";
import NextApp, { AppProps, AppContext } from "next/app";
import * as React from "react";
import { AVAILABLE_LOCALES } from "../constant/locale";
import LocaleContext from "../contexts/LocaleContext";
import LocaleString from "../entities/LocaleString";
import { RepositoryContext } from "../hooks/useRepository";
import ContentfulBioApi from "../repositories/ContentfulBioApi";
import ContentfulBlogPostApi from "../repositories/ContentfulBlogPostApi";
import ContentfulLocaleApi from "../repositories/ContentfulLocaleApi";
import ContentfulWebsitePurposeApi from "../repositories/ContentfulWebsitePurposeApi";
import FunctionWebpageSummaryApi from "../repositories/FunctionWebpageSummaryApi";
import MemoryBioCache from "../repositories/MemoryBioCacheApi";
import MemoryBlogPostCache from "../repositories/MemoryBlogPostCache";
import MemoryBlogPostListCache from "../repositories/MemoryBlogPostListCache";
import MemoryWebsitePurposeCache from "../repositories/MemoryWebsitePurposeCache";

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
    bioApi: React.useMemo(() => new ContentfulBioApi(contentful), []),
    blogPostApi: React.useMemo(() => new ContentfulBlogPostApi(contentful), []),
    localeApi: React.useMemo(() => new ContentfulLocaleApi(contentful), []),
    websitePurposeApi: React.useMemo(() => new ContentfulWebsitePurposeApi(contentful), []),
    webpageSummaryApi: React.useMemo(() => new FunctionWebpageSummaryApi(), []),
    bioCache: React.useMemo(() => new MemoryBioCache(), []),
    blogPostCache: React.useMemo(() => new MemoryBlogPostCache(), []),
    blogPostListCache: React.useMemo(() => new MemoryBlogPostListCache(), []),
    websitePurposeCache: React.useMemo(() => new MemoryWebsitePurposeCache(), []),
  };
  const currentLocale = url.searchParams.get("hl")!;

  return (
    <RepositoryContext.Provider value={repositories}>
      <LocaleContext.Provider value={{
        availableLocales: AVAILABLE_LOCALES,
        currentLocale: currentLocale,
        isLoading: false,
      }}>
        <Component {...pageProps} />
      </LocaleContext.Provider>
    </RepositoryContext.Provider>
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
