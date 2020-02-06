import * as React from "react";
import BioCache from "../repositories/BioCache";
import BioApi from "../repositories/BioApi";
import BlogPostCache from "../repositories/BlogPostCache";
import BlogPostListCache from "../repositories/BlogPostListCache";
import BlogPostApi from "../repositories/BlogPostApi";
import LocaleApi from "../repositories/LocaleApi";
import WebpageSummaryApi from "../repositories/WebpageSummaryApi";
import WebsitePurposeCache from "../repositories/WebsitePurposeCache";
import WebsitePurposeApi from "../repositories/WebsitePurposeApi";

interface Repositories {
  bioApi: BioApi;
  bioCache: BioCache;
  blogPostApi: BlogPostApi;
  blogPostCache: BlogPostCache;
  blogPostListCache: BlogPostListCache;
  localeApi: LocaleApi;
  websitePurposeApi: WebsitePurposeApi,
  websitePurposeCache: WebsitePurposeCache;
  webpageSummaryApi: WebpageSummaryApi,
}

export const RepositoryContext = React.createContext<Repositories>(null as any);

export default function useRepository(): Repositories {
  return React.useContext(RepositoryContext);
}
